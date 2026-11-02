# Morning Edition — Visual Design System

## Working principle: "Playskool" clarity, not children's design

The reader should immediately understand **what is important, what kind of content this is, and what to do next**. Build with simple forms, strong hierarchy, large legible typography, confident spacing and a very small set of repeatable visual decisions. The goal is an adult newspaper with the obviousness of a well-designed physical object.

This means **less ornament, not less personality**. Avoid primary-color toys, playful bubbles, meaningless icons, dense controls, fake magazine gloss, and visual decorations without a job.

## Color roles

The actual tokens live in `assets/editorial-color-system.css`, loaded **after** the legacy inline styles.

| Role | Color | Use |
| --- | --- | --- |
| Warm paper | `#f7f3e9` | Dominant page background |
| Warm-white | `#fffdf7` | Clear section surfaces |
| Ink | `#222823` | Headings, text, the Long Read panel |
| Muted ink | `#545c55` | Secondary text |
| Reporting rust | `#853e36` | Front Page, World, urgent reporting |
| Discovery teal | `#205b57` | Science, Daily Wonder, Outside the Bubble, At Human Scale |
| Reflective ochre | `#86601e` | Ideas, history/culture, reflective editorial lanes |

Pale rust, sage, and ochre washes belong **behind section headings or short asides**, not the entire article body. Only one major accent should dominate a feature.

Color is never the only category indicator. Section titles, source text, link affordances, and reading order must remain clear in grayscale, on small screens, and without images. Keep normal text and key labels at a contrast ratio of at least **4.5:1** against their backgrounds.

## Hierarchy and interaction

1. **Know:** the lead and Front Page should look like the obvious main news.
2. **Discover:** the Daily Wonder gets one spacious photograph; the image is the main visual, not a collage of decorative shapes.
3. **Understand:** Ideas and longer articles remain easy to read and sourced.
4. **Reflect:** Something to Sit With gets quiet separation, no poster-like treatment.

Use a line, a restrained tinted masthead, or whitespace to distinguish sections. Do not pile up shadows, colored cards, round buttons, badges, and decorative icons simultaneously. Standardize links and focus outlines and keep plain-language calls to action.

Make mobile a first-class reading experience: one column, easy tap targets, no horizontal scroll, and images with intact aspect ratio. Avoid shrinking captions and legal image credits to illegibility.

## Change discipline

Change a small number of meaningful variables at a time. Prefer the central stylesheet to additional scattered overrides. Verify both an edition with Daily Wonder/Reflection and an older edition without them. Changes to the website's palette must not change edition JSON schemas, archived files, scheduled tasks, SMTP, or the staged publish → website → email-trigger workflow.

### Review checklist

- Can the main story be identified in five seconds?
- Can each section be distinguished without decoding a palette legend?
- Does the daily image get enough room without pushing all reporting aside?
- Can a reader understand the significance of a caption, a passage and a source link immediately?
- Is every shade, rule, and special surface doing a job?
- Does a mobile reader see readable typography and clear actions?
