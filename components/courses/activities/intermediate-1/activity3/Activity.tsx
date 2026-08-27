"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import SentenceAnswerSection from "./exercises/SentenceAnswerSection";
import QuizSection from "./exercises/QuizSection";
import { intermediate1Activity3 } from "@/data/courses/activities/intermediate-1/activity3/activity3";


export default function Activity() {
  return (
    <ActivityLayout activity={intermediate1Activity3}>
      <LessonBlock
        level="intermediate-1"
        title="LE, LA, LES, LUI, LEUR, EUX, ELLES"
        description="Apprends à utiliser les pronoms compléments COD, COI et les pronoms toniques dans des situations de la vie quotidienne."
        videoSrc="/videos/etienne-pronoms.mp4"
        poster="/images/courses/teacher/etienne-wide-1.png"
        info={{
          objectifs: [
            "Identifier les pronoms complément COD (le, la, l’, les).",
            "Identifier les pronoms complément COI (lui, leur).",
            "Utiliser correctement les pronoms toniques (lui, elle, eux, elles).",
          ],
          competences: [
            "Grammaire en contexte",
          ],
          prerequis: [
            "Pronoms COD : le, la, l’, les",
            "Pronoms COI : lui, leur",
            "Pronoms toniques : lui, elle, eux, elles",
          ],
          duree: "20 minutes",
        }}
      />
      <SentenceAnswerSection />

      

      <QuizSection />

 
    </ActivityLayout>
  );
}