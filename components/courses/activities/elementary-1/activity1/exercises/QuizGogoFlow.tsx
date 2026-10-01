"use client";

import { useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import ListeningQuizExercise from "./ListeningQuizExercise";
import QuizFranceSection from "./QuizFranceSection";
import TeacherQuestionExercise from "./TeacherQuestionExercise";

type QuizStep =
  | "exercise-1"
  | "quiz-1"
  | "exercise-2"
  | "quiz-2"
  | "exercise-3"
  | "quiz-3"
  | "finished";

export default function QuizGogoFlow() {
  const [currentStep, setCurrentStep] =
    useState<QuizStep>("exercise-1");

  const [exercise1Started, setExercise1Started] =
    useState(false);

  const [exercise2Started, setExercise2Started] =
    useState(false);

  const [exercise3Started, setExercise3Started] =
    useState(false);

  /*
   * =========================================================
   * EXERCICE 1
   * =========================================================
   */

  const handleStartExercise1 = () => {
    setExercise1Started(true);
    setCurrentStep("quiz-1");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById("quiz-gogo-quiz-1")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });
    });
  };

  const handleQuiz1Completed = () => {
    setCurrentStep("exercise-2");
    setExercise2Started(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById("quiz-gogo-exercise-2")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });
    });
  };

  /*
   * =========================================================
   * EXERCICE 2
   * =========================================================
   */

  const handleStartExercise2 = () => {
    setExercise2Started(true);
    setCurrentStep("quiz-2");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById("quiz-gogo-quiz-2")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });
    });
  };

  const handleQuiz2Completed = () => {
    setCurrentStep("exercise-3");
    setExercise3Started(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById("quiz-gogo-exercise-3")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });
    });
  };

  /*
   * =========================================================
   * EXERCICE 3
   * =========================================================
   */

  const handleStartExercise3 = () => {
    setExercise3Started(true);
    setCurrentStep("quiz-3");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById("quiz-gogo-quiz-3")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });
    });
  };

  const handleQuiz3Completed = () => {
    setCurrentStep("finished");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById("quiz-gogo-finished")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });
    });
  };

  return (
    <section className="mt-16 w-full">
      {/* =====================================================
          EXERCICE 1
      ===================================================== */}

      {(currentStep === "exercise-1" ||
        currentStep === "quiz-1") && (
        <section
          id="quiz-gogo-exercise-1"
          className="scroll-mt-8"
        >
          <ExerciseContainer exerciseId="exercise-1">
            {({ onComplete }) => (
              <ExerciseSection>
                <InstructionBlock
                  level="elementary1"
                  stampLabel="EXERCICE 1"
                  title="Quiz panaché"
                  subtitle="Écoute les questions puis choisis la bonne réponse"
                  activityType="listen"
                  description={
                    <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                      {/* ===================================================== */}
                      {/* ÉCOUTE */}
                      {/* ===================================================== */}

                      <div className="flex flex-wrap items-center gap-2">
                        <span>
                          Utilise le bouton pour écouter
                        </span>

                        {/* ICÔNE D'ÉCOUTE */}

                        <span
                          className="
                            inline-flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-amber-600
                            shadow-[0_6px_18px_rgba(15,23,42,0.10)]
                          "
                          aria-hidden="true"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 5L6 9H3v6h3l5 4V5z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13"
                            />
                          </svg>
                        </span>

                        <span>
                          le professeur présenter la question et
                          les réponses proposées.
                        </span>
                      </div>

                      {/* ===================================================== */}
                      {/* MICRO */}
                      {/* ===================================================== */}

                      <div className="flex flex-wrap items-center gap-2">
                        <span>Appuie sur le bouton</span>

                        <button
                          type="button"
                          tabIndex={-1}
                          aria-hidden="true"
                          className="
                            pointer-events-none
                            relative
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-amber-600
                            shadow-[0_6px_18px_rgba(15,23,42,0.10)]
                          "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 18v3m0 0h3m-3 0H9m3-7a4 4 0 004-4V7a4 4 0 10-8 0v3a4 4 0 004 4z"
                            />
                          </svg>
                        </button>

                        <span>
                          si tu préfères répondre à la question à
                          l&apos;oral.
                        </span>
                      </div>

                      {/* ===================================================== */}
                      {/* CONSIGNE ORIGINALE */}
                      {/* ===================================================== */}

                 
                    </div>
                  }
                  onStart={handleStartExercise1}
                  started={exercise1Started}
                />

                {exercise1Started && (
                  <section
                    id="quiz-gogo-quiz-1"
                    className="mt-10 scroll-mt-8"
                  >
                    <ListeningQuizExercise
                      onCompleted={(result) => {
                        onComplete(result);
                        handleQuiz1Completed();
                      }}
                    />
                  </section>
                )}
              </ExerciseSection>
            )}
          </ExerciseContainer>
        </section>
      )}

      {/* =====================================================
          EXERCICE 2
      ===================================================== */}

      {(currentStep === "exercise-2" ||
        currentStep === "quiz-2") && (
        <section
          id="quiz-gogo-exercise-2"
          className="mt-16 scroll-mt-8"
        >
          <ExerciseContainer exerciseId="exercise-2">
            {({ onComplete }) => (
              <ExerciseSection>
                <InstructionBlock
                  level="elementary1"
                  stampLabel="EXERCICE 2"
                  title="Quiz sur la France et les français"
                  subtitle="Teste tes connaissances sur la France et les Français"
                  activityType="listen"
                  description={
                    <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                      {/* ===================================================== */}
                      {/* ÉCOUTE */}
                      {/* ===================================================== */}

                      <div className="flex flex-wrap items-center gap-2">
                        <span>
                          Utilise le bouton pour écouter
                        </span>

                        {/* ICÔNE D'ÉCOUTE */}

                        <span
                          className="
                            inline-flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-amber-600
                            shadow-[0_6px_18px_rgba(15,23,42,0.10)]
                          "
                          aria-hidden="true"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 5L6 9H3v6h3l5 4V5z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13"
                            />
                          </svg>
                        </span>

                        <span>
                          le professeur présenter la question et
                          les réponses proposées.
                        </span>
                      </div>

                      {/* ===================================================== */}
                      {/* MICRO */}
                      {/* ===================================================== */}

                      <div className="flex flex-wrap items-center gap-2">
                        <span>Appuie sur le bouton</span>

                        <button
                          type="button"
                          tabIndex={-1}
                          aria-hidden="true"
                          className="
                            pointer-events-none
                            relative
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-amber-600
                            shadow-[0_6px_18px_rgba(15,23,42,0.10)]
                          "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 18v3m0 0h3m-3 0H9m3-7a4 4 0 004-4V7a4 4 0 10-8 0v3a4 4 0 004 4z"
                            />
                          </svg>
                        </button>

                        <span>
                          si tu préfères répondre à la question à
                          l&apos;oral.
                        </span>
                      </div>

                      {/* ===================================================== */}
                      {/* CONSIGNE ORIGINALE */}
                      {/* ===================================================== */}

                   
                    </div>
                  }
                  onStart={handleStartExercise2}
                  started={exercise2Started}
                />

                {exercise2Started && (
                  <section
                    id="quiz-gogo-quiz-2"
                    className="mt-10 scroll-mt-8"
                  >
                    <QuizFranceSection
                      onCompleted={(result) => {
                        onComplete(result);
                        handleQuiz2Completed();
                      }}
                    />
                  </section>
                )}
              </ExerciseSection>
            )}
          </ExerciseContainer>
        </section>
      )}

      {/* =====================================================
          EXERCICE 3
      ===================================================== */}

      {(currentStep === "exercise-3" ||
        currentStep === "quiz-3") && (
        <section
          id="quiz-gogo-exercise-3"
          className="mt-16 scroll-mt-8"
        >
          <ExerciseSection>
            <InstructionBlock
              level="elementary1"
              stampLabel="EXERCICE 3"
              title="Le professeur je-sais-tout"
              subtitle="Complète la question avec le bon mot interrogatif, puis pose la question à Jean"
              description={
                <p>
                  Complète mentalement la question avec le
                  bon mot interrogatif, puis prononce toute
                  la question au micro. Jean écoutera ta
                  question et te donnera la réponse.
                </p>
              }
              onStart={handleStartExercise3}
              started={exercise3Started}
            />

            {exercise3Started && (
              <section
                id="quiz-gogo-quiz-3"
                className="mt-10 scroll-mt-8"
              >
                <TeacherQuestionExercise
                  onCompleted={() => {
                    handleQuiz3Completed();
                  }}
                />
              </section>
            )}
          </ExerciseSection>
        </section>
      )}

      {/* =====================================================
          FIN
      ===================================================== */}

      {currentStep === "finished" && (
        <section
          id="quiz-gogo-finished"
          className="container mt-16 scroll-mt-8"
        >
          <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-8 text-center shadow-sm">
            <div className="text-5xl">
              🎉
            </div>

            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
              Activité terminée
            </p>

            <h3 className="mt-2 text-3xl font-black text-slate-900">
              Bravo !
            </h3>

            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-600">
              Tu as terminé les trois exercices de cette
              activité.
            </p>
          </div>
        </section>
      )}
    </section>
  );
}