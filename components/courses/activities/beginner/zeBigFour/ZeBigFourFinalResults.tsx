"use client";

import {
  useEffect,
  useMemo,
  useRef,
} from "react";

import TeacherFeedback from "@/components/activity/results/TeacherFeedback";
import ResultCard from "@/components/courses/common/ActivityResults/ResultCard";
import ScoreBadge from "@/components/courses/common/ActivityResults/ScoreBadge";

type VerbScore = {
  score: number;
  totalQuestions: number;
};

type VerbKey =
  | "etre"
  | "avoir"
  | "faire"
  | "aller";

type Props = {
  scores: Partial<
    Record<VerbKey, VerbScore>
  >;
  onRestart: () => void;
  onNext: () => void;
};

const verbLabels: Record<
  VerbKey,
  string
> = {
  etre: "ÊTRE",
  avoir: "AVOIR",
  faire: "FAIRE",
  aller: "ALLER",
};

export default function BigFourFinalResults({
  scores,
  onRestart,
  onNext,
}: Props) {
  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!sectionRef.current) {
        return;
      }

      const y =
        sectionRef.current.getBoundingClientRect()
          .top +
        window.scrollY -
        100;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    });
  }, []);

  const totalQuestions = useMemo(() => {
    return Object.values(scores).reduce(
      (total, result) =>
        total +
        (result?.totalQuestions ?? 0),
      0,
    );
  }, [scores]);

  const totalPoints = useMemo(() => {
    return Object.values(scores).reduce(
      (total, result) => {
        if (!result) {
          return total;
        }

        return (
          total +
          result.score *
            result.totalQuestions
        );
      },
      0,
    );
  }, [scores]);

  const finalScore =
    totalQuestions > 0
      ? Math.round(
          totalPoints /
            totalQuestions,
        )
      : 0;

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
      {/* =====================================================
          FEEDBACK PROFESSEUR
      ====================================================== */}

      <TeacherFeedback
        score={finalScore}
      />

      {/* =====================================================
          SCORE FINAL
      ====================================================== */}

      <header className="text-center">
        <div className="mt-8 sm:mt-10">
          <ScoreBadge score={finalScore} />
        </div>
      </header>

      {/* =====================================================
          STATISTIQUES
      ====================================================== */}

      <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
        <ResultCard
          icon="🏆"
          label="Score final"
          value={`${finalScore}%`}
        />

        <ResultCard
          icon="📝"
          label="Questions"
          value={`${totalQuestions}`}
        />
      </section>

      {/* =====================================================
          RÉCAPITULATIF DES 4 VERBES
      ====================================================== */}

      <section className="mt-8 sm:mt-10">
        <h3 className="mb-5 text-xl font-black text-slate-900">
          Récapitulatif
        </h3>

        <div className="space-y-3">
          {(
            [
              "etre",
              "avoir",
              "faire",
              "aller",
            ] as VerbKey[]
          ).map((verb) => {
            const result =
              scores[verb];

            if (!result) {
              return null;
            }

            return (
              <div
                key={verb}
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50/70
                  px-5
                  py-4
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-amber-100
                      text-lg
                    "
                  >
                    ✓
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      {verbLabels[verb]}
                    </p>

                    <p className="text-xs text-slate-500">
                      {
                        result.totalQuestions
                      }{" "}
                      questions
                    </p>
                  </div>
                </div>

                <p className="text-xl font-black text-slate-900">
                  {result.score}%
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          ACTIONS
      ====================================================== */}

      <div className="mt-8 border-t border-slate-100 pt-8 sm:mt-10 sm:pt-10">
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* RECOMMENCER */}

          <button
            type="button"
            onClick={onRestart}
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              px-6
              py-4
              text-sm
              font-bold
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            Recommencer
          </button>

          {/* EXERCICE SUIVANT */}

          <button
            type="button"
            onClick={onNext}
            className="
              w-full
              rounded-2xl
              bg-[#E09F00]
              px-6
              py-4
              text-sm
              font-bold
              text-white
              transition
              hover:-translate-y-0.5
              hover:bg-[#C98D00]
            "
          >
            Exercice suivant →
          </button>
        </div>
      </div>
    </section>
  );
}