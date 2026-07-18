"use client";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import PhraseRecorder from "../blocks/PhraseRecorder";

type Highlight = {
  text: string;
  tip: string;
};

type Props = {
  title: string;
  instruction: string;
  text: string[];
  highlight: Highlight[];
};

const PronunciationEngine: React.FC<Props> = ({
  title,
  instruction,
  text,
  highlight,
}) => {
  return (
    <section className="mt-12 bg-white pb-20">
      {/* ================= CONSIGNE ================= */}

      <InstructionBlock title={title} description={instruction} />

      <div className="container mx-auto max-w-5xl space-y-10">
        {/* ================= TEXTE COMPLET ================= */}

        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-black/5">
          <h3 className="mb-6 text-lg font-semibold text-black">
            📘 Lis le texte
          </h3>

          <div className="space-y-3 text-[18px] leading-relaxed text-slate-800">
            {text.map((line, i) => {
              let formatted = line;

              highlight.forEach((h) => {
                const regex = new RegExp(`(${h.text})`, "i");

                formatted = formatted.replace(
                  regex,
                  `<strong class="text-amber-700 font-semibold">$1</strong>`,
                );
              });

              return (
                <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
              );
            })}
          </div>
        </div>

        {/* ================= PRONONCIATION ================= */}

        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-black/5">
          <h3 className="mb-6 text-lg font-semibold text-black">
            🎤 Prononce les phrases suivantes
          </h3>

          <div className="space-y-5">
            {highlight.map((h, i) => (
              <div
                key={i}
                className="rounded-lg border-l-4 border-amber-400 bg-amber-50 px-4 py-4"
              >
                <PhraseRecorder text={h.text} tip={h.tip} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PronunciationEngine;
