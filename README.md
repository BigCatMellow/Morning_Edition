# Morning Edition

A personal daily newspaper designed to answer:

> What happened that is worth knowing, what is worth thinking about, and what might I be glad I discovered?

Morning Edition combines consequential current news with science, history, culture, society, technology, ideas, long-form reading, deliberate discovery outside the reader's usual interests, and a recurring human-scale local-news lane that restores perspective after larger world events.

## Canonical instructions

- `EDITORIAL_GUIDE.md` — editorial standards, research process, section structure, source rules, personalization safeguards, data format, and daily self-review.
- `PHILOSOPHY_READER_PROTOCOL.md` — specialized Continue Reading protocol for philosophy, ethics, political thought, social theory, intellectual history, book reviews, and argument-driven essays.
- `HUMAN_SCALE_NEWS_PROTOCOL.md` — canonical rules for the recurring `At Human Scale` lane: 1–2 concise, low-temperature local stories whose value is perspective rather than consequence.
- `SOURCE_TRIANGULATION_PROTOCOL.md` — canonical multi-source verification protocol for consequential or contested factual stories. Continue Reading should normally combine local/primary evidence with an independent external verifier and make agreement, disagreement, attribution, and uncertainty visible.
- `NEW_CHAT_HANDOFF.md` — operational handoff for continuing development or running an edition from a fresh ChatGPT conversation.

## Editorial workspaces

- `editorial/human-scale/` — durable workspace for source-discovery notes, examples, anti-patterns, search strategies, and future evaluation of the `At Human Scale` lane. The root `HUMAN_SCALE_NEWS_PROTOCOL.md` remains authoritative.
- `editorial/source-triangulation/` — durable workspace for source-pairing examples, independence checks, difficult verification cases, regional source ecosystems, disagreement handling, and future audits of multi-source Continue Reading. The root `SOURCE_TRIANGULATION_PROTOCOL.md` remains authoritative.

## Data layout

- `data/latest.json` — current edition for the website and email renderer
- `data/archive/YYYY-MM-DD.json` — permanent daily archive
- `data/readers/YYYY-MM-DD.json` — expanded Continue Reading synthesis keyed by source URL
- `editions/YYYY-MM-DD.md` — readable Markdown edition

Published `At Human Scale` stories live in the normal edition JSON and archives as a standard section with recommended id `at-human-scale`; they are not stored separately from the rest of the paper.

For stories requiring triangulation, reader objects may use the existing `supporting_sources` array. The website renders those links inside Continue Reading under **Sources used for context**, while the original displayed article remains the primary source shown on the story card and reader source box.

The website is data-driven. Subject sections can change from day to day without editing `index.html`.

## Publication flow

1. Research and assemble the edition according to `EDITORIAL_GUIDE.md` and the applicable supplemental protocols.
2. For consequential or contested factual stories, apply `SOURCE_TRIANGULATION_PROTOCOL.md` during the separate Continue Reading pass rather than relying on a single publication's framing.
3. Publish `latest.json`, the dated archive, reader pack, and Markdown edition.
4. After all publication files succeed, update the trigger file in `BigCatMellow/Notes`.
5. The existing Notes GitHub Action sends the edition by email to configured recipients and active subscribers.

The daily ChatGPT automation is scheduled for 8:25 AM Eastern and should treat the repository instructions as the source of truth rather than carrying a duplicate editorial specification in its task prompt.
