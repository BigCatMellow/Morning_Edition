# Morning Edition — Staged Publication Protocol

This protocol is the canonical ChatGPT-to-GitHub handoff for Morning Edition publication.

## Why it exists

Large complete-edition JSON bodies sent through a GitHub issue write proved intermittently unreliable at the connector boundary. Publication authority and validation remain in GitHub Actions; only the transport changes.

## Canonical handoff

1. Confirm Eastern today's date and check `data/latest.json.date`. If already published, exit.
2. Research and assemble the complete package using the editorial protocols.
3. Before staging, ensure the four `editorial_review` fields `section_uniqueness_check`, `human_scale_stakes_check`, `triangulation_check`, and `contextualization_check` each begin with `pass` (case-insensitive), and are supported by the actual editorial checks.
4. Create or replace only `staging/requests/YYYY-MM-DD.json` with compact JSON containing exactly `package_version`, `edition`, and `readers`.
5. Run `python scripts/publish_request.py --validate-staged staging/requests/YYYY-MM-DD.json` against the final file before pushing. This uses the same validator as publication; fix failures before committing. It does not publish or trigger Notes.
6. An owner-authored push changing the staging file on `main` triggers `Publish staged Morning Edition`. Do not create a publication issue.
7. Verify the workflow succeeded, all four canonical files persisted, staging was removed, and the downstream Notes trigger advanced. A failed run is not publication.

## Authority boundaries

The staging file is transport, not publication. Its presence does not mean an edition is published.

ChatGPT/scheduled agents must never directly write:
- `data/latest.json`
- `data/archive/YYYY-MM-DD.json`
- `data/readers/YYYY-MM-DD.json`
- `editions/YYYY-MM-DD.md`
- `BigCatMellow/Notes/data/morning-edition-trigger.txt`

GitHub Actions remains the publication authority.

## Failure behavior

On validation failure, correct the same-day staged package and rerun the preflight before committing the update. Do not manufacture passing review labels without the underlying checks. A corrected owner-authored push retries publication. If a GitHub write is blocked, report the exact blocker and retain the staged package; do not bypass the publication workflow.

A publication failure never disables, pauses, deletes, reschedules, or otherwise alters either Morning Edition recurring task.

## Compatibility

`scripts/publish_request.py` retains support for the older full-package issue envelopes so historical requests remain understandable. New scheduled/manual recovery runs should use this staged protocol.
