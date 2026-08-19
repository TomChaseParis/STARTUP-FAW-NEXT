"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import VerbListeningExercise from "./VerbListeningExercise";
import VerbSpeakingExercise from "./VerbSpeakingExercise";

export default function VerbListeningSection() {
  return (
    <ExerciseSection width="wide">
      <InstructionBlock
        level="beginner"
        stampLabel="EXERCICE 1"
        title="Écoute et prononce les verbes"
        subtitle="Être, avoir, faire et aller au présent"
        activityType="click-speak"
        description={
          <div className="space-y-4">
            <p>
              Écoute attentivement les quatre verbes et leurs différentes
              formes au présent.
            </p>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                🎧 Première étape
              </p>

              <p className="text-base leading-relaxed text-slate-700">
                Écoute les conjugaisons de <strong>être</strong>,{" "}
                <strong>avoir</strong>, <strong>faire</strong> et{" "}
                <strong>aller</strong>. Prends le temps d'écouter chaque
                forme attentivement.
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                🎤 Deuxième étape
              </p>

              <p className="text-base leading-relaxed text-slate-700">
                Après l'écoute, tu devras reproduire les formes à l'oral.
                Fais attention à la prononciation et au rythme de chaque
                forme.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                💡 Conseil
              </p>

              <p className="text-base leading-relaxed text-slate-700">
                Écoute plusieurs fois si nécessaire. L'objectif est de
                reconnaître les formes verbales à l'oreille avant de les
                prononcer toi-même.
              </p>
            </div>
          </div>
        }
      />

      <div className="mt-10 space-y-10">
        <section>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-xl">
              🎧
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">
                Partie A
              </p>

              <h2 className="text-xl font-bold text-slate-900">
                Écoute les conjugaisons
              </h2>
            </div>
          </div>

          <VerbListeningExercise />
        </section>

        <section>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-xl">
              🎤
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Partie B
              </p>

              <h2 className="text-xl font-bold text-slate-900">
                À toi de parler
              </h2>
            </div>
          </div>

          <VerbSpeakingExercise />
        </section>
      </div>
    </ExerciseSection>
  );
}