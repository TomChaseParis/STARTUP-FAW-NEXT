
"use client";

import type { ReactNode } from "react";

import ExerciseInstruction, {
  type ExerciseInstructionProps,
} from "./ExerciseInstruction";

type TypeInstructionProps = Omit<
  ExerciseInstructionProps,
  "category" | "steps" | "children"
> & {
  level: ExerciseInstructionProps["level"];
  category?: string;
  steps?: ExerciseInstructionProps["steps"];
  children?: ReactNode;
};

const DEFAULT_STEPS: ExerciseInstructionProps["steps"] = [
  {
    title: "Lis",
    description:
      "Lis attentivement la consigne et la phrase proposée.",
    icon: "keyboard",
  },
  {
    title: "Complète",
    description:
      "Saisis la bonne réponse en respectant la conjugaison.",
    icon: "keyboard",
  },
];

export default function TypeInstruction({
  level,
  imageSrc,
  imageAlt,
  activityTitle,
  category = "EXERCICE ÉCRIT",
  title,
  description,
  example,
  instruction,
  rappel,
  steps = DEFAULT_STEPS,
  onStart,
  started = false,
  children,
}: TypeInstructionProps) {
  return (
    <ExerciseInstruction
      level={level}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      activityTitle={activityTitle}
      category={category}
      title={title}
      description={description}
      example={example}
      instruction={instruction}
      rappel={rappel}
      steps={steps}
      onStart={onStart}
      started={started}
    >
      {children}
    </ExerciseInstruction>
  );
}
