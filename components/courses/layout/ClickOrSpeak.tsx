"use client";

import type { ReactNode } from "react";

import ExerciseInstruction, {
  type ExerciseInstructionProps,
} from "./ExerciseInstruction";
import FloatingAudioPlayer from "./FloatingAudioPlayer";

type ClickOrSpeakProps = Omit<
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

export default function ClickOrSpeak({
  exerciseNumber = 1,
  category = "COMPRÉHENSION ORALE",
  title = "Découverte",
  description = "Écoute une première fois le dialogue ci-dessus, puis réponds aux questions.",
  example = "Écoute attentivement, puis réponds aux questions.",
  dialogueImageSrc = "/images/courses/audioBlock/beginner/am.png",
  dialogueImageAlt = "Illustration du dialogue à écouter",
  audioSrc,
  audioTitle = "Dialogue",
  audioHint = "Écoute attentivement le dialogue avant de répondre.",
  onStart,
  started = false,
  activityTitle,
  children,
}: ClickOrSpeakProps) {
  return (
    <>
      <ExerciseInstruction
        imageSrc="/images/clickorspeak.png"
        imageAlt={`Illustration de l’exercice ${exerciseNumber} Click or Speak`}
        category={category}
        title={title}
        description={description}
        example={example}
        activityTitle={activityTitle}
        steps={[
          {
            title: "Écoute",
            description:
              "Utilise le bouton audio pour écouter le dialogue et les réponses proposées.",
            icon: "sound",
          },
          {
            title: "Réponds",
            description:
              "Choisis ta réponse ou utilise le microphone pour répondre à l’oral.",
            icon: "mic",
          },
        ]}
        onStart={onStart}
        started={started}
      >
        {children}
      </ExerciseInstruction>

      {/* Le lecteur flottant apparaît après le démarrage */}
      {started && (
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