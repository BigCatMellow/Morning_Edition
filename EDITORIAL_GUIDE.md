# Morning Edition — Editorial Guide

## Purpose

Morning Edition is a personal daily newspaper assembled for one thoughtful reader. It is not an RSS dump, a generic AI news summary, or a list of whatever is trending.

Each edition should answer three questions:

> **What happened that is worth knowing, what is worth thinking about, and what might I be glad I discovered?**

The goal is a better-informed and more intellectually curious reader, not maximum news consumption. Signal matters more than volume.

Morning Edition should combine consequential current events with science, history, culture, psychology, technology, ideas, long-form journalism, and deliberate discovery outside the reader's established interests.

## Editorial north star

A good edition should feel edited rather than accumulated.

Prefer:

- one excellent story over five mediocre ones;
- original reporting over rewrites and aggregation;
- analysis and explanation over outrage;
- primary sources and research papers when appropriate;
- surprising but consequential stories over viral stories;
- strong local or regional reporting when covering another country;
- a useful older essay over a weak article published this morning;
- leaving a section out over filling it with filler.

Avoid:

- celebrity news unless it has unusual cultural or institutional significance;
- routine political horse-race coverage;
- outrage bait and culture-war churn;
- trivial product announcements;
- SEO content and press-release rewrites;
- multiple stories that are essentially the same event;
- generic "AI is changing everything" pieces;
- stories selected mainly because they are popular;
- false balance when the underlying evidence is not balanced;
- forced conclusions when an unresolved question is more intellectually useful.

## Editorial priorities

Priority subjects include:

1. World affairs, geopolitics, diplomacy, conflict, institutions, trade, migration, and international relations.
2. U.S. news when genuinely consequential.
3. Science and scientific research, including medicine, biology, physics, space, climate, environment, archaeology, and emerging fields.
4. History and archaeology.
5. Psychology and human behavior.
6. Society, economics, institutions, demographics, education, work, and cultural change.
7. Technology and AI, especially computing, open source, cybersecurity, infrastructure, and the internet when the development has broad significance.
8. Philosophy, political thought, social theory, and questions worth thinking about.
9. Books, essays, criticism, art, language, media, and intellectual culture.
10. Interesting developments outside the normal news cycle.
11. Exceptional long-form journalism.
12. Strange, delightful, overlooked, or human-scale stories that add texture to the day.

Foreign Affairs is especially aligned with the desired style of international analysis and deserves regular attention, but no publication should dominate the edition.

Useful source ecosystems include serious newspapers and magazines, academic and research institutions, journals, public broadcasters, investigative organizations, The Conversation, Aeon, Psyche, 3 Quarks Daily, Arts & Letters Daily, MIT Technology Review, Knowable Magazine, and high-quality independent publications. This is not a whitelist.

## Personalization without a filter bubble

The edition should be approximately **70–80% high-confidence relevance and 20–30% intelligent exploration**.

Before researching a new edition, inspect recent archived editions—normally the previous 7–14 days when available—and look for:

- topics repeatedly selected;
- sources that appear too frequently;
- repeated story frames or events;
- emerging interests;
- areas that have been neglected;
- discoveries that broadened the paper rather than merely matching known interests.

Use explicit reader feedback when it exists. Do **not** pretend to know which stories the reader skipped unless actual feedback or telemetry exists. Publication history is evidence of what Morning Edition selected, not proof of what the reader liked.

Avoid overfitting. A subject appearing several times may reflect an important news cycle rather than a permanent preference.

## Daily research and selection process

The generator should use this sequence each day.

### 1. Read the recent paper before reading today's news

Inspect the most recent archives and their `editorial_review` objects. Note recent topics, countries, sources, recurring frames, and long-read selections so today's edition does not unconsciously reproduce yesterday's.

### 2. Research broadly before selecting narrowly

Search across multiple source ecosystems and geographic regions before choosing final stories. Build a sufficiently broad candidate pool to allow real editorial choice rather than accepting the first plausible results.

Search deliberately for:

- consequential developments;
- under-covered international stories;
- original reporting from the place being covered;
- primary research or authoritative scientific coverage;
- serious analysis and essays;
- older work whose value outlasts the news cycle;
- one or more candidates outside established interests;
- local, human-scale, or delightful reporting.

### 3. Judge candidates on value, not category quotas

For each serious candidate, ask:

- **Consequence:** Does this materially affect people, institutions, knowledge, economies, policy, culture, or the future?
- **Explanatory value:** Will understanding it help make sense of other events or ideas?
- **Evidence:** Is the central claim well-supported, or is uncertainty clearly stated?
- **Source quality:** Is this original reporting, primary research, or a strong synthesis?
- **Novelty:** Does it add something not already represented in recent editions?
- **Discovery value:** Might the reader be glad to have encountered this even if he would not have searched for it?
- **Shelf life:** Is this worth knowing tomorrow, next week, or next month?

A story does not need to score highly on every dimension. It should, however, have a clear reason to exist in the paper.

### 4. Rank the Front Page first

Choose the 3–5 stories most worth knowing today before filling subject sections. The Front Page is a ranking of importance and value, not a sampling quota.

One story is the lead. The remaining 2–4 are secondary Front Page stories.

Do not repeat those same story objects later merely to fill a section.

### 5. Build sections only from stories that clear the bar

Sections are containers, not obligations. A weak Science story should not be included merely because Science is usually present. A strong edition may have uneven section sizes or omit a section entirely.

### 6. Perform an edition-level diversity check

Before publication, check the paper as a whole for:

- too many stories about the same event or theme;
- excessive concentration in one country or region;
- excessive concentration in one publication or media ecosystem;
- too much U.S./Western-European coverage;
- too much AI or technology relative to the rest of the world;
- a lack of genuine discovery;
- a lack of long-form reading;
- an Ideas section that is actually just opinion news;
- a paper that looks substantially identical to yesterday without a compelling news reason.

### 7. Run the final quality gate

Every included story should have a defensible answer to **"Why is this in Morning Edition?"**

If the answer is vague, remove it.

## Source principles

- Every factual story must link to a real source.
- Prefer original reporting and primary research over rewrites.
- For major breaking stories, consult multiple reputable sources even when one source is displayed as primary.
- Use the real article URL, not a homepage, search page, or invented link.
- Never invent links, quotes, statistics, paper titles, dates, or article details.
- If an important claim cannot be verified, omit it.
- Clearly distinguish reporting, analysis, opinion, essay, research, review, history feature, local reporting, and other useful types.
- Include the publication's country or region when useful for understanding perspective.
- Include the original publication date whenever it can be established reliably.
- Record the article's original language whenever it can be established reliably.
- For scientific work, distinguish preliminary evidence, preprints, observational findings, animal studies, small trials, and stronger replicated or consensus evidence when that distinction matters.
- Treat institutional press releases as leads to investigate, not automatically as sufficient journalism.

## Geographic and language diversity

Morning Edition should be genuinely international, not merely American news viewed through British and Australian publications.

For each daily edition:

- Search across multiple geographic regions before final selection. As a practical target, the current-news core should normally draw from at least **four regions outside the United States** when the news supports it: Europe, East Asia, South Asia, Southeast Asia, the Middle East/North Africa, sub-Saharan Africa, Latin America/Caribbean, Oceania, and other relevant regions.
- Aim to include at least **two strong stories sourced directly from publications whose original reporting is in a language other than English** when credible and accessible material exists. This is a discovery target, not a quota that justifies weak material.
- Normally use no more than **two current-news-core stories from the same outlet**.
- Avoid letting a single publication country account for more than roughly **one quarter to one third** of the current-news core unless an extraordinary event clearly justifies it.
- When covering a country or region, first look for credible local or regional reporting before defaulting to Reuters, AP, BBC, The Guardian, ABC Australia, or another large English-language outlet.
- Wire services and major international publications remain valuable for verification and for stories where local reporting is unsafe, inaccessible, unreliable, or unavailable.
- Seek different media ecosystems, not merely different domain names.
- Periodically rotate source discovery so the edition does not settle into a small convenience set.

Useful language ecosystems may include Spanish, Portuguese, French, German, Italian, Dutch, Polish, Ukrainian, Russian, Arabic, Hebrew, Persian, Turkish, Hindi and other South Asian languages, Mandarin Chinese, Japanese, Korean, Indonesian, Malay, Vietnamese, Thai, and languages used across Africa and other regions. Quality and independence matter more than language or location.

### Translation policy

Non-English reporting is welcome. Language must not be a reason to discard a strong source.

- Read and synthesize the original-language article when accessible.
- Translate meaning rather than sentence structure.
- Preserve names, numbers, uncertainty, distinctions, and the source's actual claims.
- Do not present a translated headline as an exact quotation unless it truly is one.
- Machine-translated snippets may assist discovery but should not be the sole basis for consequential claims when the underlying article can be inspected.
- Cross-check ambiguous translations or consequential details against another reliable source, official document, or authoritative account.
- Preserve the original article URL.
- Do not assume a local outlet is independent or trustworthy merely because it is local. Clearly recognize state-controlled or strongly partisan sources when relevant.

## Recency and age rules

Morning Edition is not restricted to articles published today.

### Current news

Front Page, World, Science, Society, Technology, and other current-news sections should generally prioritize developments from roughly the last **24–72 hours**, while using older context when needed.

### In Case You Missed It

An optional **In Case You Missed It** section may contain 1–3 stories that remain important, revealing, or unusually interesting despite no longer being fresh headlines.

- Look mainly across the previous **2–8 weeks**.
- Stories from roughly the last one to two months are acceptable when their significance outlasted the initial news cycle.
- Prefer consequential stories that were easy to miss, received limited U.S. attention, or became more meaningful with hindsight.
- Do not recycle unavoidable headlines merely because they are still recent.

### The Long Read

Long reads do **not** need to be recent unless their usefulness depends on current conditions.

- Current-affairs analysis may be weeks or months old if still accurate.
- Science, history, culture, psychology, technology, and institutional analysis may be several months old.
- Philosophy, political thought, intellectual history, literary essays, and genuinely evergreen work may be a year old or substantially older when the argument remains useful.
- Never reject an exceptional essay solely because it is old.
- Always show the publication date so archive selections are clearly intentional.

## Newspaper structure

The exact mix should vary with the material. Recommended sections follow.

### Front Page

The **3–5 stories most worth knowing today**.

The lead story lives in `lead_story`. The other 2–4 Front Page stories live in the optional top-level `front_page` array.

Each should make clear:

- what happened;
- why it matters;
- useful context;
- the source.

Front Page stories should not be duplicated in later sections.

### World

Important international developments, including stories receiving insufficient U.S. attention. Look beyond the United States and Western Europe.

### Science

Research, discoveries, medicine, space, biology, physics, environment, archaeology, and related fields. Explain the strength and limits of evidence when relevant.

### Society & Human Behavior

Psychology, economics, institutions, demographics, education, work, social behavior, and cultural change.

### Technology

Important developments in computing, AI, open source, cybersecurity, infrastructure, and the internet. Keep this section broad and consequential; highly technical hobbyist material belongs in a separate Tech Edition rather than dominating Morning Edition.

### History & Culture

History, archaeology, books, art, language, media, cultural criticism, intellectual history, and useful historical parallels.

### Ideas

Essays, philosophical questions, intellectual debates, social theory, and serious think pieces. This section should contain ideas rather than ordinary opinion-news commentary.

It may intentionally leave a question unresolved when doing so is more useful than forcing a conclusion.

### The Long Read

Select **1–3 exceptional pieces** worth spending real time with. Explain specifically why each deserves the reader's time rather than merely summarizing it.

The data field remains `worth_your_time` for backward compatibility with existing archives and interfaces, but the editorial name is **The Long Read**.

### Outside the Bubble

Deliberately find something the reader probably would not have searched for himself but has a reasonable chance of finding fascinating.

This is a core discovery function, not a novelty slot.

Good candidates may come from:

- obscure scientific fields;
- infrastructure;
- anthropology;
- industrial design;
- linguistics;
- unusual engineering;
- forgotten history;
- an unfamiliar country;
- niche art or craft;
- an unexpected subculture;
- a new research area.

Do not confuse unexpected with random. The selection should still have intellectual substance, explanatory value, beauty, ingenuity, or human interest.

Recommended section id: `outside-the-bubble`.

### Small Things Worth Knowing

A small number of concise discoveries: facts, tools, maps, papers, visualizations, archives, museum collections, datasets, unusual local stories, or other things that are worth encountering but do not need a full article treatment.

This section may absorb the spirit of the older `Small & Fun News` and `Something I Didn't Know Yesterday` sections when that produces a cleaner edition. Those older section IDs remain valid for archived or occasional use.

Recommended section id: `small-things`.

### One Thing to Think About

End the editorial sequence with one question, argument, paradox, historical comparison, or philosophical problem worth carrying through the day.

Do not use a motivational quote.

This item may be original Morning Edition framing rather than a conventional article. If it relies on factual or historical claims, cite the source material.

Recommended section id: `one-thing-to-think-about`.

## Internal reader

Morning Edition has a built-in **Continue Reading** modal. The reader should provide a fuller Morning Edition treatment without reproducing copyrighted articles.

Recommended reader fields:

- `standfirst`: one or two sentences orienting the reader;
- `body`: 3–7 short explanatory paragraphs;
- `context`: concise background needed to understand the subject;
- `key_points`: 2–5 important facts, arguments, implications, or takeaways;
- `what_to_watch`: what could happen next when meaningful.

The reader is newly written synthesis based on verified reporting. It may combine context from multiple verified sources, but the displayed source remains the primary article being recommended.

Do not paste full copyrighted articles or substantial passages into the reader. Brief quotations should be rare and short.

### Reader-pack storage

The live site already supports a separate reader pack, and new editions should normally use it to keep the primary edition JSON compact.

Create:

`data/readers/YYYY-MM-DD.json`

using this shape:

```json
{
  "date": "YYYY-MM-DD",
  "readers": {
    "https://original-article-url.example/story": {
      "standfirst": "...",
      "body": ["...", "..."],
      "context": "...",
      "key_points": ["...", "..."],
      "what_to_watch": "..."
    }
  }
}
```

The source URL is the key. Inline `reader` objects remain valid for backward compatibility, but the separate reader pack is preferred for new editions because `index.html` automatically attaches it when available.

## Story data format

A standard story object may use:

```json
{
  "headline": "...",
  "summary": "...",
  "why_it_matters": "...",
  "source": "...",
  "country": "...",
  "original_language": "English",
  "published_date": "YYYY-MM-DD",
  "url": "https://...",
  "type": "reporting",
  "topics": ["geopolitics", "trade"],
  "selection_lane": "core"
}
```

`topics` is optional but useful for detecting repetition across recent editions.

`selection_lane` is optional and should be either `core` or `exploration`. It exists for editorial review, not for display. Across the edition, intelligent exploration should normally account for roughly 20–30% of selections, but quality overrides arithmetic.

`original_language` should contain the language of the specific article, such as `English`, `Spanish`, `French`, `Arabic`, `Mandarin Chinese`, or `Japanese`.

## Edition JSON format

`data/latest.json` and archived editions use this top-level structure:

```json
{
  "date": "YYYY-MM-DD",
  "generated_at": "ISO-8601 timestamp",
  "title": "Morning Edition",
  "dek": "One-line description of today's edition.",
  "lead_story": { "headline": "..." },
  "front_page": [
    { "headline": "..." },
    { "headline": "..." }
  ],
  "sections": [
    {
      "id": "world",
      "title": "World",
      "items": []
    }
  ],
  "worth_your_time": [],
  "editorial_review": {
    "filler_check": "pass",
    "repetition_check": "pass",
    "geographic_check": "pass",
    "discovery_check": "pass",
    "long_read_check": "pass",
    "ideas_check": "pass",
    "difference_from_recent": "Brief note on how this edition differs from recent editions.",
    "notes_for_next_edition": ["..."]
  }
}
```

Unknown optional metadata fields should be ignored by the interface and email renderer.

### Editorial review

After assembling each edition, silently evaluate:

1. Which selections were genuinely valuable?
2. Which selections are at risk of being filler?
3. Are too many stories about the same subject?
4. Is geographic coverage too narrow?
5. Does the edition contain real discovery?
6. Is there enough worthwhile long-form material?
7. Does Ideas contain actual ideas rather than opinion news?
8. Does today's paper differ meaningfully from recent editions where appropriate?

Persist a concise `editorial_review` in the archived edition and `latest.json`. Future runs should read recent reviews before selecting new stories.

The review is an editorial process aid, not a claim about actual reader behavior.

## Repository outputs

Every successful daily publication should create or update:

- `data/latest.json`
- `data/archive/YYYY-MM-DD.json`
- `data/readers/YYYY-MM-DD.json`
- `editions/YYYY-MM-DD.md`

The dated archive files are permanent. `data/latest.json` is the stable endpoint for the website and email delivery. The reader pack supplies expanded Continue Reading content.

Do not overwrite an existing dated archive with a substantially different edition unless correcting a clear publication error.

Only after all Morning Edition publication files are successfully written should the external email trigger be updated.

## Writing style

Write like an intelligent newspaper editor.

- Use clear language and assume the reader may know nothing about the specific subject.
- Explain necessary context without bloating the piece.
- Define specialized terms when they are necessary.
- Distinguish fact, inference, uncertainty, and argument.
- Explain why a story matters rather than merely restating the article.
- Avoid hype words such as `game-changing`, `groundbreaking`, `massive`, or `incredible` unless objectively warranted.
- Keep headlines concise and informative rather than click-driven.
- Do not manufacture urgency.

The finished paper should feel calm, selective, worldly, and curious.