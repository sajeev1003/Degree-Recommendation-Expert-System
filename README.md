# Degree Recommendation Expert System

A rule-based expert system that assists high school and pre-university students in selecting suitable university degree programmes based on their academic strengths, personality traits, and personal interests.

**Course:** WID2001 Knowledge Representation and Reasoning (KRR)  
**SDG Alignment:** SDG 4 — Quality Education

---

## System Overview

```
User Interface (React)  →  Inference Engine (JavaScript)  →  Knowledge Base (KB)
```

Three mandatory KRR components:

| Component | Location | Description |
|---|---|---|
| **Knowledge Base (KB)** | `frontend/src/kb/` | IF-THEN production rules, degree frame profiles, semantic network |
| **Inference Engine (IE)** | `frontend/src/engine/` | Forward chaining logic — runs entirely in the browser |
| **User Interface (UI)** | `frontend/src/pages/` | React multi-page app — Landing, Questionnaire, Results |

Additional module:

- **Explanation Facility** — displays which rules fired and why each degree was recommended

> No backend or database required. All reasoning runs entirely in the browser.

---

## Knowledge Representation

The Knowledge Base uses three complementary representation types:

| Type | File | Description |
|---|---|---|
| Rule-Based (IF-THEN) | `rules_academic.js`, `rules_personality.js`, `rules_interest.js` | 40 production rules grounded in SME expert knowledge |
| Frame Representation | `degrees.js` | Structured degree profiles with Holland types, subjects, red flags, career paths |
| Semantic Network | `semantics.js` | Attribute-to-degree relationship graph derived from SME Section D ranking table |

**Knowledge source:** Expert elicitation session with a Senior Secondary School Counselor (17 years of advising experience). Rules are organised into three weighted categories:
- **Academic rules** (ACA-01 to ACA-16) — highest weight, per SME: *"Academic grades directly influence which field students can pursue"*
- **Personality rules** (PER-01 to PER-09) — based on Holland RIASEC model, referenced by SME for every degree
- **Interest rules** (INT-01 to INT-15) — based on career goals, hobbies, and favourite activities

---

## Project Structure

```
DegreeRecommendationES/
├── frontend/
│   └── src/
│       ├── kb/                          # Knowledge Base
│       │   ├── rules.js                 # Master rule index (combines all 40 rules)
│       │   ├── rules_academic.js        # Academic & subject rules (ACA-01 to ACA-16)
│       │   ├── rules_personality.js     # Holland personality rules (PER-01 to PER-09)
│       │   ├── rules_interest.js        # Interest & hobby rules (INT-01 to INT-15)
│       │   ├── degrees.js               # Degree frame profiles (8 degrees)
│       │   ├── semantics.js             # Semantic network (attribute → degree edges)
│       │   └── questions.js             # Questionnaire question definitions
│       │
│       ├── engine/                      # Inference Engine
│       │   └── inferenceEngine.js       # Forward chaining logic
│       │
│       ├── pages/                       # User Interface — pages
│       │   ├── LandingPage.tsx
│       │   ├── QuestionnairePage.tsx
│       │   └── ResultsPage.tsx
│       │
│       ├── components/                  # User Interface — reusable components
│       │   ├── assessment/              # ProgressBar, QuestionCard
│       │   ├── layout/                  # Header, Footer
│       │   └── ui/                      # Button, ScoreBar, RecommendationCard
│       │
│       └── lib/
│           └── types.ts                 # TypeScript type definitions
│
├── docs/
│   ├── answer_from_sme.md               # Expert elicitation Q&A (raw SME answers)
│   ├── components_design.md             # Section 6.2 — KB, IE, and UI design documentation
│   ├── expert_consultation.md           # Expert consultation record
│   ├── knowledge_elicitation.md         # Knowledge elicitation session notes
│   └── testingplan.md                   # Testing strategy and test cases
│
└── README.md
```

---

## Degree Programmes Covered

1. Computer Science
2. Engineering
3. Business Administration
4. Accounting
5. Psychology
6. Mass Communication
7. Multimedia Design
8. Medicine

---

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`

---

## Completion Status

| Component | Status |
|---|---|
| Knowledge Base — Academic rules (ACA-01 to ACA-16) | Done |
| Knowledge Base — Personality rules (PER-01 to PER-09) | Done |
| Knowledge Base — Interest rules (INT-01 to INT-15) | Done |
| Knowledge Base — Degree frame profiles (8 degrees) | Done |
| Knowledge Base — Semantic network | Done |
| Inference Engine — Forward chaining | Done |
| Inference Engine — Score normalisation | Done |
| UI — Landing Page | Done |
| UI — Questionnaire Page | Done |
| UI — Results Page | Done |
| Explanation Facility | Done |
| Expert consultation | Done |
| Knowledge elicitation documentation | Done |
