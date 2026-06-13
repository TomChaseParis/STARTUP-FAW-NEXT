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
  const [currentTime, setCurrentTime] = useState(0);

  const playVerbAudio = (id: string, src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  
    const audio = new Audio(src);
    audioRef.current = audio;
  
    setCurrentlyPlayingId(id);
    setCurrentTime(0);
  
    audio.play();
  
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };
  
    audio.onended = () => {
      setCurrentlyPlayingId(null);
      setCurrentTime(0);
    };
  
    audio.onerror = () => {
      setCurrentlyPlayingId(null);
      setCurrentTime(0);
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
      <div className="space-y-5 text-black">
        <div
          className="
            rounded-2xl
            border border-blue-200
            bg-gradient-to-br from-blue-50 via-white to-blue-50
            p-5
            shadow-sm
          "
        >
          {/* HEADER */}
          <div className="mb-4 flex items-center gap-4">
            <div
              className="
                flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-blue-400 to-cyan-500
                shadow-[0_10px_20px_rgba(59,130,246,0.25)]
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
                  d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12c.5.5 1 1.5 1 2h6c0-.5.5-1.5 1-2a7 7 0 00-4-12z"
                />
              </svg>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                Conseil
              </p>

              <p className="text-sm text-slate-500">
                Astuce pour mieux apprendre
              </p>
            </div>
          </div>

          <p className="text-base leading-relaxed text-slate-800">
            Répéter à voix haute t’aide à mémoriser plus vite et à améliorer ta
            prononciation.
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
  timings={[
    0,
    1.1,
    2.4,
    4.8,
    6.5,
    8.1,
  ]}
  onPlay={() =>
    playVerbAudio(
      "etre",
      "/audios/courses/beginner/activity1/exercice4/etreverbe.mp3",
    )
  }
  isPlaying={currentlyPlayingId === "etre"}
  currentTime={currentlyPlayingId === "etre" ? currentTime : 0}
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
  timings={[
    0,
    1.1,
    2.4,
    4.8,
    6.5,
    8.1,
  ]}
  onPlay={() =>
    playVerbAudio(
      "avoir",
      "/audios/courses/beginner/activity1/exercice4/avoirverbe.mp3",
    )
  }
  isPlaying={currentlyPlayingId === "avoir"}
  currentTime={currentlyPlayingId === "avoir" ? currentTime : 0}
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
  timings={[
    0,
    1.1,
    2.4,
    4.8,
    6.5,
    8.1,
  ]}
  onPlay={() =>
    playVerbAudio(
      "faire",
      "/audios/courses/beginner/activity1/exercice4/faireverbe.mp3",
    )
  }
  isPlaying={currentlyPlayingId === "faire"}
  currentTime={currentlyPlayingId === "faire" ? currentTime : 0}
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
  timings={[
    0,
    1.1,
    2.4,
    4.8,
    6.5,
    8.1,
  ]}
  onPlay={() =>
    playVerbAudio(
      "aller",
      "/audios/courses/beginner/activity1/exercice4/allerverbe.mp3",
    )
  }
  isPlaying={currentlyPlayingId === "aller"}
  currentTime={currentlyPlayingId === "aller" ? currentTime : 0}
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
      <div className="space-y-5 text-black">
        <p className="font-medium">
          👉 Complète chaque phrase avec le bon verbe :
          <strong> être, avoir, faire ou aller</strong>.
        </p>

        {/* CONSEIL */}
        <div
          className="
            rounded-2xl
            border border-blue-200
            bg-gradient-to-br from-blue-50 via-white to-blue-50
            p-5
            shadow-sm
          "
        >
          <div className="mb-4 flex items-center gap-4">
            <div
              className="
                flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-blue-400 to-cyan-500
                shadow-[0_10px_20px_rgba(59,130,246,0.25)]
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
                  d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12c.5.5 1 1.5 1 2h6c0-.5.5-1.5 1-2a7 7 0 00-4-12z"
                />
              </svg>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                Conseil
              </p>

              <p className="text-sm text-slate-500">
                Astuce pour éviter les erreurs
              </p>
            </div>
          </div>

          <p className="text-base leading-relaxed text-slate-800">
            Fais attention au sujet pour choisir la bonne forme.
          </p>
        </div>

        {/* IMPORTANT */}
        <div
          className="
            rounded-2xl
            border border-amber-200
            bg-gradient-to-br from-amber-50 via-white to-amber-50
            p-5
            shadow-sm
          "
        >
          <div className="mb-4 flex items-center gap-4">
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
                  d="M12 9v4"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 17h.01"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.29 3.86l-7.4 12.8A1 1 0 003.76 18h16.48a1 1 0 00.87-1.34l-7.4-12.8a1 1 0 00-1.74 0z"
                />
              </svg>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                Important
              </p>

              <p className="text-sm text-slate-500">
                Lis attentivement avant de répondre
              </p>
            </div>
          </div>

          <ul className="space-y-2 text-base leading-relaxed text-slate-800">
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