# Codex operating instructions — Welder Website V8

These instructions apply to every Codex task in this repository.

## Mission and evidence

Build and maintain a truthful, distinctive, accessible, fast welding website. Keep technical implementation away from the owner’s normal conversation. Ask only for ordinary business facts, meaningful creative direction, major outcome approval, or an unavoidable account/security action.

Use evidence in this order:

1. Explicit owner approval in the current task.
2. `handoff/APPROVED_BUILD_BRIEF.md` and `handoff/DESIGN_LOCK.json`.
3. Approved public facts in `handoff/PUBLIC_BUSINESS_FACTS.json`.
4. The current production website in `public/`.
5. The connected V8 Welder Website Program source and private business-assets source, when available.

Never invent a business fact. Resolve a missing or conflicting claim before publishing it.

## Path and privacy boundaries

Ordinary website work may edit `public/` and the four `handoff/` files when the facts or decisions being recorded are approved. It may also generate the deterministic, validated complete `website.zip` from that approved public tree and upload it through the documented importer recovery route under the applicable publication authorization. This does not authorize hand-editing archive contents or placing private material in the ZIP. Do not edit `.github/`, `functions/`, `infrastructure/`, `scripts/`, `templates/` or `tests/` unless the task explicitly requests infrastructure maintenance. `AGENTS.md` stays unchanged when it matches the configured edition template; only the exact one-time fallback copy described in Edition bootstrap is permitted.

Never commit private business records, raw interview notes, source media, license or insurance scans, permits, invoices, estimates, customer or employee data, credentials, secrets, recovery codes, or the private business-assets folder. Only approved public-ready derivatives belong in `public/`.

## Design sequence

1. Confirm enough business facts, proof, media, customers, services, service area, and emotional qualities to design responsibly.
2. Privately develop three genuinely different written directions, synthesize their strongest ideas, and build **only a homepage look-and-feel concept**.
3. Let the owner Approve, request a normal change in plain language, or say `Randomize`. A Randomize request must produce a substantially different concept while respecting any plain-language direction supplied with it.
4. Do not build the remaining pages until the homepage concept is approved.
5. After approval, build every approved page, preserved old URL, action, policy, responsive state, and function. The approved homepage concept—not the starter shell—becomes the design reference.

The committed `public/` directory is a disposable safety shell, never a visual template. For a first production build, replace its starter-only pages and assets. Original local fonts, SVG artwork, icons, textures, imagery, animation, and JavaScript are welcome when they support the business’s distinct character and remain accessible, performant, and policy-compliant.

## Public build contract

- Work on a branch and use the applicable owner-visible review for ordinary desktop changes. The narrow recovery exception is uploading only a validated root `website.zip` to `main` after the exact-version/public-effect approval. An authorized browser, connector, local Git action or owner browser upload may make that input commit; the tested GitHub importer then validates and creates the resulting public-file commit. A feature-branch ZIP does not trigger this importer. Do not use this exception for arbitrary direct engine or public-file edits.
- Preserve every known working old public URL at the same path and purpose by default. Use an exact permanent redirect only when the destination truly replaces that purpose and the move plan is approved. Never sweep old pages to the homepage.
- Treat services, service areas, addresses, telephone numbers, hours, emergency availability, response times, prices, financing, warranties, licenses, insurance, bonding, certifications, years in business, reviews, awards, and project claims as evidence-sensitive.
- Prefer **Call** and **Request an Estimate** when confirmed. Never imply continuous monitoring.
- Never publish a private/home address for a service-area business. Publish an address only when customers may visit it and the owner approves public use.
- Avoid mass-produced or near-duplicate city pages. Every service and service-area page must help a real customer decide.
- Use semantic HTML, keyboard access, visible focus, readable contrast, useful alt text, reduced-motion behavior, responsive layouts, and one clear `h1` per page.
- Declare every public document and external media item in `site-manifest.json`. Keep video external, retain an optimized poster, and allow only the exact needed hosts.
- Do not add analytics, advertising pixels, chat widgets, embeds, or marketing forms without the matching approved business use and privacy treatment.
- Keep form recipients and secrets in the deployment environment. Turnstile widget action and `TURNSTILE_EXPECTED_ACTION` must match.

For every production change, keep `site-manifest.json` and `version.json` synchronized at schema, workflow, and repository package version `6.0`. Each page uses a canonical relative `file_path` plus root-relative `url_path` and `canonical_url_path`. Keep the complete favicon/app-icon family declared and linked.

GitHub `main` is the approved website record. Cloudflare Pages Git integration is the normal final host. ChatGPT Sites, a Work preview, or a local preview is temporary and must never be described as the live launch.

## Launch authorization

Reuse an existing authorization that covers the intended setup. If its scope is missing, ask once in plain language for the isolated private repository, Pages setup, safe defaults, HTTPS, automatic deployment, checks and restore point. Configure monitoring only when agreed and actually available. Preserve an existing approved canonical host; for a new domain the normal default is the non-`www` host with a path-preserving `www` redirect.

Perform authorized routine work without separate technical questions. Before uploading a hosted preview, explain its public reachability; use local review first or verified access protection when confidentiality is required. The owner must review the exact finished version, but an unchanged reviewed version does not need another hosted-preview approval. Resolve material changes or open review requests, and retain explicit final go-live approval. Pause for unavoidable sign-in, provider authorization, security verification, purchase, account ambiguity, unexpected conflict, destructive action or changed public scope.

Desktop upload fallback: when connected-app or browser automation cannot create the repository, guide the owner through creating a private repository from the program template and uploading the single validated root `website.zip` to `main` under the applicable publication approval. Verify and retain the matching edition instructions first; copy the included file only for a verified release-authorized fallback. The public ZIP cannot replace repository instructions. ChatGPT still prepares and validates the ZIP. Cloudflare Pages Git integration remains the normal deployment path. A compiled API/Wrangler runtime rehearsal is separate evidence and does not prove Git-triggered deployment; dashboard upload of the raw `functions/` directory is insufficient.

## Required checks

From the repository root, run:

```bash
python3 scripts/release_check.py
python3 scripts/validate_site.py public --mode production --repo-root .
```

Also inspect common phone and desktop widths. Test navigation, click-to-call, request-an-estimate, contact fallback, services, service-area explanations, proof links, forms, keyboard use, reduced motion, preserved old routes, and the 404 page. Verify live reachability and any enabled delivery route on this customer's actual site; template rehearsal is not proof of its domain, recipient or account configuration. Report unavailable device coverage precisely. Run checks appropriate to the change; repeat broader checks only for new changes, failures or unresolved concerns.

## Completion and Business Asset Package

Do not call the program complete until the live HTTPS site is verified and the owner has received or explicitly declined the Business Asset Package. When accepted, create from approved branding and public facts: master logo exports, browser/device icons, Open Graph sharing image, concise brand guide PDF, two-sided print-ready business card with a tested direct HTTPS QR code, social avatar and cover exports, email-signature graphic, and a ZIP manifest. Add only 2–4 trade-specific extras that fit the welder's actual sales, field, follow-up, or commercial workflow. Every customer-facing file must use only the customer's approved brand—never Instant Website Pro, program/instructor branding, a program credit, or co-branding. Keep these assets private unless the owner asks to publish them, and test the final exports themselves.

Before review or handoff, summarize visible changes in plain language, identify changed facts and their source, provide current phone and desktop evidence, report exact checks, identify unresolved live gates, and include a rollback note for risky changes.

## Welder Program V8 security and customer experience

After the owner approves the design, implement and verify security as part of the build without adding a technical questionnaire. Tell the owner briefly that the program is checking secure connections, spam protection for enabled forms, safe handling of contact details, account access and a restore point. Report only controls actually configured or locally built; distinguish a code check from a live delivery/account check.

Use the owner-approved welding services, coverage, hours and response arrangements. A request form must never claim to book a slot, dispatch anyone or guarantee an emergency response unless it connects to a verified system that actually does so. Keep phone contact prominent. Ask no customer to submit card details, door/access codes, identification documents or unnecessary private information through the public form.

Before replacing a live site, preserve DNS and email records, web routes, integrations and a tested restore plan. Private GitHub does not mean private Pages. Use noindex for preview indexing control; use tested access controls when the owner requires a private preview. Do not put customer information in any preview.

Internal 6.0 manifest/schema/package identifiers are intentionally retained for compatibility; the deliverable is the Welder Program V8. Do not update these identifiers merely to match the program's marketing version. Keep the exact new release's local and live evidence separate from old versions.

## Edition bootstrap

Configured publishing template: `https://github.com/InstantWebsitePro/instant-website-pro-welder-template`. Before use, verify its owner, template setting and exact release contents; this configuration is not proof of publication. The normal edition template already includes this matching AGENTS.md. Verify that it matches the supplied edition file and retain it unchanged in the owner’s private copy. Only when a verified, release-authorized fallback source lacks the edition instructions may the program copy this exact included AGENTS.md once before launch. Do not invent a fallback or rewrite instructions to work around a version mismatch. Preserve other protected engine files.

The inherited disposable public shell is never business fact, style direction or service scope. Follow the connected edition module, replace the whole public shell with the approved original website and run production/privacy checks before launch.
