# Scheduled publication handoff

Morning Edition scheduled publication uses a GitHub-native handoff so the ChatGPT scheduler does not need to make multiple repository-content writes.

## Flow

1. The 5:00 AM ChatGPT task researches and validates the edition using the canonical repository protocols.
2. Instead of writing publication files directly, it creates one issue in this repository titled `[publish] Morning Edition YYYY-MM-DD`.
3. The issue body contains a base64-encoded compact JSON package inside the exact envelope:
   `<!-- MORNING_EDITION_PACKAGE\n<base64>\nMORNING_EDITION_PACKAGE -->`
4. `.github/workflows/publish-request.yml` accepts only OWNER-authored matching issues.
5. `scripts/publish_request.py` validates date, reader linkage, canonical URL uniqueness, Ideas/Worth Your Time separation, published-date format, and required editorial gates.
6. GitHub Actions writes `data/latest.json`, the dated archive, reader pack, and markdown edition in one commit.
7. The workflow re-reads and validates the persisted files.
8. Only then it updates `BigCatMellow/Notes/data/morning-edition-trigger.txt` in a separate cross-repository commit, which activates the existing email workflow.
9. A successful request issue is closed. A failed request stays open with a failure comment.

## Required one-time secret

The publisher needs a fine-grained GitHub token because GitHub's built-in `GITHUB_TOKEN` is intentionally restricted to this repository.

Create a fine-grained token with:
- Repository access: **Only selected repositories → BigCatMellow/Notes**
- Repository permission: **Contents: Read and write**
- No other write permission

Store that token in **BigCatMellow/Morning_Edition → Settings → Secrets and variables → Actions** as:

`NOTES_TRIGGER_TOKEN`

Do not commit the token to either repository.

## Failure behavior

- Invalid packages do not publish.
- Publication-file failure does not advance the Notes trigger.
- Persisted validation failure does not advance the Notes trigger.
- Missing/invalid `NOTES_TRIGGER_TOKEN` prevents the trigger commit and email.
- The ChatGPT recurring tasks must remain enabled after any publication failure.
- The 5:30 recovery task checks `data/latest.json` first and submits a recovery package only when today's edition is still missing.
