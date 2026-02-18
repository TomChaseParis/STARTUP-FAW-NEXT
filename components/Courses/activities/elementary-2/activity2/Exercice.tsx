"use client";

import React, { useState } from "react";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

/* --- Fonction pour enlever les accents (tolérance clavier) --- */
const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/* ============================================================================
   EXERCICE TEXTE À TROUS — EPISODE 1 : LE NOUVEAU LOGEMENT
============================================================================ */

const Exercice: React.FC = () => {
  const [showCorrection, setShowCorrection] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  /* -------------------------------------------------------
     Nouveau format : phrases + trous
  ------------------------------------------------------- */
  const gaps = [
    {
      id: 1,
      parts: [
        { type: "text", value: "Papa et maman " },
        { type: "input", answer: "travaillent", hint: "travailler (présent)" },
        {
          type: "text",
          value:
            " loin. Tous les jours. Ils partent en train de bonne heure et ",
        },
        { type: "input", answer: "rentrent", hint: "rentrer (présent)" },
        { type: "text", value: " tard, fatigués." },
      ],
    },
    {
      id: 2,
      parts: [
        { type: "text", value: "Alors papa et maman " },
        {
          type: "input",
          answer: "ont décidé",
          hint: "décider (passé composé)",
        },
        { type: "text", value: " d’aller habiter en ville." },
      ],
    },
    {
      id: 3,
      parts: [
        { type: "text", value: "- Qu’est-ce que tu " },
        { type: "input", answer: "sais", hint: "savoir (présent)" },
        { type: "text", value: " ?, demande maman." },
      ],
    },
    {
      id: 4,
      parts: [
        { type: "text", value: "J’ai " },
        { type: "input", answer: "trouvé", hint: "trouver (passé composé)" },
        { type: "text", value: " un appartement près de ton travail…" },
      ],
    },
    {
      id: 5,
      parts: [
        { type: "text", value: "Elle " },
        { type: "input", answer: "demande", hint: "demander (présent)" },
        {
          type: "text",
          value: " à papa : « Quand pourrons-nous le visiter ? »",
        },
      ],
    },
    {
      id: 6,
      parts: [
        { type: "text", value: "On " },
        { type: "input", answer: "pourra", hint: "pouvoir (futur)" },
        { type: "text", value: " aller le voir samedi." },
      ],
    },
    {
      id: 7,
      parts: [
        { type: "text", value: "La petite sœur de Pierre ne " },
        { type: "input", answer: "sait", hint: "savoir (présent)" },
        { type: "text", value: " pas encore parler." },
      ],
    },
    {
      id: 8,
      parts: [
        { type: "text", value: "Toi aussi tu " },
        { type: "input", answer: "auras", hint: "avoir (futur)" },
        { type: "text", value: " ta chambre." },
      ],
    },
  ];

  /* -------------------------------------------------------
     Calcul score + progression
  ------------------------------------------------------- */

  const totalQuestions = gaps.reduce(
    (sum, sentence) =>
      sum + sentence.parts.filter((p) => p.type === "input").length,
    0,
  );

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const answeredCount = Object.values(answers).filter(
    (v) => v.trim() !== "",
  ).length;

  const allAnswered = answeredCount === totalQuestions;

  const handleChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  /* ================ CORRECTION ================ */
  const checkAnswers = () => {
    let correct = 0;
    let idx = 0;

    gaps.forEach((sentence) => {
      sentence.parts.forEach((p) => {
        if (p.type === "input") {
          const user = removeAccents((answers[idx] || "").trim().toLowerCase());
          const good = removeAccents(p.answer.toLowerCase());
          if (user === good) correct++;
          idx++;
        }
      });
    });

    const finalScore = Math.round((correct / totalQuestions) * 100);

    setScore(finalScore);
    setShowCorrection(true);
    setShowModal(true);
  };

  /* UTILE : pour savoir si une phrase contient au moins un input rempli */
  const sentenceHasInputFilled = (sentenceIndex: number) => {
    let globalIndex = 0;

    for (let i = 0; i < gaps.length; i++) {
      const sentence = gaps[i];

      if (i === sentenceIndex) {
        const inputCountBefore = globalIndex;
        for (let p = 0; p < sentence.parts.length; p++) {
          if (sentence.parts[p].type === "input") {
            const idx = globalIndex;
            if (answers[idx] && answers[idx].trim() !== "") return true;
            globalIndex++;
          }
        }
        return false;
      }

      globalIndex += sentence.parts.filter((p) => p.type === "input").length;
    }

    return false;
  };

  /* ============================ RENDER ============================ */

  return (
    <section className="mt-12 bg-white pb-20">
      <InstructionBlock title="✍️ EPISODE 1 — Le nouveau logement" subtitle=" Écoutez le texte et complétez avec les verbes suivants au bon temps et à
        la bonne personne :"
        description="">
        
        <ul className="mt-4 list-disc space-y-1 pl-6">
          <li>Travailler (présent)</li>
          <li>Décider (passé composé)</li>
          <li>Demander (présent)</li>
          <li>Savoir (présent)</li>
          <li>Trouver (passé composé)</li>
          <li>Pouvoir (futur)</li>
          <li>Rentrer (présent)</li>
          <li>Avoir (futur)</li>
        </ul>
      </InstructionBlock>
      <div className="container mx-auto max-w-5xl">
        {/* -------- BARRE DE PROGRESSION -------- */}
        <div className="mb-6 h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-amber-500 transition-all duration-500"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          ></div>
        </div>

        {/* -------- TEXTE À TROUS -------- */}
        <div className="rounded-xl bg-white p-8 shadow-lg ring-1 ring-black/5">
          <h3 className="mb-6 text-xl font-semibold text-black">
            Complète le texte :
          </h3>

          <div className="space-y-8 text-[17px] leading-relaxed text-slate-800">
            {gaps.map((sentence, sentenceIndex) => {
              let inputIndex = 0;

              /* ---- STYLE dynamique : devient jaune si rempli ---- */
              const filled = sentenceHasInputFilled(sentenceIndex);

              return (
                <div
                  key={sentence.id}
                  className={`
                    rounded-xl px-4 py-4 ring-1 transition-all duration-300
                    ${
                      filled
                        ? "border-l-4 border-amber-400 bg-amber-50 shadow-sm"
                        : "bg-slate-50 ring-slate-200"
                    }
                  `}
                >
                  {sentence.parts.map((part, partIndex) => {
                    if (part.type === "text") {
                      return <span key={partIndex}>{part.value}</span>;
                    }

                    if (part.type === "input") {
                      const globalIndex =
                        gaps
                          .slice(0, sentenceIndex)
                          .reduce(
                            (sum, s) =>
                              sum +
                              s.parts.filter((p) => p.type === "input").length,
                            0,
                          ) + inputIndex;

                      inputIndex++;

                      const val = answers[globalIndex] || "";
                      const isCorrect =
                        removeAccents(val.trim().toLowerCase()) ===
                        removeAccents(part.answer.toLowerCase());

                      return (
                        <span
                          key={partIndex}
                          className="mx-2 inline-flex flex-col"
                        >
                          <input
                            type="text"
                            value={val}
                            onChange={(e) =>
                              handleChange(globalIndex, e.target.value)
                            }
                            disabled={showCorrection}
                            placeholder="Réponse"
                            className={`h-10 min-w-[140px] rounded-md border-2 bg-white px-3 text-[16px] shadow-sm 
                              focus:border-amber-500 focus:ring-2 focus:ring-amber-500
                              ${
                                showCorrection
                                  ? isCorrect
                                    ? "border-green-500 bg-green-100 text-green-900"
                                    : "border-red-500 bg-red-100 text-red-900"
                                  : "border-slate-300"
                              }
                            `}
                          />

                          <span className="mt-1 text-xs italic text-slate-500">
                            ({part.hint})
                          </span>

                          {/* Correction */}
                          {showCorrection && (
                            <span className="mt-1 text-sm">
                              {isCorrect ? (
                                <span className="font-semibold text-green-600">
                                  ✔ Correct
                                </span>
                              ) : (
                                <>
                                  <span className="font-semibold text-red-600">
                                    ❌ {val || "…"}
                                  </span>{" "}
                                  →{" "}
                                  <span className="font-semibold text-green-700">
                                    {part.answer}
                                  </span>
                                </>
                              )}
                            </span>
                          )}
                        </span>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>

          {/* -------- BOUTONS -------- */}
          <div className="mt-10 flex justify-center gap-4">
            {!showCorrection && (
              <button
                onClick={checkAnswers}
                disabled={!allAnswered}
                className={`
                  rounded-xl px-10 py-3 font-semibold text-white 
                  shadow-md transition-all duration-300
                  ${
                    allAnswered
                      ? "bg-black hover:bg-black/90 hover:shadow-xl active:scale-95"
                      : "cursor-not-allowed bg-black/30"
                  }
                `}
              >
                Vérifier mes réponses
              </button>
            )}

            <button
              onClick={() => {
                setAnswers({});
                setShowCorrection(false);
                setShowModal(false);
                setScore(null);
              }}
              className="rounded-xl bg-slate-100 px-6 py-3 text-slate-700 shadow hover:bg-slate-200"
            >
              Effacer
            </button>
          </div>
        </div>
      </div>

      {/* -------- MODALE SCORE -------- */}
      {showModal && score !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-500">
              Résultat final
            </p>

            <p className="text-5xl font-extrabold text-black">
              {score}
              <span className="text-2xl text-black/60"> / 100</span>
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-black hover:bg-amber-400"
            >
              Continuer
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Exercice;
