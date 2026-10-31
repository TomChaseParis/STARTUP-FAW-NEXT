
"use client";

import type { ReactNode } from "react";

import ExerciseInstruction, {
  type ExerciseInstructionProps,
} from "./ExerciseInstruction";

type ListenSpeakInstructionProps = Omit<
  ExerciseInstructionProps,
  "category" | "steps" | "children"
> & {
  category?: string;
  steps?: ExerciseInstructionProps["steps"];
  children?: ReactNode;
};

const DEFAULT_STEPS: ExerciseInstructionProps["steps"] = [
  {
    title: "Écoute",
    description: "Utilise le bouton audio pour écouter la conjugaison.",
    icon: "sound",
  },
  {
    title: "Réponds",
    description:
      "Appuie sur le bouton microphone avant de prononcer ta phrase.",
    icon: "mic",
  },
];

export default function ListenSpeakInstruction({
  imageSrc = "/images/etreavoirfairealler.png",
  imageAlt = "Tableau d’exercice de prononciation avec une souris qui invite l’apprenant à écouter et prononcer la phrase",
  category = "PRONONCIATION",
  title = "Je suis, tu as, elle fait, nous allons...",
  description = "Pour chaque verbe, écoute la conjugaison au présent, puis choisis la bonne forme verbale du verbe pour chaque phrase qui t’est proposée.",
  example,
  instruction,
  rappel,
  steps = DEFAULT_STEPS,
  onStart,
  started = false,
  activityTitle,
  level = "beginner",
  children,
}: ListenSpeakInstructionProps) {
  return (
    <ExerciseInstruction
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      category={category}
      title={title}
      description={description}
      example={example}
      instruction={instruction}
      rappel={rappel}
      steps={steps}
      onStart={onStart}
      started={started}
      activityTitle={activityTitle}
      level={level}
    >
      {children}
    </ExerciseInstruction>
  );
}
