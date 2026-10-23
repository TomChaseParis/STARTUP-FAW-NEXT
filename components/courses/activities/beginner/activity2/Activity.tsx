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

    // Attend que l'exercice soit affiché avant de scroller.
    setTimeout(() => {
      document.getElementById("exercise-1-instruction")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
