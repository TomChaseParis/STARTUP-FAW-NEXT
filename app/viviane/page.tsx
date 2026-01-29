"use client";

import { useState } from "react";

export default function VivianeChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [listening, setListening] = useState(false);
  const userId = "demo-user";

  const startListening = () => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SR) return alert("SpeechRecognition non supporté sur ce navigateur");

    const rec = new SR();
    rec.lang = "fr-FR";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);

    rec.onresult = async (e: any) => {
      const transcript = e.results[0][0].transcript;
      addMessage("user", transcript);
      await sendToViviane(transcript);
    };

    rec.start();
  };

  const addMessage = (role: string, text: string) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  const sendToViviane = async (text: string) => {
    const res = await fetch("/api/viviane/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, text }),
    });

    const data = await res.json();

    addMessage("assistant", data.text);
    playAudio(data.audio);
  };

  const playAudio = (base64: string) => {
    const audio = new Audio(`data:audio/mp3;base64,${base64}`);
    audio.play();
  };

  return (
    <div className="flex flex-col items-center p-6 gap-6 mt-[400px]">
      <button
        className={`px-6 py-4 rounded-xl text-white text-lg ${
          listening ? "bg-amber-500" : "bg-black"
        }`}
        onClick={startListening}
      >
        {listening ? "🎤 J’écoute..." : "🎤 Parler à Viviane"}
      </button>

      <div className="w-full max-w-lg flex flex-col gap-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl shadow-lg ${
              m.role === "user"
                ? "bg-amber-100 self-end"
                : "bg-white self-start"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
    </div>
  );
}