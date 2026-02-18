"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import ActivityCard from "@/components/courses/Shared/ActivityCard";

const Intermediate2Page = () => {
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
        {/* Bloc vidéo en haut (remplace la card) */}
        <div className="flex w-full justify-start">
          <div className="relative aspect-video w-full max-w-[640px] overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
            <video
              ref={videoRef}
              src="/videos/henri-presentation.mp4" // 👉 mets ton fichier vidéo ici
              className="h-full w-full bg-black object-cover"
              controls={false}
              poster="/images/courses/teacher/wide-henri.png"
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
              INTERMÉDIAIRE 2
            </div>
          </div>
        </div>

        {/* Grille des activités */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <ActivityCard
            title=""
            description=""
            href="/courses/level/intermediate/activity1"
            level="intermediate"
          />
          <ActivityCard
            title=""
            description=""
            href="/courses/level/beginner/activity2"
            level="intermediate"
          />
          <ActivityCard
            title=""
            description=""
            href="/courses/level/beginner/activity3"
            level="intermediate"
          />
          <ActivityCard
            title=""
            description=""
            href="/courses/level/beginner/activity4"
            level="intermediate"
          />
          <ActivityCard
            title=""
            description=""
            href="/courses/level/beginner/activity5"
            level="intermediate"
          />
          <ActivityCard
            title=""
            description=""
            href="/courses/level/beginner/activity6"
            level="intermediate"
          />
        </div>
      </div>
    </section>
  );
};

export default Intermediate2Page;
