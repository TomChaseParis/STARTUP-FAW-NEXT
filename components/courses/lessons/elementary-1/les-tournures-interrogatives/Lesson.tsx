
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LessonLayout from "@/components/courses/layout/LessonLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import LessonTournuresQcm from "./exercice/QCM/LessonTournures";

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
        level="elementary-1"
        title="Les tournures interrogatives"
        description="Apprends à comprendre et à poser des questions en français."
        videoSrc="https://vz-e5c04cc2-bfc.b-cdn.net/b47eb0d9-86fb-4e05-ab02-dff813289086/playlist.m3u8"
        poster=""
        onVideoEnded={() => setHasWatchedVideo(true)}
        info={{
          objectifs: [
            "Découvrir les trois types de questions en français",
            "Comprendre les différentes tournures interrogatives",
            "Apprendre à poser des questions simplement",
          ],
          competences: [
            "Compréhension écrite",
            "Expression écrite",
            "Communication",
          ],
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
                  ? "bg-[#57CC99] hover:scale-105 hover:bg-[#46B987]"
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
            <LessonTournuresQcm />
          </motion.div>
        )}
      </AnimatePresence>
    </LessonLayout>
  );
}
