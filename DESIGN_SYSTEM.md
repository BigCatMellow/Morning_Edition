# Morning Edition — Visual Design System

## Working principle: "Playskool" clarity, not children's design

A reader should immediately understand **what matters, what kind of content this is, and where to go next**. Use the simplicity of a well-designed physical object: obvious hierarchy, strong type, predictable spacing, simple shapes, and very few visual rules.

**The key lesson from the November 2 design iterations:** adding more color to large areas made every section demand equal attention. Do not mistake variety for hierarchy. The paper needs places for the eye to rest.

## Attention hierarchy

1. **Masthead:** an identifiable newspaper brand, not a billboard made of several colored banners.
2. **Lead:** the largest headline is the main point of attention. Its typography and placement communicate importance without an enormous peach rectangle or a competing source card.
3. **Stories:** low-stimulation, mostly neutral reading surfaces; articles are separated by whitespace, hairlines, and headings rather than boxes.
4. **Daily Wonder:** the selected photograph or artwork supplies most of the page's visual variety; give it an unobtrusive mat and a clear, credited caption.
5. **Something to Sit With:** a modest, quiet pause, not an inspirational quote poster.
6. **Worth Your Time:** a single dark section near the end provides the strongest deliberate contrast with the standard paper.

The full page should have a **clear hierarchy, not six equally loud landmarks**.

## Palette and use

The canonical tokens live in `assets/editorial-color-system.css`, loaded after legacy inline CSS.

| Role | Value | Use |
| --- | --- | --- |
| Outside canvas | `#e9e9e3` | Neutral gray framing the paper |
| Warm paper | `#fdfbf6` | Main masthead, lead, and news reading surface |
| Ink | `#222823` | Headline, body copy, Long Read background |
| Secondary copy | `#545c55` | Metadata and minor navigation |
| Reporting rust | `#853e36` | Lead kicker, news links and selective section rules |
| Discovery teal | `#205b57` | Photo heading, a few discovery rules and source links |
| Ideas ochre | `#7a541a` | Small Ideas/culture heading-rule accent |
| Photo surround | `#eeeee8` | Quiet matte surface; the photograph is the color event |
| Reflection | `#eff1ed` | Subtle contemplative section |
| Long Read | `#222823` | The sole large, high-contrast editorial block |

Color is **supporting evidence for the structure**, never a requirement to decode a story's category. Do not use colorful full-section backgrounds simply because a category has a matching accent color.

## Specific defaults

- A subdued top bar, slim date line, quiet navigation and small preview notice are contextual controls, **not feature banners**.
- Headlines may be large; chrome and metadata should be smaller, lower contrast, and less bold.
- Source attribution is visible but should not compete with the lead story.
- Section headings can use a thin, semantic accent rule; the article text beneath remains neutral.
- Avoid stacked boxes, shadows, colored pills, prominent card fills, unnecessary icons and gradients.
- Use dark text on light surfaces, with at least **4.5:1** contrast for ordinary text. Make focus outlines and links recognizable without color alone.
- Preserve mobile readability, unbroken image aspect ratios, and spacious touch targets.

## Verification

Review the complete page at desktop and phone width with **both a photo/reflection edition and a legacy edition**. The first view should read in order: masthead, main headline, main story. The eye should not go to the preview notice, navigation or source box first.

The website presentation must never change published edition JSON, archive files, schedule, reader pack, staged publication permissions, or email delivery.
