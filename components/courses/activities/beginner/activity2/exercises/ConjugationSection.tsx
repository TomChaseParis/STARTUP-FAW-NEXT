"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import ConjugationExercise from "./ConjugationExercise";

export default function ConjugationSection() {
  const [started, setStarted] = useState(false);

  /*
   * Lorsque l'utilisateur clique sur
   * "Lancer l'exercice", l'exercice est affiché.
   *
   * On attend que le contenu soit réellement présent
   * dans le DOM avant de lancer le scroll.
   */
  useEffect(() => {
    if (!started) return;

    let attempts = 0;
    let timer: number | undefined;

    const scrollToExercise = () => {
      const element =
        document.getElementById("exercise-3-content");

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
              typeLabel="PHONIE / GRAPHIE"
              title="Conjugaison"
              subtitle='Réécoute une dernière fois le dialogue et complète les phrases avec les bonnes formes des verbes "être" et "avoir" au présent de l’indicatif.'
              activityType="listen-type"
              audioSrc="/audios/courses/beginner/activity2/audio-matrimoniale.mp3"
              audioBadge="Dialogue"
              description={
                <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  <p className="font-semibold text-slate-800">
                    Consigne :
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

                  {/* ================================================= */}
                  {/* VOYELLES ACCENTUÉES */}
                  {/* ================================================= */}

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
              }
              onStart={() => {
                setStarted(true);
              }}
              started={started}
            />

            {started && (
              <div
                id="exercise-3-content"
                className="scroll-mt-10"
              >
                <ConjugationExercise
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