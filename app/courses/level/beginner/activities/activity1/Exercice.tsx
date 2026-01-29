"use client";

import React, { useEffect, useState } from "react";

// --- Données d'exercices ---
const categories = [
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
];

// --- Audios de Marie ---
const correctAudios = [
  "/audios/courses/beginner/marie/correct/marie_correct_01.mp3",
  "/audios/courses/beginner/marie/correct/marie_correct_02.mp3",
  "/audios/courses/beginner/marie/correct/marie_correct_03.mp3",
  "/audios/courses/beginner/marie/correct/marie_correct_04.mp3",
  "/audios/courses/beginner/marie/correct/marie_correct_05.mp3",
  "/audios/courses/beginner/marie/correct/marie_correct_06.mp3",
  "/audios/courses/beginner/marie/correct/marie_correct_07.mp3",
];

const wrongAudios1 = [
  "/audios/courses/beginner/marie/wrong/marie_wrong_01.mp3",
  "/audios/courses/beginner/marie/wrong/marie_wrong_02.mp3",
  "/audios/courses/beginner/marie/wrong/marie_wrong_03.mp3",
  "/audios/courses/beginner/marie/wrong/marie_wrong_04.mp3",
  "/audios/courses/beginner/marie/wrong/marie_wrong_05.mp3",
  "/audios/courses/beginner/marie/wrong/marie_wrong_06.mp3",
  "/audios/courses/beginner/marie/wrong/marie_wrong_07.mp3",
];

const Exercice: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<string[][]>(
    categories.map((cat) => cat.items.map(() => "")),
  );
  const [attempts, setAttempts] = useState<number[][]>(
    categories.map((cat) => cat.items.map(() => 0)),
  );

  const playAudio = (file: string) => {
    const audio = new Audio(file);
    audio.play();
  };

  const startRecognition = (catIndex: number, itemIndex: number) => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("⚠️ Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let finalTranscript = "";

    recognition.onstart = () => {
      const newFeedbacks = feedbacks.map((cat) => [...cat]);
      newFeedbacks[catIndex][itemIndex] = "🎤 Parlez maintenant...";
      setFeedbacks(newFeedbacks);
    };

    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += " " + event.results[i][0].transcript;
        }
      }
    };

    recognition.onend = () => {
      const transcriptNormalized = finalTranscript.toLowerCase().trim();
      const { phrase, word } = categories[catIndex].items[itemIndex];
      const currentWord = word.toLowerCase();

      const newFeedbacks = feedbacks.map((cat) => [...cat]);
      const newAttempts = attempts.map((cat) => [...cat]);

      if (transcriptNormalized.includes(currentWord)) {
        const index = Math.floor(Math.random() * correctAudios.length);
        newFeedbacks[catIndex][itemIndex] = "✅ Bonne réponse !";
        playAudio(correctAudios[index]);
        newAttempts[catIndex][itemIndex] = 0;
      } else {
        newAttempts[catIndex][itemIndex] += 1;
        const attempt = newAttempts[catIndex][itemIndex];

        if (attempt === 1) {
          const index = Math.floor(Math.random() * wrongAudios1.length);
          newFeedbacks[catIndex][itemIndex] = "❌ Mauvaise réponse.";
          playAudio(wrongAudios1[index]);
        } else {
          newFeedbacks[catIndex][itemIndex] =
            `❌ La phrase correcte : "${phrase.replace(".......", word)}"`;
          newAttempts[catIndex][itemIndex] = 0;
        }
      }

      setFeedbacks(newFeedbacks);
      setAttempts(newAttempts);
    };

    recognition.start();
  };

  return (
    <section className="bg-white">
      <div className="container pt-16">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[30px] text-sm font-semibold text-black">
            Exercice
          </span>
          <h2 className="mt-3 text-[30px] text-black">
            Exercice 1 — Complète et parle
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-base text-black/70 sm:text-lg">
            Lis chaque phrase, puis appuie sur le micro pour dire le mot
            manquant.
          </p>
        </div>
      </div>

      <div className="container mt-10 pb-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {categories.map((cat, catIndex) => (
            <div
              key={cat.title}
              className="relative w-full overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5"
            >
              <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                <h3 className="text-[18px] font-semibold text-black">
                  {cat.title}
                </h3>
              </div>

              <ul className="divide-y divide-black/5">
                {cat.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => startRecognition(catIndex, itemIndex)}
                        aria-label={`Parler pour la phrase ${itemIndex + 1}`}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-black shadow hover:bg-amber-400"
                      >
                        🎤
                      </button>

                      <div className="min-w-0">
                        <p className="text-[16px] text-black">{item.phrase}</p>
                        <p className="mt-1 text-sm text-black/60">
                          {feedbacks[catIndex][itemIndex]}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs font-medium text-black backdrop-blur">
                Reconnaissance vocale
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Exercice;
