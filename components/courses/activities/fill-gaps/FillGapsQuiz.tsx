"use client";

import { useState } from "react";

import ActivityCard from "@/components/activity/ActivityCard/ActivityCard";
import useActivityNavigation from "@/components/activity/hooks/useActivityNavigation";
import useActivityAnswers from "@/components/activity/hooks/useActivityAnswers";

import FillGapsProgressiveRenderer from "./components/FillGapsProgressiveRenderer";

import { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";
import { FillGapsData } from "@/types/fillGapsTypes";

type FillGapsQuizProps = {
  data: FillGapsData;
  onComplete?: (result: ExerciseSessionResult) => void;
};

const computeScore = (correct: number, total: number) =>
  Math.round((correct / total) * 100);

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export default function FillGapsQuiz({
  data,
  onComplete,
}: FillGapsQuizProps) {
  const navigation = useActivityNavigation({
    questions: data.sentences,
  });

  const answers = useActivityAnswers<string>({
    totalQuestions: navigation.totalQuestions,
    initialValue: "",
  });

  const [validated, setValidated] = useState(false);

  const currentSentence = navigation.currentQuestion;

  const currentAnswer = answers.getAnswer(
    navigation.currentIndex,
  );

  const currentInput = currentSentence.parts.find(
    (
      part,
    ): part is (typeof currentSentence.parts)[number] & {
      type: "input";
    } => part.type === "input",
  );

  const isCorrect =
    currentInput !== undefined &&
    normalize(currentAnswer) ===
      normalize(currentInput.answer);

  const handleNext = () => {
    /*
     * PREMIER CLIC :
     *
     * On valide uniquement la question actuelle.
     *
     * Elle reste affichée dans le tableau.
     */
    if (!validated) {
      setValidated(true);
      return;
    }

    /*
     * DERNIÈRE QUESTION :
     *
     * Toutes les réponses ont maintenant été données.
     * On calcule le score final.
     */
    if (navigation.isLastQuestion) {
      let correct = 0;

      const history = data.sentences.map(
        (sentence, index) => {
          const input = sentence.parts.find(
            (
              part,
            ): part is (typeof sentence.parts)[number] & {
              type: "input";
            } => part.type === "input",
          );

          const answer = answers.answers[index] ?? "";

          const isCorrect =
            input !== undefined &&
            normalize(answer) ===
              normalize(input.answer);

          if (isCorrect) {
            correct++;
          }

          return {
            questionId: sentence.id,

            question: sentence.parts
              .map((part) =>
                part.type === "text"
                  ? part.value
                  : "_____",
              )
              .join(""),

            selectedAnswer: answer,

            correctAnswer: input?.answer ?? "",

            isCorrect,
          };
        },
      );

      const startedAt = new Date();
      const finishedAt = new Date();

      onComplete?.({
        score: computeScore(
          correct,
          data.sentences.length,
        ),

        correctAnswers: correct,

        totalQuestions: data.sentences.length,

        history,

        startedAt,

        finishedAt,

        duration: Math.round(
          (finishedAt.getTime() -
            startedAt.getTime()) /
            1000,
        ),
      });

      return;
    }

    /*
     * QUESTION SUIVANTE :
     *
     * On ne remplace plus la question précédente.
     *
     * Le renderer affichera automatiquement :
     *
     * Question 1
     * Question 2
     *
     * puis :
     *
     * Question 1
     * Question 2
     * Question 3
     */
    navigation.next();

    /*
     * La nouvelle question n'est pas encore validée.
     */
    setValidated(false);
  };

  return (
    <ActivityCard
      title={data.title}
      current={navigation.currentIndex + 1}
      total={navigation.totalQuestions}
      question={data.instruction}
      canGoBack={false}
      canContinue={currentAnswer.trim() !== ""}
      isLastQuestion={navigation.isLastQuestion}
      validated={validated}
      onPrevious={navigation.previous}
      onNext={handleNext}
    >
      <FillGapsProgressiveRenderer
        sentences={data.sentences}
        currentIndex={navigation.currentIndex}
        answers={answers.answers}
        validated={validated}
        onChange={(index, value) =>
          answers.setAnswer(index, value)
        }
      />
    </ActivityCard>
  );
}