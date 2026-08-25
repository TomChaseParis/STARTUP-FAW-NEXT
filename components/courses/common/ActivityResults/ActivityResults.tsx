"use client";

import { useEffect, useRef } from "react";

import { ActivityResult } from "@/core/activity/models/ActivityResult";
import TeacherFeedback from "@/components/activity/results/TeacherFeedback";
import AnswerHistory from "./AnswerHistory";
import ResultCard from "./ResultCard";
import ScoreBadge from "./ScoreBadge";

type TeacherFeedbackImages = {
  bad: string;
  middle: string;
  good: string;
};

type TeacherFeedbackAudios = {
  bad: string;
  middle: string;
  good: string;
};

type Props = {
  result: ActivityResult;

  onRestart: () => void;

  onNext: () => void;

  teacherFeedbackImages?: TeacherFeedbackImages;

  teacherFeedbackAudios?: TeacherFeedbackAudios;
};

export default function ActivityResults({
  result,
  onRestart,
  onNext,
  teacherFeedbackImages,
  teacherFeedbackAudios,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

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

  const mistakes =
    result.session.totalQuestions -
    result.session.correctAnswers;

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
      <TeacherFeedback
        score={result.session.score}
        teacherFeedbackImages={teacherFeedbackImages}
        teacherFeedbackAudios={teacherFeedbackAudios}
      />

      <header className="text-center">
        <div className="mt-8 sm:mt-10">
          <ScoreBadge score={result.session.score} />
        </div>
      </header>

      <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
        <ResultCard
          icon="✅"
          label="Réponses correctes"
          value={`${result.session.correctAnswers} / ${result.session.totalQuestions}`}
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

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:mt-12 sm:p-6">
        <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
          📚 Analyse de la tentative
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          Tu as répondu correctement à{" "}
          <strong>
            {result.session.correctAnswers}
          </strong>{" "}
          question
          {result.session.correctAnswers > 1
            ? "s"
            : ""}{" "}
          sur{" "}
          <strong>
            {result.session.totalQuestions}
          </strong>
          .

          {mistakes === 0
            ? " Excellent travail ! Tu n'as commis aucune erreur."
            : ` Il reste ${mistakes} erreur${
                mistakes > 1 ? "s" : ""
              } à comprendre. Consulte la correction détaillée ci-dessous avant de recommencer.`}
        </p>
      </section>

      <AnswerHistory
        history={result.session.history}
      />

      <div className="mt-8 flex flex-col gap-3 sm:mt-14 sm:flex-row sm:justify-center sm:gap-5">
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
          Exercice suivant →
        </button>
      </div>
    </section>
  );
}