"use client";

import { motion } from "framer-motion";

type Answer = "true" | "false";

type TrueFalseQuestionCardProps = {
  statement: string;
  image: string;
  selectedAnswer: Answer | null;
  correctAnswer: Answer;
  explanation: string;
  disabled?: boolean;
  onAnswer: (answer: Answer) => void;
};

export default function TrueFalseQuestionCard({
  statement,
  image,
  selectedAnswer,
  correctAnswer,
  explanation,
  disabled = false,
  onAnswer,
}: TrueFalseQuestionCardProps) {
  const hasAnswered = selectedAnswer !== null;

  const isCorrect =
    selectedAnswer !== null &&
    selectedAnswer === correctAnswer;

  const getButtonClasses = (
    answer: Answer,
  ) => {
    const isSelected =
      selectedAnswer === answer;

    if (!hasAnswered) {
      return `
        border-slate-200
        bg-white
        text-slate-800
        shadow-sm
        hover:-translate-y-1
        hover:border-slate-300
        hover:shadow-lg
      `;
    }

    if (answer === correctAnswer) {
      return `
        border-emerald-400
        bg-emerald-50
        text-emerald-800
        shadow-md
      `;
    }

    if (isSelected && answer !== correctAnswer) {
      return `
        border-red-400
        bg-red-50
        text-red-800
        shadow-md
      `;
    }

    return `
      border-slate-200
      bg-slate-50
      text-slate-400
      opacity-60
    `;
  };

  return (
    <div className="w-full">
      {/* =====================================================
          IMAGE + QUESTION
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-8
          lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.5fr)]
          lg:items-center
        "
      >
        {/* ===================================================
            IMAGE
        ==================================================== */}

        <motion.div
          key={image}
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            flex
            items-center
            justify-center
          "
        >
          <img
            src={image}
            alt=""
            className="
              max-h-[240px]
              max-w-full
              rounded-2xl
              object-contain
              shadow-md
              sm:max-h-[280px]
              lg:max-h-[320px]
            "
          />
        </motion.div>

        {/* ===================================================
            QUESTION + RÉPONSES
        ==================================================== */}

        <div className="flex min-w-0 flex-col">
          {/* =================================================
              AFFIRMATION
          ================================================== */}

          <motion.div
            key={statement}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
              relative
              mb-6
              flex
              min-h-[180px]
              items-center
              overflow-hidden
              rounded-3xl
              bg-white
              px-6
              py-8
              text-center
              sm:px-10
              sm:py-10
            "
          >
            <div className="relative w-full">
              <p
                className="
                  mx-auto
                  max-w-3xl
                  text-xl
                  font-bold
                  leading-relaxed
                  text-slate-900
                  sm:text-2xl
                  md:text-3xl
                "
              >
                {statement}
              </p>
            </div>
          </motion.div>

          {/* =================================================
              RÉPONSES
          ================================================== */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* VRAI */}

            <motion.button
              type="button"
              disabled={disabled || hasAnswered}
              onClick={() => onAnswer("true")}
              whileHover={
                !disabled && !hasAnswered
                  ? {
                      scale: 1.02,
                    }
                  : undefined
              }
              whileTap={
                !disabled && !hasAnswered
                  ? {
                      scale: 0.98,
                    }
                  : undefined
              }
              className={`
                group
                relative
                min-h-[100px]
                overflow-hidden
                rounded-2xl
                border-2
                px-6
                py-6
                transition-all
                duration-300
                ${getButtonClasses("true")}
              `}
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-4
                "
              >
                <span
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-100
                    text-xl
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                >
                  ✓
                </span>

                <span className="text-lg font-extrabold">
                  VRAI
                </span>
              </div>
            </motion.button>

            {/* FAUX */}

            <motion.button
              type="button"
              disabled={disabled || hasAnswered}
              onClick={() => onAnswer("false")}
              whileHover={
                !disabled && !hasAnswered
                  ? {
                      scale: 1.02,
                    }
                  : undefined
              }
              whileTap={
                !disabled && !hasAnswered
                  ? {
                      scale: 0.98,
                    }
                  : undefined
              }
              className={`
                group
                relative
                min-h-[100px]
                overflow-hidden
                rounded-2xl
                border-2
                px-6
                py-6
                transition-all
                duration-300
                ${getButtonClasses("false")}
              `}
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-4
                "
              >
                <span
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-red-100
                    text-xl
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                >
                  ✕
                </span>

                <span className="text-lg font-extrabold">
                  FAUX
                </span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* =====================================================
          FEEDBACK
      ====================================================== */}

      {hasAnswered && (
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
          className="mt-6"
        >
          <div
            className={`
              overflow-hidden
              rounded-2xl
              border
              px-5
              py-5
              sm:px-6
              ${
                isCorrect
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-red-200 bg-red-50"
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-lg
                  font-bold
                  ${
                    isCorrect
                      ? "bg-emerald-500 text-white"
                      : "bg-red-500 text-white"
                  }
                `}
              >
                {isCorrect ? "✓" : "!"}
              </div>

              <div className="min-w-0">
                <p
                  className={`
                    text-base
                    font-extrabold
                    ${
                      isCorrect
                        ? "text-emerald-800"
                        : "text-red-800"
                    }
                  `}
                >
                  {isCorrect
                    ? "Bonne réponse !"
                    : "Pas tout à fait…"}
                </p>

                {!isCorrect && (
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    La bonne réponse est{" "}
                    <span className="font-extrabold">
                      {correctAnswer === "true"
                        ? "VRAI"
                        : "FAUX"}
                    </span>
                    .
                  </p>
                )}

                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {explanation}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}