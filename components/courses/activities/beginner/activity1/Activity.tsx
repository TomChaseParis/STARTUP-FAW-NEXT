"use client";

import { useState } from "react";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import { bigFourActivity } from "@/data/courses/activities/bigFour";

import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";

import VerbListeningSection from "./exercises/exercice-1/VerbListeningSection";
import VerbSelectionSection from "./exercises/VerbSelectionSection";
import CharacterPresentationSection from "./exercises/exercice-3/CharacterPresentationSection";


export default function Activity() {
  const [started, setStarted] = useState(false);

  const [showExercise2, setShowExercise2] = useState(false);
  const [showExercise3, setShowExercise3] = useState(false);

  return (
    <ActivityLayout activity={bigFourActivity}>
      <LessonBlock
        level="beginner"
        title="ZE BIG FOUR : Être – Avoir – Faire – Aller"
        description="Regarde la vidéo puis fais les exercices."
        videoSrc="/videos/courses/beginner/activities/activity1/presentation.mp4"
        poster="/images/courses/beginner/activities/activity1/postermarie.png"
        info={{
          objectifs: [
            "Conjuguer des verbes de base pour faire des phrases simples",
          ],
          competences: [
            "Compréhension écrite",
            "Transformation grammaticale",
            "Phonie / graphie",
            "Prononciation",
          ],
          prerequis: [
            "Les verbes « être », « avoir », « aller » et « faire » au présent",
            "Les pronoms sujets : « Je », « Tu », « Il », « Elle », « On », « Nous », « Vous », « Ils » et « Elles »",
          ],
          duree: "30 minutes",
        }}
      />

      {!started && (
        <div className="container flex justify-center">
          <button
            type="button"
            onClick={() => {
              setStarted(true);

              requestAnimationFrame(() => {
                document
                  .getElementById("activity-1-exercises")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              });
            }}
            className="
              rounded-xl
              bg-[#E09F00]
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[#C98D00]
            "
          >
            Commencer l&apos;activité
          </button>
        </div>
      )}

      {started && (
        <div
          id="activity-1-exercises"
          className="scroll-mt-10"
        >
          <ActivityNavigationProvider
            totalExercises={bigFourActivity.exercises.length}
          >
            {/* EXERCICE 1 */}
            {!showExercise2 && !showExercise3 && (
              <VerbListeningSection
                onNext={() => {
                  setShowExercise2(true);

                  requestAnimationFrame(() => {
                    document
                      .getElementById("activity-1-exercise-2")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  });
                }}
              />
            )}

            {/* EXERCICE 2 */}
            {showExercise2 && !showExercise3 && (
              <div
                id="activity-1-exercise-2"
                className="scroll-mt-10"
              >
                <VerbSelectionSection
                  onNext={() => {
                    setShowExercise3(true);

                    requestAnimationFrame(() => {
                      document
                        .getElementById("activity-1-exercise-3")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    });
                  }}
                />
              </div>
            )}

            {/* EXERCICE 3 */}
            {showExercise3 && (
              <div
                id="activity-1-exercise-3"
                className="scroll-mt-10"
              >
                <CharacterPresentationSection />
              </div>
            )}
          </ActivityNavigationProvider>
        </div>
      )}
    </ActivityLayout>
  );
}