/**
 * Inference Engine — Forward Chaining
 *
 * Process:
 *  1. Convert questionnaire answers into a fact set (Working Memory)
 *  2. Evaluate all rules against the fact set
 *  3. Fire matching rules and accumulate degree scores
 *  4. Rank degrees by total score
 *  5. Return top recommendations with explanation traces
 */

import { RULES } from '../kb/rules';
import { DEGREES } from '../kb/degrees';

/**
 * Convert raw answers array into a flat fact set for easy rule evaluation.
 * Multi-select answers are expanded so each selected value becomes its own fact.
 *
 * @param {Array<{ questionId: string, value: string | string[] }>} answers
 * @returns {Map<string, Set<string>>} — questionId → Set of selected values
 */
function buildFactSet(answers) {
  const facts = new Map();
  for (const answer of answers) {
    const values = Array.isArray(answer.value) ? answer.value : [answer.value];
    facts.set(answer.questionId, new Set(values));
  }
  return facts;
}

/**
 * Check whether all conditions of a rule are satisfied by the current fact set.
 *
 * @param {Array<{ questionId: string, value: string }>} conditions
 * @param {Map<string, Set<string>>} facts
 * @returns {boolean}
 */
function conditionsMet(conditions, facts) {
  return conditions.every(({ questionId, value }) => {
    const factValues = facts.get(questionId);
    return factValues ? factValues.has(value) : false;
  });
}

/**
 * Run the forward chaining inference engine.
 *
 * @param {Array<{ questionId: string, value: string | string[] }>} answers
 * @returns {Array<import('./types').DegreeRecommendation>}
 */
export function runInference(answers) {
  const facts = buildFactSet(answers);

  // Initialise score and trace for every degree
  const scoreMap = {};
  const traceMap = {};
  for (const degree of DEGREES) {
    scoreMap[degree.id] = 0;
    traceMap[degree.id] = [];
  }

  // Forward chaining — single pass through all rules
  for (const rule of RULES) {
    if (conditionsMet(rule.conditions, facts)) {
      for (const [degreeId, points] of Object.entries(rule.scores)) {
        if (degreeId in scoreMap) {
          scoreMap[degreeId] += points;
          traceMap[degreeId].push({
            ruleId: rule.id,
            description: rule.description,
            pointsAdded: points,
          });
        }
      }
    }
  }

  // Calculate the maximum possible score per degree (sum of all rule weights)
  const maxPossible = {};
  for (const degree of DEGREES) {
    maxPossible[degree.id] = RULES.reduce((sum, rule) => {
      return sum + (rule.scores[degree.id] ?? 0);
    }, 0);
  }

  // Build result list with scores, percentages, and explanations
  const results = DEGREES.map((degree) => {
    const score = scoreMap[degree.id];
    const max = maxPossible[degree.id] || 1;
    const maxPos = maxPossible[degree.id] || 1;
    let percentage = (score / maxPos) * 100;
    percentage = Math.min(Math.max(percentage, 0), 100);
    const rulesFired = traceMap[degree.id];

    const explanationLines = rulesFired.map((r) => `• ${r.description}`);
    const explanation =
      rulesFired.length > 0
        ? explanationLines.join('\n')
        : 'No strong matching attributes found for this degree.';

    return {
      degree: degree.name,
      degreeId: degree.id,
      score,
      maxScore: max,
      percentage,
      rulesFired,
      explanation,
      careerPaths: degree.careers,
    };
  });

  // Sort descending by percentage (normalised score), then return top 3
  return results
  .filter((r) => r.score > 0)
  .sort((a, b) => {
    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage;
    }
    if (b.rulesFired.length !== a.rulesFired.length) {
      return b.rulesFired.length - a.rulesFired.length;
    }
    return a.degree.localeCompare(b.degree);
  })
  .slice(0, 3);
}
