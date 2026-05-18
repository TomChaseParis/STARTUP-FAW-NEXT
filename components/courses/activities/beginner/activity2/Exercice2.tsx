"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { episode2Data } from "./episode2Data";
import AccentHelper from "@/components/courses/blocks/AccentHelper";

export default function Exercice2() {
  return (
    <section className="mt-12">
      <InstructionBlock
        stampLabel="EXERCICE 3"
        title="CONJUGAISON"
        activityType="type"
        description={
          <div className="space-y-5 text-black">
            {/* CONSIGNE */}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 3h6v4H9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 16h4"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                    Consigne
                  </p>

                  <p className="text-sm text-slate-500">
                    Suis les instructions avant de commencer
                  </p>
                </div>
              </div>

              <p className="text-base leading-relaxed text-slate-800">
                Ecoute à nouveau le dialogue et complète le dialogue avec les
                verbes « être » et « avoir » à la bonne forme.
              </p>
            </div>

            {/* AIDE CLAVIER */}
            <AccentHelper />
          </div>
        }
      />

      <div className="mt-8">
        <FillGapsEngine data={episode2Data} />
      </div>
    </section>
  );
}