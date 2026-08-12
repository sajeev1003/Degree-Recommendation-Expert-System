# 6.2 Components Design

The system's effectiveness is derived from the specialised roles of its core components, as implemented in the source code. The three mandatory components — Knowledge Base (KB), Inference Engine (IE), and User Interface (UI) — are clearly separated into dedicated directories within `frontend/src/`.

---

## 6.2.1 Knowledge Base

The Knowledge Base is the core repository of domain knowledge and contains structured information used for decision-making. It is located in the `src/kb/` directory and utilises a hybrid knowledge representation approach consisting of three complementary types.

### Knowledge Base File Structure

```
src/kb/
├── rules.js             — Master index combining all production rules
├── rules_academic.js    — IF-THEN rules based on academic performance (highest weight)
├── rules_personality.js — IF-THEN rules based on Holland RIASEC personality types
├── rules_interest.js    — IF-THEN rules based on interests, hobbies, and career goals
├── degrees.js           — Frame-based degree profiles
├── semantics.js         — Semantic network of attribute-to-degree relationships
└── questions.js         — Questionnaire question definitions
```

**Total rules implemented:** 40 rules  
- Academic rules (ACA-01 to ACA-16): 16 rules  
- Personality rules (PER-01 to PER-09): 9 rules  
- Interest rules (INT-01 to INT-15): 15 rules

**Knowledge Source:** All knowledge was extracted from an expert elicitation session with a Senior Secondary School Counselor with 17 years of advising experience. Each rule includes a `source` field referencing the specific section of the expert interview that grounded it.

---

### 6.2.1.1 Rule-Based Knowledge Representation

**File:** `src/kb/rules_academic.js`, `src/kb/rules_personality.js`, `src/kb/rules_interest.js`

Knowledge is primarily represented using IF–THEN production rules, which reflect expert reasoning in recommending degree programmes. Rules are organised into three weighted categories, reflecting the Subject Matter Expert's (SME) priority ordering:

> *"Academic grades directly influence which field students can pursue for further studies."*  
> — SME, Section B1

**Rule Structure (as implemented in code):**

```js
{
  id: 'ACA-01',
  description: 'Strong in Mathematics — a core academic requirement for analytical and STEM degrees',
  source: 'SME Section D attribute table; C1d, C2d, C4d, C8d',
  conditions: [
    { questionId: 'q_math', value: 'strong' }
  ],
  scores: { computer_science: 30, engineering: 25, accounting: 25, medicine: 15 }
}
```

Each `conditions` entry is evaluated as a conjunction (AND). All conditions must be satisfied for the rule to fire. The `scores` object maps degree IDs to the points added when the rule fires.

**Category 1 — Academic Rules (Highest Weight)**  
Derived from subject performance and academic skill self-assessment:

| Rule ID | Condition | Degrees Scored |
|---|---|---|
| ACA-01 | Strong in Mathematics | Computer Science (+30), Engineering (+25), Accounting (+25), Medicine (+15) |
| ACA-02 | Strong in Science | Medicine (+30), Engineering (+20), Computer Science (+10) |
| ACA-03 | Strong problem-solving ability | CS (+25), Engineering (+20), Accounting (+20), Medicine (+20), Psychology (+10) |
| ACA-06 | Best subject: Additional Mathematics | Engineering (+30), CS (+25), Accounting (+20), Medicine (+20) |
| ACA-08 | Best subject: Biology | Medicine (+35), Psychology (+10) |
| ACA-10 | Best subject: Art & Design | Multimedia Design (+35), Mass Communication (+10) |
| ACA-11 | Best subject: BM / English | Mass Communication (+30), Business (+20), Psychology (+15) |
| ACA-12 | Best subject: Accounts | Accounting (+35), Business (+15) |

**Category 2 — Personality Rules (Medium Weight)**  
Derived from the Holland RIASEC occupational model, as explicitly referenced by the SME for each degree:

| Rule ID | Condition | Holland Type | Degrees Scored |
|---|---|---|---|
| PER-01 | Analytical personality | Investigative (I) | CS (+25), Engineering (+20), Medicine (+20), Accounting (+15) |
| PER-02 | Detail-oriented personality | Conventional (C) | Accounting (+25), Medicine (+20), CS (+15), Engineering (+10) |
| PER-04 | Hands-on work style | Realistic (R) | Engineering (+30), Multimedia (+15), Mass Comm (+10) |
| PER-05 | Social personality | Social (S) | Psychology (+25), Business (+20), Mass Comm (+20) |
| PER-06 | Leadership personality | Enterprising (E) | Business (+25), Mass Comm (+15), Accounting (+10) |
| PER-09 | Creative personality | Artistic (A) | Multimedia (+30), Mass Comm (+25), Psychology (+10) |

**Category 3 — Interest Rules (Medium-Low Weight)**  
Derived from career goals, hobbies, and general interests:

| Rule ID | Condition | Degrees Scored |
|---|---|---|
| INT-01 | Career goal: Technology / Engineering | CS (+25), Engineering (+25) |
| INT-02 | Career goal: Healthcare / Medicine | Medicine (+35), Psychology (+10) |
| INT-03 | Career goal: Business / Finance | Business (+25), Accounting (+25) |
| INT-11 | Free time: Coding, gaming, or gadgets | CS (+30), Multimedia (+10) |
| INT-15 | Free time: Tracking budgets or business ideas | Accounting (+30), Business (+20) |

Multiple rules may fire simultaneously, allowing cumulative scoring across all 40 rules.

---

### 6.2.1.2 Frame-Based Representation

**File:** `src/kb/degrees.js`

In addition to rules, frame structures are used to organise declarative knowledge about each degree programme. Each degree is modelled as a frame with predefined slots derived from the SME's expert knowledge (Section C of the expert elicitation).

**Frame Slots:**

| Slot | Description |
|---|---|
| `id` | Unique degree identifier used by the inference engine |
| `name` | Display name of the degree programme |
| `hollandTypes` | Holland RIASEC personality type codes (from SME) |
| `academicStrengths` | Key academic abilities required |
| `keySubjects` | School subjects that are strong indicators |
| `personalityFit` | Personality traits that suit this degree |
| `interests` | Interests and hobbies that correlate |
| `redFlags` | Warning signs — student types to avoid |
| `careers` | Example career paths for this degree |

**Example Frame: Computer Science**

```js
{
  id: 'computer_science',
  name: 'Computer Science',
  hollandTypes: ['Conventional (C)', 'Realistic (R)', 'Investigative (I)'],
  academicStrengths: ['Analytical & critical thinking', 'Problem-solving ability', 'Language proficiency'],
  keySubjects: ['Mathematics', 'Science', 'English'],
  personalityFit: ['Analytical', 'Detail-oriented', 'Independent worker'],
  interests: ['Computer skills (programming, IT, gadgets)', 'Technology and innovation'],
  redFlags: ['Weak in Mathematics or English', 'Weak analytical skills', 'Dislikes routine work'],
  careers: ['Software Engineer', 'Data Scientist', 'Cybersecurity Analyst', 'Systems Developer']
}
```

Frames improve knowledge organisation by consolidating all information about a degree into a single, readable structure, and support the Explanation Facility by providing career path data to the results page.

---

### 6.2.1.3 Semantic Relationships

**File:** `src/kb/semantics.js`

The system also incorporates a semantic network that maps student attributes to degree programmes as directed graph relationships. This representation is derived directly from the SME's Attribute Ranking Table (Section D of the expert elicitation), where the counselor explicitly ticked which student attributes predict each degree.

**Network Structure:**
- **Attribute nodes** — 19 student trait nodes (e.g., `strong_mathematics`, `creative_artistic`, `social_people`)
- **Degree nodes** — 8 degree programme nodes
- **Directed edges** — `attribute → degree` with strength `'strong'` (SME ticked) or absent (not relevant)

**Examples (from SME Section D):**

```
Strong Mathematics    → Computer Science, Engineering, Accounting, Medicine
Analytical / Logical  → Computer Science, Engineering, Psychology, Medicine
Creative / Artistic   → Psychology, Mass Communication, Multimedia Design
Social / People       → Business, Psychology, Mass Communication
Hands-on / Active     → Engineering, Mass Communication, Multimedia Design
```

**Code representation (adjacency map):**

```js
// ATTRIBUTE_TO_DEGREES — quick lookup of which degrees an attribute predicts
ATTRIBUTE_TO_DEGREES['creative_artistic']
// → ['psychology', 'mass_communication', 'multimedia_design']

// DEGREE_TO_ATTRIBUTES — reverse lookup of which attributes predict a degree
DEGREE_TO_ATTRIBUTES['medicine']
// → ['strong_mathematics', 'strong_biology', 'strong_chemistry',
//    'strong_physics', 'analytical_logical', 'detail_oriented',
//    'enjoys_research_reading', 'interest_business_money']
```

These relationships enhance reasoning transparency and provide conceptual context that strengthens the explanation facility.

---

## 6.2.2 Inference Engine

**File:** `src/engine/inferenceEngine.js`

The Inference Engine is responsible for processing user inputs, applying rules from the Knowledge Base, and generating recommendations. It is implemented as a pure JavaScript module that runs entirely in the browser — no backend or server is required.

### 6.2.2.1 Inference Method: Forward Chaining

The system uses a **forward chaining** approach, a data-driven reasoning method. It begins with known facts (user questionnaire answers) and applies production rules to derive degree recommendations.

> Forward chaining is chosen because it is data-driven — the engine starts from what the student provides and works forward to a conclusion, mirroring how a human counselor builds up a picture from a student's profile before forming a recommendation.

### 6.2.2.2 Reasoning Process

The inference process consists of the following steps, as implemented in `inferenceEngine.js`:

**Step 1 — Fact Generation (Working Memory)**  
User responses from the questionnaire are converted into a structured fact set (a `Map` of question IDs to selected values). Multi-select answers are expanded so each selected option becomes an individual fact.

```js
// Example: user answered q_math = 'strong', q_best_subject = ['add_math', 'physics']
facts.get('q_math')         // → Set { 'strong' }
facts.get('q_best_subject') // → Set { 'add_math', 'physics' }
```

**Step 2 — Rule Matching**  
The engine evaluates all 40 rules against the Working Memory. A rule matches when **all** its conditions are satisfied (logical AND).

```js
function conditionsMet(conditions, facts) {
  return conditions.every(({ questionId, value }) => {
    const factValues = facts.get(questionId);
    return factValues ? factValues.has(value) : false;
  });
}
```

**Step 3 — Rule Firing and Score Assignment**  
When a rule's conditions are satisfied, it fires — adding its weighted points to each degree listed in its `scores` object. A trace log is also recorded for the Explanation Facility.

```js
if (conditionsMet(rule.conditions, facts)) {
  for (const [degreeId, points] of Object.entries(rule.scores)) {
    scoreMap[degreeId] += points;       // accumulate score
    traceMap[degreeId].push({ ... });   // record rule for explanation
  }
}
```

**Step 4 — Score Normalisation**  
After all rules are evaluated, each degree's raw score is normalised against its maximum possible score (the sum of all rules that could ever contribute to that degree). This produces a percentage match score.

```
percentage = (rawScore / maxPossibleScore) × 100
```

Normalisation ensures fair comparison between degrees that have different numbers of applicable rules.

**Step 5 — Ranking and Selection**  
Degrees are sorted in descending order by normalised percentage. The top 3 matching degrees are returned as recommendations.

```js
return results
  .filter((r) => r.score > 0)
  .sort((a, b) => b.percentage - a.percentage)
  .slice(0, 3);
```

### 6.2.2.3 Explanation Facility

To enhance transparency, the system includes an explanation module that justifies each recommendation by exposing the rules that fired during inference.

For each recommended degree, the results page displays:
- The degree name and normalised match percentage
- A list of all rules that fired, with descriptions and point contributions
- Suggested career paths (sourced from the degree frame in `degrees.js`)

**Example output for Computer Science:**

```
Recommended: Computer Science — 78%

Reasons:
  • Strong in Mathematics — a core academic requirement for analytical and STEM degrees   (+30 pts)
  • Additional Mathematics is a strong indicator for STEM-based degrees                   (+25 pts)
  • Analytical thinker (Holland: Investigative) — suits CS, Engineering, Medicine         (+25 pts)
  • Career goal in Technology or Engineering                                               (+25 pts)
  • Spends free time coding, gaming, or exploring gadgets                                 (+30 pts)

Career paths: Software Engineer, Data Scientist, Cybersecurity Analyst, Systems Developer
```

This feature improves user trust and interpretability, which are essential characteristics of expert systems.
