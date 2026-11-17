
  "use client";

  import { useState } from "react";

  import ExerciseContainer from "@/components/activity/ExerciseContainer";
  import ExerciseSection from "@/components/courses/layout/ExerciseSection";
  import ClickAndListen from "@/components/courses/layout/ClickAndListen";
  import { scrollToElementSmooth } from "@/utils/scrollToElementSmooth";

  import MemoryExercise from "./MemoryExercise";
  import { memoryPairs } from "./memory.data";

  type ExerciseTransitionProps = {
    number: number;
  };

  function ExerciseTransition({
    number,
  }: ExerciseTransitionProps) {
    return (
      <div
        className="relative z-10 flex h-[120px] items-center justify-center"
        aria-label={`Étape ${number}`}
      >
        {/* Ligne verticale prolongée pour toucher les deux blocs */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -top-9 -bottom-9 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#57CC99]"
        />

        {/* Numéro centré sur la ligne */}
        <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#57CC99] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(87,204,153,0.25)] ring-1 ring-[#A8E6CA]">
          {number}
        </span>
      </div>
    );
  }


  export default function MemorySection() {
    const [started, setStarted] = useState(false);

    const handleStart = () => {
      setStarted(true);

      scrollToElementSmooth("exercise-3-content", {
        delay: 300,
        offset: 100,
        duration: 1100,
        maxAttempts: 20,
        retryDelay: 100,
      });
    };

    return (
      <ExerciseContainer exerciseId="exercise-3">
        {({ onComplete }) => (
          <ExerciseSection width="full">
            <ClickAndListen
            cefrLevel="A2.1"
              level="elementary-1"
              exerciseNumber={3}
              category="FIXATION LEXICALE"
              title="LE MEMORY D'ANNIE"
              description="La jeune Annie a passé des vacances horribles chez ses grands-parents dans un village perdu des Pyrénées. À son retour, elle imagine un jeu de Memory inédit pour décrire les habitudes des gens du village."
              instruction="Retourne deux cartes à la fois pour retrouver les paires d’images identiques. Si les cartes ne correspondent pas, elles se retournent : mémorise leur emplacement pour réessayer."
              instructionImageSrc="/images/loisirstest3.png"
              dialogueImageSrc="/images/PHONIEGRAPHIEJEAN.PNG"
              dialogueImageAlt="Les loisirs des Français"
              audioTitle="Les loisirs des Français"
              audioHint="Écoute attentivement avant de commencer."
              onStart={handleStart}
              started={started}
            />

            {/* TRANSITION ET EXERCICE 3 */}

            {started && (
              <>
                <ExerciseTransition number={3} />

                <div
                  id="exercise-3-content"
                  className="w-full min-w-0 scroll-mt-10"
                >
                  <MemoryExercise
                    pairs={memoryPairs}
                    onComplete={onComplete}
                  />
                </div>
              </>
            )}
          </ExerciseSection>
        )}
      </ExerciseContainer>
    );
  }
