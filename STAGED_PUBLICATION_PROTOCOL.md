# Morning Edition — Staged Publication Protocol

This protocol is the canonical ChatGPT-to-GitHub handoff for Morning Edition publication.

## Why it exists

Large complete-edition JSON bodies sent through a GitHub issue write proved intermittently unreliable at the connector boundary. Publication authority and validation remain in GitHub Actions; only the transport changes.

## Canonical handoff

After research, assembly, and every editorial gate passes:

1. Confirm `data/latest.json.date` is not today's America/New_York date.
2. Confirm no recovery/publish request already exists for today's date.
3. Create exactly one staging file:
   `staging/requests/YYYY-MM-DD.json`
4. The staging file must contain compact valid JSON with exactly the existing publication package shape:
   `{"package_version":1,"edition":<final edition>,"readers":<final reader pack>}`
5. Re-fetch the staging file and record its Git blob SHA.
6. Create exactly one OWNER-authored issue titled:
   `[publish] Morning Edition YYYY-MM-DD recovery`
7. The issue body must be exactly this small reference envelope:

   ```
   <!-- MORNING_EDITION_REQUEST_JSON
   {"request_version":1,"staging_path":"staging/requests/YYYY-MM-DD.json","staging_sha":"<40-character blob SHA>"}
   MORNING_EDITION_REQUEST_JSON -->
   ```

8. Verify the issue exists and `author_association` is `OWNER`.
9. Verify `Publish Morning Edition request` starts.
10. GitHub Actions verifies the staging path and blob SHA before parsing the package.
11. The Action applies the existing publication gates, writes the four canonical publication artifacts, removes the staging file in the same publication commit, rereads persisted output, and only then advances the separate Notes trigger.

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

If staging-file creation fails, retry that same staging write once. Do not create an issue without a verified staging file and SHA.

If issue creation fails, retry the same issue creation once. Do not create multiple requests for the date.

If validation fails after the issue exists, correct the staging package in place, re-fetch its new blob SHA, and edit the same issue body with the new SHA. The workflow listens for issue edits, so this retries the same request without creating a duplicate issue.

A publication failure never disables, pauses, deletes, reschedules, or otherwise alters either Morning Edition recurring task.

## Compatibility

`scripts/publish_request.py` retains support for the older full-package issue envelopes so historical requests remain understandable. New scheduled/manual recovery runs should use this staged protocol.
