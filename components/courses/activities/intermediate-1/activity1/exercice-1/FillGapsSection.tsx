"use client";

import { useEffect, useRef, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import FillGapsExercise from "./FillGapsExercice";

export default function FillGapsSection() {
  const [started, setStarted] = useState(false);
  const exerciseContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;

    const timeout = window.setTimeout(() => {
      exerciseContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 400);

    return () => window.clearTimeout(timeout);
  }, [started]);

  return (
    <ExerciseContainer exerciseId="exercise-1">
      {({ onComplete }) => (
        <ExerciseSection>
          <InstructionBlock
            level="intermediate1"
            stampLabel="EXERCICE 1"
            typeLabel="COMPRÉHENSION ORALE"
            title="Complète les mots de la chanson"
            activityType="listen-type"
            audioSrc="/audios/courses/intermediate1/lesvacancesauborddemer.mp3"
            audioBadge="ÉCOUTE LA CHANSON"
            audioImage="/images/courses/intermediate1/activity1/header.jpg"
            description={
              <div className="space-y-4 text-black">
                   <p className="font-semibold text-slate-800">
                    Consigne :
                  </p>

                <p>
                  Complète les paroles de la chanson avec le verbe
                  conjugué à la bonne forme de l’imparfait.
                </p>

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

                    <div className="p-4">
                  <p className="mb-2 font-semibold text-sky-800">
                    ♫ Petit rappel musical
                  </p>

                  <p className="text-sm leading-relaxed text-slate-700">
                    À l’imparfait, les terminaisons sont :
                    <strong> -ais, -ais, -ait, -ions, -iez, -aient.</strong>
                  </p>
                </div>
                  </div>

              
                <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
               
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
              </div>
              
            }
            onStart={() => setStarted(true)}
            started={started}
          />

          {started && (
            <div
              ref={exerciseContentRef}
              className="mt-8 scroll-mt-10"
            >
              <FillGapsExercise onComplete={onComplete} />
            </div>
          )}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}