"use client";

import type { ReactNode } from "react";

import ExerciseInstruction, {
  type ExerciseInstructionProps,
  type ExerciseLevel,
} from "./ExerciseInstruction";
import FloatingAudioPlayer from "./FloatingAudioPlayer";

type ClickAndListenProps = Omit<
  ExerciseInstructionProps,
  | "imageSrc"
  | "imageAlt"
  | "category"
  | "title"
  | "description"
  | "example"
  | "instruction"
  | "steps"
  | "beforeStartContent"
> & {
  exerciseNumber?: number;
  category?: string;
  title?: string;
  description?: string;
  example?: string;
  instruction?: string;
  instructionImageSrc?: string;
  dialogueImageSrc?: string;
  dialogueImageAlt?: string;
  audioSrc?: string;
  audioTitle?: string;
  audioHint?: string;
  level?: ExerciseLevel;
  children?: ReactNode;
};

export default function ClickAndListen({
  exerciseNumber = 3,
  category = "MÉMORISATION",
  title = "Écoute et mémorise",
  description = "Écoute attentivement, puis observe les éléments avant de répondre.",
  instruction = "Associe chaque image avec son descriptif pour reconstituer les paires.",
  example,
  instructionImageSrc = "/images/clickandlisten.png",
  dialogueImageSrc = "/images/PHONIEGRAPHIEJEAN.PNG",
  dialogueImageAlt = "Illustration de l’exercice de mémorisation",
  audioSrc,
  audioTitle = "Les loisirs des Français",
  audioHint = "Réécoute l'audio pour t'aider à mémoriser.",
  onStart,
  started = false,
  activityTitle = "EXERCICE 3",
  level = "elementary-1",
  children,
}: ClickAndListenProps) {
  const hasAudio = Boolean(audioSrc);

  return (
    <>
      <ExerciseInstruction
        imageSrc={instructionImageSrc}
        imageAlt={`Illustration de l’exercice ${exerciseNumber}`}
        category={category}
        title={title}
        description={description}
        instruction={instruction}
        activityTitle={activityTitle}
        level={level}
        steps={
          hasAudio
            ? [
                {
                  title: "Écoute",
                  description: "Écoute attentivement les éléments proposés.",
                  icon: "sound",
                },
                {
                  title: "Mémorise",
                  description:
                    "Observe les éléments et mémorise-les avant de jouer.",
                  icon: "click",
                },
              ]
            : [
                {
                  title: "Observe",
                  description: "Observe attentivement les éléments présentés.",
                  icon: "sound",
                },
                {
                  title: "Mémorise",
                  description:
                    "Mémorise les éléments pour retrouver les bonnes réponses.",
                  icon: "click",
                },
              ]
        }
        onStart={onStart}
        started={started}
      >
        {children}
      </ExerciseInstruction>

      {started && audioSrc && (
        <FloatingAudioPlayer
          audioSrc={audioSrc}
          imageSrc={dialogueImageSrc}
          imageAlt={dialogueImageAlt}
          title={audioTitle}
          hint={audioHint}
        />
      )}
    </>
  );
}
