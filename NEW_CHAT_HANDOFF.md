# Morning Edition — Fresh Chat Handoff

Use this file to continue Morning Edition work in a fresh ChatGPT conversation without relying on the history of the original build chat.

## Start here

Repository: `BigCatMellow/Morning_Edition`

Primary files to read before making changes or generating an edition:

1. `EDITORIAL_GUIDE.md` — canonical editorial rules, research process, sections, recency rules, story schema, discovery targets, and self-review process.
2. `index.html` — current GitHub Pages reader UI.
3. `data/latest.json` — most recently published edition and the current live data shape.
4. Recent files in `data/archive/` — recent topic/source history and editorial reviews.
5. `README.md` — project overview and file layout.

Email delivery lives in `BigCatMellow/Notes`:

- `scripts/send_morning_edition.py`
- `scripts/send_morning_edition_newsletter.py`
- `.github/workflows/daily-morning-edition.yml`
- `data/morning-edition-trigger.txt`

Do not expose or modify SMTP secrets.

## Daily publication workflow

For a manual or scheduled Morning Edition run:

1. Read `EDITORIAL_GUIDE.md` first. Treat it as the single canonical editorial specification rather than reconstructing rules from old chats or duplicating a large prompt elsewhere.
2. Inspect the most recent 7–14 archived editions when available, including `editorial_review`, to detect topic repetition, source concentration, neglected areas, and opportunities for deliberate exploration.
3. Research current material on the web broadly before selecting narrowly. Prefer strong original reporting, primary research, and credible local/regional sources.
4. Build the Front Page first: one `lead_story` plus a `Front Page` section containing 2–4 additional ranked stories. Do not duplicate those stories later simply to fill sections.
5. Fill subject sections only with material that clears the editorial bar. Sections may be small or absent.
6. Include deliberate `Outside the Bubble` discovery and useful long-form reading when strong material exists.
7. Populate `published_date`, `original_language`, `topics`, and `selection_lane` when they can be established reliably and are useful.
8. Generate substantial Continue Reading synthesis in a separate reader pack at `data/readers/YYYY-MM-DD.json`, keyed by each story's source URL. Inline `reader` objects remain backward-compatible but are not required.
9. Run the edition-level quality check and persist a concise `editorial_review` in the edition JSON. This is an editorial process aid, not a claim about reader behavior.
10. Publish the completed edition to:
    - `data/latest.json`
    - `data/archive/YYYY-MM-DD.json`
    - `data/readers/YYYY-MM-DD.json`
    - `editions/YYYY-MM-DD.md`
11. Only after all Morning Edition files are successfully published, update `BigCatMellow/Notes/data/morning-edition-trigger.txt` with the Eastern Time date and the edition's `generated_at` timestamp. That commit triggers the existing SMTP email workflow.
12. Never update the email trigger when publication failed or `data/latest.json` is incomplete.

## Editorial behavior that matters most

Morning Edition should answer:

> What happened that is worth knowing, what is worth thinking about, and what might I be glad I discovered?

Signal matters more than volume. Do not fill sections merely because they exist.

A useful personalization target is roughly 70–80% high-confidence relevance and 20–30% intelligent exploration. Do not infer that a reader skipped or disliked a story unless explicit feedback or real telemetry exists.

Current-news material should generally focus on roughly the last 24–72 hours.

`In Case You Missed It` may contain 1–3 worthwhile stories mainly from the previous 2–8 weeks when their importance or explanatory value outlasted the original cycle.

Long reads do not have a strict freshness requirement. Current-affairs analysis may be weeks or months old; science/history/culture/psychology pieces may be several months old; philosophy, political thought, intellectual history, and genuinely evergreen essays may be a year old or substantially older.

Give special attention to Foreign Affairs when it has a strong relevant piece, but maintain a broad source mix.

## Existing website behavior

`index.html` is data-driven. New editions should not require hard-coded article changes.

The existing renderer supports:

- `lead_story`;
- arbitrary objects in `sections`;
- the top-level `worth_your_time` long-read array;
- archived editions from `data/archive/`;
- expanded Continue Reading content from either inline `reader` objects or `data/readers/YYYY-MM-DD.json`.

This means new editorial sections such as `Front Page`, `Society & Human Behavior`, `Outside the Bubble`, `Small Things Worth Knowing`, and `One Thing to Think About` can be added through edition data without changing the UI.

A story with substantial reader content gets a `Continue reading` option. A story without it falls back to the source link.

The current visual direction is a restrained newspaper aesthetic: warm paper colors, serif editorial typography, subtle alternating article backgrounds, off-white section headers, and a dark long-read block. Avoid turning it into a generic card-heavy app.

Current logo files:

- `assets/ME.svg` — masthead mark.
- `assets/MEicon.svg` — favicon/app icon.

## Email delivery

Morning Edition itself does not contain the email-sending Action. The trigger lives in `BigCatMellow/Notes`.

The Notes workflow runs when `data/morning-edition-trigger.txt` changes. The newsletter script fetches the public `Morning_Edition/main/data/latest.json`, refuses to send a stale edition unless explicitly overridden, sends to the existing configured recipients, then sends to active website subscribers when the Supabase service key is available.

Preserve this publish → website → trigger → email sequence unless the user explicitly requests an architectural change.

## Scheduled task

The Morning Edition ChatGPT task is configured to run daily at **8:25 AM Eastern** on an exact schedule. The earlier start provides roughly 20 minutes for research, publication, and email delivery so the finished edition should normally arrive by about **8:45 AM Eastern**.

The scheduled task should stay relatively concise and defer editorial detail to the repository's current `EDITORIAL_GUIDE.md`. This prevents the automation prompt and repository instructions from drifting apart.

The automatic run is independent of the development conversation's context window. Each run should rely on the repository and current web research.

## GitHub editing rules

- Search/fetch before overwriting existing files.
- `update_file` requires the current blob SHA.
- Do not use stale SHAs from old conversations.
- Do not parallel-write the same path.
- Preserve working behavior unless the requested change requires modifying it.
- Do not claim something is live until the repository change actually succeeds.
- Do not overwrite a dated archive with a substantially different edition unless correcting a clear publication error.

## Recommended prompt for a fresh chat

> Continue my Morning Edition project from GitHub. Use `BigCatMellow/Morning_Edition/NEW_CHAT_HANDOFF.md` as the handoff, then read `EDITORIAL_GUIDE.md`, `index.html`, `data/latest.json`, and recent archived editions before making changes. Treat the repository as the source of truth. For article research, use current web sources; for repo changes, use the connected GitHub repository directly. Preserve the existing automatic publish → website → email-trigger workflow.

For a fresh manual edition run, add:

> Run a fresh Morning Edition now, publish it according to the handoff and editorial guide, then trigger the existing email workflow only after publication succeeds.
