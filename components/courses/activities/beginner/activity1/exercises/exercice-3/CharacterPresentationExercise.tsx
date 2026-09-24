"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { characterPresentationData } from "../../data/characterPresentationData";
import SpeechRecognitionEngine from "@/components/courses/engines/SpeechRecognitionEngine";
import { characterPresentationSpeechData } from "../../data/characterPresentationSpeechData";

export default function CharacterPresentationExercise() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playingId, setPlayingId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const [resultsByCard, setResultsByCard] = useState<
    Record<number, { text: string; correct: boolean }[]>
  >({});

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const pronounsMap: Record<number, string> = {
    2: "ILS",
    3: "ELLE",
    4: "NOUS",
    5: "VOUS",
    6: "TU",
  };

  const currentCard =
    characterPresentationData[currentCardIndex];

  const isLastCard =
    currentCardIndex ===
    characterPresentationData.length - 1;

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

  const handleNextCard = () => {
    if (isLastCard) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setPlayingId(null);
    setCurrentTime(0);

    setCurrentCardIndex(
      (previous) => previous + 1,
    );

    requestAnimationFrame(() => {
      window.scrollTo({
        top:
          window.scrollY -
          20,
        behavior: "smooth",
      });
    });
  };

  if (!currentCard) {
    return null;
  }

  const speechItem =
    characterPresentationSpeechData.find(
      (s) => s.id === currentCard.id,
    );

  const isExample = currentCard.id === 1;

  const pronoun = currentCard.buttonLabel;

  return (
    <section className="mt-12">
      <div className="mx-auto mt-10 max-w-5xl px-4">
        {/* PROGRESSION */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-500">
            Personnage{" "}
            {currentCardIndex + 1} /{" "}
            {characterPresentationData.length}
          </p>

          <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-300"
              style={{
                width: `${
                  ((currentCardIndex + 1) /
                    characterPresentationData.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* CARD */}
        <div
          className="
            relative grid h-auto gap-6
            overflow-hidden rounded-2xl bg-white shadow-lg
            ring-1 ring-black/5
            md:h-[450px]
            md:grid-cols-[1.8fr_1fr_1fr]
          "
        >
          {/* IMAGE */}
          <div className="relative h-[220px] w-full md:h-full">
            <Image
              src={currentCard.image}
              alt="illustration"
              fill
              className="object-cover"
            />
          </div>

          {/* TEXTE */}
          <div className="relative flex flex-col justify-center overflow-hidden p-6">
            <div className="md:custom-scrollbar space-y-2 text-[16px] leading-relaxed text-black md:overflow-y-auto">
              {currentCard.sentences.map(
                (sentence, index) => {
                  const words = sentence.split(" ");
                  const firstWord = words[0];
                  const rest = words
                    .slice(1)
                    .join(" ");

                  return (
                    <p key={index}>
                      <strong>{firstWord}</strong>{" "}
                      {rest}
                    </p>
                  );
                },
              )}
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 hidden h-10 w-full bg-gradient-to-t from-white to-transparent md:block" />
          </div>

          {/* COLONNE DROITE */}
          <div
            className={`
              md:custom-scrollbar relative flex flex-col bg-slate-50
              p-6 md:overflow-y-auto
              ${
                isExample
                  ? "justify-center"
                  : "items-center justify-center"
              }
            `}
          >
            {isExample ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    handlePlay(
                      currentCard.id,
                      currentCard.audio,
                    )
                  }
                  className={`
                    mb-5 flex w-fit items-center gap-2
                    rounded-xl px-5 py-3
                    text-sm font-semibold tracking-wide
                    shadow-md transition-all duration-200
                    ${
                      playingId === currentCard.id
                        ? "scale-105 bg-green-500 text-white"
                        : "bg-black text-white hover:bg-green-600"
                    }
                  `}
                >
                  ▶{" "}
                  {playingId === currentCard.id
                    ? "EN COURS..."
                    : "EXEMPLE AUDIO"}
                </button>

                <div className="space-y-2 text-[16px]">
                  {speechItem?.sentences.map(
                    (sentence, index) => {
                      const isActive =
                        playingId === currentCard.id &&
                        currentTime >=
                          sentence.start &&
                        (!speechItem.sentences[
                          index + 1
                        ] ||
                          currentTime <
                            speechItem.sentences[
                              index + 1
                            ].start);

                      return (
                        <div
                          key={index}
                          className="flex items-start gap-2"
                        >
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
                              rounded-md px-2 py-1
                              transition-all duration-200
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
                    },
                  )}
                </div>
              </>
            ) : (
              <div className="flex w-full flex-col items-center gap-6">
                <div className="text-center">
                  <p className="mb-1 text-xs text-slate-500">
                    Utilise le pronom :
                  </p>

                  <div
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
                    {pronoun}
                  </div>
                </div>

                <SpeechRecognitionEngine
                  expectedSentences={
                    speechItem?.sentences.map(
                      (s) => s.text,
                    ) || []
                  }
                  requiredPronoun={pronoun?.toLowerCase()}
                  onResult={(res) =>
                    handleSpeechResult(
                      currentCard.id,
                      res,
                    )
                  }
                />

                {resultsByCard[currentCard.id] && (
                  <div className="custom-scrollbar mt-4 max-h-[200px] w-full space-y-2 overflow-y-auto">
                    <p className="text-sm font-semibold text-green-600">
                      Correction :
                    </p>

                    {resultsByCard[
                      currentCard.id
                    ].map((res, index) => (
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

        {/* NAVIGATION */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleNextCard}
            disabled={isLastCard}
            className="
              rounded-xl
              bg-[#E09F00]
              px-6 py-3
              text-sm font-bold text-white
              shadow-sm
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-[#C98D00]
              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:hover:translate-y-0
            "
          >
            {isLastCard
              ? "Dernier personnage"
              : "Personnage suivant →"}
          </button>
        </div>
      </div>
    </section>
  );
}