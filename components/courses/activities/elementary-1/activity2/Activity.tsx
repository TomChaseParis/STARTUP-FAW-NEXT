"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import QuizEngine from "@/components/courses/blocks/QuizEngine";
import { quizData } from "./quizData";
import Exercice2 from "./Exercice";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";

export default function Activity() {
  return (
    <ActivityLayout>
      <LessonBlock
        badge="Compréhension orale"
        title="Les loisirs des Français"
        description="Regarde les images et choisis la bonne réponse."
        videoSrc="/videos/jeanactivity2subtitlefrench.mp4"
        poster="/images/courses/teacher/jeangood.png"
        info={{
          objectifs: ["Parler des loisirs"],
          competences: ["Compréhension orale", "Vocabulaire"],
          prerequis: ["Présent — 3e personne du pluriel"],
          duree: "25 minutes",
        }}
      />

      <ExerciseSection>
        <InstructionBlock
          title="✍️ Exercice"
          activityType="type"
          subtitle="Testez vos connaissances en choisissant la bonne réponse à chaque question."
          description="Exemple : Les jeunes _______ (passer) beaucoup de temps sur internet."
    
    
        />
        <Exercice2 />
      </ExerciseSection>

      <ExerciseSection>
      <InstructionBlock
        title="Trouve la bonne réponse à chaque question"
        description="Regarde la vidéo puis choisis la bonne question à poser à chaque personnage dans le QCM ci-dessous."
        activityType="click-or-speak"
      ></InstructionBlock>
            <QuizEngine questions={quizData} />

      </ExerciseSection>
    </ActivityLayout>
  );
}
