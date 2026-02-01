"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function ChatViviane({
  activityId,
  engine = "ollama", // 👉 PAR DÉFAUT LOCAL !
}: {
  activityId: string;
  engine?: "ollama" | "openai";
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (role: string, content: string) => {
    setMessages((prev) => [...prev, { role, content, id: Date.now() + Math.random() }]);
  };

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("SpeechRecognition non supporté.");
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

    // 👉 ON REPASSE 100% EN LOCAL
    const res = await fetch("/api/viviane/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user123",
        text: textToSend,
        activityId,
      }),
    });

    const data = await res.json();

    setMessages((prev) => prev.filter((m) => m.role !== "viviane-temp"));
    addMessage("viviane", data.text);

    if (data.audio) playAudio(data.audio);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-amber-400 hover:bg-amber-300 text-black rounded-full shadow-xl w-16 h-16 flex items-center justify-center transition-all"
      >
        <Image
          src="/images/viviane/viviane.png"
          alt="Viviane"
          width={42}
          height={42}
          className="rounded-full"
        />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[360px] rounded-2xl shadow-2xl bg-white border border-amber-200 overflow-hidden animate-fadeIn">

      <div className="flex items-center justify-between p-4 bg-white border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-inner">
            <Image
              src="/images/viviane/viviane.png"
              width={48}
              height={48}
              alt="Viviane"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-black">Viviane</h2>
            <p className="text-xs text-black/60">Assistante pédagogique FAW (local)</p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="text-black/70 hover:text-black text-xl px-2"
        >
          ▼
        </button>
      </div>

      <div className="p-4 h-[300px] overflow-y-auto flex flex-col gap-3 bg-white">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2 ${m.role === "user" ? "justify-end" : ""}`}
          >
            {m.role !== "user" && m.role !== "viviane-temp" && (
              <Image
                src="/images/viviane/viviane.png"
                width={32}
                height={32}
                alt="Viviane"
                className="rounded-full shadow"
              />
            )}

            <div
              className={`
                px-3 py-2 rounded-xl shadow-sm max-w-[70%] leading-relaxed text-black
                ${
                  m.role === "user"
                    ? "bg-amber-100 border border-amber-300"
                    : m.role === "viviane-temp"
                    ? "bg-gray-200 italic opacity-70 border border-gray-300"
                    : "bg-gray-100 border border-gray-300"
                }
              `}
            >
              {m.content}
            </div>

            {m.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shadow">
                U
              </div>
            )}
          </div>
        ))}

        {listening && (
          <div className="flex items-center gap-2 text-amber-600">
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
            <span className="text-sm italic">🎤 J’écoute…</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-3 gap-2 border-t bg-white">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border border-amber-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 text-black"
          placeholder="Parle avec Viviane…"
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded-xl shadow hover:opacity-90 transition"
        >
          ➤
        </button>

        <button
          onClick={startListening}
          className={`px-4 py-2 rounded-xl shadow transition ${
            listening ? "bg-amber-500 text-black scale-110" : "bg-amber-300 text-black scale-100"
          }`}
        >
          🎤
        </button>
      </div>
    </div>
  );
}
