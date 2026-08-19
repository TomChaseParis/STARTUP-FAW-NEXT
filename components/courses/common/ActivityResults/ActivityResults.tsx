"use client";

import { useEffect, useRef } from "react";

import { ActivityResult } from "@/core/activity/models/ActivityResult";
import TeacherFeedback from "@/components/activity/results/TeacherFeedback";
import AnswerHistory from "./AnswerHistory";
import ResultCard from "./ResultCard";
import ScoreBadge from "./ScoreBadge";

type Props = {
  result: ActivityResult;

  onRestart: () => void;

  onNext: () => void;
};

export default function ActivityResults({
  result,
  onRestart,
  onNext,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!sectionRef.current) return;
  
      const y =
        sectionRef.current.getBoundingClientRect().top +
        window.scrollY -
        100; // Remonte de 80 px
  
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
      className="scroll-mt-10 mx-auto mt-20 max-w-5xl rounded-3xl border border-slate-200 bg-white p-12 shadow-sm"
    >
            <TeacherFeedback score={result.session.score} />

      <header className="text-center">
  

 
        <div className="mt-10">
          <ScoreBadge score={result.session.score} />
        </div>
      </header>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
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

      <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-xl font-bold text-slate-900">
          📚 Analyse de la tentative
        </h3>

        <p className="mt-2 leading-relaxed text-slate-600">
          Tu as répondu correctement à{" "}
          <strong>{result.session.correctAnswers}</strong>{" "}
          question
          {result.session.correctAnswers > 1 ? "s" : ""} sur{" "}
          <strong>{result.session.totalQuestions}</strong>.

          {mistakes === 0
            ? " Excellent travail ! Tu n'as commis aucune erreur."
            : ` Il reste ${mistakes} erreur${
                mistakes > 1 ? "s" : ""
              } à comprendre. Consulte la correction détaillée ci-dessous avant de recommencer.`}
        </p>
      </section>


      <AnswerHistory history={result.session.history} />

      <div className="mt-14 flex justify-center gap-5">
        <button
          onClick={onRestart}
          className="rounded-xl border border-slate-300 px-8 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Recommencer
        </button>

        <button
          onClick={onNext}
          className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-white transition hover:bg-amber-600"
        >
          Exercice suivant →
        </button>
      </div>
    </section>
  );
}