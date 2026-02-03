/* eslint-disable react/no-unescaped-entities */

"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

/* =======================================================================================
   QUIZ ENGINE — COMPOSANT RÉUTILISABLE POUR TOUT LE SITE
   Props : 
    - data : toutes les questions (quizDataX)
    - levelColor : couleur (amber, blue, emerald...) selon le niveau
======================================================================================= */

type Choice = {
  id: string;
  label: string;
  isCorrect: boolean;
  explanationCorrect: string;
  explanationWrong: string;
};

type Question = {
  id: number;
  question: string;
  choices: Choice[];
  image: string;
  correctAudio: string;
  wrongAudio: string;
  wrongAudio2?: string;
};

type QuizEngineProps = {
  data: Question[];
  levelColor?: string;
};



const QuizEngine: React.FC<QuizEngineProps> = ({ data, levelColor = "amber" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (src: string) => {
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.src = src;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const totalQuestions = data.length;
  const currentQuestion = data[currentIndex];
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  /* ========= GESTION DES RÉPONSES ========= */
  const handleSelect = (id: string) => {
    if (showAnswer) return;

    setSelectedChoice(id);
    setShowAnswer(true);

    const selected = currentQuestion.choices.find((c) => c.id === id);

    if (selected?.isCorrect) {
      playAudio(currentQuestion.correctAudio);
      setScore((prev) => prev + 1);
    } else {
      const wrongChoices = currentQuestion.choices.filter((c) => !c.isCorrect);
      const wrongIndex = wrongChoices.findIndex((c) => c.id === id);

      if (wrongIndex === 0) playAudio(currentQuestion.wrongAudio);
      else playAudio(currentQuestion.wrongAudio2 ?? currentQuestion.wrongAudio);
    }

    if (currentIndex === totalQuestions - 1) {
      setTimeout(() => setShowModal(true), 900);
    }
  };

  /* ========= QUESTION SUIVANTE ========= */
  const nextQuestion = () => {
    setSelectedChoice(null);
    setShowAnswer(false);
    setCurrentIndex((i) => i + 1);
  };

  /* ========= AFFICHAGE FINAL ========= */
  if (showResults) {
    return (
      <section className="mt-16 pb-20">
        <div className="container mx-auto max-w-3xl">
          <div className={`rounded-2xl bg-${levelColor}-50 p-10 shadow-lg ring-1 ring-${levelColor}-200`}>
            <h2 className="mb-4 text-3xl font-extrabold text-black">🎉 Résultats de ton exercice</h2>

            <p className="mb-6 text-xl text-black/80">
              Tu as obtenu <strong>{score}</strong> bonnes réponses sur {totalQuestions}.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-black px-6 py-3 text-white hover:bg-black/90"
            >
              Recommencer l'exercice
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* ========= QUIZ ========= */
  return (
    <section className="mt-16 pb-20">
      <div className="container mx-auto max-w-4xl">

        {/* PROGRESS BAR */}
        <div className="mb-6 h-2 w-full rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full bg-${levelColor}-500 transition-all duration-500`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* CARD */}
        <div className={`mx-auto mb-10 max-w-5xl rounded-xl bg-${levelColor}-50 p-8 shadow-sm ring-1 ring-${levelColor}-200`}>
          <h3 className="mb-6 text-xl font-semibold text-black">
            🗣 Question {currentIndex + 1} / {totalQuestions}
          </h3>

          <div className="flex flex-col gap-8 lg:flex-row">

            {/* ZONE TEXTE ET CHOIX */}
            <div className="flex-1">
              <p className="mb-6 text-lg text-black">{currentQuestion.question}</p>

              <div className="space-y-3">
                {currentQuestion.choices.map((choice) => {
                  const isSelected = selectedChoice === choice.id;

                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleSelect(choice.id)}
                      className={`
                        w-full rounded-lg border px-4 py-3 text-left text-black transition
                        ${
                          !showAnswer
                            ? "border-black/20 hover:bg-white"
                            : choice.isCorrect
                            ? "border-green-500 bg-green-100 text-green-800"
                            : isSelected
                            ? "border-red-500 bg-red-100 text-red-800"
                            : "border-black/10"
                        }
                      `}
                    >
                      <strong>{choice.id}. </strong>{choice.label}
                    </button>
                  );
                })}
              </div>

              {/* FEEDBACK */}
              {showAnswer &&
                (() => {
                  const selected = currentQuestion.choices.find((c) => c.id === selectedChoice)!;

                  return (
                    <div className="mt-6 rounded-lg bg-white p-4 ring-1 ring-black/5">
                      {selected.isCorrect ? (
                        <>
                          <p className="mb-2 text-lg font-bold text-green-600">
                            ✔ Bonne réponse !
                          </p>
                          <p className="text-black/80">{selected.explanationCorrect}</p>
                        </>
                      ) : (
                        <>
                          <p className="mb-2 text-lg font-bold text-red-600">
                            ✘ Mauvaise réponse
                          </p>
                          <p className="text-black/80">{selected.explanationWrong}</p>
                        </>
                      )}
                    </div>
                  );
                })()}
            </div>

            {/* IMAGE */}
            <div className="relative w-full lg:w-1/3">
              <div className="relative overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/10 lg:top-0">
                <Image
                  src={currentQuestion.image}
                  alt="Illustration"
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover"
                />
              </div>
            </div>

          </div>

          {/* BOUTON SUIVANT */}
          {showAnswer && currentIndex < totalQuestions - 1 && (
            <div className="mt-8 text-right">
              <button
                onClick={nextQuestion}
                className="rounded-lg bg-black px-6 py-2.5 text-white hover:bg-black/90"
              >
                Question suivante →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODALE FINALE */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <p className={`mb-2 text-sm font-semibold uppercase tracking-wide text-${levelColor}-500`}>
              Résultat final
            </p>
            <p className="text-5xl font-extrabold text-black">
              {Math.round((score / totalQuestions) * 100)}
              <span className="text-2xl text-black/60"> / 100</span>
            </p>

            <button
              onClick={() => {
                setShowModal(false);
                setShowResults(true);
              }}
              className={`mt-6 rounded-lg bg-${levelColor}-500 px-6 py-3 font-semibold text-black hover:bg-${levelColor}-400`}
            >
              Voir mes résultats
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default QuizEngine;
