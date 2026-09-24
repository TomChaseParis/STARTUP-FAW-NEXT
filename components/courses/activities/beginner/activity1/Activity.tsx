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

  const [showExercise2, setShowExercise2] =
    useState(false);

  const [showExercise3, setShowExercise3] =
    useState(false);

  /*
   * =========================================================
   * DÉMARRER L'ACTIVITÉ
   * =========================================================
   */

  const handleStartActivity = () => {
    setStarted(true);

    requestAnimationFrame(() => {
      setTimeout(() => {
        document
          .getElementById("activity-1-exercises")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 50);
    });
  };

  /*
   * =========================================================
   * EXERCICE 1 TERMINÉ
   * =========================================================
   */

  const handleExercise1Complete = () => {
    setShowExercise2(true);

    requestAnimationFrame(() => {
      setTimeout(() => {
        document
          .getElementById("activity-1-exercise-2")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 50);
    });
  };

  /*
   * =========================================================
   * EXERCICE 2 TERMINÉ
   * =========================================================
   */

  const handleExercise2Complete = () => {
    setShowExercise3(true);

    requestAnimationFrame(() => {
      setTimeout(() => {
        document
          .getElementById(
            "character-presentation-instruction",
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 50);
    });
  };

  return (
    <ActivityNavigationProvider
      totalExercises={3}
    >
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

        {/* =====================================================
            BOUTON DE DÉMARRAGE
        ====================================================== */}

        {!started && (
          <div className="container flex justify-center">
            <button
              type="button"
              onClick={handleStartActivity}
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

        {/* =====================================================
            EXERCICES
        ====================================================== */}

        {started && (
          <div
            id="activity-1-exercises"
            className="scroll-mt-10"
          >
            {/* =================================================
                EXERCICE 1
            ================================================== */}

            <VerbListeningSection
              onNext={handleExercise1Complete}
            />

            {/* =================================================
                EXERCICE 2
            ================================================== */}

            {showExercise2 && (
              <div
                id="activity-1-exercise-2"
                className="scroll-mt-10"
              >
                <VerbSelectionSection
                  onNext={handleExercise2Complete}
                />
              </div>
            )}

            {/* =================================================
                EXERCICE 3
            ================================================== */}

            {showExercise3 && (
              <CharacterPresentationSection />
            )}
          </div>
        )}
      </ActivityLayout>
    </ActivityNavigationProvider>
  );
}