"use client";

import React, { useState, useEffect } from "react";
import { memoryData, MemoryCard } from "./memoryData";
import Image from "next/image";

/* ========= FUNCTION FOR SHUFFLE ========= */
const shuffle = (array: MemoryCard[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [canPlay, setCanPlay] = useState(true);

  // NEW : état pour afficher la modale
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCards(shuffle(memoryData));
  }, []);

  const handleFlip = (id: string) => {
    if (!canPlay) return;
    if (flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setCanPlay(false);
      const [first, second] = newFlipped;

      const card1 = cards.find((c) => c.id === first)!;
      const card2 = cards.find((c) => c.id === second)!;

      if (card1.pairId === card2.pairId) {
        setTimeout(() => {
          const newMatched = [...matched, first, second];
          setMatched(newMatched);
          setFlipped([]);
          setCanPlay(true);

          // NEW : si toutes les cartes sont trouvées → modale !
          if (newMatched.length === cards.length) {
            setTimeout(() => setShowModal(true), 600);
          }
        }, 600);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setCanPlay(true);
        }, 900);
      }
    }
  };

  const restartGame = () => {
    setMatched([]);
    setFlipped([]);
    setShowModal(false);
    setCards(shuffle(memoryData));
  };

  return (
    <section className="mt-12 pb-20 relative">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-2xl font-bold text-black mb-6">
          🧠 Jeu du Memory — Associe le mot et l’image
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 justify-items-center mt-8">
          {cards.map((card) => {
            const isFlipped = flipped.includes(card.id) || matched.includes(card.id);

            return (
              <div
                key={card.id}
                onClick={() => handleFlip(card.id)}
                className={`
                  relative h-40 w-40 sm:h-44 sm:w-44 md:h-48 md:w-48 cursor-pointer
                  transition-transform duration-500
                  [transform-style:preserve-3d]
                  ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
                  ${matched.includes(card.id) ? "opacity-0" : ""}
                `}
              >
                {/* BACK */}
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-amber-300 shadow-lg [backface-visibility:hidden]">
                  <span className="text-4xl text-black/40">?</span>
                </div>

                {/* FRONT */}
                <div className="absolute inset-0 rounded-xl bg-white shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
                  {card.type === "word" ? (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-center font-bold text-black text-xl">
                        {card.value}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={card.value}
                      alt={card.pairId}
                      width={500}
                      height={500}
                      className="h-full w-full object-cover rounded-xl"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================== MODALE FIN DE JEU ===================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={restartGame}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl animate-fadeIn">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-500 mb-3">
              Bravo !
            </p>
            <p className="text-4xl font-extrabold text-black mb-4">
              🎉 Jeu terminé !
            </p>

            <p className="text-black/70 mb-6">
              Tu as associé toutes les paires avec succès.
            </p>

            <button
              onClick={restartGame}
              className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-black hover:bg-amber-400"
            >
              Rejouer
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MemoryGame;
