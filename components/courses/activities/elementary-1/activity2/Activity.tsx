"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import ActivityFlow from "@/core/navigation/ActivityFlow";
import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";

import LeisureConjugationSection from "./exercises/LeisureConjugationSection";
import QuizChoiceSection from "./exercises/QuizChoiceSection";

import { elementary1Activity2 } from "@/data/courses/activities/elementary-1/activity2/activity2";

const teacherFeedbackImages = {
  bad: "/images/courses/results-expressions/elementary-1/JEAN3.png",
  middle:
    "/images/courses/results-expressions/elementary-1/JEAN2.png",
  good:
    "/images/courses/results-expressions/elementary-1/JEAN1.png",
};

const teacherFeedbackAudios = {
  bad: "/audios/teacher/jean/score/JEAN-DOWN.mp3",
  middle: "/audios/teacher/jean/score/JEAN-MIDDLE.mp3",
  good: "/audios/teacher/jean/score/JEAN-100.mp3",
};

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
      activity={elementary1Activity2}
    >
      <LessonBlock
        badge="Compréhension orale"
        title="Les loisirs des Français"
        description="Écoute le texte puis conjugue les verbes à la troisième personne du pluriel."
        videoSrc="/videos/courses/elementary-1/activities/activity2/presentation.mp4"
        poster="/images/courses/elementary/activities/activity2/poster.png"
        info={{
          objectifs: [
            "Parler des loisirs",
          ],
          competences: [
            "Compréhension orale",
            "Vocabulaire",
          ],
          prerequis: [
            "Présent — 3e personne du pluriel",
          ],
          duree: "25 minutes",
        }}
      />

      {!started && (
        <div className="container flex justify-center">
          <button
            type="button"
            onClick={handleStart}
            className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700"
          >
            Commencer l&apos;activité
          </button>
        </div>
      )}

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
                elementary1Activity2.exercises.length
              }
            >
              <ActivityFlow
                teacherFeedbackImages={
                  teacherFeedbackImages
                }
                teacherFeedbackAudios={
                  teacherFeedbackAudios
                }
              >
                <LeisureConjugationSection />

                <QuizChoiceSection />
              </ActivityFlow>
            </ActivityNavigationProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </ActivityLayout>
  );
}