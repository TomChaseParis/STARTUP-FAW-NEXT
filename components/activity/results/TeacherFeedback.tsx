"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import TeacherAvatar from "./TeacherAvatar";
import TeacherBubble from "./TeacherBubble";

type TeacherFeedbackProps = {
  score: number;
};

export default function TeacherFeedback({
  score,
}: TeacherFeedbackProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  let image = "";
  let title = "";
  let message = "";
  let audio = "";

  if (score < 50) {
    image = "/images/courses/results-expressions/beginner/mariepascontente.png";
    audio = "/audios/courses/beginner/activity2/marie-bad.mp3";

    title = "Ce n'est pas suffisant...";

    message =
      "Tu dois revoir les informations attentivement avant de continuer. Prends ton temps et réessaie. Tu vas y arriver !";
  } else if (score < 75) {
    image = "/images/courses/results-expressions/beginner/marieperplexe.png";
    audio = "/audios/courses/beginner/activity2/marie-middle.mp3";

    title = "Tu progresses !";

    message =
      "Tu as compris une bonne partie de l'exercice. Quelques réponses sont encore incorrectes. Relis bien les informations puis recommence.";
  } else {
    image = "/images/courses/results-expressions/beginner/mariecontente.png";
    audio = "/audios/courses/beginner/activity2/marie-good.mp3";

    title = "Excellent travail !";

    message =
      "Bravo ! Tu as très bien compris les informations. Continue comme ça !";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!audioRef.current) return;

      audioRef.current.currentTime = 0;

      audioRef.current.play().catch(() => {
        // Certains navigateurs peuvent bloquer l'autoplay
      });
    }, 700); // Laisse Marie terminer son animation

    return () => clearTimeout(timer);
  }, [audio]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -120 }}
        animate={{ opacity: 1, x: 0 }}
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

      <audio
        ref={audioRef}
        src={audio}
        preload="auto"
      />
    </>
  );
}