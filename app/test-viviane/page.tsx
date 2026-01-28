"use client";

import { useState } from "react";

const TestVivianePage = () => {
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Reconnaissance vocale non supportée");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);

    recognition.onend = () => setListening(false);

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setUserText(transcript);

      // 👉 envoyer le texte à Viviane
      speakWithViviane(transcript);
    };

    recognition.start();
  };

  const speakWithViviane = async (text: string) => {
    const res = await fetch("/api/elevenlabs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
      }),
    });

    const audioBlob = await res.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <button
        onClick={startListening}
        className={`rounded-xl px-6 py-4 text-lg text-white ${
          listening ? "bg-amber-500" : "bg-black"
        }`}
      >
        {listening ? "🎤 J’écoute..." : "🎤 Parler à Viviane"}
      </button>

      {userText && (
        <p className="text-lg text-black/80">
          <strong>Tu as dit :</strong> {userText}
        </p>
      )}
    </div>
  );
};

export default TestVivianePage;
