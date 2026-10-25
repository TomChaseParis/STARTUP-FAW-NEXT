"use client";

import type { ReactNode } from "react";

import ExerciseInstruction, {
  type ExerciseInstructionProps,
} from "./ExerciseInstruction";

type ListenAndTypeProps = Omit<
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
    description:
      "Réécoute attentivement le dialogue pour retrouver les formes verbales.",
    icon: "sound",
  },
  {
    title: "Écris",
    description:
      "Complète les phrases avec les bonnes formes des verbes être et avoir au présent.",
    icon: "keyboard",
  },
];

export default function ListenAndType({
  imageSrc,
  imageAlt,
  activityTitle,
  category = "PHONIE / GRAPHIE",
  title,
  description,
  example,
  steps = DEFAULT_STEPS,
  onStart,
  started = false,
  children,
}: ListenAndTypeProps) {
  return (
    <ExerciseInstruction
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      activityTitle={activityTitle}
      category={category}
      title={title}
      description={description}
      example={example}
      steps={steps}
      onStart={onStart}
      started={started}
    >
      {children}
    </ExerciseInstruction>
  );
}