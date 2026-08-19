"use client";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import VerbSelectionSection from "../VerbSelectionSection";
import VerbListeningSection from "./VerbListeningSection";


export default function VerbConjugationSection() {
  return (
    <ExerciseSection width="wide">
      <InstructionBlock
        level="beginner"
        stampLabel="EXERCICE 1"
        title="Conjugue les verbes « ÊTRE », « AVOIR », « FAIRE » et « ALLER »"
        activityType="click-speak"
        description={
          <div className="space-y-5 text-black">
            <p>
              Complète chaque phrase avec le bon verbe :
              <strong> être, avoir, faire ou aller</strong>.
            </p>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                💡 Conseil
              </p>

              <p className="text-base">
                Fais attention au sujet pour choisir la bonne conjugaison.
              </p>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                ⚠️ Important
              </p>

              <ul className="list-disc space-y-1 pl-5 text-base">
                <li>Lis la phrase en entier avant de répondre.</li>
                <li>
                  Exemple :<strong>{" « Ils n'ont pas d'argent. »"}</strong>
                </li>
              </ul>
            </div>
          </div>
        }
      />
    </ExerciseSection>
  );
}
