# Approved public build handoff

`handoff/` is a narrow bridge from the private V7 business-assets source to the public build. It is not a backup or mirror.

Use the files in this directory only after the matching facts or decisions are approved:

1. Confirm public-ready facts and resolve conflicts.
2. If an old website exists, record every known working public URL and its same-purpose replacement or exact approved redirect in `LEGACY_URL_PLAN.json`.
3. Record the homepage concept decision in `DESIGN_LOCK.json`. This is a look-and-feel approval, not approval to publish.
4. Populate `APPROVED_BUILD_BRIEF.md` and `PUBLIC_BUSINESS_FACTS.json` with the minimum public information needed for the build.
5. Build all remaining pages only after the homepage concept is approved.
6. Validate the finished website and resolve the owner's review requests. Disclose public preview reachability before upload or use verified access protection when needed. Reuse the review if the hosted version is unchanged; retain explicit final go-live approval and verify actual production behavior. Repeat checks when deployment differences, new changes or failures require them.

The Website Publishing System is not a design source. The approved homepage concept and business evidence control the custom site. A temporary preview may be used for owner review, but GitHub `main` and Cloudflare Pages are the final source and host.

Never place originals, raw captures, private records, interview notes, credentials, customer data, or the full business-assets source here. Phone owners do not edit these files; their approved one-ZIP package already contains only the public website.
