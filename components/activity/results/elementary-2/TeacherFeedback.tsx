"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import TeacherBubble from "../TeacherBubble";
import TeacherAvatar from "../TeacherAvatar";

type TeacherFeedbackProps = {
  score: number;
  variant?: "activity" | "lesson";

  teacherFeedbackImages?: {
    bad: string;
    middle: string;
    good: string;
    perfect?: string;
  };

  teacherFeedbackAudios?: {
    bad: string;
    middle: string;
    good: string;
    perfect?: string;
  };
};

export default function TeacherFeedback({
  score,
  variant = "activity",
  teacherFeedbackImages,
  teacherFeedbackAudios,
}: TeacherFeedbackProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const defaultImages = {
    bad: "/images/courses/results-expressions/elementary-2/irene-0-50.png",
    middle:
      "/images/courses/results-expressions/elementary-2/irene-50-75.png",
    good:
      "/images/courses/results-expressions/elementary-2/irene-75-100.png",
    perfect:
      "/images/courses/results-expressions/elementary-2/irene-100.png",
  };

  const defaultAudios = {
    bad: "/audios/teacher/elementary-2/score/irene-0-50.mp3",
    middle:
      "/audios/teacher/elementary-2/score/irene-50-75.mp3",
    good:
      "/audios/teacher/elementary-2/score/irene-75-100.mp3",
    perfect:
      "/audios/teacher/elementary-2/score/irene-100.mp3",
  };

  let image = "";
  let title = "";
  let message = "";
  let audio = "";

  /* ========================================================= */
  /* FEEDBACK DE LEÇON                                         */
  /* ========================================================= */

  if (variant === "lesson") {
    if (score >= 100) {
      image = teacherFeedbackImages?.perfect ?? defaultImages.perfect;
      audio =
        "/audios/teacher/irene/lessons/score-lessons/lesson-100.mp3";

      title = "Excellent !";
      message =
        "Tu maîtrises parfaitement les notions de cette leçon. Tu peux maintenant passer aux activités et mettre tes connaissances en pratique.";
    } else if (score >= 75) {
      image = teacherFeedbackImages?.good ?? defaultImages.good;
      audio =
        "/audios/teacher/irene/lessons/score-lessons/lesson-75-99.mp3";

      title = "Très bien !";
      message =
        "Tu as compris l’essentiel. Reprends les quelques points qui t’ont posé problème, puis passe aux activités.";
    } else if (score >= 50) {
      image = teacherFeedbackImages?.middle ?? defaultImages.middle;
      audio =
        "/audios/teacher/irene/lessons/score-lessons/lesson-50-75.mp3";

      title = "À consolider";
      message =
        "Certaines notions méritent encore un peu d’attention. Relis la leçon et reprends les exemples avant de continuer.";
    } else {
      image = teacherFeedbackImages?.bad ?? defaultImages.bad;
      audio =
        "/audios/teacher/irene/lessons/score-lessons/lesson-0-50.mp3";

      title = "On reprend ensemble !";
      message =
        "Ne te décourage pas. Reprends la leçon tranquillement, concentre-toi sur les exemples et essaie de nouveau. C’est en pratiquant que tu vas progresser.";
    }
  } else {
    /* ======================================================= */
    /* FEEDBACK D'ACTIVITÉ                                     */
    /* ======================================================= */

    if (score < 50) {
      image = teacherFeedbackImages?.bad ?? defaultImages.bad;
      audio = teacherFeedbackAudios?.bad ?? defaultAudios.bad;

      title = "Pas génial...";
      message =
        "Mon conseil : réécoute attentivement les consignes, prends le temps de réfléchir à tes réponses et recommence l’exercice. Tu vas progresser !";
    } else if (score < 75) {
      image = teacherFeedbackImages?.middle ?? defaultImages.middle;
      audio = teacherFeedbackAudios?.middle ?? defaultAudios.middle;

      title = "Peut mieux faire...";
      message =
        "Tu as déjà fait de beaux efforts, mais certaines réponses méritent encore un peu d’attention. Regarde attentivement les corrections et recommence l’exercice. Tu y es presque !";
    } else if (score < 100) {
      image = teacherFeedbackImages?.good ?? defaultImages.good;
      audio = teacherFeedbackAudios?.good ?? defaultAudios.good;

      title = "Bon travail !";
      message =
        "Bravo ! Tu as bien compris l’essentiel. Quelques petites erreurs restent à corriger, mais tu es sur la bonne voie. Continue comme ça !";
    } else {
      image = teacherFeedbackImages?.perfect ?? defaultImages.perfect;
      audio = teacherFeedbackAudios?.perfect ?? defaultAudios.perfect;

      title = "Parfait !";
      message =
        "Félicitations ! Tu as répondu correctement à toutes les questions. Tu as parfaitement réussi cet exercice. Continue comme ça !";
    }
  }

  /* ========================================================= */
  /* LECTURE AUDIO                                             */
  /* ========================================================= */

  useEffect(() => {
    if (!audio) return;

    const timer = window.setTimeout(() => {
      const audioElement = audioRef.current;

      if (!audioElement) return;

      audioElement.currentTime = 0;

      audioElement.play().catch((error) => {
        console.warn(
          "[TeacherFeedback Irène] Lecture automatique impossible.",
          error,
        );
      });
    }, 700);

    return () => window.clearTimeout(timer);
  }, [audio]);

  /* ========================================================= */
  /* AFFICHAGE                                                 */
  /* ========================================================= */

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          x: -120,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="
          mt-6
          flex
          w-full
          min-w-0
          flex-col
          items-center
          gap-5
          sm:mt-8
          sm:gap-6
          md:flex-row
          md:items-center
          md:gap-10
        "
      >
        {/* AVATAR D'IRÈNE */}
        <div className="shrink-0">
          <TeacherAvatar image={image} />
        </div>

        {/* BULLE DE FEEDBACK */}
        <div className="w-full min-w-0">
          <TeacherBubble title={title} message={message} />

          {/* BARRE DE PROGRESSION */}
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-[#F0E7FF]">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.max(0, Math.min(100, score))}%`,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA]"
              />
            </div>

            <p className="mt-2 text-right text-sm font-bold text-[#6D28D9]">
              {Math.round(score)} % de réussite
            </p>
          </div>
        </div>
      </motion.div>

      {audio && (
        <audio
          key={audio}
          ref={audioRef}
          src={audio}
          preload="auto"
        />
      )}
    </>
  );
}