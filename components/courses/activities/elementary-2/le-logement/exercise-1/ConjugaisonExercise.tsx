
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

type Speaker = "Papa" | "Maman" | "Pierre" | "Narration";

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
      infinitive: string;
    };

type DialogueLine = {
  speaker: Speaker;
  parts: DialoguePart[];
};

const dialogueLines: DialogueLine[] = [
  {
    speaker: "Papa",
    parts: [
      {
        type: "text",
        value: "« Ça y est, j’ai peut-être trouvé quelque chose ! »",
      },
    ],
  },
  {
    speaker: "Narration",
    parts: [
      {
        type: "text",
        value: "Annonce papa en arrivant à la maison. ",
      },
      {
        type: "text",
        value: "Papa et maman ",
      },
      {
        type: "input",
        id: "gap-1",
        answer: "travaillent",
        hint: "travailler (présent)",
        infinitive: "travailler",
      },
      {
        type: "text",
        value:
          " loin. Tous les jours, ils partent en train de bonne heure et ",
      },
      {
        type: "input",
        id: "gap-2",
        answer: "rentrent",
        hint: "rentrer (présent)",
        infinitive: "rentrer",
      },
      {
        type: "text",
        value: " tard, fatigués. Alors papa et maman ",
      },
      {
        type: "input",
        id: "gap-3",
        answer: "ont décidé",
        hint: "décider (passé composé)",
        infinitive: "décider",
      },
      {
        type: "text",
        value: " d’aller habiter en ville.",
      },
    ],
  },
  {
    speaker: "Maman",
    parts: [
      {
        type: "text",
        value: "« Qu’est-ce que tu ",
      },
      {
        type: "input",
        id: "gap-4",
        answer: "as trouvé",
        hint: "trouver (passé composé)",
        infinitive: "trouver",
      },
      {
        type: "text",
        value: " ? »",
      },
    ],
  },
  {
    speaker: "Narration",
    parts: [
      {
        type: "text",
        value: "Demande maman.",
      },
    ],
  },
  {
    speaker: "Papa",
    parts: [
      {
        type: "text",
        value:
          "« J’ai trouvé un appartement près de ton travail. C’est dans un immeuble de six étages. Au second, il y a trois chambres et c’est clair. »",
      },
    ],
  },
  {
    speaker: "Narration",
    parts: [
      {
        type: "text",
        value: "Maman écoute avec attention. Elle ",
      },
      {
        type: "input",
        id: "gap-5",
        answer: "demande",
        hint: "demander (présent)",
        infinitive: "demander",
      },
      {
        type: "text",
        value: " à papa :",
      },
    ],
  },
  {
    speaker: "Maman",
    parts: [
      {
        type: "text",
        value: "« Quand pourrons-nous le visiter ? »",
      },
    ],
  },
  {
    speaker: "Papa",
    parts: [
      {
        type: "text",
        value: "« On ",
      },
      {
        type: "input",
        id: "gap-6",
        answer: "pourra",
        hint: "pouvoir (futur)",
        infinitive: "pouvoir",
      },
      {
        type: "text",
        value:
          " aller le voir samedi. Il sera libre dans un mois. Samedi, nous nous déciderons. »",
      },
    ],
  },
  {
    speaker: "Narration",
    parts: [
      {
        type: "text",
        value: "La petite sœur de Pierre ne ",
      },
      {
        type: "input",
        id: "gap-7",
        answer: "sait",
        hint: "savoir (présent)",
        infinitive: "savoir",
      },
      {
        type: "text",
        value:
          " pas encore parler. Elle les regarde tous sans comprendre. Alors Pierre lui dit :",
      },
    ],
  },
  {
    speaker: "Pierre",
    parts: [
      {
        type: "text",
        value:
          "« On va peut-être aller dans une nouvelle maison. Toi aussi, tu ",
      },
      {
        type: "input",
        id: "gap-8",
        answer: "auras",
        hint: "avoir (futur)",
        infinitive: "avoir",
      },
      {
        type: "text",
        value: " ta chambre. »",
      },
    ],
  },
];

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

const SPEAKER_STYLES: Record<Speaker, string> = {
  Papa: "bg-blue-100 text-blue-800",
  Maman: "bg-pink-100 text-pink-800",
  Pierre: "bg-amber-100 text-amber-800",
  Narration: "bg-slate-100 text-slate-600",
};

const normalize = (value: string) =>
  value
    .trim()
    .toLocaleLowerCase("fr-FR")
    .replace(/[’‘`ʼ]/g, "'")
    .replace(/\s+/g, " ");

type Gap = Extract<DialoguePart, { type: "input" }>;

const displayedGaps: Gap[] = dialogueLines.flatMap((line) =>
  line.parts.filter((part): part is Gap => part.type === "input"),
);

type ExerciseTransitionProps = {
  number: number;
};

function ExerciseTransition({
  number,
}: ExerciseTransitionProps) {
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

export default function ConjugaisonExercise({
  onComplete,
}: ConjugaisonExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [copiedCharacter, setCopiedCharacter] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);
  const [startedAt] = useState(() => new Date());

  const allFieldsFilled = displayedGaps.every(
    (gap) => (answers[gap.id] ?? "").trim().length > 0,
  );

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

  /**
   * Construit un énoncé individuel pour chaque réponse.
   *
   * Le trou correspondant à la question est remplacé
   * par un emplacement vide.
   *
   * Les autres trous sont remplacés par leurs réponses attendues.
   */
  const buildQuestion = (
    line: DialogueLine,
    targetGapId: string,
  ): string => {
    const lineText = line.parts
      .map((part) => {
        if (part.type === "text") {
          return part.value;
        }

        return part.id === targetGapId
          ? "________"
          : part.answer;
      })
      .join("");

    const prefix =
      line.speaker === "Narration"
        ? "Narration : "
        : `${line.speaker} : `;

    return `${prefix}${lineText}`.trim();
  };

  /**
   * Construit l'historique individuel et la présentation
   * complète du dialogue.
   *
   * Les réponses restent indépendantes pour le calcul du score.
   * La présentation groupée est stockée une seule fois.
   */
  const buildHistory = (): ExerciseHistoryItem[] => {
    const history: ExerciseHistoryItem[] = [];

    const questionIds = new Map<string, number>();

    let nextQuestionId = 0;

    // 1. Création des huit réponses individuelles.
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
          explanation: `Verbe à l'infinitif : ${gap.infinitive}. ${gap.hint}.`,
        });
      });
    });

    // 2. Création de la présentation complète du dialogue.
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

    // 3. Stockage unique de la présentation dans l'historique.
    if (history.length > 0) {
      history[0] = {
        ...history[0],
        presentation,
      };
    }

    return history;
  };

  const handleValidate = () => {
    if (validated) return;

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

  const copyCharacter = async (character: string) => {
    if (validated) return;

    setCopyError(false);

    try {
      await navigator.clipboard.writeText(character);
      setCopiedCharacter(character);
    } catch {
      setCopiedCharacter(null);
      setCopyError(true);
    }
  };

  return (
    <div
      id="exercise-1-content"
      className="w-full min-w-0 scroll-mt-10"
    >
      {/* TRANSITION */}
      <ExerciseTransition number={1} />

      {/* CARTE DE L'EXERCICE */}
      <div className="w-full min-w-0">
        <div className="container">
          <div className="mx-auto w-full min-w-0">
            <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#dcebdd] bg-white p-4 shadow-sm sm:p-6 lg:p-8">
              {/* EN-TÊTE */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#31572C]">
                    Exercice 1
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#102744]">
                    Le nouveau logement
                  </h2>
                </div>

                <span className="rounded-full bg-[#edf5e9] px-4 py-2 text-sm font-semibold text-[#31572C]">
                  {displayedGaps.length} verbes à compléter
                </span>
              </div>

              {/* VERBES À UTILISER */}
              <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
                <p className="mb-3 text-sm font-semibold text-amber-900">
                  Verbes à utiliser :
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Travailler (présent)",
                    "Rentrer (présent)",
                    "Décider (passé composé)",
                    "Trouver (passé composé)",
                    "Demander (présent)",
                    "Pouvoir (futur)",
                    "Savoir (présent)",
                    "Avoir (futur)",
                  ].map((verb) => (
                    <span
                      key={verb}
                      className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm font-semibold text-amber-800 shadow-sm"
                    >
                      {verb}
                    </span>
                  ))}
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
                      onClick={() => copyCharacter(character)}
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

              {/* DIALOGUE ET NARRATION */}
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
                        {/* IDENTIFICATION DE L'INTERLOCUTEUR */}
                        <div>
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${SPEAKER_STYLES[line.speaker]}`}
                          >
                            {line.speaker}
                          </span>
                        </div>

                        {/* TEXTE */}
                        <p
                          className={`break-words leading-8 ${
                            isNarration
                              ? "text-[15px] italic leading-8 text-slate-600"
                              : "text-slate-800"
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

                            const selectedAnswer = answers[part.id] ?? "";

                            const isCorrect =
                              normalize(selectedAnswer) ===
                              normalize(part.answer);

                            return (
                              <span
                                key={part.id}
                                className="inline-flex max-w-full flex-wrap items-center gap-1 align-middle"
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
                                  aria-label={`Réponse pour ${part.hint}`}
                                  autoComplete="off"
                                  spellCheck={false}
                                  className={`mx-1 inline-block min-w-0 max-w-full rounded-lg border px-3 py-1 text-center font-semibold outline-none transition-colors focus:ring-2 disabled:cursor-not-allowed disabled:opacity-80 ${
                                    validated
                                      ? isCorrect
                                        ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                        : "border-red-300 bg-red-50 text-red-700"
                                      : "border-amber-300 bg-white text-[#102744] focus:border-[#31572C] focus:ring-emerald-100"
                                  }`}
                                  style={{
                                    width: `${Math.max(
                                      110,
                                      Math.min(
                                        220,
                                        (part.answer.length + 3) * 10,
                                      ),
                                    )}px`,
                                  }}
                                />

                                {validated && !isCorrect && (
                                  <span className="rounded bg-emerald-100 px-2 py-1 text-sm font-bold text-emerald-700">
                                    {part.answer}
                                  </span>
                                )}
                              </span>
                            );
                          })}
                        </p>

                        {/* INDICES DES VERBES */}
                        {!validated && (
                          <div className="flex flex-wrap gap-2">
                            {line.parts
                              .filter(
                                (part): part is Gap => part.type === "input",
                              )
                              .map((part) => (
                                <span
                                  key={part.id}
                                  className="text-xs italic text-slate-500"
                                >
                                  {part.hint}
                                </span>
                              ))}
                          </div>
                        )}
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

              {/* VALIDATION */}
              {!validated && (
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    disabled={!allFieldsFilled}
                    onClick={handleValidate}
                    className="rounded-xl bg-[#31572C] px-7 py-3 font-bold text-white shadow-md transition hover:bg-[#254522] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Vérifier mes réponses
                  </button>
                </div>
              )}

              {!validated && (
                <p className="mt-3 text-center text-xs text-slate-500">
                  {allFieldsFilled
                    ? "Tous les champs sont remplis : tu peux vérifier tes réponses."
                    : "Complète les huit champs pour activer le bouton."}
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
