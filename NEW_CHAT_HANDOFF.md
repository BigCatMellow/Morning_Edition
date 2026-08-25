# Morning Edition — Fresh Chat Handoff

Use this file to continue Morning Edition work in a fresh ChatGPT conversation without relying on the history of the original build chat.

## Start here

Repository: `BigCatMellow/Morning_Edition`

Primary files to read before making changes:

1. `EDITORIAL_GUIDE.md` — canonical editorial rules, sections, recency rules, story schema, and reader/deep-read format.
2. `index.html` — current GitHub Pages reader UI.
3. `data/latest.json` — most recently published edition and the current live data shape.
4. `README.md` — project overview and file layout.

Email delivery lives in `BigCatMellow/Notes`:

- `scripts/send_morning_edition.py`
- `.github/workflows/daily-morning-edition.yml`
- `data/morning-edition-trigger.txt`

Do not expose or modify SMTP secrets.

## Daily publication workflow

For a manual or scheduled Morning Edition run:

1. Research current news on the web.
2. Follow `EDITORIAL_GUIDE.md` as the canonical editorial specification.
3. Prefer strong international/original reporting and perspectives outside the United States while still including important U.S. stories.
4. Build the current-news core plus the retrospective, local/fun, evergreen, and long-read material described in the editorial guide.
5. Include `published_date` when reliably known.
6. Generate a substantial `reader` object for each story when possible. The reader is original Morning Edition synthesis, not copied article text.
7. Publish the completed edition to:
   - `data/latest.json`
   - `data/archive/YYYY-MM-DD.json`
   - `editions/YYYY-MM-DD.md`
8. Only after those files are successfully published, update `BigCatMellow/Notes/data/morning-edition-trigger.txt` with the Eastern Time date and the edition's `generated_at` timestamp. That commit triggers the existing SMTP email workflow.
9. Never update the email trigger when publication failed or `data/latest.json` is incomplete.

## Important editorial behavior

The current-news core should generally focus on roughly the last 24–72 hours.

`In Case You Missed It` should normally contain 1–3 worthwhile stories from approximately the previous 2–8 weeks, including stories up to around one or two months old when their significance or explanatory value outlasted the original news cycle.

`Small & Fun News` should deliberately search local/regional newspapers and public broadcasters for one human-scale, charming, funny, odd-but-harmless, or feel-good story when a genuinely good one exists. Prefer the original local outlet. Do not make light of tragedy or personal misfortune.

Long reads do not have a strict freshness requirement. Current-affairs analysis may be weeks or months old; science/history/culture/psychology pieces may be several months old; philosophy, political thought, intellectual history, and other evergreen essays may be a year old or substantially older when still useful.

Give special attention to Foreign Affairs when it has a strong relevant piece, but keep a broad source mix.

## Website behavior

`index.html` is data-driven. New editions should not require hard-coded article changes.

A story with a substantial `reader` object gets a `Continue reading` option in the internal reader. A story without one should fall back to the source link rather than opening a duplicate of the front-page summary.

The current visual direction is a restrained newspaper aesthetic: warm paper colors, serif editorial typography, subtle alternating article backgrounds, off-white section headers, and a dark `Worth Your Time` block. Avoid turning it into a generic card-heavy app.

Current logo files:

- `assets/ME.svg` — masthead mark.
- `assets/MEicon.svg` — favicon/app icon.

Section icons were intentionally removed for now.

## Scheduled task

The Morning Edition scheduled ChatGPT task is already configured to run daily at **8:45 AM Eastern** using an exact schedule.

The automatic scheduled run is independent of the original development conversation's context window. Each run should rely on the repository instructions and current web research rather than old chat history.

## GitHub editing rules

- Search/fetch before overwriting existing files.
- `update_file` requires the current blob SHA.
- Do not use a stale SHA from an old conversation.
- Do not parallel-write the same path.
- Preserve existing behavior unless the requested change requires modifying it.
- Do not claim something is live until the repo change actually succeeds.

## Recommended prompt for a fresh chat

Paste this into a new ChatGPT conversation:

> Continue my Morning Edition project from GitHub. Use `BigCatMellow/Morning_Edition/NEW_CHAT_HANDOFF.md` as the handoff, then read `EDITORIAL_GUIDE.md`, `index.html`, and `data/latest.json` before making changes. Treat the repository as the source of truth rather than trying to reconstruct the old chat. For article research, use current web sources; for repo changes, use the connected GitHub repository directly. Preserve the existing automatic publish → website → email-trigger workflow.

For a fresh manual edition run, add:

> Run a fresh Morning Edition now, publish it according to the handoff and editorial guide, then trigger the existing email workflow only after publication succeeds.
