
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import type { ExerciseSessionResult } from "@/components/courses/common/types/exerciseSessionTypes";

export type MemoryPair = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  text: string;
  audioSrc: string;
};

type MemoryCard = {
  cardId: string;
  pairId: string;
  type: "image" | "text";
  imageSrc?: string;
  imageAlt?: string;
  text?: string;
  audioSrc?: string;
};

type MemoryExerciseProps = {
  pairs: MemoryPair[];
  onComplete: (result: ExerciseSessionResult) => void;
};

function createCards(pairs: MemoryPair[]): MemoryCard[] {
  return pairs.flatMap((pair) => [
    {
      cardId: `${pair.id}-image`,
      pairId: pair.id,
      type: "image" as const,
      imageSrc: pair.imageSrc,
      imageAlt: pair.imageAlt,
    },
    {
      cardId: `${pair.id}-text`,
      pairId: pair.id,
      type: "text" as const,
      text: pair.text,
      audioSrc: pair.audioSrc,
    },
  ]);
}

function shuffleCards(cards: MemoryCard[]): MemoryCard[] {
  const shuffled = [...cards];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default function MemoryExercise({
  pairs,
  onComplete,
}: MemoryExerciseProps) {
  const [cards, setCards] = useState<MemoryCard[]>(() =>
    shuffleCards(createCards(pairs)),
  );

  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [removingPairs, setRemovingPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removalTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const startedAtRef = useRef(new Date());
  const movesRef = useRef(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioEndedRef = useRef(true);
  const audioGenerationRef = useRef(0);

  const completed = pairs.length > 0 && matchedPairs.length === pairs.length;

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  /**
   * Lance l'audio d'une carte texte sans dépendre du cycle
   * de nettoyage d'un useEffect.
   */
  const playCardAudio = useCallback((card: MemoryCard) => {
    if (card.type !== "text" || !card.audioSrc) {
      return;
    }

    // Invalider les événements d'une éventuelle lecture précédente.
    audioGenerationRef.current += 1;
    const generation = audioGenerationRef.current;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    audioEndedRef.current = false;

    const audio = new Audio(card.audioSrc);
    audioRef.current = audio;

    const markAudioEnded = () => {
      if (audioGenerationRef.current !== generation) return;

      audioEndedRef.current = true;
    };

    audio.addEventListener("ended", markAudioEnded, { once: true });

    audio.addEventListener(
      "error",
      () => {
        if (audioGenerationRef.current !== generation) return;

        audioEndedRef.current = true;
        console.error(`Impossible de lire l'audio : ${card.audioSrc}`);
      },
      { once: true },
    );

    audio.play().catch((error: unknown) => {
      if (audioGenerationRef.current !== generation) return;

      audioEndedRef.current = true;
      console.error("Impossible de lancer l'audio du Memory :", error);
    });
  }, []);

  useEffect(() => {
    if (!completed || completedRef.current) return;

    completedRef.current = true;

    const finishedAt = new Date();

    const history = pairs.map((pair, index) => ({
      questionId: index + 1,
      question: pair.text,
      selectedAnswer: pair.imageAlt,
      correctAnswer: pair.imageAlt,
      isCorrect: true,
    }));

    const result: ExerciseSessionResult = {
      score: 100,
      correctAnswers: pairs.length,
      totalQuestions: pairs.length,
      history,
      startedAt: startedAtRef.current,
      finishedAt,
      duration: Math.max(
        0,
        Math.round(
          (finishedAt.getTime() - startedAtRef.current.getTime()) / 1000,
        ),
      ),
    };

    onCompleteRef.current(result);
  }, [completed, pairs]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (removalTimeoutRef.current) {
        clearTimeout(removalTimeoutRef.current);
      }

      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
      }

      audioGenerationRef.current += 1;

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  const handleCardClick = useCallback(
    (card: MemoryCard) => {
      if (
        locked ||
        flippedCards.includes(card.cardId) ||
        matchedPairs.includes(card.pairId) ||
        matchedCards.includes(card.cardId) ||
        completed
      ) {
        return;
      }

      // Retourner la première carte.
      if (flippedCards.length === 0) {
        setFlippedCards([card.cardId]);
        playCardAudio(card);
        return;
      }

      const firstCard = cards.find(
        (item) => item.cardId === flippedCards[0],
      );

      if (!firstCard) return;

      // Retourner la seconde carte et lancer son audio si nécessaire.
      setFlippedCards([firstCard.cardId, card.cardId]);
      playCardAudio(card);

      movesRef.current += 1;
      setMoves(movesRef.current);
      setLocked(true);

      if (firstCard.pairId === card.pairId) {
        // Bonne association : garder les cartes visibles avant leur disparition.
        setMatchedCards([firstCard.cardId, card.cardId]);

        timeoutRef.current = setTimeout(() => {
          setRemovingPairs([card.pairId]);

          removalTimeoutRef.current = setTimeout(() => {
            setMatchedPairs((previous) =>
              previous.includes(card.pairId)
                ? previous
                : [...previous, card.pairId],
            );

            setMatchedCards([]);
            setRemovingPairs([]);
            setFlippedCards([]);
            setLocked(false);

            timeoutRef.current = null;
            removalTimeoutRef.current = null;
          }, 300);
        }, 800);

        return;
      }

      // Mauvaise association : attendre la fin de l'audio en cours.
      const currentAudio = audioRef.current;

      const flipBack = () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        if (fallbackTimeoutRef.current) {
          clearTimeout(fallbackTimeoutRef.current);
          fallbackTimeoutRef.current = null;
        }

        setFlippedCards([]);
        setLocked(false);
      };

      if (currentAudio && !audioEndedRef.current) {
        // Les cartes restent visibles jusqu'à la fin réelle de la lecture.
        currentAudio.addEventListener("ended", flipBack, { once: true });
        currentAudio.addEventListener("error", flipBack, { once: true });

        // Sécurité si le navigateur ne déclenche pas ended/error.
        fallbackTimeoutRef.current = setTimeout(() => {
          currentAudio.removeEventListener("ended", flipBack);
          currentAudio.removeEventListener("error", flipBack);
          flipBack();
        }, 15000);
      } else {
        timeoutRef.current = setTimeout(flipBack, 2500);
      }
    },
    [
      cards,
      completed,
      flippedCards,
      locked,
      matchedCards,
      matchedPairs,
      playCardAudio,
    ],
  );

  const restartGame = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (removalTimeoutRef.current) {
      clearTimeout(removalTimeoutRef.current);
      removalTimeoutRef.current = null;
    }

    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }

    audioGenerationRef.current += 1;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    audioEndedRef.current = true;
    startedAtRef.current = new Date();
    movesRef.current = 0;
    completedRef.current = false;

    setCards(shuffleCards(createCards(pairs)));
    setFlippedCards([]);
    setMatchedPairs([]);
    setMatchedCards([]);
    setRemovingPairs([]);
    setMoves(0);
    setLocked(false);
  }, [pairs]);

  if (pairs.length !== 8) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900"
      >
        Le Memory doit contenir exactement 8 paires image-texte pour afficher
        les 16 cartes. Nombre de paires reçues : {pairs.length}.
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#f0dfb8] bg-[#fffdf7] p-4 shadow-sm sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.18em] text-[#b88628]">
            Exercice 3
          </p>

          <h2 className="font-serif text-2xl font-bold text-black sm:text-3xl">
            Le Memory d&apos;Annie
          </h2>

          <p className="mt-2 max-w-xl text-sm text-black">
            Associe chaque image à la phrase qui la décrit. Retourne deux cartes
            à la fois pour retrouver les 8 paires.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="rounded-xl border border-[#f0dfb8] bg-white px-4 py-3 text-center">
            <p className="text-xs text-black">Paires</p>
            <p className="mt-1 font-bold text-black">
              {matchedPairs.length} / {pairs.length}
            </p>
          </div>

          <div className="rounded-xl border border-[#f0dfb8] bg-white px-4 py-3 text-center">
            <p className="text-xs text-black">Coups</p>
            <p className="mt-1 font-bold text-black">{moves}</p>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4"
        role="group"
        aria-label="Cartes restantes du jeu de Memory : images et phrases"
      >
        {cards
          .filter(
            (card) =>
              !matchedPairs.includes(card.pairId) ||
              matchedCards.includes(card.cardId),
          )
          .map((card) => {
            const isFlipped = flippedCards.includes(card.cardId);
            const isMatched = matchedCards.includes(card.cardId);
            const isRemoving = removingPairs.includes(card.pairId);

            const cardDescription =
              card.type === "image" ? card.imageAlt : card.text;

            return (
              <button
                key={card.cardId}
                type="button"
                onClick={() => handleCardClick(card)}
                disabled={locked || isFlipped || isMatched || completed}
                aria-label={
                  isFlipped
                    ? `${card.type === "image" ? "Image" : "Phrase"} : ${cardDescription}${
                        isMatched ? ", paire trouvée" : ""
                      }`
                    : "Carte cachée, retourner"
                }
                aria-pressed={isFlipped || isMatched}
                className={`group relative aspect-[3/4] min-w-0 rounded-xl outline-none transition-all duration-300 focus-visible:ring-4 focus-visible:ring-[#e4bd61]/60 sm:rounded-2xl ${
                  isMatched
                    ? "scale-[0.97] ring-4 ring-[#4b9b70] ring-offset-2"
                    : "hover:-translate-y-1 hover:shadow-lg"
                } ${
                  isRemoving
                    ? "scale-50 opacity-0"
                    : "scale-100 opacity-100"
                }`}
                style={{ perspective: "1000px" }}
              >
                <span
                  className="absolute inset-0 block rounded-xl transition-transform duration-500 sm:rounded-2xl"
                  style={{
                    transformStyle: "preserve-3d",
                    transform:
                      isFlipped || isMatched
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                  }}
                >
                  {/* DOS DE CARTE : SEULE CETTE FACE EST VERTE */}
                  <span
                    className="absolute inset-0 overflow-hidden rounded-xl border-[3px] border-[#c9b879] bg-[#315b46] p-1.5 shadow-[0_3px_0_#9a8953,0_6px_10px_rgba(20,35,30,0.16)] sm:rounded-2xl sm:p-2"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-[#c9b879] bg-gradient-to-br from-[#50775b] via-[#315b46] to-[#203f31]">
                      <span className="pointer-events-none absolute inset-[5px] rounded-md border border-[#d8c991]/80" />

                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-70"
                        style={{
                          backgroundImage: `
                            radial-gradient(circle, #e1d3a0 1.2px, transparent 1.8px),
                            radial-gradient(circle, #c9b879 1px, transparent 1.6px)
                          `,
                          backgroundSize: "31px 31px, 47px 47px",
                          backgroundPosition: "0 0, 13px 17px",
                        }}
                      />

                      {[
                        "left-[17%] top-[17%]",
                        "right-[17%] top-[23%]",
                        "bottom-[17%] left-[18%]",
                        "bottom-[17%] right-[18%]",
                      ].map((position) => (
                        <span
                          key={position}
                          aria-hidden="true"
                          className={`pointer-events-none absolute ${position} text-[#e1d3a0]`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-3 w-3 sm:h-5 sm:w-5"
                            fill="none"
                          >
                            <path
                              d="M12 1 14.5 9.5 23 12 14.5 14.5 12 23 9.5 14.5 1 12 9.5 9.5Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </span>
                      ))}

                      <span className="relative z-10 flex aspect-square w-[48%] max-w-[120px] items-center justify-center overflow-hidden rounded-full border-2 border-[#c9b879] bg-[#f5f0dc] p-1 shadow-[0_0_0_2px_rgba(201,184,121,0.16)]">
                        <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-[#d8c991] bg-[#faf7e9]">
                          <Image
                            src="/images/courses/elementary/activities/activity2/logo.png"
                            alt="Logo French Around the World"
                            width={240}
                            height={240}
                            className="h-[86%] w-[86%] object-contain"
                          />
                        </span>
                      </span>

                      <span className="pointer-events-none absolute left-[8%] top-[7%] text-[#e1d3a0]">
                        ✦
                      </span>
                      <span className="pointer-events-none absolute right-[8%] top-[7%] text-[#e1d3a0]">
                        ✦
                      </span>
                      <span className="pointer-events-none absolute bottom-[7%] left-[8%] text-[#e1d3a0]">
                        ✦
                      </span>
                      <span className="pointer-events-none absolute bottom-[7%] right-[8%] text-[#e1d3a0]">
                        ✦
                      </span>
                    </span>
                  </span>

                  {/* FACE DE CARTE */}
                  <span
                    className={`absolute inset-0 overflow-hidden rounded-xl border-[3px] shadow-[0_3px_0_rgba(80,110,80,0.16),0_5px_10px_rgba(30,40,35,0.10)] sm:rounded-2xl ${
                      isMatched
                        ? "border-[#4b9b70]"
                        : "border-[#c8d8c7]"
                    } ${
                      card.type === "image"
                        ? "bg-[#fffefa] p-1.5 sm:p-2"
                        : "flex items-center justify-center bg-[#f4f7ef] p-2 sm:p-3"
                    }`}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <span className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-[#d5e1cf]">
                      {card.type === "image" && card.imageSrc ? (
                        <span className="relative m-1 min-h-0 flex-1 overflow-hidden rounded-md bg-[#edf2e9] sm:m-1.5">
                          <Image
                            src={card.imageSrc}
                            alt={card.imageAlt ?? ""}
                            fill
                            sizes="(max-width: 640px) 25vw, 180px"
                            className="object-cover"
                          />
                        </span>
                      ) : (
                        <span className="relative flex h-full flex-col items-center justify-center bg-[#f4f7ef] px-2 py-3 text-center sm:px-3">
                          <span className="mb-2 text-[#73956f]">✦</span>

                          <span className="my-auto flex items-center justify-center text-[9px] font-bold leading-snug text-black sm:text-xs md:text-sm">
                            {card.text}
                          </span>

                          <span className="mt-2 text-[#73956f]">✦</span>
                        </span>
                      )}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
      </div>

      {completed && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 rounded-2xl border border-[#b9ead2] bg-[#e8f8ef] p-5 text-center"
        >
          <p className="text-lg font-bold text-black">
            Bravo ! Toutes les paires sont trouvées !
          </p>

          <p className="mt-1 text-sm text-black">
            Tu as terminé en {moves} {moves > 1 ? "coups" : "coup"}.
          </p>

          <button
            type="button"
            onClick={restartGame}
            className="mt-4 rounded-xl bg-[#269b68] px-5 py-3 font-semibold text-white transition hover:bg-[#1e8055] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#269b68]"
          >
            Rejouer
          </button>
        </div>
      )}

      {!completed && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-black">
            {matchedPairs.length === 0
              ? "À toi de jouer : retrouve les 8 associations !"
              : `Encore ${
                  pairs.length - matchedPairs.length
                } paire(s) à trouver.`}
          </p>

          <button
            type="button"
            onClick={restartGame}
            className="rounded-xl border border-[#e5d5ae] bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#fff6df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c29a4b]"
          >
            Recommencer
          </button>
        </div>
      )}
    </section>
  );
}
