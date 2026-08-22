"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import TeacherAvatar from "./TeacherAvatar";
import TeacherBubble from "./TeacherBubble";

type TeacherFeedbackProps = {
  score: number;

  teacherFeedbackImages?: {
    bad: string;
    middle: string;
    good: string;
  };

  teacherFeedbackAudios?: {
    bad: string;
    middle: string;
    good: string;
  };
};

export default function TeacherFeedback({
  score,
  teacherFeedbackImages,
  teacherFeedbackAudios,
}: TeacherFeedbackProps) {
  const audioRef =
    useRef<HTMLAudioElement>(null);

  let image = "";
  let title = "";
  let message = "";
  let audio = "";

  if (score < 50) {
    image =
      teacherFeedbackImages?.bad ??
      "/images/courses/results-expressions/beginner/mariepascontente.png";

    audio =
      teacherFeedbackAudios?.bad ?? "";

    title = "Ce n'est pas suffisant...";

    message =
      "Tu dois revoir les informations attentivement avant de continuer. Prends ton temps et réessaie. Tu vas y arriver !";
  } else if (score < 75) {
    image =
      teacherFeedbackImages?.middle ??
      "/images/courses/results-expressions/beginner/marieperplexe.png";

    audio =
      teacherFeedbackAudios?.middle ?? "";

    title = "Tu progresses !";

    message =
      "Tu as compris une bonne partie de l'exercice. Quelques réponses sont encore incorrectes. Relis bien les informations puis recommence.";
  } else {
    image =
      teacherFeedbackImages?.good ??
      "/images/courses/results-expressions/beginner/mariecontente.png";

    audio =
      teacherFeedbackAudios?.good ?? "";

    title = "Excellent travail !";

    message =
      "Bravo ! Tu as très bien compris les informations. Continue comme ça !";
  }

  useEffect(() => {
    if (!audio) return;

    const timer = setTimeout(() => {
      if (!audioRef.current) return;

      audioRef.current.currentTime = 0;

      audioRef.current.play().catch(() => {
        // Certains navigateurs peuvent bloquer l'autoplay.
      });
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [audio]);

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
        className="mt-12 flex items-center gap-10"
      >
        <TeacherAvatar image={image} />

        <TeacherBubble
          title={title}
          message={message}
        />
      </motion.div>

      {audio && (
        <audio
          ref={audioRef}
          src={audio}
          preload="auto"
        />
      )}
    </>
  );
}