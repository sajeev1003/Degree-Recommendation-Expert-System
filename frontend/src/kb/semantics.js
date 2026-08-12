/**
 * ============================================================
 * ATTRIBUTE-TO-DEGREE RELATIONSHIPS — Semantic Network Representation
 * ============================================================
 *
 * Knowledge Representation Type: Semantic Network
 *
 * A semantic network represents knowledge as a graph of nodes and
 * labelled edges. Each node is either a student attribute or a degree
 * programme. Each edge represents a "predicts" or "correlates with"
 * relationship between an attribute and a degree.
 *
 * This structure is derived directly from the SME's Attribute Ranking
 * Table (Section D of the expert elicitation), where the counselor
 * explicitly mapped student attributes to the degree programmes they
 * best predict.
 *
 * How to read this:
 *   ATTRIBUTE_NODES  — the student trait nodes in the network
 *   DEGREE_NODES     — the degree programme nodes in the network
 *   SEMANTIC_EDGES   — directed edges: attribute → degree (with strength)
 *   ATTRIBUTE_TO_DEGREES — adjacency map: attribute → connected degree IDs
 *   DEGREE_TO_ATTRIBUTES — reverse map: degree → connected attribute IDs
 *
 * Strength levels (from SME tick marks in Section D):
 *   'strong'   — SME explicitly ticked this relationship
 *   (blank)    — not relevant; no edge created
 *
 * Note: This representation is used for knowledge documentation and
 * the Explanation Facility display. The Inference Engine uses the
 * production rules in rules_academic.js, rules_personality.js, and
 * rules_interest.js for actual scoring.
 */

// ── Nodes ─────────────────────────────────────────────────────────────────────

export const ATTRIBUTE_NODES = [
  { id: 'strong_mathematics',       label: 'Strong in Mathematics' },
  { id: 'strong_biology',           label: 'Strong in Biology' },
  { id: 'strong_chemistry',         label: 'Strong in Chemistry' },
  { id: 'strong_physics',           label: 'Strong in Physics' },
  { id: 'good_written_comm',        label: 'Good written communication' },
  { id: 'good_verbal_comm',         label: 'Good verbal communication' },
  { id: 'creative_artistic',        label: 'Creative / Artistic' },
  { id: 'analytical_logical',       label: 'Analytical / Logical thinker' },
  { id: 'detail_oriented',          label: 'Detail-oriented' },
  { id: 'social_people',            label: 'Social / People-oriented' },
  { id: 'leadership_ability',       label: 'Leadership ability' },
  { id: 'empathetic_caring',        label: 'Empathetic / Caring' },
  { id: 'interest_technology',      label: 'Interest in technology' },
  { id: 'interest_business_money',  label: 'Interest in business / money' },
  { id: 'interest_art_design',      label: 'Interest in art / design' },
  { id: 'interest_human_behaviour', label: 'Interest in human behaviour' },
  { id: 'interest_media_story',     label: 'Interest in media / storytelling' },
  { id: 'enjoys_research_reading',  label: 'Enjoys research / reading' },
  { id: 'hands_on_active',          label: 'Physically active / hands-on' },
];

export const DEGREE_NODES = [
  { id: 'computer_science',   label: 'Computer Science' },
  { id: 'engineering',        label: 'Engineering' },
  { id: 'business',           label: 'Business Administration' },
  { id: 'accounting',         label: 'Accounting' },
  { id: 'psychology',         label: 'Psychology' },
  { id: 'mass_communication', label: 'Mass Communication' },
  { id: 'multimedia_design',  label: 'Multimedia Design' },
  { id: 'medicine',           label: 'Medicine' },
];

// ── Edges ─────────────────────────────────────────────────────────────────────
// Each edge: { from: attributeId, to: degreeId, strength: 'strong' }
// Directly transcribed from the SME's Section D attribute ranking table (✓ marks).

export const SEMANTIC_EDGES = [
  // Strong in Mathematics
  { from: 'strong_mathematics',       to: 'computer_science',   strength: 'strong' },
  { from: 'strong_mathematics',       to: 'engineering',        strength: 'strong' },
  { from: 'strong_mathematics',       to: 'accounting',         strength: 'strong' },
  { from: 'strong_mathematics',       to: 'medicine',           strength: 'strong' },

  // Strong in Biology
  { from: 'strong_biology',           to: 'medicine',           strength: 'strong' },

  // Strong in Chemistry
  { from: 'strong_chemistry',         to: 'engineering',        strength: 'strong' },
  { from: 'strong_chemistry',         to: 'medicine',           strength: 'strong' },

  // Strong in Physics
  { from: 'strong_physics',           to: 'engineering',        strength: 'strong' },
  { from: 'strong_physics',           to: 'medicine',           strength: 'strong' },

  // Good written communication
  { from: 'good_written_comm',        to: 'business',           strength: 'strong' },
  { from: 'good_written_comm',        to: 'accounting',         strength: 'strong' },
  { from: 'good_written_comm',        to: 'psychology',         strength: 'strong' },
  { from: 'good_written_comm',        to: 'mass_communication', strength: 'strong' },
  { from: 'good_written_comm',        to: 'multimedia_design',  strength: 'strong' },

  // Good verbal communication
  { from: 'good_verbal_comm',         to: 'business',           strength: 'strong' },
  { from: 'good_verbal_comm',         to: 'psychology',         strength: 'strong' },
  { from: 'good_verbal_comm',         to: 'mass_communication', strength: 'strong' },

  // Creative / Artistic
  { from: 'creative_artistic',        to: 'psychology',         strength: 'strong' },
  { from: 'creative_artistic',        to: 'mass_communication', strength: 'strong' },
  { from: 'creative_artistic',        to: 'multimedia_design',  strength: 'strong' },

  // Analytical / Logical thinker
  { from: 'analytical_logical',       to: 'computer_science',   strength: 'strong' },
  { from: 'analytical_logical',       to: 'engineering',        strength: 'strong' },
  { from: 'analytical_logical',       to: 'psychology',         strength: 'strong' },
  { from: 'analytical_logical',       to: 'medicine',           strength: 'strong' },

  // Detail-oriented
  { from: 'detail_oriented',          to: 'computer_science',   strength: 'strong' },
  { from: 'detail_oriented',          to: 'engineering',        strength: 'strong' },
  { from: 'detail_oriented',          to: 'accounting',         strength: 'strong' },
  { from: 'detail_oriented',          to: 'medicine',           strength: 'strong' },

  // Social / People-oriented
  { from: 'social_people',            to: 'business',           strength: 'strong' },
  { from: 'social_people',            to: 'psychology',         strength: 'strong' },
  { from: 'social_people',            to: 'mass_communication', strength: 'strong' },

  // Leadership ability
  { from: 'leadership_ability',       to: 'engineering',        strength: 'strong' },
  { from: 'leadership_ability',       to: 'business',           strength: 'strong' },
  { from: 'leadership_ability',       to: 'accounting',         strength: 'strong' },
  { from: 'leadership_ability',       to: 'mass_communication', strength: 'strong' },

  // Empathetic / Caring
  { from: 'empathetic_caring',        to: 'business',           strength: 'strong' },
  { from: 'empathetic_caring',        to: 'psychology',         strength: 'strong' },
  { from: 'empathetic_caring',        to: 'mass_communication', strength: 'strong' },

  // Interest in technology
  { from: 'interest_technology',      to: 'computer_science',   strength: 'strong' },
  { from: 'interest_technology',      to: 'engineering',        strength: 'strong' },
  { from: 'interest_technology',      to: 'mass_communication', strength: 'strong' },
  { from: 'interest_technology',      to: 'multimedia_design',  strength: 'strong' },

  // Interest in business / money
  { from: 'interest_business_money',  to: 'business',           strength: 'strong' },
  { from: 'interest_business_money',  to: 'accounting',         strength: 'strong' },
  { from: 'interest_business_money',  to: 'multimedia_design',  strength: 'strong' },
  { from: 'interest_business_money',  to: 'medicine',           strength: 'strong' },

  // Interest in art / design
  { from: 'interest_art_design',      to: 'psychology',         strength: 'strong' },
  { from: 'interest_art_design',      to: 'mass_communication', strength: 'strong' },
  { from: 'interest_art_design',      to: 'multimedia_design',  strength: 'strong' },

  // Interest in human behaviour
  { from: 'interest_human_behaviour', to: 'business',           strength: 'strong' },
  { from: 'interest_human_behaviour', to: 'psychology',         strength: 'strong' },
  { from: 'interest_human_behaviour', to: 'mass_communication', strength: 'strong' },

  // Interest in media / storytelling
  { from: 'interest_media_story',     to: 'psychology',         strength: 'strong' },
  { from: 'interest_media_story',     to: 'mass_communication', strength: 'strong' },
  { from: 'interest_media_story',     to: 'multimedia_design',  strength: 'strong' },

  // Enjoys research / reading
  { from: 'enjoys_research_reading',  to: 'computer_science',   strength: 'strong' },
  { from: 'enjoys_research_reading',  to: 'engineering',        strength: 'strong' },
  { from: 'enjoys_research_reading',  to: 'psychology',         strength: 'strong' },
  { from: 'enjoys_research_reading',  to: 'medicine',           strength: 'strong' },

  // Physically active / hands-on
  { from: 'hands_on_active',          to: 'engineering',        strength: 'strong' },
  { from: 'hands_on_active',          to: 'mass_communication', strength: 'strong' },
  { from: 'hands_on_active',          to: 'multimedia_design',  strength: 'strong' },
];

// ── Adjacency Maps (derived from edges for quick lookup) ──────────────────────

// attribute → list of degree IDs it predicts
export const ATTRIBUTE_TO_DEGREES = SEMANTIC_EDGES.reduce((map, edge) => {
  if (!map[edge.from]) map[edge.from] = [];
  map[edge.from].push(edge.to);
  return map;
}, {});

// degree → list of attribute IDs that predict it
export const DEGREE_TO_ATTRIBUTES = SEMANTIC_EDGES.reduce((map, edge) => {
  if (!map[edge.to]) map[edge.to] = [];
  map[edge.to].push(edge.from);
  return map;
}, {});
