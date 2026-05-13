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
        title="A l’Agence matrimoniale"
        description="Regarde la vidéo puis réponds aux questions."
        videoSrc="/videos/courses/beginner/activities/activity2/presentation.mp4"
        poster="/images/courses/beginner/activities/activity2/postermarie.png"
        info={{
          objectifs: ["Se présenter", "Répondre à des questions"],
          competences: [
            "Compréhension orale",
            "Phonie / graphie",
            "Expression orale",
          ],
          prerequis: [
            `Conjugaison au présent à la forme "tu" et "vous" des verbes de base pour savoir se présenter :
            avoir, être, faire, habiter, parler, etc.`,
            "Tournures interrogatives, questions et mots interrogatifs",
            "Chiffres et numéros",
          ],
          duree: "35 minutes",
        }}
      />

      <ExerciseSection>
        <InstructionBlock
          stampLabel="EXERCICE 1"
          title="DÉCOUVERTE"
          activityType="listen"
          description={
            <div className="space-y-5 text-black">
              {/* INTRO */}
              <p className="font-medium">
            
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-medium text-slate-600 mb-2">
                💡 Consigne :
              </p>
              <p className="text-base">
              Ecoute une première fois ce dialogue entre un homme et une
                conseillère matrimoniale et réponds aux questions.              </p>
            </div>

            </div>
            
          }
        />
      </ExerciseSection>

      <AudioBlock
        title="Écoute la conversation"
        audioSrc="/audios/courses/beginner/activity2/audio-matrimoniale.mp3"
        levelColor="amber"
        tip="Écoute deux fois avant de répondre."
      />

      <ExerciseSection>
        <InstructionBlock
          stampLabel="EXERCICE 2"
          title="COMPRÉHENSION"
          activityType="click"
          description={
            <div className="space-y-5 text-black">
              {/* INTRO */}
            
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-medium text-slate-600 mb-2">
                💡 Consigne :
              </p>
              <p className="text-base">
              Ecoute  une seconde fois ce dialogue et réponds aux questions.
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
