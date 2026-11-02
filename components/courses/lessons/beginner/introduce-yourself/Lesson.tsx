
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LessonLayout from "@/components/courses/layout/LessonLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import IntroduceYourselfQuiz from "./exercice/QCM/introduce-yourself";

const smoothScrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);

  if (!element) return;

  const startPosition = window.scrollY;
  const targetPosition =
    element.getBoundingClientRect().top + window.scrollY - 100;

  const distance = targetPosition - startPosition;
  const duration = 1100;

  let startTime: number | null = null;

  const animateScroll = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeInOut =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * easeInOut);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

export default function Lesson() {
  const [started, setStarted] = useState(false);
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);

  const handleStart = () => {
    if (!hasWatchedVideo) return;

    setStarted(true);

    window.setTimeout(() => {
      smoothScrollToElement("lesson-content");
    }, 300);
  };

  return (
    <LessonLayout>
      <LessonBlock
        level="beginner"
        title="Présentations"
        description="Apprends à te présenter naturellement en français."
        videoSrc="https://vz-29802eea-b38.b-cdn.net/bc1452b5-9b7d-4c0d-baca-a611dd21ff33/playlist.m3u8"
        poster=""
        onVideoEnded={() => setHasWatchedVideo(true)}
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
        <div className="container flex flex-col items-center gap-4">
          {!hasWatchedVideo && (
            <p className="text-center text-sm font-medium text-gray-500">
              Termine la vidéo pour débloquer la leçon.
            </p>
          )}

          {hasWatchedVideo && (
            <p className="text-center text-sm font-medium text-green-700">
              Vidéo terminée ! Tu peux commencer la leçon.
            </p>
          )}

          <button
            type="button"
            onClick={handleStart}
            disabled={!hasWatchedVideo}
            className={`
              rounded-xl
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              ${
                hasWatchedVideo
                  ? "bg-[#E09F00] hover:scale-105 hover:bg-[#C98D00]"
                  : "cursor-not-allowed bg-gray-300 opacity-70"
              }
            `}
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
