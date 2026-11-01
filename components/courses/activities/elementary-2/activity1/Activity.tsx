
"use client";

import {
  useState,
  useCallback,
  useEffect,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import FloatingVideoPlayer from "@/components/courses/layout/FloatingVideoPlayer";
import ActivityFlow from "@/core/navigation/ActivityFlow";
import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";

import { elementary2Activity1 } from "@/data/courses/activities/elementary-2/activity1/activity1";

import FillGapsReport from "@/components/courses/common/result/FillGapsReport";

import QCMSection from "./exercise-1/QCMSection";
import QuestionMatchingSection from "./exercise-2/QuestionMatchingSection";
import TransformationTypeSection from "./exercise-3/TransformationTypeSection";

import { transformationTypeData } from "./exercise-3/data/TransformationTypeData";

export default function Activity() {
  // Démarrage global de l'activité.
  const [activityStarted, setActivityStarted] = useState(false);

  // Démarrage indépendant de l'exercice 2.
  const [questionMatchingStarted, setQuestionMatchingStarted] =
    useState(false);

  /* ========================================================= */
  /* DÉMARRAGE DE L'ACTIVITÉ                                   */
  /* ========================================================= */

  const handleStart = useCallback(() => {
    setActivityStarted(true);
  }, []);

  /* ========================================================= */
  /* DÉMARRAGE DE L'EXERCICE 2                                 */
  /* ========================================================= */

  const handleQuestionMatchingStart = useCallback(() => {
    setQuestionMatchingStarted(true);
  }, []);

  /* ========================================================= */
  /* SCROLL VERS LE PREMIER EXERCICE                           */
  /* ========================================================= */

  useEffect(() => {
    if (!activityStarted) return;

    let attempts = 0;
    let timeoutId: number | undefined;
    let animationFrameId: number | undefined;

    const scrollToFirstExercise = () => {
      const element = document.getElementById(
        "qcm-instruction",
      );

      if (!element) {
        attempts += 1;

        if (attempts < 20) {
          timeoutId = window.setTimeout(
            scrollToFirstExercise,
            100,
          );
        }

        return;
      }

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

        const progress = Math.min(
          elapsed / duration,
          1,
        );

        const easedProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 -
              Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(
          0,
          startPosition + distance * easedProgress,
        );

        if (progress < 1) {
          animationFrameId =
            window.requestAnimationFrame(animateScroll);
        }
      };

      animationFrameId =
        window.requestAnimationFrame(animateScroll);
    };

    // Attend le montage complet des sections.
    timeoutId = window.setTimeout(
      scrollToFirstExercise,
      400,
    );

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      if (animationFrameId !== undefined) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activityStarted]);

  /* ========================================================= */
  /* RENDU                                                     */
  /* ========================================================= */

  return (
    <ActivityLayout activity={elementary2Activity1}>
      {/* PRÉSENTATION DE L'ACTIVITÉ */}
      <LessonBlock
        level="elementary-2"
        title="L’emploi du temps mouvementé de Clara"
        description="Dans cette activité, vous allez découvrir la journée quotidienne de Clara. Vous réviserez les heures, les moments de la journée, les verbes pronominaux et la conjugaison au présent."
        videoSrc="/videos/courses/elementary-2/activity1/presentation.mp4"
        poster="/images/courses/elementary2/activity1/posterirene.png"
        info={{
          objectifs: [
            "Comprendre une journée type",
            "Réviser les verbes pronominaux",
            "Formuler des questions",
          ],
          competences: [
            "Compréhension orale",
            "Expression écrite",
            "Transformation grammaticale",
          ],
          prerequis: [
            "Présent de l’indicatif",
            "Questions interrogatives",
            "Pronoms sujets",
          ],
          duree: "35 minutes",
        }}
      />

      {/* BOUTON DE DÉMARRAGE */}
      {!activityStarted && (
        <div className="container flex justify-center py-8">
          <button
            type="button"
            onClick={handleStart}
            className="
              rounded-xl
              border-2
              border-[rgb(38,69,34)]
              bg-[rgb(49,87,44)]
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[rgb(38,69,34)]
            "
          >
            Commencer l&apos;activité
          </button>
        </div>
      )}

      {/* AFFICHAGE DES TROIS EXERCICES */}
      <AnimatePresence mode="wait">
        {activityStarted && (
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
            <ActivityNavigationProvider totalExercises={3}>
              <ActivityFlow
                teacher="elementary-2"
                finishHref="/courses/elementary-2"
                detailedReportRenderer={(result, exerciseIndex) => {
                  /*
                   * EXERCICE 1 — QCM
                   */
                  if (exerciseIndex === 0) {
                    return null;
                  }

                  /*
                   * EXERCICE 2 — ASSOCIATION
                   */
                  if (exerciseIndex === 1) {
                    return null;
                  }

                  /*
                   * EXERCICE 3 — TRANSFORMATION SYNTAXIQUE
                   */
                  if (exerciseIndex === 2) {
                    return (
                      <FillGapsReport
                        data={transformationTypeData}
                        history={result.session.history}
                      />
                    );
                  }

                  return null;
                }}
              >
                {/* EXERCICE 1 */}
                <QCMSection />

                {/* EXERCICE 2 */}
                <QuestionMatchingSection
                  started={questionMatchingStarted}
                  onStart={handleQuestionMatchingStart}
                />

                {/* EXERCICE 3 */}
                <TransformationTypeSection />
              </ActivityFlow>
            </ActivityNavigationProvider>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LECTEUR VIDÉO FLOTTANT DE CLARA */}
      {activityStarted && (
        <FloatingVideoPlayer
          videoSrc="/videos/courses/elementary-2/activity1/clara.mp4"
          poster="/videos/courses/elementary-2/activity1/clara.mp"
          title="La journée de Clara"
          hint="Tu peux revoir la vidéo à tout moment pour retrouver les informations utiles aux exercices."
        />
      )}
    </ActivityLayout>
  );
}
