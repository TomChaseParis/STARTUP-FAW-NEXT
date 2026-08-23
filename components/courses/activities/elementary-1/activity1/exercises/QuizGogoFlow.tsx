"use client";

import { useState } from "react";

import ActivityResults from "@/components/courses/common/ActivityResults/ActivityResults";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

// import ExerciseContainer from "@/components/activity/ExerciseContainer";
// import ListeningQuizExercise from "./ListeningQuizExercise";
// import QuizFranceSection from "./QuizFranceSection";

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
  /*
   * =========================================================
   * ÉTAPE COURANTE
   * =========================================================
   */

  const [currentStep, setCurrentStep] =
    useState<QuizStep>("exercise-3");

  /*
   * =========================================================
   * EXERCICE 3
   * =========================================================
   */

  const [exercise3Started, setExercise3Started] =
    useState(false);

  /*
   * =========================================================
   * RÉSULTATS DES EXERCICES
   * =========================================================
   *
   * Pour le moment, seul l'exercice 3 est actif.
   *
   * Lorsque les exercices 1 et 2 seront réactivés,
   * leurs résultats pourront être ajoutés ici.
   */

  const [exerciseResults, setExerciseResults] =
    useState<ExerciseSessionResult[]>([]);

  /*
   * =========================================================
   * DÉMARRER L'EXERCICE 3
   * =========================================================
   */

  const handleStartExercise3 = () => {
    setExercise3Started(true);
    setCurrentStep("quiz-3");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById(
            "quiz-gogo-quiz-3",
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });
    });
  };

  /*
   * =========================================================
   * EXERCICE 3 TERMINÉ
   * =========================================================
   */

  const handleQuiz3Completed = (
    result: ExerciseSessionResult,
  ) => {
    const updatedResults = [
      ...exerciseResults,
      result,
    ];

    setExerciseResults(
      updatedResults,
    );

    setCurrentStep("finished");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById(
            "quiz-gogo-finished",
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });
    });
  };

  /*
   * =========================================================
   * RÉSULTAT GLOBAL
   * =========================================================
   */

  const buildGlobalResult =
    (): ExerciseSessionResult => {
      const allHistory =
        exerciseResults.flatMap(
          (result) =>
            result.history,
        );

      const correctAnswers =
        exerciseResults.reduce(
          (total, result) =>
            total +
            result.correctAnswers,
          0,
        );

      const totalQuestions =
        exerciseResults.reduce(
          (total, result) =>
            total +
            result.totalQuestions,
          0,
        );

      const score =
        totalQuestions > 0
          ? Math.round(
              (correctAnswers /
                totalQuestions) *
                100,
            )
          : 0;

      const startedAt =
        exerciseResults.length > 0
          ? exerciseResults.reduce(
              (
                earliest,
                result,
              ) =>
                result.startedAt <
                earliest
                  ? result.startedAt
                  : earliest,
              exerciseResults[0]
                .startedAt,
            )
          : new Date();

      const finishedAt =
        exerciseResults.length > 0
          ? exerciseResults.reduce(
              (
                latest,
                result,
              ) => {
                if (
                  !result.finishedAt
                ) {
                  return latest;
                }

                if (
                  !latest ||
                  result.finishedAt >
                    latest
                ) {
                  return result.finishedAt;
                }

                return latest;
              },
              null as Date | null,
            )
          : null;

      const duration =
        exerciseResults.reduce(
          (total, result) =>
            total +
            result.duration,
          0,
        );

      return {
        score,

        correctAnswers,

        totalQuestions,

        history: allHistory,

        startedAt,

        finishedAt,

        duration,
      };
    };

  /*
   * =========================================================
   * RÉSULTAT FINAL
   * =========================================================
   */

  const globalResult =
    currentStep === "finished"
      ? buildGlobalResult()
      : null;

  return (
    <section className="mt-16 w-full">
      {/* =====================================================
          EXERCICE 1 — DÉSACTIVÉ TEMPORAIREMENT
      ===================================================== */}

      {/*
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
                    <p>
                      Écoute chaque question à l&apos;aide du
                      bouton audio, observe l&apos;image lorsqu&apos;il
                      y en a une, puis sélectionne la réponse
                      correcte parmi les propositions.
                    </p>
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

                        handleQuiz1Completed(
                          result,
                        );
                      }}
                    />
                  </section>
                )}
              </ExerciseSection>
            )}
          </ExerciseContainer>
        </section>
      )}
      */}

      {/* =====================================================
          EXERCICE 2 — DÉSACTIVÉ TEMPORAIREMENT
      ===================================================== */}

      {/*
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
                    <p>
                      Écoute attentivement chaque question,
                      observe l&apos;image et sélectionne la
                      bonne réponse parmi les propositions.
                    </p>
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

                        handleQuiz2Completed(
                          result,
                        );
                      }}
                    />
                  </section>
                )}
              </ExerciseSection>
            )}
          </ExerciseContainer>
        </section>
      )}
      */}

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
              activityType="speak"
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
                  onCompleted={
                    handleQuiz3Completed
                  }
                />
              </section>
            )}
          </ExerciseSection>
        </section>
      )}

      {/* =====================================================
          RÉSULTAT FINAL
      ===================================================== */}

      {currentStep === "finished" &&
        globalResult && (
          <section
            id="quiz-gogo-finished"
            className="container mt-16 scroll-mt-8"
          >
            <ActivityResults
              result={{
                session:
                  globalResult,

                bestScore:
                  globalResult.score,

                attempts: 1,
              }}
              teacherFeedbackImages={{
                bad:
                  "/images/courses/teacher/bulles/bad.png",

                middle:
                  "/images/courses/teacher/bulles/middle.png",

                good:
                  "/images/courses/teacher/bulles/good.png",
              }}
              teacherFeedbackAudios={{
                bad:
                  "/audios/teacher/jean/score/JEAN-DOWN.mp3",

                middle:
                  "/audios/teacher/jean/score/JEAN-MIDDLE.mp3",

                good:
                  "/audios/teacher/jean/score/JEAN-100.mp3",
              }}
            />
          </section>
        )}
    </section>
  );
}