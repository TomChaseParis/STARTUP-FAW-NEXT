"use client";

import { useEffect, useState } from "react";
import {
  TransformationPart,
  TransformationTableData,
} from "../types/conjugationTableTypes";
import Image from "next/image";

type Props = {
  data: TransformationTableData;
};

export default function ConjugationTableEngine({ data }: Props) {
  const [currentRow, setCurrentRow] = useState(0);

  const row = data.rows[currentRow];

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setAnswers({});
    setValidated(false);
  }, [currentRow]);

  const handleChange = (
    columnIndex: number,
    partIndex: number,
    value: string,
  ) => {
    if (validated) return;

    setAnswers((prev) => ({
      ...prev,
      [`${columnIndex}-${partIndex}`]: value,
    }));
  };

  const getValue = (columnIndex: number, partIndex: number) => {
    return answers[`${columnIndex}-${partIndex}`] ?? "";
  };

  const isCorrect = (
    part: TransformationPart,
    columnIndex: number,
    partIndex: number,
  ) => {
    if (part.type !== "input") return true;

    return (
      getValue(columnIndex, partIndex).trim().toLowerCase() ===
      part.answer.trim().toLowerCase()
    );
  };

  const validate = () => {
    setValidated(true);
  };

  const nextRow = () => {
    if (currentRow < data.rows.length - 1) {
      setCurrentRow(currentRow + 1);
    } else {
      setCurrentRow(0);
    }
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
        {" "}
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          {" "}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
              Ligne {currentRow + 1} / {data.rows.length}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              {" "}
              {data.title}
            </h2>

            <p className="mt-2 text-base text-slate-600"> {data.instruction}</p>
          </div>
        </div>
        {/* CONTENU */}
        <div className="grid gap-10 lg:grid-cols-[1.7fr_520px]">
          {/* COLONNE GAUCHE */}

          <div className="space-y-6">
            {row.columns.map((column, columnIndex) => {
              const colors = [
                {
                  bg: "bg-sky-50",
                  border: "border-sky-200",
                  badge: "bg-sky-500",
                  title: "text-sky-700",
                },
                {
                  bg: "bg-green-50",
                  border: "border-green-200",
                  badge: "bg-green-500",
                  title: "text-green-700",
                },
                {
                  bg: "bg-amber-50",
                  border: "border-amber-200",
                  badge: "bg-amber-500",
                  title: "text-amber-700",
                },
              ];

              const color = colors[columnIndex];

              return (
                <div
                  key={column.title}
                  className={`rounded-2xl border ${color.border} ${color.bg} p-5 shadow-sm`}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${color.badge}`} />

                    <h3
                      className={`text-lg font-bold uppercase tracking-wide ${color.title}`}
                    >
                      {column.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-lg leading-9 text-black">
                    {" "}
                    {column.parts.map((part, partIndex) => {
                      if (part.type === "text") {
                        return (
                          <span key={partIndex} className="font-normal">
                            {part.value}
                          </span>
                        );
                      }

                      return (
                        <input
                          key={partIndex}
                          type="text"
                          disabled={validated}
                          value={getValue(columnIndex, partIndex)}
                          onChange={(e) =>
                            handleChange(columnIndex, partIndex, e.target.value)
                          }
                          style={{
                            width: `${part.width ?? 90}px`,
                          }}
                          className={`
                          h-10
                          rounded-lg
                          border
                          px-2
                          py-1
                          text-center
                          text-base
                          font-medium
                          outline-none
                          transition
                        
                          ${
                            validated
                              ? isCorrect(part, columnIndex, partIndex)
                                ? "border-green-500 bg-green-100 text-green-700"
                                : "border-red-500 bg-red-100 text-red-700"
                              : "border-slate-300 bg-white text-black focus:border-amber-400"
                          }
                        `}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* COLONNE DROITE */}
          <div className="sticky top-8 h-fit">
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
              {" "}
              <div className="via-yellow-50 border-b border-slate-200 bg-gradient-to-r from-amber-50 to-amber-50 px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                  Illustration
                </p>

                <h3 className="mt-1 text-xl font-bold text-slate-900">                  Observe bien la scène
                </h3>

                <p className="mt-2 text-sm text-slate-600">
  {"Complète les conjugaisons en t'aidant de cette image."}
</p>
              </div>
              <div className="p-6">
                <Image
                  src={row.image}
                  alt="Illustration"
                  width={700}
                  height={700}
                  className="w-full rounded-3xl object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CLAVIER FRANÇAIS */}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {["é", "è", "ê", "à", "â", "ç", "î", "ï", "ô", "ù", "'", "-"].map(
          (character) => (
            <button
              key={character}
              type="button"
              className="
              rounded-xl
              border
              border-slate-300
              bg-white
              px-5
              py-3
              text-lg
              font-semibold
              text-slate-700
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:bg-slate-100
            "
            >
              {character}
            </button>
          ),
        )}
      </div>
      {/* ACTIONS */}

      <div className="mt-12 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Progression
          </p>

          <p className="mt-1 text-lg font-bold text-slate-800">
            Ligne {currentRow + 1} sur {data.rows.length}
          </p>
        </div>

        <div className="flex gap-4">
          {!validated ? (
            <button
              onClick={validate}
              className="
              rounded-xl
              bg-black
              px-8
              py-3
              font-semibold
              text-white
              shadow-lg
              transition-all
              hover:scale-[1.02]
              hover:bg-black/90
            "
            >
              ✓ Valider mes réponses
            </button>
          ) : (
            <button
              onClick={nextRow}
              className="
              rounded-xl
              bg-amber-500
              px-8
              py-3
              font-semibold
              text-black
              shadow-lg
              transition-all
              hover:scale-[1.02]
              hover:bg-amber-400
            "
            >
              {currentRow === data.rows.length - 1
                ? "↺ Recommencer"
                : "Ligne suivante →"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
