function securityHeaders(response) {
  const wrapped = new Response(response.body, response);
  wrapped.headers.set("cache-control", "no-store");
  wrapped.headers.set("x-content-type-options", "nosniff");
  wrapped.headers.set("referrer-policy", "no-referrer");
  wrapped.headers.set("x-frame-options", "DENY");
  wrapped.headers.set("content-security-policy", "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
  wrapped.headers.set("permissions-policy", "camera=(), microphone=(), geolocation=(), payment=()");
  wrapped.headers.set("strict-transport-security", "max-age=31536000");
  wrapped.headers.set("x-robots-tag", "noindex");
  return wrapped;
}

export async function onRequest(context) {
  let response;
  try {
    response = await context.next();
  } catch {
    console.error("API function error");
    response = Response.json({ ok: false, message: "The website could not process that request. Use the listed phone or email fallback." }, { status: 500 });
  }
  // Pages _headers applies only to static assets, so every API response,
  // including errors, preflights and unsupported methods, is wrapped here.
  return securityHeaders(response);
}
