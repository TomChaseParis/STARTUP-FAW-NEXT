
"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { ActivityResult } from "@/core/activity/models/ActivityResult";

import type { ExerciseHistoryItem } from "@/components/courses/common/types/exerciseSessionTypes";

import BeginnerTeacherFeedback from "@/components/activity/results/TeacherFeedback";
import Elementary1TeacherFeedback from "@/components/activity/results/elementary-1/TeacherFeedback";
import TeacherFeedbackIntermediate1 from "@/components/activity/results/intermediate-1/TeacherFeedback";
import TeacherFeedbackIntermediate2 from "@/components/activity/results/intermediate-2/TeacherFeedback";

import AnswerHistory from "./AnswerHistory";
import ResultCard from "./ResultCard";
import ScoreBadge from "./ScoreBadge";

type TeacherFeedbackImages = {
  bad: string;
  middle: string;
  good: string;
  perfect?: string;
};

type TeacherFeedbackAudios = {
  bad: string;
  middle: string;
  good: string;
  perfect?: string;
};

type CompletionFeedback = {
  bad: string;
  middle: string;
  good: string;
  perfect: string;
};

type Teacher =
  | "beginner"
  | "elementary-1"
  | "elementary-1-activity-2"
  | "intermediate-1"
  | "intermediate-2";

type Props = {
  result: ActivityResult;
  onRestart: () => void;
  onNext: () => void;
  isLastExercise?: boolean;
  finishLabel?: string;
  teacherFeedbackImages?: TeacherFeedbackImages;
  teacherFeedbackAudios?: TeacherFeedbackAudios;
  completionFeedback?: CompletionFeedback;
  teacher?: Teacher;
  feedbackVariant?: "activity" | "lesson";
  detailedReport?: ReactNode;
  showAnswerHistory?: boolean;
};

/* ========================================================= */
/* CORRECTION DU DIALOGUE                                    */
/* ========================================================= */

function DialogueCorrection({
  history,
}: {
  history: ExerciseHistoryItem[];
}) {
  const dialogueRows = history.filter((item) =>
    item.question.startsWith("[[DIALOGUE]]"),
  );

  if (dialogueRows.length === 0) return null;

  const answerRows = new Map(
    history
      .filter((item) => item.questionId > 0)
      .map((item) => [item.questionId, item]),
  );

  return (
    <div className="space-y-4">
      {dialogueRows.map((item, index) => {
        const text = item.question.replace("[[DIALOGUE]]", "");

        const speakerSeparator = text.indexOf(":");

        const speaker =
          speakerSeparator >= 0
            ? text.slice(0, speakerSeparator).trim()
            : "";

        const dialogueText =
          speakerSeparator >= 0
            ? text.slice(speakerSeparator + 1)
            : text;

        const parts = dialogueText.split(
          /\[\[ANSWER:(\d+)\]\]/g,
        );

        return (
          <div
            key={`${speaker}-${index}`}
            className="rounded-xl border border-slate-200 bg-[#fcfcfd] p-4 sm:p-5"
          >
            <p className="break-words leading-8 text-slate-800">
              <span className="font-bold text-[#102744]">
                {speaker} :
              </span>

              {parts.map((part, partIndex) => {
                // Texte normal du dialogue.
                if (partIndex % 2 === 0) {
                  return (
                    <span key={partIndex}>
                      {part}
                    </span>
                  );
                }

                // Réponse correspondant au champ à compléter.
                const answer = answerRows.get(Number(part));

                if (!answer) return null;

                return (
                  <span
                    key={partIndex}
                    className="mx-1 inline-flex flex-wrap items-center gap-1"
                  >
                    {answer.isCorrect ? (
                      <span className="rounded-md border border-emerald-200 bg-emerald-100 px-2 py-0.5 font-bold text-emerald-800">
                        {answer.selectedAnswer}
                      </span>
                    ) : (
                      <>
                        <span className="rounded-md border border-red-200 bg-red-100 px-2 py-0.5 font-semibold text-red-800 line-through decoration-2">
                          {answer.selectedAnswer || "Aucune réponse"}
                        </span>

                        <span className="rounded-md border border-emerald-200 bg-emerald-100 px-2 py-0.5 font-bold text-emerald-800">
                          {answer.correctAnswer}
                        </span>
                      </>
                    )}
                  </span>
                );
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ========================================================= */
/* COMPOSANT PRINCIPAL                                       */
/* ========================================================= */

export default function ActivityResults({
  result,
  onRestart,
  onNext,
  isLastExercise = false,
  finishLabel = "Terminer l'activité",
  teacherFeedbackImages,
  teacherFeedbackAudios,
  completionFeedback,
  teacher = "beginner",
  feedbackVariant = "activity",
  detailedReport,
  showAnswerHistory = true,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  const [showDetailedReport, setShowDetailedReport] =
    useState(false);

  /* ========================================================= */
  /* SCROLL                                                    */
  /* ========================================================= */

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!sectionRef.current) return;

      const y =
        sectionRef.current.getBoundingClientRect().top +
        window.scrollY -
        100;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    });
  }, []);

  /* ========================================================= */
  /* STATISTIQUES                                              */
  /* ========================================================= */

  const correctAnswers = result.session.correctAnswers;
  const totalQuestions = result.session.totalQuestions;

  const errorCount = Math.max(
    0,
    totalQuestions - correctAnswers,
  );

  /* ========================================================= */
  /* DÉTECTION DU DIALOGUE                                     */
  /* ========================================================= */

  const isDialogueExercise = result.session.history.some(
    (item) => item.question.startsWith("[[DIALOGUE]]"),
  );

  /* ========================================================= */
  /* SÉLECTION DU PROFESSEUR                                   */
  /* ========================================================= */

  const TeacherFeedback =
    teacher === "intermediate-2"
      ? TeacherFeedbackIntermediate2
      : teacher === "intermediate-1"
        ? TeacherFeedbackIntermediate1
        : teacher === "elementary-1" ||
            teacher === "elementary-1-activity-2"
          ? Elementary1TeacherFeedback
          : BeginnerTeacherFeedback;

  const teacherFeedbackProps =
    teacher === "elementary-1" ||
    teacher === "elementary-1-activity-2"
      ? {
          score: result.session.score,
          completionFeedback,
          teacherFeedbackAudios,
        }
      : {
          score: result.session.score,
          teacherFeedbackImages,
          teacherFeedbackAudios,
        };

  /* ========================================================= */
  /* COULEUR DU BOUTON                                         */
  /* ========================================================= */

  const nextButtonColor =
    teacher === "intermediate-2"
      ? "bg-[#7C3AED] hover:bg-[#6D28D9]"
      : teacher === "intermediate-1"
        ? "bg-[rgb(56,189,248)] hover:bg-[rgb(14,165,233)]"
        : teacher === "elementary-1" ||
            teacher === "elementary-1-activity-2"
          ? "bg-[rgb(87,204,153)] hover:bg-[rgb(70,185,135)]"
          : "bg-amber-500 hover:bg-amber-600";

  return (
    <section
      ref={sectionRef}
      className="
        scroll-mt-10
        mx-3
        mt-10
        max-w-5xl
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        sm:mx-4
        sm:mt-14
        sm:p-6
        md:mx-auto
        md:mt-20
        md:p-12
      "
    >
      {/* FEEDBACK PROFESSEUR */}

      <TeacherFeedback
        {...teacherFeedbackProps}
        variant={feedbackVariant}
      />

      {/* SCORE */}

      <header className="text-center">
        <div className="mt-8 sm:mt-10">
          <ScoreBadge score={result.session.score} />
        </div>
      </header>

      {/* STATISTIQUES GLOBALES */}

      <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
        <ResultCard
          icon="✅"
          label="Réponses correctes"
          value={`${correctAnswers} / ${totalQuestions}`}
        />

        <ResultCard
          icon="⏱"
          label="Temps"
          value={`${result.session.duration} s`}
        />

        <ResultCard
          icon="🏆"
          label="Meilleur score"
          value={`${result.bestScore}%`}
        />

        <ResultCard
          icon="🔁"
          label="Tentatives"
          value={`${result.attempts}`}
        />
      </section>

      {/* MESSAGE DE FIN */}

      {isLastExercise && (
        <div
          className="
            mt-8
            rounded-2xl
            border
            border-emerald-200
            bg-emerald-50
            px-5
            py-4
            text-center
            sm:mt-10
          "
        >
          <p className="text-base font-bold text-emerald-800">
            🎉 Activité terminée !
          </p>

          <p className="mt-1 text-sm text-emerald-700">
            Bravo ! Tu as terminé tous les exercices de cette activité.
          </p>
        </div>
      )}

      {/* ===================================================== */}
      {/* CORRECTION DÉTAILLÉE                                  */}
      {/* ===================================================== */}

      {(detailedReport || isDialogueExercise) && (
        <div
          className="
            mt-8
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-slate-100
            sm:mt-10
          "
        >
          {/* BOUTON D'OUVERTURE */}

          <button
            type="button"
            onClick={() => {
              setShowDetailedReport((previous) => !previous);
            }}
            aria-expanded={showDetailedReport}
            className="
              flex
              w-full
              items-start
              justify-between
              gap-4
              px-4
              py-4
              text-left
              transition-colors
              hover:bg-slate-200/60
              sm:px-5
              sm:py-5
            "
          >
            <div className="min-w-0">
              <h3 className="text-base font-black text-slate-900 sm:text-lg">
                📝 Correction détaillée
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                Consulte les corrections pour comprendre tes erreurs et progresser.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 sm:text-xs">
                  <span className="mr-1">✅</span>
                  {correctAnswers} bonne
                  {correctAnswers > 1 ? "s" : ""} réponse
                  {correctAnswers > 1 ? "s" : ""}
                </span>

                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-semibold text-red-700 sm:text-xs">
                  <span className="mr-1">❌</span>
                  {errorCount} erreur
                  {errorCount > 1 ? "s" : ""}
                </span>

                <span className="inline-flex items-center rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-600 sm:text-xs">
                  <span className="mr-1">📝</span>
                  {totalQuestions} question
                  {totalQuestions > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <span
              className={`
                mt-1
                shrink-0
                text-2xl
                leading-none
                text-slate-400
                transition-transform
                duration-300
                ${showDetailedReport ? "rotate-180" : ""}
              `}
              aria-hidden="true"
            >
              ▼
            </span>
          </button>

          {/* CONTENU AFFICHÉ AU CLIC */}

          {showDetailedReport && (
            <div className="space-y-8 border-t border-slate-200 bg-white p-4 sm:p-6 md:p-8">

              {/* ANCIENNE CORRECTION PERSONNALISÉE */}

              {detailedReport && (
                <div>
                  {detailedReport}
                </div>
              )}

              {/* CORRECTION DU DIALOGUE */}

              {isDialogueExercise && (
                <div>
                  <div className="mb-5 border-b border-slate-200 pb-4">
                    <h4 className="text-lg font-extrabold text-[#102744]">
                      Correction du dialogue
                    </h4>

                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      Voici le dialogue complet avec tes réponses et les corrections.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        ✓ Bonne réponse
                      </span>

                      <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        ✕ Ta réponse
                      </span>
                    </div>
                  </div>

                  <DialogueCorrection
                    history={result.session.history}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* HISTORIQUE CLASSIQUE POUR LES AUTRES EXERCICES */}

      {!detailedReport &&
        !isDialogueExercise &&
        showAnswerHistory && (
          <AnswerHistory history={result.session.history} />
        )}

      {/* ===================================================== */}
      {/* BOUTONS PRINCIPAUX                                    */}
      {/* ===================================================== */}

      <div
        className="
          mt-8
          flex
          flex-col
          gap-3
          sm:mt-14
          sm:flex-row
          sm:justify-center
          sm:gap-5
        "
      >
        <button
          type="button"
          onClick={onRestart}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-6
            py-3
            font-semibold
            text-slate-700
            transition
            hover:bg-slate-100
            sm:w-auto
            sm:px-8
          "
        >
          Recommencer
        </button>

        <button
          type="button"
          onClick={onNext}
          className={`
            w-full
            rounded-xl
            px-6
            py-3
            font-semibold
            text-white
            transition
            sm:w-auto
            sm:px-8
            ${nextButtonColor}
          `}
        >
          {isLastExercise ? finishLabel : "Exercice suivant →"}
        </button>
      </div>
    </section>
  );
}
