"use client";

import { ReactNode, useState } from "react";

import InfoBlock from "./InfoBlock";

type LessonPageProps = {
  level?: string;
  title: string;
  subtitle?: string;
  description?: string;
  videoSrc: string;
  poster?: string;
  quiz: ReactNode;
  info?: {
    objectifs?: string[];
    competences?: string[];
    prerequis?: string[];
    duree?: string;
  };
};

const LEVEL_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
  }
> = {
  beginner: {
    label: "Débutant",
    color: "#E09F00",
  },
  "elementary-1": {
    label: "Élémentaire 1",
    color: "#57CC99",
  },
  "elementary-2": {
    label: "Élémentaire 2",
    color: "#31572C",
  },
  "intermediate-1": {
    label: "Intermédiaire 1",
    color: "#38BDF8",
  },
  "intermediate-2": {
    label: "Intermédiaire 2",
    color: "#00296B",
  },
  advanced: {
    label: "Avancé",
    color: "#C7443E",
  },
};

export default function LessonPage({
  level = "beginner",
  title,
  subtitle,
  description,
  videoSrc,
  poster,
  quiz,
  info,
}: LessonPageProps) {
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const levelConfig = LEVEL_CONFIG[level] ?? LEVEL_CONFIG.beginner;

  const hasInfo = Boolean(
    info &&
      ((info.objectifs?.length ?? 0) > 0 ||
        (info.competences?.length ?? 0) > 0 ||
        (info.prerequis?.length ?? 0) > 0 ||
        info.duree?.trim())
  );

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
        <div
          className="absolute left-[-180px] top-[180px] h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            backgroundColor: `${levelConfig.color}15`,
          }}
        />

        <div
          className="absolute right-[-180px] top-[420px] h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            backgroundColor: `${levelConfig.color}10`,
          }}
        />
      </div>

      {/* =========================================================
          CONTENU PRINCIPAL
      ========================================================= */}

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* =======================================================
            HEADER DE LA LEÇON — FORMAT LESSONBLOCK
        ======================================================= */}

        <header className="relative mb-12 pt-8 sm:mb-14 sm:pt-4">
          <div
            className="pointer-events-none absolute left-1/2 top-[-55px] -z-10 h-44 w-72 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              backgroundColor: `${levelConfig.color}20`,
            }}
          />

          {/* IDENTITÉ DU CONTENU + TITRE */}

          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(260px,0.85fr)_minmax(0,1.5fr)] md:gap-8">
            {/* BLOC GAUCHE — TYPE ET NIVEAU */}

            <div className="flex justify-center md:justify-start">
              <div
                className="relative flex w-fit max-w-full items-center gap-4 overflow-hidden rounded-full py-3 pl-3 pr-6 sm:gap-5 sm:py-4 sm:pr-8"
                style={{
                  backgroundColor: `${levelConfig.color}20`,
                }}
              >
                {/* ICÔNE DU LIVRE */}

                <div
                  className="relative z-10 flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full shadow-sm sm:h-[88px] sm:w-[88px]"
                  style={{
                    backgroundColor: levelConfig.color,
                  }}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-10 w-10 sm:h-12 sm:w-12"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                    <path d="M8 7h8M8 11h8M8 15h5" />
                  </svg>
                </div>

                {/* LIBELLÉ ET NIVEAU */}

                <div className="relative z-10 flex min-w-0 flex-col items-start gap-2">
                  <span
                    className="text-xl font-black uppercase leading-none tracking-tight sm:text-2xl"
                    style={{
                      color: levelConfig.color,
                    }}
                  >
                    Leçon
                  </span>

                  <span
                    className="inline-flex max-w-full items-center rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase leading-tight tracking-[0.08em] text-white sm:px-4 sm:text-xs"
                    style={{
                      backgroundColor: levelConfig.color,
                    }}
                  >
                    {levelConfig.label}
                  </span>
                </div>

                {/* ACCENT DÉCORATIF */}

                <div
                  aria-hidden="true"
                  className="absolute right-5 top-1 h-5 w-5 rounded-full opacity-30 blur-md"
                  style={{
                    backgroundColor: levelConfig.color,
                  }}
                />
              </div>
            </div>

            {/* BLOC DROIT — TITRE ET DESCRIPTION */}

            <div className="min-w-0 text-center md:pl-2 md:text-left">
              <h1 className="text-3xl font-black leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl">
                {title}
              </h1>

              {subtitle && (
                <p className="mt-4 text-lg font-semibold leading-relaxed text-slate-600 sm:text-xl">
                  {subtitle}
                </p>
              )}

              {description && (
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  {description}
                </p>
              )}

              <div
                className="mx-auto mt-7 h-1 w-16 rounded-full md:mx-0"
                style={{
                  backgroundColor: levelConfig.color,
                }}
              />
            </div>
          </div>
        </header>

        {/* =======================================================
            ÉTAPE 1 — VIDÉO ET INFORMATIONS PÉDAGOGIQUES
        ======================================================= */}

        <section>
          {/* HEADER ÉTAPE */}

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

          {/* ENCADRÉ UNIQUE — VIDÉO + INFORMATIONS */}

          <div
            className="grid grid-cols-1 items-center gap-6 overflow-hidden rounded-[28px] border p-4 shadow-[0_16px_45px_rgba(15,23,42,0.07)] sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8"
            style={{
              backgroundColor: `${levelConfig.color}12`,
              borderColor: `${levelConfig.color}45`,
            }}
          >
            {/* COLONNE GAUCHE — VIDÉO */}

            <div className="min-w-0">
              <div className="relative aspect-video overflow-hidden rounded-[20px] border border-black/10 bg-black shadow-md">
                <video
                  className="h-full w-full object-cover"
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
            </div>

            {/* COLONNE DROITE — INFORMATIONS PÉDAGOGIQUES */}

            {hasInfo && info && (
              <div className="min-w-0 lg:pl-2">
                <div className="mb-6 flex flex-col items-center">
                  <div
                    className="mb-4 h-1 w-12 rounded-full"
                    style={{
                      backgroundColor: levelConfig.color,
                    }}
                  />

                  <h2
                    className="text-center text-xl font-black tracking-tight sm:text-2xl"
                    style={{
                      color: levelConfig.color,
                    }}
                  >
                    Au programme
                  </h2>
                </div>

                <InfoBlock {...info} accentColor={levelConfig.color} />
              </div>
            )}
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
            {/* HEADER ÉTAPE */}

            <div className="mb-6 flex items-center gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white shadow-[0_8px_20px_rgba(15,23,42,0.18)]"
                style={{
                  backgroundColor: levelConfig.color,
                }}
              >
                2
              </div>

              <div>
                <p
                  className="text-[11px] font-extrabold uppercase tracking-[0.22em]"
                  style={{
                    color: levelConfig.color,
                  }}
                >
                  Deuxième étape
                </p>

                <h2 className="mt-0.5 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                  Vérifie tes acquis
                </h2>
              </div>
            </div>

            {/* BLOC QUIZ */}

            <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.06)] sm:p-6 lg:p-8">
              {quiz}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}