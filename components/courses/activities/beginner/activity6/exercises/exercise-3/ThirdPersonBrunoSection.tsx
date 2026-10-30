
"use client";

import { useEffect, useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import TypeInstruction from "@/components/courses/layout/TypeInstruction";
import FloatingTextPanel from "@/components/courses/layout/FloatingTextPanel";

import { scrollToElementSmooth } from "@/utils/scrollToElementSmooth";

import ThirdPersonBrunoExercise from "./ThirdPersonBrunoExercise";

type ExerciseTransitionProps = {
  number: number;
};

const BRUNO_SOURCE_TEXT = `Bonjour. Je m’appelle Bruno Galopin. J’ai 37 ans et j’habite à Toulouse depuis trois ans. C’est une ville de 500 000 habitants qui se situe au sud-ouest de la France.

Je suis en couple. J’ai deux enfants : une fille de 8 ans et un garçon de 5 ans. Nous habitons un appartement dans le centre-ville.

Je travaille comme développeur web. La plupart du temps, je travaille chez moi. Parfois, je vais à mon bureau pour assister à des réunions et faire le point sur des projets avec mes collègues.

Pendant mon temps libre, je joue du piano ou je fais du vélo le long des berges de la Garonne. J’aime aussi visiter des expositions d’art contemporain.`;

function ExerciseTransition({
  number,
}: ExerciseTransitionProps) {
  return (
    <div
      className="relative z-10 flex h-[120px] items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#F4B323]"
      />

      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F2A900] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
        {number}
      </span>
    </div>
  );
}

export default function ThirdPersonBrunoSection() {
  const [started, setStarted] = useState(false);
  const [showSourceText, setShowSourceText] = useState(false);

  useEffect(() => {
    if (!started) return;

    return scrollToElementSmooth("exercise-3-content", {
      delay: 300,
      offset: 24,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
  }, [started]);

  return (
    <ExerciseContainer exerciseId="exercise-3">
      {({ onComplete }) => (
        <div className="w-full min-w-0">
          {/* ÉNONCÉ */}
          <div
            id="exercise-3-instruction"
            className="w-full min-w-0 scroll-mt-10"
          >
            <ExerciseSection width="full">
              <TypeInstruction
              level="beginner"
                imageSrc="/images/reecriture.png"
                imageAlt="Souris devant un tableau pour l’exercice de réécriture"
                category="RÉÉCRITURE"
                activityTitle="EXERCICE 3"
                title="IL S'APPELLE BRUNO GALOPIN..."
                description="Transforme le texte de l’exercice 1 de la première personne à la troisième personne : « Je » devient « Il » et « Nous » devient « Ils »."
                example="« Nous vivons » → « Ils vivent »"
                steps={[
                  {
                    title: "Lis",
                    description:
                      "Lis attentivement le texte de départ et la consigne.",
                    icon: "keyboard",
                  },
                  {
                    title: "Réécris",
                    description:
                      "Transforme chaque groupe verbal à la troisième personne.",
                    icon: "keyboard",
                  },
                ]}
                pointAttention={{
                  imageSrc:
                    "/images/courses/beginner/activities/brunogalopin/point.png",
                  imageAlt:
                    "Point d’attention sur la terminaison des verbes",
                  title: (
                    <div className="space-y-2">
                      <p className="font-semibold">
                        Lors de la transposition du « nous » en « ils »,
                        fais attention à la terminaison du verbe.
                      </p>

                      <p>
                        Rappel : le « ent » ne s’entend pas à l’oral.
                      </p>

                      <p>
                        <span className="font-semibold">
                          Exemple :
                        </span>{" "}
                        « Nous vivons » ➡️ « Ils vivent »
                      </p>
                    </div>
                  ),
                }}
                beforeStartContent={
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-5 shadow-sm sm:px-6 sm:py-6">
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
                        setShowSourceText((current) => !current)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-white px-4 py-2.5 text-sm font-semibold text-amber-800 shadow-sm transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
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
                        {BRUNO_SOURCE_TEXT.split("\n\n").map(
                          (paragraph, index) => (
                            <p
                              key={index}
                              className={index > 0 ? "mt-4" : ""}
                            >
                              {paragraph}
                            </p>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                }
                onStart={() => setStarted(true)}
                started={started}
              />
            </ExerciseSection>
          </div>

          {/* TRANSITION ET EXERCICE 3 */}
          {started && (
            <>
              <ExerciseTransition number={3} />

              <div
                id="exercise-3-content"
                className="w-full min-w-0 scroll-mt-10"
              >
                <ExerciseSection width="full">
                  <ThirdPersonBrunoExercise
                    onComplete={onComplete}
                  />
                </ExerciseSection>
              </div>

              {/* TEXTE DE RÉFÉRENCE FLOTTANT */}
              <FloatingTextPanel
                title="Texte de Bruno"
                hint="Consulte le texte original pour réécrire les phrases à la troisième personne."
                text={BRUNO_SOURCE_TEXT}
              />
            </>
          )}
        </div>
      )}
    </ExerciseContainer>
  );
}
