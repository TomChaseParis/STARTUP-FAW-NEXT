"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import ImgTeacher1 from "../../../public/images/courses/proffemme.png";
import ActivityCard from "@/components/Courses/Shared/ActivityCard";

const BeginnerPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Simulation du statut de connexion
  // Dans ton app réelle, ce serait géré via un vrai auth context (NextAuth, Supabase, Firebase, etc.)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  return (
    <section className="bg-white py-16 md:py-20 lg:py-28">
      <div className="container pt-[90px] flex flex-col items-start space-y-12">
        {/* Bloc vidéo d’intro */}
        <div className="flex justify-start w-full">
          <div className="relative aspect-video w-full max-w-[640px] overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
            <video
              ref={videoRef}
              src="/videos/carla-presentation.mp4"
              className="h-full w-full object-cover bg-black"
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
            <div className="absolute top-3 left-3 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow">
              DEBUTANT
            </div>
          </div>
        </div>

        {/* Grille des activités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <ActivityCard
            title="Activité 1"
            subtitle="Grammaire"
            description="Les 4 verbes essentiels : Être - Avoir - Faire - Aller"
            href="/courses/beginner/activity1"
            level="beginner"
          />

          {/* Activité 2 — accès bloqué si pas connecté */}
          {isLoggedIn ? (
            <ActivityCard
              title="Activité 2"
              subtitle="Compréhension orale"
              description="Être - Avoir - Faire - Aller"
              href="/courses/beginner/activity2"
              level="beginner"
            />
          ) : (
            <div className="p-6 border rounded-xl shadow-sm bg-gray-100 text-center flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Activité 2</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Contenu réservé aux membres connectés
                </p>
              </div>
              <div className="mt-4">
                <Link
                  href="/auth/login"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Se connecter / S’inscrire
                </Link>
              </div>
            </div>
          )}

          <ActivityCard
            title="Activité 3"
            description="Vocabulaire du quotidien : horaires, lieux, objets utiles."
            href="/courses/beginner/activity3"
            level="beginner"
          />

          <ActivityCard
            title="Activité 4"
            description="Lecture guidée : repérer les infos clés dans un texte court."
            href="/courses/beginner/activity4"
            level="beginner"
          />

          <ActivityCard
            title="Activité 5"
            description="Prononciation : rythme, liaisons et intonation de base."
            href="/courses/beginner/activity5"
            level="beginner"
          />

          <ActivityCard
            title="Activité 6"
            description="Production orale : mini-dialogues du quotidien."
            href="/courses/beginner/activity6"
            level="beginner"
          />
        </div>

        {/* Bouton pour simuler connexion/déconnexion */}
        <div className="mt-10">
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
          >
            {isLoggedIn ? "Se déconnecter" : "Simuler connexion"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BeginnerPage;
