import { createTwoPointsLineQuestion } from './questionTypes/TwoPointsLineQuestion.js';
import { createEquationLineQuestion } from './questionTypes/EquationLineQuestion.js';
import { createSlopePointLineQuestion } from './questionTypes/SlopePointLineQuestion.js';
import { createParallelFreeQuestion } from './questionTypes/ParallelFreeQuestion.js';
import { createParallelThroughPointQuestion } from './questionTypes/ParallelThroughPointQuestion.js';

const questionFactories = {
  'two-points-line': createTwoPointsLineQuestion,
  'equation-line': createEquationLineQuestion,
  'slope-point-line': createSlopePointLineQuestion,
  'parallel-free': createParallelFreeQuestion,
  'parallel-through-point': createParallelThroughPointQuestion,
};

const typeIds = Object.keys(questionFactories);

/** Create a question of a specific type */
export function createQuestion(typeId) {
  const factory = questionFactories[typeId];
  if (!factory) throw new Error(`Unknown question type: ${typeId}`);
  return factory();
}

/** Create a random question from all registered types */
export function createRandomQuestion() {
  const typeId = typeIds[Math.floor(Math.random() * typeIds.length)];
  return createQuestion(typeId);
}

/** List all registered type IDs */
export function getRegisteredTypes() {
  return [...typeIds];
}
