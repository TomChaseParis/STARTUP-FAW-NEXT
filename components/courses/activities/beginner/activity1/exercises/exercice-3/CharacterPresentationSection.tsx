"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ActivityResults from "@/components/courses/common/ActivityResults";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import type { ActivityResult } from "@/core/activity/models/ActivityResult";

import CharacterPresentationExercise from "./CharacterPresentationExercise";

const exampleSentences = [
  {
    prompt: "Avoir vingt ans",
    spoken: "J’ai vingt ans.",
    start: 0,
    end: 0.76,
    
  },
  {
    prompt: "Être jeune",
    spoken: "Je suis jeune.",
    start: 2.25,
    end: 3.15,
  },
  {
    prompt: "Aller à l’université",
    spoken: "Je vais à l’université.",
    start: 4.61,
    end: 6.15,
  },
  {
    prompt: "Être étudiant",
    spoken: "Je suis étudiant.",
    start: 7.76,
    end: 8.92,
  },
  {
    prompt: "Faire des études",
    spoken: "Je fais des études.",
    start: 10.45,
    end: 11.59,
  },
  {
    prompt: "Avoir des lunettes",
    spoken: "J’ai des lunettes.",
    start: 13.15,
    end: 13.97,
  },
  {
    prompt: "Être un nerd",
    spoken: "Je suis un nerd.",
    start: 15.7,
    end: 16.84,
  },
  {
    prompt:
      "Avoir un seul ami : mon professeur de chimie.",
    spoken: (
      <>
        J’ai un seul ami : mon professeur
        <br />
        de chimie.
      </>
    ),
    start: 18.49,
    end: 21.94,
  },
];

type CharacterPresentationSectionProps = {
  onComplete?: (result: ActivityResult) => void;
};

export default function CharacterPresentationSection({
  onComplete,
}: CharacterPresentationSectionProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlayingExample, setIsPlayingExample] =
    useState(false);

  const [hasStartedExample, setHasStartedExample] =
    useState(false);

  const [
    currentExampleSentenceIndex,
    setCurrentExampleSentenceIndex,
  ] = useState(0);

  /*
   * =========================================================
   * ÉTAPE DU PARCOURS
   *
   * 1 = instruction
   * 2 = exemple
   * 3 = exercice
   * =========================================================
   */

  const [exerciseStep, setExerciseStep] =
    useState<1 | 2 | 3>(1);

  /*
   * =========================================================
   * RÉSULTAT
   * =========================================================
   */

  const [result, setResult] =
    useState<ActivityResult | null>(null);

  /*
   * =========================================================
   * CLÉ DE L'EXERCICE
   *
   * Permet de recréer complètement
   * CharacterPresentationExercise
   * lorsqu'on clique sur "Recommencer".
   * =========================================================
   */

  const [exerciseKey, setExerciseKey] =
    useState(0);

  /*
   * =========================================================
   * DÉBUT DE L'EXERCICE
   * =========================================================
   */

  const handleStartExercise = () => {
    setExerciseStep(2);

    requestAnimationFrame(() => {
      document
        .getElementById(
          "character-presentation-example",
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };

  /*
   * =========================================================
   * DÉBUT DU VRAI EXERCICE
   * =========================================================
   */

  const handleStartRealExercise = () => {
    /*
     * Si l'exemple est encore en train de jouer,
     * on l'arrête avant de commencer le vrai exercice.
     */

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setIsPlayingExample(false);
    setHasStartedExample(false);

    setExerciseStep(3);

    requestAnimationFrame(() => {
      setTimeout(() => {
        document
          .getElementById(
            "character-presentation-exercise",
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 50);
    });
  };

  /*
   * =========================================================
   * AUDIO EXEMPLE
   * =========================================================
   */

  const handlePlayExample = () => {
    /*
     * Si l'audio existe déjà et est en pause,
     * on reprend exactement où il était.
     */

    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlayingExample(true);
          })
          .catch(() => {
            setIsPlayingExample(false);
          });
      } else {
        audioRef.current.pause();
        setIsPlayingExample(false);
      }

      return;
    }

    /*
     * Première lecture.
     */

    const audio = new Audio(
      "/audios/courses/beginner/activity1/exercice4/exempleaudio.mp3",
    );

    audioRef.current = audio;

    setCurrentExampleSentenceIndex(0);
    setHasStartedExample(true);
    setIsPlayingExample(true);

    audio.ontimeupdate = () => {
      const currentTime = audio.currentTime;

      const sentenceIndex =
        exampleSentences.findIndex(
          (sentence) =>
            currentTime >= sentence.start &&
            currentTime < sentence.end,
        );

      if (sentenceIndex !== -1) {
        setCurrentExampleSentenceIndex(
          sentenceIndex,
        );
      }
    };

    audio.onended = () => {
      setIsPlayingExample(false);
      setHasStartedExample(false);

      setCurrentExampleSentenceIndex(
        exampleSentences.length - 1,
      );

      audioRef.current = null;
    };

    audio.onerror = () => {
      setIsPlayingExample(false);
      setHasStartedExample(false);
      audioRef.current = null;
    };

    audio.play().catch(() => {
      setIsPlayingExample(false);
      setHasStartedExample(false);
      audioRef.current = null;
    });
  };

  /*
   * =========================================================
   * EXERCICE TERMINÉ
   * =========================================================
   */

  const handleExerciseComplete = (
    exerciseResult: ActivityResult,
    handleContainerComplete: (
      sessionResult: ActivityResult["session"],
    ) => void,
  ) => {
    setResult(exerciseResult);

    handleContainerComplete(
      exerciseResult.session,
    );

    onComplete?.(exerciseResult);
  };

  /*
   * =========================================================
   * RECOMMENCER
   * =========================================================
   */

  const handleRestart = () => {
    /*
     * Arrêt de l'audio exemple si nécessaire.
     */

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setIsPlayingExample(false);
    setHasStartedExample(false);

    /*
     * Suppression du résultat.
     */

    setResult(null);

    /*
     * Nouvelle instance complète
     * de CharacterPresentationExercise.
     */

    setExerciseKey(
      (previous) => previous + 1,
    );

    /*
     * Retour direct au vrai exercice.
     */

    setExerciseStep(3);

    requestAnimationFrame(() => {
      setTimeout(() => {
        document
          .getElementById(
            "character-presentation-exercise",
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    });
  };

  /*
   * =========================================================
   * PHRASE EXEMPLE ACTUELLE
   * =========================================================
   */

  const currentExampleSentence =
    exampleSentences[
      currentExampleSentenceIndex
    ];

  /*
   * =========================================================
   * AFFICHAGE
   * =========================================================
   */

  return (
    <ExerciseContainer
      key={exerciseKey}
      exerciseId="exercise-3"
    >
      {({ onComplete }) => {
        /*
         * =====================================================
         * RÉSULTAT FINAL
         * =====================================================
         */

        if (result) {
          return (
            <ActivityResults
              result={result}
              onRestart={handleRestart}
              onNext={() => {
                /*
                 * L&apos;exercice 3 est actuellement
                 * le dernier exercice de cette activité.
                 *
                 * On ne force donc aucune navigation.
                 */
              }}
              isLastExercise={true}
              detailedReport={
                <section className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      Détail des réponses
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Voici le détail de tes réponses
                      phrase par phrase.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {result.session.history.map(
                      (item, index) => (
                        <div
                          key={item.questionId}
                          className={`
                            overflow-hidden
                            rounded-2xl
                            border
                            ${
                              item.isCorrect
                                ? "border-green-200 bg-green-50/60"
                                : "border-red-200 bg-red-50/60"
                            }
                          `}
                        >
                          {/* HEADER */}

                          <div className="flex items-center justify-between gap-4 border-b border-slate-200/70 bg-white/70 px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`
                                  flex
                                  h-9
                                  w-9
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  text-sm
                                  font-black
                                  ${
                                    item.isCorrect
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }
                                `}
                              >
                                {index + 1}
                              </div>

                              <div>
                                <p className="text-sm font-bold text-slate-900">
                                  Phrase{" "}
                                  {index + 1}
                                </p>

                                <p className="text-xs text-slate-500">
                                  {item.question}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`
                                rounded-full
                                px-3
                                py-1
                                text-xs
                                font-bold
                                ${
                                  item.isCorrect
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }
                              `}
                            >
                              {item.isCorrect
                                ? "✓ Correct"
                                : "✕ Incorrect"}
                            </span>
                          </div>

                          {/* CONTENU */}

                          <div className="space-y-4 px-5 py-5">
                            {/* RÉPONSE PRONONCÉE */}

                            <div>
                              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                                Ta réponse
                              </p>

                              <p
                                className={`
                                  text-base
                                  font-bold
                                  ${
                                    item.isCorrect
                                      ? "text-green-700"
                                      : "text-red-600"
                                  }
                                `}
                              >
                                {item.selectedAnswer ||
                                  "Aucune réponse"}
                              </p>
                            </div>

                            {/* CORRECTION */}

                            <div className="rounded-xl border border-green-200 bg-white px-4 py-3">
                              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-green-600">
                                Réponse attendue
                              </p>

                              <p className="font-extrabold text-green-700">
                                {item.correctAnswer}
                              </p>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </section>
              }
            />
          );
        }

        /*
         * =====================================================
         * ACTIVITÉ
         * =====================================================
         */

        return (
          <ExerciseSection width="wide">
            {/* =================================================
                ÉTAPE 1 — INSTRUCTION
            ================================================== */}

            <div id="character-presentation-instruction">
              <InstructionBlock
                level="beginner"
                stampLabel="EXERCICE 3"
                title="Présente les personnages"
                subtitle="Parle à voix haute en utilisant le bon pronom"
                activityType="click-speak"
                description={
                  <div className="space-y-5 text-black">
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                      <p className="mb-2 text-sm font-medium text-slate-600">
                        ⚠️ Consigne
                      </p>

                      <p>
                        Présente chaque personnage en
                        conjuguant les verbes à la bonne
                        forme.
                      </p>
                    </div>

                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                      <p className="mb-2 text-sm font-medium text-slate-600">
                        👤 Pronoms
                      </p>

                      <p>
                        JE • TU • IL • ELLE • NOUS • VOUS •
                        ILS
                      </p>
                    </div>
                  </div>
                }
              />

              {exerciseStep === 1 && (
                <div className="mt-8 flex justify-center px-4">
                  <button
                    type="button"
                    onClick={handleStartExercise}
                    className="
                      rounded-2xl
                      bg-slate-900
                      px-8
                      py-4
                      text-sm
                      font-bold
                      text-white
                      shadow-lg
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:bg-slate-800
                      hover:shadow-xl
                    "
                  >
                    COMMENCER L&apos;EXERCICE →
                  </button>
                </div>
              )}
            </div>

            {/* =================================================
                ÉTAPE 2 — EXEMPLE
            ================================================== */}

            {exerciseStep >= 2 && (
              <div
                id="character-presentation-example"
                className="mx-auto mt-12 max-w-5xl px-4"
              >
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-500">
                    EXEMPLE
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Observe comment transformer chaque
                    expression avec le bon pronom.
                  </p>
                </div>

                <div
                  className="
                    relative grid h-auto
                    overflow-hidden rounded-2xl bg-white shadow-lg
                    ring-1 ring-black/5
                    md:h-[450px]
                    md:grid-cols-[1.15fr_1fr]
                  "
                >
                  <div className="relative h-[220px] w-full md:h-full">
                    <Image
                      src="/images/courses/beginner/activities/activity1/exercice4/p1.png"
                      alt="Exemple de personnage"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative flex flex-col bg-slate-50 p-8">
                    <div className="flex h-full w-full flex-col items-center justify-center">
                      <div className="mb-6 w-full text-center">
                        <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                          Pronom
                        </p>

                        <h2 className="text-5xl font-extrabold tracking-wide text-slate-900">
                          JE
                        </h2>

                        <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#E09F00]" />
                      </div>

                      <div
                        className="
                          mb-7 flex min-h-[120px] w-full
                          flex-col items-center justify-center
                          rounded-2xl border-2 border-amber-200
                          bg-white px-5 py-5 text-center
                          shadow-sm
                        "
                      >
                        <p
                          key={`prompt-${currentExampleSentenceIndex}`}
                          className="
                            text-2xl font-extrabold
                            leading-tight text-slate-900
                          "
                        >
                          {
                            currentExampleSentence.prompt
                          }
                        </p>

                        <div
                          key={`spoken-${currentExampleSentenceIndex}`}
                          className="
                            mt-3
                            flex
                            items-center
                            justify-center
                            gap-2
                          "
                        >
                          <span
                            className="
                              text-xl
                              font-extrabold
                              text-green-500
                            "
                            aria-hidden="true"
                          >
                            →
                          </span>

                          <p
                            className="
                              text-lg
                              font-bold
                              leading-tight
                              text-green-600
                            "
                          >
                            {
                              currentExampleSentence.spoken
                            }
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handlePlayExample}
                        className={`
                          flex items-center gap-2
                          rounded-xl
                          px-6 py-3
                          text-sm font-bold
                          shadow-md
                          transition-all duration-200
                          ${
                            isPlayingExample
                              ? "scale-105 bg-green-500 text-white"
                              : "bg-black text-white hover:bg-green-600"
                          }
                        `}
                      >
                        <span aria-hidden="true">
                          {isPlayingExample
                            ? "Ⅱ"
                            : "▶"}
                        </span>

                        {isPlayingExample
                          ? "PAUSE"
                          : hasStartedExample
                            ? "REPRENDRE"
                            : "ÉCOUTER"}
                      </button>

                      <p className="mt-3 text-xs font-medium text-slate-400">
                        {isPlayingExample
                          ? "Tu peux mettre l’écoute en pause à tout moment."
                          : hasStartedExample
                            ? "L’écoute reprendra là où tu l’as arrêtée."
                            : "Écoute attentivement chaque phrase."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bouton vers le vrai exercice */}

                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={handleStartRealExercise}
                    className="
                      rounded-2xl
                      bg-slate-900
                      px-8
                      py-4
                      text-sm
                      font-bold
                      text-white
                      shadow-lg
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:bg-slate-800
                      hover:shadow-xl
                    "
                  >
                    COMMENCER L&apos;EXERCICE →
                  </button>
                </div>
              </div>
            )}

            {/* =================================================
                ÉTAPE 3 — VRAI EXERCICE
            ================================================== */}

            {exerciseStep === 3 && (
              <CharacterPresentationExercise
                onComplete={(exerciseResult) => {
                  handleExerciseComplete(
                    exerciseResult,
                    onComplete,
                  );
                }}
              />
            )}
          </ExerciseSection>
        );
      }}
    </ExerciseContainer>
  );
}