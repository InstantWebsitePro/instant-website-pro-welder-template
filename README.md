# Instant Website Pro Welder Publishing System V8

This repository is the publishing and safety foundation for the **desktop Instant Website Pro program for welders and metal fabricators**. It validates public output, protects the private/public boundary, packages approved websites, supports Cloudflare Pages publishing and keeps a restore path. The owner supplies business knowledge and reviews the result; the program handles the website work.

Dedicated template: https://github.com/InstantWebsitePro/instant-website-pro-welder-template

## An original website, built from approved facts

The inherited `public/` tree and root `website.zip` are disposable starter scaffolding. They are not a finished business website, an approved design or reusable customer facts. Do not deploy them as a customer's site or relabel them as the new business. Test fixtures under `tests/` remain fictional implementation tests and never enter public output.

Build an original responsive homepage from this business's confirmed services, customers, territory, real proof and brand. Show it for approval before building the full website. Meaningful design changes and Randomize remain available. After approval, replace the complete starter `public/` tree with the owner's finished website. Original layouts, fonts, graphics, icons, media, animation, CSS and JavaScript are welcome within the safety and accessibility boundaries; the starter must not dictate the design.

## Desktop workflow and recovery

- **Normal desktop work:** ChatGPT edits the approved website in `public/`, validates it and prepares publishing in the owner's isolated private GitHub workspace.
- **One-file recovery:** ChatGPT produces a complete validated `website.zip`. If permitted automation cannot upload it, the owner makes one guided browser upload. The existing importer validates the package before replacing `public/`; a rejected import leaves the prior public tree unchanged. The inherited workflow display name **Publish phone website upload** is a compatibility label, not a phone-program requirement.
- **Hosting:** Cloudflare Pages Git integration deploys `public/` from `main`, with optional Pages Functions under `functions/`. Mobile visitor usability is still tested even though the program itself is desktop-only.

Use the available connection and permission flow; never assume that a signed-in browser grants control or that every connector can write. The owner completes sign-ins, security prompts and payments directly. Preserve workspace and administrator restrictions.

## Privacy and protected infrastructure

```text
private business-assets source    facts, originals, approvals; never commit
handoff/                          minimum approved public facts and decisions
public/                           deployable approved website only
website.zip                       deterministic full-site transport
```

Never commit program prompts, private business records, confidential drawings, raw originals, account secrets or other customer data. The customer program's private folder and its parent are not Git roots.

Keep `.github/`, `functions/`, `infrastructure/`, `scripts/`, `tests/`, `templates/` and repository instructions protected during ordinary website work. This coordinated V8 release changes only the edition instructions and this README relative to the inherited engine. Do not rewrite engine code to produce a new design. Generate `website.zip` through the provided packager; it is a validated output, not a file to hand-edit. Follow `AGENTS.md` for the precise approved output boundary.

## Repository map

```text
.github/workflows/                validation, ZIP import, rollback, health checks
public/                           replaceable public website output
functions/api/                    optional contact and health endpoints
handoff/                          public-safe build context
infrastructure/                   shared contracts and rehearsal instructions
scripts/                          validator, packager, importer, live checker
tests/                            inherited production and hostile-input fixtures
templates/                        optional implementation snippets
website.zip                       full-site transport; initial file is a placeholder
```

## V8 edition and stable transport contract

Program content is V8; the tested schema and transport contract remains **6.0**. Use `business_type: welder-metal-fabricator` with `contractor_profile.trade_categories: ["welding-metalwork"]` for this edition's generated public manifest. Keep the existing nested fields and enums. Use truthful `LocalBusiness` structured data with only supported public facts; a valid schema is not a search-ranking promise.

`website.zip` contains the whole production website with `index.html` at ZIP root and must pass `infrastructure/importer-policy.json`. There is no parent wrapper folder, nested archive, bundled large video, private business source, raw capture, workbook or protected program file. Manifest/workflow/repository-contract values follow the existing 6.0 schema, even when the owner-facing program is V8.

The manifest accounts for pages, old routes, public documents, icons, external media and optional forms. Keep useful old URLs at the same path and purpose by default. Individually approved exact redirects are exceptions; do not redirect every old address to the homepage.

## Optional inquiry forms

Forms stay disabled until the owner's destination and security settings are configured and tested. Use exact approved HTTPS origins, server-verified Turnstile hostname/action checks and encrypted deployment secrets. `REQUIRE_TURNSTILE=false` does not bypass verification. Keep a verified call, email or existing contact fallback.

Set `SITE_NAME` to the actual public business name. Use the handler's existing fields, including `service_location` and required `privacy_consent`; do not invent a `city` field or accept attachments. Additional project-detail UI can serialize into the existing bounded `message` field. Confidential drawings need a separately verified exchange route.

Author the website's own accessible response wording using HTTP status, `ok` and optional `field`; do not display inherited response-message copy blindly. Ordinary success requires a successful HTTP response, `ok: true` and `submissionId`. A honeypot can receive 200/ok without an ID, which is not delivery evidence. Preserve entered details on errors, explain when submission is unconfirmed and keep the fallback visible. Provider acceptance is separate from confirmed arrival in the intended inbox. An inquiry is not a quote, appointment, accepted project or promised start date.

## Cloudflare Pages setup

Use **Git integration**, framework **None**, repository root, a blank build command, output directory `public` and production branch `main`. Authorize only the intended repository when possible. Before the first deployment, confirm that the complete approved website has replaced the starter output and passed production validation. A tested `exit 0` command is acceptable only if an existing project requires it and that exact configuration is verified.

An ordinary `pages.dev` address can be opened by others even when the GitHub repository is private or the preview is noindex. Explain this before uploading; verify authentication and signed-out denial if confidential hosting is required. Remove starter robots/noindex restrictions for the approved production domain only at the appropriate launch stage.

Dashboard static upload does not compile the repository's Functions. A correctly compiled API/Wrangler deployment can test runtime behavior but does not prove Git-triggered deployment. A Direct Upload project requires a new project to adopt Git integration. Preserve existing DNS and email records during any domain cutover.

## Local checks

```bash
python3 -B scripts/release_check.py
python3 -B scripts/validate_site.py public --mode production --repo-root .
python3 -B scripts/package_site.py --source public --output website.zip --repo-root .
```

Production validation applies to the generated finished website, not the untouched waiting shell. The packager creates a deterministic ZIP, extracts it to a temporary directory, reruns production validation and compares exact public bytes before replacing the previous package.

## Launch, evidence and restore

The owner reviews the homepage, then the finished site, and approves the exact final public launch. Reuse existing setup authorization without repeated technical questions. Confirm account identity, preview audience, domain and old-URL plans, customer actions and a restore point. A green deployment alone is not a working lead path. After launch verification, continue to creation and delivery of the accepted Business Asset Package.

For urgent hosting recovery, use Cloudflare deployment history. For canonical source recovery, use **Roll back website files** with a known-good full commit SHA. Never force-push or erase normal history. Monitoring runs only when actually configured and tested.

The creator release evidence records the exact published commit, template setting, file parity, checks and any live integration exercised. Historical engine evidence does not establish a new account connection or a new trade-specific live deployment. See `infrastructure/ACTIVATION_REHEARSAL.md` for the inherited rehearsal mechanics; interpret legacy names there as compatibility context. Each customer's approved site still needs its own domain, contact-delivery, mobile and restore checks.

Support: support@instantwebsitepro.com. Do not send passwords, tokens or private customer details.
