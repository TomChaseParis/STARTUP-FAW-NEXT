"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LessonLayout from "@/components/courses/layout/LessonLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import Intermediate1Quiz from "./exercice/QCM/Lesson";
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
        level="intermediate-1"
        title="L’imparfait d’habitude"
        description="Apprends à utiliser l’imparfait pour parler des habitudes et des actions répétées dans le passé."
        videoSrc="https://vz-92b9aa69-e73.b-cdn.net/00f0736f-4f01-428c-a350-a4237adb5e41/playlist.m3u8"
        poster=""
        info={{
          objectifs: [
            "Comprendre l’utilisation de l’imparfait d’habitude",
            "Identifier les actions répétées dans le passé",
          ],
          competences: ["Compréhension orale", "Compréhension grammaticale"],
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
              bg-[#38BDF8]
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[#0EA5E9]
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
            <Intermediate1Quiz />
          </motion.div>
        )}
      </AnimatePresence>
    </LessonLayout>
  );
}
