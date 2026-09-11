# Morning Edition — Fresh Chat Handoff

Use this file to continue Morning Edition work in a fresh ChatGPT conversation without relying on the history of the original build chat.

## Start here

Repository: `BigCatMellow/Morning_Edition`

Primary files to read before making changes or generating an edition:

1. `EDITORIAL_GUIDE.md` — canonical editorial rules, research process, sections, recency rules, story schema, discovery targets, and self-review process.
2. `PHILOSOPHY_READER_PROTOCOL.md` — canonical supplemental protocol for deep Continue Reading treatments of philosophy, ethics, political thought, social theory, intellectual history, and argument-driven essays.
3. `HUMAN_SCALE_NEWS_PROTOCOL.md` — canonical supplemental protocol for the recurring low-temperature local-news lane that restores a sense of ordinary scale to the paper.
4. `index.html` — current GitHub Pages reader UI.
5. `data/latest.json` — most recently published edition and the current live data shape.
6. Recent files in `data/archive/` — recent topic/source history and editorial reviews.
7. `README.md` — project overview and file layout.

Email delivery lives in `BigCatMellow/Notes`:

- `scripts/send_morning_edition.py`
- `scripts/send_morning_edition_newsletter.py`
- `.github/workflows/daily-morning-edition.yml`
- `data/morning-edition-trigger.txt`

Do not expose or modify SMTP secrets.

## Daily publication workflow

For a manual or scheduled Morning Edition run:

1. Read `EDITORIAL_GUIDE.md` first. Also read `PHILOSOPHY_READER_PROTOCOL.md` before generating reader packs for philosophy/Ideas selections, and read `HUMAN_SCALE_NEWS_PROTOCOL.md` before selecting the daily human-scale item. Treat those repository files as canonical rather than reconstructing rules from old chats or duplicating a large prompt elsewhere.
2. Inspect the most recent 7–14 archived editions when available, including `editorial_review`, to detect topic repetition, source concentration, neglected areas, and opportunities for deliberate exploration.
3. Research in four distinct lanes before selecting stories:
   - **Current news:** mainly the last 24–72 hours.
   - **In Case You Missed It:** mainly the previous 2–8 weeks, deliberately looking for consequential or revealing stories that fell out of the immediate cycle.
   - **Ideas and long-form:** philosophy, political thought, social theory, psychology, intellectual history, criticism, essays, academic papers, reviews, and other durable work with no strict freshness requirement.
   - **At Human Scale:** usually the previous 1–7 days, deliberately searching local and regional reporting for one or two low-temperature stories about ordinary community life whose value is perspective rather than consequence.
4. Research current material on the web broadly before selecting narrowly. Prefer strong original reporting, primary research, credible local/regional sources, and genuinely local sources for the human-scale lane.
5. Build the Front Page first: one `lead_story` plus a `Front Page` section containing 2–4 additional ranked stories. Do not duplicate those stories later simply to fill sections.
6. Fill subject sections only with material that clears the editorial bar. Sections may be small or absent, except for the recurring balance requirements below.
7. Include deliberate `Outside the Bubble` discovery, useful long-form reading when strong material exists, and the recurring `At Human Scale` perspective break.
8. Populate `published_date`, `original_language`, `topics`, and `selection_lane` when they can be established reliably and are useful.
9. Generate substantial Continue Reading synthesis in a separate reader pack at `data/readers/YYYY-MM-DD.json`, keyed by each story's source URL. Inline `reader` objects remain backward-compatible but are not required. Use the specialized philosophy protocol for philosophy, ethics, political thought, social theory, intellectual history, book reviews, and argument-driven essays rather than forcing them into a news-event template. Human-scale items normally do not need deep reader treatment unless useful local history or context genuinely warrants it.
10. Run the edition-level quality check and persist a concise `editorial_review` in the edition JSON. This is an editorial process aid, not a claim about reader behavior. Include a `human_scale_check` or equivalent note confirming that the lane was searched and either selected or consciously omitted.
11. Publish the completed edition to:
    - `data/latest.json`
    - `data/archive/YYYY-MM-DD.json`
    - `data/readers/YYYY-MM-DD.json`
    - `editions/YYYY-MM-DD.md`
12. Only after all Morning Edition files are successfully published, update `BigCatMellow/Notes/data/morning-edition-trigger.txt` with the Eastern Time date and the edition's `generated_at` timestamp. That commit triggers the existing SMTP email workflow.
13. Never update the email trigger when publication failed or `data/latest.json` is incomplete.

## Recurring balance requirements

Morning Edition is not supposed to become a current-news-only product. Each run must make deliberate room for material from different time horizons **and different scales of human life**.

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

#### Philosophy Continue Reading should use the available space

The front-page Ideas card should remain concise. The **Continue Reading** layer is where Morning Edition should unpack the argument in depth.

For a substantial philosophy or argument-driven selection, follow `PHILOSOPHY_READER_PROTOCOL.md`. The reader should normally help the user understand:

- the precise question being asked;
- the thesis rather than merely the topic;
- why the author thinks the conclusion follows;
- the important concepts in plain language;
- the relevant philosophical or historical background;
- a concrete example that makes the mechanism visible;
- the strongest serious objection;
- the author's likely response when it can be responsibly reconstructed;
- what else would have to change if the argument were right;
- connections to other thinkers, traditions, or live debates;
- one to three unresolved questions worth carrying forward.

Depth is welcome here. A good philosophy reader can be substantially longer than an ordinary story summary when the extra space is doing explanatory work rather than padding.

### At Human Scale is a standard daily perspective lane

`At Human Scale` should normally appear in every edition with **1–2 concise local stories**, usually from the previous **1–7 days**.

The purpose is not comedy, novelty, sentimentality, or a generic 'good news' quota. It is to prevent the newspaper from giving the false impression that the whole world consists of wars, national politics, markets, disasters, crises, and historically consequential events.

Search specifically for ordinary but specific local reporting: a farmer finding a missing sheep among another herd, a village restoring a clock or footbridge, a school or library solving a small problem, a local club or volunteer group doing something concrete, an escaped animal, a harvest, a community tradition, or another genuinely human-sized event whose stakes are mostly local.

Prefer the original small-town, regional, local-language, agricultural, island, village, county, neighborhood, or community source when accessible. Rotate geography; this should not become a daily 'small-town America' feature.

Do **not** use serious crime, tragedy, national political conflict disguised as local news, viral social-media posts, celebrity stories, corporate PR, or bizarre-news filler simply because the story is small.

The tone should be observational and modest. The item's value may simply be that it changes the reader's scale of attention for a moment.

Use section id `at-human-scale`. It may be omitted only after a real search fails to produce a properly sourced candidate that fits the tone. If omitted, `editorial_review` should say so explicitly.

See `HUMAN_SCALE_NEWS_PROTOCOL.md` for the full selection and sourcing rules.

### The intended daily mix

The paper should feel like a newspaper plus a small intellectual magazine, with one deliberate glimpse of ordinary local life:

- consequential fresh reporting;
- 1–3 worthwhile stories from roughly 2–8 weeks ago;
- at least one serious idea, philosophical argument, intellectual-history piece, or comparable reflective work;
- 1–3 exceptional long reads, including older evergreen work when useful;
- 1–2 low-temperature local stories at human scale;
- deliberate discovery outside the reader's normal search habits.

Quality still overrides mechanical quotas, but the non-news and human-scale lanes must be researched before they can be omitted.

## Editorial behavior that matters most

Morning Edition should answer:

> What happened that is worth knowing, what is worth thinking about, what might I be glad I discovered, **and what ordinary life is happening beyond the big-news frame?**

Signal matters more than volume. Do not fill sections merely because they exist.

A useful personalization target is roughly 70–80% high-confidence relevance and 20–30% intelligent exploration. Do not infer that a reader skipped or disliked a story unless explicit feedback or real telemetry exists.

Current-news material should generally focus on roughly the last 24–72 hours.

`In Case You Missed It` should normally contain 1–3 worthwhile stories mainly from the previous 2–8 weeks when their importance or explanatory value outlasted the original cycle.

`At Human Scale` should normally contain 1–2 concise, genuinely local, low-stakes stories from roughly the previous 1–7 days. Their purpose is perspective and texture, not consequence.

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

This means editorial sections such as `Front Page`, `Society & Human Behavior`, `Ideas`, `In Case You Missed It`, `Outside the Bubble`, `At Human Scale`, `Small Things Worth Knowing`, and `One Thing to Think About` can be added through edition data without changing the UI.

A story with substantial reader content gets a `Continue reading` option. A story without it falls back to the source link.

For philosophy/Ideas readers, the loaded `assets/section-icons.js` adapts generic reader headings into more appropriate labels such as `The question & argument`, `Argument map`, `Strongest objections & limits`, and `Questions to carry forward` when the story metadata identifies it as philosophy, ethics, political theory/thought, social theory, intellectual history, a book review, or an essay.

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

The scheduled task should stay relatively concise and defer editorial detail to the repository's current `EDITORIAL_GUIDE.md`, `PHILOSOPHY_READER_PROTOCOL.md`, `HUMAN_SCALE_NEWS_PROTOCOL.md`, and this handoff. It should explicitly preserve the four daily research lanes above so the run does not drift into a fresh-news-only edition or omit the ordinary-life perspective lane.

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

> Continue my Morning Edition project from GitHub. Use `BigCatMellow/Morning_Edition/NEW_CHAT_HANDOFF.md` as the handoff, then read `EDITORIAL_GUIDE.md`, `PHILOSOPHY_READER_PROTOCOL.md`, `HUMAN_SCALE_NEWS_PROTOCOL.md`, `index.html`, `data/latest.json`, and recent archived editions before making changes. Treat the repository as the source of truth. Preserve the four daily research lanes: fresh current news, 2–8 week `In Case You Missed It`, durable Ideas/philosophy/long-form material, and 1–7 day `At Human Scale` local reporting. Use the specialized philosophy reader protocol for deep Continue Reading treatments of arguments and ideas. Use the human-scale protocol to find ordinary, low-temperature local news that restores perspective without becoming a comedy, novelty, or generic good-news section. For article research, use current web sources; for repo changes, use the connected GitHub repository directly. Preserve the existing automatic publish → website → email-trigger workflow.

For a fresh manual edition run, add:

> Run a fresh Morning Edition now, publish it according to the handoff and editorial guide, then trigger the existing email workflow only after publication succeeds.
