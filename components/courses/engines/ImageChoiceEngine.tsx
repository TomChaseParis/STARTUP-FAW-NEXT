"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ImageChoiceData,
  ImageChoiceDialogue,
} from "../types/imageChoiceTypes";

type Props = {
  data: ImageChoiceData;
};

export default function ImageChoiceEngine({ data }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDialogue, setSelectedDialogue] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);

  const currentQuestion = data.questions[currentIndex];

  const choices = useMemo(() => {
    return currentQuestion.choices
      .map((id) => data.dialogues.find((dialogue) => dialogue.id === id))
      .filter(Boolean) as ImageChoiceDialogue[];
  }, [currentQuestion, data]);

  const correctDialogue = data.dialogues.find(
    (dialogue) => dialogue.id === currentQuestion.correctDialogue,
  );

  const isCorrect = selectedDialogue === currentQuestion.correctDialogue;

  const handleValidate = () => {
    if (!selectedDialogue) return;

    setValidated(true);

    if (correctDialogue?.audio) {
      const audio = new Audio(correctDialogue.audio);
      audio.play();
    }
  };

  const nextQuestion = () => {
    if (currentIndex === data.questions.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }

    setSelectedDialogue(null);
    setValidated(false);
  };

  return (
    <section className="mx-auto max-w-6xl">
      <div className="rounded-2xl bg-white p-10 shadow-xl ring-1 ring-black/5">
        {/* HEADER */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
              Exercice {currentIndex + 1} / {data.questions.length}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Quelle conversation correspond à cette image ?
            </h2>
          </div>
        </div>

        {/* IMAGE */}

        <div className="mb-10 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10">
        <Image
  src={currentQuestion.image}
  alt="Illustration"
  width={1200}
  height={700}
  className="w-full bg-white object-contain"
/>
        </div>

        {/* DIALOGUES */}

        <div className="space-y-6">
          {choices.map((dialogue) => {
            const selected = selectedDialogue === dialogue.id;

            const correct = dialogue.id === currentQuestion.correctDialogue;

            return (
              <button
                key={dialogue.id}
                disabled={validated}
                onClick={() => setSelectedDialogue(dialogue.id)}
                className={`
                  w-full
                  rounded-2xl
                  border
                  p-6
                  text-left
                  transition-all

                  ${
                    !validated
                      ? selected
                        ? "border-amber-400 bg-amber-50"
                        : "border-slate-200 hover:border-amber-300 hover:bg-slate-50"
                      : correct
                        ? "border-green-500 bg-green-50"
                        : selected
                          ? "border-red-500 bg-red-50"
                          : "border-slate-200"
                  }
                `}
              >
                <div className="space-y-3">
                  {dialogue.dialogue.map((line, index) => (
                    <p
                      key={index}
                      className="text-lg leading-relaxed text-slate-800"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* CORRECTION */}

        {validated && (
          <div className="mt-8">
            {isCorrect ? (
              <div className="rounded-xl border border-green-300 bg-green-100 p-5">
                <p className="font-semibold text-green-700">
                  ✔ Bonne réponse !
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl border border-red-300 bg-red-100 p-5">
                  <p className="font-semibold text-red-700">
                    ✘ Mauvaise réponse.
                  </p>
                </div>

                <div className="rounded-xl border border-green-300 bg-green-50 p-5">
                  <p className="font-semibold text-green-700">
                    Bonne réponse :
                  </p>

                  <div className="mt-4 space-y-2">
                    {correctDialogue?.dialogue.map((line, index) => (
                      <p key={index} className="text-slate-800">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ACTIONS */}

        <div className="mt-10 flex justify-end">
          {!validated ? (
            <button
              disabled={!selectedDialogue}
              onClick={handleValidate}
              className="rounded-xl bg-black px-8 py-3 font-semibold text-white shadow transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Valider
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black shadow transition hover:bg-amber-400"
            >
              {currentIndex === data.questions.length - 1
                ? "Recommencer"
                : "Image suivante →"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
