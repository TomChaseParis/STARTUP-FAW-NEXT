"use client";

import { useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import FillGapsQuiz from "@/components/courses/activities/fill-gaps/FillGapsQuiz";

import { conjugationExerciseData } from "../../../activity2/data/conjugationExerciseData";

import VerbSelectionExercise from "../VerbSelectionExercise";

import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type VerbEssentialStep = "conjugation" | "selection";

const mergeResults = (
  first: ExerciseSessionResult,
  second: ExerciseSessionResult,
): ExerciseSessionResult => {
  const totalQuestions = first.totalQuestions + second.totalQuestions;

  const correctAnswers = first.correctAnswers + second.correctAnswers;

  const score =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  return {
    score,
    correctAnswers,
    totalQuestions,
    startedAt: first.startedAt,
    finishedAt: second.finishedAt,
    duration: first.duration + second.duration,
    history: [...first.history, ...second.history],
  };
};

export default function VerbEssentialSection() {
  const [step, setStep] = useState<VerbEssentialStep>("conjugation");

  const [firstResult, setFirstResult] = useState<ExerciseSessionResult | null>(
    null,
  );

  return (
    <ExerciseContainer exerciseId="exercise-1">
      {({ onComplete }) => (
        <ExerciseSection>
          {/* ===================================================== */}
          {/* INSTRUCTION GÉNÉRALE */}
          {/* ===================================================== */}

          <InstructionBlock
            level="beginner"
            stampLabel="EXERCICE 1"
            title="Les verbes essentiels"
            subtitle="Être, avoir, faire et aller"
            activityType="click-speak"
            description={
              <div className="space-y-4">
                <p>
                  Dans cet exercice, tu vas travailler les quatre verbes
                  essentiels :<strong> être</strong>, <strong>avoir</strong>,{" "}
                  <strong>faire</strong> et <strong>aller</strong>.
                </p>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="mb-2 text-sm font-medium text-slate-600">
                    💡 Conseil
                  </p>

                  <p className="text-base">
                    Fais attention au sujet pour choisir la bonne forme du
                    verbe.
                  </p>
                </div>

                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="mb-2 text-sm font-medium text-slate-600">
                    ⚠️ Important
                  </p>

                  <ul className="list-disc space-y-1 pl-5 text-base">
                    <li>Lis toujours la phrase en entier avant de répondre.</li>

                    <li>
                      Repère d'abord le sujet : je, tu, il, elle, nous, vous,
                      ils ou elles.
                    </li>

                    <li>
                      Exemple :<strong>{" « Ils n'ont pas d'argent. »"}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            }
          />

          {/* ===================================================== */}
          {/* ÉTAPE 1 — CONJUGAISON */}
          {/* ===================================================== */}

          {step === "conjugation" && (
            <div className="mt-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                  1
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    Étape 1
                  </p>

                  <h3 className="text-xl font-bold text-slate-900">
                    Conjugue les verbes
                  </h3>
                </div>
              </div>

              <FillGapsQuiz
                data={conjugationExerciseData}
                onComplete={(result) => {
                  setFirstResult(result);
                  setStep("selection");
                }}
              />
            </div>
          )}

          {/* ===================================================== */}
          {/* ÉTAPE 2 — SÉLECTION */}
          {/* ===================================================== */}

          {step === "selection" && firstResult && (
            <div className="mt-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">
                  2
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    Étape 2
                  </p>

                  <h3 className="text-xl font-bold text-slate-900">
                    Choisis le bon verbe
                  </h3>
                </div>
              </div>

              <VerbSelectionExercise
                onComplete={(result) => {
                  const finalResult = mergeResults(firstResult, result);

                  onComplete(finalResult);
                }}
              />
            </div>
          )}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}
