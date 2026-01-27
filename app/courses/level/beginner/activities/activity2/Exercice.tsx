"use client";

import React, { useEffect, useState } from "react";

/**
 * Exercice (Activité 2) — UI alignée avec l'activité 1
 * - Cartes blanches arrondies, shadow, ring
 * - Accents amber (badges, focus ring)
 * - Micro 🎤 pour réponse vocale + champ texte (optionnel) avec styles harmonisés
 */

const questions = [
  { text: "1. Qui sont M. Dupont et Mlle Sicart ? Des amis ? Des frères et sœur ? Des collègues de travail ?", answer: "des collègues de travail" },
  { text: "2. M. Dupont est marié, divorcé ou célibataire ?", answer: "marié" },
  { text: "3. Le samedi, M. Dupont fait le ménage et la cuisine, les courses et la cuisine ou la vaisselle et la cuisine ?", answer: "les courses et la cuisine" },
  { text: "4. Qui fait le ménage chez M. Dupont ? Sa mère ? Sa fille ? Sa femme ?", answer: "sa femme" },
  { text: "5. M. Dupont mange au bar ou au restaurant ?", answer: "au restaurant" },
  { text: "6. À midi, Mlle Sicart va au centre commercial ou à la piscine ?", answer: "à la piscine" },
  { text: "7. Le dimanche, M. Dupont fait du sport avec un ami ou avec sa femme ?", answer: "avec sa femme" },
  { text: "8. Qu’est-ce qu’ils font ? Du yoga, de la randonnée ou de l’escalade ?", answer: "de la randonnée" },
  { text: "9. Où est-ce qu’ils vont pour faire cette activité ? A la montagne, à la campagne ou à la salle de sport ?", answer: "à la montagne" },
  { text: "10. Où va Mlle Sicart le samedi soir ? Au cinéma ? En boîte ?", answer: "en boîte" },
  { text: "11. Pourquoi M. Dupont va au restaurant ? Pour dormir ? Pour déjeuner ?", answer: "pour déjeuner" },
  { text: "12. Pourquoi Mlle Sicart va à la piscine ? Pour nager ? Pour faire de la gymnastique dans l’eau ? »", answer: "pour faire de la gymnastique dans l’eau" },
];

// Messages voix
const positiveResponses = ["Bravo !", "Exact !", "Parfait !", "C’est la bonne réponse !", "Super, continue !"];
const negativeResponses = ["Raté, essaie encore.", "Non, recommence.", "Faux, fais un autre essai.", "Pas correct, réessaie.", "Toujours incorrect, concentre-toi."];

const Exercice: React.FC = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

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

  // TTS
  const speakText = (text: string) => {
    if (typeof window === "undefined") return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "fr-FR";
    utter.pitch = 1;
    utter.rate = 0.9;
    const v = voices.find((x) => x.name.includes("Google français")) || voices[0];
    if (v) utter.voice = v;
    window.speechSynthesis.speak(utter);
  };

  // Vérif réponse
  const checkAnswer = (userInput: string) => {
    const correct = questions[currentQuestion].answer.toLowerCase();
    const user = userInput.toLowerCase().trim();
    let ok = false;

    if (user.includes(correct)) {
      ok = true;
      const say = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
      speakText(`${say} La réponse est : ${questions[currentQuestion].answer}`);
    } else {
      const say = negativeResponses[Math.floor(Math.random() * negativeResponses.length)];
      speakText(`${say} La réponse correcte est : ${questions[currentQuestion].answer}`);
    }

    setAnswers((prev) => [...prev, questions[currentQuestion].answer]);
    setFeedback(questions[currentQuestion].answer);
    if (ok) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((i) => i + 1);
        setFeedback("");
      } else {
        setQuizFinished(true);
      }
    }, 2500);
  };

  // Saisie texte
  const handleTextAnswer = () => {
    if (!typedAnswer.trim()) return;
    checkAnswer(typedAnswer);
    setTypedAnswer("");
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleTextAnswer();
  };

  // Micro
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
    rec.start();
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      checkAnswer(transcript);
    };
  };

  const restart = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setFeedback("");
    setScore(0);
    setTypedAnswer("");
  };

  const resultMessage = () => {
    if (score === 12) return "« C’est très bien. Tu peux passer à l’activité suivante »";
    if (score >= 8) return "« C’est pas mal. Veux-tu quand même essayer à nouveau ? »";
    return "« Tu devrais refaire le quizz pour t’améliorer ! »";
    };

  return (
    <div className="w-full lg:w-1/2 px-6">
      <div className="relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
        {/* Header carte */}
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <h3 className="text-[18px] font-semibold text-black">Quiz — Compréhension</h3>
          <span className="rounded-md bg-amber-400 px-2 py-1 text-xs font-semibold text-black shadow">
            Parle &amp; valide
          </span>
        </div>

        {/* Corps */}
        <div className="px-5 py-5 text-black">
          {!quizStarted ? (
            <div className="flex flex-col items-center text-center">
              <p className="text-black/70 max-w-prose">
                Lis la question puis réponds <span className="font-semibold">à l’oral</span> (micro) ou
                <span className="font-semibold"> par écrit</span>. Je te dirai si c’est correct.
              </p>
              <button
                onClick={() => setQuizStarted(true)}
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-black/80 px-5 py-2.5 text-white backdrop-blur hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                🚀 Démarrer le quiz
              </button>
            </div>
          ) : !quizFinished ? (
            <>
              <p className="text-lg mb-4">{questions[currentQuestion].text}</p>

              {/* Ligne d’actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleVoiceAnswer}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-black shadow hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Répondre à l’oral"
                  title="Répondre à l’oral"
                >
                  🎤
                </button>
                <div className="flex-1">
                  <input
                    type="text"
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Écris ta réponse..."
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-[15px] text-black placeholder:text-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  />
                </div>
                <button
                  onClick={handleTextAnswer}
                  className="inline-flex items-center justify-center rounded-md bg-black/80 px-3 py-2 text-sm font-medium text-white backdrop-blur hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  Valider
                </button>
              </div>

              {/* Feedback */}
              <p className="mt-3 text-sm text-black/70 min-h-[1.5rem]">{feedback}</p>

              {/* Historique des réponses correctes */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-black/70 mb-2">Réponses affichées</h4>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {answers.map((ans, i) => (
                    <li
                      key={i}
                      className="rounded-md border border-black/5 bg-amber-50 px-3 py-2 text-[14px] text-black/80"
                    >
                      <span className="font-medium">Q{i + 1} :</span> {ans}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-bold">🎉 Résultat</h3>
              <p className="mt-2">
                Tu as obtenu <strong>{score}</strong> / {questions.length}.
              </p>
              <p className="mt-2 italic">{resultMessage()}</p>
              {score < 12 && (
                <button
                  onClick={restart}
                  className="mt-5 inline-flex items-center justify-center rounded-lg bg-black/80 px-5 py-2.5 text-white backdrop-blur hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  🔄 Refaire le quiz
                </button>
              )}
            </div>
          )}
        </div>

        {/* Légende bas de carte */}
        <div className="absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs font-medium text-black backdrop-blur">
          Reconnaissance vocale
        </div>
      </div>
    </div>
  );
};

export default Exercice;
