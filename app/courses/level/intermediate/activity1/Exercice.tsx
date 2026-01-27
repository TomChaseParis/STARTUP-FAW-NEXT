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
    { id: 1, before: "On ", after: " au bord de la mer", answer: "baiser" },
    { id: 2, before: "Avec mon père, ma sœur, ma mère\nOn ", after: " les autres gens", answer: "regardait" },
    { id: 3, before: "Comme ils ", after: " leur argent.", answer: "dépensaient" },
    { id: 4, before: "Nous il ", after: " faire attention", answer: "fallait" },
    { id: 5, before: "Quand on avait payé\nLe prix d’une location\nIl ne nous ", after: " pas grand-chose.", answer: "restait" },
    { id: 6, before: "Alors on ", after: " les bateaux", answer: "regardait" },
    { id: 7, before: "On ", after: " des glaces à l’eau", answer: "suçait" },
    { id: 8, before: "Le matin on ", after: " tôt", answer: "se réveillait" },
    { id: 9, before: "Sur la plage pendant des heures\nOn ", after: " de belles couleurs.", answer: "prenait" },
    { id: 10, before: "Et quand les vagues ", after: " tranquilles", answer: "étaient" },
    { id: 11, before: "On ", after: " la journée aux îles", answer: "passait" },
    { id: 12, before: "Sauf quand on ", after: " déjà plus.", answer: "pouvait" },
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
    <section className="bg-white mt-12 pb-20">
      <div className="container max-w-5xl mx-auto text-center">
        {/* Titre */}
        <h2 className="text-3xl font-bold text-black mb-6">
          LES VACANCES AU BORD DE LA MER
        </h2>

        {/* Introduction pédagogique */}
        <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-10 leading-relaxed">
          Cette chanson de <strong>Michel Jonasz</strong> est une parfaite
          illustration de l’utilisation de <strong>l’imparfait</strong> pour
          décrire une habitude dans le passé. L’imparfait est le temps du
          souvenir et de la nostalgie.
        </p>

        {/* Image + Bouton Audio */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-12">
          {/* Image */}
          <div className="relative w-[500px] h-[350px] overflow-hidden rounded-xl shadow-xl ring-1 ring-black/10">
            <Image
              src={ImgTop}
              alt="Vacances au bord de la mer"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Cadre Audio */}
          <div className="w-full max-w-md">
            <div className="relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
              <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                <h3 className="text-[18px] font-semibold text-black">
                  Écoute la chanson
                </h3>
                <span className="rounded-md bg-red-400 px-2 py-1 text-xs font-semibold text-black shadow">
                  Audio
                </span>
              </div>
              <div className="px-5 py-5 text-center">
                <button
                  onClick={toggleAudio}
                  className="inline-flex items-center justify-center rounded-lg bg-black/80 px-6 py-2.5 text-white text-[16px] font-medium backdrop-blur hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  {audioPlaying ? "⏸︎ Pause" : "▶ Écouter"}
                </button>
                <audio
                  ref={audioRef}
                  src="/audios/courses/intermediate/lesvacancesauborddemer.mp3"
                />
                <p className="mt-3 text-sm text-slate-500 italic">
                  (Pierre Grosz / Michel Jonasz)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exercice — Texte à trous */}
        <div className="text-left bg-white p-8 rounded-xl shadow-lg ring-1 ring-black/5">
          <h3 className="text-lg font-semibold text-black mb-6">
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
                      focus:outline-none
                      placeholder-slate-400 italic
                      ${
                        !showCorrection
                          ? "border-red-300 text-slate-900 bg-transparent focus:border-red-500"
                          : isCorrect
                          ? "bg-green-100 border-green-500 text-green-800 font-semibold"
                          : "bg-red-100 border-red-500 text-red-800 font-semibold"
                      }
                    `}
                  />
                  {gap.after}
                  {showCorrection && !isCorrect && (
                    <span className="ml-2 text-green-600 font-semibold">
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
                className="px-6 py-2.5 rounded-lg bg-black text-white shadow hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                Vérifier mes réponses
              </button>
            )}
            <button
              onClick={() => {
                setAnswers(Array(gaps.length).fill(""));
                setShowCorrection(false);
              }}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none"
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
