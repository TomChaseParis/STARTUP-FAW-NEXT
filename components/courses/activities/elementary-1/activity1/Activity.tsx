
"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";
import LessonBlock from "@/components/courses/layout/ActivityBlock";

import QuizGogoFlow from "./exercises/QuizGogoFlow";

import { elementary1Activity1 } from "@/data/courses/activities/elementary-1/activity1/activity1";

import { scrollToElementSmooth } from "@/utils/scrollToElementSmooth";

export default function Activity() {
  const [started, setStarted] = useState(false);

  const exercisesRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setStarted(true);

    scrollToElementSmooth("quiz-gogo-exercise-1", {
      delay: 500,
      offset: 24,
      duration: 1100,
      maxAttempts: 20,
      retryDelay: 100,
    });
  };

  return (
    <ActivityLayout activity={elementary1Activity1}>
      {/* INTRODUCTION + VIDÉO */}
      <LessonBlock
        level="elementary-1"
        contentType="activity"
        title="QUIZZ A GOGO"
        description="Découvre les principales questions et réponses utilisées dans une conversation simple, puis entraîne-toi grâce à plusieurs exercices interactifs."
        videoSrc="/videos/courses/elementary-1/activities/activity1/presentation.mp4"
        poster="/images/courses/elementary/activities/activity1/jeanposterquizgogo.png"
        info={{
          objectifs: [
            "Pratiquer les questions et les tournures interrogatives",
            "Comprendre des questions simples et y répondre",
            "Identifier et mobiliser le mot interrogatif adéquat",
          ],
          competences: [
            "Compréhension écrite",
            "Compréhension orale",
            "Prononciation, diction et intonation",
          ],
          prerequis: ["Questions et mots interrogatifs"],
          duree: "25 minutes",
        }}
      />

      {/* BOUTON COMMENCER L'ACTIVITÉ */}
      {!started && (
        <div className="container mt-16 flex justify-center">
          <button
            type="button"
            onClick={handleStart}
            className="
              rounded-xl
              bg-[rgb(87,204,153)]
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[rgb(70,185,135)]
            "
          >
            Commencer l&apos;activité
          </button>
        </div>
      )}

      {/* ACTIVITÉ — APPARITION ANIMÉE */}
      <AnimatePresence mode="wait">
        {started && (
          <motion.div
            ref={exercisesRef}
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
              totalExercises={elementary1Activity1.exercises.length}
            >
              <QuizGogoFlow />
            </ActivityNavigationProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </ActivityLayout>
  );
}
