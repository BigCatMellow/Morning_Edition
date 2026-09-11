# Morning Edition — Source Triangulation Protocol

## Purpose

Morning Edition should not treat a reputable source as automatically equivalent to an unbiased account. Reliable publications, local reporters, governments, courts, researchers, NGOs, corporations, intelligence officials, and international institutions can all provide important evidence while still seeing an event from a particular position.

For consequential or contested factual stories, the deeper **Continue Reading** layer should therefore reconstruct the story from more than one genuinely independent vantage point.

The goal is not to manufacture artificial balance. It is to distinguish:

- what can be independently established;
- what comes from a participant or interested institution;
- what credible sources agree on;
- where framing or factual accounts differ;
- what remains uncertain.

The main edition card should remain concise and readable. Continue Reading is where this deeper source work belongs.

## Default rule

For a **consequential or materially contested factual story**, Continue Reading should normally use **at least two materially independent evidence streams**:

1. **Local or primary evidence** — for example, original local reporting, an official document, court ruling, research paper, election authority, regulator, direct transcript, public dataset, or credible reporting from the place where the event occurred.
2. **Independent external verification** — a reputable source outside the institution, faction, country-level information chain, or reporting organization responsible for the primary claim.

The article displayed on the Morning Edition card may count as one of these sources when it genuinely fills one role. If the displayed article is itself an international verifier, seek local or primary evidence for the other role. If it is local or primary reporting, seek an external verifier.

For highly disputed, security-sensitive, politically consequential, or attribution-heavy stories, use **three or more independent evidence streams when reasonably available**.

## What counts as independent

Independence is about the underlying information chain, not the number of URLs.

Two sources do **not** count as independent merely because they have different publication names when both:

- republish the same wire story;
- quote the same press release without additional reporting;
- rely on the same unnamed official or intelligence briefing;
- cite one another rather than independently establishing the fact;
- summarize the same research paper without new evidence;
- repeat a viral post without verification.

A government statement and three newspapers quoting that statement are still fundamentally one evidence stream for what the government claims.

Better combinations include:

- local reporting + Reuters/AP/AFP or another external verifier;
- court judgment + independent legal reporting;
- election authority data + reputable local reporting + international election monitors;
- research paper + independent expert or review coverage;
- regulator filing + independent financial reporting;
- official casualty or damage figures + credible on-the-ground reporting or independent monitoring;
- government claim + satellite imagery, public records, technical evidence, or reporting from another independently sourced outlet.

## Stories where this should normally apply

Use triangulation by default for:

- elections and democratic institutions;
- geopolitics and diplomacy;
- war, conflict, military activity, intelligence and national security;
- claims of sabotage, attribution, covert action or foreign interference;
- protests, policing and politically contested public events;
- major government policy claims;
- sanctions, trade disputes and politically consequential economic claims;
- court rulings or legal disputes with large public consequences;
- public-health emergencies where official reporting is incomplete, contested or rapidly changing;
- corporate or institutional claims where the institution has a material interest in the interpretation;
- stories where the central fact depends heavily on unnamed sources.

## Stories where it may be unnecessary

Do not mechanically force a second source when it adds no real verification value.

Examples may include:

- a straightforward peer-reviewed paper whose existence, methods and reported findings are being summarized accurately, although high-stakes interpretation may still benefit from independent expert context;
- a clearly documented administrative fact with no material dispute;
- a human-scale local story whose claims are ordinary, directly reported and low stakes;
- a philosophy, criticism or essay selection where the task is to explain an argument rather than verify a contested event.

Quality and epistemic value matter more than a quota.

## Continue Reading structure

The displayed article remains the story's primary headline/source on the main Morning Edition card.

When triangulation applies, Continue Reading should use the available space to answer three additional questions.

### What can we establish?

State the factual core supported across independent evidence streams. Attribute claims that cannot be independently demonstrated.

### Where do the accounts differ?

When credible sources emphasize different causes, interpretations, timelines, numbers or institutional narratives, explain the difference clearly.

Do not imply disagreement where there is none, and do not hide a meaningful disagreement simply to produce a cleaner narrative.

### What remains uncertain?

Explain which claims still depend on interested parties, anonymous officials, preliminary evidence, incomplete records or unresolved attribution.

Uncertainty is information, not a defect to be edited away.

## Avoid false balance

Triangulation does not mean giving equal weight to every claim.

Do not elevate:

- unsupported conspiracy claims;
- demonstrably false assertions;
- fringe positions solely because they oppose a mainstream account;
- a state or corporate denial as equivalent evidence when strong independent evidence contradicts it.

When evidence is asymmetric, say so. The aim is independent verification, not a 50/50 presentation.

## Local and primary sources

Whenever practical, look first for reporting or records from the place and institution involved.

Local sources can reveal facts, language, institutional context and public concerns that an international wire may flatten. But local does not automatically mean independent or trustworthy. Note state control, ownership conflicts, strong partisan alignment or other material constraints when relevant.

Primary sources are especially useful for establishing what an institution officially did or said. They are **not automatically independent verification of the institution's interpretation of itself**.

## Non-English sources

Original-language reporting is welcome and often preferred for the local/primary side of triangulation.

Follow the translation rules in `EDITORIAL_GUIDE.md`:

- preserve names, numbers and uncertainty;
- translate meaning rather than sentence structure;
- cross-check consequential ambiguities;
- retain the original source URL.

## Reader data representation

The website supports a `supporting_sources` array inside a reader object. Factual deep reads with triangulation are displayed as an explicit **Source triangulation** block that combines the displayed article with these additional sources.

Every supporting source used to satisfy triangulation must be an object with all three fields below:

```json
"supporting_sources": [
  {
    "name": "Local or primary source name",
    "url": "https://example.com/original-source",
    "role": "Local reporting / primary evidence"
  },
  {
    "name": "Independent verifier",
    "url": "https://example.com/external-source",
    "role": "Independent external verification"
  }
]
```

The original displayed article remains represented by the story's normal `source` and `url` fields and counts as one evidence stream only when it genuinely qualifies.

Use concise, informative role labels such as:

- `Local reporting`
- `Primary document`
- `Official data`
- `Independent external verification`
- `Independent technical evidence`
- `Election monitoring`
- `Contrary or alternative credible account`

Do not add sources merely to make the list longer. Every supporting source should materially improve verification, context or interpretation.

## Hard publication gate

For every consequential or materially contested factual story that receives Continue Reading, publication is incomplete unless **one** of the following is true:

1. the displayed article itself genuinely supplies one of the required evidence roles **and** `supporting_sources` contains at least one materially independent source supplying the other role; or
2. the displayed article does not count as one of the required roles, in which case `supporting_sources` contains at least two materially independent sources that together provide local/primary evidence and external verification.

For highly disputed, security-sensitive, attribution-heavy, election, conflict, intelligence, or major institutional stories, use three or more materially independent evidence streams when reasonably available.

In addition:

- every source used to satisfy this gate must have a real URL;
- every `supporting_sources` object used to satisfy the gate must include a non-empty `name`, `url`, and `role`;
- role labels must describe the actual function of the source, not generic filler;
- two URLs that share the same underlying wire copy, press release, anonymous briefing, or primary claim do not satisfy independence;
- the reader should make meaningful disagreement or residual uncertainty visible when it exists;
- if adequate triangulation is genuinely impossible but the story is still too important to omit, the reader must say so explicitly and `editorial_review.triangulation_check` must identify the limitation.

**Do not update the Morning Edition email trigger while this gate fails.** Missing role labels, missing independent evidence, or a missing required `triangulation_check` are publication defects to repair before the edition is considered complete.

## Editorial review

For every edition containing consequential or contested stories, `editorial_review` must include a concise `triangulation_check` or equivalent field confirming which important stories were independently verified and noting any unresolved sourcing limitations.

If no selected story required triangulation, the field may say that explicitly. It should not simply be omitted.

## Editorial standard

The target is not:

> Find an unbiased source.

The more defensible target is:

> Build the most accurate account possible by comparing independent evidence, preserving attribution, exposing meaningful disagreement, and stating what cannot yet be known.
