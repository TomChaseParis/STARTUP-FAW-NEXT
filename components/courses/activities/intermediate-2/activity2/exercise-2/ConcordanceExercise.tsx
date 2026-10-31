"use client";

import TransformationCardsEngine from "@/components/courses/engines/TransformationCardsEngine";

import type {
  TransformationCardsData,
  TransformationCardsResult,
} from "@/types/transformationCardsTypes";

import type {
  ExerciseHistoryItem,
  ExerciseSessionResult,
} from "@/components/courses/common/types/exerciseSessionTypes";

import concordanceData from "./data/concordanceData";

type ConcordanceExerciseProps = {
  onComplete?: (result: ExerciseSessionResult) => void;
};

function buildQuestion(
  card: TransformationCardsData["cards"][number],
  inputId: string,
): string {
  return card.target
    .map((part) => {
      if (part.type === "input") {
        return part.id === inputId ? "[…]" : "________";
      }

      return part.value;
    })
    .join("");
}

function adaptTransformationResult(
  result: TransformationCardsResult,
  data: TransformationCardsData,
): ExerciseSessionResult {
  const history: ExerciseHistoryItem[] = result.answers.map(
    (answer, index) => {
      const card = data.cards.find(
        (item) => item.id === answer.cardId,
      );

      const input = card?.target.find(
        (part) =>
          part.type === "input" && part.id === answer.inputId,
      );

      return {
        questionId: index + 1,
        question: card
          ? buildQuestion(card, answer.inputId)
          : "Phrase à compléter",
        selectedAnswer: answer.userAnswer,
        correctAnswer: answer.expectedAnswers.join(" / "),
        isCorrect: answer.isCorrect,
        explanation:
          (input?.type === "input" ? input.hint : undefined) ??
          card?.explanation,
      };
    },
  );

  const finishedAt = result.finishedAt;

  const duration = finishedAt
    ? Math.max(
        0,
        Math.round(
          (finishedAt.getTime() - result.startedAt.getTime()) /
            1000,
        ),
      )
    : 0;

  return {
    score: result.score,
    correctAnswers: result.correctAnswers,
    totalQuestions: result.totalInputs,
    history,
    startedAt: result.startedAt,
    finishedAt,
    duration,
  };
}

export default function ConcordanceExercise({
  onComplete,
}: ConcordanceExerciseProps) {
  const handleComplete = (result: TransformationCardsResult) => {
    const adaptedResult = adaptTransformationResult(
      result,
      concordanceData,
    );

    onComplete?.(adaptedResult);
  };

  return (
    <section className="box-border block w-full min-w-0 max-w-full overflow-x-hidden">
      <TransformationCardsEngine
        data={concordanceData}
        onComplete={handleComplete}
      />
    </section>
  );
}