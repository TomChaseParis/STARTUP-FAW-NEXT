"use client";

import { useEffect, useState } from "react";

import {
  ClassificationCategory,
  ClassificationData,
} from "../types/classificationTypes";

type Props = {
  data: ClassificationData;
};

export default function ClassificationEngine({ data }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setSelectedCategory(null);
    setValidated(false);
  }, [currentIndex]);

  const currentItem = data.items[currentIndex];

  const correctCategory = data.categories.find(
    (category) => category.id === currentItem.categoryId,
  );

  const isCorrect = selectedCategory === currentItem.categoryId;

  const handleValidate = () => {
    if (!selectedCategory) return;

    setValidated(true);

    if (currentItem.audio) {
      const audio = new Audio(currentItem.audio);
      audio.play();
    }
  };

  const nextItem = () => {
    if (currentIndex === data.items.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const colorMap: Record<
    ClassificationCategory["color"],
    {
      bg: string;
      border: string;
      text: string;
    }
  > = {
    green: {
      bg: "bg-green-50",
      border: "border-green-300",
      text: "text-green-700",
    },

    red: {
      bg: "bg-red-50",
      border: "border-red-300",
      text: "text-red-700",
    },

    blue: {
      bg: "bg-sky-50",
      border: "border-sky-300",
      text: "text-sky-700",
    },

    amber: {
      bg: "bg-amber-50",
      border: "border-amber-300",
      text: "text-amber-700",
    },
  };

  return (
    <section className="mx-auto max-w-5xl py-16">
      <div className="rounded-2xl bg-white p-10 shadow-xl ring-1 ring-black/5">
        {/* HEADER */}

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
            Phrase {currentIndex + 1} / {data.items.length}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {data.title}
          </h2>

          <p className="mt-2 text-slate-600">
            {data.instruction}
          </p>
        </div>

        {/* PHRASE */}

        <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <div className="mb-4 flex justify-end">
            {currentItem.audio && (
              <button
                onClick={() => {
                  const audio = new Audio(currentItem.audio);
                  audio.play();
                }}
                className="rounded-xl bg-amber-100 px-4 py-2 text-lg transition hover:bg-amber-200"
              >
                🔊
              </button>
            )}
          </div>

          <p className="text-center text-2xl leading-relaxed text-slate-800">
            {currentItem.text}
          </p>
        </div>

        {/* CATÉGORIES */}

        <div
          className={`grid gap-6 ${
            data.categories.length === 2
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {data.categories.map((category) => {
            const colors = colorMap[category.color];

            const selected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                disabled={validated}
                onClick={() =>
                  setSelectedCategory(category.id)
                }
                className={`
                  rounded-2xl
                  border-2
                  p-8
                  transition-all

                  ${
                    !validated
                      ? selected
                        ? `${colors.bg} ${colors.border}`
                        : "border-slate-200 hover:border-amber-300 hover:bg-slate-50"
                      : category.id === currentItem.categoryId
                      ? "border-green-500 bg-green-50"
                      : selected
                      ? "border-red-500 bg-red-50"
                      : "border-slate-200"
                  }
                `}
              >
                <p className="text-4xl">
                  {category.emoji}
                </p>

                <p
                  className={`mt-4 text-xl font-bold ${colors.text}`}
                >
                  {category.title}
                </p>
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
                    Bonne catégorie :
                  </p>

                  <p className="mt-2 text-lg">
                    {correctCategory?.emoji}{" "}
                    {correctCategory?.title}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ACTIONS */}

        <div className="mt-10 flex justify-end">
          {!validated ? (
            <button
              disabled={!selectedCategory}
              onClick={handleValidate}
              className="rounded-xl bg-black px-8 py-3 font-semibold text-white shadow transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Valider
            </button>
          ) : (
            <button
              onClick={nextItem}
              className="rounded-xl bg-amber-500 px-8 py-3 font-semibold text-black shadow transition hover:bg-amber-400"
            >
              {currentIndex === data.items.length - 1
                ? "Recommencer"
                : "Phrase suivante →"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}