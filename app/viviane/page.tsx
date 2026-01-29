"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function VivianeChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const userId = "demo-user";

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, speaking]);

  const startListening = () => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SR) return alert("SpeechRecognition non supporté");

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

  const addMessage = (
    role: "user" | "assistant" | "assistant-temp",
    text: string,
  ) => {
    setMessages((prev) => [
      ...prev,
      { role, text, id: Date.now() + Math.random() },
    ]);
  };

  // 🔍 extraction automatique d’un potentiel ID d’activité
  const detectActivityId = (text: string) => {
    const t = text.toLowerCase();

    // Format parlé
    if (t.includes("activité 1") && t.includes("a1")) return "a1-activity-1";

    // Format ID direct
    if (t.includes("a1-activity-1")) return "a1-activity-1";

    return null;
  };

  const sendToViviane = async (text: string) => {
    setSpeaking(true);
    addMessage("assistant-temp", "Viviane est en train de parler…");

    const res = await fetch("/api/viviane/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        text,
        activityId: "beginner_activity_1", // 🔥 FIXÉ ICI
      }),
    });

    const data = await res.json();

    setMessages((prev) => prev.filter((m) => m.role !== "assistant-temp"));
    addMessage("assistant", data.text);

    await playAudio(data.audio);
  };
  const playAudio = async (base64: string) => {
    const audio = new Audio(`data:audio/mp3;base64,${base64}`);
    audio.onended = () => setSpeaking(false);
    audio.play();
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-amber-50 to-white p-6 pt-[150px]">
      {/* HEADER VIVIANE */}
      <div className="mb-6 w-full max-w-xl">
        <div className="flex items-center gap-4 rounded-2xl border border-amber-100 bg-white p-4 shadow-md">
          <div className="h-14 w-14 overflow-hidden rounded-full shadow-inner">
            <Image
              src="/images/viviane/viviane.png"
              width={56}
              height={56}
              alt="Viviane"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black">Viviane</h2>
            <p className="text-sm text-black/60">Assistante pédagogique FAW</p>
          </div>
        </div>
      </div>

      {/* CARD CHAT */}
      <div
        className="relative flex w-full max-w-xl flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
        style={{ height: "70vh" }}
      >
        <div className="flex flex-col gap-4 overflow-y-auto pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.role === "user" ? "justify-end" : ""
              }`}
            >
              {m.role !== "user" && m.role !== "assistant-temp" && (
                <div className="h-10 w-10 overflow-hidden rounded-full shadow">
                  <Image
                    src="/images/viviane/viviane.png"
                    width={40}
                    height={40}
                    alt="Viviane"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div
                className={`
                  max-w-[75%] rounded-2xl px-4 py-3 leading-relaxed text-black shadow-sm
                  ${
                    m.role === "user"
                      ? "border border-amber-300 bg-amber-100"
                      : "border border-gray-300 bg-gray-100"
                  }
                  ${m.role === "assistant-temp" ? "italic opacity-70" : ""}
                `}
              >
                {m.text}
              </div>

              {m.role === "user" && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black font-bold text-white shadow">
                  U
                </div>
              )}
            </div>
          ))}

          {listening && (
            <div className="flex items-center gap-3 text-amber-600">
              <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500"></div>
              <p className="text-sm italic">🎤 Je t’écoute…</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* BUTTON MICRO */}
        <button
          className={`absolute bottom-4 right-4 rounded-full px-6 py-4 text-lg text-white shadow-xl transition-all
          ${listening ? "scale-110 bg-amber-500" : "scale-100 bg-black"}
          `}
          onClick={startListening}
        >
          {listening ? "🎤 J’écoute..." : "🎤 Parler"}
        </button>
      </div>
    </div>
  );
}
