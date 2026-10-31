"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/ActivityBlock";

import ActivityFlow from "@/core/navigation/ActivityFlow";
import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";

import { activity2 } from "@/data/courses/activities/activity2";

import SemanticCoherenceSection from "./exercise-1/SemanticCoherenceSection";
import { semanticCategories } from "./exercise-1/data/semanticCoherenceData";

import ConcordanceSection from "./exercise-2/ConcordanceSection";
import ReportedSpeechSection from "./exercise-3/ReportedSpeechSection";

export default function Activity() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);

    window.setTimeout(() => {
      const element = document.getElementById("activity-exercises");

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
    <ActivityLayout activity={activity2}>
      <LessonBlock
        poster="/images/courses/intermediate-2/activities/activity2/henri-header.png"
        contentType="activity"
        level="intermediate-2"
        title="Les malheurs de Félix"
        description="Découvre les demandes de l'entourage de Félix et apprends à comprendre les liens logiques entre les situations et les propositions."
        videoSrc="/videos/courses/intermediate-2/activities/activity2/henri-presentation.mp4"
        info={{
          objectifs: [
            "Comprendre le sens des demandes rapportées",
            "Identifier les propositions cohérentes avec chaque situation",
            "Préparer le passage du style direct au style indirect",
          ],
          competences: [
            "Compréhension écrite",
            "Cohérence sémantique",
            "Transformation morphosyntaxique",
          ],
          prerequis: [
            "Connaître les structures de base du discours rapporté",
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
            Commencer l&apos;activité
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {started && (
          <motion.div
            id="activity-exercises"
            key="activity-flow"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ActivityNavigationProvider totalExercises={3}>
              <ActivityFlow
                finishHref="/courses/intermediate-2"
                teacher="intermediate-2"
                semanticCoherenceCategories={semanticCategories}
              >
                <SemanticCoherenceSection />

                <ConcordanceSection />

                <ReportedSpeechSection />
              </ActivityFlow>
            </ActivityNavigationProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </ActivityLayout>
  );
}