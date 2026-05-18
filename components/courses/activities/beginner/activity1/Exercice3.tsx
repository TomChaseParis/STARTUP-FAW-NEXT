"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { exercice3Data } from "./exercice3Data";
import AccentHelper from "@/components/courses/blocks/AccentHelper";

export default function Exercice3() {
  return (
    <section className="mt-12">
      {/* ================= INSTRUCTION ================= */}
      <InstructionBlock
  stampLabel="EXERCICE 3"
  title="Choisis le bon verbe à la bonne forme pour chacune des phrases proposées"
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
           Complète chaque phrase avec le bon verbe.
        </p>
          {/* VERBES */}
      <div>
        <p className="mb-3 text-sm pt-4 font-semibold text-slate-600">
          Verbes à utiliser :
        </p>

        <div className="flex flex-wrap gap-3">
          {exercice3Data.verbs?.map((verb) => (
            <span
              key={verb}
              className="
                rounded-2xl border
                border-amber-200
                bg-gradient-to-br from-amber-50 to-white
                px-5 py-3
                text-base
                font-semibold text-amber-800
                shadow-sm
              "
            >
              {verb}
            </span>
          ))}
        </div>
      </div>

      </div>

    
      {/* CONSEIL */}
    {/* CONSEIL */}
<div
  className="
    rounded-2xl
    border border-blue-200
    bg-gradient-to-br from-blue-50 via-white to-blue-50
    p-5
    shadow-sm
  "
>
  <div className="mb-4 flex items-center gap-4">
    <div
      className="
        flex h-12 w-12 shrink-0 items-center justify-center
        rounded-2xl
        bg-gradient-to-br from-blue-400 to-cyan-500
        shadow-[0_10px_20px_rgba(59,130,246,0.25)]
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
          d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12c.5.5 1 1.5 1 2h6c0-.5.5-1.5 1-2a7 7 0 00-4-12z"
        />
      </svg>
    </div>

    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
        Conseil
      </p>

      <p className="text-sm text-slate-500">
        Astuce pour éviter les erreurs
      </p>
    </div>
  </div>

  <p className="text-base leading-relaxed text-slate-800">
    Repère d’abord le sujet (je, tu, il, nous…) puis choisis le bon
    verbe.
  </p>
</div>

<AccentHelper />

   
    </div>
  }
/>
      {/* ================= ENGINE ================= */}
      <div className="mt-8">
        <FillGapsEngine
          data={exercice3Data}
          teacherImage="/images/courses/teacher/marietalkquestion.png"
        />
      </div>
    </section>
  );
}
