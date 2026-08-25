# Morning Edition

A personal daily world-news edition generated each morning, archived in structured data, and delivered by email.

## Data layout

- `data/latest.json` — current edition for the web interface
- `data/archive/YYYY-MM-DD.json` — permanent daily archive
- `editions/YYYY-MM-DD.md` — readable Markdown edition

## Delivery

A GitHub Actions workflow emails each newly published edition using the same SMTP pattern as the Ledger daily briefing.
