"use client";

import { motion } from "framer-motion";

import TableCompletionRow from "./TableCompletionRow";

import { TableCompletionItem } from "../types";

type Props = {
  questions: TableCompletionItem[];
  answers: string[];
  validated: boolean;
  onChange: (index: number, value: string) => void;
};

export default function TableCompletionRenderer({
  questions,
  answers,
  validated,
  onChange,
}: Props) {
  const answeredCount = answers.filter(
    (answer) => answer?.trim() !== "",
  ).length;

  const progress =
    questions.length > 0
      ? (answeredCount / questions.length) * 100
      : 0;

  const activeIndex = questions.findIndex(
    (_, index) => !answers[index]?.trim(),
  );

  return (
    <div className="w-full">
      {/* HEADER DE PROGRESSION */}
      <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
       

        {/* BARRE DE PROGRESSION */}
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full rounded-full bg-amber-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
          />
        </div>

        {/* INDICATEURS */}
        <div className="mt-5 flex items-center gap-2">
          {questions.map((question, index) => {
            const answered = Boolean(answers[index]?.trim());
            const active =
              !validated &&
              index === activeIndex;

            return (
              <motion.div
                key={question.id}
                initial={false}
                animate={{
                  scale: active ? 1.15 : 1,
                }}
                className={`
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-xs
                  font-bold
                  transition-colors
                  duration-200
                  ${
                    validated
                      ? "bg-slate-200 text-slate-500"
                      : answered
                        ? "bg-amber-500 text-white"
                        : active
                          ? "border-2 border-amber-400 bg-amber-50 text-amber-700"
                          : "bg-white text-slate-400 ring-1 ring-slate-200"
                  }
                `}
              >
                {answered ? "✓" : index + 1}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* TABLEAU */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* EN-TÊTE */}
        <div className="hidden border-b border-slate-200 bg-slate-50 px-6 py-4 md:grid md:grid-cols-[60px_minmax(260px,1fr)_minmax(360px,1.4fr)] md:items-center md:gap-5">
       

          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Choisis ta réponse
          </span>
        </div>

        {/* LIGNES */}
        <div>
          {questions.map((question, index) => (
            <TableCompletionRow
              key={question.id}
              question={question}
              questionIndex={index}
              value={answers[index] ?? ""}
              validated={validated}
              active={!validated && index === activeIndex}
              onChange={(value) => onChange(index, value)}
            />
          ))}
        </div>
      </div>

      {/* LÉGENDE */}
      {!validated && answeredCount < questions.length && (
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4">
          <p className="text-sm text-slate-500">
            Choisis une réponse pour chaque phrase.
          </p>

          <span className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200">
            {answeredCount} / {questions.length}
          </span>
        </div>
      )}

      {!validated && answeredCount === questions.length && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4"
        >
          <p className="text-sm font-semibold text-amber-800">
            Toutes tes réponses sont prêtes. Tu peux maintenant
            valider le tableau.
          </p>
        </motion.div>
      )}

      {validated && (
        <div className="mt-5 flex flex-wrap items-center justify-end gap-5 text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
              ✓
            </span>

            Bonne réponse
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 font-bold text-red-700">
              ✕
            </span>

            À revoir
          </div>
        </div>
      )}
    </div>
  );
}