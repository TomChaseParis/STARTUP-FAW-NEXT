
"use client";

import type { ReactNode } from "react";

import ExerciseInstruction, {
  type ExerciseInstructionProps,
  type ExerciseLevel,
} from "./ExerciseInstruction";

type DragAndDropProps = Omit<
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
  instructionImageSrc?: string;
  level?: ExerciseLevel;
  children?: ReactNode;
};

export default function DragAndDrop({
  exerciseNumber = 1,
  category = "COMPRÉHENSION ÉCRITE",
  title = "Glisser-déposer",
  description = "Lis attentivement les propositions, puis glisse chaque élément dans la bonne catégorie.",
  example = "Fais glisser chaque réponse vers la zone correspondante.",
  instructionImageSrc = "/images/EXO3QCM.png",
  onStart,
  started = false,
  activityTitle,
  level = "beginner",
  children,
}: DragAndDropProps) {
  return (
    <>
      {/* CARTE DE CONSIGNE */}
      <ExerciseInstruction
        imageSrc={instructionImageSrc}
        imageAlt={`Illustration de l’exercice ${exerciseNumber}`}
        category={category}
        title={title}
        description={description}
        example={example}
        activityTitle={activityTitle}
        level={level}
        steps={[
          {
            title: "Observe",
            description:
              "Lis attentivement les éléments proposés et observe les différentes catégories.",
            icon: "eye",
          },
          {
            title: "Glisse et dépose",
            description:
              "Déplace chaque élément dans la catégorie qui lui correspond.",
            icon: "drag",
          },
        ]}
        onStart={onStart}
        started={started}
      />

      {/* CONTENU DE L'EXERCICE */}
      {started && children && (
        <div className="container mt-8 w-full min-w-0">
          {children}
        </div>
      )}
    </>
  );
}
