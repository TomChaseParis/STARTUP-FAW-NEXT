"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getScoreLevel } from "@/utils/quizScoring";

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
    totalQuestions > 0
      ? (currentQuestionIndex / totalQuestions) * 100
      : 0;

  const handleChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentItem.id]: value,
    }));
  };

  const currentAnswer = (answers[currentItem.id] || "").trim();
  const isValidAnswer = currentAnswer.length >= 5;
  const canGoNext = isGuidedStep || isValidAnswer;

  const next = () => {
    if (!canGoNext) return;
    if (!isLastStep) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
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

    const finalScore = Math.round(
      (correct / realItems.length) * 100
    );

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
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {" "}
                      {h.user || "—"}
                    </span>
                  </p>

                  {!h.isCorrect && (
                    <p className="text-green-700 font-semibold">
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
    <section className="max-w-xl mx-auto space-y-8 text-black">

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-600">
          <span>
            Question {currentQuestionIndex} / {totalQuestions}
          </span>
          <span className="font-semibold text-amber-600">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl font-bold text-center">
        🧠 Que fait cette personne ?
      </h3>

      <div className="relative w-full h-[450px]">
        <Image
          src={currentItem.image}
          alt=""
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {isGuidedStep && (
        <div className="mt-4 text-center">
          <p className="text-sm text-slate-500 mb-1">
            Exemple :
          </p>
          <p className="text-lg font-semibold text-black">
            {data.items[0].answer}
          </p>
        </div>
      )}

      {!isGuidedStep && (
        <input
          type="text"
          value={answers[currentItem.id] || ""}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Ex : Il dort."
          className="w-full border-2 border-amber-400 rounded-xl px-4 py-3 text-lg text-black bg-slate-50 focus:ring-2 focus:ring-amber-400 outline-none"
        />
      )}

      <div className="flex justify-center">

        {!isLastStep ? (
          <button
            onClick={next}
            disabled={!canGoNext}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all disabled:opacity-30"
          >
            {isGuidedStep ? "✨ Commencer" : "Suivant →"}
          </button>
        ) : (
          <button
            onClick={checkAnswers}
            disabled={!canGoNext}
            className="px-6 py-2 rounded-xl bg-amber-500 text-black font-semibold disabled:opacity-30"
          >
            Valider
          </button>
        )}

      </div>
    </section>
  );
}