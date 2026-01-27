"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import ActivityCard from "@/components/Courses/Shared/ActivityCard";

const BeginnerPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  return (
    <section className="bg-white py-16 md:py-20 lg:py-28">
      <div className="container flex flex-col items-start space-y-12 pt-[90px]">
        {/* Bloc vidéo d’intro */}
        <div className="flex w-full justify-start">
          <div className="relative aspect-video w-full max-w-[640px] overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
            <video
              ref={videoRef}
              src="/videos/carla-presentation.mp4"
              className="h-full w-full bg-black object-cover"
              controls={false}
              poster="/images/courses/teacher/carla-video.png"
            />
            {!videoPlaying && (
              <button
                onClick={playVideo}
                className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label="Lire la vidéo"
              >
                ▶
              </button>
            )}
            <div className="absolute left-3 top-3 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow">
              DEBUTANT
            </div>
          </div>
        </div>

        {/* Grille des activités */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <ActivityCard
            title="Activité 1"
            subtitle="Grammaire"
            description="Les 4 verbes essentiels : Être - Avoir - Faire - Aller"
            href="/courses/level/beginner/activities/activity1"
            level="beginner"
          />

          <ActivityCard
            title="Activité 2"
            subtitle="Compréhension orale"
            description="Être - Avoir - Faire - Aller"
            href="/courses/level/beginner/activities/activity2"
            level="beginner"
          />

          <ActivityCard
            title="Activité 3"
            description="Vocabulaire du quotidien : horaires, lieux, objets utiles."
            href="/courses/level/beginner/activity3"
            level="beginner"
          />

          <ActivityCard
            title="Activité 4"
            description="Lecture guidée : repérer les infos clés dans un texte court."
            href="/courses/level/beginner/activity4"
            level="beginner"
          />

          <ActivityCard
            title="Activité 5"
            description="Prononciation : rythme, liaisons et intonation de base."
            href="/courses/level/beginner/activity5"
            level="beginner"
          />

          <ActivityCard
            title="Activité 6"
            description="Production orale : mini-dialogues du quotidien."
            href="/courses/level/beginner/activity6"
            level="beginner"
          />
        </div>
      </div>
    </section>
  );
};

export default BeginnerPage;
