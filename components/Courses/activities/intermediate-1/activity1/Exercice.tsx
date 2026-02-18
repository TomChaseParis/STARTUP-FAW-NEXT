"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import ImgTop from "@/public/images/courses/intermediate/vacancespicheader.png";

const Exercice: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play();
      setAudioPlaying(true);
      audioRef.current.onended = () => setAudioPlaying(false);
    }
  };

  // -------- TEXTE À TROUS --------
  const gaps = [
    { id: 1, before: "On ", after: " au bord de la mer", answer: "allait" },
    {
      id: 2,
      before: "Avec mon père, ma sœur, ma mère\nOn ",
      after: " les autres gens",
      answer: "regardait",
    },
    {
      id: 3,
      before: "Comme ils ",
      after: " leur argent.",
      answer: "dépensaient",
    },
    { id: 4, before: "Nous il ", after: " faire attention", answer: "fallait" },
    {
      id: 5,
      before: "Quand on avait payé\nLe prix d’une location\nIl ne nous ",
      after: " pas grand-chose.",
      answer: "restait",
    },
    { id: 6, before: "Alors on ", after: " les bateaux", answer: "regardait" },
    { id: 7, before: "On ", after: " des glaces à l’eau", answer: "suçait" },
    { id: 8, before: "Le matin on ", after: " tôt", answer: "se réveillait" },
    {
      id: 9,
      before: "Sur la plage pendant des heures\nOn ",
      after: " de belles couleurs.",
      answer: "prenait",
    },
    {
      id: 10,
      before: "Et quand les vagues ",
      after: " tranquilles",
      answer: "étaient",
    },
    { id: 11, before: "On ", after: " la journée aux îles", answer: "passait" },
    {
      id: 12,
      before: "Sauf quand on ",
      after: " déjà plus.",
      answer: "pouvait",
    },
    { id: 13, before: "On ", after: " le cœur un peu gros", answer: "avait" },
    { id: 14, before: "Mais ", after: " quand même beau.", answer: "c'était" },
  ];

  const [answers, setAnswers] = useState<string[]>(Array(gaps.length).fill(""));

  const handleChange = (i: number, value: string) => {
    const next = [...answers];
    next[i] = value;
    setAnswers(next);
  };

  const checkAnswers = () => {
    setShowCorrection(true);
  };

  return (
    <section className="mt-12 bg-white pb-20">
      <div className="container mx-auto max-w-5xl text-center">

        {/* ================= CONSIGNE EXERCICE 1 ================= */}
        <div className="mx-auto mb-10 max-w-5xl rounded-xl bg-amber-50 p-6 text-left shadow-sm ring-1 ring-amber-200">
          <h3 className="mb-3 text-lg font-semibold text-black">
            ✍️ Exercice 1 — Compléter les paroles
          </h3>

          <p className="leading-relaxed text-black/80">
            Complétez, <strong>à l’écrit</strong>, les paroles de la chanson en
            pensant à conjuguer le verbe manquant à la{" "}
            <strong>bonne forme de l’imparfait</strong>.
          </p>

          <p className="mt-3 text-black/80">
            <strong>Rappel des terminaisons de l’imparfait :</strong>
          </p>

          <p className="mt-1 inline-block rounded-md bg-white px-3 py-1 font-mono text-black ring-1 ring-black/5">
            -ais · -ais · -ait · -ions · -iez · -aient
          </p>
        </div>

        {/* Exercice — Texte à trous */}
        <div className="rounded-xl bg-white p-8 text-left shadow-lg ring-1 ring-black/5">
          <h3 className="mb-6 text-lg font-semibold text-black">
            Complète les paroles de la chanson :
          </h3>

          <div className="space-y-4 text-[17px] leading-relaxed text-slate-800">
            {gaps.map((gap, i) => {
              const userAnswer = answers[i].toLowerCase().trim();
              const correctAnswer = gap.answer.toLowerCase();
              const isCorrect = userAnswer === correctAnswer;

              return (
                <p key={gap.id}>
                  {gap.before}
                  <input
                    type="text"
                    value={answers[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    placeholder="..."
                    disabled={showCorrection}
                    className={`
                      mx-2 min-w-[120px]
                      border-b-2 border-dashed
                      italic
                      placeholder-slate-400 focus:outline-none
                      ${
                        !showCorrection
                          ? "border-red-300 bg-transparent text-slate-900 focus:border-red-500"
                          : isCorrect
                            ? "border-green-500 bg-green-100 font-semibold text-green-800"
                            : "border-red-500 bg-red-100 font-semibold text-red-800"
                      }
                    `}
                  />
                  {gap.after}
                  {showCorrection && !isCorrect && (
                    <span className="ml-2 font-semibold text-green-600">
                      ✔ {gap.answer}
                    </span>
                  )}
                </p>
              );
            })}
          </div>

          <div className="mt-8 flex items-center gap-3">
            {!showCorrection && (
              <button
                onClick={checkAnswers}
                className="rounded-lg bg-black px-6 py-2.5 text-white shadow hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                Vérifier mes réponses
              </button>
            )}
            <button
              onClick={() => {
                setAnswers(Array(gaps.length).fill(""));
                setShowCorrection(false);
              }}
              className="rounded-lg bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200 focus:outline-none"
            >
              Effacer
            </button>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default Exercice;
