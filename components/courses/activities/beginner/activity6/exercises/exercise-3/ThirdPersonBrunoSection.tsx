"use client";

import {
  useEffect,
  useState,
} from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";

import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import ThirdPersonBrunoExercise from "./ThirdPersonBrunoExercise";

export default function ThirdPersonBrunoSection() {
  const [started, setStarted] =
    useState(false);

  const [showSourceText, setShowSourceText] =
    useState(false);

  useEffect(() => {
    if (!started) {
      return;
    }

    let attempts = 0;
    let timer: number | undefined;

    const scrollToExercise = () => {
      const element =
        document.getElementById(
          "exercise-3-content",
        );

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timer = window.setTimeout(
            scrollToExercise,
            100,
          );
        }

        return;
      }

      const elementTop =
        element.getBoundingClientRect()
          .top + window.scrollY;

      const offset = 100;

      window.scrollTo({
        top: Math.max(
          0,
          elementTop - offset,
        ),
        behavior: "smooth",
      });
    };

    timer = window.setTimeout(
      scrollToExercise,
      100,
    );

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [started]);

  return (
    <ExerciseContainer exerciseId="exercise-3">
      {({ onComplete }) => (
        <div
          id="exercise-3-instruction"
          className="scroll-mt-10"
        >
          <ExerciseSection>
            <InstructionBlock
              level="beginner"
              stampLabel="EXERCICE 3"
              typeLabel="RÉÉCRITURE"
              title="IL S'APPELLE BRUNO GALOPIN..."
              subtitle={
                "Transforme le texte de l’exercice 1 de la 1ère personne à la 3ème personne (« Je » > « Il » ; « Nous » > « Ils »)."
              }
              activityType="type"
              description={
                <div className="space-y-5 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {/* =====================================================
                      CONSIGNE
                  ====================================================== */}

                  <div>
                    <p className="mb-2 font-semibold text-slate-800">
                      Consigne :
                    </p>

                    <p>
                      Complète à nouveau le texte en
                      réécrivant chaque groupe verbal à
                      la troisième personne du singulier.
                    </p>
                  </div>

                  {/* =====================================================
                      POINT D'ATTENTION
                  ====================================================== */}

                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      gap-4
                      rounded-xl
                      border
                      border-slate-300
                      bg-white
                      px-4
                      py-4
                      shadow-sm
                      sm:flex-row
                      sm:items-center
                      sm:gap-5
                      sm:px-5
                      sm:py-4
                    "
                  >
                    {/* IMAGE POINT D'ATTENTION */}

                    <div
                      className="
                        flex
                        shrink-0
                        items-center
                        justify-center
                      "
                    >
                      <img
                        src="/images/courses/beginner/activities/brunogalopin/point.png"
                        alt="Point d'attention"
                        className="
                          h-20
                          w-20
                          object-contain
                          sm:h-28
                          sm:w-24
                        "
                      />
                    </div>

                    {/* TEXTE */}

                    <div
                      className="
                        min-w-0
                        w-full
                        space-y-2
                        text-center
                        sm:text-left
                      "
                    >
                      <p className="font-bold text-slate-800">
                        Lors de la transposition du « nous »
                        en « ils », faites attention à la
                        terminaison du verbe. Rappel : le
                        « ent » ne s’entend pas à l’oral.
                      </p>

                      <p>
                        Exemple : « Nous vivons » ➡️ « Ils
                        vivent »
                      </p>
                    </div>
                  </div>

                  {/* =====================================================
                      TEXTE À TRANSFORMER
                  ====================================================== */}

                  <div
                    className="
                      rounded-2xl
                      border
                      border-amber-200
                      bg-amber-50
                      px-5
                      py-5
                      shadow-sm
                      sm:px-6
                      sm:py-6
                    "
                  >
                    <div className="mb-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700">
                        Texte de départ
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-500">
                        Lis attentivement la présentation avant de commencer.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setShowSourceText(
                          (current) => !current,
                        )
                      }
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-amber-300
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-amber-800
                        shadow-sm
                        transition
                        hover:bg-amber-100
                        focus:outline-none
                        focus:ring-2
                        focus:ring-amber-400
                        focus:ring-offset-2
                      "
                      aria-expanded={showSourceText}
                    >
                      <span
                        aria-hidden="true"
                        className="text-base"
                      >
                        {showSourceText ? "−" : "+"}
                      </span>

                      {showSourceText
                        ? "Masquer le texte de départ"
                        : "Afficher le texte de départ"}
                    </button>

                    {showSourceText && (
                      <div className="mt-4 rounded-xl bg-white px-5 py-5 text-base leading-8 text-slate-800 shadow-sm sm:px-6 sm:py-6">
                        <p>
                          Bonjour. Je m’appelle Bruno
                          Galopin. J’ai 37 ans et j’habite
                          à Toulouse depuis trois ans. C’est
                          une ville de 500 000 habitants qui
                          se situe au sud-ouest de la France.
                        </p>

                        <p className="mt-4">
                          Je suis en couple. J’ai deux
                          enfants : une fille de 8 ans et un
                          garçon de 5 ans. Nous habitons un
                          appartement dans le centre-ville.
                        </p>

                        <p className="mt-4">
                          Je travaille comme développeur web.
                          La plupart du temps, je travaille
                          chez moi. Parfois, je vais à mon
                          bureau pour assister à des réunions
                          et faire le point sur des projets
                          avec mes collègues.
                        </p>

                        <p className="mt-4">
                          Pendant mon temps libre, je joue du
                          piano ou je fais du vélo le long des
                          berges de la Garonne. J’aime aussi
                          visiter des expositions d’art
                          contemporain.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              }
              onStart={() =>
                setStarted(true)
              }
              started={started}
            />

            {/* =================================================
                EXERCICE
            ================================================== */}

            {started && (
              <div
                id="exercise-3-content"
                className="scroll-mt-10"
              >
                <ThirdPersonBrunoExercise
                  onComplete={onComplete}
                />
              </div>
            )}
          </ExerciseSection>
        </div>
      )}
    </ExerciseContainer>
  );
}