# Infrastructure change history

## plumber-v7-infrastructure-7.0.0 — 2026-09-12

Plumber Program V7 release candidate. Public transport schemas retain 6.0 intentionally. Added strict form fields and allowed origins, non-bypassable server-side Turnstile, bounded outbound requests without redirects, truthful email receipts, privacy-safe logs, consistent API headers, stricter CSP package validation, preview noindex rules, exact public-tree rollback and concurrent-update protection. No prior live activation evidence is inherited. See `SECURITY AUDIT.md` in the publishing infrastructure package.

# Publishing infrastructure changelog

## Inherited foundation

The 6.0 transport implementation was inherited from the preceding general-contractor package. Its historical test and activation records are not V7 evidence. Current tests and deployment gates are recorded separately.
