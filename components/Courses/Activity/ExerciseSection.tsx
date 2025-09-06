"use client";

import React, { useRef } from "react";

type ExerciseItem = {
  phrase: string; // ex: "Qui ....... étudiant ?"
  word: string;   // ex: "est"
};

type ExerciseCategory = {
  title: string;      // ex: "1. ÊTRE"
  items: ExerciseItem[];
};

type Props = {
  title: string;                 // ex: "Exercice 1 — Complète et écoute"
  subtitle?: string;             // ex: "Choisis la bonne forme du verbe"
  categories: ExerciseCategory[]; 
};

const ExerciseSection: React.FC<Props> = ({ title, subtitle, categories }) => {
  // Lecteur audio unique
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ensureAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "none";
    }
    return audioRef.current!;
  };

  // TTS simple pour lire la phrase correcte (sans micro, uniquement écoute)
  const speak = async (text: string) => {
    // Option 1 (simple, sans dépendances): SpeechSynthesis si dispo
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "fr-FR";
      u.rate = 0.95;
      u.pitch = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
      return;
    }
    // Option 2: si tu as des fichiers audio par item, tu peux jouer un mp3 ici:
    // const audio = ensureAudio();
    // audio.src = "/audios/mon-fichier.mp3";
    // await audio.play();
  };

  return (
    <section className="rounded-2xl bg-white/80 py-8 shadow-lg ring-1 ring-black/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold text-black">{title}</h3>
          {subtitle && (
            <p className="mt-1 text-black/70">{subtitle}</p>
          )}
        </div>

        {/* Grille des catégories : 2 colonnes sur ≥ sm */}
        <div className="grid gap-6 sm:grid-cols-2">
          {categories.map((cat, ci) => (
            <div
              key={ci}
              className="rounded-xl bg-white/90 shadow ring-1 ring-black/5"
            >
              <div className="flex items-center justify-between rounded-t-xl bg-red-200 px-5 py-3">
                <h4 className="text-lg font-semibold text-black">{cat.title}</h4>
              </div>

              <ul className="space-y-3 px-5 py-5">
                {cat.items.map((it, ii) => {
                  const full = it.phrase.replace(".......", it.word);
                  return (
                    <li
                      key={ii}
                      className="flex items-start justify-between gap-3 rounded-lg bg-white px-3 py-2 ring-1 ring-black/5"
                    >
                      <div className="text-black">
                        {it.phrase}
                      </div>
                      <button
                        onClick={() => speak(full)}
                        className="shrink-0 rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold text-black transition hover:bg-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        aria-label="Écouter la phrase complète"
                        title="Écouter la phrase complète"
                      >
                        🔊 Écouter
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Lecteur audio unique si tu veux jouer des mp3 à la place du TTS */}
      <audio ref={audioRef} />
    </section>
  );
};

export default ExerciseSection;
