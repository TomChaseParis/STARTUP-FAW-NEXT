"use client";

type ExerciseInstructionProps = {
  number: number;
  title: string;
  description?: string;
  instruction: string;
  image?: string;
  imageAlt?: string;
  advice?: string;
  isStarted?: boolean;
  onStart?: () => void;
  buttonLabel?: string;
};

export default function ExerciseInstruction({
  number,
  title,
  description,
  instruction,
  image,
  imageAlt = "",
  advice,
  isStarted = false,
  onStart,
  buttonLabel = "Lancer l'exercice",
}: ExerciseInstructionProps) {
  return (
    <section className="container mt-16">
      <div className="relative mx-auto max-w-5xl">
        {/* =====================================================
            SIGNALÉTIQUE EXERCICE
        ===================================================== */}

        <div className="absolute -left-4 -top-5 z-20 sm:-left-5">
          <div className="rotate-[-5deg] rounded-xl border border-slate-100 bg-white px-5 py-3 shadow-[0_8px_25px_rgba(15,23,42,0.12)]">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
              Exercice {number}
            </span>

            <div className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-amber-400" />
          </div>
        </div>

        {/* =====================================================
            CARTE PRINCIPALE
        ===================================================== */}

        <div className="overflow-hidden rounded-[28px] border border-amber-300 bg-gradient-to-br from-[#fffdf7] via-[#fffdf9] to-[#faf8ef] shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="px-7 py-9 sm:px-10 sm:py-10">
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                {/* SIGNALÉTIQUE */}

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />

                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
                    Avant de commencer
                  </span>
                </div>

                {/* TITRE */}

                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  {title}
                </h2>

                {/* DESCRIPTION */}

                {description && (
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                )}
              </div>

              {/* IMAGE */}

              {image && (
                <div className="flex shrink-0 justify-center sm:justify-end">
                  <img
                    src={image}
                    alt={imageAlt}
                    className="h-24 w-24 object-contain sm:h-28 sm:w-28"
                  />
                </div>
              )}
            </div>

            {/* =================================================
                SÉPARATEUR
            ================================================= */}

            <div className="mt-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />

              <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* =================================================
                CONSIGNE
            ================================================= */}

            <div className="mt-5 rounded-xl border border-slate-200/80 bg-white/70 px-5 py-4 shadow-sm">
              <p className="border-l-2 border-amber-400 pl-4 text-sm leading-6 text-slate-800 sm:text-[15px]">
                {instruction}
              </p>
            </div>

            {/* =================================================
                CONSEIL OPTIONNEL
            ================================================= */}

            {advice && (
              <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50/70 px-5 py-3">
                <p className="text-sm font-medium leading-6 text-amber-800">
                  💡 {advice}
                </p>
              </div>
            )}

            {/* =================================================
                ZONE PRÊT
            ================================================= */}

            <div className="mt-7">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-slate-400">
                  Prêt ?
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* =================================================
                  BOUTON
              ================================================= */}

              {!isStarted && onStart && (
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={onStart}
                    className="group inline-flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-5 py-3.5 text-sm font-extrabold text-slate-900 shadow-[0_10px_25px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(15,23,42,0.14)]"
                  >
                    <span>{buttonLabel}</span>

                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-sm font-black text-slate-900 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              )}

              {/* =================================================
                  ÉTAT EXERCICE EN COURS
              ================================================= */}

              {isStarted && (
                <div className="mt-4 flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />

                    Exercice en cours
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}