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
  teacherFeedbackImages,
  teacherFeedbackAudios,
}: TeacherFeedbackProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  let image = "";
  let title = "";
  let message = "";
  let audio = "";

  if (score < 50) {
    // 0 à 49 %
    image =
      teacherFeedbackImages?.bad ??
      "/images/courses/results-expressions/beginner/noob-red.png";

    audio =
      teacherFeedbackAudios?.bad ??
      "/audios/teacher/marie/score/pasgenial-marie.mp3";

    title = "Pas génial...";

    message =
      "Mon conseil : réécoute attentivement le dialogue, analyse tes erreurs et recommence l’exercice. Ce sera mieux la prochaine fois !";
  } else if (score < 75) {
    // 50 à 74 %
    image =
      teacherFeedbackImages?.middle ??
      "/images/courses/results-expressions/beginner/middle-red.png";

    audio =
      teacherFeedbackAudios?.middle ??
      "/audios/teacher/marie/score/marie-peutmieuxfaire.mp3";

    title = "Peut mieux faire...";

    message =
      "Tu as bien répondu à la majorité des questions, mais il te reste une marge de progression. Mon conseil : regarde attentivement les corrections et recommence l’exercice. Tu y es presque !";
  } else if (score < 100) {
    // 75 à 99 %
    image =
      teacherFeedbackImages?.good ??
      "/images/courses/results-expressions/beginner/bingo-red.png";

    audio =
      teacherFeedbackAudios?.good ??
      "/audios/teacher/marie/score/marie-parfait.mp3";

    title = "Bon travail !";

    message =
      "L’essentiel est compris. Analyse les quelques erreurs que tu as faites et passe à l’exercice suivant !";
  } else {
    // 100 %
    image =
      teacherFeedbackImages?.perfect ??
      "/images/courses/results-expressions/beginner/perfect-red.png";

    audio =
      teacherFeedbackAudios?.perfect ??
      "/audios/teacher/marie/score/marie-parfait.mp3";

    title = "Parfait !";

    message =
      "Tu as bien répondu à toutes les questions. Tu peux passer à l’exercice suivant !";
  }

  useEffect(() => {
    if (!audio) {
      return;
    }

    const timer = window.setTimeout(() => {
      const audioElement = audioRef.current;

      if (!audioElement) {
        return;
      }

      audioElement.currentTime = 0;

      audioElement.play().catch((error) => {
        console.warn(
          "[TeacherFeedback] Impossible de lire automatiquement l'audio.",
          error,
        );
      });
    }, 700);

    return () => {
      window.clearTimeout(timer);
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
        <div className="shrink-0">
          <TeacherAvatar image={image} />
        </div>

        <div className="w-full min-w-0">
          <TeacherBubble
            title={title}
            message={message}
          />
        </div>
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