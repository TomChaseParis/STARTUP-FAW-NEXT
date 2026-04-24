"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getScoreLevel } from "@/utils/quizScoring";

type Item = {
  id: number;
  image: string;
  before: string;
  after: string;
  answer: string;
};

type Result = {
  id: number;
  user: string;
  correct: string;
  isCorrect: boolean;
};

type Props = {
  data: {
    items: Item[];
  };
  teacherImage?: string;
};

const normalize = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default function ImageWordInputSlider({
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

  const currentItem = data.items[currentIndex];

  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        setIsTeacherAnnouncingScore(true);
      }, 800);
    }
  }, [isFinished]);

  const handleChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentItem.id]: value,
    }));
  };

  const userAnswer = answers[currentItem.id] || "";

  const isCorrect =
    normalize(userAnswer) === normalize(currentItem.answer);

  const hasStarted = userAnswer.trim().length >= 5;

  const progress =
    ((currentIndex + 1) / data.items.length) * 100;

  const next = () => {
    if (!isValidated) return;

    if (currentIndex < data.items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsValidated(false);
    } else {
      checkAnswers();
    }
  };

  const checkAnswers = () => {
    const results: Result[] = [];
    let correct = 0;

    data.items.forEach((item) => {
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
      (correct / data.items.length) * 100
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
                onClick={() => window.location.reload()}
                className="rounded-xl bg-amber-400 px-8 py-3 font-semibold text-black shadow-md hover:bg-amber-300 transition"
              >
                Recommencer
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-slate-50 py-24 text-slate-900 text-center">

        {isTeacherAnnouncingScore && (
          <div className="mb-10 flex flex-col items-center">
            <div className="relative h-28 w-28 animate-pulse rounded-full overflow-hidden ring-4 ring-amber-400 shadow-xl">
              <Image
                src={teacherImage}
                alt=""
                width={112}
                height={112}
              />
            </div>

            <div className="mt-6 bg-amber-100 px-6 py-4 rounded-2xl shadow">
              <p className="text-lg font-semibold">
                Ton score est de {score} / 100
              </p>

              <p className="text-sm mt-1">
                {correctCount} bonnes réponses sur {data.items.length}
              </p>

              <p className="mt-2 font-semibold text-amber-700">
                Niveau : {getScoreLevel(score!)}
              </p>
            </div>
          </div>
        )}

        <p className="text-6xl font-extrabold">{score}</p>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => setShowReport(true)}
            className="px-8 py-4 text-lg font-semibold rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition"
          >
            Voir mes réponses
          </button>

          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 text-lg font-semibold rounded-xl bg-amber-400 text-black shadow-md hover:bg-amber-300 transition"
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl space-y-8 text-black">

      {/* PROGRESS */}
      <div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>
            Question {currentIndex + 1} / {data.items.length}
          </span>
          <span className="font-semibold text-amber-600">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="mt-2 h-2 rounded-full bg-slate-200">
          <div
            className="h-full bg-amber-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* CARD */}
      <div className="rounded-2xl bg-white shadow-xl overflow-hidden max-w-5xl mx-auto">

        <div className="flex justify-center bg-slate-50 p-8">
          <Image
            src={currentItem.image}
            alt=""
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        <div className="p-8 space-y-6">
          <div className="text-center text-lg">
            {currentItem.before}

            <input
              type="text"
              value={userAnswer}
              onChange={(e) => handleChange(e.target.value)}
              disabled={isValidated}
              placeholder="Écris ta réponse..."
              className={`
                mx-3 min-w-[260px] rounded-xl border-2 px-4 py-2 text-center font-semibold transition
                ${
                  !isValidated
                    ? "border-slate-300 bg-slate-50"
                    : isCorrect
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-red-500 bg-red-50 text-red-700"
                }
              `}
            />

            {currentItem.after}
          </div>

          {isValidated && (
            <div className="text-center text-sm font-medium">
              {isCorrect ? (
                <span className="text-green-600">Correct</span>
              ) : (
                <span className="text-red-500">
                  Réponse : {currentItem.answer}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ACTION */}
      <div className="flex justify-center">
        {!isValidated ? (
          <button
            onClick={() => setIsValidated(true)}
            disabled={!hasStarted}
            className="px-10 py-4 text-lg font-semibold rounded-xl bg-amber-400 text-black shadow-md hover:bg-amber-300 transition disabled:opacity-30"
          >
            Vérifier ma réponse
          </button>
        ) : (
          <button
            onClick={next}
            className="px-10 py-4 text-lg font-semibold rounded-xl bg-amber-500 text-black shadow-md hover:bg-amber-400 transition"
          >
            {currentIndex === data.items.length - 1
              ? "Voir le score"
              : "Continuer"}
          </button>
        )}
      </div>

    </section>
  );
}