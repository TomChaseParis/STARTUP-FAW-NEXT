"use client";

import { useRef, useState } from "react";
import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import VerbCard from "@/components/courses/blocks/VerbCard";
import Exercice from "./Exercice";
import Exercice3 from "./Exercice3";
import Exercice4 from "./Exercice4";

export default function Activity() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(
    null,
  );

  const playVerbAudio = (id: string, src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(src);
    audioRef.current = audio;

    setCurrentlyPlayingId(id);

    audio.play();

    audio.onended = () => {
      setCurrentlyPlayingId(null);
    };

    audio.onerror = () => {
      setCurrentlyPlayingId(null);
    };
  };

  return (
    <ActivityLayout>
      {/* ================= HEADER + VIDEO ================= */}
      <div className="mx-auto w-full max-w-6xl px-6">
        <LessonBlock
          badge="Grammaire"
          title="Les 4 verbes essentiels : Être – Avoir – Faire – Aller"
          description="Regarde la vidéo puis écoute et répète les conjugaisons."
          videoSrc="/videos/courses/beginner/activities/activity1/presentation.mp4"
          poster="/images/courses/beginner/activities/activity1/postermarie.png"
          info={{
            objectifs: [
              "Conjuguer des verbes de base pour faire des phrases simples",
            ],
            competences: [
              "Compréhension écrite",
              "Transformation grammaticale",
              "Phonie / graphie",
              "Prononciation",
            ],
            prerequis: [
              "Les verbes « être », « avoir », « aller » et « faire » au présent",
              "Les pronoms sujets : « Je », « Tu », « Il », « Elle », « On », « Nous », « Vous », « Ils » et « Elles»",
            ],
            duree: "30 minutes",
          }}
        />
      </div>

      {/* ================= EXERCICE 1 ================= */}
      <ExerciseSection>
        <InstructionBlock
          stampLabel="EXERCICE 1"
          title="Écoute et observe comment se conjugue chacun des verbes"
          subtitle="Découvre comment se conjuguent les verbes essentiels"
          description={
            <div className="space-y-4 text-black">
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="mb-2 flex items-center gap-2 text-base font-semibold text-blue-700">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12c.5.5 1 1.5 1 2h6c0-.5.5-1.5 1-2a7 7 0 00-4-12z"
                      />
                    </svg>
                  </span>
                  Conseil
                </p>

                <p className="text-base text-blue-900">
                  Répéter à voix haute t’aide à mémoriser plus vite et à
                  améliorer ta prononciation.
                </p>
              </div>
            </div>
          }
          activityType="listen"
        />

        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <VerbCard
              title="ÊTRE"
              forms={[
                "Je suis",
                "Tu es",
                "Il/Elle/On est",
                "Nous sommes",
                "Vous êtes",
                "Ils/Elles sont",
              ]}
              onPlay={() =>
                playVerbAudio(
                  "etre",
                  "/audios/courses/beginner/activity1/exercice4/etreverbe.mp3",
                )
              }
              isPlaying={currentlyPlayingId === "etre"}
            />

            <VerbCard
              title="AVOIR"
              forms={[
                "J’ai",
                "Tu as",
                "Il/Elle/On a",
                "Nous avons",
                "Vous avez",
                "Ils/Elles ont",
              ]}
              onPlay={() =>
                playVerbAudio(
                  "avoir",
                  "/audios/courses/beginner/activity1/exercice4/avoirverbe.mp3",
                )
              }
              isPlaying={currentlyPlayingId === "avoir"}
            />

            <VerbCard
              title="FAIRE"
              forms={[
                "Je fais",
                "Tu fais",
                "Il/Elle/On fait",
                "Nous faisons",
                "Vous faites",
                "Ils/Elles font",
              ]}
              onPlay={() =>
                playVerbAudio(
                  "faire",
                  "/audios/courses/beginner/activity1/exercice4/faireverbe.mp3",
                )
              }
              isPlaying={currentlyPlayingId === "faire"}
            />

            <VerbCard
              title="ALLER"
              forms={[
                "Je vais",
                "Tu vas",
                "Il/Elle/On va",
                "Nous allons",
                "Vous allez",
                "Ils/Elles vont",
              ]}
              onPlay={() =>
                playVerbAudio(
                  "aller",
                  "/audios/courses/beginner/activity1/exercice4/allerverbe.mp3",
                )
              }
              isPlaying={currentlyPlayingId === "aller"}
            />
          </div>
        </div>
      </ExerciseSection>

      {/* ================= EXERCICE 2 ================= */}
      <ExerciseSection width="wide">
        <InstructionBlock
          stampLabel="EXERCICE 2"
          title="Conjugue les verbes « ETRE », « AVOIR », « FAIRE » et « ALLER » à la bonne forme"
          subtitle="Choisis le bon verbe et conjugue-le correctement"
          description={
            <div className="space-y-4 text-black">
              <p className="font-medium">
                👉 Complète chaque phrase avec le bon verbe :
                <strong> être, avoir, faire ou aller</strong>.
              </p>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="mb-2 flex items-center gap-2 text-base font-semibold text-blue-700">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12c.5.5 1 1.5 1 2h6c0-.5.5-1.5 1-2a7 7 0 00-4-12z"
                      />
                    </svg>
                  </span>
                  Conseil
                </p>

                <p className="text-base text-blue-900">
                  Fais attention au sujet pour choisir la bonne forme.
                </p>
              </div>

              <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
                <p className="mb-3 flex items-center gap-2 text-base font-bold text-amber-800">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-amber-600 shadow-sm">
                    ⚠️
                  </span>
                  Important
                </p>

                <ul className="space-y-1 text-sm text-amber-900">
                  <li>Lis la phrase en entier.</li>
                  <li>
                    Par exemple : <strong>« Ils n’ont pas d’argent »</strong>
                  </li>
                </ul>
              </div>
            </div>
          }
          activityType="click-speak"
        />

        <Exercice />
      </ExerciseSection>

      {/* ================= EXERCICE 3 ================= */}
      <ExerciseSection width="wide">
        <Exercice3 />
      </ExerciseSection>

      {/* ================= EXERCICE 4 ================= */}
      <ExerciseSection>
        <Exercice4 />
      </ExerciseSection>
    </ActivityLayout>
  );
}