
"use client";

import { useState } from "react";

import type {
  ExerciseSessionResult,
  ExerciseHistoryItem,
  ExerciseHistoryPresentation,
} from "@/components/courses/common/types/exerciseSessionTypes";

type ConjugaisonExerciseProps = {
  onComplete: (result: ExerciseSessionResult) => void;
};

type Speaker = "La dame" | "Pierre" | "Narration";

type DialoguePart =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "input";
      id: string;
      answer: string;
      hint: string;
    };

type DialogueLine = {
  speaker: Speaker;
  parts: DialoguePart[];
};

type Gap = Extract<DialoguePart, { type: "input" }>;

/* ========================================================= */
/* DIALOGUE                                                   */
/* ========================================================= */

const dialogueLines: DialogueLine[] = [
  {
    speaker: "Narration",
    parts: [
      {
        type: "text",
        value: "Dans la rue du Lac, on remarque facilement l’",
      },
      {
        type: "input",
        id: "gap-1",
        answer: "immeuble",
        hint: "Nom masculin",
      },
      {
        type: "text",
        value: " neuf. Pierre est étonné : que de ",
      },
      {
        type: "input",
        id: "gap-2",
        answer: "fenêtres",
        hint: "Nom féminin pluriel",
      },
      {
        type: "text",
        value: " !",
      },
    ],
  },
  {
    speaker: "Narration",
    parts: [
      {
        type: "text",
        value: "Une dame les attend pour la visite. Maman appelle l’",
      },
      {
        type: "input",
        id: "gap-3",
        answer: "ascenseur",
        hint: "Nom masculin",
      },
      {
        type: "text",
        value:
          ". Toute la famille monte jusqu’au deuxième étage. La dame ouvre une ",
      },
      {
        type: "input",
        id: "gap-4",
        answer: "porte",
        hint: "Nom féminin",
      },
      {
        type: "text",
        value: " et dit :",
      },
    ],
  },
  {
    speaker: "La dame",
    parts: [
      {
        type: "text",
        value: "« Voilà la ",
      },
      {
        type: "input",
        id: "gap-5",
        answer: "cuisine",
        hint: "Nom féminin",
      },
      {
        type: "text",
        value: " et son ",
      },
      {
        type: "input",
        id: "gap-6",
        answer: "balcon",
        hint: "Nom masculin",
      },
      {
        type: "text",
        value: ", la salle à manger et le salon, la ",
      },
      {
        type: "input",
        id: "gap-7",
        answer: "salle de bain",
        hint: "Nom féminin",
      },
      {
        type: "text",
        value: ", les ",
      },
      {
        type: "input",
        id: "gap-8",
        answer: "toilettes",
        hint: "Nom féminin pluriel",
      },
      {
        type: "text",
        value: ", les trois chambres. »",
      },
    ],
  },
  {
    speaker: "Narration",
    parts: [
      {
        type: "text",
        value: "Pierre demande à papa :",
      },
    ],
  },
  {
    speaker: "Pierre",
    parts: [
      {
        type: "text",
        value: "« Où sera ma ",
      },
      {
        type: "input",
        id: "gap-9",
        answer: "chambre",
        hint: "Nom féminin",
      },
      {
        type: "text",
        value: " ? Je voudrais bien la bleue. »",
      },
    ],
  },
  {
    speaker: "Narration",
    parts: [
      {
        type: "text",
        value: "La dame continue :",
      },
    ],
  },
  {
    speaker: "La dame",
    parts: [
      {
        type: "text",
        value: "« En bas, vous avez un ",
      },
      {
        type: "input",
        id: "gap-10",
        answer: "jardin",
        hint: "Nom masculin",
      },
      {
        type: "text",
        value: " avec des jeux pour les enfants. Le ",
      },
      {
        type: "input",
        id: "gap-11",
        answer: "centre commercial",
        hint: "Nom masculin",
      },
      {
        type: "text",
        value: " est à cinq minutes, tout près de l’école. »",
      },
    ],
  },
];

/* ========================================================= */
/* CLAVIER DES ACCENTS                                        */
/* ========================================================= */

const ACCENT_CHARACTERS = [
  "é",
  "è",
  "ê",
  "à",
  "â",
  "ô",
  "ù",
  "û",
  "ï",
  "î",
  "ç",
];

/* ========================================================= */
/* STYLES DES LOCUTEURS                                       */
/* ========================================================= */

const SPEAKER_STYLES: Record<Speaker, string> = {
  "La dame": "bg-pink-100 text-pink-800",
  Pierre: "bg-amber-100 text-amber-800",
  Narration: "bg-slate-100 text-slate-600",
};

/* ========================================================= */
/* NORMALISATION                                              */
/* ========================================================= */

const normalize = (value: string) =>
  value
    .trim()
    .toLocaleLowerCase("fr-FR")
    .replace(/[’‘`ʼ]/g, "'")
    .replace(/\s+/g, " ");

/* ========================================================= */
/* CHAMPS À COMPLÉTER                                         */
/* ========================================================= */

const displayedGaps: Gap[] = dialogueLines.flatMap((line) =>
  line.parts.filter((part): part is Gap => part.type === "input"),
);

/* ========================================================= */
/* TRANSITION                                                 */
/* ========================================================= */

type ExerciseTransitionProps = {
  number: number;
};

function ExerciseTransition({ number }: ExerciseTransitionProps) {
  return (
    <div
      className="relative z-10 flex h-[120px] w-full items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      <div
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          left-1/2
          w-0
          -translate-x-1/2
          border-l-2
          border-dashed
          border-[rgb(49,87,44)]
        "
      />

      <span
        className="
          relative
          z-10
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          border-2
          border-white
          bg-[rgb(49,87,44)]
          text-base
          font-extrabold
          text-white
          shadow-[0_2px_8px_rgba(49,87,44,0.25)]
          ring-1
          ring-[rgb(87,204,153)]
        "
      >
        {number}
      </span>
    </div>
  );
}

/* ========================================================= */
/* COMPOSANT PRINCIPAL                                        */
/* ========================================================= */

export default function ConjugaisonExercise2({
  onComplete,
}: ConjugaisonExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [copiedCharacter, setCopiedCharacter] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);
  const [startedAt] = useState(() => new Date());

  /* ========================================================= */
  /* PROGRESSION ET SCORE                                      */
  /* ========================================================= */

  const allFieldsFilled = displayedGaps.every(
    (gap) => (answers[gap.id] ?? "").trim().length > 0,
  );

  const answeredCount = displayedGaps.filter(
    (gap) => (answers[gap.id] ?? "").trim().length > 0,
  ).length;

  const score = displayedGaps.reduce(
    (total, gap) =>
      total +
      (normalize(answers[gap.id] ?? "") === normalize(gap.answer) ? 1 : 0),
    0,
  );

  const scorePercentage =
    displayedGaps.length > 0
      ? Math.round((score / displayedGaps.length) * 100)
      : 0;

  /* ========================================================= */
  /* CONSTRUCTION D'UNE QUESTION INDIVIDUELLE                  */
  /* ========================================================= */

  const buildQuestion = (
    line: DialogueLine,
    targetGapId: string,
  ): string => {
    const lineText = line.parts
      .map((part) => {
        if (part.type === "text") {
          return part.value;
        }

        return part.id === targetGapId ? "________" : part.answer;
      })
      .join("");

    const prefix =
      line.speaker === "Narration"
        ? "Narration : "
        : `${line.speaker} : `;

    return `${prefix}${lineText}`.trim();
  };

  /* ========================================================= */
  /* CONSTRUCTION DE L'HISTORIQUE                              */
  /* ========================================================= */

  const buildHistory = (): ExerciseHistoryItem[] => {
    const history: ExerciseHistoryItem[] = [];

    const questionIds = new Map<string, number>();

    let nextQuestionId = 0;

    // 1. Création des onze réponses individuelles.

    dialogueLines.forEach((line) => {
      const lineGaps = line.parts.filter(
        (part): part is Gap => part.type === "input",
      );

      lineGaps.forEach((gap) => {
        nextQuestionId += 1;

        const questionId = nextQuestionId;

        questionIds.set(gap.id, questionId);

        const selectedAnswer = (answers[gap.id] ?? "").trim();

        const isCorrect =
          normalize(selectedAnswer) === normalize(gap.answer);

        history.push({
          questionId,
          question: buildQuestion(line, gap.id),
          selectedAnswer,
          correctAnswer: gap.answer,
          isCorrect,
          explanation: gap.hint,
        });
      });
    });

    // 2. Construction du dialogue complet.

    const presentation: ExerciseHistoryPresentation = {
      kind: "dialogue",
      lines: dialogueLines.map((line) => ({
        speaker: line.speaker,
        segments: line.parts.map((part) => {
          if (part.type === "text") {
            return {
              type: "text" as const,
              value: part.value,
            };
          }

          const questionId = questionIds.get(part.id);

          if (questionId === undefined) {
            throw new Error(
              `Identifiant de question introuvable pour ${part.id}.`,
            );
          }

          return {
            type: "answer" as const,
            questionId,
          };
        }),
      })),
    };

    // 3. Présentation stockée une seule fois dans l'historique.

    if (history.length > 0) {
      history[0] = {
        ...history[0],
        presentation,
      };
    }

    return history;
  };

  /* ========================================================= */
  /* VALIDATION                                                */
  /* ========================================================= */

  const handleValidate = () => {
    if (validated) {
      return;
    }

    if (!allFieldsFilled) {
      setValidationMessage(
        "Complète tous les champs du dialogue avant de vérifier tes réponses.",
      );
      return;
    }

    const finishedAt = new Date();

    const history = buildHistory();

    const result: ExerciseSessionResult = {
      score: scorePercentage,
      correctAnswers: score,
      totalQuestions: displayedGaps.length,
      history,
      startedAt,
      finishedAt,
      duration: Math.max(
        0,
        Math.round(
          (finishedAt.getTime() - startedAt.getTime()) / 1000,
        ),
      ),
    };

    setValidationMessage("");
    setValidated(true);

    onComplete(result);
  };

  /* ========================================================= */
  /* COPIE DES ACCENTS                                         */
  /* ========================================================= */

  const copyCharacter = async (character: string) => {
    if (validated) {
      return;
    }

    setCopyError(false);
    setCopiedCharacter(null);

    try {
      await navigator.clipboard.writeText(character);
      setCopiedCharacter(character);
    } catch {
      setCopyError(true);
    }
  };

  /* ========================================================= */
  /* RENDU                                                      */
  /* ========================================================= */

  return (
    <div
      id="exercise-3-content"
      className="w-full min-w-0 scroll-mt-10"
    >
      {/* TRANSITION */}

      <ExerciseTransition number={3} />

      {/* CARTE DE L'EXERCICE */}

      <div className="w-full min-w-0">
        <div className="container">
          <div className="mx-auto w-full min-w-0">
            <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#dcebdd] bg-white p-4 shadow-sm sm:p-6 lg:p-8">

              {/* EN-TÊTE */}

              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#31572C]">
                    Exercice 3
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#102744]">
                    Le déménagement
                  </h2>
                </div>

                <span className="rounded-full bg-[#edf5e9] px-4 py-2 text-sm font-semibold text-[#31572C]">
                  {displayedGaps.length} mots à compléter
                </span>
              </div>

              {/* PROGRESSION */}

              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between gap-3 text-sm text-slate-600">
                  <span>
                    Progression : {answeredCount} / {displayedGaps.length}
                  </span>

                  <span className="font-semibold text-[#31572C]">
                    {Math.round(
                      (answeredCount / displayedGaps.length) * 100,
                    )}%
                  </span>
                </div>

                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[#31572C] transition-all duration-500"
                    style={{
                      width: `${
                        (answeredCount / displayedGaps.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* CLAVIER DES ACCENTS */}

              <div className="mb-6 rounded-xl border border-[#dcebdd] bg-[#f5faf4] p-4 sm:p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[#31572C]">
                    Copier un accent
                  </p>

                  <span
                    className="text-xs text-slate-500"
                    aria-live="polite"
                  >
                    {copyError
                      ? "Copie impossible : vérifie les autorisations du navigateur."
                      : copiedCharacter
                        ? `« ${copiedCharacter} » copié !`
                        : "Clique sur un caractère pour le copier."}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {ACCENT_CHARACTERS.map((character) => (
                    <button
                      key={character}
                      type="button"
                      disabled={validated}
                      onClick={() => {
                        void copyCharacter(character);
                      }}
                      aria-label={`Copier le caractère ${character}`}
                      className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-base font-bold shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                        copiedCharacter === character
                          ? "border-emerald-400 bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200"
                          : "border-[#dcebdd] bg-white text-[#31572C] hover:bg-[#edf5e9]"
                      }`}
                    >
                      {character}
                    </button>
                  ))}
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  Clique sur un accent pour le copier, puis colle-le dans le
                  champ avec Ctrl + V ou ⌘ + V.
                </p>
              </div>

              {/* DIALOGUE */}

              <div className="w-full min-w-0 space-y-3">
                {dialogueLines.map((line, index) => {
                  const isNarration = line.speaker === "Narration";

                  return (
                    <div
                      key={`${line.speaker}-${index}`}
                      className={`w-full min-w-0 rounded-xl border p-3 sm:p-4 ${
                        isNarration
                          ? "border-slate-200 bg-slate-50/80"
                          : "border-slate-200 bg-[#fcfcfd]"
                      }`}
                    >
                      <div className="flex min-w-0 flex-col gap-3">

                        {/* LOCUTEUR */}

                        <div>
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${SPEAKER_STYLES[line.speaker]}`}
                          >
                            {line.speaker}
                          </span>
                        </div>

                        {/* TEXTE ET CHAMPS */}

                        <p
                          className={`break-words leading-8 ${
                            isNarration
                              ? "text-[15px] italic text-slate-600"
                              : "text-[16px] text-slate-800 sm:text-[17px]"
                          }`}
                        >
                          {line.parts.map((part, partIndex) => {
                            if (part.type === "text") {
                              return (
                                <span key={partIndex}>
                                  {part.value}
                                </span>
                              );
                            }

                            const selectedAnswer =
                              answers[part.id] ?? "";

                            const isCorrect =
                              normalize(selectedAnswer) ===
                              normalize(part.answer);

                            return (
                              <span
                                key={part.id}
                                className="mx-1 inline-flex max-w-full flex-col align-middle"
                              >
                                <input
                                  type="text"
                                  value={selectedAnswer}
                                  disabled={validated}
                                  onChange={(event) => {
                                    setAnswers((previous) => ({
                                      ...previous,
                                      [part.id]: event.target.value,
                                    }));

                                    setValidationMessage("");
                                  }}
                                  aria-label={`Réponse : ${part.hint}`}
                                  autoComplete="off"
                                  spellCheck={false}
                                  className={`h-10 w-full min-w-[100px] max-w-full rounded-lg border-2 bg-white px-3 text-center text-[15px] font-semibold outline-none transition sm:min-w-[130px] ${
                                    validated
                                      ? isCorrect
                                        ? "border-green-500 bg-green-50 text-green-800"
                                        : "border-red-500 bg-red-50 text-red-800"
                                      : "border-amber-300 text-slate-900 focus:border-[#31572C] focus:ring-2 focus:ring-emerald-100"
                                  }`}
                                  style={{
                                    width: `${Math.max(
                                      110,
                                      Math.min(
                                        240,
                                        (part.answer.length + 3) * 10,
                                      ),
                                    )}px`,
                                  }}
                                />

                                {validated && !isCorrect && (
                                  <span className="mt-1 text-center text-sm font-bold text-green-700">
                                    {part.answer}
                                  </span>
                                )}

                                {!validated && (
                                  <span className="mt-1 text-center text-xs italic text-amber-600">
                                    {part.hint}
                                  </span>
                                )}
                              </span>
                            );
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* MESSAGE DE VALIDATION */}

              {validationMessage && (
                <p
                  role="alert"
                  className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm font-medium text-amber-800"
                >
                  {validationMessage}
                </p>
              )}

              {/* BOUTON DE VALIDATION */}

              {!validated && (
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    disabled={!allFieldsFilled}
                    onClick={handleValidate}
                    className="
                      rounded-xl
                      bg-[#31572C]
                      px-7
                      py-3
                      font-bold
                      text-white
                      shadow-md
                      transition
                      hover:bg-[#254522]
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    Vérifier mes réponses
                  </button>
                </div>
              )}

              {!validated && (
                <p className="mt-3 text-center text-xs text-slate-500">
                  {allFieldsFilled
                    ? "Tous les champs sont remplis : tu peux vérifier tes réponses."
                    : `Complète les ${displayedGaps.length} champs pour activer le bouton.`}
                </p>
              )}

              {/* RÉSULTAT */}

              {validated && (
                <div className="mt-6 rounded-xl border border-[#dcebdd] bg-[#f5faf4] p-5 text-center">
                  <p className="text-sm font-semibold text-[#31572C]">
                    Résultat de ton exercice
                  </p>

                  <p className="mt-2 text-3xl font-extrabold text-[#31572C]">
                    {score} / {displayedGaps.length}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {scorePercentage}% de bonnes réponses
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
