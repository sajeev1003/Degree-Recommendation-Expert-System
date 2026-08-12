/**
 * ============================================================
 * ACADEMIC STRENGTH RULES — Production Rule Representation
 * ============================================================
 *
 * Knowledge Representation Type: Rule-Based (IF-THEN Production Rules)
 *
 * These rules encode the academic grades and subject performance knowledge
 * extracted from the Subject Matter Expert (SME) — a Senior Secondary School
 * Counselor with 17 years of advising experience.
 *
 * SME Rationale (Section B1):
 *   "Academic grades directly influence which field students can pursue for
 *    further studies. If students do not achieve good results, there are other
 *    alternative careers for students to choose. Students must understand this."
 *
 * Weight: HIGHEST — academic rules carry the most points in the knowledge base,
 * reflecting the SME's position that academic performance is the most important
 * factor when recommending a degree.
 *
 * Rule structure:
 *   id          — unique rule identifier (prefix: ACA)
 *   description — plain-English label shown in the Explanation Facility
 *   source      — reference to the specific SME answer that grounded this rule
 *   conditions  — array of { questionId, value } that must ALL be satisfied
 *   scores      — degree IDs mapped to points added when this rule fires
 */

export const ACADEMIC_RULES = [

  // ─── Mathematics ─────────────────────────────────────────────────────────────
  // SME (Section D): Strong Mathematics → Computer Science, Engineering, Accounting, Medicine
  // SME (C1d): "Mathematics, Science and English" — CS indicators
  // SME (C2d): "Physics, Modern Mathematics, Additional Mathematics, English" — Engineering
  // SME (C8d): "STEM subjects, English, Additional Mathematics" — Medicine
  {
    id: 'ACA-01',
    description: 'Strong in Mathematics — a core academic requirement for analytical and STEM degrees',
    source: 'SME Section D attribute table; C1d, C2d, C4d, C8d',
    conditions: [
      { questionId: 'q_math', value: 'strong' },
    ],
    scores: { computer_science: 30, engineering: 25, accounting: 25, medicine: 15 },
  },

  // ─── Science (Biology / Chemistry / Physics) ──────────────────────────────────
  // SME (C8d): "STEM subjects" are non-negotiable for Medicine
  // SME (E3): "Science-related courses are generally more suitable for science stream students"
  {
    id: 'ACA-02',
    description: 'Strong in Science — essential for Medicine and Engineering; supports CS',
    source: 'SME C8d, C2d, E3',
    conditions: [
      { questionId: 'q_science', value: 'strong' },
    ],
    scores: { medicine: 30, engineering: 20, computer_science: 10 },
  },

  // ─── Problem-Solving Ability ─────────────────────────────────────────────────
  // SME (C1a): "Analytical and critical thinking skills, problem solving ability" — CS
  // SME (C2a): "Mathematical or logical ability" — Engineering
  // SME (C3a): "Problem solving ability" — Business
  // SME (C4a): "Mathematical or logical ability, problem solving ability" — Accounting
  // SME (C5a): "Problem solving ability, logical thinking" — Psychology
  // SME (C8a): "Analytical and critical thinking skills" — Medicine
  {
    id: 'ACA-03',
    description: 'Strong problem-solving ability — valued across analytical, STEM, and professional degrees',
    source: 'SME C1a, C2a, C3a, C4a, C5a, C8a',
    conditions: [
      { questionId: 'q_problem_solving', value: 'strong' },
    ],
    scores: { computer_science: 25, engineering: 20, accounting: 20, medicine: 20, psychology: 10 },
  },

  // ─── Communication / Language Proficiency ────────────────────────────────────
  // SME (C1a): "Language proficiency have to be strong" — CS
  // SME (C3d): "All kinds of language subjects" — Business
  // SME (C5d): "English, Malay Language" — Psychology
  // SME (C6a): "Language proficiency" — Mass Communication
  // SME (D): Good written communication → Business, Accounting, Psychology, Mass Comm, Multimedia
  {
    id: 'ACA-04',
    description: 'Strong communication and language skills — key for people-oriented and media degrees',
    source: 'SME C1a, C3d, C5d, C6a, Section D',
    conditions: [
      { questionId: 'q_communication', value: 'strong' },
    ],
    scores: { mass_communication: 25, business: 20, psychology: 20, accounting: 10, computer_science: 10 },
  },

  // ─── Creative and Artistic Ability ───────────────────────────────────────────
  // SME (C7a): "Creative and innovative thinking, independent learning ability" — Multimedia
  // SME (D): Creative/Artistic → Psychology, Mass Comm, Multimedia
  {
    id: 'ACA-05',
    description: 'Strong creativity and artistic ability — essential for design and media degrees',
    source: 'SME C7a, Section D',
    conditions: [
      { questionId: 'q_creativity', value: 'strong' },
    ],
    scores: { multimedia_design: 30, mass_communication: 20, psychology: 10 },
  },

  // ─── Subject: Additional Mathematics ─────────────────────────────────────────
  // SME (C2d): "Additional Mathematics" — Engineering
  // SME (C4d): "Additional Mathematics (Selective)" — Accounting
  // SME (C8d): "Additional Mathematics" — Medicine
  // SME (E3): Non-negotiable for science-stream courses
  {
    id: 'ACA-06',
    description: 'Additional Mathematics is a strong indicator for STEM-based and quantitative degrees',
    source: 'SME C2d, C4d, C8d, E3',
    conditions: [
      { questionId: 'q_best_subject', value: 'add_math' },
    ],
    scores: { engineering: 30, computer_science: 25, accounting: 20, medicine: 20 },
  },

  // ─── Subject: Physics ────────────────────────────────────────────────────────
  // SME (C2d): "Physics" — strongest Engineering indicator
  // SME (C8d): STEM subjects → Medicine
  {
    id: 'ACA-07',
    description: 'Physics is a strong predictor for Engineering and a supporting indicator for Medicine',
    source: 'SME C2d, C8d',
    conditions: [
      { questionId: 'q_best_subject', value: 'physics' },
    ],
    scores: { engineering: 30, medicine: 15 },
  },

  // ─── Subject: Biology ────────────────────────────────────────────────────────
  // SME (D): Strong Biology → Medicine only
  // SME (C5d): "Science" → Psychology (general science)
  {
    id: 'ACA-08',
    description: 'Biology is the strongest subject predictor for Medicine',
    source: 'SME Section D; C8d',
    conditions: [
      { questionId: 'q_best_subject', value: 'biology' },
    ],
    scores: { medicine: 35, psychology: 10 },
  },

  // ─── Subject: Chemistry ──────────────────────────────────────────────────────
  // SME (D): Strong Chemistry → Engineering, Medicine
  {
    id: 'ACA-09',
    description: 'Chemistry is an indicator for Medicine and Engineering pathways',
    source: 'SME Section D',
    conditions: [
      { questionId: 'q_best_subject', value: 'chemistry' },
    ],
    scores: { medicine: 25, engineering: 15 },
  },

  // ─── Subject: Art & Design ───────────────────────────────────────────────────
  // SME (C7d): "Arts Education" — the ONLY subject indicator listed for Multimedia Design
  // SME (C7e): "Students who are not interested in arts" should NOT choose Multimedia
  {
    id: 'ACA-10',
    description: 'Art & Design subject is the defining academic indicator for Multimedia Design',
    source: 'SME C7d, C7e',
    conditions: [
      { questionId: 'q_best_subject', value: 'art' },
    ],
    scores: { multimedia_design: 35, mass_communication: 10 },
  },

  // ─── Subject: Bahasa Malaysia / English ──────────────────────────────────────
  // SME (C6d): "Any kind of language subjects" — Mass Communication
  // SME (C3d): "All kinds of language subjects" — Business
  // SME (C5d): "English, Malay Language" — Psychology
  {
    id: 'ACA-11',
    description: 'Strong in language subjects — essential for communication, social, and business degrees',
    source: 'SME C6d, C3d, C5d',
    conditions: [
      { questionId: 'q_best_subject', value: 'bm_english' },
    ],
    scores: { mass_communication: 30, business: 20, psychology: 15 },
  },

  // ─── Subject: Accounts ───────────────────────────────────────────────────────
  // Accounts subject is the most direct predictor for Accounting/Finance
  {
    id: 'ACA-12',
    description: 'Accounts subject is the strongest academic predictor for Accounting/Finance',
    source: 'SME C4d; domain knowledge',
    conditions: [
      { questionId: 'q_best_subject', value: 'accounts' },
    ],
    scores: { accounting: 35, business: 15 },
  },

  // ─── Most Enjoyed Subject ─────────────────────────────────────────────────────
  // Enjoyment of a subject signals intrinsic motivation, which the SME cited as
  // a key indicator of persistence and success (Section B2).
  {
    id: 'ACA-13',
    description: 'Most enjoyed subject is Mathematics — strong indicator for quantitative degrees',
    source: 'SME B2; domain knowledge',
    conditions: [
      { questionId: 'q_enjoyed_subject', value: 'math' },
    ],
    scores: { computer_science: 15, engineering: 15, accounting: 20 },
  },
  {
    id: 'ACA-14',
    description: 'Most enjoyed subject is Science — indicator for STEM degrees',
    source: 'SME B2; C8d, C2d',
    conditions: [
      { questionId: 'q_enjoyed_subject', value: 'science' },
    ],
    scores: { medicine: 20, engineering: 15, computer_science: 10 },
  },
  {
    id: 'ACA-15',
    description: 'Most enjoyed subject is Languages — indicator for communication and social degrees',
    source: 'SME B2; C6d, C3d, C5d',
    conditions: [
      { questionId: 'q_enjoyed_subject', value: 'language' },
    ],
    scores: { mass_communication: 25, business: 15, psychology: 10 },
  },
  {
    id: 'ACA-16',
    description: 'Most enjoyed subject is Art or Design — indicator for creative degrees',
    source: 'SME B2; C7d',
    conditions: [
      { questionId: 'q_enjoyed_subject', value: 'art_design' },
    ],
    scores: { multimedia_design: 30, mass_communication: 15 },
  },
];
