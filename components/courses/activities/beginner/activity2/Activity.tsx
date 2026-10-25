"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import ActivityBlock from "@/components/courses/layout/ActivityBlock";

import ActivityFlow from "@/core/navigation/ActivityFlow";
import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";

import ListeningDiscoverySection from "./exercises/ListeningDiscoverySection";
import ComprehensionSection from "./exercises/ComprehensionSection";
import ConjugationSection from "./exercises/ConjugationSection";

import ConjugationReport from "@/components/courses/common/result/ConjugationReport";
import { conjugationExerciseData } from "./data/conjugationExerciseData";

import { activity2 } from "@/data/courses/activities/activity2";

export default function Activity() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  
    // Attend le rendu de l'activité avant de lancer le scroll.
    setTimeout(() => {
      const element = document.getElementById(
        "exercise-1-instruction",
      );
  
      if (!element) return;
  
      const startPosition = window.scrollY;
      const targetPosition =
        element.getBoundingClientRect().top +
        window.scrollY -
        24;
  
      const distance = targetPosition - startPosition;
      const duration = 1400;
  
      let startTime: number | null = null;
  
      const animateScroll = (currentTime: number) => {
        if (startTime === null) {
          startTime = currentTime;
        }
  
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
  
        // Même courbe d'accélération/décélération que les autres exercices.
        const easedProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  
        window.scrollTo(
          0,
          startPosition + distance * easedProgress,
        );
  
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
  
      requestAnimationFrame(animateScroll);
    }, 400);
  };

  return (
    <ActivityLayout activity={activity2}>
      <ActivityBlock
        contentType="activity"
        level="beginner"
        title="A l’Agence matrimoniale"
        description="Regarde la vidéo puis lance les exercices."
        videoSrc="/videos/courses/beginner/activities/activity2/marie-presentation.mp4"
        poster="/images/courses/beginner/activities/activity2/postermarie.png"
        info={{
          objectifs: [
            "Comprendre un dialogue de présentation",
            "Identifier et restituer des informations personnelles",
          ],
          competences: [
            "Compréhension orale",
            "Phonie / graphie",
            "Expression orale",
          ],
          prerequis: [
            `Conjugaison au présent à la forme "tu" et "vous" des verbes de base pour savoir se présenter :
            avoir, être, faire, habiter, parler, etc.`,
            "Tournures interrogatives, questions et mots interrogatifs",
            "Chiffres et numéros",
          ],
          duree: "35 minutes",
        }}
      />

      {!started && (
        <div className="container flex justify-center">
          <button
            type="button"
            onClick={handleStart}
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

      <AnimatePresence mode="wait">
        {started && (
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <ActivityNavigationProvider
              totalExercises={activity2.exercises.length}
            >
              <ActivityFlow
                finishHref="/courses/beginner/modules/se-presenter"
                detailedReportRenderer={(result, exerciseIndex) => {
                  // Le rapport personnalisé concerne uniquement
                  // le troisième exercice : la conjugaison.
                  if (exerciseIndex !== 2) {
                    return null;
                  }

                  return (
                    <ConjugationReport
                      data={conjugationExerciseData}
                      history={result.session.history}
                    />
                  );
                }}
              >
                <ListeningDiscoverySection />

                <ComprehensionSection />

                <ConjugationSection />
              </ActivityFlow>
            </ActivityNavigationProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </ActivityLayout>
  );
}
