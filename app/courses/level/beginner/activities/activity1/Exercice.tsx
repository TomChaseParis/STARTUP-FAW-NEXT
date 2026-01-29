"use client";

import React, { useEffect, useState } from "react";

/* -------------------------------------------------------
   DONNÉES D’EXERCICES
------------------------------------------------------- */
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

/* -------------------------------------------------------
   AUDIOS
------------------------------------------------------- */
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

  const playAudio = (file: string) => new Audio(file).play();

  /* ----------- Reconnaissance vocale ------------ */
  const startRecognition = (catIndex: number, itemIndex: number) => {
    if (typeof window === "undefined") return;
    const Recognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!Recognition)
      return alert(
        "⚠️ Votre navigateur ne supporte pas la reconnaissance vocale.",
      );

    const recognition = new Recognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let finalTranscript = "";

    recognition.onstart = () => {
      const f = feedbacks.map((c) => [...c]);
      f[catIndex][itemIndex] = "🎤 Parlez maintenant…";
      setFeedbacks(f);
    };

    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++)
        if (event.results[i].isFinal)
          finalTranscript += " " + event.results[i][0].transcript;
    };

    recognition.onend = () => {
      const spoken = finalTranscript.toLowerCase().trim();
      const expected = categories[catIndex].items[itemIndex].word.toLowerCase();
      const phrase = categories[catIndex].items[itemIndex].phrase;

      const f = feedbacks.map((c) => [...c]);
      const a = attempts.map((c) => [...c]);

      if (spoken.includes(expected)) {
        playAudio(
          correctAudios[Math.floor(Math.random() * correctAudios.length)],
        );
        f[catIndex][itemIndex] = "✅ Bonne réponse !";
        a[catIndex][itemIndex] = 0;
      } else {
        a[catIndex][itemIndex]++;
        if (a[catIndex][itemIndex] === 1) {
          playAudio(
            wrongAudios1[Math.floor(Math.random() * wrongAudios1.length)],
          );
          f[catIndex][itemIndex] = "❌ Mauvaise réponse.";
        } else {
          f[catIndex][itemIndex] =
            `❌ Correction : « ${phrase.replace(".......", expected)} »`;
          a[catIndex][itemIndex] = 0;
        }
      }

      setFeedbacks(f);
      setAttempts(a);
    };

    recognition.start();
  };

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */
  return (
    <section className="bg-white">
      {/* HEADER */}
      <div className="container pt-16 text-center">
        <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-black">
          Exercice
        </span>

        <h2 className="mt-4 text-3xl font-bold text-black">
          Exercice 1 — Complète et parle
        </h2>

        <p className="mx-auto mt-3 max-w-3xl text-lg text-black/70">
          Lis chaque phrase puis appuie sur le micro pour dire le mot manquant.
        </p>
      </div>

      {/* CONTENT */}
      <div className="container mt-14 pb-20">
        <div className="grid gap-10 sm:grid-cols-2">
          {categories.map((cat, catIndex) => (
            <div
              key={cat.title}
              className="
                overflow-hidden rounded-2xl bg-white shadow-xl ring-1 
                ring-black/5 transition hover:shadow-2xl
              "
            >
              {/* ----- TITLE CARD ----- */}
              <div className="border-b border-black/10 bg-amber-50 px-6 py-4">
                <h3 className="text-xl font-semibold tracking-tight text-black">
                  {cat.title}
                </h3>
              </div>

              {/* ----- ITEMS (CARDS AMÉLIORÉES) ----- */}
              <div className="space-y-4 p-5">
                {cat.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="
                      flex items-start gap-4 rounded-xl bg-white px-5 py-4 
                      shadow-md ring-1 ring-black/5
                      transition-all duration-300 
                      hover:-translate-y-[2px] hover:shadow-xl
                    "
                  >
                    {/* Microphone */}
                    <button
                      onClick={() => startRecognition(catIndex, itemIndex)}
                      aria-label={`Parler phrase ${itemIndex + 1}`}
                      className="
                        flex h-11 w-11 items-center justify-center 
                        rounded-full bg-amber-500 text-black shadow 
                        transition-all hover:scale-105 
                        hover:bg-amber-400
                      "
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="2" width="6" height="12" rx="3" />
                        <path d="M5 10a7 7 0 0 0 14 0" />
                        <line x1="12" y1="22" x2="12" y2="17" />
                      </svg>
                    </button>

                    {/* Phrase */}
                    <div>
                      <p className="text-[15px] font-medium leading-snug text-black">
                        {item.phrase}
                      </p>

                      <p className="mt-2 text-sm italic text-black/60">
                        {feedbacks[catIndex][itemIndex]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="px-4 pb-3">
                <span className="rounded bg-black/5 px-2 py-1 text-xs text-black/60">
                  Reconnaissance vocale
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Exercice;
