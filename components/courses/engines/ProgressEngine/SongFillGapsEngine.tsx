"use client";

import { Fragment, useEffect, useRef } from "react";
import { Music2, Waves, CheckCircle2 } from "lucide-react";

import type { FillGapsData } from "@/types/fillGapsTypes";

import { useFillGapsEngine } from "@/hooks/useFillGapsEngine";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

type SongFillGapsEngineProps = {
  data: FillGapsData;
  teacherImage?: string;
  onComplete?: (result: ExerciseSessionResult) => void;
};

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .trim();

export default function SongFillGapsEngine({
  data,
  onComplete,
}: SongFillGapsEngineProps) {
  const {
    sentences,
    answers,
    setAnswer,
    showCorrection,
    checkAnswers,
    progress,
    totalInputs,
    answeredCount,
    allAnswered,
    session,
  } = useFillGapsEngine(data);

  const completionReportedRef = useRef(false);

  useEffect(() => {
    if (!session.isFinished) {
      completionReportedRef.current = false;
      return;
    }

    if (completionReportedRef.current) return;

    completionReportedRef.current = true;
    onComplete?.(session.result);
  }, [session.isFinished, session.result, onComplete]);

  const handleCheck = () => {
    if (!allAnswered) return;
    checkAnswers();
  };

  if (session.isFinished) {
    return null;
  }

  let globalInputIndex = 0;

  return (
    <section className="relative mt-8 overflow-hidden rounded-[28px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-cyan-50 px-4 py-6 shadow-[0_12px_40px_rgba(14,165,233,0.10)] sm:px-6 sm:py-8">
      {/* Décor musical */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-5 rotate-12 text-sky-100"
      >
        <Music2 size={150} strokeWidth={1} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -left-6 text-cyan-100"
      >
        <Waves size={150} strokeWidth={1} />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Progression */}
        <div className="mb-6 rounded-2xl border border-sky-100 bg-white/80 p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-slate-600">
              <Music2 size={15} className="mr-1 inline text-sky-500" />
              Tes paroles complétées
            </span>

            <span className="font-bold tabular-nums text-sky-700">
              {answeredCount}/{totalInputs}
            </span>
          </div>

          <div
            className="h-3 overflow-hidden rounded-full bg-sky-100"
            role="progressbar"
            aria-label="Progression de l’exercice"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Paroles : un seul bloc pour toutes les phrases */}
        <div className="rounded-[24px] border border-sky-100 bg-white/90 p-4 shadow-sm sm:p-6 md:p-8">
          <div className="mb-5 flex items-center gap-2 border-b border-sky-100 pb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
              <Music2 size={19} />
            </span>

            <div>
              <p className="font-bold text-slate-800">
                Les paroles de la chanson
              </p>
              <p className="text-xs text-slate-500">
                Complète chaque espace avec le bon verbe.
              </p>
            </div>
          </div>

          {/* Une seule carte intérieure, sans carte par phrase */}
          <div className="rounded-2xl bg-gradient-to-r from-sky-50/80 to-cyan-50/50 px-3 py-4 leading-[2.7] ring-1 ring-sky-100/80 sm:px-5 sm:py-5">
            {sentences.map((sentence, sentenceIndex) => (
              <Fragment key={sentence.id}>
                {sentenceIndex > 0 && (
                  <span className="whitespace-pre-line">{"\n\n"}</span>
                )}

                {sentence.parts.map((part, partIndex) => {
                  if (part.type === "text") {
                    return (
                      <span
                        key={`${sentence.id}-text-${partIndex}`}
                        className="whitespace-pre-line break-words text-[16px] font-medium leading-relaxed text-slate-700 sm:text-[17px]"
                      >
                        {part.value}
                      </span>
                    );
                  }

                  if (part.type === "dialogue") {
                    return (
                      <span
                        key={`${sentence.id}-dialogue-${partIndex}`}
                        className="whitespace-pre-line break-words font-semibold text-slate-700"
                      >
                        {part.value}
                      </span>
                    );
                  }

                  const inputIndex = globalInputIndex++;
                  const value = answers[inputIndex] || "";
                  const isCorrect =
                    normalizeText(value) === normalizeText(part.answer);

                  return (
                    <Fragment key={`${sentence.id}-input-${partIndex}`}>
                      <span className="mx-1 inline-flex max-w-full flex-col align-middle sm:mx-2">
                        <input
                          type="text"
                          aria-label={`Réponse ${inputIndex + 1}`}
                          value={value}
                          onChange={(event) =>
                            setAnswer(inputIndex, event.target.value)
                          }
                          disabled={showCorrection}
                          placeholder={part.hint || "…"}
                          autoComplete="off"
                          className={`h-10 w-[min(150px,42vw)] rounded-xl border-2 px-3 text-center text-sm font-bold shadow-sm outline-none transition placeholder:font-medium placeholder:italic placeholder:text-slate-400 sm:w-40 sm:text-base ${
                            showCorrection
                              ? isCorrect
                                ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                                : "border-rose-400 bg-rose-50 text-rose-800"
                              : "border-sky-200 bg-white text-slate-800 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                          }`}
                        />

                        {showCorrection && (
                          <span
                            className={`mt-1 flex items-center justify-center gap-1 text-xs font-bold ${
                              isCorrect
                                ? "text-emerald-700"
                                : "text-rose-600"
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 size={12} />
                                Bravo !
                              </>
                            ) : (
                              "À corriger"
                            )}
                          </span>
                        )}

                        {showCorrection && !isCorrect && (
                          <span className="mt-1 text-center text-xs font-semibold text-emerald-700">
                            Réponse : {part.answer}
                          </span>
                        )}
                      </span>
                    </Fragment>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Vérification */}
        <div className="mt-7 flex flex-col items-center gap-3">
          <p className="text-center text-sm text-slate-500">
            {allAnswered
              ? "Tous les espaces sont remplis. Tu peux vérifier tes réponses !"
              : `Il te reste ${totalInputs - answeredCount} réponse(s) à compléter.`}
          </p>

          <button
            type="button"
            onClick={handleCheck}
            disabled={!allAnswered || showCorrection}
            className="inline-flex min-h-12 w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-7 py-3 font-bold text-white shadow-lg shadow-sky-200 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-cyan-600 hover:shadow-xl disabled:translate-y-0 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-400 disabled:shadow-none"
          >
            <Music2 size={19} />
            Vérifier mes réponses
          </button>

          {showCorrection && (
            <p className="text-center text-sm font-medium text-sky-800">
              🎵 Tes réponses ont été vérifiées. Continue pour découvrir ton résultat !
            </p>
          )}
        </div>
      </div>
    </section>
  );
}