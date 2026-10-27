"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/ActivityBlock";

import ActivityFlow from "@/core/navigation/ActivityFlow";
import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";

import FillGapsReport from "@/components/courses/common/result/FillGapsReport";
import { frenchLeisureData } from "./data/frenchLeisureData";

import { elementary1Activity2 } from "@/data/courses/activities/elementary-1/activity2/activity2";

import FillInTheBlankSection from "./exercises/exercise-1/FillInTheBlankSection";
import QuizChoiceSection from "./exercises/exercise-2/QuizChoiceSection";
import MemorySection from "./exercises/exercise-3/MemorySection";

export default function Activity() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);

    window.setTimeout(() => {
      const element = document.getElementById(
        "exercise-1-instruction",
      );

      if (!element) return;

      const startPosition = window.scrollY;

      const targetPosition = Math.max(
        0,
        element.getBoundingClientRect().top +
          window.scrollY -
          24,
      );

      const distance = targetPosition - startPosition;
      const duration = 1400;

      let startTime: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (startTime === null) {
          startTime = currentTime;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

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
    <ActivityLayout activity={elementary1Activity2}>
      <LessonBlock
        contentType="activity"
        level="elementary-1"
        title="Les loisirs des Français"
        description="Écoute le texte puis conjugue les verbes à la troisième personne du pluriel."
        videoSrc="/videos/courses/elementary-1/activities/activity2/presentation.mp4"
        poster="/images/courses/elementary/activities/activity2/poster.png"
        info={{
          objectifs: [
            "Parler de ses hobbies",
            "Découvrir les loisirs des Français",
          ],
          competences: [
            "Compréhension orale",
            "Phonie / graphie",
            "Prononciation",
          ],
          prerequis: [
            "Conjugaison au présent : 3ème personne du pluriel (ils/elles)",
            "Questions et mots interrogatifs",
          ],
          duree: "30 minutes",
        }}
      />

      {!started && (
        <div className="container flex justify-center">
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
              totalExercises={elementary1Activity2.exercises.length}
            >
              <ActivityFlow
                teacher="elementary-1"
                finishHref="/courses/elementary-1/modules/gouts-loisirs"
                detailedReportRenderer={(result, exerciseIndex) => {
                  // EXERCICE 1 — TEXTE À TROUS
                  if (exerciseIndex === 0) {
                    return (
                      <FillGapsReport
                        data={frenchLeisureData}
                        history={result.session.history}
                      />
                    );
                  }

                  // Les autres exercices conservent
                  // leur comportement actuel.
                  return null;
                }}
              >
                <FillInTheBlankSection />
                <QuizChoiceSection />
                <MemorySection />
              </ActivityFlow>
            </ActivityNavigationProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </ActivityLayout>
  );
}