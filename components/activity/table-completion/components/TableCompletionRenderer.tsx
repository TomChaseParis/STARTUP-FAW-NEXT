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
    <div className="w-full min-w-0">
      {/* ========================================================= */}
      {/* HEADER DE PROGRESSION */}
      {/* ========================================================= */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:mb-8 sm:rounded-3xl sm:p-5">
        {/* BARRE DE PROGRESSION */}

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
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

        <div
          className="
            mt-4
            flex
            w-full
            min-w-0
            flex-wrap
            items-center
            gap-2
            sm:mt-5
            sm:gap-2
          "
        >
          {questions.map((question, index) => {
            const answered = Boolean(
              answers[index]?.trim(),
            );

            const active =
              !validated &&
              index === activeIndex;

            return (
              <motion.div
                key={question.id}
                initial={false}
                animate={{
                  scale: active ? 1.1 : 1,
                }}
                className={`
                  flex
                  h-8
                  w-8
                  shrink-0
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

      {/* ========================================================= */}
      {/* CONTENU */}
      {/* ========================================================= */}

      <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
        {/* ======================================================= */}
        {/* QUESTIONS */}
        {/* ======================================================= */}

        <div className="w-full min-w-0">
          {questions.map((question, index) => {
            /*
             * =====================================================
             * QUESTION IMAGE
             * =====================================================
             */

            if (
              question.type === "image" &&
              question.images
            ) {
              const selectedAnswer =
                answers[index] ?? "";

              return (
                <div
                  key={question.id}
                  className="
                    w-full
                    border-b
                    border-slate-200
                    px-4
                    py-6
                    last:border-b-0
                    sm:px-6
                    sm:py-8
                    md:px-8
                  "
                >
                  {/* NUMÉRO + QUESTION */}

                  <div className="mb-6 flex items-start gap-4">
                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-sm
                        font-bold
                        ${
                          selectedAnswer
                            ? "bg-amber-500 text-white"
                            : "bg-slate-100 text-slate-500"
                        }
                      `}
                    >
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      <p className="text-base font-bold leading-relaxed text-slate-900 sm:text-lg">
                        Choisissez l&apos;image qui correspond
                        le mieux à Xavier Plantu.
                      </p>
                    </div>
                  </div>

                  {/* ================================================= */}
                  {/* IMAGES */}
                  {/* ================================================= */}

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-4
                      sm:grid-cols-3
                      sm:gap-5
                    "
                  >
                    {question.images.map(
                      (image) => {
                        const isSelected =
                          selectedAnswer ===
                          image.id;

                        const isCorrect =
                          image.id ===
                          question.answer;

                        let imageStateClass =
                          "border-slate-200 bg-white hover:border-amber-300 hover:shadow-md";

                        if (!validated) {
                          if (isSelected) {
                            imageStateClass =
                              "border-amber-500 bg-amber-50 shadow-lg ring-2 ring-amber-400";
                          }
                        } else {
                          if (isCorrect) {
                            imageStateClass =
                              "border-green-500 bg-green-50 shadow-md ring-2 ring-green-400";
                          } else if (
                            isSelected
                          ) {
                            imageStateClass =
                              "border-red-500 bg-red-50 shadow-md ring-2 ring-red-400";
                          } else {
                            imageStateClass =
                              "border-slate-200 bg-white opacity-70";
                          }
                        }

                        return (
                          <motion.button
                            key={image.id}
                            type="button"
                            disabled={validated}
                            onClick={() =>
                              onChange(
                                index,
                                image.id,
                              )
                            }
                            whileHover={
                              !validated
                                ? {
                                    y: -4,
                                  }
                                : undefined
                            }
                            whileTap={
                              !validated
                                ? {
                                    scale: 0.98,
                                  }
                                : undefined
                            }
                            className={`
                              relative
                              overflow-hidden
                              rounded-2xl
                              border-2
                              p-2
                              text-left
                              transition-all
                              duration-200
                              focus:outline-none
                              focus:ring-2
                              focus:ring-amber-400
                              focus:ring-offset-2
                              ${imageStateClass}
                            `}
                          >
                            {/* IMAGE */}

                            <div
  className="
    relative
    aspect-[3/4]
    w-full
    overflow-hidden
    rounded-xl
    bg-slate-100
  "
>
  <img
    src={image.src}
    alt={image.alt}
    className="
      h-full
      w-full
      object-contain
      transition-transform
      duration-300
    "
  />
</div>

                            {/* ÉTAT */}

                            {validated &&
                              isCorrect && (
                                <div
                                  className="
                                    absolute
                                    right-4
                                    top-4
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-green-500
                                    text-lg
                                    font-bold
                                    text-white
                                    shadow-lg
                                  "
                                >
                                  ✓
                                </div>
                              )}

                            {validated &&
                              isSelected &&
                              !isCorrect && (
                                <div
                                  className="
                                    absolute
                                    right-4
                                    top-4
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-red-500
                                    text-lg
                                    font-bold
                                    text-white
                                    shadow-lg
                                  "
                                >
                                  ✕
                                </div>
                              )}

                            {!validated &&
                              isSelected && (
                                <div
                                  className="
                                    absolute
                                    right-4
                                    top-4
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-amber-500
                                    text-lg
                                    font-bold
                                    text-white
                                    shadow-lg
                                  "
                                >
                                  ✓
                                </div>
                              )}
                          </motion.button>
                        );
                      },
                    )}
                  </div>

                  {/* ================================================= */}
                  {/* MESSAGE APRÈS VALIDATION */}
                  {/* ================================================= */}

                  {validated && (
                    <div
                      className={`
                        mt-5
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        ${
                          selectedAnswer ===
                          question.answer
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }
                      `}
                    >
                      {selectedAnswer ===
                      question.answer
                        ? "✓ Bonne réponse !"
                        : "✕ Ce n'est pas la bonne image. La bonne réponse est indiquée en vert."}
                    </div>
                  )}
                </div>
              );
            }

            /*
             * =====================================================
             * QUESTION CLASSIQUE
             * =====================================================
             */

            return (
              <TableCompletionRow
                key={question.id}
                question={question}
                questionIndex={index}
                value={
                  answers[index] ?? ""
                }
                validated={validated}
                active={
                  !validated &&
                  index === activeIndex
                }
                onChange={(value) =>
                  onChange(
                    index,
                    value,
                  )
                }
              />
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* LÉGENDE — RÉPONSES NON TERMINÉES */}
      {/* ========================================================= */}

      {!validated &&
        answeredCount <
          questions.length && (
          <div
            className="
              mt-4
              flex
              flex-col
              gap-3
              rounded-2xl
              bg-slate-50
              px-4
              py-4
              sm:mt-5
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-5
            "
          >
            <p className="text-sm leading-relaxed text-slate-500">
              Choisis une réponse pour chaque
              question.
            </p>

            <span
              className="
                w-fit
                shrink-0
                rounded-full
                bg-white
                px-3
                py-1.5
                text-sm
                font-bold
                text-slate-600
                shadow-sm
                ring-1
                ring-slate-200
              "
            >
              {answeredCount} /{" "}
              {questions.length}
            </span>
          </div>
        )}

      {/* ========================================================= */}
      {/* LÉGENDE — TOUTES LES RÉPONSES SONT PRÊTES */}
      {/* ========================================================= */}

      {!validated &&
        answeredCount ===
          questions.length && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              mt-4
              flex
              items-center
              justify-center
              rounded-2xl
              border
              border-amber-200
              bg-amber-50
              px-4
              py-4
              text-center
              sm:mt-5
              sm:px-5
            "
          >
            <p className="text-sm font-semibold leading-relaxed text-amber-800">
              Toutes tes réponses sont prêtes.
              <br className="sm:hidden" />
              {" "}Tu peux maintenant valider le
              tableau.
            </p>
          </motion.div>
        )}

      {/* ========================================================= */}
      {/* LÉGENDE — APRÈS VALIDATION */}
      {/* ========================================================= */}

      {validated && (
        <div
          className="
            mt-4
            flex
            flex-col
            items-start
            gap-3
            text-sm
            sm:mt-5
            sm:flex-row
            sm:flex-wrap
            sm:items-center
            sm:justify-end
            sm:gap-5
          "
        >
          <div className="flex items-center gap-2 text-slate-500">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
              ✓
            </span>

            <span>
              Bonne réponse
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-700">
              ✕
            </span>

            <span>
              À revoir
            </span>
          </div>
        </div>
      )}
    </div>
  );
}