# Morning Edition — Editorial Guide

## Purpose

Morning Edition is a personal daily newspaper designed to broaden perspective rather than reproduce a U.S.-centric headline feed. It should keep the reader informed about the present while also surfacing older reporting, essays, local stories, and ideas that remain worth reading after the immediate news cycle has moved on.

## Editorial priorities

1. Major world developments that materially affect people, institutions, economies, science, or international relations.
2. Reporting and perspectives from outside the United States whenever strong sources are available.
3. Science, technology and AI developments with real significance rather than product-release churn.
4. History, culture, psychology and human behavior.
5. Philosophy, political thought, social theory and other intellectually serious think pieces.
6. Under-covered stories that are important or unusually revealing.
7. Long-form journalism and essays worth reading in full, including older evergreen work.
8. Important or unusually interesting stories from recent weeks that may have been missed during the daily news cycle.
9. Human-scale local reporting: funny, warm, strange, charming, community-minded, or simply interesting stories that would never become national news.
10. Interesting discoveries or stories that are valuable even when they are not conventionally important news.

Foreign Affairs should receive special attention for worthwhile analysis, but the edition should maintain a broad international source mix.

## Source principles

- Prefer original reporting and reputable international outlets.
- Prefer non-U.S. sources when quality is comparable, but **do not treat English-language UK, Australian, Canadian, or other Anglosphere outlets as sufficient international diversity by themselves**.
- Deliberately search reporting produced in the country or region being covered, including reputable publications whose original language is not English.
- Include important U.S. reporting when the story warrants it.
- For local and small-town stories, strongly prefer the original local newspaper, public broadcaster, community outlet, or regional publication rather than a national aggregation of the story.
- Do not repeat the same event several times unless different sources provide meaningfully different perspectives.
- Verify material claims before publication.
- Use the real article URL, not a publication homepage or search page.
- Clearly label reporting, analysis, opinion, essay, research, history feature, local reporting, or other useful type.
- Include the publication's country or region when useful for understanding perspective.
- Include the original publication date for every story whenever it can be established reliably.
- Record the source's original language when it is not English.

## Geographic and language diversity

Morning Edition should be genuinely international, not merely American news viewed through British and Australian publications.

For each daily edition:

- Search across **multiple geographic regions** before selecting the final stories. As a practical target, the current-news core should normally draw from at least **four regions outside the United States**, when the news supports it: Europe, East Asia, South Asia, Southeast Asia, the Middle East/North Africa, sub-Saharan Africa, Latin America/Caribbean, Oceania, and other relevant regions.
- Aim to include at least **two strong stories sourced directly from publications whose original reporting is in a language other than English** when credible and accessible material is available. This is a discovery target, not a requirement to include weak material merely to fill a quota.
- Avoid allowing one publication or one country of publication to dominate the edition. Normally use no more than **two stories from the same outlet in the current-news core**, and avoid letting any single publication country account for more than roughly **one quarter to one third** of the core unless an extraordinary news event clearly justifies it.
- When covering a country or region, first look for credible **local or regional reporting** before defaulting to Reuters, AP, BBC, The Guardian, ABC Australia, or another large English-language outlet. Wire services and major international publications remain useful for verification and for stories where local sourcing is unsafe, inaccessible, unreliable, or unavailable.
- Seek different media ecosystems, not simply different domains. Five English-language publications based in London or Sydney do not count as five meaningfully different perspectives.
- Periodically rotate source discovery so recurring editions do not settle into the same small group of convenient publishers.

Useful source ecosystems to search may include reputable national newspapers, public broadcasters, magazines, investigative organizations, scientific publications, and regional outlets in Spanish, Portuguese, French, German, Italian, Dutch, Polish, Ukrainian, Russian, Arabic, Hebrew, Persian, Turkish, Hindi and other South Asian languages, Mandarin Chinese, Japanese, Korean, Indonesian, Malay, Vietnamese, Thai, and languages used across Africa and other regions. This is not a whitelist; quality, independence, relevance, and factual reliability matter more than language or country.

### Translation policy

Non-English reporting is welcome. Language must not be a reason to discard a strong source.

- Read and synthesize the original-language article when it is accessible, translating the relevant information into clear English for Morning Edition.
- Translate **meaning rather than sentence structure**. Headlines and summaries should sound natural in English while preserving the source's claims, uncertainty, tone, names, numbers, and distinctions.
- Do not present a translated headline as an exact quotation unless it is actually a faithful short quotation and quotation is necessary.
- When a story's `original_language` is not English, the interface may label it as **Translated from [language]**.
- If an important detail is ambiguous in translation, cross-check it against another reliable source, an official document, or an authoritative English-language account before publication.
- Machine-translated search snippets can help discover a story but should not be the sole basis for important factual claims when the underlying article can be inspected.
- Preserve the original article URL even when Morning Edition presents an English synthesis.
- Never infer that an outlet is independent, trustworthy, or representative merely because it is local. Apply the same source-quality checks used for English-language publications, and be especially clear when using state-controlled media or strongly partisan outlets.

## Recency and age rules

Morning Edition is not restricted to articles published today.

### Current news

The main World, Science & Technology, and other news sections should generally prioritize developments from the last 24–72 hours, while using older context when it materially improves understanding.

### In Case You Missed It

Include a dedicated **In Case You Missed It** section with 1–3 stories that remain important, revealing, or unusually interesting despite no longer being fresh headlines.

- Look mainly across the previous **2–8 weeks**.
- Stories from roughly the last **one to two months** are fully acceptable when their significance outlasted their initial news cycle.
- Do not use this section merely to recycle famous stories that were already unavoidable. Prefer consequential stories that were easy to miss, received limited U.S. attention, or became more meaningful with hindsight.
- Explain briefly why the story is still worth knowing now.

### Worth Your Time / long reads

Long reads do **not** need to be recent unless their value depends on current events.

- Current-affairs analysis can come from the last several weeks or months if it remains accurate and useful.
- Science, history, culture, psychology, technology, and institutional analysis may be several months old.
- Philosophy, political thought, intellectual history, literary essays, and other genuinely evergreen pieces may be **a year old or substantially older** when the argument remains useful.
- Never reject an exceptional essay solely because it is old.
- When recommending an older piece, its publication date must be visible so the reader understands that it is an intentional archive recommendation rather than current reporting.

## Small & Fun News

Include **one Small & Fun News item each day when a good one can be found**.

The goal is to provide a human-scale counterweight to national and international news. Look deliberately in local and regional papers, including publications outside the United States and publications written in languages other than English.

Good examples include:

- a missing sheep turning up several farms away after nearly two weeks;
- a town recovering an unusual lost object;
- a local volunteer, librarian, teacher, shopkeeper, farmer, or neighborhood group doing something delightful;
- a strange but harmless civic problem;
- an animal, weather, garden, festival, school, transport, sports, or community story that is funny or unexpectedly charming;
- small acts of competence, generosity, persistence, or community life that are meaningful locally even though they have no national importance.

Avoid turning serious crime, tragedy, poverty, disability, or personal misfortune into entertainment. The section should feel genuinely light, humane, funny, or pleasant rather than merely bizarre.

## Internal Reader

Morning Edition has a built-in **Continue Reading** reader modal. The goal is to let the reader understand a story in a clean, distraction-free format without loading the publisher's website unless they deliberately choose to open the original source.

For every story, generate an optional `reader` object that gives a fuller Morning Edition treatment of the piece. This is **not** a reproduction of the original article. It should be newly written synthesis based on verified reporting and should avoid copying substantial passages from copyrighted sources.

Recommended reader content:

- `standfirst`: a one- or two-sentence orientation to the story;
- `body`: 3–7 short paragraphs giving a fuller explanation than the front-page summary;
- `context`: concise background needed to understand the event or idea;
- `key_points`: 2–5 important facts, arguments, implications, or takeaways;
- `what_to_watch`: what could happen next, when that is meaningful.

The reader should favor clarity and synthesis over length. It may combine context from more than one verified source when useful, but the displayed source remains the primary article being recommended.

Do not paste full copyrighted articles into `reader.body`. Brief quotations may be used only when genuinely useful and should remain short. Public-domain, Creative Commons, government, or otherwise explicitly reusable material may be handled more liberally when its license permits it, but Morning Edition should still prefer a concise readable synthesis by default.

The original source URL remains available separately. Opening the internal reader must not require loading the publisher's page.

## Daily structure

The exact mix may change with the news, but a typical edition should contain:

- The Big Story
- World
- Science & Technology
- Culture & History
- Ideas & Think Pieces
- In Case You Missed It
- Small & Fun News
- Something I Didn't Know Yesterday
- Worth Your Time

A reasonable target for the current-news core is roughly 40% world affairs, 20% science/technology, 20% ideas/philosophy, 10% culture/history, and 10% unusual or unexpectedly interesting material. The retrospective, fun/local, and long-read sections sit alongside that core rather than needing to fit the percentages exactly. Quality matters more than filling quotas.

## JSON format

`data/latest.json` and archived JSON editions use this shape:

```json
{
  "date": "YYYY-MM-DD",
  "generated_at": "ISO-8601 timestamp",
  "title": "Morning Edition",
  "dek": "One-line description of today's edition.",
  "lead_story": {
    "headline": "...",
    "summary": "...",
    "why_it_matters": "...",
    "source": "...",
    "country": "...",
    "original_language": "English",
    "published_date": "YYYY-MM-DD",
    "url": "https://...",
    "type": "reporting",
    "reader": {
      "standfirst": "...",
      "body": ["Paragraph one...", "Paragraph two..."],
      "context": "...",
      "key_points": ["...", "..."],
      "what_to_watch": "..."
    }
  },
  "sections": [
    {
      "id": "world",
      "title": "World",
      "items": [
        {
          "headline": "...",
          "summary": "...",
          "why_it_matters": "...",
          "source": "...",
          "country": "...",
          "original_language": "Spanish",
          "published_date": "YYYY-MM-DD",
          "url": "https://...",
          "type": "analysis",
          "reader": {
            "standfirst": "...",
            "body": ["..."],
            "context": "...",
            "key_points": ["..."],
            "what_to_watch": "..."
          }
        }
      ]
    }
  ],
  "worth_your_time": []
}
```

`original_language` should contain the publication language of the specific article, such as `English`, `Spanish`, `French`, `Arabic`, `Mandarin Chinese`, or `Japanese`. It is optional for older archived editions, but new editions should populate it whenever it can be established reliably.

Recommended section IDs for the additional sections are:

- `in-case-you-missed-it`
- `small-fun-news`
- `something-new`

## Repository outputs

Every successful daily publication should create or update:

- `data/latest.json`
- `data/archive/YYYY-MM-DD.json`
- `editions/YYYY-MM-DD.md`

The dated files are permanent archives. `data/latest.json` is the stable endpoint for interfaces and email delivery.
