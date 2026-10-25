
"use client";

import type { ReactNode } from "react";
import ExerciseInstruction, {
  type ExerciseInstructionProps,
} from "./ExerciseInstruction";

type ClickAndSpeakInstructionProps = Omit<
  ExerciseInstructionProps,
  | "category"
  | "steps"
  | "children"
  | "pointAttention"
  | "imageSrc"
  | "imageAlt"
> & {
  category?: string;
  steps?: ExerciseInstructionProps["steps"];
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
};

const DEFAULT_STEPS: ExerciseInstructionProps["steps"] = [
  {
    title: "Écoute",
    description:
      "Utilise le bouton audio pour écouter l’exemple avec le pronom « Je ».",
    icon: "sound",
  },
  {
    title: "Prononce",
    description:
      "Appuie sur le bouton microphone avant de prononcer toute la phrase.",
    icon: "mic",
  },
];

export default function ClickAndSpeakInstruction({
  imageSrc = "/images/clickandspeak.png",
  imageAlt =
    "Souris avec un casque devant un tableau Click & Speak, exercice 3",
  category = "EXERCICE 3 · CONJUGAISON",
  title = "JE / TU / ELLE / NOUS / VOUS / ILS",
  description =
    "Après avoir écouté l’exemple, transforme chaque groupe de mots en une phrase correctement conjuguée selon le pronom demandé.",
  example = "être marié ➡️ Ils sont mariés",
  steps = DEFAULT_STEPS,
  onStart,
  started = false,
  children,
}: ClickAndSpeakInstructionProps) {
  return (
    <ExerciseInstruction
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      category={category}
      title={title}
      description={description}
      example={example}
      steps={steps}
      pointAttention={{
        imageSrc:
          "/images/courses/beginner/activities/brunogalopin/point.png",
        imageAlt: "Point d’attention",
        title: (
          <>
            Tu dois prononcer <strong>toute la phrase</strong> qui t’est
            proposée.
          </>
        ),
        example: (
          <>
            <p className="m-0">
              <strong>Exemple : « Ils ont un petit chien »</strong>
            </p>
            <p className="mb-0 mt-1">
              Pense à bien faire les liaisons avec le « s » à l’oral.
            </p>
            <p className="mb-0 mt-1">
              <strong>Vous [z] avez ; Ils [z] ont.</strong>
            </p>
          </>
        ),
      }}
      onStart={onStart}
      started={started}
    >
      {children}
    </ExerciseInstruction>
  );
}
