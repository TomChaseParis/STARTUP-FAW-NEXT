"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import VerbCard from "@/components/courses/blocks/VerbCard";
import Exercice from "./Exercice";

export default function Activity() {
  return (
    <ActivityLayout>

      {/* ================= HEADER + VIDEO ================= */}
      <div className="mx-auto w-full max-w-6xl px-6">
        <LessonBlock
          badge="Grammaire"
          title="Les 4 verbes essentiels : Être – Avoir – Faire – Aller"
          description="Regarde la vidéo d’abord, puis écoute et répète les conjugaisons."
          videoSrc="/videos/marie-activity-verbs.mp4"
          poster="/images/courses/teacher/mariegood.png"
          info={{
            objectifs: [
              "Écouter la conjugaison des verbes",
              "Pratiquer la conjugaison dans l'exercice",
            ],
            competences: ["Compréhension orale", "Compréhension écrite"],
            prerequis: ["Vocabulaire du quotidien"],
            duree: "20 minutes",
          }}
        />
      </div>

      {/* ================= VERB CARDS GRID ================= */}
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <VerbCard
            title="ÊTRE"
            forms={[
              "Je suis",
              "Tu es",
              "Il/Elle est",
              "Nous sommes",
              "Vous êtes",
              "Ils/Elles sont",
            ]}
            onPlay={() => new Audio("/audios/etre.mp3").play()}
          />

          <VerbCard
            title="AVOIR"
            forms={[
              "J’ai",
              "Tu as",
              "Il/Elle a",
              "Nous avons",
              "Vous avez",
              "Ils/Elles ont",
            ]}
            onPlay={() => new Audio("/audios/avoir.mp3").play()}
          />

          <VerbCard
            title="FAIRE"
            forms={[
              "Je fais",
              "Tu fais",
              "Il/Elle fait",
              "Nous faisons",
              "Vous faites",
              "Ils/Elles font",
            ]}
            onPlay={() => new Audio("/audios/faire.mp3").play()}
          />

          <VerbCard
            title="ALLER"
            forms={[
              "Je vais",
              "Tu vas",
              "Il/Elle va",
              "Nous allons",
              "Vous allez",
              "Ils/Elles vont",
            ]}
            onPlay={() => new Audio("/audios/aller.mp3").play()}
          />

        </div>
      </div>

      {/* ================= EXERCISE SECTION ================= */}
      <ExerciseSection width="wide">
        <InstructionBlock
          title="✍️ Exercice - Complète chaque phrase avec le bon verbe."
          description="Lis chaque phrase puis appuie sur le micro pour dire le mot manquant."
        />
        <Exercice />
      </ExerciseSection>

    </ActivityLayout>
  );
}
