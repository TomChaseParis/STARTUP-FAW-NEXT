"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import {
  ActivityNavigationProvider,
} from "@/core/navigation/ActivityNavigationProvider";

import QuizGogoFlow from "./exercises/QuizGogoFlow";

import { elementary1Activity1 } from "@/data/courses/activities/elementary-1/activity1/activity1";

export default function Activity() {
  const [started, setStarted] = useState(false);

  const exercisesRef =
    useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setStarted(true);

    setTimeout(() => {
      exercisesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  return (
    <ActivityLayout
      activity={elementary1Activity1}
    >
      {/* =====================================================
          INTRODUCTION + VIDÉO
      ===================================================== */}

      <LessonBlock
        badge="Niveau élémentaire 1"
        title="QUIZZ A GOGO"
        description="Découvre les principales questions et réponses utilisées dans une conversation simple, puis entraîne-toi grâce à plusieurs exercices interactifs."
        videoSrc="/videos/courses/elementary-1/activities/activity1/presentation.mp4"
        poster="/images/courses/elementary/activities/activity1/jeanposterquizgogo.png"
        info={{
          objectifs: [
            "Pratiquer les questions et les tournures interrogatives",
            "Identifier les réponses adaptées.",
            "Réutiliser ces questions dans des situations simples.",
          ],
          competences: [
            "Compréhension écrite",
            "Prononciation",
          ],
          prerequis: [
            "Questions et mots interrogatifs",
          ],
          duree: "20 minutes",
        }}
      />

      {/* =====================================================
          BOUTON COMMENCER L'ACTIVITÉ
      ===================================================== */}

      {!started && (
        <div className="container mt-16 flex justify-center">
          <button
            type="button"
            onClick={handleStart}
            className="
              rounded-xl
              bg-blue-600
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:bg-blue-700
            "
          >
            Commencer l&apos;activité
          </button>
        </div>
      )}

      {/* =====================================================
          ACTIVITÉ — EXERCICES
      ===================================================== */}

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
              totalExercises={
                elementary1Activity1.exercises.length
              }
            >
              <QuizGogoFlow />
            </ActivityNavigationProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </ActivityLayout>
  );
}