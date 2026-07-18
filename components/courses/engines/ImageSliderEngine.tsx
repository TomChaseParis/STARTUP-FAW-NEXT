"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getScoreLevel } from "@/components/courses/common/utils/quizScoring";

type Item = {
  id: number;
  image: string;
  answer: string;
};

type Props = {
  data: {
    items: Item[];
  };
  teacherImage?: string;
};

type Result = {
  id: number;
  user: string;
  correct: string;
  isCorrect: boolean;
};

const normalize = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default function ImageSliderEngine({
  data,
  teacherImage = "/images/teachers/default.png",
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isValidated, setIsValidated] = useState(false);

  const [isFinished, setIsFinished] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [history, setHistory] = useState<Result[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [isTeacherAnnouncingScore, setIsTeacherAnnouncingScore] =
    useState(false);

  const isGuidedStep = currentIndex === 0;
  const isLastStep = currentIndex === data.items.length - 1;

  const currentItem = data.items[currentIndex];

  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        setIsTeacherAnnouncingScore(true);
      }, 800);
    }
  }, [isFinished]);

  const totalQuestions = data.items.length - 1;
  const currentQuestionIndex = Math.max(currentIndex, 1);

  const progress =
    totalQuestions > 0 ? (currentQuestionIndex / totalQuestions) * 100 : 0;

  const handleChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentItem.id]: value,
    }));
  };

  const currentAnswer = (answers[currentItem.id] || "").trim();
  const isValidAnswer = currentAnswer.length >= 5;
  const canGoNext = isGuidedStep || isValidAnswer;

  const isCorrect = normalize(currentAnswer) === normalize(currentItem.answer);

  const next = () => {
    if (!isValidated) return;

    if (!isLastStep) {
      setCurrentIndex((prev) => prev + 1);
      setIsValidated(false);
    } else {
      checkAnswers();
    }
  };

  const checkAnswers = () => {
    const results: Result[] = [];
    let correct = 0;

    const realItems = data.items.slice(1);

    realItems.forEach((item) => {
      const user = normalize(answers[item.id] || "");
      const expected = normalize(item.answer);
      const isCorrect = user === expected;

      if (isCorrect) correct++;

      results.push({
        id: item.id,
        user: answers[item.id] || "",
        correct: item.answer,
        isCorrect,
      });
    });

    const finalScore = Math.round((correct / realItems.length) * 100);

    setHistory(results);
    setScore(finalScore);
    setIsFinished(true);
  };

  const correctCount = history.filter((h) => h.isCorrect).length;

  if (isFinished) {
    if (showReport) {
      return (
        <div className="bg-slate-50 py-20 text-slate-900">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-10 text-center text-3xl font-bold">
              📊 Détail de tes réponses
            </h2>

            <div className="space-y-6">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200"
                >
                  <p>
                    Ta réponse :
                    <span
                      className={
                        h.isCorrect
                          ? "font-semibold text-green-600"
                          : "font-semibold text-red-600"
                      }
                    >
                      {" "}
                      {h.user || "—"}
                    </span>
                  </p>

                  {!h.isCorrect && (
                    <p className="font-semibold text-green-700">
                      Bonne réponse : {h.correct}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  setAnswers({});
                  setHistory([]);
                  setScore(null);
                  setIsFinished(false);
                  setCurrentIndex(0);
                  setShowReport(false);
                }}
                className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black shadow-md"
              >
                Recommencer
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-slate-50 py-24 text-slate-900">
        <div className="mx-auto max-w-3xl px-6 text-center">
          {isTeacherAnnouncingScore && (
            <div className="mb-10 flex flex-col items-center">
              <div className="relative h-32 w-32 animate-pulse overflow-hidden rounded-full shadow-xl ring-4 ring-amber-400">
                <Image
                  src={teacherImage}
                  alt="Professeur"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>

              <div className="relative mt-6 max-w-md rounded-2xl bg-amber-100 px-6 py-4 text-black shadow-md">
                <p className="text-lg font-semibold">
                  Ton score est de {score} sur 100 !
                </p>

                <p className="mt-1 text-sm">
                  Tu as {correctCount} bonnes réponses sur {history.length}.
                </p>

                <p className="mt-2 font-semibold text-amber-700">
                  Niveau : {getScoreLevel(score!)}
                </p>
              </div>
            </div>
          )}

          <p className="text-7xl font-extrabold">
            {score}
            <span className="text-3xl text-slate-500"> / 100</span>
          </p>

          <div className="mt-12 flex justify-center gap-6">
            <button
              onClick={() => setShowReport(true)}
              className="rounded-xl bg-black px-8 py-3 text-white shadow-md"
            >
              Voir mes résultats
            </button>

            <button
              onClick={() => {
                setAnswers({});
                setHistory([]);
                setScore(null);
                setIsFinished(false);
                setCurrentIndex(0);
              }}
              className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black shadow-md"
            >
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-xl space-y-8 text-black">
      {/* PROGRESS */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-600">
          <span>
            Question {currentQuestionIndex} / {totalQuestions}
          </span>
          <span className="font-semibold text-amber-600">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h3 className="text-center text-xl font-bold">
        🧠 Que fait cette personne ?
      </h3>

      <div className="relative h-[450px] w-full">
        <Image
          src={currentItem.image}
          alt=""
          fill
          className="rounded-xl object-cover"
        />
      </div>

      {isGuidedStep && (
        <div className="mt-4 text-center">
          <p className="mb-1 text-sm text-slate-500">Exemple :</p>
          <p className="text-lg font-semibold text-black">
            {data.items[0].answer}
          </p>
        </div>
      )}

      {!isGuidedStep && (
        <>
          <input
            type="text"
            value={answers[currentItem.id] || ""}
            onChange={(e) => handleChange(e.target.value)}
            disabled={isValidated}
            placeholder="Ex : Il dort."
            className={`
              w-full rounded-xl border-2 px-4 py-3 text-lg text-black outline-none transition
              ${
                !isValidated
                  ? "border-amber-400 bg-slate-50 focus:ring-2 focus:ring-amber-400"
                  : isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
              }
            `}
          />

          {isValidated && (
            <div className="mt-2 text-center text-sm font-medium">
              {isCorrect ? (
                <span className="text-green-600">Correct</span>
              ) : (
                <span className="text-red-500">
                  Réponse : {currentItem.answer}
                </span>
              )}
            </div>
          )}
        </>
      )}

      {/* ACTION */}
      <div className="flex justify-center">
        {!isValidated ? (
          <button
            onClick={() => setIsValidated(true)}
            disabled={!canGoNext}
            className="rounded-xl bg-amber-400 px-8 py-3 font-semibold text-black shadow-md transition hover:scale-105 disabled:opacity-30"
          >
            Vérifier
          </button>
        ) : (
          <button
            onClick={next}
            className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black shadow-md transition hover:scale-105"
          >
            {isLastStep ? "Voir le score" : "Continuer"}
          </button>
        )}
      </div>
    </section>
  );
}
