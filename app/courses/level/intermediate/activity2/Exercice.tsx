"use client";

import React, { useEffect, useState } from "react";

// Questions avec deux réponses possibles
const questions = [
  {
    text: "1. Est-ce que tu connais tes voisins ?",
    speak: "Est-ce que tu connais tes voisins ?",
    answers: [
      "oui je connais les voisins",
      "non je ne connais pas les voisins",
    ],
  },
  {
    text: "2. Est-ce que tu regardes souvent la télé ?",
    speak: "Est-ce que tu regardes souvent la télé ?",
    answers: [
      "oui je regarde souvent la télé",
      "non je ne regarde pas souvent la télé",
    ],
  },
  {
    text: "3. Est-ce que tu aimes cette ville ?",
    speak: "Est-ce que tu aimes cette ville ?",
    answers: ["oui j'aime la ville", "non je n'aime pas la ville"],
  },
  {
    text: "4. Ce soir, tu accompagnes tes amis à l'aéroport ?",
    speak: "Ce soir, tu accompagnes tes amis à l'aéroport ?",
    answers: [
      "oui je les accompagne à l'aéroport",
      "non je ne les accompagne pas à l'aéroport",
    ],
  },
  {
    text: "5. Tu prends ton parapluie ?",
    speak: "Tu prends ton parapluie ?",
    answers: [
      "oui je prends le parapluie",
      "non je ne prends pas le parapluie",
    ],
  },
];

const positiveResponses = ["Bravo !", "Exact !", "Parfait !", "C’est correct !"];
const correctionIntro = ["La bonne réponse est :", "La réponse correcte est :", "Voici la bonne réponse :"];

const Exercice: React.FC = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [typedAnswer, setTypedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [listening, setListening] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [history, setHistory] = useState<
    { question: string; userAnswer: string; correct: boolean; expected: string[] }[]
  >([]);

  // Charger les voix
  useEffect(() => {
    if (typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      if (availableVoices.length > 0) setVoices(availableVoices);
    };
    loadVoices();
    synth.onvoiceschanged = loadVoices;
    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  // Text-to-Speech
  const speakText = (text: string) => {
    if (typeof window === "undefined") return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "fr-FR";
    utter.rate = 0.95;
    const v = voices.find((x) => x.name.includes("Google français")) || voices[0];
    if (v) utter.voice = v;
    window.speechSynthesis.speak(utter);
  };

  // Vérifier une réponse
  const checkAnswer = (userInput: string) => {
    const correctAnswers = questions[currentQuestion].answers.map((a) =>
      a.toLowerCase().trim()
    );
    const user = userInput.toLowerCase().trim();

    const isCorrect = correctAnswers.includes(user);

    if (isCorrect) {
      const say = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
      setFeedback(
        `✅ ${say} — Réponses possibles : ${questions[currentQuestion].answers.join(" / ")}`
      );
      speakText(
        `${say}. Réponses possibles : ${questions[currentQuestion].answers.join(" ou ")}`
      );
      setScore((s) => s + 1);
    } else {
      const say = correctionIntro[Math.floor(Math.random() * correctionIntro.length)];
      setFeedback(
        `❌ Mauvaise réponse — ${say} ${questions[currentQuestion].answers.join(" / ")}`
      );
      speakText(
        `${say} ${questions[currentQuestion].answers.join(" ou ")}`
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        question: questions[currentQuestion].text,
        userAnswer: userInput,
        correct: isCorrect,
        expected: questions[currentQuestion].answers,
      },
    ]);

    setAnswered(true);
  };

  // Réponse écrite
  const handleTextAnswer = () => {
    if (!typedAnswer.trim()) return;
    checkAnswer(typedAnswer);
    setTypedAnswer("");
  };

  // Réponse orale
  const handleVoiceAnswer = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("⚠️ Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = "fr-FR";
    rec.interimResults = false;

    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);

    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      checkAnswer(transcript);
    };

    rec.start();
  };

  // Passer à la question suivante
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setFeedback("");
      setAnswered(false);
      speakText(questions[currentQuestion + 1].speak);
    } else {
      setFeedback(`🎉 Exercice terminé ! Score : ${score}/${questions.length}`);
      speakText(`Exercice terminé ! Ton score est de ${score} sur ${questions.length}`);
    }
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-2xl relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5 p-6">
        {!quizStarted ? (
          <div className="text-center text-black">
            <p>
              Cet exercice consiste à répondre <b>à l’oral</b> ou <b>par écrit</b> aux questions.
              Utilise <b>le, la, les, lui, leur</b> dans tes réponses.
            </p>
            <button
              onClick={() => {
                setQuizStarted(true);
                speakText(questions[0].speak);
              }}
              className="mt-5 rounded-lg bg-black/80 px-6 py-3 text-white hover:bg-black/70"
            >
              🚀 Lancer l’exercice
            </button>
          </div>
        ) : (
          <div className="text-black">
            <h3 className="text-lg font-bold mb-4">{questions[currentQuestion].text}</h3>

            {/* Répondre */}
            {!answered && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleVoiceAnswer}
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    listening ? "bg-red-500" : "bg-amber-400"
                  } text-black shadow`}
                  aria-label="Répondre à l’oral"
                >
                  🎤
                </button>
                <input
                  type="text"
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  placeholder="Écris ta réponse..."
                  className="flex-1 rounded-md border px-3 py-2 text-black"
                />
                <button
                  onClick={handleTextAnswer}
                  className="rounded-md bg-black/80 px-4 py-2 text-white"
                >
                  Valider
                </button>
              </div>
            )}

            {/* Feedback */}
            {feedback && <p className="mt-4 text-black">{feedback}</p>}

            {/* Bouton suivant */}
            {answered && (
              <button
                onClick={nextQuestion}
                className="mt-6 rounded-lg bg-amber-400 px-5 py-2 font-semibold text-black shadow hover:bg-amber-300"
              >
                👉 Question suivante
              </button>
            )}

            {/* Historique */}
            {history.length > 0 && (
              <div className="mt-8">
                <h4 className="text-md font-semibold mb-3">Historique des réponses :</h4>
                <ul className="space-y-2">
                  {history.map((h, i) => (
                    <li
                      key={i}
                      className={`rounded-md border px-3 py-2 ${
                        h.correct ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300"
                      }`}
                    >
                      <p className="font-medium">{h.question}</p>
                      <p className="text-sm">Ta réponse : {h.userAnswer}</p>
                      <p className="text-sm">
                        {h.correct
                          ? "✅ Correct"
                          : `❌ Faux — Réponses attendues : ${h.expected.join(" / ")}`}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercice;
