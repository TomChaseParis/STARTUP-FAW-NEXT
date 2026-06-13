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
        <div
          className="
            rounded-2xl
            border border-amber-200
            bg-gradient-to-br from-amber-50 via-white to-amber-50
            p-5
            shadow-sm
          "
        >
          {/* HEADER */}
          <div className="mb-4 flex items-center gap-4">
            {/* ICON */}
            <div
              className="
                flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-amber-300 to-yellow-400
                shadow-[0_10px_20px_rgba(245,158,11,0.25)]
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 3h6v4H9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 16h4"
                />
              </svg>
            </div>

            {/* LABEL */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                Consigne
              </p>

              <p className="text-sm text-slate-500">
                Suis les instructions avant de commencer
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <p className="text-base leading-relaxed text-slate-800">
            Écoute une première fois ce dialogue entre un homme et une
            conseillère matrimoniale, puis réponds aux questions.
          </p>
        </div>
      </div>
    }
  />
</ExerciseSection>
      <AudioBlock

imageSrc="/images/courses/beginner/activities/activity2/agence-matrimoniale.png"
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
        <div
          className="
            rounded-2xl
            border border-amber-200
            bg-gradient-to-br from-amber-50 via-white to-amber-50
            p-5
            shadow-sm
          "
        >
          {/* HEADER */}
          <div className="mb-4 flex items-center gap-4">
            {/* ICON */}
            <div
              className="
                flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-amber-300 to-yellow-400
                shadow-[0_10px_20px_rgba(245,158,11,0.25)]
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 3h6v4H9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 16h4"
                />
              </svg>
            </div>

            {/* LABEL */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                Consigne
              </p>

              <p className="text-sm text-slate-500">
                Suis les instructions avant de commencer
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <p className="text-base leading-relaxed text-slate-800">
            Ecoute une seconde fois ce dialogue et réponds aux questions.
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
