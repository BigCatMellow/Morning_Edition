# Daily Wonder & Reflection Protocol

## Editorial role

Morning Edition has four complementary purposes: **Know** (important reporting), **Discover** (unfamiliar worthwhile material), **Understand** (explanation and Ideas), and **Reflect** (something to carry into the day). These are editorial purposes, not mandatory categories or website tabs.

This protocol adds two short, distinct daily selections **without weakening** the established Front Page, In Case You Missed It, Outside the Bubble, At Human Scale, Ideas, or Long Read searches. The photograph and passage are not news stories and do not require Continue Reading readers.

## The Daily Wonder

Normally select **one exceptional existing photograph, artwork, scientific image, historical picture, architectural photograph, map, or comparable visual**. An older discovery is as welcome as a new one. Prefer images that reward genuine attention: beauty, ingenuity, scale, surprise, rarity, or a new way of seeing something familiar.

Rotate domains (astronomy, nature, microscopy, art, architecture, history, engineering, human scenes, etc.) and geographies. Avoid stock photography, generic motivational graphics, AI-generated substitutes presented as documentary images, distorted composites without disclosure, and images whose reproduction rights are unclear.

**Before selection verify:**
- The image exists and depicts what the caption claims.
- The original item page or creator/institution source is accessible, not merely a search-results page.
- The exact image URL is a direct HTTPS image suitable for display. Use a stable, openly displayable rendition; avoid hotlinking sites that prohibit it. Preserve the image's proportions rather than arbitrarily cropping it.
- Permission/license is sufficient for display on a public website and email. Prefer public-domain, CC0, CC BY, and clearly authorized institutional imagery. Record the exact rights designation and fulfill attribution requirements. For licenses requiring a link, record it in `rights_url`. A public URL does not imply permission.
- The image credit, descriptive alternative text, and explanation are accurate.
- If an image cannot be reliably displayed or legally reused, **link to the original** instead of displaying a copied image; do not fabricate a replacement or license.

**Write:** a strong title, a factual 1–3 sentence caption explaining why it matters or what is special, and concise credit. Avoid empty superlatives.

## Something to Sit With

Normally select **one short, accurately sourced passage** from philosophy, literature, poetry, science, religion, cultural criticism, history, or another thinker. The point is perspective, not a quota of upbeat or motivational aphorisms. The passage may challenge, unsettle, amuse, clarify, or console.

**Before selection verify:**
- The exact wording, attributed author, work, and source. Prefer an original work or reputable scholarly/archival edition over a quotation aggregator.
- Whether a translation is used. Credit the translator in `translator` when known; do not blend translations or falsely present a paraphrase as a direct quote.
- Copyright permits the length of the excerpt. Prefer public-domain work; keep copyrighted quotations brief and within applicable limits.
- Explain the author's actual argument or context in 1–3 sentences. Avoid turning complex philosophy into generic productivity advice.
- End with one concise open-ended question, when it genuinely adds value.

Keep this feature independent from the Ideas essay and from the separate `One Thing to Think About` section. Do not recycle the same author, quote, photograph, or closely related theme over successive days. Avoid repeating a source already featured elsewhere in today's paper when possible.

## Publication data contract

Both fields are **optional** top-level objects, so archived editions without them continue to work. For new editions, make a real search and select both when high-quality, verified candidates are available. If omitted, record why in `editorial_review`; do not invent a substitute.

```json
{
  "daily_wonder": {
    "title": "Short descriptive title",
    "caption": "What this is and why it rewards attention.",
    "image_url": "https://example.org/image.jpg",
    "alt": "Specific accessible image description.",
    "credit": "Creator / institution",
    "rights": "Exact verified rights or license",
    "rights_url": "https://example.org/rights",
    "source_url": "https://example.org/original-image-page"
  },
  "reflection": {
    "passage": "Exact passage without surrounding quote marks.",
    "author": "Correctly attributed author",
    "work": "Work / letter / lecture / book",
    "translator": "Translator if applicable",
    "context": "Brief accurate explanation.",
    "question": "Open-ended question worth carrying forward?",
    "source_url": "https://example.org/primary-text"
  }
}
```

Field-level requirements when present:
- `daily_wonder`: nonempty `title`, `caption`, `image_url`, `alt`, `credit`, `rights`, and `source_url`; optional `rights_url`.
- `reflection`: nonempty `passage`, `author`, and `source_url`; strongly preferred `work`, `context`, and `question`; optional `translator`.
- Links must be absolute HTTP(S), preferably HTTPS. The image URL must be an actual image, not a web page.
- The photograph's linked image page is the fallback if an email client or browser does not show the remote image.
- Check prior 7–14 editions for repetition, and capture `daily_wonder_check` and `reflection_check` in `editorial_review`. The fields are independent of article URL uniqueness and reader-pack linkage.

## Layout / transport

The lead and Front Page remain news-first. The Daily Wonder follows the Front Page as a visual pause. Existing catch-up, discovery, human-scale, and Ideas material follows. The reflection appears after Ideas, before Worth Your Time. On mobile the layout stacks into a single reading column.

The site consumes both optional fields from the same edition JSON and renders historical editions unchanged when absent. Email receives a concise preview and a source link, with the original linked page as a fallback for blocked external images.

Never change the existing staged publication contract or bypass publication gates. The publish → website → Notes email-trigger sequence remains authoritative.
