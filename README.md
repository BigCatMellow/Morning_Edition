# Morning Edition

A personal daily newspaper designed to answer:

> What happened that is worth knowing, what is worth thinking about, and what might I be glad I discovered?

Morning Edition combines consequential current news with science, history, culture, society, technology, ideas, long-form reading, and deliberate discovery outside the reader's usual interests.

## Canonical instructions

- `EDITORIAL_GUIDE.md` — editorial standards, research process, section structure, source rules, personalization safeguards, data format, and daily self-review.
- `NEW_CHAT_HANDOFF.md` — operational handoff for continuing development or running an edition from a fresh ChatGPT conversation.

## Data layout

- `data/latest.json` — current edition for the website and email renderer
- `data/archive/YYYY-MM-DD.json` — permanent daily archive
- `data/readers/YYYY-MM-DD.json` — expanded Continue Reading synthesis keyed by source URL
- `editions/YYYY-MM-DD.md` — readable Markdown edition

The website is data-driven. Subject sections can change from day to day without editing `index.html`.

## Publication flow

1. Research and assemble the edition according to `EDITORIAL_GUIDE.md`.
2. Publish `latest.json`, the dated archive, reader pack, and Markdown edition.
3. After all publication files succeed, update the trigger file in `BigCatMellow/Notes`.
4. The existing Notes GitHub Action sends the edition by email to configured recipients and active subscribers.

The daily ChatGPT automation is scheduled for 8:45 AM Eastern and should treat the repository instructions as the source of truth rather than carrying a duplicate editorial specification in its task prompt.
