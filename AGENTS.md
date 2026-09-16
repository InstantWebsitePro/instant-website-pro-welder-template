# Codex operating instructions — Welder Website V9

These instructions apply to every Codex task in this repository.

## Mission and evidence

Build and maintain a truthful, distinctive, accessible, fast welding website. Keep technical implementation away from the owner’s normal conversation. Ask only for ordinary business facts, meaningful creative direction, major outcome approval, or an unavoidable account/security action.

Use evidence in this order:

1. Explicit owner approval in the current task.
2. `handoff/APPROVED_BUILD_BRIEF.md` and `handoff/DESIGN_LOCK.json`.
3. Approved public facts in `handoff/PUBLIC_BUSINESS_FACTS.json`.
4. The current production website in `public/`.
5. The connected V9 Welder Website Program source and private business-assets source, when available.

Never invent a business fact. Resolve a missing or conflicting claim before publishing it.

## V9 turn protocol

Recover the latest private PROGRESS LEDGER.md and pending version/approval before choosing the next action. Route the whole reply: answer a side question briefly and return to the saved action; put a future idea in the backlog without expanding scope; apply new facts/changes only where affected; obey explicit pause/cancel or task replacement. Do not restart intake or lose a pending approval. When work is already authorized, perform it now through the next genuine decision or unavoidable blocker; do not end with a plan or ask for “continue.”

Every homepage concept/revision must pass file 06's desktop/mobile design review and end with the explicit question: “Approve this homepage, tell me what to change, or say Randomize?” Save its exact version. Clear contextual approval starts the full build immediately without reapproval; a side comment or praise for one detail does not approve the whole concept. Read the whole reply: “looks good, also change the hero” requests a revised concept and its new approval, not immediate full build. A new fact triggers an impact check; retain approval when it does not materially change the approved concept. If approval already exists and is unaffected, a side question never creates another approval gate. Reuse unchanged finished-site approvals, but retain explicit authorization for the named public launch. After go-live approval, publish and verify; after the first asset-package yes, create/check/deliver the actual files and ZIP. No preview-only stopping point.

Before voluntarily yielding, save the compact private ledger with stage, current version, actual approval scope, exact pending decision, next action/actor, blockers and backlog. Full JSON stays checkpoint-only under schema 6.0; Markdown-only ACTIVE/WAITING_OWNER/PAUSED/CANCELLED labels do not become JSON enums. If private writes are unavailable, keep accurate private conversation state and disclose that limit; never claim a save or background continuation. End with one clear needed action, not a menu of unnecessary tasks. Completion requires live verification, launch/restore record and assets delivered or explicitly declined. An explicit pause/cancel stops work and is never falsely marked complete. File 00 contains the full routing and persistence protocol.

Private progress belongs outside this repository in the program’s private business-assets workspace. If only this repository is available, keep the same record in private conversation state and report that persistence limit; never commit a progress ledger or raw approval transcript. Read the connected program’s file 00 only when its protocol is needed, then retain the active stage.

## Path and privacy boundaries

Ordinary website work may edit `public/` and the four `handoff/` files when the facts or decisions being recorded are approved. It may also generate the deterministic, validated complete `website.zip` from that approved public tree and upload it through the documented importer recovery route under the applicable publication authorization. This does not authorize hand-editing archive contents or placing private material in the ZIP. Do not edit `.github/`, `functions/`, `infrastructure/`, `scripts/`, `templates/` or `tests/` unless the task explicitly requests infrastructure maintenance. `AGENTS.md` stays unchanged when it matches the configured edition template; only the exact one-time fallback copy described in Edition bootstrap is permitted.

Never commit private business records, raw interview notes, source media, license or insurance scans, permits, invoices, estimates, customer or employee data, credentials, secrets, recovery codes, or the private business-assets folder. Only approved public-ready derivatives belong in `public/`.

## Design sequence

Infer a private business-specific creative brief from confirmed work, customers, materials, process, existing brand and genuine proof. High visual ambition is automatic; no mandatory boldness rating, inspiration links, taste-signal questionnaire or font/motif choices. Voluntary preferences and explicit restraints still control. Develop exactly three private, genuinely different high-quality directions, choose one coherent winner and borrow only compatible details. Create actual custom raster artwork with available image tools or native SVG/CSS where appropriate, then integrate typography, graphics, borders/icons and structural motifs across a distinctive hero and varied later sections. Never portray invented work, people or equipment as real proof. Build the homepage only, render/review desktop and mobile, and pass file 06's behavioral rubric before presentation. Generic SaaS-card, logo-swap or superficial-palette results require internal rebuilding first. Refined and clean can be ambitious; no universal industrial skin. Randomize materially changes composition, typography/media and graphics while preserving confirmed facts.

End every checked homepage concept/revision with: “Approve this homepage, tell me what to change, or say Randomize?” Record its version and pending decision. A clear contextual approval starts the full site now; do not ask for permission to build it again. Before approval, build only the homepage. After approval, build every agreed page, preserved old address, action, policy, responsive state and function. The approved original homepage is the reference, never the disposable starter shell.

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

Do not call the program complete until the live HTTPS site is verified and the owner has received or explicitly declined the Business Asset Package. The first acceptance authorizes actual creation, checking and delivery of complete files and ZIP, with no second concept/export approval. Use sensible defaults, ask only for a blocking material input and continue independent assets; a preview cannot replace files. When accepted, create from approved branding and public facts: master logo exports, browser/device icons, Open Graph sharing image, concise brand guide PDF, two-sided print-ready business card with a tested direct HTTPS QR code, social avatar and cover exports, email-signature graphic, and a ZIP manifest. Add only 2–4 trade-specific extras that fit the welder's actual sales, field, follow-up, or commercial workflow. Every customer-facing file must use only the customer's approved brand—never Instant Website Pro, program/instructor branding, a program credit, or co-branding. Keep these assets private unless the owner asks to publish them, and test the final exports themselves.

Before review or handoff, summarize visible changes in plain language, identify changed facts and their source, provide current phone and desktop evidence, report exact checks, identify unresolved live gates, and include a rollback note for risky changes.

## Welder Program V9 security and customer experience

After the owner approves the design, implement and verify security as part of the build without adding a technical questionnaire. Tell the owner briefly that the program is checking secure connections, spam protection for enabled forms, safe handling of contact details, account access and a restore point. Report only controls actually configured or locally built; distinguish a code check from a live delivery/account check.

Use the owner-approved welding services, coverage, hours and response arrangements. A request form must never claim to book a slot, dispatch anyone or guarantee an emergency response unless it connects to a verified system that actually does so. Keep phone contact prominent. Ask no customer to submit card details, door/access codes, identification documents or unnecessary private information through the public form.

Before replacing a live site, preserve DNS and email records, web routes, integrations and a tested restore plan. Private GitHub does not mean private Pages. Use noindex for preview indexing control; use tested access controls when the owner requires a private preview. Do not put customer information in any preview.

Internal 6.0 manifest/schema/package identifiers are intentionally retained for compatibility; the deliverable is the Welder Program V9. Do not update these identifiers merely to match the program's marketing version. Keep the exact new release's local and live evidence separate from old versions.

## Edition bootstrap

Configured publishing template: `https://github.com/InstantWebsitePro/instant-website-pro-welder-template`. Before use, verify its owner, template setting and exact release contents; this configuration is not proof of publication. The normal edition template already includes this matching AGENTS.md. Verify that it matches the supplied edition file and retain it unchanged in the owner’s private copy. Only when a verified, release-authorized fallback source lacks the edition instructions may the program copy this exact included AGENTS.md once before launch. Do not invent a fallback or rewrite instructions to work around a version mismatch. Preserve other protected engine files.

The inherited disposable public shell is never business fact, style direction or service scope. Follow the connected edition module, replace the whole public shell with the approved original website and run production/privacy checks before launch.
