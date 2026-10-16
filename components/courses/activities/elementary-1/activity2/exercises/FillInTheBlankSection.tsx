"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import FillInTheBlankExercise from "./FillInTheBlankExercise";

export default function FillInTheBlankSection() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timer: number | undefined;

    const scrollToExercise = () => {
      const element = document.getElementById(
        "exercise-1-content",
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
        element.getBoundingClientRect().top +
        window.scrollY;

      const offset = 100;

      window.scrollTo({
        top: Math.max(0, elementTop - offset),
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
    <ExerciseContainer exerciseId="exercise-1">
      {({ onComplete }) => (
        <div
          id="exercise-1-instruction"
          className="scroll-mt-10"
        >
          <ExerciseSection>
            <InstructionBlock
              level="elementary1"
              stampLabel="EXERCICE 1"
              typeLabel="COMPRÉHENSION ORALE"
              title="Les loisirs des Français"
              subtitle="Écoute le texte et conjugue les verbes à la troisième personne du pluriel."
              activityType="listen-type"
              audioSrc="/audios/courses/elementary/activities/loisirs.mp3"
              audioBadge="Les loisirs des Français"
              audioImage="/images/courses/elementary/lesloisirsdesfrancais/loisirs-fr.png"
              description={
                <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  <p className="font-semibold text-slate-800">
                    Consigne :
                  </p>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-amber-200
                      bg-amber-50
                      px-4
                      py-3
                      font-semibold
                      text-slate-800
                    "
                  >
                    Écoute le texte et conjugue tous les
                    verbes à la troisième personne du pluriel.
                  </div>

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
                      sm:flex-row
                      sm:items-center
                      sm:gap-5
                      sm:px-5
                      sm:py-4
                    "
                  >
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
                        La marque du pluriel (–ent) ne
                        s’entend pas à l’oral !
                      </p>

                      <div>
                        <p>
                          Exemple : Les jeunes _______ (passer)
                          beaucoup de temps sur internet.
                        </p>

                        <p className="mt-1">
                          ➡️ Les jeunes{" "}
                          <strong>passent</strong> beaucoup
                          de temps sur internet.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AIDE AU CLAVIER */}
                  <div className="space-y-4">
                    <p className="font-semibold text-slate-800">
                      Aide au clavier :
                    </p>

                    <p>
                      Écris tes réponses à l’aide du clavier
                      de ton ordinateur ou de ton téléphone.
                    </p>

                    <p>
                      Si tu as du mal à trouver certaines
                      voyelles accentuées (exemple : « ê »),
                      copie / colle la voyelle requise à
                      partir de la liste ci-dessous :
                    </p>

                    {/* VOYELLES ACCENTUÉES */}
                    <div
                      className="
                        w-full
                        overflow-hidden
                        rounded-xl
                        border
                        border-slate-200
                        bg-white/80
                        px-3
                        py-3
                        sm:px-4
                        sm:py-3
                      "
                    >
                      <div
                        className="
                          flex
                          w-full
                          flex-wrap
                          items-center
                          justify-center
                          gap-2
                          sm:justify-start
                          sm:gap-3
                        "
                      >
                        {[
                          "à",
                          "â",
                          "ä",
                          "é",
                          "è",
                          "ê",
                          "ë",
                          "î",
                          "ï",
                          "ô",
                          "ö",
                          "ù",
                          "û",
                          "ü",
                        ].map((character) => (
                          <span
                            key={character}
                            className="
                              flex
                              h-9
                              min-w-9
                              items-center
                              justify-center
                              rounded-lg
                              bg-slate-50
                              px-2
                              font-semibold
                              tracking-wide
                              text-slate-800
                              ring-1
                              ring-slate-200
                            "
                          >
                            {character}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              }
              onStart={() => {
                setStarted(true);
              }}
              started={started}
            />

            {started && (
              <div
                id="exercise-1-content"
                className="scroll-mt-10"
              >
                <FillInTheBlankExercise
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