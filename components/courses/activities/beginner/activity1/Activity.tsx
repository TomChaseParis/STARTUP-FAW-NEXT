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
          description="Regarde la vidéo puis écoute et répète les conjugaisons."
          videoSrc="/videos/marieactivity1subtitlefrench.mp4"
          poster="/images/courses/teacher/mariegood.png"
          info={{
            objectifs: [
              "Comprendre la conjugaison des verbes essentiels",
              "S’entraîner à les utiliser dans des phrases",
            ],
            competences: ["Compréhension orale", "Compréhension écrite"],
            prerequis: ["Vocabulaire du quotidien"],
            duree: "20 minutes",
          }}
        />
      </div>

      {/* ================= VERB CARDS GRID ================= */}
      <ExerciseSection>
        <InstructionBlock
          title="🎧 Écoute et observe"
          subtitle="Découvre comment se conjuguent les verbes essentiels"
          description={
            <div className="space-y-3 text-black">
              <p>
                Clique sur chaque verbe pour écouter sa conjugaison.
              </p>
              <p>
                Répète à voix haute pour t’entraîner à mémoriser les formes.
              </p>
            </div>
          }
          activityType="listen"
        />

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
      </ExerciseSection>

      {/* ================= EXERCISE SECTION ================= */}
      <ExerciseSection width="wide">
        <InstructionBlock
          title="✍️ Complète les phrases"
          subtitle="Utilise le bon verbe au présent"
          description={
            <div className="space-y-3 text-black">
              <p>
                Complète chaque phrase avec le verbe correct :
                <strong> être, avoir, faire ou aller</strong>.
              </p>
              <p>
                Fais attention à la conjugaison selon le sujet.
              </p>
            </div>
          }
          activityType="click-or-speak"
        />
        <Exercice />
      </ExerciseSection>

    </ActivityLayout>
  );
}