"use client";

import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import { episode1Data } from "./episode1Data";

export default function Exercice() {
  return (
    <section className="mt-12">
      <InstructionBlock
        title={episode1Data.title}
        activityType="type"
        description={
          <div className="space-y-5 text-black">
            <p>
              Complète le texte avec les verbes au bon temps et à la bonne
              personne.
            </p>

            <div>
              <p className="mb-3 text-sm font-medium text-slate-600">
                Verbes à utiliser :
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "Travailler (présent)",
                  "Décider (passé composé)",
                  "Demander (présent)",
                  "Savoir (présent)",
                  "Trouver (passé composé)",
                  "Pouvoir (futur)",
                  "Rentrer (présent)",
                  "Avoir (futur)",
                ].map((verb) => (
                  <span
                    key={verb}
                    className="
                      rounded-xl border
                      border-amber-200
                      bg-amber-50
                      px-4 py-2
                      text-base
                      font-semibold text-amber-800
                      shadow-sm
                      transition-all duration-200
                      hover:bg-amber-100 hover:shadow-md
                    "
                  >
                    {verb}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                💡 Astuce :
              </p>
              <p className="text-base">
                Regarde les indices dans la phrase (temps, contexte, sujet) pour
                choisir la bonne conjugaison.
              </p>
            </div>
          </div>
        }
      />

      <div className="mt-8">
        <FillGapsEngine
          data={episode1Data}
          teacherImage="/images/courses/teacher/irenetalkquestion.png"
        />
      </div>
    </section>
  );
}
