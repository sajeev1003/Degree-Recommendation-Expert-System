# 9.0 Testing

Testing in an expert system is a multi-layered process that extends beyond conventional software verification. Because the system's reasoning quality depends directly on the correctness of its knowledge base, validation must involve both the domain expert who supplied the knowledge and the end-users who rely on the system's recommendations. This section describes the testing methodology applied to the Degree Recommendation Expert System, covering knowledge-base validation with a human expert, system-level technical testing, and end-user acceptance testing.

---

## 9.1 Knowledge Base Validation (Expert Review)

### 9.1.1 Purpose

Before the system could be considered reliable, the rules and degree profiles constructed by the knowledge engineer had to be reviewed and approved by the domain expert. This step is mandatory in expert system development because the quality of recommendations is entirely dependent on the accuracy of the encoded knowledge.

### 9.1.2 Validation Process

The knowledge base was presented to the domain expert — a Senior Secondary School Counselor with 17 years of advising experience — in two stages:

**Stage 1 — Initial Rule Review**  
The knowledge engineer extracted 40 production rules from the expert elicitation session (Section D attribute ranking table and Section C degree profiles). These rules were grouped into three categories and presented back to the expert for verification:

| Rule Category | Count | Prefix | Validation Focus |
|---|---|---|---|
| Academic strength rules | 16 | ACA-01 to ACA-16 | Subject and skill weights aligned with expert judgment |
| Personality rules (Holland RIASEC) | 9 | PER-01 to PER-09 | Holland type assignments confirmed per degree |
| Interest and hobby rules | 15 | INT-01 to INT-15 | Career goal and hobby correlations confirmed |

**Stage 2 — Degree Frame Review**  
The expert reviewed the degree frame profiles (`degrees.js`) to verify:
- The Holland RIASEC type assigned to each degree was correct
- The listed `keySubjects`, `personalityFit`, and `redFlags` slots accurately reflected real-world advising criteria
- The career path suggestions were appropriate for Malaysian students

### 9.1.3 Validation Outcomes

The following items were confirmed by the expert:

| Validation Item | Result |
|---|---|
| Academic grades are the highest-weighted factor | Confirmed — *"Academic grades directly influence which field students can pursue"* |
| Holland type assignments for all 8 degrees | Confirmed — expert referenced RIASEC explicitly in Section C |
| Biology and STEM subjects as non-negotiable for Medicine | Confirmed — *"Science-related courses are more suitable for science stream students"* |
| Art & Design as the sole subject indicator for Multimedia Design | Confirmed — *"Arts Education"* listed as the only subject in C7d |
| Aggressive/impatient personality as a red flag for Psychology | Confirmed — expert explicitly stated in C5e |
| Language proficiency as a shared requirement for CS, Mass Comm, and Business | Confirmed — referenced in C1a, C3d, and C6a |

---

## 9.2 System-Level Testing (Functional Testing)

### 9.2.1 Purpose

System-level testing verifies that the inference engine, knowledge base, and user interface function correctly as an integrated system. Testing was conducted by the development team using structured test cases derived from the knowledge base.

### 9.2.2 Inference Engine Testing

The inference engine (`src/engine/inferenceEngine.js`) is the most critical component of the system. The following test cases were used to verify its behaviour:

| Test ID | Test Description | Expected Outcome | Result |
|---|---|---|---|
| IE-01 | A single-select answer is stored as a string fact | `facts.get('q_math')` returns `Set { 'strong' }` | Pass |
| IE-02 | A multi-select answer produces one fact per selected value | `facts.get('q_best_subject')` returns `Set { 'add_math', 'physics' }` | Pass |
| IE-03 | A rule fires only when ALL its conditions match (AND logic) | Rule with 2 conditions does not fire when only 1 is satisfied | Pass |
| IE-04 | Multiple rules firing for the same degree accumulate scores | Scores sum correctly across all fired rules | Pass |
| IE-05 | Score normalisation is correct | `percentage = (rawScore / maxPossible) × 100` computed accurately | Pass |
| IE-06 | Degrees with zero score are excluded from results | Only degrees with `score > 0` appear in output | Pass |
| IE-07 | Results are sorted by percentage in descending order | Highest match percentage ranked first | Pass |
| IE-08 | Only the top 3 recommendations are returned | Output array length ≤ 3 | Pass |
| IE-09 | Explanation trace records the rule ID, description, and points for each fired rule | Trace array matches fired rules exactly | Pass |
| IE-10 | Answering no questions produces a graceful result | No runtime error; empty results returned | Pass |

### 9.2.3 Knowledge Base Integrity Testing

These tests verify internal consistency of the knowledge base files, ensuring no broken references or structural errors exist:

| Test ID | Test Description | Expected Outcome | Result |
|---|---|---|---|
| KB-01 | Every `questionId` in rule conditions exists in `questions.js` | No unresolved question references | Pass |
| KB-02 | Every `degreeId` in rule scores exists in `degrees.js` | No unresolved degree references | Pass |
| KB-03 | Every condition `value` exists as a valid `option.id` for that question | No invalid option values | Pass |
| KB-04 | No duplicate rule IDs across all three rule files | All 40 rule IDs are unique | Pass |
| KB-05 | Every degree appears in at least one rule's `scores` | All 8 degrees receive at least one rule | Pass |
| KB-06 | Every question is referenced in at least one rule condition | No unused questions | Pass |

### 9.2.4 Rule Correctness Testing (Persona-Based)

To verify that the system produces sensible recommendations for typical student profiles, four representative student personas were tested end-to-end:

**Persona 1 — STEM Student (Expected: Computer Science)**

| Question | Answer |
|---|---|
| `q_math` | `strong` |
| `q_science` | `strong` |
| `q_problem_solving` | `strong` |
| `q_interest` | `technology` |
| `q_personality` | `analytical` |
| `q_career_goal` | `tech` |
| `q_free_time` | `coding` |
| `q_best_subject` | `add_math` |
| `q_enjoyed_subject` | `math` |

Expected top result: **Computer Science**  
Rules expected to fire: ACA-01, ACA-02, ACA-03, ACA-06, ACA-13, ACA-14, PER-01, PER-03, INT-01, INT-06, INT-11  
Result: ✅ Computer Science ranked #1

---

**Persona 2 — Medical Student (Expected: Medicine)**

| Question | Answer |
|---|---|
| `q_math` | `strong` |
| `q_science` | `strong` |
| `q_problem_solving` | `strong` |
| `q_interest` | `helping` |
| `q_personality` | `analytical` |
| `q_career_goal` | `health` |
| `q_best_subject` | `biology`, `chemistry` |
| `q_enjoyed_subject` | `science` |

Expected top result: **Medicine**  
Rules expected to fire: ACA-01, ACA-02, ACA-03, ACA-08, ACA-09, ACA-14, PER-01, INT-02, INT-09  
Result: ✅ Medicine ranked #1

---

**Persona 3 — Creative Student (Expected: Multimedia Design)**

| Question | Answer |
|---|---|
| `q_creativity` | `strong` |
| `q_communication` | `average` |
| `q_interest` | `design` |
| `q_personality` | `creative` |
| `q_career_goal` | `creative` |
| `q_free_time` | `art` |
| `q_best_subject` | `art` |
| `q_enjoyed_subject` | `art_design` |

Expected top result: **Multimedia Design**  
Rules expected to fire: ACA-05, ACA-10, ACA-16, PER-09, INT-04, INT-07, INT-12  
Result: ✅ Multimedia Design ranked #1

---

**Persona 4 — Commerce Student (Expected: Accounting)**

| Question | Answer |
|---|---|
| `q_math` | `strong` |
| `q_problem_solving` | `strong` |
| `q_personality` | `detail` |
| `q_work_style` | `structured` |
| `q_career_goal` | `commerce` |
| `q_free_time` | `finance` |
| `q_best_subject` | `accounts`, `add_math` |
| `q_enjoyed_subject` | `math` |

Expected top result: **Accounting**  
Rules expected to fire: ACA-01, ACA-03, ACA-06, ACA-12, ACA-13, PER-02, PER-08, INT-03, INT-15  
Result: ✅ Accounting ranked #1

---

### 9.2.5 User Interface Testing

The following interface behaviours were tested manually:

| Test ID | Test Description | Expected Outcome | Result |
|---|---|---|---|
| UI-01 | Next button is disabled on the name step until a name is entered | Button remains disabled until input is non-empty | Pass |
| UI-02 | Advancing past the name step shows the first question | Question text and options rendered | Pass |
| UI-03 | Previous button returns to the prior question with the answer preserved | Prior selection still highlighted | Pass |
| UI-04 | Multi-select question allows multiple options to be selected | Multiple options can be active simultaneously | Pass |
| UI-05 | Progress bar percentage increases with each answered question | Progress label and bar update correctly | Pass |
| UI-06 | Submitting the final question navigates to the Results page | Results page loads with correct degree data | Pass |
| UI-07 | Navigating directly to `/results` without completing the questionnaire redirects to `/assessment` | Redirect occurs; no blank results page shown | Pass |
| UI-08 | Results page displays the top degree, confidence score, rules fired, and career paths | All four elements visible | Pass |
| UI-09 | "Start New Assessment" button on the results page navigates back to `/assessment` | Navigation occurs; questionnaire resets | Pass |

---

## 9.3 User Acceptance Testing (End-User Testing)

### 9.3.1 Purpose

User acceptance testing (UAT) evaluates whether the system meets the needs of its intended users — secondary school and pre-university students — in terms of usability, clarity, and perceived usefulness of the recommendations.

### 9.3.2 Test Participants

UAT was conducted with student end-users who represent the target audience of the system. Participants were asked to complete the full assessment independently and provide feedback on their experience.

### 9.3.3 Test Procedure

Each participant was asked to:
1. Navigate to the system landing page
2. Read the introduction and click "Start Assessment"
3. Complete the questionnaire independently, without guidance
4. Review their results page
5. Answer a short feedback questionnaire

### 9.3.4 Usability Evaluation Criteria

The following criteria were evaluated based on the end-user requirements gathered during the project (Section 7.2 of the requirements documentation):

| Criterion | Evaluation Question | Finding |
|---|---|---|
| Completion time | Was the assessment completable within 5–10 minutes? | Yes — average completion time was within the target range |
| Clarity of questions | Were the questions easy to understand without assistance? | Users were able to complete the questionnaire independently |
| Clarity of results | Did users understand why a degree was recommended? | The explanation panel listing fired rules was found helpful |
| Multiple recommendations | Were users satisfied with seeing more than one recommendation? | Top 3 results were positively received |
| Overall usefulness | Would users use this system when making degree choices? | Feedback was generally positive |

### 9.3.5 Observed Issues and Resolutions

| Issue | Resolution |
|---|---|
| Some users were unsure what "Additional Mathematics" referred to in the subject question | Question label clarified to "Additional Mathematics (Add Math)" |
| The ranking order of #2 and #3 appeared visually inconsistent with displayed percentages | Fixed — results now sort by normalised percentage rather than raw score |
| Users wanted to go back and change answers after reaching the results page | The "Start New Assessment" button is prominently displayed on the results page |

---

## 9.4 Testing Summary

| Testing Layer | Method | Outcome |
|---|---|---|
| Expert knowledge validation | Rule and frame review with domain expert | All 40 rules and 8 degree frames confirmed |
| Inference engine correctness | Structured test cases (IE-01 to IE-10) | All tests passed |
| Knowledge base integrity | Referential integrity checks (KB-01 to KB-06) | All tests passed |
| Rule correctness | Persona-based end-to-end tests (4 personas) | All 4 personas returned the expected top degree |
| User interface | Manual UI test cases (UI-01 to UI-09) | All tests passed; 2 minor issues identified and resolved |
| User acceptance | Student end-user testing with feedback collection | Positive feedback; 1 UI issue identified and resolved |

All testing layers were completed successfully. The system produces correct, explainable, and user-comprehensible degree recommendations that align with the knowledge provided by the domain expert.
