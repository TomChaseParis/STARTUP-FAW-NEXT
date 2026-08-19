"use client";

import { motion } from "framer-motion";

import { TableCompletionItem } from "../types";

type Props = {
  question: TableCompletionItem;
  questionIndex: number;
  value: string;
  validated: boolean;
  active: boolean;
  onChange: (value: string) => void;
};

export default function TableCompletionRow({
  question,
  questionIndex,
  value,
  validated,
  active,
  onChange,
}: Props) {
  const isAnswered = Boolean(value?.trim());
  const isCorrect = value === question.answer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        delay: questionIndex * 0.04,
      }}
      className={`
        relative
        border-b
        border-slate-100
        last:border-b-0
        transition-colors
        duration-300
        ${
          validated
            ? isCorrect
              ? "bg-emerald-50/40"
              : "bg-red-50/40"
            : active
              ? "bg-amber-50/40"
              : "bg-white hover:bg-slate-50/70"
        }
      `}
    >
      {/* INDICATEUR DE LIGNE ACTIVE */}
      {!validated && active && (
        <motion.div
          layoutId="active-row-indicator"
          className="absolute left-0 top-0 h-full w-1 bg-amber-500"
          transition={{
            duration: 0.25,
          }}
        />
      )}

      <div className="grid gap-5 px-5 py-6 md:grid-cols-[60px_minmax(260px,1fr)_minmax(360px,1.4fr)] md:items-center md:px-6">
        {/* NUMÉRO */}
        <div className="flex items-center gap-3 md:block">
          <motion.div
            initial={false}
            animate={{
              scale: isAnswered ? 1 : 1,
            }}
            className={`
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-sm
              font-bold
              transition-all
              duration-300
              ${
                validated
                  ? isCorrect
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                  : isAnswered
                    ? "bg-amber-500 text-white shadow-sm"
                    : active
                      ? "bg-amber-100 text-amber-700 ring-2 ring-amber-300 ring-offset-2"
                      : "bg-slate-100 text-slate-500"
              }
            `}
          >
            {validated
              ? isCorrect
                ? "✓"
                : "!"
              : isAnswered
                ? "✓"
                : String(questionIndex + 1).padStart(2, "0")}
          </motion.div>

          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 md:hidden">
            Phrase {questionIndex + 1}
          </span>
        </div>

        {/* PHRASE */}
        <div>
          <p className="text-base font-medium leading-7 text-slate-700">
            {question.before}

            <motion.span
              layout
              className={`
                mx-2
                inline-flex
                min-w-[80px]
                items-center
                justify-center
                border-b-2
                px-2
                font-bold
                transition-colors
                duration-300
                ${
                  validated
                    ? isCorrect
                      ? "border-emerald-400 text-emerald-700"
                      : "border-red-400 text-red-700"
                    : isAnswered
                      ? "border-amber-400 text-slate-900"
                      : "border-dashed border-slate-300 text-transparent"
                }
              `}
            >
              {value || "______"}
            </motion.span>

            {question.after}
          </p>

          {validated && !isCorrect && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 text-sm text-slate-500"
            >
              Bonne réponse :{" "}
              <strong className="font-bold text-emerald-700">
                {question.answer}
              </strong>
            </motion.p>
          )}
        </div>

        {/* RÉPONSES */}
        <div>
          <div className="flex flex-wrap gap-2">
            {question.options.map((option) => {
              const selected = value === option;

              const isCorrectOption =
                validated && option === question.answer;

              const isWrongSelection =
                validated && selected && !isCorrect;

              return (
                <motion.button
                  key={option}
                  type="button"
                  disabled={validated}
                  whileHover={
                    !validated
                      ? {
                          y: -2,
                          scale: 1.02,
                        }
                      : undefined
                  }
                  whileTap={
                    !validated
                      ? {
                          scale: 0.97,
                        }
                      : undefined
                  }
                  onClick={() => onChange(option)}
                  className={`
                    rounded-xl
                    border
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    transition-colors
                    duration-200
                    ${
                      validated
                        ? isCorrectOption
                          ? "border-emerald-400 bg-emerald-100 text-emerald-800"
                          : isWrongSelection
                            ? "border-red-400 bg-red-100 text-red-800"
                            : "border-slate-200 bg-slate-50 text-slate-400"
                        : selected
                          ? "border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-200"
                          : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-amber-300 hover:bg-amber-50"
                    }
                  `}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}