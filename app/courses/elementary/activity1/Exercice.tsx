"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Question = {
  id: number;
  prompt: string;
  choices: { key: "A" | "B" | "C" | "D"; text: string }[];
  correct: "A" | "B" | "C" | "D";
  image: string;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: "Il y a combien de joueurs dans une équipe de Rugby ?",
    choices: [
      { key: "A", text: "12" },
      { key: "B", text: "11" },
      { key: "C", text: "15" },
      { key: "D", text: "8" },
    ],
    correct: "C",
    image: "/images/courses/elementary/qcm/rugby.jpeg",
  },
  {
    id: 2,
    prompt: "Quel jour commence l'été ?",
    choices: [
      { key: "A", text: "Le 12 avril" },
      { key: "B", text: "Le 21 juin" },
      { key: "C", text: "Le 1er juillet" },
      { key: "D", text: "Le 11 juin" },
    ],
    correct: "B",
    image: "/images/courses/elementary/qcm/ete.jpg",
  },
  {
    id: 3,
    prompt: "Comment fait-on une paella ?",
    choices: [
      { key: "A", text: "Avec du fromage et des pommes de terre" },
      {
        key: "B",
        text: "Avec du riz, du chorizo, du poulet et/ou des fruits de mer",
      },
      { key: "C", text: "Avec des pâtes et de la sauce tomate" },
      { key: "D", text: "Avec du pain et du beurre" },
    ],
    correct: "B",
    image: "/images/courses/elementary/qcm/paella.jpg",
  },
  {
    id: 4,
    prompt: "Comment font les gens pour avoir des bébés ?",
    choices: [
      { key: "A", text: "Ils font du ski" },
      { key: "B", text: "Ils font la vaisselle" },
      { key: "C", text: "Ils font la cuisine" },
      { key: "D", text: "Ils font l'amour" },
    ],
    correct: "D",
    image: "/images/courses/elementary/qcm/bebe.webp",
  },
  {
    id: 5,
    prompt: "Comment est-ce qu'ils vont au travail ?",
    choices: [
      { key: "A", text: "En taxi" },
      { key: "B", text: "En métro" },
      { key: "C", text: "En avion" },
      { key: "D", text: "À pied" },
    ],
    correct: "B",
    image: "/images/courses/elementary/qcm/metro.jpg",
  },
  {
    id: 6,
    prompt: "Quelle est la capitale de la France ?",
    choices: [
      { key: "A", text: "Paris" },
      { key: "B", text: "Lyon" },
      { key: "C", text: "Marseille" },
      { key: "D", text: "Toulouse" },
    ],
    correct: "A",
    image: "/images/courses/elementary/qcm/paris.jpg",
  },
  {
    id: 7,
    prompt: "Combien de jours y a-t-il dans une semaine ?",
    choices: [
      { key: "A", text: "5" },
      { key: "B", text: "6" },
      { key: "C", text: "7" },
      { key: "D", text: "8" },
    ],
    correct: "C",
    image: "/images/courses/elementary/qcm/semaine.jpg",
  },
  {
    id: 8,
    prompt: "De quelle couleur est le ciel quand il fait beau ?",
    choices: [
      { key: "A", text: "Rouge" },
      { key: "B", text: "Vert" },
      { key: "C", text: "Bleu" },
      { key: "D", text: "Jaune" },
    ],
    correct: "C",
    image: "/images/courses/elementary/qcm/cielbleu.jpg",
  },
  {
    id: 9,
    prompt: "Quelle est la langue officielle de l'Espagne ?",
    choices: [
      { key: "A", text: "L’anglais" },
      { key: "B", text: "Le portugais" },
      { key: "C", text: "Le français" },
      { key: "D", text: "L’espagnol" },
    ],
    correct: "D",
    image: "/images/courses/elementary/qcm/espagnol.webp",
  },
  {
    id: 10,
    prompt: "Quel fruit est jaune et riche en potassium ?",
    choices: [
      { key: "A", text: "Pomme" },
      { key: "B", text: "Banane" },
      { key: "C", text: "Orange" },
      { key: "D", text: "Fraise" },
    ],
    correct: "B",
    image: "/images/courses/elementary/qcm/banane.jpg",
  },
];

const Exercice: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<null | string>(null);
  const [ended, setEnded] = useState(false);
  const [listening, setListening] = useState(false);

  const question = QUESTIONS[current];

  // -------- VOIX PROF --------
  const speak = (text: string) => {
    if (typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 0.95;
    const voices = synth.getVoices();
    const frenchVoice = voices.find((v) =>
      v.lang.toLowerCase().startsWith("fr")
    );
    if (frenchVoice) utterance.voice = frenchVoice;
    synth.speak(utterance);
  };

  // Lecture auto de la question dès qu'on change
  useEffect(() => {
    if (!started || !question) return;
    const text = `${question.prompt}. Réponses possibles : ${question.choices
      .map((c) => `${c.key}: ${c.text}`)
      .join(", ")}.`;

    const synth = window.speechSynthesis;
    if (synth.getVoices().length > 0) {
      speak(text);
    } else {
      synth.onvoiceschanged = () => speak(text);
    }
  }, [current, started]);

  // -------- CLIQUE --------
  const handleAnswer = (key: string) => {
    if (answered) return;
    setAnswered(key);
    if (key === question.correct) {
      setScore((s) => s + 1);
      speak("Bravo, bonne réponse !");
    } else {
      speak(
        `Mauvaise réponse. La bonne était : ${
          question.choices.find((c) => c.key === question.correct)?.text
        }`
      );
    }
  };

  // -------- MICRO --------
  const handleVoiceAnswer = () => {
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
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event: any) => {
      const transcript: string = event.results[0][0].transcript
        .toLowerCase()
        .trim();

      const found = question.choices.find(
        (c) =>
          transcript.includes(c.key.toLowerCase()) ||
          transcript.includes(c.text.toLowerCase())
      );

      if (found) {
        handleAnswer(found.key);
      } else {
        speak("Je n’ai pas compris, répète s’il te plaît.");
      }
    };

    recognition.start();
  };

  const nextQuestion = () => {
    if (current + 1 < QUESTIONS.length) {
      setCurrent((c) => c + 1);
      setAnswered(null);
    } else {
      setEnded(true);
      speak(`Exercice terminé. Ton score est ${score} sur ${QUESTIONS.length}`);
    }
  };

  const restart = () => {
    setStarted(false);
    setCurrent(0);
    setScore(0);
    setAnswered(null);
    setEnded(false);
  };

  return (
    <section className="bg-white mt-12 pb-20">
      <div className="container max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-black mb-6">
          QCM — 10 questions
        </h2>

        {!started ? (
          <button
            onClick={() => setStarted(true)}
            className="px-6 py-3 bg-amber-500 text-black rounded-lg text-lg"
          >
            ▶ Démarrer le quiz
          </button>
        ) : !ended ? (
          <div className="space-y-6 text-left">
            {/* Question */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-black mb-4">
                  {question.id}. {question.prompt}
                </h3>
                <ul className="space-y-3">
                  {question.choices.map((c) => (
                    <li key={c.key}>
                      <button
                        onClick={() => handleAnswer(c.key)}
                        disabled={!!answered}
                        className={`w-full flex items-center gap-2 rounded-md px-4 py-2 border transition text-black
                          ${
                            answered === c.key
                              ? c.key === question.correct
                                ? "bg-green-200 border-green-500"
                                : "bg-red-200 border-red-500"
                              : "bg-amber-50 hover:bg-amber-100 border-amber-200"
                          }`}
                      >
                        <span className="bg-amber-400 text-black font-bold px-2 py-1 rounded">
                          {c.key}
                        </span>
                        <span className="text-black">{c.text}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Bouton micro */}
                {!answered && (
                  <button
                    onClick={handleVoiceAnswer}
                    className="mt-4 px-4 py-2 rounded-md bg-amber-500 text-black"
                  >
                    {listening ? "🎤 J’écoute..." : "🎤 Répondre avec la voix"}
                  </button>
                )}
              </div>
              <Image
                src={question.image}
                alt={`illustration question ${question.id}`}
                width={200}
                height={140}
                className="rounded-md object-cover"
              />
            </div>

            {/* Feedback */}
            {answered && (
              <div className="space-y-3 text-center">
                {answered === question.correct ? (
                  <p className="text-green-700 font-semibold">✅ Bonne réponse !</p>
                ) : (
                  <p className="text-red-700 font-semibold">
                    ❌ Mauvaise réponse. La bonne était{" "}
                    {
                      question.choices.find((c) => c.key === question.correct)
                        ?.text
                    }
                  </p>
                )}
                <button
                  onClick={nextQuestion}
                  className="px-6 py-2 bg-black text-white rounded-lg"
                >
                  {current + 1 < QUESTIONS.length ? "Suivant ➜" : "Voir le score"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg font-bold text-black">
              Score final : {score} / {QUESTIONS.length}
            </p>
            <button
              onClick={restart}
              className="px-6 py-3 bg-amber-500 text-black rounded-lg"
            >
              ↻ Recommencer
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Exercice;
