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
    results: { text: string; isCorrect: boolean }[],
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
      <InstructionBlock
        stampLabel="EXERCICE 4"
        title="Présente les personnages"
        subtitle="Parle à voix haute en utilisant le bon pronom"
        description={
          <div className="space-y-5 text-black">
            <p className="font-medium">
              👉 Présente chaque personnage en conjuguant les verbes à la bonne
              forme.
            </p>

            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                Utilise le pronom indiqué :
              </p>

              <div className="flex flex-wrap gap-2 text-sm">
                {["JE", "TU", "IL", "ELLE", "NOUS", "VOUS", "ILS"].map((p) => (
                  <span
                    key={p}
                    className="
                    rounded-xl border
                    border-amber-200
                    bg-amber-50
                    px-4 py-2
                    text-base
                    font-semibold text-amber-800
                    shadow-sm
                  "
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="mb-2 text-sm font-semibold text-blue-700">
                Exemple
              </p>

              <p className="text-sm text-blue-900">
                <strong>Ils sont mariés.</strong>
                <br />
                <strong>Ils font une croisière.</strong>
              </p>
            </div>

            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-800">
                🎯 À toi de jouer
              </p>

              <ul className="space-y-1 text-sm text-amber-900">
                <li>• Observe l’image</li>
                <li>• Utilise le pronom indiqué</li>
                <li>• Clique sur le micro et parle</li>
              </ul>
            </div>
          </div>
        }
        activityType="click-speak"
      />

      <div className="mx-auto mt-10 max-w-6xl space-y-10 px-4">
        {exercice4Data.map((item) => {
          const speechItem = exercice4SpeechData.find((s) => s.id === item.id);
          const isExample = item.id === 1;
          const pronoun = pronounsMap[item.id];

          return (
            <div
              key={item.id}
              className="
                relative grid h-auto gap-6
                overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5
                md:h-[450px]
                md:grid-cols-[1.8fr_1fr_1fr]
              "
            >
              {/* IMAGE */}
              <div className="relative h-[220px] w-full md:h-full">
                <Image
                  src={item.image}
                  alt="illustration"
                  fill
                  className="object-cover"
                />
              </div>

              {/* TEXTE */}
              <div className="relative flex flex-col justify-center overflow-hidden p-6">
                <div className="space-y-2 text-[16px] leading-relaxed text-black md:custom-scrollbar md:overflow-y-auto">
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

                <div className="pointer-events-none absolute bottom-0 left-0 hidden h-10 w-full bg-gradient-to-t from-white to-transparent md:block" />
              </div>

              {/* COLONNE DROITE */}
              <div
                className={`
                  relative flex flex-col bg-slate-50 p-6
                  md:custom-scrollbar md:overflow-y-auto
                  ${isExample ? "justify-center" : "items-center justify-center"}
                `}
              >
                {isExample ? (
                  <>
                    <button
                      onClick={() => handlePlay(item.id, item.audio)}
                      className={`
                        mb-5 flex w-fit items-center gap-2
                        rounded-xl px-5 py-3
                        text-sm font-semibold tracking-wide
                        shadow-md transition-all duration-200
                        ${
                          playingId === item.id
                            ? "scale-105 bg-green-500 text-white"
                            : "bg-black text-white hover:bg-green-600"
                        }
                      `}
                    >
                      ▶{" "}
                      {playingId === item.id ? "EN COURS..." : "EXEMPLE AUDIO"}
                    </button>

                    <div className="space-y-2 text-[16px]">
                      {speechItem?.sentences.map((sentence, index) => {
                        const isActive =
                          playingId === item.id &&
                          currentTime >= sentence.start &&
                          (!speechItem.sentences[index + 1] ||
                            currentTime <
                              speechItem.sentences[index + 1].start);

                        return (
                          <div key={index} className="flex items-start gap-2">
                            <span
                              className={`
                                mt-1 h-2.5 w-2.5 rounded-full transition
                                ${
                                  isActive
                                    ? "scale-125 animate-pulse bg-green-500"
                                    : "bg-slate-300"
                                }
                              `}
                            />

                            <p
                              className={`
                                rounded-md px-2 py-1 transition-all duration-200
                                ${
                                  isActive
                                    ? "bg-amber-200 font-semibold text-black shadow-sm"
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
                  <div className="flex w-full flex-col items-center gap-6">
                    <div className="text-center">
                      <p className="mb-1 text-xs text-slate-500">
                        Utilise le pronom :
                      </p>

                      <div   className="
                      rounded-xl border
                      border-amber-200
                      bg-amber-50
                      px-4 py-2
                      text-base
                      font-semibold text-amber-800
                      shadow-sm
                    ">
                        {pronoun}
                      </div>
                    </div>

                    <SpeechRecognitionEngine
                      expectedSentences={
                        speechItem?.sentences.map((s) => s.text) || []
                      }
                      requiredPronoun={pronoun?.toLowerCase()}
                      onResult={(res) => handleSpeechResult(item.id, res)}
                    />

                    {resultsByCard[item.id] && (
                      <div className="custom-scrollbar mt-4 max-h-[200px] w-full space-y-2 overflow-y-auto">
                        <p className="text-sm font-semibold text-green-600">
                          Correction :
                        </p>

                        {resultsByCard[item.id].map((res, index) => (
                          <p
                            key={index}
                            className={`
                              rounded-lg px-3 py-2 text-sm
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