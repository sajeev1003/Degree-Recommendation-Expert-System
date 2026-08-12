# Frontend Testing Plan

## Overview

This document outlines the testing strategy for the Degree Recommendation Expert System frontend. The application is a client-side SPA built with React, TypeScript, and Vite, using a forward-chaining rule engine to recommend degree programs.

**Current State:** No testing framework or test files exist in the codebase.

---

## Test Levels

| Level | Focus | Recommended Tool |
|---|---|---|
| Unit | Inference engine, KB integrity, scoring logic | Vitest |
| Component | Questionnaire flow, results rendering, navigation | React Testing Library + Vitest |
| E2E | Full assessment journey, accessibility, edge cases | Playwright |

---

## 1. Unit Tests — Inference Engine (`src/engine/inferenceEngine.js`)

The inference engine is the most critical and testable part of the system. All tests should use deterministic mock data rather than the production KB.

### Test Cases

| # | Test | Expected Result |
|---|---|---|
| 1.1 | Single-select answers are converted to facts correctly | Fact map contains one entry per answered question |
| 1.2 | Multi-select answers create multiple facts for the same question | Each selected option becomes an independent fact |
| 1.3 | Scale answers are treated as string values | Fact map stores scale value (e.g., `"strong"`) |
| 1.4 | Rule fires only when ALL conditions match | AND logic enforced across conditions |
| 1.5 | Rule with partially matching conditions does not fire | No score added, no trace recorded |
| 1.6 | Multiple rules firing for the same degree accumulate scores | Scores sum correctly |
| 1.7 | Percentage = (score / maxPossible) * 100, rounded | Correct normalization per degree |
| 1.8 | maxPossible is derived from entire rule base, not just fired rules | Static denominator per degree |
| 1.9 | Degrees with zero score are excluded from results | Filter applied before sorting |
| 1.10 | Results sorted descending by percentage | Highest match ranked first |
| 1.11 | Top 3 results returned (or fewer if <3 have scores > 0) | Slice applied after sort/filter |
| 1.12 | Explanation trace contains rule ID, description, and points for each fired rule | Trace array populated correctly |
| 1.13 | Empty or null answers produce graceful output | No runtime errors; zero scores returned |

---

## 2. Unit Tests — Knowledge Base Integrity (`src/kb/`)

These tests validate that the KB files are internally consistent. They act as regression guards against refactoring errors.

### Test Cases

| # | Test | File Under Test |
|---|---|---|
| 2.1 | Every `questionId` in rule conditions exists in `questions.js` | `rules.js` |
| 2.2 | Every `degreeId` in rule scores exists in `degrees.js` | `rules.js` |
| 2.3 | Every condition `value` exists as an `option.id` for that question | `rules.js`, `questions.js` |
| 2.4 | No duplicate rule IDs | `rules.js` |
| 2.5 | No duplicate question IDs | `questions.js` |
| 2.6 | Every degree appears in at least one rule's `scores` | `rules.js`, `degrees.js` |
| 2.7 | Every question is referenced in at least one rule condition | `rules.js`, `questions.js` |

---

## 3. Component Tests — Questionnaire Page (`QuestionnairePage.tsx`)

| # | Test | Expected Result |
|---|---|---|
| 3.1 | Next button disabled on name step until name entered | Button has `disabled` attribute |
| 3.2 | Entering name and clicking Next advances to first question | Question text rendered |
| 3.3 | Single-select question stores one answer value | State updated with string value |
| 3.4 | Multi-select question stores array of values | State updated with array |
| 3.5 | Previous button returns to prior question and preserves answer | Prior answer still selected |
| 6.6 | Progress bar updates as questions are answered | Percentage complete increases |
| 3.7 | Submit on final question calls `runInference` and navigates to `/results` | Navigation occurs with correct state |
| 3.8 | Direct access to `/results` without state redirects to `/assessment` | Router redirect occurs |

---

## 4. Component Tests — Results Page (`ResultsPage.tsx`)

| # | Test | Expected Result |
|---|---|---|
| 4.1 | Top degree name and confidence score displayed | Header text rendered |
| 4.2 | Score bars rendered for top 3 matches | `ScoreBar` components present |
| 4.3 | Explanation text lists fired rules for top match | Rule descriptions visible |
| 4.4 | Career paths for top degree displayed as numbered list | List items rendered |
| 4.5 | Recommendation cards shown for 2nd and 3rd matches | `RecommendationCard` components present |
| 4.6 | User's name shown in session metadata | Name string rendered |
| 4.7 | "Start New Assessment" button navigates to `/assessment` | Router navigation occurs |

---

## 5. E2E Tests — Full User Journey (Playwright)

### 5.1 Happy Path
1. Navigate to landing page (`/`).
2. Click "Start Assessment".
3. Enter name.
4. Answer all 12 questions with a predetermined persona.
5. Submit.
6. Assert results page loads with a top match and score > 0.

### 5.2 Edge Case — Low Match
1. Complete questionnaire with answers designed to trigger minimal rules.
2. Assert results page shows top match with low confidence (< 30%).
3. Assert zero-score degrees are not displayed.

### 5.3 Edge Case — Direct Results Access
1. Navigate directly to `/results` without completing questionnaire.
2. Assert redirect to `/assessment`.

### 5.4 Accessibility
1. Complete questionnaire using keyboard only (Tab, Space, Enter).
2. Assert all questions can be answered and submitted without mouse interaction.

---

## Test Data — Mock Personas

Use deterministic answer fixtures for reliable tests.

| Persona | Target Degree | Key Answers |
|---|---|---|
| CS Student | Computer Science | `q_math: strong`, `q_problem_solving: strong`, `q_interest: technology`, `q_free_time: coding` |
| Medical Student | Medicine | `q_best_subject: biology`, `q_science: strong`, `q_career_goal: health` |
| Creative Designer | Multimedia Design | `q_creativity: strong`, `q_interest: design`, `q_best_subject: art` |
| Balanced | Business / Accounting | `q_math: strong`, `q_personality: detail`, `q_career_goal: commerce` |

---

## Recommended File Structure

```
frontend/
├── src/
│   ├── engine/
│   │   └── inferenceEngine.test.ts
│   ├── kb/
│   │   ├── rules.test.ts
│   │   └── questions.test.ts
│   ├── pages/
│   │   ├── QuestionnairePage.test.tsx
│   │   └── ResultsPage.test.tsx
│   └── test/
│       └── fixtures.ts          # mock personas and answers
├── e2e/
│   ├── assessment.spec.ts
│   └── results.spec.ts
├── vitest.config.ts
└── playwright.config.ts
```

---

## Tooling Setup Summary

| Tool | Purpose | Install Command |
|---|---|---|
| Vitest | Unit & component test runner | `npm install -D vitest @vitejs/plugin-react` |
| React Testing Library | Component test utilities | `npm install -D @testing-library/react @testing-library/jest-dom jsdom` |
| Playwright | E2E testing | `npm install -D @playwright/test` + `npx playwright install` |

---

## SME Knowledge Status & Testing Impact

**Current State:** `src/kb/rules.js` contains placeholder rules drafted without formal SME validation. The expert consultation and knowledge elicitation workflows are in progress (see `expert_consultation.md` and `knowledge_elicitation.md`).

### Impact on Testing

| Layer | Impact | Recommendation |
|---|---|---|
| Engine mechanics | **None.** Algorithms are content-agnostic. | Test immediately. |
| KB integrity | **Low.** Tests may need updates if IDs change during SME review. | Write now; low maintenance cost. |
| Accuracy / acceptance | **High.** Placeholder rules may be replaced entirely once SME input is received. | **Defer persona-based outcome assertions.** Test that *a* result is returned, not that a *specific* degree is recommended. |
| Maintenance risk | **High.** E2E tests asserting "top match is Computer Science" will break if rules are reweighted or restructured. | Avoid hard-coding expected degrees in E2E tests until rules are SME-approved and frozen. |

### Recommended Phased Approach

1. **Phase 1 (Now):** Set up Vitest + RTL. Write engine unit tests and KB integrity tests.
2. **Phase 2 (Now):** Write component tests for navigation, validation, and rendering.
3. **Phase 3 (Post-SME):** Once rules are validated and frozen, add outcome-specific E2E tests with validated personas.
4. **Phase 4 (Post-SME):** Add Playwright E2E tests covering the full user journey and accessibility.

---

## Exit Criteria

- [ ] All engine unit tests pass.
- [ ] All KB integrity tests pass.
- [ ] All component tests pass.
- [ ] E2E tests cover happy path and direct-access edge case.
- [ ] No accessibility blockers in keyboard-only E2E flow.
