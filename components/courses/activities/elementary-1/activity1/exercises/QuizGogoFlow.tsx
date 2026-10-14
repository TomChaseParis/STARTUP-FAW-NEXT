"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  | "quiz-3";
export default function QuizGogoFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<QuizStep>("exercise-1");
  const [exercise1Started, setExercise1Started] = useState(false);
  const [exercise2Started, setExercise2Started] = useState(false);
  const [exercise3Started, setExercise3Started] = useState(false);
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
        document.getElementById("quiz-gogo-quiz-1")?.scrollIntoView({
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
        document.getElementById("quiz-gogo-exercise-2")?.scrollIntoView({
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
        document.getElementById("quiz-gogo-quiz-2")?.scrollIntoView({
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
        document.getElementById("quiz-gogo-exercise-3")?.scrollIntoView({
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
        document.getElementById("quiz-gogo-quiz-3")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  };
  const handleQuiz3Completed = () => {
    router.push("/courses/elementary-1/modules/questions-francais");
  };
  return (
    <section className="mt-16 w-full">
      {/* =====================================================
          EXERCICE 1
      \\===================================================== */}
      {(currentStep === "exercise-1" || currentStep === "quiz-1") && (
        <section id="quiz-gogo-exercise-1" className="scroll-mt-8">
          <ExerciseContainer exerciseId="exercise-1">
            {({ onComplete }) => (
              <ExerciseSection>
                <InstructionBlock
                  level="elementary1"
                  stampLabel="EXERCICE 1"
                  typeLabel="Outils de la langue"
                  title="Quiz panaché"
                  activityType="click-or-speak"
                  subtitle="Teste tes connaissances en choisissant la bonne réponse pour chaque question."
                  description={
                    <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                      {/* ===================================================== */}
                      {/* ÉCOUTE */}
                      {/* ===================================================== */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span>Utilise le bouton</span>

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
        text-amber-500
        shadow-[0_6px_18px_rgba(15,23,42,0.10)]
      "
                          aria-hidden="true"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M8 5.5a1 1 0 0 1 1.5-.86l9 6a1.6 1.6 0 0 1 0 2.72l-9 6A1 1 0 0 1 8 18.5z" />
                          </svg>
                        </span>

                        <span>
                          pour écouter le professeur présenter la question et
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
                          si tu préfères répondre à la question à l&apos;oral.
                        </span>
                      </div>

                      <div>
                        Il peut y avoir quelques secondes de latence entre ta
                        réponse et sa validation. Sois patient !
                      </div>
                    </div>
                  }
                  onStart={handleStartExercise1}
                  started={exercise1Started}
                />
                {exercise1Started && (
                  <section id="quiz-gogo-quiz-1" className="mt-10 scroll-mt-8">
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
      \\===================================================== */}
      {(currentStep === "exercise-2" || currentStep === "quiz-2") && (
        <section id="quiz-gogo-exercise-2" className="mt-16 scroll-mt-8">
          <ExerciseContainer exerciseId="exercise-2">
            {({ onComplete }) => (
              <ExerciseSection>
                <InstructionBlock
                  level="elementary1"
                  stampLabel="EXERCICE 2"
                  typeLabel="Outils de la langue"
                  title="Quiz sur la France et les français"
                  subtitle="Teste tes connaissances sur la France et les Français"
                  activityType="click-or-speak"
                  description={
                  <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
  {/* ===================================================== */}
  {/* ÉCOUTE */}
  {/* ===================================================== */}
  <div className="flex flex-wrap items-center gap-2">
    <span>Utilise le bouton</span>

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
        text-amber-500
        shadow-[0_6px_18px_rgba(15,23,42,0.10)]
      "
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M8 5.5a1 1 0 0 1 1.5-.86l9 6a1.6 1.6 0 0 1 0 2.72l-9 6A1 1 0 0 1 8 18.5z" />
      </svg>
    </span>

    <span>
      pour écouter le professeur présenter la question et les réponses proposées.
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
      si tu préfères répondre à la question à l&apos;oral.
    </span>
  </div>

  <div>
    Il peut y avoir quelques secondes de latence entre ta
    réponse et sa validation. Sois patient !
  </div>
</div>
                  }
                  onStart={handleStartExercise2}
                  started={exercise2Started}
                />
                {exercise2Started && (
                  <section id="quiz-gogo-quiz-2" className="mt-10 scroll-mt-8">
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
      \\===================================================== */}
   {(currentStep === "exercise-3" || currentStep === "quiz-3") && (
  <section
    id="quiz-gogo-exercise-3"
    className="mt-16 scroll-mt-8"
  >
    <ExerciseSection>
      <InstructionBlock
        level="elementary1"
        stampLabel="EXERCICE 3"
        typeLabel="Outils de la langue"
        title="Le professeur je-sais-tout"
        activityType="listen-and-speak"
        subtitle="Complète la question avec le bon mot interrogatif, puis pose la question à Jean"
        description={
          <div
          className="
          flex
          flex-col
          items-center
          gap-4
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-4
          sm:flex-row
          sm:items-center
          sm:gap-5
          sm:px-5
          sm:py-4
        "
          >
            {/* POINT D'ATTENTION À GAUCHE */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-center
              "
            >
              <img
                src="/images/courses/beginner/activities/brunogalopin/point.png"
                alt="Point d'attention"
                className="
                  h-20
                  w-20
                  object-contain
                  sm:h-24
                  sm:w-24
                "
              />
            </div>

            {/* LISTE À PUCES À DROITE */}

            <ul
              className="
                min-w-0
                flex-1
                list-disc
                space-y-2
                pl-5
                text-sm
                leading-relaxed
                text-slate-800
                sm:text-base
              "
            >
              <li>
                Jean ne te répondra que si tu poses la bonne question
                en choisissant le bon mot interrogatif. Tu as droit à
                3 essais !
              </li>

              <li>
                Aide-toi de la liste des mots interrogatifs qui t&apos;est proposée.
              </li>

              <li>
                Attention à ta prononciation ! Sinon, Jean ne te comprendra pas...
              </li>
            </ul>
          </div>
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
    </section>
  );
}
