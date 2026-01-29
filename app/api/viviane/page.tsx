"use client";

import { useState, useRef, useEffect } from "react";

export default function VivianeChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [listening, setListening] = useState(false);
  const userId = "demo-user";

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll automatique vers le bas quand un nouveau message arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 pt-[300px] px-4">

      {/* BOUTON MICRO */}
      <button
        className={`fixed bottom-6 right-6 px-6 py-4 rounded-full text-white text-lg shadow-xl transition-all
        ${listening ? "bg-amber-500 scale-110" : "bg-black scale-100"}`}
        onClick={startListening}
      >
        {listening ? "🎤 J’écoute..." : "🎤 Parler"}
      </button>

      {/* TITRE */}
      <h1 className="text-2xl font-semibold text-black mb-6">
        Chat avec Viviane
      </h1>

      {/* ZONE DE CHAT */}
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-4 flex flex-col gap-4 overflow-y-auto"
           style={{ height: "60vh" }}>

        {messages.map((m, i) => (
          <div
            key={i}
            className={`
              px-4 py-3 rounded-xl max-w-[80%] text-black leading-relaxed shadow-sm
              ${m.role === "user" 
                ? "bg-amber-100 self-end border border-amber-300" 
                : "bg-gray-100 self-start border border-gray-300"}
            `}
          >
            {m.text}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}