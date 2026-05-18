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
      {/* CONSIGNE + PRONOMS + ACTION */}
      <div
        className="
          rounded-2xl
          border border-amber-200
          bg-gradient-to-br from-amber-50 via-white to-amber-50
          p-5
          shadow-sm
        "
      >
        {/* HEADER */}
        <div className="mb-4 flex items-center gap-4">
          <div
            className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl
              bg-gradient-to-br from-amber-300 to-yellow-400
              shadow-[0_10px_20px_rgba(245,158,11,0.25)]
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3h6v4H9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 16h4"
              />
            </svg>
          </div>
  
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
              Consigne
            </p>
  
            <p className="text-sm text-slate-500">
              Suis les instructions avant de commencer
            </p>
          </div>
        </div>
  
        {/* TEXTE */}
        <p className="text-base leading-relaxed text-slate-800">
          Présente chaque personnage en conjuguant les verbes à la bonne forme.
        </p>
  
        {/* SÉPARATEUR */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
  
        {/* PRONOMS */}
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-amber-100">
              👤
            </div>
  
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Pronoms à utiliser
              </p>
  
              <p className="text-sm text-slate-600">
                Utilise le pronom indiqué pour construire ta phrase.
              </p>
            </div>
          </div>
  
          <div className="flex flex-wrap gap-3">
            {["JE", "TU", "IL", "ELLE", "NOUS", "VOUS", "ILS"].map((p) => (
              <span
                key={p}
                className="
                  rounded-2xl border
                  border-amber-200
                  bg-white
                  px-5 py-3
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
  
        {/* SÉPARATEUR */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
  
     
      </div>
  
      {/* EXEMPLE */}
      <div
        className="
          rounded-2xl
          border border-blue-200
          bg-gradient-to-br from-blue-50 via-white to-blue-50
          p-5
          shadow-sm
        "
      >
        <div className="mb-4 flex items-center gap-4">
          <div
            className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl
              bg-gradient-to-br from-blue-400 to-cyan-500
              shadow-[0_10px_20px_rgba(59,130,246,0.25)]
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 22a10 10 0 100-20 10 10 0 000 20z"
              />
            </svg>
          </div>
  
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Exemple
            </p>
  
            <p className="text-sm text-slate-500">
              Observe le modèle avant de répondre
            </p>
          </div>
        </div>
  
        <div className="space-y-2 text-base leading-relaxed text-slate-800">
          <p>
            <strong>Ils sont mariés.</strong>
          </p>
          <p>
            <strong>Ils font une croisière.</strong>
          </p>
        </div>
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