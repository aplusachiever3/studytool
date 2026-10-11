# APLUS ACHIEVER — English Adventure

A responsive, game-inspired English learning website for Singapore Primary 1–6 learners.

## Run it
Open `index.html` in a modern browser. No build step, external library, or paid API is required.

## Deploy with GitHub Pages
1. Open this repository's **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select branch `main` and folder `/(root)`, then save.
4. Wait for GitHub Pages to finish publishing. Open the URL shown on the Pages settings page.

## Features in V1
- P1, P2, P3, P4, P5 and P6 learning levels
- Vocabulary, grammar, reading, writing, listening and speaking sample activities
- Multiple-choice answers with immediate feedback
- Points, mini quest and progress dashboard
- Responsive layout for desktop and mobile
- Progress saved locally in the current browser using localStorage

## Curriculum and content note
The structure is intended to support learning aligned with the direction of Singapore's MOE Primary English Language Syllabus. The included questions are original demonstrations, not official MOE or SEAB examination questions. A full syllabus-mapped question bank should be developed and reviewed separately.

References:
- [MOE Primary English Language Syllabus](https://www.moe.gov.sg/-/media/files/primary/2020-english-language-primary.pdf)
- [SEAB](https://www.seab.gov.sg/)

This independent learning resource is not affiliated with or endorsed by MOE or SEAB.


## Curriculum map and reusable question engine

The repository now includes:
- `data/curriculum-map.json`: a planning map for P1–P6 strands and learning progression. It is an independent planning aid and should be reviewed against the current MOE syllabus.
- `data/questions/p1.json` through `data/questions/p6.json`: initial original sample banks, three questions per grade to establish the schema.
- `assets/js/question-engine.js`: reusable loading, filtering, quiz-building, MCQ marking and bank-validation functions.
- `tests/validate_question_bank.py`: standard-library validator for required fields, grade matching, question IDs, MCQ options and answer indexes.

The existing homepage now loads the shared engine for Vocabulary, Grammar and Reading practice when those JSON banks are available. Other skills continue to use the existing embedded demonstration activities until matching external banks are added. If a JSON bank cannot be loaded, the homepage falls back to its embedded examples.

### Validate the question banks locally

Run from the repository root:

```bash
python tests/validate_question_bank.py
```

All current bank entries are original demonstration items and are not official MOE or SEAB examination questions. Expand the banks gradually and review answers, explanations, age suitability and curriculum mapping before describing content as verified.
