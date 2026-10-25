"use client";

import type { ReactNode } from "react";

import ExerciseInstruction, {
  type ExerciseInstructionProps,
} from "./ExerciseInstruction";

type ListenAndSpeakProps = Omit<
  ExerciseInstructionProps,
  | "imageSrc"
  | "imageAlt"
  | "category"
  | "title"
  | "description"
  | "example"
  | "steps"
  | "beforeStartContent"
> & {
  exerciseNumber?: number;
  category?: string;
  title?: string;
  description?: string;
  example?: string;
  dialogueImageSrc?: string;
  dialogueImageAlt?: string;
  audioSrc: string;
  audioTitle?: string;
  audioHint?: string;
  children?: ReactNode;
};

export default function ListenAndSpeak({
  exerciseNumber = 2,
  category = "COMPRÉHENSION ORALE",
  title = "Approfondissement",
  description =
    "Écoute une deuxième fois le dialogue, puis complète le tableau.",
  example =
    "Clique sur chaque réponse de ton choix, puis valide tes réponses quand tu as terminé.",
  onStart,
  started = false,
  activityTitle,
  children,
}: ListenAndSpeakProps) {
  return (
    <ExerciseInstruction
      imageSrc="/images/listenandclick.png"
      imageAlt={`Illustration de l’exercice ${exerciseNumber} Listen and Speak`}
      category={category}
      title={title}
      description={description}
      example={example}
      activityTitle={activityTitle}
      steps={[
        {
          title: "Écoute",
          description:
            "Écoute attentivement le dialogue une deuxième fois.",
          icon: "sound",
        },
        {
          title: "Complète le tableau",
          description:
            "Clique sur chaque réponse de ton choix, puis valide lorsque tu as terminé.",
          icon: "mic",
        },
      ]}
      onStart={onStart}
      started={started}
    >
      {children}
    </ExerciseInstruction>
  );
}