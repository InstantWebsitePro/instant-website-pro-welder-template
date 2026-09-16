# V7 protected publishing infrastructure

This directory contains the nonvisual contracts used by both the desktop and phone routes. It controls safety, validation, packaging, route preservation, and deployment readiness—not colors, layouts, page count, or creative style.

- `importer-policy.json` is the shared public-tree and ZIP policy.
- `site-manifest.schema.json` is the closed V7 public manifest contract.
- `legacy-url-plan.schema.json` validates the approved old-URL plan.
- `starter-tree.sha256` permits starter-mode checks only for the exact neutral waiting shell.
- `form-environment.template.txt` lists optional form/Turnstile settings without credentials.
- `infrastructure-version.json` identifies the V7 contracts.
- `ACTIVATION_REHEARSAL.md` separates shared Git integration acceptance, compiled runtime evidence and per-customer launch checks.

Do not weaken a privacy, media, path, size, CSP, evidence, or approval rule to force an owner package through. Fix the public output, optimize the asset, or use an approved external delivery host.

The V7 contract deliberately permits original static HTML, truthful page structures, local CSS, JavaScript, fonts, SVG graphics, imagery, icons, and motion. The production design begins with an approved homepage concept and must be independent of the waiting shell. The creative-freedom regression fixture protects that freedom.

Cloudflare Pages Git integration is the normal deployment route. It preserves automatic deployments and builds the root `functions/` directory. A compiled API/Wrangler runtime test is recorded separately from Git integration acceptance. Dashboard upload of the raw repository does not compile its Functions.

Official action dependencies are pinned to reviewed full commit SHAs. Review and rehearse dependency update pull requests before merging.
