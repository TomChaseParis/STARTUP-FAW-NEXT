"use client";

type Props = {
  correct: boolean;
  correctAnswer: string;
  selectedAnswer: string;
};

export default function AnswerFeedback({
  correct,
  correctAnswer,
  selectedAnswer,
}: Props) {
  return (
    <div className="mt-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      {correct ? (
        <p className="font-semibold text-green-700">
          ✔ {selectedAnswer}
        </p>
      ) : (
        <>
          <p className="font-semibold text-red-700">
            ❌ {selectedAnswer}
          </p>

          <p className="mt-2 font-semibold text-green-700">
            ✔ {correctAnswer}
          </p>
        </>
      )}
    </div>
  );
}