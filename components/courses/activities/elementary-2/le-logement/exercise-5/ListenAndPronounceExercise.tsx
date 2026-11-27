
"use client";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

import ListenAndPronounceEngine from "@/components/courses/engines/ListenAndPronounceEngine";

import { episode4Data } from "./episode4Data";

type Props = {
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

export default function ListenAndPronounceExercise({
  onComplete,
}: Props) {
  return (
    <div
      id="exercise-5-transition"
      className="w-full min-w-0 scroll-mt-10"
    >
      <ExerciseTransition number={5} />

      <ListenAndPronounceEngine
        phrases={episode4Data}
        audioSrc="/audios/courses/elementary-2/la-famille-demenage/decouverte-du-quartier.mp3"
        imageSrc="/images/courses/elementary2/le-logement/decouverte.png"
        onComplete={onComplete}
      />
    </div>
  );
}
