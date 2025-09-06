"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

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

// Messages personnalisables pour la voix
const positiveResponses = [
  "Bravo !",
  "Exact !",
  "Parfait !",
  "C’est la bonne réponse !",
  "Super, continue !"
];

const negativeResponses = [
  "Raté, essaie encore.",
  "Non, recommence.",
  "Faux, fais un autre essai.",
  "Pas correct, réessaie.",
  "Toujours incorrect, concentre-toi."
];

const Test = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // --- Gestion quiz ---
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

  // Fonction pour parler (réponse + message positif ou négatif)
  const speakText = (text: string) => {
    if (typeof window === "undefined") return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    const googleVoice = voices.find(v => v.name.includes("Google français")) || voices[0];
    if (googleVoice) utterance.voice = googleVoice;
    utterance.pitch = 1;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const checkAnswer = (userInput: string) => {
    const correct = questions[currentQuestion].answer.toLowerCase();
    const userAnswer = userInput.toLowerCase().trim();

    let isCorrect = false;

    if (userAnswer.includes(correct)) {
      const randomPositive = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
      isCorrect = true;
      speakText(`${randomPositive} La réponse est : ${questions[currentQuestion].answer}`);
    } else {
      const randomNegative = negativeResponses[Math.floor(Math.random() * negativeResponses.length)];
      speakText(`${randomNegative} La réponse correcte est : ${questions[currentQuestion].answer}`);
    }

    // Affichage minimal : juste la réponse
    setAnswers(prev => [...prev, questions[currentQuestion].answer]);
    setFeedback(questions[currentQuestion].answer);
    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setFeedback("");
      } else {
        setQuizFinished(true);
      }
    }, 3000);
  };

  const handleTextAnswer = () => {
    checkAnswer(typedAnswer);
    setTypedAnswer("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleTextAnswer();
  };

  const handleAnswer = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      checkAnswer(transcript);
    };
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setFeedback("");
    setScore(0);
    setTypedAnswer("");
  };

  const getResultMessage = () => {
    if (score === 12) return "« C’est très bien. Tu peux passer à l’activité suivante »";
    else if (score >= 8) return "« C’est pas mal. Veux-tu quand même essayer à nouveau ? »";
    else return "« Tu devrais refaire le quizz pour t’améliorer ! »";
  };

  return (
    <section className="py-16 md:py-20 lg:py-3">
      <div className="container">
        <h1 className="text-black text-center font-semibold text-[40px] pb-12">COMPREHENSION ORALE</h1>

        {/* --- Vidéo + photo --- */}
        <div className="mt-10 flex flex-wrap">
          <div className="w-full lg:w-1/2 flex justify-center items-start px-6">
            <div className="relative aspect-video w-full max-w-[300px]">
              <video controls className="w-full h-auto rounded-lg shadow-lg">
                <source src="/videos/videofaireetaller.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
              </video>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center items-start px-6">
            <Image
              src="/images/courses/headeractivity.png"
              alt="professeur"
              width={500}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>

        {/* --- Cadre audio --- */}
        <div className="mt-[100px] mb-[100px] flex justify-center">
          <div className="text-black border-2 text-center rounded-lg p-6 max-w-2xl w-full">
            <h3 className="mb-4 text-lg font-bold">
              ACTIVITÉ 1 : Écoute la conversation entre M. Dupont et Mlle Sicart et choisis la bonne réponse.
            </h3>
            <button
              onClick={() => {
                if (audioRef.current) {
                  if (isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  } else {
                    audioRef.current.play();
                    setIsPlaying(true);
                  }
                }
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-md transition"
            >
              {isPlaying ? "⏸️ Pause" : "▶️ Écouter"}
            </button>
            <audio ref={audioRef} src="/audios/lunch.wav" />
          </div>
        </div>

        {/* --- Quiz --- */}
        <div className="mt-12 flex flex-wrap">
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center text-black px-6">
            {!quizStarted ? (
              <button
                onClick={() => setQuizStarted(true)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold shadow-md transition"
              >
                🚀 Démarrer le quiz
              </button>
            ) : !quizFinished ? (
              <>
                <p className="text-lg mb-4">{questions[currentQuestion].text}</p>
                <button
                  onClick={handleAnswer}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white mb-4"
                >
                  🎤 Répondre à l’oral
                </button>
                <div className="flex flex-col items-center gap-2 w-full max-w-sm">
                  <input
                    type="text"
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Écris ta réponse ici..."
                    className="w-full border border-gray-400 rounded px-3 py-2"
                  />
                  <button
                    onClick={handleTextAnswer}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white w-full"
                  >
                    ✍️ Valider la réponse
                  </button>
                </div>
                {feedback && <p className="mt-4 font-semibold">{feedback}</p>}
                <div className="mt-6 text-left space-y-2">
                  {answers.map((ans, index) => (
                    <p key={index} className="text-sm">
                      <strong>Q{index + 1} :</strong> {ans}
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-8 border-2 border-gray-800 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold mb-4">🎉 Résultat du quiz</h3>
                <p className="text-lg">
                  Tu as obtenu <strong>{score}</strong> / {questions.length} points.
                </p>
                <p className="mt-4 italic">{getResultMessage()}</p>
                {score < 12 && (
                  <button
                    onClick={restartQuiz}
                    className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold shadow-md transition"
                  >
                    🔄 Refaire le quiz
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 flex justify-center items-start px-6">
            <Image
              src="/images/courses/breaklunch.png"
              alt="break lunch"
              width={500}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Test;
