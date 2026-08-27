"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import FillInTheBlankSection from "./exercises/FillInTheBlankSection";

import { elementary1Activity3 } from "@/data/courses/activities/elementary-1/activity3/activity3";

export default function Activity() {
  return (
    <ActivityLayout activity={elementary1Activity3}>
      <LessonBlock
level="elementary-1"
title="Les 4 verbes au présent : Devoir, Vouloir, Pouvoir, Savoir"
        description="Regarde les images et complète les phrases avec le bon verbe."
        videoSrc="/videos/jeanactivity2subtitlefrench.mp4"
        poster="/images/courses/teacher/jeangood.png"
        info={{
          objectifs: [
            "Utiliser les verbes devoir, vouloir, pouvoir et savoir au présent",
          ],
          competences: ["Compréhension orale", "Conjugaison"],
          prerequis: ["Présent des verbes réguliers"],
          duree: "25 minutes",
        }}
      />

      <FillInTheBlankSection />
    </ActivityLayout>
  );
}