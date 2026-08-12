/**
 * ============================================================
 * PERSONALITY & WORKING STYLE RULES — Production Rule Representation
 * ============================================================
 *
 * Knowledge Representation Type: Rule-Based (IF-THEN Production Rules)
 *
 * These rules encode personality traits and working style preferences,
 * grounded in the Holland Occupational Themes (RIASEC) model as explicitly
 * referenced by the SME for each degree (Section C of expert elicitation).
 *
 * SME Rationale (Section B2):
 *   "Students' personality traits do influence their future career choices.
 *    While academic qualifications are important, attitude determines success."
 *
 * Holland RIASEC Types and their mapping to questionnaire answers:
 * ┌──────────────────┬──────────────────────────────────────────────────────┐
 * │ Holland Type     │ Mapped Question Answer                               │
 * ├──────────────────┼──────────────────────────────────────────────────────┤
 * │ R — Realistic    │ q_work_style: hands_on / independent                 │
 * │ I — Investigative│ q_personality: analytical                            │
 * │ A — Artistic     │ q_personality: creative                              │
 * │ S — Social       │ q_personality: social                                │
 * │ E — Enterprising │ q_personality: leader                                │
 * │ C — Conventional │ q_personality: detail / q_work_style: structured     │
 * └──────────────────┴──────────────────────────────────────────────────────┘
 *
 * Degree Holland profiles (per SME):
 *   Computer Science      → C, R, I  (Conventional, Realistic, Investigative)
 *   Engineering           → R, I, C  (Realistic, Investigative, Conventional)
 *   Business              → S, E, C  (Social, Enterprising, Conventional)
 *   Accounting            → C, R, I  (Conventional, Realistic, Investigative)
 *   Psychology            → S, E, A  (Social, Enterprising, Artistic)
 *   Mass Communication    → A, S, E  (Artistic, Social, Enterprising)
 *   Multimedia Design     → A, I, R  (Artistic, Investigative, Realistic)
 *   Medicine              → I, R, C  (Investigative, Realistic, Conventional)
 *
 * Weight: MEDIUM — personality is the second most important factor after academics.
 *
 * Rule structure:
 *   id          — unique rule identifier (prefix: PER)
 *   description — plain-English label shown in the Explanation Facility
 *   source      — reference to the specific SME answer that grounded this rule
 *   conditions  — array of { questionId, value } that must ALL be satisfied
 *   scores      — degree IDs mapped to points added when this rule fires
 */

export const PERSONALITY_RULES = [

  // ─── Investigative (I) — Analytical Thinker ──────────────────────────────────
  // SME: Investigative trait → CS (C1b), Engineering (C2b), Accounting (C4b), Medicine (C8b)
  // SME (D): Analytical/Logical thinker → Computer Science, Engineering, Psychology, Medicine
  {
    id: 'PER-01',
    description: 'Analytical thinker (Holland: Investigative) — suits CS, Engineering, Medicine, and Accounting',
    source: 'SME C1b, C2b, C4b, C8b; Section D',
    conditions: [
      { questionId: 'q_personality', value: 'analytical' },
    ],
    scores: { computer_science: 25, engineering: 20, medicine: 20, accounting: 15 },
  },

  // ─── Conventional (C) — Detail-Oriented ──────────────────────────────────────
  // SME: Conventional trait → CS (C1b), Engineering (C2b), Accounting (C4b), Medicine (C8b)
  // SME (D): Detail-oriented → Computer Science, Engineering, Accounting, Medicine
  {
    id: 'PER-02',
    description: 'Detail-oriented (Holland: Conventional) — suits precision-based degrees like Accounting and Medicine',
    source: 'SME C1b, C2b, C4b, C8b; Section D',
    conditions: [
      { questionId: 'q_personality', value: 'detail' },
    ],
    scores: { accounting: 25, medicine: 20, computer_science: 15, engineering: 10 },
  },

  // ─── Realistic (R) — Prefers Independent Work ─────────────────────────────────
  // SME (C2c): "Students who prefer hands-on work and can complete tasks independently" — Engineering
  // SME (D): Physically active/hands-on → Engineering, Mass Comm, Multimedia
  // Investigative (I) also leans independent; shared by CS, Accounting, Multimedia
  {
    id: 'PER-03',
    description: 'Prefers working independently (Holland: Realistic/Investigative) — suits CS, Accounting, Multimedia',
    source: 'SME C2c; C7b',
    conditions: [
      { questionId: 'q_work_style', value: 'independent' },
    ],
    scores: { computer_science: 20, accounting: 15, multimedia_design: 15, engineering: 15 },
  },

  // ─── Realistic (R) — Hands-On Worker ──────────────────────────────────────────
  // SME (C2b): Realistic trait → Engineering (primary)
  // SME (C7b): Realistic trait → Multimedia Design
  // SME (D): Physically active/hands-on → Engineering, Mass Comm, Multimedia
  {
    id: 'PER-04',
    description: 'Hands-on and practical worker (Holland: Realistic) — core trait for Engineering',
    source: 'SME C2b, C2c, C7b; Section D',
    conditions: [
      { questionId: 'q_work_style', value: 'hands_on' },
    ],
    scores: { engineering: 30, multimedia_design: 15, mass_communication: 10 },
  },

  // ─── Social (S) — People-Oriented ────────────────────────────────────────────
  // SME (C3b): Social trait → Business
  // SME (C5b): Social trait → Psychology (primary)
  // SME (C6b): Social trait → Mass Communication
  // SME (D): Social/People-oriented → Business, Psychology, Mass Comm
  {
    id: 'PER-05',
    description: 'Social and people-oriented (Holland: Social) — core trait for Psychology and Business',
    source: 'SME C3b, C5b, C6b; Section D',
    conditions: [
      { questionId: 'q_personality', value: 'social' },
    ],
    scores: { psychology: 25, business: 20, mass_communication: 20 },
  },

  // ─── Enterprising (E) — Leadership-Oriented ──────────────────────────────────
  // SME (C3b): Enterprising trait → Business (primary)
  // SME (C5b): Enterprising trait → Psychology
  // SME (C6b): Enterprising trait → Mass Communication
  // SME (D): Leadership ability → Engineering, Business, Accounting, Mass Comm
  {
    id: 'PER-06',
    description: 'Leadership-oriented (Holland: Enterprising) — suits Business and Mass Communication',
    source: 'SME C3b, C5b, C6b; Section D',
    conditions: [
      { questionId: 'q_personality', value: 'leader' },
    ],
    scores: { business: 25, mass_communication: 15, accounting: 10, engineering: 10 },
  },

  // ─── Social (S) + Enterprising (E) — Team Collaboration ──────────────────────
  // SME (C3a): "Able to work in a group" — Business
  // SME (C6a): "Willing to work in group" — Mass Comm
  // SME (C5c): Social nature → Psychology
  {
    id: 'PER-07',
    description: 'Prefers team-based work (Holland: Social/Enterprising) — suits collaborative degrees',
    source: 'SME C3a, C6a, C5c',
    conditions: [
      { questionId: 'q_work_style', value: 'team' },
    ],
    scores: { business: 20, psychology: 15, mass_communication: 15 },
  },

  // ─── Conventional (C) — Structured Work Preference ───────────────────────────
  // SME (C4b): Conventional trait → Accounting (primary — "doing tasks based on personal schedule")
  // SME (C4c): "Interested in solving mathematical problems, doing tasks based on personal schedule"
  {
    id: 'PER-08',
    description: 'Prefers structured, process-driven work (Holland: Conventional) — strongest fit for Accounting',
    source: 'SME C4b, C4c',
    conditions: [
      { questionId: 'q_work_style', value: 'structured' },
    ],
    scores: { accounting: 30, computer_science: 10, medicine: 10 },
  },

  // ─── Artistic (A) — Creative Expression ──────────────────────────────────────
  // SME (C6b): Artistic trait → Mass Communication (primary)
  // SME (C7b): Artistic trait → Multimedia Design (primary)
  // SME (C5b): Artistic trait → Psychology
  // SME (D): Creative/Artistic → Psychology, Mass Comm, Multimedia
  {
    id: 'PER-09',
    description: 'Creative and expressive personality (Holland: Artistic) — core for Multimedia and Mass Comm',
    source: 'SME C5b, C6b, C7b; Section D',
    conditions: [
      { questionId: 'q_personality', value: 'creative' },
    ],
    scores: { multimedia_design: 30, mass_communication: 25, psychology: 10 },
  },
];
