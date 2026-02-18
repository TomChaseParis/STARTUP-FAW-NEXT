"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useQuizEngine, Question } from "@/hooks/useQuizEngine";
import { computeScore, getScoreLevel } from "@/utils/quizScoring";

type Props = {
  questions: Question[];
  mode?: "training" | "exam";
};

const QuizEngine: React.FC<Props> = ({ questions }) => {
  const {
    currentIndex,
    currentQuestion,
    selectedChoiceId,
    selectChoice,
    nextQuestion,
    resetQuiz,
    history,
    totalQuestions,
    correctAnswers,
    isFinished,
  } = useQuizEngine(questions);

  const [showReport, setShowReport] = useState(false);

  if (!currentQuestion) return null;

  const progressPercent =
    totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const score = computeScore(correctAnswers, totalQuestions);

  /* ========================================================= */
  /* ===================== AUTO FINISH ======================= */
  /* ========================================================= */

  useEffect(() => {
    if (!selectedChoiceId) return;

    const isLastQuestion = currentIndex === totalQuestions - 1;

    if (isLastQuestion) {
      setTimeout(() => {
        nextQuestion(); // déclenche isFinished
      }, 900);
    }
  }, [selectedChoiceId]);

  /* ========================================================= */
  /* ======================= RESULT VIEW ===================== */
  /* ========================================================= */

  /* ========================================================= */
  /* ======================= RESULT VIEW ===================== */
  /* ========================================================= */

  if (isFinished) {
    if (showReport) {
      return (
        <div className="bg-slate-50 py-20 text-slate-900">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-10 text-center text-3xl font-bold">
              📊 Détail de tes réponses
            </h2>
    
            <div className="space-y-8">
              {history.map((item, index) => {
                const question = questions.find(
                  (q) => q.id === item.questionId
                );
    
                const selectedChoice = question?.choices.find(
                  (c) => c.id === item.selectedChoiceId
                );
    
                const correctChoice = question?.choices.find(
                  (c) => c.isCorrect
                );
    
                return (
                  <div
                    key={item.questionId}
                    className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200"
                  >
                    <p className="mb-3 text-lg font-semibold">
                      Question {index + 1}
                    </p>
    
                    {/* QUESTION */}
                    <p className="mb-4 text-slate-800">
                      {question?.question}
                    </p>
    
                    {/* RÉPONSE ÉTUDIANT */}
                    <p className="mb-2 text-slate-700">
                      Ta réponse :{" "}
                      <span
                        className={
                          item.isCorrect
                            ? "font-semibold text-green-600"
                            : "font-semibold text-red-600"
                        }
                      >
                        {selectedChoice?.label}
                      </span>
                    </p>
    
                    {/* BONNE RÉPONSE */}
                    {!item.isCorrect && (
                      <p className="mb-2 font-semibold text-green-700">
                        Bonne réponse : {correctChoice?.label}
                      </p>
                    )}
    
                    {/* EXPLICATION */}
                    {correctChoice?.explanation && (
                      <p className="mt-3 text-sm text-slate-600">
                        💡 {correctChoice.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
    
            <div className="mt-12 text-center">
              <button
                onClick={resetQuiz}
                className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black shadow-md transition hover:bg-amber-400"
              >
                Recommencer le quiz
              </button>
            </div>
          </div>
        </div>
      );
    }
    

    return (
      <div className="bg-slate-50 py-24 text-slate-900">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-500">
            Résultat final
          </p>

          <p className="text-7xl font-extrabold">
            {score}
            <span className="text-3xl text-slate-500"> / 100</span>
          </p>

          <p className="mt-4 text-lg text-slate-700">
            {correctAnswers} / {totalQuestions} bonnes réponses
          </p>

          <p className="mt-2 text-lg font-semibold text-amber-600">
            Niveau : {getScoreLevel(score)}
          </p>

          <div className="mt-12 flex justify-center gap-6">
            <button
              onClick={() => setShowReport(true)}
              className="rounded-xl bg-black px-8 py-3 text-white shadow-md transition hover:bg-black/90"
            >
              Voir mes résultats
            </button>

            <button
              onClick={resetQuiz}
              className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black shadow-md transition hover:bg-amber-400"
            >
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ========================================================= */
  /* ========================= QUIZ ========================== */
  /* ========================================================= */

  const correctChoice = currentQuestion?.choices.find((c) => c.isCorrect);
  const selectedChoice = currentQuestion?.choices.find(
    (c) => c.id === selectedChoiceId,
  );

  return (
    <section className="mx-auto max-w-5xl py-16">
      {/* Barre progression */}
      <div className="mb-6 h-2 w-full rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="rounded-2xl bg-white p-10 shadow-xl ring-1 ring-black/5">
        <h3 className="mb-6 text-xl font-semibold text-black">
          🗣 Question {currentIndex + 1} / {totalQuestions}
        </h3>

        <div className="flex flex-col gap-10 lg:flex-row">
          {/* TEXTE */}
          <div className="flex-1">
            <p className="mb-8 text-lg text-black">
              {currentQuestion.question}
            </p>

            <div className="space-y-3">
              {currentQuestion.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                const isCorrect = choice.isCorrect;

                return (
                  <button
                    key={choice.id}
                    onClick={() => selectChoice(choice.id)}
                    className={`
                      w-full rounded-lg border px-4 py-3 text-left text-black transition
                      ${
                        !selectedChoiceId
                          ? "border-black/20 hover:bg-gray-50"
                          : isCorrect
                            ? "border-green-500 bg-green-100 text-green-800"
                            : isSelected
                              ? "border-red-500 bg-red-100 text-red-800"
                              : "border-black/10"
                      }
                    `}
                  >
                    {choice.label}
                  </button>
                );
              })}
            </div>

            {/* ================= FEEDBACK DYNAMIQUE ================= */}

            {selectedChoiceId && (
              <div className="mt-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                {selectedChoice?.isCorrect ? (
                  <p className="font-semibold text-green-700">
                    ✔ Oui, c’est bien : {selectedChoice.label}
                  </p>
                ) : (
                  <p className="font-semibold text-red-700">
                    ❌ Non, c’était : {correctChoice?.label}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* IMAGE */}
          {currentQuestion.image && (
            <div className="relative w-full lg:w-1/3">
              <div className="relative overflow-hidden rounded-xl shadow-md ring-1 ring-black/10">
                <Image
                  src={currentQuestion.image}
                  alt="Illustration"
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Bouton suivante sauf dernière */}
        {selectedChoiceId && currentIndex < totalQuestions - 1 && (
          <div className="mt-10 text-right">
            <button
              onClick={nextQuestion}
              className="rounded-xl bg-black px-6 py-3 text-white shadow-md hover:bg-black/90"
            >
              Question suivante →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizEngine;
