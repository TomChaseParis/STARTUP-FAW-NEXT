"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import ActivityFlow from "@/core/navigation/ActivityFlow";
import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";

import FillGapsBrunoSection from "./exercises/exercise-1/FillGapsBrunoSection";


import { activity6 } from "@/data/courses/activities/beginner/activity6";

export default function Activity() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);

    // Attend que l'exercice soit affiché avant de scroller
    setTimeout(() => {
      document
        .getElementById("exercise-1-instruction")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 400);
  };

  return (
    <ActivityLayout activity={activity6}>
      <LessonBlock
        level="beginner"
        title="MEETING BRUNO GALOPIN"
        description="Regarde la vidéo puis lance les exercices."
        videoSrc="/videos/courses/beginner/activities/activity6/bruno-galopin.mp4"
        info={{
          objectifs: [
            "Repérer et restituer des informations personnelles",
            "Passer de la 1ère à la 3ème personne du singulier",
          ],
          competences: [
            "Compréhension orale",
            "Phonie / graphie",
            "Expression écrite",
          ],
          prerequis: [
            "Verbes de présentation : s’appeler, habiter, travailler, aimer, etc.",
            "Chiffres et numéros",
          ],
          duree: "20 minutes",
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
              totalExercises={
                activity6.exercises.length
              }
            >
              <ActivityFlow
                finishHref="/courses/beginner"
              >
                <FillGapsBrunoSection />
              </ActivityFlow>
            </ActivityNavigationProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </ActivityLayout>
  );
}