
"use client";

import { ReactNode, useState } from "react";

type LessonPageProps = {
  title: string;
  subtitle?: string;
  description?: string;
  videoSrc: string;
  poster?: string;
  quiz: ReactNode;
};

export default function LessonPage({
  title,
  subtitle,
  description,
  videoSrc,
  poster,
  quiz,
}: LessonPageProps) {
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleVideoEnded = () => {
    setVideoCompleted(true);
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById("lesson-quiz")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  };

  const handleReviewVideo = () => {
    setShowQuiz(false);

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#FCFCFC] pb-20 sm:pt-32">
      {/* =========================================================
          DÉCORATION DE FOND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[180px] h-[420px] w-[420px] rounded-full bg-amber-100/30 blur-3xl" />

        <div className="absolute right-[-180px] top-[420px] h-[420px] w-[420px] rounded-full bg-yellow-100/20 blur-3xl" />
      </div>

      {/* =========================================================
          CONTENU PRINCIPAL
      ========================================================= */}

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* =======================================================
            HEADER DE LA LEÇON
        ======================================================= */}

        <header className="relative mb-12 text-center sm:mb-14 pt-20">
          <div className="pointer-events-none absolute left-1/2 top-[-70px] -z-10 h-48 w-72 -translate-x-1/2 rounded-full bg-amber-100/50 blur-3xl" />

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-amber-700">
            <span className="flex h-2 w-2 rounded-full bg-amber-400" />
            <span>Leçon</span>
          </div>

          <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-black leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-relaxed text-slate-600 sm:text-xl">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              {description}
            </p>
          )}

          <div className="mx-auto mt-7 h-1 w-16 rounded-full bg-amber-400" />
        </header>

        {/* =======================================================
            ÉTAPE 1 — VIDÉO
        ======================================================= */}

        <section>
          {/* Header étape */}

          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-[0_8px_20px_rgba(15,23,42,0.18)]">
              1
            </div>

            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-400">
                Première étape
              </p>

              <h2 className="mt-0.5 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                Découvre la leçon
              </h2>
            </div>
          </div>

          {/* =================================================
              VIDÉO
          ================================================= */}

          <div className="relative z-20 overflow-hidden rounded-[24px] border border-slate-200/80 bg-black shadow-[0_20px_55px_rgba(15,23,42,0.15)] sm:rounded-[28px]">
            <video
              className="relative z-20 aspect-video w-full cursor-pointer object-contain"
              controls
              playsInline
              preload="metadata"
              poster={poster}
              onEnded={handleVideoEnded}
            >
              <source src={videoSrc} />
              Ton navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>

          {/* =================================================
              AVANT LA FIN DE LA VIDÉO
          ================================================= */}

          {!videoCompleted && !showQuiz && (
            <div className="mt-6 rounded-[22px] border border-amber-100 bg-gradient-to-r from-amber-50/80 to-white p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm ring-1 ring-amber-100">
                  🎬
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900 sm:text-base">
                    Regarde la vidéo jusqu&apos;à la fin.
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Une fois la vidéo terminée, tu pourras accéder au quiz de
                    compréhension.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =================================================
              VIDÉO TERMINÉE — BOUTON QUIZ
          ================================================= */}

          {videoCompleted && !showQuiz && (
            <div className="relative mt-6 overflow-hidden rounded-[24px] border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-bold text-white shadow-[0_10px_25px_rgba(16,185,129,0.25)]">
                    ✓
                  </div>

                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-emerald-700">
                      Leçon terminée
                    </p>

                    <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                      Prêt à vérifier tes acquis ?
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                      Tu as terminé la vidéo. Passe maintenant au quiz pour
                      vérifier ce que tu as compris.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleStartQuiz}
                  className="
                    group
                    inline-flex
                    w-full
                    shrink-0
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    bg-slate-950
                    px-7
                    py-4
                    text-sm
                    font-extrabold
                    text-white
                    shadow-[0_12px_30px_rgba(15,23,42,0.18)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-slate-800
                    hover:shadow-[0_18px_40px_rgba(15,23,42,0.22)]
                    active:translate-y-0
                    sm:w-auto
                  "
                >
                  <span>Commencer le quiz</span>

                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              QUIZ ACTIVÉ — POSSIBILITÉ DE REVOIR LA VIDÉO
          ================================================= */}

          {showQuiz && (
            <div className="mt-6 flex flex-col gap-4 rounded-[22px] border border-emerald-200 bg-emerald-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 font-bold text-white shadow-sm">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-800">
                    Vidéo terminée
                  </p>

                  <p className="mt-0.5 text-xs leading-5 text-emerald-700">
                    Le quiz est maintenant disponible.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReviewVideo}
                className="self-start text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-950 sm:self-auto"
              >
                Revoir la vidéo
              </button>
            </div>
          )}
        </section>

        {/* =======================================================
            ÉTAPE 2 — QUIZ
            N'EST RENDUE QU'APRÈS LE CLIC
        ======================================================= */}

        {showQuiz && (
          <section id="lesson-quiz" className="scroll-mt-8 pt-12 sm:pt-14">
            {/* Header étape */}

            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-lg font-black text-slate-950 shadow-[0_8px_20px_rgba(251,191,36,0.25)]">
                2
              </div>

              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-600">
                  Deuxième étape
                </p>

                <h2 className="mt-0.5 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                  Vérifie tes acquis
                </h2>
              </div>
            </div>

            {/* =================================================
                BLOC QUIZ
            ================================================= */}

            <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.06)] sm:p-6 lg:p-8">
              {/* Introduction pédagogique */}

              {/* Quiz */}

              {quiz}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
