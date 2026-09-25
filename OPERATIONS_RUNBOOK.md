# Morning Edition — Operations & Publication Runbook

This is the durable operational reference for how Morning Edition is supposed to run, how publication is validated, and how to diagnose failures.

Use this together with:

- `EDITORIAL_GUIDE.md` for editorial and data-format rules.
- `PHILOSOPHY_READER_PROTOCOL.md` for philosophy/argument-driven Continue Reading.
- `HUMAN_SCALE_NEWS_PROTOCOL.md` for the At Human Scale lane.
- `SOURCE_TRIANGULATION_PROTOCOL.md` for consequential or contested factual stories.
- `NEW_CHAT_HANDOFF.md` for fresh-agent orientation.

## Source of truth

The repository is authoritative for editorial behavior and publication structure.

The scheduled ChatGPT task should recover current repository state before each run and should not rely on remembered chat context or a stale copy of the rules.

The normal primary schedule is daily at **5:00 AM Eastern**, with an independent recovery check at **5:30 AM Eastern**.

## Parent outcome

A successful daily run produces a complete, validated edition that is readable on the site and safe to trigger for email delivery.

Publication is not complete merely because files were written.

The run is DONE only when:

1. the edition has been researched and selected according to the repository protocols;
2. all required publication files exist;
3. every JSON artifact parses;
4. the reader-pack schema is correct;
5. reader treatments link to the final canonical story URLs;
6. applicable triangulation requirements pass;
7. the live publication files have been re-read after writing;
8. only then is the Notes email trigger updated.

## Intended daily flow

### 1. Recover current state

Read the canonical instructions, then inspect:

- `data/latest.json`
- the most recent 7–14 files under `data/archive/`
- recent `editorial_review` notes
- recent At Human Scale geography
- current site behavior in `index.html` when relevant

Do not assume yesterday's remembered state is still correct.

### 2. Research four distinct lanes

Research before selecting:

1. **Current news** — mainly the previous 24–72 hours.
2. **In Case You Missed It** — deliberately search both **Recent Misses** from the previous ~72 hours and **Older Catch-up** from roughly 4 days–8 weeks, with deliberate attention to the 2–8 week range.
3. **Ideas / long-form** — durable essays, philosophy, political thought, psychology, intellectual history, criticism, papers, reviews, and related work with no strict freshness requirement.
4. **At Human Scale** — generally the previous 1–7 days of genuinely local or regional ordinary-life reporting.

Do not allow a strong current-news pool to crowd out the other lanes without an actual search.

## In Case You Missed It coverage contract

The section is designed to prevent two different kinds of loss:

- **Recent Misses (~72 hours):** consequential stories that were crowded out of the Front Page by larger developments.
- **Older Catch-up (~4 days–8 weeks):** stories that became clearer with distance, were under-covered, or simply fell out of the immediate cycle. Search the **2–8 week** range deliberately on every run.

The normal target is **2–4 ICYMI stories**, preferably including at least one from each sub-lane when both clear the editorial bar. This is not a quota. Do not duplicate the Front Page and do not promote weak leftovers merely to fill the section.

`editorial_review` should separately record whether the Recent Misses search and Older Catch-up search were performed and whether each produced a selected story.

### 3. Select and write the concise edition

Build the Front Page first, then add only sections whose stories clear the editorial bar.

The main edition should stay concise.

### 4. Perform Continue Reading as a separate pass

For each substantial selected story, reopen the source and build a deeper treatment.

A normal factual reader should explain, where useful:

- what happened;
- why it matters;
- necessary background;
- the bigger picture;
- implications, with confidence distinctions when appropriate;
- uncertainty;
- concrete signals to watch;
- useful connections;
- supporting sources used for verification or context.

For consequential or contested stories, apply `SOURCE_TRIANGULATION_PROTOCOL.md`. As part of that pass, actively seek at least one **actual local or on-the-ground report from the affected place when reasonably available**. A primary document is useful evidence but is not the same thing as local journalism. If credible local reporting cannot be found after a real search, proceed with the strongest available sources and record the limitation for consequential stories.

For philosophy and argument-driven work, use `PHILOSOPHY_READER_PROTOCOL.md` rather than forcing the story into a news-event template.

Human-scale items normally remain concise unless deeper local context genuinely helps.

## Required publication outputs

Every successful run must create or update:

- `data/latest.json`
- `data/archive/YYYY-MM-DD.json`
- `data/readers/YYYY-MM-DD.json`
- `editions/YYYY-MM-DD.md`

After those pass all validation gates, update:

- `BigCatMellow/Notes/data/morning-edition-trigger.txt`

The trigger must be committed separately and must never be updated after a failed or incomplete Morning Edition publication.

## Canonical reader-pack schema

The top-level shape of `data/readers/YYYY-MM-DD.json` is mandatory:

```json
{
  "date": "YYYY-MM-DD",
  "generated_at": "ISO-8601 timestamp",
  "readers": {
    "https://canonical-story-url.example/article": {
      "standfirst": "...",
      "body": ["...", "..."],
      "why_it_matters": "...",
      "background": "...",
      "bigger_picture": "...",
      "significance": {
        "label": "...",
        "rationale": "..."
      },
      "uncertainty": "...",
      "key_points": ["...", "..."],
      "what_to_watch": ["...", "..."],
      "supporting_sources": [
        {
          "name": "...",
          "url": "https://...",
          "role": "Independent external verification"
        }
      ]
    }
  }
}
```

The URL-to-reader map belongs **inside `readers`**.

This is wrong:

```json
{
  "https://canonical-story-url.example/article": {
    "standfirst": "..."
  }
}
```

A file may be syntactically valid JSON and still be an invalid Morning Edition reader pack.

## Publication validation gate

Before triggering email, verify all of the following.

### JSON validity

Every JSON artifact must parse successfully.

Do not rely on visual inspection.

Reject malformed quotes, dangling commas, literal control characters, unescaped line breaks inside strings, and similar errors.

### Reader-pack schema

Parse the reader pack and assert:

- the top-level value is an object;
- `date` exists;
- `readers` exists;
- `readers` is an object;
- reader treatments are nested under `readers`, not at the file root.

### Reader linkage

Collect the final canonical URLs from the published edition.

Every story intended to have Continue Reading must have an exact matching key under `pack.readers`.

If a story URL changes after the reader pack is drafted, update the reader key before publication completes.

### Context quality

For substantial reader treatments, confirm the deeper layer actually adds context rather than merely repeating the card summary.

For consequential or materially contested factual stories, confirm required independent evidence streams and usable supporting-source URLs/roles are present. Also confirm that a real local-reporting search occurred for place-based stories; when a credible local report exists it should normally appear as `Local reporting`, and when none is reasonably available the limitation should be documented rather than silently skipped.

### Re-read after write

Re-fetch the published `data/latest.json` and `data/readers/YYYY-MM-DD.json`.

Validate the persisted versions, not only the in-memory draft that was intended to be written.

## Known incident: September 18, 2026 reader-pack regression

### Symptom

Beginning with the **2026-09-18** edition, Continue Reading explanations and supporting sources appeared to disappear from the website even though much of the reader content still existed in the repository.

### Root cause

The 2026-09-17 reader pack used the correct structure:

```json
{
  "date": "2026-09-17",
  "readers": {
    "ARTICLE_URL": {
      "standfirst": "..."
    }
  }
}
```

Beginning 2026-09-18, scheduled runs wrote a raw URL map at the file root:

```json
{
  "ARTICLE_URL": {
    "standfirst": "..."
  }
}
```

The website's loader expected `pack.readers`.

The malformed files were still valid JSON, so a JSON-syntax-only validation step did not catch the failure. The site's reader loader therefore received no canonical reader map and silently omitted Continue Reading content.

The regression affected reader packs for September 18–21 before repair.

### Corrective actions taken

- Repaired the September 18, 19, 20, and 21 reader packs to the canonical top-level schema.
- Hardened `index.html` so it can fall back to a legacy/raw URL map instead of silently dropping all readers.
- Strengthened the scheduled Morning Edition task so publication fails when the top-level `readers` object is missing.
- Strengthened the task's linkage gate so persisted reader keys must match final story URLs before the email trigger may be updated.
- Added this runbook as the durable reference.

The compatibility fallback in `index.html` is defense in depth. It does **not** make raw root-level URL maps an accepted publication format. New reader packs must use the canonical schema.

## Known incident: September 22, 2026 invalid publication date blocked the whole page

Detailed incident record: [`incidents/2026-09-22-preparing-the-paper-invalid-date.md`](incidents/2026-09-22-preparing-the-paper-invalid-date.md)

### Symptom

The Tuesday **2026-09-22** edition had been published correctly, but the website remained on **Preparing the paper**.

### Root cause

One Ideas story used:

```json
"published_date": "2026-09-24 issue"
```

The site formatter treated every `published_date` as a JavaScript date and passed the invalid value to `Intl.DateTimeFormat`. That raised a `RangeError` during `render()`, aborting the entire edition before the placeholder content could be replaced.

### Corrective actions taken

- Corrected the story metadata to `"published_date": "2026-09-24"` in `data/latest.json` and `data/archive/2026-09-22.json`.
- Hardened the site's `prettyDate` and `shortDate` helpers so an invalid date value falls back to raw text instead of crashing the edition.
- Added a publication rule that machine-readable `published_date` values must use exact `YYYY-MM-DD` format.

### General lesson

Metadata must not be allowed to become a page-wide single point of failure. Publication validation should check semantic field formats, not only whether the JSON parses.

## Troubleshooting

### Continue Reading buttons disappear for most or all stories

Check, in order:

1. Does `data/readers/YYYY-MM-DD.json` exist?
2. Does it parse?
3. Does it contain a top-level `readers` object?
4. Are the expected story URLs keys under `readers`?
5. Do those keys exactly match the final URLs in `data/latest.json` or the dated archive?
6. Does each mapped reader contain enough expanded content for `index.html` to consider it substantial?

If step 3 fails, compare the incident above.

### Continue Reading opens but sources are missing

Inspect the reader's `supporting_sources` array.

For applicable factual stories, verify that each supporting source has:

- a usable URL;
- a clear name;
- a concise role such as `Local reporting`, `Primary document`, `Official data`, or `Independent external verification`.

Then compare the story against `SOURCE_TRIANGULATION_PROTOCOL.md`.

### One story lacks Continue Reading while others work

This is more likely a URL-linkage or content-threshold problem than a whole-pack schema failure.

Compare the exact story URL in the edition with the exact key under `readers`.

### Email sent but website data is incomplete

Treat that as a publication-gate failure.

The email trigger is downstream of publication and must not move until the repository artifacts have passed validation and been re-read.

## Recovery procedure

When a reader-pack failure is found:

1. inspect the affected dated archive and reader file;
2. preserve the story content and URLs where correct;
3. repair the smallest structural or linkage defect;
4. validate the repaired JSON;
5. verify exact URL linkage;
6. re-read the persisted file;
7. verify the website can attach the reader data;
8. document a new failure mode here if it is materially different from the September 18 incident.

Do not rewrite historical editorial content merely to repair a schema or linkage defect.

## Current resilience

Morning Edition currently has three layers protecting Continue Reading:

1. **Canonical documentation** — the required reader-pack shape is defined in `EDITORIAL_GUIDE.md` and this runbook.
2. **Publication gate** — the scheduled task explicitly requires `pack.readers` and exact URL linkage before completion/email triggering.
3. **UI compatibility fallback** — `index.html` can still consume a legacy/raw URL map if one appears, preventing a single schema regression from silently hiding every reader.

The publication gate remains authoritative. The UI fallback exists only to reduce user-visible failure severity.


## Known incident: September 25, 2026 scheduled run fired but published nothing and became disabled

Detailed incident record: [`incidents/2026-09-25-scheduled-run-disabled-before-publication.md`](incidents/2026-09-25-scheduled-run-disabled-before-publication.md)

### Symptom

The normal 8:25 AM Eastern scheduled task recorded a run, but no September 25 publication artifacts were committed. The recurring task was disabled immediately afterward.

### Established cause

The exact platform-level exception is not exposed on the available scheduler surface, so the narrow root cause remains unknown. What is verified is that execution stopped **before the first publication commit** and the recurring task did not remain enabled.

This failure class is distinct from malformed-data incidents because the repository never received a partial September 25 edition.

### Corrective actions

- Re-enabled the primary 8:25 AM Eastern Morning Edition task.
- Added an explicit rule that publication failure must not intentionally disable or alter the recurring scheduler.
- Added an independent post-run recovery task with an idempotent date guard:
  - if `data/latest.json.date` equals today's Eastern date, exit;
  - otherwise execute the canonical Morning Edition workflow from this repository and publish the missing edition;
  - update the Notes email trigger only after all existing publication gates pass.
- Preserved the downstream email safety gate rather than sending from stale or incomplete data.

### General lesson

A validation gate protects data quality but cannot protect against the scheduler itself failing before publication begins. Scheduler resilience therefore requires a **separate failure boundary**: an independent recovery execution that checks the repository's observable state rather than trusting whether the primary task reports success.

## Scheduler resilience contract

The normal publication schedule and the recovery schedule have different roles:

1. **Primary publisher — 5:00 AM Eastern**
   - Runs the full canonical workflow.
   - Remains enabled after ordinary publication failures.
   - Never advances the email trigger after an incomplete publication.

2. **Recovery publisher — 5:30 AM Eastern**
   - Reads `data/latest.json` first.
   - Uses today's Eastern date as the idempotency guard.
   - Does nothing when today's edition already exists.
   - Runs the full canonical publication workflow only when today's edition is missing.
   - Uses the same JSON, linkage, date, triangulation, persisted-file re-read, and email-trigger gates as the primary publisher.

A recovery path must never be implemented by weakening validation or by blindly sending yesterday's edition.
