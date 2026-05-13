"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { exercice3Data } from "./exercice3Data";

export default function Exercice3() {
  return (
    <section className="mt-12">
      <InstructionBlock
        stampLabel="EXERCICE 3"
        title="Choisis le bon verbe à la bonne forme pour chacune des phrases proposées"
        activityType="type"
        description={
          <div className="space-y-5 text-black">
            {/* CONSIGNE */}
            <p className="text-base font-medium">
              👉 Complète chaque phrase avec le bon verbe.
            </p>

            {/* VERBES */}
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-600">
                Verbes à utiliser :
              </p>

              <div className="flex flex-wrap gap-3">
                {exercice3Data.verbs?.map((verb) => (
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
                    "
                  >
                    {verb}
                  </span>
                ))}
              </div>
            </div>

            {/* CONSEIL */}
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-base font-semibold text-blue-700">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12c.5.5 1 1.5 1 2h6c0-.5.5-1.5 1-2a7 7 0 00-4-12z"
                    />
                  </svg>
                </span>
                Conseil
              </p>

              <p className="text-base text-blue-900">
                Repère d’abord le sujet (je, tu, il, nous…) puis choisis le bon
                verbe.
              </p>
            </div>

            {/* AIDE CLAVIER */}
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                Selon le pays d&apos;où tu viens et le clavier que tu utilises,
                tu n&apos;as peut-être pas certains accents présents sur ton
                clavier. Tu peux les copier-coller dans la liste ci-dessous, tu
                en auras besoin pour l&apos;exercice qui suit.
              </p>

              <div className="flex flex-wrap gap-2 text-sm">
                {["à", "â", "è", "ê", "é", "ô", "î", "&apos;"].map((p) => (
                  <span
                    key={p}
                    className="
                      rounded-xl border
                      border-amber-200
                      bg-amber-50
                      px-4 py-2
                      text-base
                      font-semibold text-amber-800
                      shadow-sm
                    "
                  >
                    {p === "&apos;" ? "'" : p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <div className="mt-8">
        <FillGapsEngine
          data={exercice3Data}
          teacherImage="/images/courses/teacher/marietalkquestion.png"
        />
      </div>
    </section>
  );
}