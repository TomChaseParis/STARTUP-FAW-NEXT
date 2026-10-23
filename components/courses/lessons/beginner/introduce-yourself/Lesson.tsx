"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LessonLayout from "@/components/courses/layout/LessonLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import IntroduceYourselfQuiz from "./exercice/QCM/introduce-yourself";

export default function Lesson() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);

    setTimeout(() => {
      document.getElementById("lesson-content")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 400);
  };

  return (
    <LessonLayout>
      <LessonBlock
        level="beginner"
        title="Présentations"
        description="Apprends à te présenter naturellement en français."
        videoSrc="https://vz-59620af9-b1f.b-cdn.net/15e8f303-14a7-448e-9690-0634dc67d365/playlist.m3u8"
        poster=""
        info={{
          objectifs: [
            "Apprendre à se présenter en français",
            "Comprendre les informations personnelles",
          ],
          competences: ["Compréhension orale", "Expression orale"],
          prerequis: [],
          duree: "À définir",
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
            Commencer la leçon
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {started && (
          <motion.div
            id="lesson-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <IntroduceYourselfQuiz />
          </motion.div>
        )}
      </AnimatePresence>
    </LessonLayout>
  );
}
