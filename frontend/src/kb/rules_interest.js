/**
 * ============================================================
 * INTEREST & HOBBY RULES — Production Rule Representation
 * ============================================================
 *
 * Knowledge Representation Type: Rule-Based (IF-THEN Production Rules)
 *
 * These rules encode personal interests, hobbies, and career goals as
 * extracted from the SME's expert elicitation (Section C, parts c and A3).
 *
 * SME Rationale (Section A3):
 *   "Understanding students' career interests through the career inventory,
 *    students' choices or their preferences and their family background"
 *    are the first things an advisor examines in a consultation.
 *
 * SME Rationale (Section B2):
 *   "Students' personality traits do influence their future career choices."
 *
 * Weight: MEDIUM-LOW — interests are a secondary signal after academic
 * performance and personality traits, but a strong career goal can be
 * a reliable early indicator of degree fit.
 *
 * Rule structure:
 *   id          — unique rule identifier (prefix: INT)
 *   description — plain-English label shown in the Explanation Facility
 *   source      — reference to the specific SME answer that grounded this rule
 *   conditions  — array of { questionId, value } that must ALL be satisfied
 *   scores      — degree IDs mapped to points added when this rule fires
 */

export const INTEREST_RULES = [

  // ─── Career Goal ─────────────────────────────────────────────────────────────
  // Career interest is the primary signal from the career inventory (SME A3).
  // These rules carry higher weights within the interest category.

  {
    id: 'INT-01',
    description: 'Career goal in Technology or Engineering',
    source: 'SME A3 — career inventory; C1c, C2c',
    conditions: [
      { questionId: 'q_career_goal', value: 'tech' },
    ],
    scores: { computer_science: 25, engineering: 25 },
  },
  {
    id: 'INT-02',
    description: 'Career goal in Healthcare or Medicine',
    source: 'SME A3 — career inventory; C8c',
    conditions: [
      { questionId: 'q_career_goal', value: 'health' },
    ],
    scores: { medicine: 35, psychology: 10 },
  },
  {
    id: 'INT-03',
    description: 'Career goal in Business or Finance',
    source: 'SME A3 — career inventory; C3c, C4c; E1',
    conditions: [
      { questionId: 'q_career_goal', value: 'commerce' },
    ],
    scores: { business: 25, accounting: 25 },
  },
  {
    id: 'INT-04',
    description: 'Career goal in Arts, Media, or Design',
    source: 'SME A3 — career inventory; C6c, C7c',
    conditions: [
      { questionId: 'q_career_goal', value: 'creative' },
    ],
    scores: { multimedia_design: 25, mass_communication: 25 },
  },
  {
    id: 'INT-05',
    description: 'Career goal in Education, Counselling, or Social Work',
    source: 'SME A3 — career inventory; C5c',
    conditions: [
      { questionId: 'q_career_goal', value: 'social' },
    ],
    scores: { psychology: 30, mass_communication: 10, business: 5 },
  },

  // ─── Favourite Activity / General Interest ────────────────────────────────────
  // SME (C1c): "Interested in any or all of the computer skills" — CS
  // SME (C2c): "Students who prefer hands-on work" — Engineering
  // SME (C3c): "Able to give a speech in front of many people, willing to join different activities" — Business
  // SME (C4c): "Interested in solving mathematical problems" — Accounting
  // SME (C5c): "Like to make friends, listening to others" — Psychology
  // SME (C6c): "Enjoys writing articles, likes to perform, creative" — Mass Comm
  // SME (C7c): "Likes drawing, good in IT, likes doing handicrafts" — Multimedia
  // SME (C8c): "Like to solve critical thinking problems, enjoy reading informative books" — Medicine

  {
    id: 'INT-06',
    description: 'Interested in working with technology and computers (SME: C1c)',
    source: 'SME C1c',
    conditions: [
      { questionId: 'q_interest', value: 'technology' },
    ],
    scores: { computer_science: 25, engineering: 10, multimedia_design: 10 },
  },
  {
    id: 'INT-07',
    description: 'Interested in drawing, designing, or creating visuals (SME: C7c)',
    source: 'SME C7c',
    conditions: [
      { questionId: 'q_interest', value: 'design' },
    ],
    scores: { multimedia_design: 30, mass_communication: 10 },
  },
  {
    id: 'INT-08',
    description: 'Interested in planning, managing, or leading projects (SME: C3c)',
    source: 'SME C3c',
    conditions: [
      { questionId: 'q_interest', value: 'business' },
    ],
    scores: { business: 25, accounting: 10 },
  },
  {
    id: 'INT-09',
    description: 'Interested in helping or advising people (SME: C5c)',
    source: 'SME C5c',
    conditions: [
      { questionId: 'q_interest', value: 'helping' },
    ],
    scores: { psychology: 25, medicine: 15, mass_communication: 5 },
  },
  {
    id: 'INT-10',
    description: 'Interested in writing, presenting, or creating media content (SME: C6c)',
    source: 'SME C6c',
    conditions: [
      { questionId: 'q_interest', value: 'media' },
    ],
    scores: { mass_communication: 30, multimedia_design: 10 },
  },

  // ─── Free Time / Hobbies ──────────────────────────────────────────────────────
  // Hobbies are a reliable signal of intrinsic motivation, which the SME
  // identified as important alongside formal academic performance.

  {
    id: 'INT-11',
    description: 'Spends free time coding, gaming, or exploring gadgets (SME: C1c)',
    source: 'SME C1c',
    conditions: [
      { questionId: 'q_free_time', value: 'coding' },
    ],
    scores: { computer_science: 30, multimedia_design: 10 },
  },
  {
    id: 'INT-12',
    description: 'Spends free time drawing, photographing, or crafting (SME: C7c)',
    source: 'SME C7c',
    conditions: [
      { questionId: 'q_free_time', value: 'art' },
    ],
    scores: { multimedia_design: 30, mass_communication: 10 },
  },
  {
    id: 'INT-13',
    description: 'Spends free time reading, debating, or writing — linked to Media and Medicine (SME: C6c, C8c)',
    source: 'SME C6c, C8c',
    conditions: [
      { questionId: 'q_free_time', value: 'reading' },
    ],
    scores: { mass_communication: 20, medicine: 15, psychology: 10, business: 5 },
  },
  {
    id: 'INT-14',
    description: 'Spends free time volunteering or in community service (SME: C5c)',
    source: 'SME C5c',
    conditions: [
      { questionId: 'q_free_time', value: 'volunteering' },
    ],
    scores: { psychology: 25, medicine: 10, mass_communication: 5 },
  },
  {
    id: 'INT-15',
    description: 'Spends free time tracking budgets or exploring business ideas (SME: C4c)',
    source: 'SME C4c',
    conditions: [
      { questionId: 'q_free_time', value: 'finance' },
    ],
    scores: { accounting: 30, business: 20 },
  },
];
