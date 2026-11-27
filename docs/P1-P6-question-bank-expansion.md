# P1–P6 Question Bank Expansion Plan

Status: authoring specification; not a completed or MOE-approved syllabus map.
Repository: APLUS ACHIEVER English Adventure
Branch: feature/p1-p6-question-bank-expansion

## Principles

- Keep the existing `data/questions/p1.json` through `p6.json` intact until each replacement/merge is validated.
- Newly authored items are original practice, not official MOE or SEAB questions.
- Every item must have a stable ID, grade, strand, topic, difficulty (1–5), prompt, explanation or teaching note, source_type, review_status, and a learning-objective/concept mapping before publication.
- Do not treat exposure, time-on-task, or one correct response as proof of mastery.
- Questions must be age-appropriate, culturally inclusive, unambiguous, and independently answerable.
- A human review is required before status changes from draft to approved/published.

## Coverage model

Each grade has six learning strands:

1. Vocabulary
2. Grammar and Language Use
3. Reading and Comprehension
4. Writing
5. Listening and Viewing
6. Speaking and Representing

P5–P6 may additionally use integrated Cloze, Situational Writing, and Continuous Writing task labels. These are task formats or sub-strands, not replacements for the six common strands.

## Grade progression guide

| Grade | Vocabulary | Grammar / Language Use | Reading | Writing | Listening | Speaking |
|---|---|---|---|---|---|---|
| P1 | Everyday nouns, verbs, adjectives, picture-supported meaning | Basic sentence patterns, be-verbs, pronouns, simple present | Picture/text matching, explicit details, sequence | Labels, phrases, simple sentences, picture prompts | Follow one- and two-step instructions, identify key words | Describe familiar objects and pictures in simple sentences |
| P2 | Topic words, word families, basic synonyms | Articles, plurals, pronouns, present/past references, punctuation | Sequence, explicit details, simple cause and effect | Connected sentences, short personal recounts | Identify people, places, actions and sequence | Retell a short event and answer familiar questions |
| P3 | Context clues, common prefixes/suffixes, precise word choice | Parts of speech, subject–verb agreement, common tenses, connectors | Paragraph details, simple inference, reference words | Coherent paragraphs with a beginning, middle and end | Identify main points and supporting details | Describe experiences and explain simple choices |
| P4 | Collocations, shades of meaning, commonly confused words | Tense consistency, conjunctions, sentence structures, editing | Inference with evidence, purpose, text organisation | Paragraph cohesion, narrative development, revision | Identify sequence, intention and relevant details | Organise an oral response with relevant details |
| P5 | Nuance, idiomatic expressions in context, word choice | Complex sentences, conditionals where appropriate, transformations, editing | Inference, writer's purpose, cloze and evidence selection | Narrative development, audience and purpose, planning and editing | Synthesis of key information across a spoken text | Sustained responses, explanation and interaction |
| P6 | Consolidation, precision, contextual vocabulary | Integrated grammar, error analysis, sentence-level accuracy | Multi-step inference, evidence, purpose, cloze strategies | Situational Writing and Continuous Writing practice | Listening for explicit and implied information | Picture discussion, personal response and clear elaboration |

This is a planning progression, not a claim that every item is prescribed by MOE. Validate final scope against the current Singapore MOE Primary English Language Syllabus and school-level expectations.

## Question formats

The bank should support:

- MCQ: automatically marked, with answer rationale and distractor rationale where useful.
- Short answer: accepted-answer variants and a transparent marking rubric.
- Cloze: passage-level context, blank IDs, accepted answers and marking rules.
- Comprehension: shared passage plus linked sub-questions; passage stored once.
- Writing prompt: task, audience, purpose, constraints and analytic rubric.
- Listening prompt: transcript for author/reviewer, audio asset reference, questions and transcript visibility rules.
- Speaking prompt: stimulus, preparation guidance, rubric and optional recording asset.
- Matching / sequencing / error correction: add only after the engine and validator explicitly support their response schemas.

## Required metadata for every item

`id`, `grade`, `strand`, `topic`, `concept_id`, `learning_objective_id`, `type`, `difficulty`, `prompt`, `explanation`, `tags`, `source_type`, `review_status`, `version`, `created_at`, `reviewed_at`.

Type-specific fields must be validated. For example, MCQ requires options and a valid answer index; short answer requires accepted answers or a rubric; writing requires a rubric; listening requires a transcript and an audio asset reference before publication; speaking requires a rubric and stimulus.

## Initial authoring target

Use a staged target rather than bulk-generating low-quality items:

- Batch A: 10 reviewed items per grade, distributed across all six strands where appropriate.
- Batch B: expand to 30 reviewed items per grade and add parallel difficulty levels.
- Batch C: build 60+ reviewed items per grade with shared passages/audio stimuli, question variants, diagnostic tags and spaced-review suitability.

These are production targets, not current counts. Existing repository banks currently contain 3 demonstration questions per grade (18 total).

## Quality gates

1. JSON/schema validation and unique IDs.
2. Grade and strand coverage report.
3. Answer-key and explanation review.
4. Difficulty calibration and age-appropriateness review.
5. Duplicate / near-duplicate detection.
6. Accessibility and media checks.
7. Human approval before publication.
8. Mastery evidence mapping only after the item has a stable concept mapping and scoring rule.

## Supabase integration

The static JSON banks remain the source-of-truth backup during migration. Import into Supabase only after the schema, stable concept IDs, RLS policies, and rollback/export process are tested. Do not place service-role credentials in GitHub Pages. The browser may use only the publishable key with restrictive RLS.

## Current limitations

The current question engine validates and auto-marks MCQ. Although it recognises several prompt types, that does not yet mean all those types have complete rendering, response capture, or marking workflows. Those capabilities must be implemented and tested before such items are exposed as interactive assessments.
