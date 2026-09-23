# Incident — 2026-09-22: Tuesday edition stuck on “Preparing the paper”

## Status

Resolved.

## User-visible symptom

The Tuesday, September 22, 2026 edition existed in the repository, but the website never replaced the default **Preparing the paper** placeholder.

The scheduler had run and `data/latest.json` contained the Tuesday edition, so this was not a missing-publication failure.

## Root cause

One Ideas story used this value:

```json
"published_date": "2026-09-24 issue"
```

`index.html` assumed every populated `published_date` was parseable as a real JavaScript date.

During rendering, the site passed that value through `Intl.DateTimeFormat`. The invalid date produced a `RangeError`, which aborted `render()` before the page could replace the initial placeholder.

This meant one bad metadata field prevented the entire edition from displaying.

## Why the normal checks missed it

The edition JSON was syntactically valid.

The failure was semantic rather than structural:

- JSON parsing succeeded.
- The edition file existed.
- The scheduler completed.
- GitHub Pages deployed successfully.
- The browser failed only when it tried to interpret the malformed date metadata.

A “JSON parses” check alone was therefore insufficient.

## Immediate repair

The malformed metadata was changed to:

```json
"published_date": "2026-09-24"
```

The correction was applied to:

- `data/latest.json`
- `data/archive/2026-09-22.json`

No editorial content needed to be rewritten.

## Renderer hardening

The date helpers in `index.html` were changed so invalid date metadata can no longer crash the whole edition.

`prettyDate` and `shortDate` now test whether the parsed date is valid. If it is not, the renderer falls back to the raw text rather than throwing during formatting.

This is defense in depth. New content is still required to use valid machine-readable dates.

## Canonical prevention rule

When `published_date` is present, it must be an exact calendar date:

```text
YYYY-MM-DD
```

Examples:

Valid:

```json
"published_date": "2026-09-24"
```

Invalid:

```json
"published_date": "2026-09-24 issue"
"published_date": "September 24, 2026 issue"
"published_date": "Fall 2026"
"published_date": "approx. 2026-09-24"
```

If contextual wording is needed, put it in prose or another optional metadata field rather than `published_date`.

## Diagnosis procedure if “Preparing the paper” appears again

Check in this order:

1. Confirm `data/latest.json` exists and contains the expected edition date.
2. Parse `data/latest.json` as JSON.
3. Check browser-rendered metadata fields, especially every `published_date`.
4. Validate each populated `published_date` against:
   - `^\d{4}-\d{2}-\d{2}$`
5. Check whether `index.html` has a render-time exception path that can abort before `content.innerHTML` is replaced.
6. Verify the current GitHub Pages deployment corresponds to the intended commit.
7. If the edition data is good but the page is still stuck, inspect other render-time assumptions in the same way: one malformed field should not be allowed to abort the whole edition.

## Verification performed after the fix

After repair:

- `data/latest.json` parsed successfully.
- `data/archive/2026-09-22.json` parsed successfully.
- No Tuesday story had an invalid `published_date`.
- The Tuesday reader pack retained a valid top-level `readers` object.
- All **7/7** Tuesday Continue Reading entries matched final story URLs.
- The hardened date guard was present in `index.html`.
- The final GitHub Pages deployment completed successfully.

## Related incident

See the September 18 reader-pack regression in `OPERATIONS_RUNBOOK.md`.

That incident was different: the site could render the edition, but Continue Reading silently disappeared because the reader-pack top-level schema was wrong.

Together, the two incidents establish two separate publication checks:

1. **Structural/schema validation** — does the artifact have the required shape?
2. **Semantic/render validation** — can the site safely consume the values inside that shape?

## Fix summary

If this exact failure recurs:

1. Find any non-`YYYY-MM-DD` `published_date`.
2. Correct it in `data/latest.json` and the matching dated archive.
3. Confirm the renderer still contains the invalid-date guard.
4. Revalidate the edition and reader linkage.
5. Let GitHub Pages deploy the corrected commit.
