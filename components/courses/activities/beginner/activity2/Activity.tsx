"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import AudioBlock from "@/components/courses/blocks/AudioBlock";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import Exercice from "./Exercice";
import Exercice2 from "./Exercice2";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import Exercice3 from "./Exercice3";

export default function Activity() {
  return (
    <ActivityLayout>
      {/* ================= HEADER + VIDEO + INFO ================= */}
      <LessonBlock
        badge="Compréhension orale"
        title="À l’agence matrimoniale"
        description="Regarde la vidéo puis réponds aux questions."
        videoSrc="/videos/courses/beginner/activities/activity2/presentation.mp4"
        poster="/images/courses/beginner/activities/activity2/header.png"
        info={{
          objectifs: ["Se présenter", "Répondre à des questions"],
          competences: ["Compréhension orale", "Phonie / graphie", "Expression orale"],
          prerequis: [
            `Conjugaison au présent à la forme "tu" et "vous" des verbes de base pour savoir se présenter :
            avoir, être, faire, habiter, parler, etc.`,
            "Tournures interrogatives, questions et mots interrogatifs",
            "Chiffres et numéros",
          ],
          duree: "35 minutes",
        }}
      />

 
    <AudioBlock
        title="Écoute la conversation"
        audioSrc="/audios/courses/beginner/activity2/audio-matrimoniale.mp3"
        levelColor="amber"
        tip="Écoute deux fois avant de répondre."
      />

      <ExerciseSection>
      <InstructionBlock
  title="✍️ EXERCICE 2 : Compréhension"
  activityType="click"
  description={
    <div className="space-y-5 text-black">

      {/* INTRO */}
      <p className="font-medium">
        👉 Réponds aux questions à partir de la conversation que tu viens d’écouter.
      </p>

      {/* CONSIGNE */}
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
        <p className="text-sm text-slate-700">
          Pour réussir :
        </p>

        <ul className="text-sm text-slate-700 space-y-1">
          <li>• Lis bien chaque question</li>
          <li>• Choisis la bonne réponse</li>
          <li>• Aide-toi de ce que tu as compris à l’écoute</li>
        </ul>
      </div>

      {/* CONSEIL */}
      <div className="rounded-xl bg-amber-50 border border-amber-300 p-4">
        <p className="text-sm font-semibold text-amber-800 mb-1">
          💡 Astuce
        </p>
        <p className="text-sm text-amber-900">
          Si tu hésites, réécoute l’audio pour vérifier ta réponse.
        </p>
      </div>

    </div>
  }
/>
        <Exercice />
      </ExerciseSection>

      {/* ================= EXERCICE 2 ================= */}
      <ExerciseSection>
        <Exercice2 />
      </ExerciseSection>

  
   
    </ActivityLayout>
  );
}
