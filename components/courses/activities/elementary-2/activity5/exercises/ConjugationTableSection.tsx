"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ConjugationTableExercise from "./ConjugationTableExercise";

export default function ConjugationTableSection() {
  return (
    <ExerciseSection width="full">
      <InstructionBlock
        stampLabel="EXERCICE 1"
        title="CONJUGAISON"
        activityType="type"
        description={
          <div className="space-y-5 text-black">
            <div
              className="
                rounded-2xl
                border border-amber-200
                bg-gradient-to-br from-amber-50 via-white to-amber-50
                p-5
                shadow-sm
              "
            >
              {/* HEADER */}

              <div className="mb-4 flex items-center gap-4">
                <div
                  className="
                    flex h-12 w-12 shrink-0 items-center justify-center
                    rounded-2xl
                    bg-gradient-to-br from-amber-300 to-yellow-400
                    shadow-[0_10px_20px_rgba(245,158,11,0.25)]
                  "
                >
                  ✍️
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                    Consigne
                  </p>

                  <p className="text-sm text-slate-500">
                    Lis attentivement avant de commencer.
                  </p>
                </div>
              </div>

              <p className="text-base leading-relaxed text-slate-800">
                Fifi est une petite souris adorable qui fait la fierté de ses
                parents. Complète chaque ligne du tableau en réécrivant les
                verbes au <strong>passé composé</strong>, au{" "}
                <strong>présent</strong> ou au{" "}
                <strong>futur proche</strong>, selon les cases à compléter.
              </p>

              <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="font-semibold text-blue-800">
                  💡 Conseil
                </p>

                <p className="mt-2 text-sm text-blue-700">
                  Certaines lignes comportent une seule réponse à écrire,
                  d'autres en comportent deux. Observe attentivement les trois
                  colonnes avant de commencer.
                </p>
              </div>
            </div>
          </div>
        }
      />

      <ConjugationTableExercise />
    </ExerciseSection>
  );
}