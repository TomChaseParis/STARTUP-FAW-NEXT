"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import { exercice4Data } from "./exercice4Data";
import { exercice4SpeechData } from "./Exercice4SpeechItem";
import SpeechRecognitionEngine from "@/components/courses/blocks/SpeechRecognitionEngine";

export default function Exercice4() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playingId, setPlayingId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const [resultsByCard, setResultsByCard] = useState<
    Record<number, { text: string; correct: boolean }[]>
  >({});

  const pronounsMap: Record<number, string> = {
    2: "ILS",
    3: "ELLE",
    4: "NOUS",
    5: "VOUS",
    6: "TU",
  };

  const handlePlay = (id: number, audio: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const newAudio = new Audio(audio);
    audioRef.current = newAudio;

    setPlayingId(id);
    setCurrentTime(0);

    newAudio.play();

    newAudio.ontimeupdate = () => {
      setCurrentTime(newAudio.currentTime);
    };

    newAudio.onended = () => {
      setPlayingId(null);
      setCurrentTime(0);
    };
  };

  const handleSpeechResult = (
    id: number,
    results: { text: string; isCorrect: boolean }[]
  ) => {
    const normalized = results.map((r) => ({
      text: r.text,
      correct: r.isCorrect,
    }));

    setResultsByCard((prev) => ({
      ...prev,
      [id]: normalized,
    }));
  };

  return (
    <section className="mt-12">

      {/* ================= INSTRUCTION ================= */}
      <InstructionBlock
  title="🎤 EXERCICE 4 : Présente les personnages"
  subtitle="Parle à voix haute en utilisant le bon pronom"
  description={
    <div className="space-y-5 text-black">

      {/* INTRO */}
      <p className="font-medium">
        👉 Présente chaque personnage en conjuguant les verbes à la bonne forme.
      </p>

      {/* EXPLICATION */}
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
        <p className="text-sm text-slate-700">
          Utilise le pronom indiqué :
        </p>

        <div className="flex flex-wrap gap-2 text-sm">
          {["JE", "TU", "IL", "ELLE", "NOUS", "VOUS", "ILS"].map((p) => (
            <span
              key={p}
              className="px-3 py-1 rounded-full bg-black text-white font-semibold"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* EXEMPLE */}
      <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          Exemple
        </p>

        <p className="text-sm text-blue-900">
          <strong>Ils sont mariés.</strong><br />
          <strong>Ils font une croisière.</strong>
        </p>
      </div>

      {/* CONSIGNE ACTION */}
      <div className="rounded-xl bg-amber-50 border border-amber-300 p-4">
        <p className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
          🎯 À toi de jouer
        </p>

        <ul className="text-sm text-amber-900 space-y-1">
          <li>• Observe l’image</li>
          <li>• Utilise le pronom indiqué</li>
          <li>• Clique sur le micro et parle</li>
        </ul>
      </div>

    </div>
  }
  activityType="click-speak"
/>

      {/* ================= LISTE ================= */}
      <div className="mx-auto mt-10 max-w-6xl space-y-10 px-4">

        {exercice4Data.map((item) => {
          const speechItem = exercice4SpeechData.find((s) => s.id === item.id);
          const isExample = item.id === 1;
          const pronoun = pronounsMap[item.id];

          return (
            <div
              key={item.id}
              className="
                relative grid md:grid-cols-3 gap-6
                bg-white rounded-2xl shadow-lg ring-1 ring-black/5 overflow-hidden
                h-[450px]
              "
            >

              {/* ================= IMAGE ================= */}
              <div className="relative h-full w-full">
                <Image
                  src={item.image}
                  alt="illustration"
                  fill
                  className="object-cover"
                />
              </div>

              {/* ================= TEXTE STATIQUE ================= */}
              <div className="relative p-6 flex flex-col justify-center overflow-hidden">
                <div className="space-y-2 text-black text-[16px] leading-relaxed overflow-y-auto custom-scrollbar">
                  {item.sentences.map((sentence, index) => {
                    const words = sentence.split(" ");
                    const firstWord = words[0];
                    const rest = words.slice(1).join(" ");

                    return (
                      <p key={index}>
                        <strong>{firstWord}</strong> {rest}
                      </p>
                    );
                  })}
                </div>

                {/* gradient scroll hint */}
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent" />
              </div>

              {/* ================= COLONNE DROITE ================= */}
              <div
                className={`
                  relative bg-slate-50 p-6 flex flex-col overflow-y-auto custom-scrollbar
                  ${isExample ? "justify-center" : "items-center justify-center"}
                `}
              >

                {/* ================= MODE EXEMPLE ================= */}
                {isExample ? (
                  <>
                    <button
                      onClick={() => handlePlay(item.id, item.audio)}
                      className={`
                        mb-5 flex items-center gap-2 w-fit
                        px-5 py-3 rounded-xl
                        font-semibold text-sm tracking-wide
                        shadow-md transition-all duration-200
                        ${
                          playingId === item.id
                            ? "bg-green-500 text-white scale-105"
                            : "bg-black text-white hover:bg-green-600"
                        }
                      `}
                    >
                      ▶ {playingId === item.id ? "EN COURS..." : "EXEMPLE AUDIO"}
                    </button>

                    <div className="space-y-2 text-[16px]">
                      {speechItem?.sentences.map((sentence, index) => {
                        const isActive =
                          playingId === item.id &&
                          currentTime >= sentence.start &&
                          (
                            !speechItem.sentences[index + 1] ||
                            currentTime < speechItem.sentences[index + 1].start
                          );

                        return (
                          <div key={index} className="flex items-start gap-2">

                            {/* marker animé */}
                            <span
                              className={`
                                mt-1 h-2.5 w-2.5 rounded-full transition
                                ${
                                  isActive
                                    ? "bg-green-500 scale-125 animate-pulse"
                                    : "bg-slate-300"
                                }
                              `}
                            />

                            {/* texte highlight */}
                            <p
                              className={`
                                px-2 py-1 rounded-md transition-all duration-200
                                ${
                                  isActive
                                    ? "bg-amber-200 text-black font-semibold shadow-sm"
                                    : "text-slate-400"
                                }
                              `}
                            >
                              {sentence.text}
                            </p>

                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-6 w-full">

                    {/* PRONOM */}
                    <div className="text-center">
                      <p className="text-xs text-slate-500 mb-1">
                        Utilise le pronom :
                      </p>
                      <div className="px-4 py-2 rounded-lg bg-black text-white font-bold text-lg shadow">
                        {pronoun}
                      </div>
                    </div>

                    {/* MICRO */}
                    <SpeechRecognitionEngine
                      expectedSentences={
                        speechItem?.sentences.map((s) => s.text) || []
                      }
                      requiredPronoun={pronoun?.toLowerCase()}
                      onResult={(res) => handleSpeechResult(item.id, res)}
                    />

                    {/* RESULTATS */}
                    {resultsByCard[item.id] && (
                      <div className="w-full mt-4 space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                        <p className="text-sm font-semibold text-green-600">
                          Correction :
                        </p>

                        {resultsByCard[item.id].map((res, index) => (
                          <p
                            key={index}
                            className={`
                              text-sm px-3 py-2 rounded-lg
                              ${
                                res.correct
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }
                            `}
                          >
                            {res.text}
                          </p>
                        ))}
                      </div>
                    )}

                  </div>
                )}

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}