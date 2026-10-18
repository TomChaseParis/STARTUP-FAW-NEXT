"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import TeacherBubble from "../TeacherBubble";
import TeacherAvatar from "../TeacherAvatar";

type CompletionFeedback = {
  bad: string;
  middle: string;
  good: string;
  perfect: string;
};

// Audios utilisés par défaut pour Étienne
const DEFAULT_TEACHER_FEEDBACK_AUDIOS = {
  bad: "/audios/teacher/results/intermediate-1/etienne-0-50.mp3",
  middle: "/audios/teacher/results/intermediate-1/etienne-50-75.mp3",
  good: "/audios/teacher/results/intermediate-1/etienne-75-100.mp3",
  perfect: "/audios/teacher/results/intermediate-1/etienne-100.mp3",
};

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
  completionFeedback?: CompletionFeedback;
};

export default function TeacherFeedbackIntermediate1({
  score,
  variant = "activity",
  teacherFeedbackImages,
  teacherFeedbackAudios,
  completionFeedback,
}: TeacherFeedbackProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  let image = "";
  let title = "";
  let message = "";
  let audio = "";

  // Les audios transmis par les props sont prioritaires.
  // Si aucun audio n'est transmis, on utilise les chemins par défaut.
  const audios = {
    ...DEFAULT_TEACHER_FEEDBACK_AUDIOS,
    ...teacherFeedbackAudios,
  };

  if (variant === "lesson") {
    if (score === 100) {
      image =
        teacherFeedbackImages?.perfect ??
        "/images/courses/teacher/bulles/intermediate-1/good.png";

      audio = audios.perfect;

      message =
        "Bravo ! Tu sembles avoir très bien assimilé la leçon. Tu peux passer l'esprit tranquille aux activités.";
    } else if (score >= 75) {
      image =
        teacherFeedbackImages?.good ??
        "/images/courses/teacher/bulles/intermediate-1/good.png";

      audio = audios.good;

      message =
        "Tu as retenu l'essentiel, mais tu as fait quelques erreurs. Regarde bien la correction et passe aux activités.";
    } else if (score >= 50) {
      image =
        teacherFeedbackImages?.middle ??
        "/images/courses/teacher/bulles/intermediate-1/middle.png";

      audio = audios.middle;

      message =
        "Il reste des points à revoir, apparemment. Analyse tes erreurs et visualise à nouveau la leçon si tu en sens le besoin.";
    } else {
      image =
        teacherFeedbackImages?.bad ??
        "/images/courses/teacher/bulles/intermediate-1/bad.png";

      audio = audios.bad;

      message =
        "Tu ne sembles pas encore tout à fait prêt à passer aux activités. Visualise à nouveau attentivement la leçon et refais le test. Ce sera sûrement bien mieux la prochaine fois !";
    }
  } else if (score < 50) {
    image =
      teacherFeedbackImages?.bad ??
      "/images/courses/results-expressions/intermediate-1/etienne-blue/etienne-0-50.png";

    audio = audios.bad;
    title = "Pas génial...";

    message =
      completionFeedback?.bad ??
      "Mon conseil : réécoute attentivement le dialogue, analyse tes erreurs et recommence l’exercice. Ce sera mieux la prochaine fois !";
  } else if (score < 75) {
    image =
      teacherFeedbackImages?.middle ??
      "/images/courses/results-expressions/intermediate-1/etienne-blue/etienne-50-75.png";

    audio = audios.middle;
    title = "Peut mieux faire...";

    message =
      completionFeedback?.middle ??
      "Tu as bien répondu à la majorité des questions, mais il te reste une marge de progression. Regarde attentivement les corrections et recommence l’exercice. Tu y es presque !";
  } else if (score < 100) {
    image =
      teacherFeedbackImages?.good ??
      "/images/courses/results-expressions/intermediate-1/etienne-blue/etienne-75-100.png";

    audio = audios.good;
    title = "Bon travail !";

    message =
      completionFeedback?.good ??
      "L’essentiel est compris. Analyse les quelques erreurs que tu as faites et passe à l’exercice suivant !";
  } else {
    image =
      teacherFeedbackImages?.perfect ??
      "/images/courses/results-expressions/intermediate-1/etienne-blue/etienne-100.png";

    audio = audios.perfect;
    title = "Parfait !";

    message =
      completionFeedback?.perfect ??
      "Tu as bien répondu à toutes les questions. Tu peux passer à l’exercice suivant !";
  }

  useEffect(() => {
    if (!audio) return;

    const timer = window.setTimeout(() => {
      const audioElement = audioRef.current;

      if (!audioElement) return;

      audioElement.currentTime = 0;

      audioElement.play().catch((error) => {
        console.error(
          "[TeacherFeedbackIntermediate1] Échec audio :",
          {
            audio,
            error,
          }
        );
      });
    }, 700);

    return () => window.clearTimeout(timer);
  }, [audio]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -120 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="
          mt-6 flex w-full min-w-0 flex-col items-center gap-5
          sm:mt-8 sm:gap-6 md:flex-row md:items-center md:gap-10
        "
      >
        <div className="shrink-0">
          <TeacherAvatar image={image} />
        </div>

        <div className="w-full min-w-0">
          <TeacherBubble title={title} message={message} />
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