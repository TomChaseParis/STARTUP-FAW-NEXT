"use client";

import React, { useState } from "react";

type ExerciseItem = { phrase: string; word: string };
type ExerciseCategory = { title: string; items: ExerciseItem[] };

type Props = {
  categories: ExerciseCategory[];
};

const correctResponses = [
  "Très bien, c'est correct !",
  "Bravo, tu as trouvé la bonne réponse !",
  "Parfait, on continue comme ça !",
  "Exactement, c’est la bonne phrase !",
  "Super, tu progresses !",
];

const wrongResponses1 = [
  "Ce n’est pas ça, essaie encore.",
  "Mauvaise réponse, essaye à nouveau.",
  "Non, écoute bien et recommence.",
  "Raté, essaie encore une fois.",
  "Pas correct, refais un essai.",
];

const wrongResponses2 = [
  "Toujours incorrect, concentre-toi.",
  "Non, ce n’est pas encore juste.",
  "Pas encore bon, essaie à nouveau.",
  "Faux, continue de chercher.",
  "Ce n’est toujours pas ça, réessaie.",
];

const ExerciseSection: React.FC<Props> = ({ categories }) => {
  const [feedbacks, setFeedbacks] = useState<string[][]>(() =>
    categories.map((c) => c.items.map(() => "")),
  );
  const [attempts, setAttempts] = useState<number[][]>(() =>
    categories.map((c) => c.items.map(() => 0)),
  );

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    u.rate = 0.95;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  };

  const startRecognition = (catIndex: number, itemIndex: number) => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

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
      setFeedbacks((prev) => {
        const next = prev.map((c) => [...c]);
        next[catIndex][itemIndex] = "🎤 Parlez maintenant...";
        return next;
      });
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
      const full = phrase.replace(".......", word);
      const target = word.toLowerCase();

      setAttempts((prevA) => {
        const nextA = prevA.map((c) => [...c]);
        const ok = transcriptNormalized.includes(target);

        if (ok) {
          const msg = correctResponses[Math.floor(Math.random() * correctResponses.length)];
          setFeedbacks((prevF) => {
            const n = prevF.map((c) => [...c]);
            n[catIndex][itemIndex] = `✅ ${msg}`;
            return n;
          });
          speak(msg);
          nextA[catIndex][itemIndex] = 0;
        } else {
          nextA[catIndex][itemIndex] += 1;
          const nAttempts = nextA[catIndex][itemIndex];

          if (nAttempts === 1) {
            const msg = wrongResponses1[Math.floor(Math.random() * wrongResponses1.length)];
            setFeedbacks((prevF) => {
              const n = prevF.map((c) => [...c]);
              n[catIndex][itemIndex] = msg;
              return n;
            });
            speak(`${msg} Répète après moi : ${full}`);
          } else if (nAttempts === 2) {
            const msg = wrongResponses2[Math.floor(Math.random() * wrongResponses2.length)];
            setFeedbacks((prevF) => {
              const n = prevF.map((c) => [...c]);
              n[catIndex][itemIndex] = msg;
              return n;
            });
            speak(msg);
          } else {
            setFeedbacks((prevF) => {
              const n = prevF.map((c) => [...c]);
              n[catIndex][itemIndex] = `❌ Mauvaise réponse. La phrase correcte était : "${full}".`;
              return n;
            });
            speak(`La phrase correcte était : ${full}`);
            nextA[catIndex][itemIndex] = 0;
          }
        }
        return nextA;
      });
    };

    recognition.onerror = (event: any) => {
      setFeedbacks((prev) => {
        const next = prev.map((c) => [...c]);
        next[catIndex][itemIndex] = `Erreur : ${event.error}`;
        return next;
      });
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col items-center space-y-10 pt-[120px] text-black">
      {/* Première ligne : ÊTRE et AVOIR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
        {[0, 1].map((catIndex) => (
          <div key={catIndex}>
            <h4 className="font-bold mb-4 text-[20px]">
              {categories[catIndex]?.title}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-lg">
              {categories[catIndex]?.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-2">
                  <button
                    className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                    onClick={() => startRecognition(catIndex, itemIndex)}
                  >
                    🎤
                  </button>
                  <div>
                    {item.phrase}
                    <div className="text-sm text-gray-600">
                      {feedbacks[catIndex][itemIndex]}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Deuxième ligne : FAIRE et ALLER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
        {[2, 3].map((catIndex) => (
          <div key={catIndex}>
            <h4 className="font-bold mb-4 text-[20px]">
              {categories[catIndex]?.title}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-lg">
              {categories[catIndex]?.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-2">
                  <button
                    className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                    onClick={() => startRecognition(catIndex, itemIndex)}
                  >
                    🎤
                  </button>
                  <div>
                    {item.phrase}
                    <div className="text-sm text-gray-600">
                      {feedbacks[catIndex][itemIndex]}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseSection;
