"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// 📌 Ajout TypeScript pour SpeechRecognition (corrige TES erreurs)
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function ChatViviane({ activityId }: { activityId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (role: string, content: string) => {
    setMessages((prev) => [
      ...prev,
      { role, content, id: Date.now() + Math.random() },
    ]);
  };

  // 🎤 ÉCOUTE VOCALE — corrigée pour TS
  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SR) {
      alert("SpeechRecognition non supporté par ce navigateur.");
      return;
    }

    const rec = new SR();
    rec.lang = "fr-FR";
    rec.interimResults = false;

    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);

    rec.onresult = async (e: any) => {
      const transcript = e.results[0][0].transcript;
      addMessage("user", transcript);
      await sendToViviane(transcript);
    };

    rec.start();
  };

  // 🔊 TTS
  const playAudio = async (base64: string) => {
    const audio = new Audio(`data:audio/mp3;base64,${base64}`);
    audio.onended = () => setSpeaking(false);
    audio.play();
  };

  const sendMessage = async () => {
    if (!text.trim()) return;
    addMessage("user", text);
    await sendToViviane(text);
    setText("");  
  };

  const sendToViviane = async (textToSend: string) => {
    setSpeaking(true);
    addMessage("viviane-temp", "Viviane est en train de parler…");

    const res = await fetch("/api/viviane/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user123",
        text: textToSend,
        activityId: activityId, // 🔥 c’est ça qui change tout
      }),
    });

    const data = await res.json();

    setMessages((prev) => prev.filter((m) => m.role !== "viviane-temp"));
    addMessage("viviane", data.text);

    if (data.audio) {
      await playAudio(data.audio);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-[360px] overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-2xl">
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-amber-100 bg-white p-4">
        <div className="h-12 w-12 overflow-hidden rounded-full shadow-inner">
          <Image
            src="/images/viviane/viviane.png"
            width={48}
            height={48}
            alt="Viviane"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-black">Viviane</h2>
          <p className="text-xs text-black/60">Assistante pédagogique FAW</p>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex h-[300px] flex-col gap-3 overflow-y-auto bg-white p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2 ${
              m.role === "user" ? "justify-end" : ""
            }`}
          >
            {m.role !== "user" && m.role !== "viviane-temp" && (
              <div className="h-8 w-8 overflow-hidden rounded-full shadow">
                <Image
                  src="/images/viviane/viviane.png"
                  width={32}
                  height={32}
                  alt="Viviane"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div
              className={`
                max-w-[70%] rounded-xl px-3 py-2 leading-relaxed text-black shadow-sm
                ${
                  m.role === "user"
                    ? "border border-amber-300 bg-amber-100"
                    : m.role === "viviane-temp"
                      ? "border border-gray-300 bg-gray-200 italic opacity-70"
                      : "border border-gray-300 bg-gray-100"
                }
              `}
            >
              {m.content}
            </div>

            {m.role === "user" && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black font-bold text-white shadow">
                U
              </div>
            )}
          </div>
        ))}

        {listening && (
          <div className="flex items-center gap-2 text-amber-600">
            <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500"></div>
            <span className="text-sm italic">🎤 J’écoute…</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="flex items-center gap-2 border-t bg-white p-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-xl border border-amber-300 px-3 py-2 text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Parle avec Viviane…"
        />

        <button
          onClick={sendMessage}
          className="rounded-xl bg-black px-4 py-2 text-white shadow transition hover:opacity-90"
        >
          ➤
        </button>

        <button
          onClick={startListening}
          className={`rounded-xl px-4 py-2 shadow transition
            ${
              listening
                ? "scale-110 bg-amber-500 text-black"
                : "scale-100 bg-amber-300 text-black"
            }
          `}
        >
          🎤
        </button>
      </div>
    </div>
  );
}
