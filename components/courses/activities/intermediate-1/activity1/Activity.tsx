"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";
import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import ActivityFlow from "@/core/navigation/ActivityFlow";
import LessonBlock from "@/components/courses/layout/ActivityBlock";

import FillGapsSection from "./exercice-1/FillGapsSection";
import QCMSection from "./exercice-2/QCMSection";

import FillGapsReport from "@/components/courses/common/result/FillGapsReport";
import { episodeVacancesData } from "./episodeVacancesData";

import { intermediate1Activity1 } from "@/data/courses/activities/intermediate-1/activity1/activity1";

export default function Activity() {
  const [started, setStarted] = useState(false);
  const exerciseRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setStarted(true);
  };

  useEffect(() => {
    if (!started) return;

    // Attend que le conteneur des exercices soit rendu dans le DOM.
    const frameId = requestAnimationFrame(() => {
      exerciseRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, [started]);

  return (
    <ActivityLayout activity={intermediate1Activity1}>
      <LessonBlock
        contentType="activity"
        level="intermediate-1"
        title="Les vacances au bord de la mer"
        description="Écoute la chanson puis réponds aux questions."
        videoSrc="/videos/courses/intermediate-1/activity1/presentation.mp4"
        poster="/images/courses/intermediate1/activity1/posteretienne.png"
        info={{
          objectifs: [
            "Évoquer ses souvenirs d’enfance",
            "Parler de ses vacances",
          ],
          competences: [
            "Compréhension orale",
            "Phonie / graphie",
            "Vocabulaire de la mer et de la famille",
            "Expression orale",
          ],
          prerequis: [
            "Lexique des vacances",
            "Conjugaison de l'imparfait : j’allais, tu allais, il/elle/on allait…",
          ],
          duree: "25 minutes",
        }}
      />

      {!started && (
        <div className="container flex justify-center">
          <button
            type="button"
            onClick={handleStart}
            className="
            rounded-xl
            bg-[rgb(56,189,248)]
            px-8
            py-4
            text-lg
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-105
            hover:bg-[rgb(14,165,233)]
          "
          >
            Commencer l&apos;activité
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {started && (
          <motion.div
            ref={exerciseRef}
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
              totalExercises={intermediate1Activity1.exercises.length}
            >
              <ActivityFlow
                teacher="intermediate-1"
                finishHref="/courses/intermediate-1/modules/imparfait-dhabitude"
                hideAnswerHistoryForExercises={[0]}
                detailedReportRenderer={(result, exerciseIndex) => {
                  if (exerciseIndex !== 0) {
                    return null;
                  }

                  return (
                    <FillGapsReport
                      data={episodeVacancesData}
                      history={result.session.history}
                    />
                  );
                }}
              >
                <FillGapsSection />
                <QCMSection />
              </ActivityFlow>
            </ActivityNavigationProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </ActivityLayout>
  );
}
