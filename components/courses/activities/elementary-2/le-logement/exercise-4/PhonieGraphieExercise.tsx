
"use client";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import FloatingAudioPlayer from "@/components/courses/layout/FloatingAudioPlayer";
import OrthographeInlineEngine from "@/components/courses/engines/OrthographeInlineEngine";

import { episode3Data } from "./episode3Data";

type PhonieGraphieExerciseProps = {
  onComplete: (result: ExerciseSessionResult) => void;
};

type ExerciseTransitionProps = {
  number: number;
};

function ExerciseTransition({ number }: ExerciseTransitionProps) {
  return (
    <div
      className="relative z-10 flex h-[120px] items-center justify-center"
      aria-label={`Étape ${number}`}
    >
      <div
        aria-hidden="true"
        className="
          absolute
          -bottom-9
          -top-9
          left-1/2
          w-0
          -translate-x-1/2
          border-l-2
          border-dashed
          border-[rgb(49,87,44)]
        "
      />

      <span
        className="
          relative
          z-10
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          border-2
          border-white
          bg-[rgb(49,87,44)]
          text-base
          font-extrabold
          text-white
          shadow-[0_2px_8px_rgba(49,87,44,0.25)]
          ring-1
          ring-[rgb(87,204,153)]
        "
      >
        {number}
      </span>
    </div>
  );
}

export default function PhonieGraphieExercise({
  onComplete,
}: PhonieGraphieExerciseProps) {
  return (
    <>
      <ExerciseTransition number={4} />

      <div
        id="phonie-graphie-content"
        className="w-full min-w-0 scroll-mt-10"
      >
        <OrthographeInlineEngine
          text={episode3Data}
          onComplete={onComplete}
        />
      </div>

      <FloatingAudioPlayer
        audioSrc="/audios/courses/elementary-2/la-famille-demenage/le-demenagement.mp3"
        imageSrc="/images/le-demenagement.png"
        imageAlt="Le déménagement"
        title="Épisode 3 — Le déménagement"
        hint="Écoute attentivement le texte du déménagement pendant que tu réalises l'exercice."
      />
    </>
  );
}
