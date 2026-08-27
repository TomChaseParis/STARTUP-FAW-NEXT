"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import ActivityFlow from "@/core/navigation/ActivityFlow";
import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";

import ListeningDiscoverySection from "./exercises/ListeningDiscoverySection";
import ComprehensionSection from "./exercises/ComprehensionSection";
import ConjugationSection from "./exercises/ConjugationSection";

import { activity2 } from "@/data/courses/activities/activity2";

export default function Activity() {
  const [started, setStarted] = useState(false);
  const exercisesRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setStarted(true);

    // Attend que React ait affiché les exercices avant de scroller
    setTimeout(() => {
      exercisesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  return (
    <ActivityLayout activity={activity2}>
      <LessonBlock
level="beginner"
title="A l’Agence matrimoniale"
        description="Regarde la vidéo puis réponds aux questions."
        videoSrc="/videos/courses/beginner/activities/activity2/presentation.mp4"
        poster="/images/courses/beginner/activities/activity2/postermarie.png"
        info={{
          objectifs: ["Se présenter", "Répondre à des questions"],
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ActivityNavigationProvider
              totalExercises={activity2.exercises.length}
            >
              <ActivityFlow>
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