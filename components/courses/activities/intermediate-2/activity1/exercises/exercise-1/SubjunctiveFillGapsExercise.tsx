
"use client";

import { useState } from "react";
import Image from "next/image";

import {
  dialogueLines,
  subjunctiveFillGapsData,
  type Speaker,
} from "./subjunctiveFillGapsData";

import FloatingAudioPlayer from "@/components/courses/layout/FloatingAudioPlayer";

import type {
  ExerciseSessionResult,
  ExerciseHistoryItem,
} from "@/components/courses/common/types/exerciseSessionTypes";

type Props = {
  onComplete?: (result: ExerciseSessionResult) => void;
};

const SPEAKER_IMAGES: Record<Speaker, { src: string; alt: string }> = {
  Alice: {
    src: "/images/courses/intermediate-2/activities/activity1/alice.png",
    alt: "Alice",
  },
  Martin: {
    src: "/images/courses/intermediate-2/activities/activity1/martin.png",
    alt: "Martin",
  },
};

const ACCENT_CHARACTERS = ["é", "è", "ê", "à", "ô", "ù", "û", "ï"];

function SpeakerPortrait({ speaker }: { speaker: Speaker }) {
  const portrait = SPEAKER_IMAGES[speaker];

  return (
    <div className="flex w-28 shrink-0 flex-col items-center gap-1 sm:w-32">
      <Image
        src={portrait.src}
        alt={portrait.alt}
        width={96}
        height={76}
        className="h-[76px] w-24 object-contain"
      />

      <span className="text-sm font-bold text-[#00296B]">
        {speaker}
      </span>
    </div>
  );
}

export default function SubjunctiveFillGapsExercise({
  onComplete,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [copiedCharacter, setCopiedCharacter] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);
  const [startedAt] = useState(() => new Date());

  const normalize = (value: string) =>
    value
      .trim()
      .toLocaleLowerCase("fr-FR")
      .replace(/[’‘`ʼ]/g, "'")
      .replace(/\s+/g, " ");

  const activeGaps = subjunctiveFillGapsData.filter(
    (item) => item.answer.trim() !== "",
  );

  const getMatchingGap = (line: (typeof dialogueLines)[number]) =>
    activeGaps.find(
      (item) =>
        item.speaker === line.speaker &&
        line.text.includes(item.before),
    );

  const displayedGaps = dialogueLines.flatMap((line) => {
    const matchingGap = getMatchingGap(line);
    return matchingGap ? [matchingGap] : [];
  });

  const allDisplayedFieldsFilled =
    displayedGaps.length > 0 &&
    displayedGaps.every(
      (item) => (answers[item.id] ?? "").trim().length > 0,
    );

  const score = displayedGaps.reduce(
    (total, item) =>
      total +
      (normalize(answers[item.id] ?? "") === normalize(item.answer) ? 1 : 0),
    0,
  );

  const scorePercentage =
    displayedGaps.length > 0
      ? Math.round((score / displayedGaps.length) * 100)
      : 0;

  const handleValidate = () => {
    if (validated) return;

    if (!allDisplayedFieldsFilled) {
      setValidationMessage(
        "Complète tous les champs du dialogue avant de vérifier tes réponses.",
      );
      return;
    }

    const finishedAt = new Date();

    // L'historique contient toutes les répliques du dialogue.
    // Les répliques sans champ ont questionId = 0.
    // Les champs à compléter conservent leur numéro interne pour la correction.
    const history: ExerciseHistoryItem[] = dialogueLines.map((line) => {
      const matchingGap = getMatchingGap(line);

      if (!matchingGap) {
        return {
          questionId: 0,
          question: `[[DIALOGUE]]${line.speaker} : ${line.text}`,
          selectedAnswer: "",
          correctAnswer: "",
          isCorrect: true,
          explanation: "",
        };
      }

      const gapQuestionId =
        displayedGaps.findIndex(
          (item) => item.id === matchingGap.id,
        ) + 1;

      const selectedAnswer = (
        answers[matchingGap.id] ?? ""
      ).trim();

      const isCorrect =
        normalize(selectedAnswer) === normalize(matchingGap.answer);

      // On place un marqueur à l'endroit exact du champ.
      const dialogueText = line.text.replace(
        matchingGap.before,
        `${matchingGap.before}[[ANSWER:${gapQuestionId}]]`,
      );

      return {
        questionId: gapQuestionId,
        question: `[[DIALOGUE]]${line.speaker} : ${dialogueText}`,
        selectedAnswer,
        correctAnswer: matchingGap.answer,
        isCorrect,
        explanation: `Verbe à l'infinitif : ${matchingGap.infinitive}. Après « il faut que », on utilise le subjonctif présent.`,
      };
    });

    const result: ExerciseSessionResult = {
      score: scorePercentage,
      correctAnswers: score,
      totalQuestions: displayedGaps.length,
      history,
      startedAt,
      finishedAt,
      duration: Math.max(
        0,
        Math.round((finishedAt.getTime() - startedAt.getTime()) / 1000),
      ),
    };

    setValidationMessage("");
    setValidated(true);

    onComplete?.(result);
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
    <>
      <div className="w-full min-w-0">
        <div className="container">
          <div className="mx-auto w-full min-w-0 space-y-6">
            <div className="w-full min-w-0 rounded-2xl border border-[#d9e2f0] bg-white p-5 shadow-sm sm:p-8">
              {/* EN-TÊTE */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#00296B]">
                    Exercice 1
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#102744]">
                    Un dialogue à couteaux tirés
                  </h2>
                </div>

                <span className="rounded-full bg-[#edf3fc] px-4 py-2 text-sm font-semibold text-[#00296B]">
                  {displayedGaps.length} verbes à compléter
                </span>
              </div>

              {/* CLAVIER VIRTUEL DES ACCENTS */}
              <div className="mb-6 rounded-xl border border-[#DDD6FE] bg-[#F5F0FF] p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[#4C1D95]">
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
                      className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-base font-bold shadow-sm transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${
                        copiedCharacter === character
                          ? "scale-105 border-emerald-400 bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200"
                          : "border-[#DDD6FE] bg-white text-[#4C1D95] hover:border-[#7C3AED] hover:bg-[#EDE9FE]"
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
              <div className="w-full min-w-0 space-y-4">
                {dialogueLines.map((line, index) => {
                  const matchingGap = getMatchingGap(line);

                  const beforeGapIndex = matchingGap
                    ? line.text.indexOf(matchingGap.before)
                    : -1;

                  const textBeforeGap =
                    matchingGap && beforeGapIndex >= 0
                      ? line.text.slice(0, beforeGapIndex)
                      : "";

                  return (
                    <div
                      key={`${line.speaker}-${index}`}
                      className="w-full min-w-0 rounded-xl border border-slate-200 bg-[#fcfcfd] p-4 sm:p-5"
                    >
                      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start">
                        <SpeakerPortrait speaker={line.speaker} />

                        <div className="min-w-0 flex-1">
                          <p className="break-words leading-8 text-slate-800">
                            <span className="font-bold text-[#102744]">
                              {line.speaker} :
                            </span>{" "}

                            {matchingGap ? (
                              <>
                                {textBeforeGap}
                                {matchingGap.before}{" "}

                                <input
                                  type="text"
                                  value={answers[matchingGap.id] ?? ""}
                                  disabled={validated}
                                  onChange={(event) => {
                                    const value = event.target.value;

                                    setAnswers((previous) => ({
                                      ...previous,
                                      [matchingGap.id]: value,
                                    }));

                                    setValidationMessage("");
                                  }}
                                  aria-label={`Compléter la réplique de ${line.speaker}`}
                                  autoComplete="off"
                                  spellCheck={false}
                                  className="mx-1 inline-block min-w-28 max-w-full rounded-lg border border-amber-300 bg-white px-3 py-1 text-center font-semibold text-[#102744] outline-none transition-colors focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 disabled:cursor-not-allowed disabled:opacity-70"
                                />

                                {matchingGap.after}
                              </>
                            ) : (
                              line.text
                            )}
                          </p>

                          {matchingGap && (
                            <p className="mt-3 text-sm italic text-slate-500">
                              Verbe : {matchingGap.infinitive}
                            </p>
                          )}
                        </div>
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
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  disabled={!allDisplayedFieldsFilled || validated}
                  onClick={handleValidate}
                  className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-7 py-3 font-bold text-white shadow-md transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
                >
                  Vérifier mes réponses
                </button>
              </div>

              {!validated && (
                <p className="mt-3 text-center text-xs text-slate-500">
                  {allDisplayedFieldsFilled
                    ? "Tous les champs sont remplis : tu peux valider."
                    : "Remplis chaque champ pour activer le bouton."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LECTEUR AUDIO FLOTTANT */}
      <FloatingAudioPlayer
        audioSrc="/audios/courses/intermediate-2/activities/activity1/dispute.mp3"
        imageSrc="/images/courses/intermediate-2/activities/activity1/alice-martin.png"
        imageAlt="Illustration du dialogue entre Alice et Martin"
        title="Alice et Martin"
        hint="Écoute attentivement leur dispute et complète les phrases avec les verbes au subjonctif."
      />
    </>
  );
}
