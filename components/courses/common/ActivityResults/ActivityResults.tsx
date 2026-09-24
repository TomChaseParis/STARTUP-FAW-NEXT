"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { ActivityResult } from "@/core/activity/models/ActivityResult";

import TeacherFeedback from "@/components/activity/results/TeacherFeedback";
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

type Props = {
  result: ActivityResult;

  onRestart: () => void;

  onNext: () => void;

  isLastExercise?: boolean;

  teacherFeedbackImages?: TeacherFeedbackImages;

  teacherFeedbackAudios?: TeacherFeedbackAudios;

  /**
   * Correction détaillée personnalisée.
   *
   * Exemple :
   * FillGapsReport
   *
   * Si cette prop n'est pas fournie,
   * AnswerHistory est utilisé pour les QCM
   * et les autres exercices classiques.
   */
  detailedReport?: ReactNode;
};

export default function ActivityResults({
  result,
  onRestart,
  onNext,
  isLastExercise = false,
  teacherFeedbackImages,
  teacherFeedbackAudios,
  detailedReport,
}: Props) {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [
    showDetailedReport,
    setShowDetailedReport,
  ] = useState(false);

  /* ========================================================= */
  /* SCROLL                                                    */
  /* ========================================================= */

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!sectionRef.current) {
        return;
      }

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

  const correctAnswers =
    result.session.correctAnswers;

  const totalQuestions =
    result.session.totalQuestions;

  const errorCount = Math.max(
    0,
    totalQuestions - correctAnswers,
  );

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
      {/* ===================================================== */}
      {/* FEEDBACK PROFESSEUR                                   */}
      {/* ===================================================== */}

      <TeacherFeedback
        score={result.session.score}
        teacherFeedbackImages={
          teacherFeedbackImages
        }
        teacherFeedbackAudios={
          teacherFeedbackAudios
        }
      />

      {/* ===================================================== */}
      {/* SCORE                                                 */}
      {/* ===================================================== */}

      <header className="text-center">
        <div className="mt-8 sm:mt-10">
          <ScoreBadge
            score={result.session.score}
          />
        </div>
      </header>

      {/* ===================================================== */}
      {/* STATISTIQUES                                          */}
      {/* ===================================================== */}

      <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
        {/* RÉPONSES CORRECTES */}

        <ResultCard
          icon="✅"
          label="Réponses correctes"
          value={`${correctAnswers} / ${totalQuestions}`}
        />

        {/* TEMPS */}

        <ResultCard
          icon="⏱"
          label="Temps"
          value={`${result.session.duration} s`}
        />

        {/* MEILLEUR SCORE */}

        <ResultCard
          icon="🏆"
          label="Meilleur score"
          value={`${result.bestScore}%`}
        />

        {/* TENTATIVES */}

        <ResultCard
          icon="🔁"
          label="Tentatives"
          value={`${result.attempts}`}
        />
      </section>

      {/* ===================================================== */}
      {/* MESSAGE DE FIN                                       */}
      {/* ===================================================== */}

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
            Bravo ! Tu as terminé tous les
            exercices de cette activité.
          </p>
        </div>
      )}

      {/* ===================================================== */}
      {/* CORRECTION DÉTAILLÉE                                  */}
      {/* ===================================================== */}

      {detailedReport ? (
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
          {/* ================================================= */}
          {/* EN-TÊTE CLIQUABLE                                 */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={() => {
              setShowDetailedReport(
                (previous) =>
                  !previous,
              );
            }}
            aria-expanded={
              showDetailedReport
            }
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
            {/* =============================================== */}
            {/* TEXTE + BADGES                                  */}
            {/* =============================================== */}

            <div className="min-w-0">
              <h3
                className="
                  text-base
                  font-black
                  text-slate-900
                  sm:text-lg
                "
              >
                📝 Correction détaillée
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-slate-600
                  sm:text-sm
                "
              >
                Consulte chaque réponse pour
                comprendre tes erreurs et
                progresser.
              </p>

              {/* ============================================= */}
              {/* BADGES                                        */}
              {/* ============================================= */}

              <div className="mt-3 flex flex-wrap gap-2">
                {/* BONNES RÉPONSES */}

                <span
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-emerald-100
                    px-2.5
                    py-1
                    text-[11px]
                    font-semibold
                    text-emerald-700
                    sm:text-xs
                  "
                >
                  <span className="mr-1">
                    ✅
                  </span>

                  {correctAnswers} bonne
                  {correctAnswers > 1
                    ? "s"
                    : ""}{" "}
                  réponse
                  {correctAnswers > 1
                    ? "s"
                    : ""}
                </span>

                {/* ERREURS */}

                <span
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-red-100
                    px-2.5
                    py-1
                    text-[11px]
                    font-semibold
                    text-red-700
                    sm:text-xs
                  "
                >
                  <span className="mr-1">
                    ❌
                  </span>

                  {errorCount} erreur
                  {errorCount > 1
                    ? "s"
                    : ""}
                </span>

                {/* TOTAL */}

                <span
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-slate-200
                    px-2.5
                    py-1
                    text-[11px]
                    font-semibold
                    text-slate-600
                    sm:text-xs
                  "
                >
                  <span className="mr-1">
                    📝
                  </span>

                  {totalQuestions} question
                  {totalQuestions > 1
                    ? "s"
                    : ""}
                </span>
              </div>
            </div>

            {/* =============================================== */}
            {/* FLÈCHE                                          */}
            {/* =============================================== */}

            <span
              className={`
                mt-1
                shrink-0
                text-2xl
                leading-none
                text-slate-400
                transition-transform
                duration-300
                ${
                  showDetailedReport
                    ? "rotate-180"
                    : ""
                }
              `}
              aria-hidden="true"
            >
              ▼
            </span>
          </button>

          {/* ================================================= */}
          {/* CONTENU DE LA CORRECTION                         */}
          {/* ================================================= */}

          {showDetailedReport && (
            <div
              className="
                border-t
                border-slate-200
                bg-white
                p-4
                sm:p-6
                md:p-8
              "
            >
              {detailedReport}
            </div>
          )}
        </div>
      ) : (
        /* =================================================== */
        /* HISTORIQUE NORMAL — QCM / EXERCICES CLASSIQUES      */
        /* =================================================== */

        <AnswerHistory
          history={result.session.history}
        />
      )}

      {/* ===================================================== */}
      {/* BOUTONS PRINCIPAUX                                   */}
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
        {/* ================================================= */}
        {/* RECOMMENCER                                       */}
        {/* ================================================= */}

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

        {/* ================================================= */}
        {/* EXERCICE SUIVANT                                  */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={onNext}
          className="
            w-full
            rounded-xl
            bg-amber-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-amber-600
            sm:w-auto
            sm:px-8
          "
        >
          {isLastExercise
            ? "Terminer l'activité"
            : "Exercice suivant →"}
        </button>
      </div>
    </section>
  );
}