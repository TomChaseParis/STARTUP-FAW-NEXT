"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SentenceAnswerData } from "@/components/courses/types/sentenceAnswerTypes";

type Props = {
  data: SentenceAnswerData;
};

export default function SentenceAnswerEngine({ data }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [validated, setValidated] = useState(false);

  const currentItem = data.items[currentIndex];

  useEffect(() => {
    setAnswer("");
    setValidated(false);
  }, [currentIndex]);

  const playQuestion = () => {
    if (!currentItem.questionAudio) return;

    const audio = new Audio(currentItem.questionAudio);

    audio.play();
  };

  const insertCharacter = (character: string) => {
    if (validated) return;

    setAnswer((previous) => previous + character);
  };

  const normalize = (text: string) =>
    text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

  const isCorrect =
    normalize(answer) === normalize(currentItem.answer);

  const validate = () => {
    if (!answer.trim()) return;

    setValidated(true);
  };

  const nextQuestion = () => {
    if (currentIndex === data.items.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((previous) => previous + 1);
    }
  };

  return (
    <section className="mx-auto max-w-6xl">
    <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5">
      {/* HEADER */}
  
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
          Question {currentIndex + 1} / {data.items.length}
        </p>
  
        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          {data.title}
        </h2>
  
        <p className="mt-2 text-slate-600">{data.instruction}</p>
      </div>
  
      {/* CARD */}
  
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid items-start gap-8 lg:grid-cols-[220px_1fr]">
          {/* IMAGE */}
  
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
              <Image
                src={currentItem.image}
                alt="Illustration"
                width={400}
                height={400}
                className="h-auto w-full object-contain"
              />
            </div>
  
            <button
              type="button"
              onClick={playQuestion}
              disabled={!currentItem.questionAudio}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-amber-300
                bg-amber-50
                px-4
                py-3
                font-semibold
                text-amber-700
                transition
                hover:bg-amber-100
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              🔊 Écouter la question
            </button>
          </div>
  
          {/* COLONNE DROITE */}
  
          <div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                Étienne demande
              </p>
  
              <h3 className="text-2xl font-bold leading-relaxed text-slate-900">
                {currentItem.question}
              </h3>
            </div>
  
            {/* REPONSE */}
  
            <div className="mt-8">
              <label className="mb-3 block text-sm font-semibold uppercase tracking-widest text-slate-500">
                Ta réponse
              </label>
  
              <input
                type="text"
                value={answer}
                disabled={validated}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Écris ta réponse..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-300
                  bg-white
                  px-5
                  py-4
                  text-lg
                  text-black
                  shadow-sm
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-amber-400
                  focus:ring-4
                  focus:ring-amber-100
                  disabled:bg-slate-100
                "
              />
            </div>
  
            {/* MICRO */}
  
            <div className="mt-5">
              <button
                type="button"
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-5
                  py-3
                  font-medium
                  text-slate-700
                  shadow-sm
                  transition
                  hover:bg-slate-50
                "
              >
                🎤 Répondre à l'oral
              </button>
            </div>
  
            {/* CORRECTION */}
  
            {validated && (
              <div className="mt-8 space-y-5">
                <div
                  className={`rounded-2xl border p-5 ${
                    isCorrect
                      ? "border-green-300 bg-green-50"
                      : "border-red-300 bg-red-50"
                  }`}
                >
                  <p
                    className={`text-lg font-bold ${
                      isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {isCorrect
                      ? "✅ Bonne réponse !"
                      : "❌ Ce n'est pas tout à fait ça."}
                  </p>
                </div>
  
                {!isCorrect && (
                  <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
                    <p className="text-sm font-bold uppercase tracking-widest text-green-700">
                      Réponse attendue
                    </p>
  
                    <p className="mt-3 text-lg font-semibold text-slate-900">
                      {currentItem.answer}
                    </p>
                  </div>
                )}
  
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-sm font-bold uppercase tracking-widest text-amber-700">
                    💡 Explication
                  </p>
  
                  <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-700">
                    {currentItem.explanation}
                  </p>
                </div>
              </div>
            )}
  
            {/* ACTION */}
  
            <div className="mt-8 flex justify-end">
              {!validated ? (
                <button
                  onClick={validate}
                  disabled={!answer.trim()}
                  className="
                    rounded-xl
                    bg-black
                    px-8
                    py-3
                    font-semibold
                    text-white
                    shadow-md
                    transition
                    hover:bg-black/90
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Valider
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="
                    rounded-xl
                    bg-amber-500
                    px-8
                    py-3
                    font-semibold
                    text-black
                    shadow-md
                    transition
                    hover:bg-amber-400
                  "
                >
                  {currentIndex === data.items.length - 1
                    ? "Recommencer"
                    : "Question suivante →"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}