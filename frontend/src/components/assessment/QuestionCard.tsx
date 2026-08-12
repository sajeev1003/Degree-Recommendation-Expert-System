// TODO: Implement question card component
// Handles three question types: single (radio), multi (checkbox), scale (1–5 buttons)
// Props: question (Question), currentAnswer, onChange callback

import type { Question, Answer } from '../../lib/types';

interface QuestionCardProps {
  question: Question;
  currentAnswer: Answer | undefined;
  onChange: (answer: Answer) => void;
}

export default function QuestionCard({ question, currentAnswer, onChange }: QuestionCardProps) {
  void currentAnswer;
  void onChange;

  return (
    <div>
      <p>{question.text}</p>
      <p>QuestionCard — to be implemented</p>
    </div>
  );
}
