/**
 * ============================================================
 * KNOWLEDGE BASE — Rule Index
 * ============================================================
 *
 * Knowledge Representation Type: Rule-Based (IF-THEN Production Rules)
 *
 * This file is the master index for all production rules in the
 * Degree Recommendation Expert System. Rules are organised into
 * three categories reflecting the SME's priority weighting:
 *
 *   1. ACADEMIC RULES  (rules_academic.js)   — Highest weight
 *      Derived from: subject performance, skill self-assessment
 *      SME source: Section B1 — "Academic grades directly influence
 *      which field students can pursue for further studies."
 *
 *   2. PERSONALITY RULES (rules_personality.js) — Medium weight
 *      Derived from: Holland RIASEC model (referenced by SME for each degree)
 *      SME source: Section B2 — "Personality traits influence career choices."
 *
 *   3. INTEREST RULES (rules_interest.js) — Medium-Low weight
 *      Derived from: career goals, hobbies, and general interests
 *      SME source: Section A3 — "Career inventory and student preferences."
 *
 * Rule count by category:
 *   Academic    : 16 rules  (ACA-01 to ACA-16)
 *   Personality :  9 rules  (PER-01 to PER-09)
 *   Interest    : 15 rules  (INT-01 to INT-15)
 *   ─────────────────────────────────────────
 *   Total       : 40 rules
 *
 * The combined RULES array is consumed by the Inference Engine
 * (src/engine/inferenceEngine.js) via forward chaining.
 */

import { ACADEMIC_RULES } from './rules_academic';
import { PERSONALITY_RULES } from './rules_personality';
import { INTEREST_RULES } from './rules_interest';

export const RULES = [
  ...ACADEMIC_RULES,
  ...PERSONALITY_RULES,
  ...INTEREST_RULES,
];
