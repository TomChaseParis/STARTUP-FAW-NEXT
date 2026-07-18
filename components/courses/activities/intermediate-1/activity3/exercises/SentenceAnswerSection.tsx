"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import SentenceAnswerExercise from "./SentenceAnswerExercise";

export default function SentenceAnswerSection() {
  return (
    <ExerciseSection>
      <InstructionBlock
        stampLabel="EXERCICE 1"
        title="TU AS VU CE FANTÔME ?"
        activityType="click-or-speak"
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
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-amber-300
                    to-yellow-400
                    shadow-[0_10px_20px_rgba(245,158,11,0.25)]
                  "
                >
                  👻
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                    Consigne
                  </p>

                  <p className="text-sm text-slate-500">
                    Réponds avec une phrase complète.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-slate-800">
              <p>
  {"Réponds aux questions d'Étienne en utilisant le "}
  <strong>bon pronom complément</strong>.
</p>
                <p>
                  Ta réponse doit être une
                  <strong> phrase complète</strong>, à la forme
                  <strong> affirmative</strong> ou
                  <strong> négative</strong>, selon la question.
                </p>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="font-semibold text-slate-700">
                    💡 Exemple
                  </p>

                  <div className="mt-3 space-y-2">
                    <p>
                      <strong>Question :</strong> Tu as vu cette voiture ?
                    </p>

                    <p className="text-green-700">
  <strong>Réponse :</strong> {"Oui, je l'ai vue."}
</p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-semibold text-slate-700">
  {"🎤 Tu peux également répondre à l'oral."}
</p>

                  <p className="mt-2">
                    Si le microphone est disponible, tu pourras choisir entre
                    écrire ta réponse ou la prononcer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <SentenceAnswerExercise />
    </ExerciseSection>
  );
}