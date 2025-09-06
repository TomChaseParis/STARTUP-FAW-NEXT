  "use client";

  import React, { useRef, useState } from "react";
  import Image from "next/image";
  import VerbCard from "@/components/Courses/Activity/VerbCard";
  import ExerciseSection from "@/components/Courses/Activity/ExerciseSection";

  const Description: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [videoPlaying, setVideoPlaying] = useState(false);

    // Lecteur audio unique (évite WebMediaPlayers multiples)
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const ensureAudio = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.preload = "none";
      }
      return audioRef.current!;
    };

    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play();
        setVideoPlaying(true);
        videoRef.current.onended = () => setVideoPlaying(false);
      }
    };

    const playAudio = async (src: string) => {
      try {
        const audio = ensureAudio();
        // Si on rejoue la même source en plein milieu, on remet au début
        if (audio.src !== window.location.origin + src) {
          audio.src = src;
        } else {
          audio.currentTime = 0;
        }
        await audio.play();
      } catch (e) {
        // ignore ou afficher un toast si besoin
        console.warn("Audio play error:", e);
      }
    };

    

    return (
      <section className="bg-white">
        {/* En-tête propre */}
        <div className="container pt-16">
          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-block text-[30px] rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-black">
              Grammaire
            </span>
            <h1 className="mt-3  text-[30px] text-black">
              Les 4 verbes essentiels : Être - Avoir - Faire - Aller
            </h1>
            <p className="mx-auto mt-3 max-w-3xl text-base text-black/70 sm:text-lg">
              Regarde la vidéo d’abord, puis écoute et répète les conjugaisons.
            </p>
          </div>
        </div>

        {/* Intro : Vidéo + Image */}
        <div className="container mt-10">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            {/* Vidéo */}
            <div className="flex justify-center">
              <div className="relative aspect-video w-full max-w-[640px] overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
                <video
                  ref={videoRef}
                  src="/videos/videoexo.mp4"
                  className="h-full w-full object-cover"
                  controls={false}
                  poster="/images/courses/video-poster.jpg" // optionnel si tu as un poster
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
                <div className="absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs font-medium text-black backdrop-blur">
                  Tutoriel vidéo
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[420px] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                <Image
                  src="/images/courses/benoittime.png"
                  alt="benoittime"
                  width={420}
                  height={420}
                  className="h-auto w-full object-cover"
                  priority
                />
                <div className="absolute left-3 top-3 rounded-md bg-amber-400 px-2 py-1 text-xs font-semibold text-black shadow">
                  Débutant • A1
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leçon : 4 cartes verbes */}
        <div className="container mt-14">
          <h2 className="mb-6 text-center text-2xl font-bold text-black">
            ÊTRE - AVOIR - FAIRE - ALLER
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
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
              onPlay={() => playAudio("/audios/etre.mp3")}
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
              onPlay={() => playAudio("/audios/avoir.mp3")}
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
              onPlay={() => playAudio("/audios/faire.mp3")}
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
              onPlay={() => playAudio("/audios/aller.mp3")}
            />
          </div>
        </div>

        {/* Zone pour tes exercices (ex: <TestTwo />) */}
       {/* --- NOUVEL EXERCICE (remplace l’ancien) --- */}
       {/*  <div className="container mt-16 pb-20">
          <ExerciseSection
            title="Exercice 1 — Complète et écoute"
            subtitle="Lis chaque phrase, puis appuie sur « Écouter » pour entendre la version correcte."
            categories={[
              {
                title: "1. ÊTRE",
                items: [
                  { phrase: "Qui ....... étudiant ? Qui travaille ?", word: "est" },
                  { phrase: "Où ....... les toilettes ?", word: "sont" },
                  { phrase: "Je ne ....... pas français", word: "suis" },
                  { phrase: "Tu ....... fatigué ?", word: "es" },
                  { phrase: "Nous ....... étrangers", word: "sommes" },
                  { phrase: "Merci, vous ....... bien aimables", word: "êtes" },
                  { phrase: "On ....... en retard. Excusez-nous", word: "est" },
                ],
              },
              {
                title: "2. AVOIR",
                items: [
                  { phrase: "Tu ....... quel âge ?", word: "as" },
                  { phrase: "Excusez-moi, je n'....... pas le temps", word: "ai" },
                  { phrase: "Ils n'....... pas d'argent", word: "ont" },
                  { phrase: "Pardon, vous ....... l'heure ?", word: "avez" },
                  { phrase: "Nous ....... un problème", word: "avons" },
                  { phrase: "Elle ....... 15 ans", word: "a" },
                  { phrase: "Vous ....... une minute s'il vous plaît ?", word: "avez" },
                  { phrase: "On ....... faim et soif", word: "a" },
                ],
              },
              {
                title: "3. FAIRE",
                items: [
                  { phrase: "Qu'est-ce qu'elle ....... comme études ?", word: "fait" },
                  { phrase: "Vous ....... du sport ?", word: "faites" },
                  { phrase: "Elles ....... un voyage en Asie", word: "font" },
                  { phrase: "Je vous ....... un café ?", word: "fais" },
                  { phrase: "Il ....... froid aujourd'hui ?", word: "fait" },
                  { phrase: "Nous ....... des études en France", word: "faisons" },
                  { phrase: "Qu'est-ce que tu ....... ce soir ?", word: "fais" },
                ],
              },
              {
                title: "4. ALLER",
                items: [
                  { phrase: "Vous ....... bien ?", word: "allez" },
                  { phrase: "Elle ....... où ?", word: "va" },
                  { phrase: "On ....... au cinéma ?", word: "va" },
                  { phrase: "Tu ....... téléphoner ?", word: "vas" },
                  { phrase: "Mes parents ne ....... pas bien", word: "vont" },
                  { phrase: "Je ....... avec toi", word: "vais" },
                  { phrase: "Nous ....... à la banque", word: "allons" },
                ],
              },
            ]}
          />
        </div> */}
      </section>
    );
  };

  export default Description;
