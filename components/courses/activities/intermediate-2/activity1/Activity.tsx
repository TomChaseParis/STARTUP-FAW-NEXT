
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/ActivityBlock";

import ActivityFlow from "@/core/navigation/ActivityFlow";
import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";

import { activity1 } from "@/data/courses/activities/intermediate-2/activity1/activity1";

// EXERCICE 1
import SubjunctiveFillGapsSection from "./exercises/exercise-1/SubjunctiveFillGapsSection";

// EXERCICE 2
import IllustratedTransformationSection from "./exercises/exercise-2/IllustratedTransformationSection";

// EXERCICE 3
import QCMSection from "./exercises/exercise-3/QCMSection";
import QCMExercise from "./exercises/exercise-3/QCMExercise";

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
        element.getBoundingClientRect().top + window.scrollY - 100,
      );

      const distance = targetPosition - startPosition;
      const duration = 1100;
      let startTime: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;

        const progress = Math.min(
          (currentTime - startTime) / duration,
          1,
        );

        const easedProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(
          0,
          startPosition + distance * easedProgress,
        );

        if (progress < 1) {
          window.requestAnimationFrame(animateScroll);
        }
      };

      window.requestAnimationFrame(animateScroll);
    }, 300);
  };

  return (
    <ActivityLayout activity={activity1}>
      <LessonBlock
        contentType="activity"
        level="intermediate-2"
        title="Il faut que je parte…"
        description="Écoute les phrases et entraîne-toi à utiliser le subjonctif après « il faut que »."
        videoSrc="/videos/courses/intermediate-2/activities/activity1/presentation.mp4"
        poster="/images/courses/intermediate-2/activities/activity1/henriheader.png"
        info={{
          objectifs: [
            "Pratiquer le subjonctif de nécessité avec « il faut que »",
            "Pratiquer la conjugaison du subjonctif présent (verbes réguliers et irréguliers)",
          ],
          competences: [
            "Compréhension orale",
            "Transformation morphosyntaxique",
            "Verbalisation",
          ],
          prerequis: [
            "Conjugaison des verbes au subjonctif présent",
          ],
          duree: "20 minutes",
        }}
      />

      {!started && (
        <div className="container flex justify-center py-6">
          <button
            type="button"
            onClick={handleStart}
            className="rounded-xl bg-[#B9A0F8] px-8 py-4 text-lg font-semibold text-[#241344] transition-all duration-300 hover:scale-105 hover:bg-[#A78BFA] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B9A0F8]/40"
          >
            Commencer l’activité
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {started && (
          <motion.div
            key="activity-flow"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ActivityNavigationProvider
              totalExercises={activity1.exercises.length}
            >
              <ActivityFlow
                finishHref="/courses/intermediate-2"
                teacher="intermediate-2"
              >
                {/* EXERCICE 1 — DIALOGUE À COMPLÉTER */}
                <SubjunctiveFillGapsSection />

                {/* EXERCICE 2 — TRANSFORMATION ILLUSTRÉE */}
                <IllustratedTransformationSection />

                {/* EXERCICE 3 — QCM */}
                <QCMSection>
                  <QCMExercise />
                </QCMSection>
              </ActivityFlow>
            </ActivityNavigationProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </ActivityLayout>
  );
}
