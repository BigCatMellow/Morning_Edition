# Morning Edition — Editorial Guide

## Purpose

Morning Edition is a personal daily newspaper designed to broaden perspective rather than reproduce a U.S.-centric headline feed.

## Editorial priorities

1. Major world developments that materially affect people, institutions, economies, science, or international relations.
2. Reporting and perspectives from outside the United States whenever strong sources are available.
3. Science, technology and AI developments with real significance rather than product-release churn.
4. History, culture, psychology and human behavior.
5. Philosophy, political thought, social theory and other intellectually serious think pieces.
6. Under-covered stories that are important or unusually revealing.
7. Long-form journalism and essays worth reading in full.
8. Interesting discoveries or stories that are valuable even when they are not conventionally important news.

Foreign Affairs should receive special attention for worthwhile analysis, but the edition should maintain a broad international source mix.

## Source principles

- Prefer original reporting and reputable international outlets.
- Prefer non-U.S. sources when quality is comparable.
- Include important U.S. reporting when the story warrants it.
- Do not repeat the same event several times unless different sources provide meaningfully different perspectives.
- Verify material claims before publication.
- Use the real article URL, not a publication homepage or search page.
- Clearly label reporting, analysis, opinion, essay, or research.
- Include the publication's country or region when useful for understanding perspective.

## Daily structure

The exact mix may change with the news, but a typical edition should contain:

- The Big Story
- World
- Science & Technology
- Culture & History
- Ideas & Think Pieces
- Something I Didn't Know Yesterday
- Worth Your Time

A reasonable target is roughly 40% world affairs, 20% science/technology, 20% ideas/philosophy, 10% culture/history, and 10% unusual or unexpectedly interesting material. Quality matters more than filling quotas.

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
    "url": "https://...",
    "type": "reporting"
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
          "url": "https://...",
          "type": "analysis"
        }
      ]
    }
  ],
  "worth_your_time": []
}
```

## Repository outputs

Every successful daily publication should create or update:

- `data/latest.json`
- `data/archive/YYYY-MM-DD.json`
- `editions/YYYY-MM-DD.md`

The dated files are permanent archives. `data/latest.json` is the stable endpoint for interfaces and email delivery.
