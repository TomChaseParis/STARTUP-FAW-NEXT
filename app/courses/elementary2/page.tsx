"use client"

import { useRef, useState } from "react";
import Image from "next/image";
import ImgTeacher1 from "../../../public/images/courses/teacher/Irene.png";
import ActivityCard from "@/components/Courses/Shared/ActivityCard";

const Elementary2Page = () => {
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
      <div className="container pt-[90px] flex flex-col items-start space-y-12">
   {/* Bloc vidéo en haut (remplace la card) */}
        <div className="flex justify-start w-full">
          <div className="relative aspect-video w-full max-w-[640px] overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
            <video
              ref={videoRef}
              src="/videos/henri-presentation.mp4" // 👉 mets ton fichier vidéo ici
              className="h-full w-full object-cover bg-black"
              controls={false}
              poster="/images/courses/teacher/irene-video.png"
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
            <div className="absolute top-3 left-3 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow">
              ELEMENTAIRE 2
            </div>
          </div>
        </div>

        {/* Grille des activités : on passe title/description/href en props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <ActivityCard
            title="Activité 1"
            description="Grammaire : Être / Avoir / Aller / Faire — écoute et répétition."
            href="/courses/elementary/activity1"
            level="elementary"
          />

          <ActivityCard
            title="Activité 2"
            description="Compréhension orale : se présenter, poser des questions simples."
            href="/courses/beginner/activity2"
                        level="elementary"

          />

          <ActivityCard
            title="Activité 3"
            description="Vocabulaire du quotidien : horaires, lieux, objets utiles."
            href="/courses/beginner/activity3"
                        level="elementary"

          />

          <ActivityCard
            title="Activité 4"
            description="Lecture guidée : repérer les infos clés dans un texte court."
            href="/courses/beginner/activity4"
                        level="elementary"

          />

          <ActivityCard
            title="Activité 5"
            description="Prononciation : rythme, liaisons et intonation de base."
            href="/courses/beginner/activity5"
                        level="elementary"

          />

          <ActivityCard
            title="Activité 6"
            description="Production orale : mini-dialogues du quotidien."
            href="/courses/beginner/activity6"
                        level="elementary"

          />
        </div>
      </div>
    </section>
  );
};

export default Elementary2Page;
