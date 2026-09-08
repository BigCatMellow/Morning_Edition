# Morning Edition — Philosophy & Ideas Continue Reading Protocol

## Purpose

Philosophy, political thought, ethics, social theory, intellectual history, and serious essays should use **Continue Reading** differently from ordinary news.

A news deep read usually explains an event and its consequences. A philosophy deep read should help the reader **understand, reconstruct, test, and use an argument**.

The goal is not to summarize a philosophy article at greater length. The goal is to make the reader capable of saying:

> I understand the question, the author's answer, why someone might believe it, where it comes from, the strongest reason to doubt it, and what would change if it were right.

This protocol supplements `EDITORIAL_GUIDE.md`. When a selected story is primarily philosophy, ethics, political thought, social theory, intellectual history, conceptual criticism, or an argument-driven essay, use this protocol during the post-selection Continue Reading pass.

## Core sequence

A strong philosophy reader should usually move through this sequence:

**question → thesis → argument → intellectual background → example → objection → implications → unresolved question**

Do not mechanically fill every section. Some pieces are interpretive rather than argumentative; some are historical rather than normative; some are better understood through comparison between thinkers. Adapt the structure to the piece.

## What to explain

### 1. The question

State the actual philosophical problem in plain language before introducing specialized terminology.

Examples:

- What makes political authority legitimate when laws are unjust?
- How much credit can a person claim for success shaped by luck and social conditions?
- Is gratitude merely a feeling, or can it create obligations?
- Can stereotypes be epistemically useful while still being morally dangerous?

The reader should know what problem is being solved before being told the proposed solution.

### 2. The thesis

Give the author's central answer as fairly and strongly as possible.

Do not replace the thesis with a vague theme such as "this essay explores meritocracy." State what the author is actually claiming about meritocracy.

When the source is a review, distinguish:

- the book author's thesis;
- the reviewer's interpretation;
- the reviewer's own objections.

### 3. Reconstruct the argument

Explain **why the conclusion is supposed to follow**.

Prefer an argument map with roughly 2–6 steps when the piece supports it:

1. premise or starting assumption;
2. intermediate claim;
3. another premise or distinction;
4. conclusion.

Do not invent formal premises the author does not rely on. The map is an explanatory reconstruction, not a fake quotation or proof.

### 4. Define the important concepts

Explain specialized terms in ordinary language.

Examples include `ressentiment`, `desert`, `legitimacy`, `epistemic injustice`, `virtue`, `deontology`, `genealogy`, `recognition`, `social construction`, or `moral luck`.

Definitions should explain how the term functions in **this argument**, not merely provide a dictionary definition.

### 5. Intellectual background

Explain where the argument sits historically and conceptually.

Useful context may include:

- the thinker or tradition being interpreted;
- the argument it is responding to;
- an older debate the reader may not know;
- differences between schools of thought;
- historical or linguistic complications;
- whether a modern author is extending, revising, or rejecting an older thinker.

Do not turn this into a biography unless the biography changes how the argument should be understood.

### 6. Give a concrete example

Abstract arguments become much easier to evaluate when applied to a specific case.

Construct a short, neutral example that reveals the mechanism of the argument. Clearly distinguish Morning Edition's example from an example actually used by the source.

For example, an argument about socially scaffolded merit might be tested using two equally hardworking students with radically different schools, family resources, health, and luck.

### 7. Present the strongest objection

Do not merely list weak criticisms. Give the argument its strongest plausible challenge.

Ask:

- Which premise is most contestable?
- Is there a counterexample?
- Does the argument prove too much?
- Does it depend on a controversial definition?
- Does its criticism also undermine something the author wants to preserve?
- Is there an alternative explanation?
- Is the historical interpretation disputed?

When possible, use a real objection from the reviewer, another scholar, or the philosophical literature. Otherwise label the objection as Morning Edition's analytical reconstruction.

### 8. Explain the author's likely reply

When enough evidence exists, show how the author or tradition might answer the objection.

Do not manufacture a response and attribute it to the author. If it is an inference, label it as such.

This creates a more useful structure than presenting an argument followed by an unanswered criticism.

### 9. What changes if the argument is right?

Translate the argument into consequences for how we think, judge, or act.

This may affect:

- moral responsibility;
- political institutions;
- education;
- punishment;
- equality;
- personal relationships;
- scientific practice;
- social categories;
- historical interpretation;
- how another current debate should be framed.

This is **not** the same as predicting the future. For philosophy, it is usually a conceptual implication: what else would have to be reconsidered if the argument were accepted?

### 10. Questions to carry forward

End with one to three genuinely open questions that help the reader continue thinking.

Good questions expose tension rather than ask for a slogan-like opinion.

Example:

> If social conditions contribute heavily to achievement, what form of individual responsibility can we preserve without pretending people are self-made?

Avoid generic prompts such as "What do you think?"

## Fairness rules

### Steelman before criticizing

Present the strongest reasonable version of the argument before objections. Do not make an idea easy to dismiss by summarizing it badly.

### Separate description from endorsement

Morning Edition explaining an argument does not mean Morning Edition endorses it.

Use formulations such as:

- "The author's argument is..."
- "The reviewer objects that..."
- "A stronger counterargument would be..."
- "If this premise is accepted, then..."

### Distinguish philosophical disagreement from factual uncertainty

A philosophical argument may rely on factual premises, historical interpretation, conceptual assumptions, or value judgments. Identify which kind of disagreement is occurring.

For example:

- empirical: whether a social effect actually occurs;
- historical: whether Nietzsche meant a particular thing;
- conceptual: what counts as responsibility;
- normative: what people morally owe one another.

### Preserve genuine ambiguity

Some good philosophy ends with competing considerations rather than a decisive answer. Do not force a verdict merely because the reader format has a conclusion slot.

## Reader-pack mapping

The current website already supports the fields below. For philosophy and ideas, use them with these meanings:

- `standfirst` — state the philosophical question and why it is worth examining;
- `body` — normally **5–9 short paragraphs**, explaining the question, thesis, reasoning, important distinction, and at least one concrete example;
- `why_it_matters` — explain the conceptual stakes: what changes if the argument is right or useful;
- `background` — intellectual lineage, thinker, school, historical context, or debate being answered;
- `bigger_picture` — where the argument sits among competing views and why the debate persists;
- `significance.label` — usually `Worth thinking about`, `Important context`, `Meaningful argument`, or another restrained descriptive judgment;
- `significance.rationale` — explain why this argument deserves the reader's attention;
- `key_points` — use as an **argument map**: premises, distinctions, and conclusion rather than a generic fact list;
- `uncertainty` — use for the **strongest objections, interpretive disputes, limitations, and unresolved premises**;
- `what_to_watch` — use for **questions to carry forward**, not literal future events;
- `connections` — related thinkers, opposing traditions, earlier Morning Edition ideas, historical parallels, or current debates;
- `supporting_sources` — primary text, review, scholarly commentary, or a serious opposing interpretation when it materially improves understanding.

Normally omit `future_implications` for pure philosophy. Use it only when the argument has concrete institutional, political, scientific, or social consequences that genuinely benefit from likely/possible distinctions.

Add optional metadata:

```json
"reader_mode": "philosophy"
```

The UI may use this marker in future versions; the content should remain understandable even if a renderer ignores it.

## Preferred depth

Philosophy is one of the places where Continue Reading may be substantially longer than the front-page summary.

A substantial philosophy reader can reasonably use:

- 5–9 short body paragraphs;
- 3–6 argument-map bullets;
- 1–3 paragraphs of intellectual background;
- a real objection and, when possible, a reply;
- 1–3 questions to carry forward;
- additional source links when they improve interpretation.

Do not pad the treatment merely to reach length. Depth means **more structure and understanding**, not more words.

## Source hierarchy for philosophy

When practical, contextualize from more than the selected article alone.

Prefer:

1. the selected essay, review, or paper;
2. the primary philosophical text when accessible and relevant;
3. reputable scholarly reference material or academic commentary;
4. a strong critic or competing interpretation when the dispute matters.

For ancient, medieval, non-Western, or translated philosophy, pay special attention to translation, historical context, and the danger of forcing modern categories onto older traditions.

Do not pretend that one secondary article settles a disputed interpretation of a major thinker.

## Special cases

### Book reviews

Separate the book's argument from the reviewer's evaluation. Continue Reading should help the reader understand both.

### Historical philosophy

Explain what problem the thinker was addressing **in their own context** before translating the idea into a modern analogy.

### Non-Western philosophy

Do not present a tradition merely as an exotic precursor to a Western concept. Explain its own vocabulary, aims, and intellectual setting first; comparison can follow.

### Political philosophy

Distinguish normative claims about what institutions **should** do from empirical claims about what policies **will** do.

### Psychology-adjacent philosophy

Separate philosophical claims about persons, agency, consciousness, morality, or rationality from empirical psychological evidence. Neither automatically proves the other.

## Quality gate

Before publishing a philosophy reader, ask:

1. Can a reader unfamiliar with the thinker state the central question?
2. Is the thesis stated clearly rather than reduced to a topic?
3. Can the reader see why the author thinks the conclusion follows?
4. Are the important terms defined in context?
5. Is the intellectual background sufficient but not bloated?
6. Is there at least one serious objection or unresolved problem?
7. Have description, endorsement, reviewer criticism, and Morning Edition analysis been kept separate?
8. Does the reader explain what would change if the argument were accepted?
9. Does it leave the reader with a better question, not merely a summary?

If not, the Continue Reading treatment is not finished.