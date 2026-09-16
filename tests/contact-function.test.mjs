import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost, onRequestOptions } from '../functions/api/contact.js';
import { onRequestGet as healthGet } from '../functions/api/health.js';
import { onRequest as apiMiddleware } from '../functions/api/_middleware.js';

const baseEnv = {
  FORM_DELIVERY_PROVIDER: 'cloudflare-email-api',
  SITE_NAME: 'Test Contractor',
  FORM_TO_EMAIL: 'owner@contractor.test',
  FORM_FROM_EMAIL: 'website@contractor.test',
  FORM_SUBJECT_PREFIX: 'Website inquiry',
  CLOUDFLARE_ACCOUNT_ID: 'account-id',
  CLOUDFLARE_EMAIL_API_TOKEN: 'token-kept-in-runtime-env',
  REQUIRE_TURNSTILE: 'true',
  TURNSTILE_SECRET_KEY: 'turnstile-runtime-secret',
  TURNSTILE_EXPECTED_HOSTNAME: 'contractor.test',
  TURNSTILE_EXPECTED_ACTION: 'contractor_contact',
  ALLOWED_ORIGINS: 'https://contractor.test',
};

function requestFrom(fields, origin = 'https://contractor.test') {
  const body = new URLSearchParams(fields);
  return new Request('https://contractor.test/api/contact', {
    method: 'POST',
    headers: { Origin: origin, Referer: 'https://contractor.test/contact' },
    body,
  });
}

function installFetchMock({
  turnstileSuccess = true,
  turnstileHostname = baseEnv.TURNSTILE_EXPECTED_HOSTNAME,
  turnstileAction = baseEnv.TURNSTILE_EXPECTED_ACTION,
  emailSuccess = true,
  emailReceipt = { delivered: ['owner@contractor.test'], queued: [], permanent_bounces: [] },
} = {}) {
  const calls = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, options = {}) => {
    const target = String(url);
    calls.push({ target, options });
    if (target.includes('/turnstile/v0/siteverify')) {
      return Response.json({
        success: turnstileSuccess,
        hostname: turnstileHostname,
        action: turnstileAction,
      });
    }
    if (target.includes('/email/sending/send')) {
      return Response.json(
        emailSuccess
          ? { success: true, errors: [], result: emailReceipt }
          : { errors: [{ code: 10001, message: 'test failure' }] },
        { status: emailSuccess ? 200 : 400 },
      );
    }
    throw new Error(`Unexpected fetch target: ${target}`);
  };
  return { calls, restore: () => { globalThis.fetch = original; } };
}

test('valid form verifies Turnstile and sends only to fixed recipient', async () => {
  const mock = installFetchMock();
  try {
    const response = await onRequestPost({
      request: requestFrom({
        form_type: 'estimate-request',
        name: 'Owner Test',
        email: 'guest@customer.test',
        message: 'Please review this test service request.',
        privacy_consent: 'true',
        'cf-turnstile-response': 'valid-token',
        to: 'attacker@unapproved.test',
      }),
      env: baseEnv,
    });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.ok, true);
    assert.equal(mock.calls.length, 2);
    const emailCall = mock.calls.find((call) => call.target.includes('/email/sending/send'));
    const payload = JSON.parse(emailCall.options.body);
    assert.equal(payload.to, baseEnv.FORM_TO_EMAIL);
    assert.notEqual(payload.to, 'attacker@unapproved.test');
    assert.match(payload.subject, /estimate-request/);
  } finally {
    mock.restore();
  }
});

test('missing privacy consent is rejected before delivery', async () => {
  const mock = installFetchMock();
  try {
    const response = await onRequestPost({
      request: requestFrom({ name: 'Guest', email: 'guest@customer.test', message: 'Hello' }),
      env: baseEnv,
    });
    assert.equal(response.status, 400);
    assert.equal(mock.calls.length, 0);
  } finally {
    mock.restore();
  }
});

test('honeypot receives generic success without external delivery', async () => {
  const mock = installFetchMock();
  try {
    const response = await onRequestPost({
      request: requestFrom({ website: 'spam', name: 'Bot', email: 'bot@spam.test', privacy_consent: 'true' }),
      env: baseEnv,
    });
    assert.equal(response.status, 200);
    assert.equal(mock.calls.length, 0);
  } finally {
    mock.restore();
  }
});

test('wrong browser origin is rejected', async () => {
  const mock = installFetchMock();
  try {
    const response = await onRequestPost({
      request: requestFrom({ name: 'Guest', email: 'guest@customer.test', message: 'Hello', privacy_consent: 'true' }, 'https://unapproved.test'),
      env: baseEnv,
    });
    assert.equal(response.status, 403);
    assert.equal(mock.calls.length, 0);
  } finally {
    mock.restore();
  }
});

test('failed Turnstile verification blocks delivery', async () => {
  const mock = installFetchMock({ turnstileSuccess: false });
  try {
    const response = await onRequestPost({
      request: requestFrom({
        name: 'Guest', email: 'guest@customer.test', message: 'Hello', privacy_consent: 'true', 'cf-turnstile-response': 'bad-token',
      }),
      env: baseEnv,
    });
    assert.equal(response.status, 400);
    assert.equal(mock.calls.filter((call) => call.target.includes('/email/sending/send')).length, 0);
  } finally {
    mock.restore();
  }
});

test('Turnstile hostname mismatch blocks delivery', async () => {
  const mock = installFetchMock({ turnstileHostname: 'lookalike.test' });
  try {
    const response = await onRequestPost({
      request: requestFrom({
        name: 'Guest', email: 'guest@customer.test', message: 'Hello', privacy_consent: 'true', 'cf-turnstile-response': 'valid-token',
      }),
      env: baseEnv,
    });
    assert.equal(response.status, 400);
    assert.equal(mock.calls.filter((call) => call.target.includes('/email/sending/send')).length, 0);
  } finally {
    mock.restore();
  }
});

test('Turnstile action mismatch blocks delivery', async () => {
  const mock = installFetchMock({ turnstileAction: 'different_action' });
  try {
    const response = await onRequestPost({
      request: requestFrom({
        name: 'Guest', email: 'guest@customer.test', message: 'Hello', privacy_consent: 'true', 'cf-turnstile-response': 'valid-token',
      }),
      env: baseEnv,
    });
    assert.equal(response.status, 400);
    assert.equal(mock.calls.filter((call) => call.target.includes('/email/sending/send')).length, 0);
  } finally {
    mock.restore();
  }
});

test('missing Turnstile hostname or action contract fails closed', async () => {
  const mock = installFetchMock();
  try {
    const response = await onRequestPost({
      request: requestFrom({
        name: 'Guest', email: 'guest@customer.test', message: 'Hello', privacy_consent: 'true', 'cf-turnstile-response': 'valid-token',
      }),
      env: { ...baseEnv, TURNSTILE_EXPECTED_ACTION: '' },
    });
    assert.equal(response.status, 503);
    assert.equal(mock.calls.length, 0);
  } finally {
    mock.restore();
  }
});

test('unconfigured delivery returns an owner-safe fallback status', async () => {
  const mock = installFetchMock();
  try {
    const response = await onRequestPost({
      request: requestFrom({
        name: 'Guest', email: 'guest@customer.test', message: 'Hello', privacy_consent: 'true', 'cf-turnstile-response': 'valid-token',
      }),
      env: { ...baseEnv, FORM_DELIVERY_PROVIDER: 'disabled' },
    });
    assert.equal(response.status, 503);
    const result = await response.json();
    assert.match(result.message, /phone or email/i);
  } finally {
    mock.restore();
  }
});

test('health endpoint reports state without revealing secret values', async () => {
  const response = await healthGet({ env: baseEnv });
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.formDeliveryConfigured, true);
  assert.equal(data.turnstileConfigured, true);
  assert.equal(data.turnstileHostnameConfigured, true);
  assert.equal(data.turnstileActionConfigured, true);
  const serialized = JSON.stringify(data);
  assert.equal(serialized.includes(baseEnv.CLOUDFLARE_EMAIL_API_TOKEN), false);
  assert.equal(serialized.includes(baseEnv.TURNSTILE_SECRET_KEY), false);
  assert.equal(serialized.includes(baseEnv.TURNSTILE_EXPECTED_HOSTNAME), false);
  assert.equal(serialized.includes(baseEnv.TURNSTILE_EXPECTED_ACTION), false);
});


test('multipart bodies are rejected so files and unbounded multipart payloads cannot be submitted', async () => {
  const form = new FormData();
  form.set('name', 'Guest');
  form.set('email', 'guest@customer.test');
  form.set('message', 'Hello');
  form.set('privacy_consent', 'true');
  const response = await onRequestPost({
    request: new Request('https://contractor.test/api/contact', {
      method: 'POST',
      headers: { Origin: 'https://contractor.test' },
      body: form,
    }),
    env: baseEnv,
  });
  assert.equal(response.status, 400);
  const result = await response.json();
  assert.match(result.message, /without attachments/i);
});

test('oversized streaming body without Content-Length is cancelled before delivery', async () => {
  let pulls = 0;
  let cancelled = false;
  const body = new ReadableStream({
    pull(controller) {
      pulls += 1;
      controller.enqueue(new Uint8Array(8192).fill(97));
      if (pulls >= 10) controller.close();
    },
    cancel() {
      cancelled = true;
    },
  });
  const mock = installFetchMock();
  try {
    const response = await onRequestPost({
      request: new Request('https://contractor.test/api/contact', {
        method: 'POST',
        headers: {
          Origin: 'https://contractor.test',
          'content-type': 'application/x-www-form-urlencoded',
        },
        body,
        duplex: 'half',
      }),
      env: baseEnv,
    });
    assert.equal(response.status, 413);
    assert.equal(cancelled, true);
    assert.ok(pulls < 10);
    assert.equal(mock.calls.length, 0);
  } finally {
    mock.restore();
  }
});

test('invalid Content-Length is rejected before reading the body', async () => {
  let bodyRead = false;
  const request = {
    url: 'https://contractor.test/api/contact',
    headers: new Headers({
      Origin: 'https://contractor.test',
      'content-type': 'application/x-www-form-urlencoded',
      'content-length': 'not-a-number',
    }),
    body: {
      getReader() {
        bodyRead = true;
        throw new Error('body must not be read');
      },
    },
  };
  const response = await onRequestPost({
    request,
    env: baseEnv,
  });
  assert.equal(response.status, 400);
  assert.equal(bodyRead, false);
});

test('declared Content-Length over the limit is rejected before delivery', async () => {
  const mock = installFetchMock();
  try {
    const response = await onRequestPost({
      request: new Request('https://contractor.test/api/contact', {
        method: 'POST',
        headers: {
          Origin: 'https://contractor.test',
          'content-type': 'application/x-www-form-urlencoded',
          'content-length': String(32 * 1024 + 1),
        },
        body: 'name=Guest',
      }),
      env: baseEnv,
    });
    assert.equal(response.status, 413);
    assert.equal(mock.calls.length, 0);
  } finally {
    mock.restore();
  }
});

test('declared Content-Length must match the bytes actually received', async () => {
  const mock = installFetchMock();
  try {
    const response = await onRequestPost({
      request: new Request('https://contractor.test/api/contact', {
        method: 'POST',
        headers: {
          Origin: 'https://contractor.test',
          'content-type': 'application/x-www-form-urlencoded',
          'content-length': '100',
        },
        body: 'name=Guest',
      }),
      env: baseEnv,
    });
    assert.equal(response.status, 400);
    assert.equal(mock.calls.length, 0);
  } finally {
    mock.restore();
  }
});

test('compressed request bodies are rejected before decoding', async () => {
  const mock = installFetchMock();
  try {
    const response = await onRequestPost({
      request: new Request('https://contractor.test/api/contact', {
        method: 'POST',
        headers: {
          Origin: 'https://contractor.test',
          'content-type': 'application/x-www-form-urlencoded',
          'content-encoding': 'gzip',
        },
        body: 'compressed-placeholder',
      }),
      env: baseEnv,
    });
    assert.equal(response.status, 400);
    assert.equal(mock.calls.length, 0);
  } finally {
    mock.restore();
  }
});

const validFields = {
  name: 'Guest', email: 'guest@customer.test', message: 'Please fix the leak.',
  privacy_consent: 'true', 'cf-turnstile-response': 'valid-token',
};

for (const [label, headers, env] of [
  ['missing Origin', {}, baseEnv],
  ['opaque Origin', { Origin: 'null' }, baseEnv],
  ['missing explicit allowlist', { Origin: 'https://contractor.test' }, { ...baseEnv, ALLOWED_ORIGINS: '' }],
  ['unexpected same-host alias', { Origin: 'https://preview.contractor.test' }, baseEnv],
  ['cross-site fetch metadata', { Origin: 'https://contractor.test', 'Sec-Fetch-Site': 'cross-site' }, baseEnv],
]) {
  test(`${label} fails before sending or preflight approval`, async () => {
    const mock = installFetchMock();
    try {
      const request = new Request('https://contractor.test/api/contact', { method: 'POST', headers, body: new URLSearchParams(validFields) });
      assert.equal((await onRequestPost({ request, env })).status, 403);
      assert.equal((await onRequestOptions({ request, env })).status, 403);
      assert.equal(mock.calls.length, 0);
    } finally { mock.restore(); }
  });
}

for (const [label, update] of [
  ['object field', { name: { toString: 'Guest' } }],
  ['array consent', { privacy_consent: ['true'] }],
  ['array email', { email: ['guest@customer.test'] }],
  ['oversize field', { message: 'a'.repeat(5001) }],
  ['invalid phone-only contact', { email: '', phone: 'please call' }],
]) {
  test(`${label} is rejected before Turnstile or delivery`, async () => {
    const mock = installFetchMock();
    try {
      const request = new Request('https://contractor.test/api/contact', { method: 'POST', headers: { Origin: 'https://contractor.test', 'content-type': 'application/json' }, body: JSON.stringify({ ...validFields, ...update }) });
      assert.equal((await onRequestPost({ request, env: baseEnv })).status, 400);
      assert.equal(mock.calls.length, 0);
    } finally { mock.restore(); }
  });
}

test('duplicate URL-encoded fields are rejected', async () => {
  const body = new URLSearchParams(validFields);
  body.append('privacy_consent', 'false');
  const response = await onRequestPost({ request: new Request('https://contractor.test/api/contact', { method: 'POST', headers: { Origin: 'https://contractor.test' }, body }), env: baseEnv });
  assert.equal(response.status, 400);
});

test('setting REQUIRE_TURNSTILE=false cannot bypass verification', async () => {
  const mock = installFetchMock();
  try {
    assert.equal((await onRequestPost({ request: requestFrom(validFields), env: { ...baseEnv, REQUIRE_TURNSTILE: 'false' } })).status, 503);
    assert.equal(mock.calls.length, 0);
    const health = await (await healthGet({ env: { ...baseEnv, REQUIRE_TURNSTILE: 'false' } })).json();
    assert.equal(health.turnstileRequired, true);
    assert.equal(health.turnstileConfigured, false);
  } finally { mock.restore(); }
});

for (const [label, emailReceipt, expected] of [
  ['bounced recipient', { delivered: [], queued: [], permanent_bounces: [baseEnv.FORM_TO_EMAIL] }, 502],
  ['suppressed recipient', { delivered: [], queued: [], suppressed_recipients: [baseEnv.FORM_TO_EMAIL] }, 502],
  ['wrong accepted recipient', { delivered: ['wrong@example.test'], queued: [] }, 502],
  ['missing delivery receipt', {}, 502],
  ['queued recipient', { delivered: [], queued: [baseEnv.FORM_TO_EMAIL] }, 200],
]) {
  test(`${label} has truthful visitor result`, async () => {
    const mock = installFetchMock({ emailReceipt });
    try { assert.equal((await onRequestPost({ request: requestFrom(validFields), env: baseEnv })).status, expected); }
    finally { mock.restore(); }
  });
}

test('HTML escapes inquiry text and strips referring-page query strings', async () => {
  const mock = installFetchMock();
  try {
    const request = requestFrom({ ...validFields, message: '<script>alert("x")</script>' });
    request.headers.set('Referer', 'https://contractor.test/contact?customer=private&token=private#private');
    assert.equal((await onRequestPost({ request, env: baseEnv })).status, 200);
    const payload = JSON.parse(mock.calls[1].options.body);
    assert.ok(payload.html.includes('&lt;script&gt;'));
    assert.ok(!payload.html.includes('<script>'));
    assert.ok(!payload.text.includes('customer=private'));
    assert.ok(mock.calls.every(({ options }) => options.redirect === 'manual' && options.signal instanceof AbortSignal));
  } finally { mock.restore(); }
});

for (const url of ['http://webhook.test/form', 'https://user:pass@webhook.test/form', 'https://webhook.test/form#secret']) {
  test(`unsafe webhook configuration fails closed: ${new URL(url).protocol}`, async () => {
    const mock = installFetchMock();
    try {
      assert.equal((await onRequestPost({ request: requestFrom(validFields), env: { ...baseEnv, FORM_DELIVERY_PROVIDER: 'webhook', FORM_WEBHOOK_URL: url, FORM_WEBHOOK_SECRET: 'private-secret' } })).status, 503);
      assert.equal(mock.calls.length, 1); // Turnstile only.
    } finally { mock.restore(); }
  });
}

test('approved webhook gets a bounded request with redirect following disabled', async () => {
  const original = globalThis.fetch;
  let webhook;
  globalThis.fetch = async (url, options) => {
    if (String(url).includes('/siteverify')) return Response.json({ success: true, hostname: baseEnv.TURNSTILE_EXPECTED_HOSTNAME, action: baseEnv.TURNSTILE_EXPECTED_ACTION });
    webhook = options;
    return new Response(null, { status: 202 });
  };
  try {
    assert.equal((await onRequestPost({ request: requestFrom(validFields), env: { ...baseEnv, FORM_DELIVERY_PROVIDER: 'webhook', FORM_WEBHOOK_URL: 'https://webhook.test/form', FORM_WEBHOOK_SECRET: 'private-secret' } })).status, 200);
    assert.equal(webhook.redirect, 'manual');
    assert.ok(webhook.signal instanceof AbortSignal);
  } finally { globalThis.fetch = original; }
});

test('oversized upstream payload is cancelled without a delivery success', async () => {
  const original = globalThis.fetch;
  let cancelled = false;
  globalThis.fetch = async () => new Response(new ReadableStream({
    pull(controller) { controller.enqueue(new Uint8Array(8192).fill(97)); },
    cancel() { cancelled = true; },
  }));
  try {
    assert.equal((await onRequestPost({ request: requestFrom(validFields), env: baseEnv })).status, 502);
    assert.ok(cancelled);
  } finally { globalThis.fetch = original; }
});

test('upstream exceptions do not expose private URLs in logs or the response', async () => {
  const original = globalThis.fetch;
  const originalError = console.error;
  const logs = [];
  globalThis.fetch = async () => { throw new Error('https://private.test/customer-secret'); };
  console.error = (...args) => logs.push(args.join(' '));
  try {
    const response = await onRequestPost({ request: requestFrom(validFields), env: baseEnv });
    assert.equal(response.status, 502);
    assert.ok(!(await response.text()).includes('customer-secret'));
    assert.ok(!logs.join(' ').includes('customer-secret'));
  } finally { globalThis.fetch = original; console.error = originalError; }
});

for (const fail of [false, true]) {
  test(`API ${fail ? 'error' : 'normal'} response has independent security headers`, async () => {
    const response = await apiMiddleware({ next: async () => { if (fail) throw new Error('private failure'); return Response.json({ ok: true }); } });
    assert.equal(response.status, fail ? 500 : 200);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(response.headers.get('x-frame-options'), 'DENY');
    assert.equal(response.headers.get('x-robots-tag'), 'noindex');
    assert.match(response.headers.get('content-security-policy'), /default-src 'none'/);
  });
}


for (const redirectStatus of [301, 302, 303, 307, 308]) {
  for (const stage of ['turnstile', 'email', 'webhook']) {
    test(`${stage} HTTP ${redirectStatus} fails closed without a follow-up request`, async () => {
      const original = globalThis.fetch;
      const calls = [];
      globalThis.fetch = async (url, options) => {
        const target = String(url);
        calls.push({ target, options });
        // Model the actual edge runtime: redirect:error is unsupported.
        if (!['follow', 'manual'].includes(options.redirect)) throw new TypeError('Invalid redirect value');
        assert.equal(options.redirect, 'manual');
        assert.ok(!target.includes('redirect-target.test'));
        if (target.includes('/siteverify') && stage !== 'turnstile') {
          return Response.json({ success: true, hostname: baseEnv.TURNSTILE_EXPECTED_HOSTNAME, action: baseEnv.TURNSTILE_EXPECTED_ACTION });
        }
        return new Response('Do not forward this request', { status: redirectStatus, headers: { Location: 'https://redirect-target.test/collect' } });
      };
      const env = stage === 'webhook'
        ? { ...baseEnv, FORM_DELIVERY_PROVIDER: 'webhook', FORM_WEBHOOK_URL: 'https://webhook.test/form', FORM_WEBHOOK_SECRET: 'private-secret' }
        : baseEnv;
      try {
        const response = await onRequestPost({ request: requestFrom(validFields), env });
        assert.equal(response.status, stage === 'turnstile' ? 400 : 502);
        assert.equal((await response.json()).ok, false);
        assert.equal(calls.length, stage === 'turnstile' ? 1 : 2);
        assert.ok(calls.every(call => !call.target.includes('redirect-target.test')));
      } finally { globalThis.fetch = original; }
    });
  }
}
