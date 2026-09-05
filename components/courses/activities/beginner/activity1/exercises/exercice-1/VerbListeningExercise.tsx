"use client";

import { useRef, useState } from "react";

import VerbCard from "@/components/courses/blocks/VerbCard";

export default function VerbListeningExercise() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(
    null,
  );

  const [currentTime, setCurrentTime] = useState(0);

  const playVerbAudio = (id: string, src: string) => {
    /*
     * Si un autre audio est déjà en cours,
     * on l'arrête avant de lancer le nouveau.
     */
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(src);

    audioRef.current = audio;

    setCurrentlyPlayingId(id);
    setCurrentTime(0);

    void audio.play();

    /*
     * Permet à VerbCard de savoir quelle forme
     * est actuellement en train d'être prononcée.
     */
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    /*
     * Quand l'audio est terminé,
     * on remet la carte à son état initial.
     */
    audio.onended = () => {
      setCurrentlyPlayingId(null);
      setCurrentTime(0);
    };

    /*
     * En cas d'erreur de lecture,
     * on remet également la carte à son état initial.
     */
    audio.onerror = () => {
      setCurrentlyPlayingId(null);
      setCurrentTime(0);
    };
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* ============================================================
            ÊTRE
        ============================================================ */}

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
          timings={[0, 1.1, 2.4, 4.8, 6.5, 8.1]}
          onPlay={() =>
            playVerbAudio(
              "etre",
              "/audios/courses/beginner/activity1/exercice4/etreverbe.mp3",
            )
          }
          isPlaying={currentlyPlayingId === "etre"}
          currentTime={currentlyPlayingId === "etre" ? currentTime : 0}
        />

        {/* ============================================================
            AVOIR
        ============================================================ */}

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
          timings={[0, 1.1, 2.4, 4.8, 6.5, 8.1]}
          onPlay={() =>
            playVerbAudio(
              "avoir",
              "/audios/courses/beginner/activity1/exercice4/avoirverbe.mp3",
            )
          }
          isPlaying={currentlyPlayingId === "avoir"}
          currentTime={currentlyPlayingId === "avoir" ? currentTime : 0}
        />

        {/* ============================================================
            FAIRE
        ============================================================ */}

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
          timings={[0, 1.1, 2.4, 4.8, 6.5, 8.1]}
          onPlay={() =>
            playVerbAudio(
              "faire",
              "/audios/courses/beginner/activity1/exercice4/faireverbe.mp3",
            )
          }
          isPlaying={currentlyPlayingId === "faire"}
          currentTime={currentlyPlayingId === "faire" ? currentTime : 0}
        />

        {/* ============================================================
            ALLER
        ============================================================ */}

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
          timings={[0, 1.1, 2.4, 4.8, 6.5, 8.1]}
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
  );
}