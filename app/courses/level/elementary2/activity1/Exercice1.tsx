"use client";

import React, { useEffect, useRef, useState } from "react";

/* ========= Normalisation & matching souples ========= */
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/’/g, "'")
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const userVariants = (s: string) => {
  const n = normalize(s);
  const sansOuiNon = n.replace(/^(oui|non)\s+/, "");
  return [n, sansOuiNon];
};

const isAnswerCorrect = (userInput: string, acceptableAnswers: string[]) => {
  const uVars = userVariants(userInput);
  const acc = acceptableAnswers.map(normalize);

  for (const u of uVars) {
    for (const a of acc) {
      if (u === a) return true;
      if (u.includes(a)) return true;
      if (a.includes(u) && u.length >= Math.min(6, Math.floor(a.length * 0.6)))
        return true;
    }
  }
  return false;
};

/* ========= Données ========= */
type Q = { text: string; acceptableAnswers: string[] };

const questions: Q[] = [
  { text: "Je me lève à 9 heures.", acceptableAnswers: ["À quelle heure est-ce que tu te lèves le matin ?", "À quelle heure te lèves-tu le matin ?"] },
  { text: "Je bois du thé avec du miel et je mange une tartine de pain avec de la confiture, et des céréales.", acceptableAnswers: ["Qu’est-ce que tu prends pour ton petit déjeuner ?", "Que prends-tu pour ton petit déjeuner ?"] },
  { text: "Je quitte la maison à 10 heures moins le quart.", acceptableAnswers: ["À quelle heure est-ce que tu quittes la maison ?", "À quelle heure quittes-tu la maison ?"] },
  { text: "Gaston ? C’est mon chat !", acceptableAnswers: ["Qui est Gaston ?", "Gaston, c’est qui ?"] },
  { text: "Je vais au travail en métro.", acceptableAnswers: ["Comment est-ce que tu vas au travail ?", "Comment vas-tu au travail ?"] },
  { text: "Je mets à peu près 25 minutes.", acceptableAnswers: ["Combien de temps est-ce que tu mets pour aller au travail ?", "Combien de temps mets-tu pour aller au travail ?"] },
  { text: "Je commence à travailler à 10 heures et quart.", acceptableAnswers: ["À quelle heure est-ce que tu commences à travailler ?", "À quelle heure commences-tu à travailler ?"] },
  { text: "Je suis professeur de danse orientale.", acceptableAnswers: ["Qu’est-ce que tu fais comme travail ?", "Quel est ton travail ?"] },
  { text: "Je travaille dans cette école depuis 8 ans.", acceptableAnswers: ["Depuis combien de temps est-ce que tu travailles dans cette école ?", "Depuis combien de temps travailles-tu dans cette école ?"] },
  { text: "Je déjeune avec mon collègue Jamal ou certains de mes élèves.", acceptableAnswers: ["Avec qui est-ce que tu déjeunes ?", "Avec qui déjeunes-tu ?"] },
  { text: "Je déjeune dans une petite brasserie du coin.", acceptableAnswers: ["Où est-ce que tu déjeunes ?", "Où déjeunes-tu ?"] },
  { text: "Après le restaurant ? Je vais parfois m’asseoir dans un parc pour lire un bon livre et m’aérer l’esprit.", acceptableAnswers: ["Qu’est-ce que tu fais après le restaurant ?", "Que fais-tu après le restaurant ?"] },
  { text: "Je donne des cours jusqu’à 4 heures de l’après-midi.", acceptableAnswers: ["Jusqu’à quelle heure est-ce que tu donnes des cours ?", "Jusqu’à quelle heure donnes-tu des cours ?"] },
  { text: "Après le travail ? Je me promène un peu et je vais faire des courses.", acceptableAnswers: ["Qu’est-ce que tu fais après le travail ?", "Que fais-tu après le travail ?"] },
  { text: "Non. Je vis seule avec mon chat Gaston.", acceptableAnswers: ["Est-ce que tu vis avec quelqu’un ?", "Tu vis avec quelqu’un ?"] },
  { text: "Non. Je mange des pâtes à la mozzarella seulement le jeudi soir.", acceptableAnswers: ["Est-ce que tu manges des pâtes à la mozzarella tous les soirs ?", "Tu manges des pâtes à la mozzarella tous les soirs ?"] },
  { text: "La semaine dernière ? Je suis allée voir un spectacle de patinage artistique.", acceptableAnswers: ["Qu’est-ce que tu as fait la semaine dernière ?", "Qu’as-tu fait la semaine dernière ?"] },
  { text: "Avant d’aller au lit, j’appelle ma mère ou mon frère pour prendre de leurs nouvelles.", acceptableAnswers: ["Qui est-ce que tu appelles avant d’aller au lit ?", "Qui appelles-tu avant d’aller au lit ?"] },
  { text: "Je me mets au lit vers 11 heures.", acceptableAnswers: ["Vers quelle heure est-ce que tu te mets au lit ?", "Vers quelle heure te mets-tu au lit ?"] },
  { text: "Avant de dormir ? Je lis un livre pendant une petite demi-heure.", acceptableAnswers: ["Qu’est-ce que tu fais avant de dormir ?", "Que fais-tu avant de dormir ?"] },
];

/* ========= Composant principal ========= */
const Exercice: React.FC = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [listening, setListening] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [history, setHistory] = useState<
    { q: string; user: string; correct: boolean; expected: string[] }[]
  >([]);

  // VIDEO (avec bouton overlay)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // TTS
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const stopSpeaking = () => {
    try {
      window.speechSynthesis.cancel();
    } catch {}
    if (currentUtteranceRef.current) {
      currentUtteranceRef.current.onend = null;
      currentUtteranceRef.current.onerror = null;
      currentUtteranceRef.current = null;
    }
  };

  // Charger les voix
  useEffect(() => {
    if (typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const available = synth.getVoices();
      if (available.length > 0) setVoices(available);
    };
    loadVoices();
    synth.onvoiceschanged = loadVoices;
    return () => {
      synth.onvoiceschanged = null;
      stopSpeaking();
    };
  }, []);

  const getFrenchVoice = () =>
    voices.find((x) => x.name.toLowerCase().includes("google français")) ||
    voices.find((x) => x.lang.toLowerCase().startsWith("fr")) ||
    voices[0];

  const speakText = (text: string) => {
    if (typeof window === "undefined" || !text) return;
    stopSpeaking();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    u.rate = 0.95;
    u.pitch = 1.05;
    const v = getFrenchVoice();
    if (v) u.voice = v;
    currentUtteranceRef.current = u;
    window.speechSynthesis.speak(u);
  };

  const speakQuestionByIndex = (index: number) => {
    const q = questions[index]?.text ?? "";
    if (!q) return;
    speakText(q);
  };

  const startExercise = () => {
    setStarted(true);
    setCurrent(0);
    setUserInput("");
    setHasAnswered(false);
    setFeedback("");
    setHistory([]);
    speakQuestionByIndex(0);
  };

  const evaluate = (input: string) => {
    const q = questions[current];
    const user = input.trim();
    if (!user) return;
    const ok = isAnswerCorrect(user, q.acceptableAnswers);
    setHasAnswered(true);
    setFeedback(
      ok
        ? "✅ Bonne formulation de la question !"
        : `❌ Mauvaise formulation. Exemples : « ${q.acceptableAnswers[0]} » ou « ${q.acceptableAnswers[1]} ».`
    );
    speakText(ok ? "Bravo, bonne question !" : `Dommage. Par exemple : ${q.acceptableAnswers[0]}.`);
    setHistory((h) => [...h, { q: q.text, user, correct: ok, expected: q.acceptableAnswers }]);
  };

  const handleVoiceAnswer = () => {
    if (typeof window === "undefined" || hasAnswered) return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("⚠️ Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }
    stopSpeaking();
    const rec = new SpeechRecognition();
    rec.lang = "fr-FR";
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (e: any) => {
      const best = e.results[0][0].transcript;
      setUserInput(best);
      evaluate(best);
    };
    rec.start();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !hasAnswered) evaluate(userInput);
  };

  const nextQuestion = () => {
    stopSpeaking();
    if (current < questions.length - 1) {
      const n = current + 1;
      setCurrent(n);
      setUserInput("");
      setHasAnswered(false);
      setFeedback("");
      requestAnimationFrame(() => speakQuestionByIndex(n));
    } else speakText("Exercice terminé. Bravo !");
  };

  // S'assure que l'état du bouton reflète la fin de la vidéo
  useEffect(() => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    const onEnded = () => setIsPlaying(false);
    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, []);

  return (
    <section className="bg-white">
      <div className="container max-w-3xl mx-auto pt-10 pb-16">

        {/* ===== Bloc vidéo avec bouton overlay ===== */}
        <div className="mb-8 text-center">
          <h3 className="text-lg font-semibold text-black mb-3">🎥 L’emploi du temps de Clara</h3>

          <div className="relative aspect-video w-full max-w-[720px] mx-auto overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
            <video
              ref={videoRef}
              src="/videos/clara-video.mp4"
              className="h-full w-full object-cover bg-black"
              controls={false}
              poster="/images/courses/clarapic.png"
            />

            {/* Bouton overlay centré */}
            <button
              onClick={toggleVideo}
              className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
              title={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <div className="absolute bottom-2 left-2 rounded bg-white/80 px-2 py-1 text-xs font-medium text-black backdrop-blur">
              Vidéo — Clara
            </div>
          </div>
        </div>

        {/* ===== Exercice ===== */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-black">Exercice — Formule la question</h2>
          <p className="text-black/80">
Trouvez la question correspondante à chaque réponse pour dialoguer avec Clara</p>        </div>

        <div className="mx-auto max-w-2xl rounded-xl bg-white shadow-lg ring-1 ring-black/5 p-5">
          {!started ? (
            <div className="text-center">
              <p className="text-black/80">
                Appuie sur <strong>Lancer l’exercice</strong>. L’énoncé sera lu à voix haute.
              </p>
              <button
                onClick={startExercise}
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-black/80 px-5 py-2.5 text-white hover:bg-black/70"
              >
                🚀 Lancer l’exercice
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-lg font-semibold text-black">{questions[current].text}</p>
                {!hasAnswered && (
                  <button
                    onClick={() => speakQuestionByIndex(current)}
                    className="mt-2 inline-flex items-center justify-center rounded-md bg-amber-500 px-3 py-1.5 text-black font-semibold hover:bg-amber-400"
                  >
                    🔊 Relire l’énoncé
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleVoiceAnswer}
                  disabled={hasAnswered}
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    listening ? "bg-amber-400" : "bg-amber-500"
                  } text-black shadow hover:bg-amber-400 focus:outline-none disabled:opacity-50`}
                  aria-label="Répondre à l’oral"
                  title="Répondre à l’oral"
                >
                  🎤
                </button>

                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  disabled={hasAnswered}
                  placeholder="Formule ici la question correspondante…"
                  className="flex-1 rounded-md border border-black/10 bg-white px-3 py-2 text-[15px] text-black placeholder:text-black/40 focus:outline-none disabled:bg-gray-100"
                />
              </div>

              <p className="mt-3 text-sm text-black min-h-[1.5rem]">{feedback}</p>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={nextQuestion}
                  disabled={!hasAnswered}
                  className={`rounded-md px-4 py-2 text-sm font-semibold ${
                    hasAnswered
                      ? "bg-amber-500 text-black hover:bg-amber-400"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Question suivante →
                </button>
              </div>
            </>
          )}
        </div>

        {/* ===== Historique ===== */}
        {history.length > 0 && (
          <div className="mx-auto max-w-2xl mt-8">
            <h3 className="text-black font-semibold mb-3">Historique</h3>
            <ul className="space-y-3">
              {history.map((h, i) => (
                <li key={i} className="rounded-lg border border-black/5 bg-white p-4 shadow-sm">
                  <p className="text-black font-medium">Énoncé {i + 1} — {h.q}</p>
                  <p className="text-black mt-1">
                    Ta question : <span className="font-medium">{h.user || "—"}</span>
                  </p>
                  <p className="text-black">
                    {h.correct ? "✅ Correct" : "❌ Incorrect"}
                  </p>
                  {!h.correct && (
                    <p className="text-black mt-1">
                      Exemples attendus : « {h.expected[0]} » ou « {h.expected[1]} ».
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Exercice;
