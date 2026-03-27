"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import Exercice from "./Exercice";
import Exercice2 from "./Exercice2";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";

export default function Activity() {
  return (
    <ActivityLayout>
      <LessonBlock
        badge="Niveau Élémentaire 2"
        title="Activité 1 — L’emploi du temps mouvementé de Clara"
        description="Dans cette activité, vous allez découvrir la journée quotidienne de Clara. Vous réviserez les heures, les moments de la journée, les verbes pronominaux et la conjugaison au présent."
        videoSrc="/videos/ireneactivity1subtitlefrench.mp4"
        poster="/images/courses/teacher/irenegood.png"
        info={{
          objectifs: [
            "Comprendre une journée type",
            "Réviser les verbes pronominaux",
            "Formuler des questions",
          ],
          competences: [
            "Compréhension orale",
            "Expression écrite",
            "Transformation grammaticale",
          ],
          prerequis: [
            "Présent de l’indicatif",
            "Questions interrogatives",
            "Pronoms sujets",
          ],
          duree: "35 minutes",
        }}
      />

      <LessonBlock
        title="Activité 1 — L’emploi du temps mouvementé de Clara"
        description="Dans cette activité, vous allez découvrir la journée quotidienne de Clara. Vous réviserez les heures, les moments de la journée, les verbes pronominaux et la conjugaison au présent."
        videoSrc="/videos/clara-video.mp4"
        poster="/images/courses/clarapic.png"
      />
      <ExerciseSection>
        <InstructionBlock title="Formule la question" description="Trouvez la question correspondante à chaque réponse pour dialoguer avec Clara. Vous pouvez répondre à l’oral (micro) ou à l’écrit.
">
        </InstructionBlock>

        <Exercice />
      </ExerciseSection>

      <ExerciseSection>
        <InstructionBlock title="Transformation JE → ELLE" description="    Transformez l’intégralité du texte en passant de « je » à « elle » et
          effectuez toutes les modifications nécessaires (pronoms, accords,
          possessifs, verbes pronominaux…).">
    
        </InstructionBlock>
        <Exercice2 />
      </ExerciseSection>
    </ActivityLayout>
  );
}
