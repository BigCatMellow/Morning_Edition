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
3. Research in three distinct lanes before selecting stories:
   - **Current news:** mainly the last 24–72 hours.
   - **In Case You Missed It:** mainly the previous 2–8 weeks, deliberately looking for consequential or revealing stories that fell out of the immediate cycle.
   - **Ideas and long-form:** philosophy, political thought, social theory, psychology, intellectual history, criticism, essays, academic papers, reviews, and other durable work with no strict freshness requirement.
4. Research current material on the web broadly before selecting narrowly. Prefer strong original reporting, primary research, and credible local/regional sources.
5. Build the Front Page first: one `lead_story` plus a `Front Page` section containing 2–4 additional ranked stories. Do not duplicate those stories later simply to fill sections.
6. Fill subject sections only with material that clears the editorial bar. Sections may be small or absent, except for the recurring balance requirements below.
7. Include deliberate `Outside the Bubble` discovery and useful long-form reading when strong material exists.
8. Populate `published_date`, `original_language`, `topics`, and `selection_lane` when they can be established reliably and are useful.
9. Generate substantial Continue Reading synthesis in a separate reader pack at `data/readers/YYYY-MM-DD.json`, keyed by each story's source URL. Inline `reader` objects remain backward-compatible but are not required.
10. Run the edition-level quality check and persist a concise `editorial_review` in the edition JSON. This is an editorial process aid, not a claim about reader behavior.
11. Publish the completed edition to:
    - `data/latest.json`
    - `data/archive/YYYY-MM-DD.json`
    - `data/readers/YYYY-MM-DD.json`
    - `editions/YYYY-MM-DD.md`
12. Only after all Morning Edition files are successfully published, update `BigCatMellow/Notes/data/morning-edition-trigger.txt` with the Eastern Time date and the edition's `generated_at` timestamp. That commit triggers the existing SMTP email workflow.
13. Never update the email trigger when publication failed or `data/latest.json` is incomplete.

## Recurring balance requirements

Morning Edition is not supposed to become a current-news-only product. Each run must make deliberate room for material from different time horizons.

### In Case You Missed It is a standard daily lane

`In Case You Missed It` should normally appear in every edition with **1–3 stories**, mainly from the previous **2–8 weeks**.

The purpose is not to recycle old headlines. Search specifically for stories that were consequential, revealing, under-covered in the United States, easy to miss, or more meaningful after a little time passed.

Do not let the section disappear merely because enough fresh news was found. It may be omitted only when a genuine 2–8 week search fails to produce anything that clears the editorial bar. If omitted, `editorial_review` should state that the older-news lane was searched and why no candidate was selected.

### Ideas and philosophy are part of the daily paper, not occasional decoration

Every edition must deliberately search for **philosophy, political thought, social theory, ethics, psychology, intellectual history, criticism, serious essays, and relevant academic papers**. These selections do not need to be tied to the day's headlines.

Normally include at least **one dedicated reflective/Ideas selection** in addition to the current-news core. It can be an essay, paper, review, lecture, argument, historical intellectual piece, or carefully framed philosophical question. A strong `Ideas` section is preferred when a source piece exists; `One Thing to Think About` can supplement it but should not become a substitute for consistently finding serious outside ideas.

The `worth_your_time` / Long Read block should normally include **1–3 pieces**, and at least one should regularly come from the durable ideas/essay lane rather than being simply a longer version of current affairs. Philosophy and intellectual history can be years old or much older if the argument remains useful.

Useful discovery ecosystems include Aeon, Psyche, 3 Quarks Daily, Arts & Letters Daily, Foreign Affairs, serious university publications, academic journals, open-access papers, intellectual reviews, and high-quality independent essay publications. These are discovery sources, not a whitelist.

Do not satisfy the ideas check simply by writing that no separate Ideas section was forced because a long read was reflective. If `Ideas` is omitted, the review should make clear that a real ideas/philosophy search occurred and why the strongest candidates failed the bar.

### The intended daily mix

The paper should feel like a newspaper plus a small intellectual magazine:

- consequential fresh reporting;
- 1–3 worthwhile stories from roughly 2–8 weeks ago;
- at least one serious idea, philosophical argument, intellectual-history piece, or comparable reflective work;
- 1–3 exceptional long reads, including older evergreen work when useful;
- deliberate discovery outside the reader's normal search habits.

Quality still overrides mechanical quotas, but the non-news lanes must be researched before they can be omitted.

## Editorial behavior that matters most

Morning Edition should answer:

> What happened that is worth knowing, what is worth thinking about, and what might I be glad I discovered?

Signal matters more than volume. Do not fill sections merely because they exist.

A useful personalization target is roughly 70–80% high-confidence relevance and 20–30% intelligent exploration. Do not infer that a reader skipped or disliked a story unless explicit feedback or real telemetry exists.

Current-news material should generally focus on roughly the last 24–72 hours.

`In Case You Missed It` should normally contain 1–3 worthwhile stories mainly from the previous 2–8 weeks when their importance or explanatory value outlasted the original cycle.

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

This means editorial sections such as `Front Page`, `Society & Human Behavior`, `Ideas`, `In Case You Missed It`, `Outside the Bubble`, `Small Things Worth Knowing`, and `One Thing to Think About` can be added through edition data without changing the UI.

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

The scheduled task should stay relatively concise and defer editorial detail to the repository's current `EDITORIAL_GUIDE.md` and this handoff. It should explicitly preserve the three research lanes above so the run does not drift into a fresh-news-only edition.

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

> Continue my Morning Edition project from GitHub. Use `BigCatMellow/Morning_Edition/NEW_CHAT_HANDOFF.md` as the handoff, then read `EDITORIAL_GUIDE.md`, `index.html`, `data/latest.json`, and recent archived editions before making changes. Treat the repository as the source of truth. Preserve the three daily research lanes: fresh current news, 2–8 week `In Case You Missed It`, and durable Ideas/philosophy/long-form material. For article research, use current web sources; for repo changes, use the connected GitHub repository directly. Preserve the existing automatic publish → website → email-trigger workflow.

For a fresh manual edition run, add:

> Run a fresh Morning Edition now, publish it according to the handoff and editorial guide, then trigger the existing email workflow only after publication succeeds.
