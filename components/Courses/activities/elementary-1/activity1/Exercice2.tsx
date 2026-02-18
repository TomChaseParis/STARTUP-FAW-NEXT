"use client";

import QuizEngine from "@/components/courses/blocks/QuizEngine";
import { useMemo } from "react";
import { quizData2 } from "./quizData2";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

export default function Exercice2() {
  const questions = useMemo(() => quizData2 ?? [], []);

  return (
    <>
      <InstructionBlock title="✍️ Exercice"  subtitle="Trouvez à chaque fois, la bonne question à poser à chacun des personnages." description="Faites connaissance avec Norbert, Mariama et Adrien en regardant la petite vidéo, puis posez-leur des questions. Attention, ils sont susceptibles ! Vous devez choisir la bonne question si vous voulez qu’ils vous répondent gentiment.">
      </InstructionBlock>
      <QuizEngine questions={questions} />;
    </>
  );
}
