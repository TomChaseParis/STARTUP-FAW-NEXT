"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

/* ========= Types ========= */
type Choice = {
  id: string;
  label: string;
  isCorrect: boolean;
  explanation: string;
};

type Question = {
  id: number;
  question: string;
  choices: Choice[];
  image: string;
  correctAudio: string;
  wrongAudio: string;
};

/* ========= Questions ========= */
const questions: Question[] = [
  {
    id: 1,
    question: "Il y a combien de joueurs dans une équipe de Rugby ?",
    image: "/images/courses/elementary/questions-reponses/q1-rugby.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_1.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_1.mp3",
    choices: [
      { id: "A", label: "12", isCorrect: false, explanation: "Ce n’est pas 12 joueurs." },
      { id: "B", label: "11", isCorrect: false, explanation: "Ce n’est pas 11 joueurs." },
      { id: "C", label: "15", isCorrect: true, explanation: "Bonne réponse : Une équipe de rugby compte 15 joueurs." },
      { id: "D", label: "8", isCorrect: false, explanation: "Ce n’est pas 8 joueurs." }
    ],
  },

  {
    id: 2,
    question: "En France, quel jour commence l'été ?",
    image: "/images/courses/elementary/questions-reponses/q2-summer.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_2.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_2.mp3",
    choices: [
      { id: "A", label: "Le 12 avril", isCorrect: false, explanation: "Ce n’est pas en avril." },
      { id: "B", label: "Le 21 juin", isCorrect: true, explanation: "Bonne réponse : L'été commence le 21 juin." },
      { id: "C", label: "Le 1er juillet", isCorrect: false, explanation: "Ce n’est pas en juillet." },
      { id: "D", label: "Le 11 juin", isCorrect: false, explanation: "Ce n’est pas le 11 juin." }
    ],
  },

  {
    id: 3,
    question: "Avec quels ingrédients fait-on une Paella ?",
    image: "/images/courses/elementary/questions-reponses/q3-food.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_3.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_3.mp3",
    choices: [
      { id: "A", label: "Fromage et pommes de terre", isCorrect: false, explanation: "La paella ne se prépare pas comme ça." },
      { id: "B", label: "Riz, chorizo, poulet et/ou fruits de mer", isCorrect: true, explanation: "Bonne réponse : Les ingrédients traditionnels incluent du riz, du chorizo, du poulet et/ou des fruits de mer." },
      { id: "C", label: "Pâtes et sauce tomate", isCorrect: false, explanation: "Ce n’est pas une paella." },
      { id: "D", label: "Pain et beurre", isCorrect: false, explanation: "Ce n’est absolument pas une paella." }
    ],
  },

  {
    id: 4,
    question: "Comment font les gens pour avoir des bébés ?",
    image: "/images/courses/elementary/questions-reponses/q4-baby.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_4.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_4.mp3",
    choices: [
      { id: "A", label: "Ils font du ski", isCorrect: false, explanation: "Non, ce n’est pas lié." },
      { id: "B", label: "Ils font la vaisselle", isCorrect: false, explanation: "Toujours pas." },
      { id: "C", label: "Ils font la cuisine", isCorrect: false, explanation: "Non plus." },
      { id: "D", label: "Ils font l'amour", isCorrect: true, explanation: "Bonne réponse : Ils font l'amour." }
    ],
  },

  {
    id: 5,
    question: "Comment est-ce qu'ils vont au travail ?",
    image: "/images/courses/elementary/questions-reponses/q5-work.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_5.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_5.mp3",
    choices: [
      { id: "A", label: "En taxi", isCorrect: false, explanation: "Ce n’est pas en taxi." },
      { id: "B", label: "En métro", isCorrect: true, explanation: "Bonne réponse : Ils prennent le métro." },
      { id: "C", label: "En avion", isCorrect: false, explanation: "Ils ne prennent pas l’avion pour aller au travail." },
      { id: "D", label: "À pied", isCorrect: false, explanation: "Ils ne marchent pas jusqu'au travail." }
    ],
  },

  {
    id: 6,
    question: "Quelle est la capitale de la France ?",
    image: "/images/courses/elementary/questions-reponses/q6-city.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_6.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_6.mp3",
    choices: [
      { id: "A", label: "Paris", isCorrect: true, explanation: "Bonne réponse : Paris est la capitale de la France." },
      { id: "B", label: "Lyon", isCorrect: false, explanation: "Lyon n'est pas la capitale." },
      { id: "C", label: "Marseille", isCorrect: false, explanation: "" },
      { id: "D", label: "Toulouse", isCorrect: false, explanation: "" }
    ],
  },

  {
    id: 7,
    question: "Qu'est-ce qu'ils font ?",
    image: "/images/courses/elementary/questions-reponses/q7-sport.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_7.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_7.mp3",
    choices: [
      { id: "A", label: "Du basket", isCorrect: false, explanation: "Ce n’est pas du basket." },
      { id: "B", label: "De la natation", isCorrect: false, explanation: "Ils ne nagent pas." },
      { id: "C", label: "Du judo", isCorrect: true, explanation: "Bonne réponse : Ils pratiquent le judo." },
      { id: "D", label: "Du trampoline", isCorrect: false, explanation: "Ils ne font pas de trampoline." }
    ],
  },

  {
    id: 8,
    question: "De quelle couleur est le ciel quand il fait beau ?",
    image: "/images/courses/elementary/questions-reponses/q8-weather.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_8.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_8.mp3",
    choices: [
      { id: "A", label: "Rouge", isCorrect: false, explanation: "Ce n’est pas rouge." },
      { id: "B", label: "Vert", isCorrect: false, explanation: "Ce n’est pas vert." },
      { id: "C", label: "Bleu", isCorrect: true, explanation: "Bonne réponse : Le ciel est bleu quand il fait beau." },
      { id: "D", label: "Jaune", isCorrect: false, explanation: "Ce n’est pas jaune." }
    ],
  },

  {
    id: 9,
    question: "Qui a été le dernier président de l’URSS ?",
    image: "/images/courses/elementary/questions-reponses/q9-president.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_9.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_9.mp3",
    choices: [
      { id: "A", label: "Céline Dion", isCorrect: false, explanation: "C’est une chanteuse, pas une présidente." },
      { id: "B", label: "Gorbatchev", isCorrect: true, explanation: "Bonne réponse : Mikhaïl Gorbatchev a été le dernier dirigeant de l’URSS." },
      { id: "C", label: "Staline", isCorrect: false, explanation: "Staline est mort bien avant la fin de l’URSS." },
      { id: "D", label: "Brejnev", isCorrect: false, explanation: "Brejnev n’a pas été le dernier dirigeant." }
    ],
  },

  {
    id: 10,
    question: "Quel instrument est-ce qu’il joue ?",
    image: "/images/courses/elementary/questions-reponses/q10-music.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_10.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_10.mp3",
    choices: [
      { id: "A", label: "De la flûte", isCorrect: false, explanation: "Ce n’est pas une flûte." },
      { id: "B", label: "De la harpe", isCorrect: false, explanation: "Il ne joue pas de la harpe." },
      { id: "C", label: "Du piano", isCorrect: false, explanation: "Ce n’est pas un piano." },
      { id: "D", label: "De la guitare", isCorrect: true, explanation: "Bonne réponse : Il joue de la guitare." }
    ],
  },

  {
    id: 11,
    question: "Pourquoi est-ce que les oiseaux chantent ?",
    image: "/images/courses/elementary/questions-reponses/q11-birds.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_11.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_11.mp3",
    choices: [
      { id: "A", label: "Pour qu’on leur donne de l’argent", isCorrect: false, explanation: "Ce n’est pas pour de l’argent." },
      { id: "B", label: "Pour tuer le temps", isCorrect: false, explanation: "Ce n’est pas pour s’occuper." },
      { id: "C", label: "Pour communiquer", isCorrect: true, explanation: "Bonne réponse : Les oiseaux chantent pour communiquer." },
      { id: "D", label: "Pour s'amuser", isCorrect: false, explanation: "Ce n’est pas pour s’amuser." }
    ],
  },

  {
    id: 12,
    question: "Quel moment historique illustre cette photo ?",
    image: "/images/courses/elementary/questions-reponses/q12-monument.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_12.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_12.mp3",
    choices: [
      { id: "A", label: "Le couronnement de la reine Elisabeth II (1953)", isCorrect: false, explanation: "Ce n’est pas cette date." },
      { id: "B", label: "L’inauguration du Louvre (1793)", isCorrect: false, explanation: "Ce n’est pas cette scène." },
      { id: "C", label: "La destruction de la Tour Eiffel (2056)", isCorrect: false, explanation: "La Tour Eiffel n’a jamais été détruite." },
      { id: "D", label: "La construction du mur de Berlin (1961)", isCorrect: true, explanation: "Bonne réponse : Il s’agit bien de la construction du mur de Berlin en 1961." }
    ],
  },

  {
    id: 13,
    question: "Quand est-ce qu’il est né ?",
    image: "/images/courses/elementary/questions-reponses/q13-born.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_13.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_13.mp3",
    choices: [
      { id: "A", label: "Hier soir", isCorrect: false, explanation: "Ce n’est pas hier soir." },
      { id: "B", label: "Demain matin", isCorrect: false, explanation: "On ne peut pas naître demain." },
      { id: "C", label: "Il y a très longtemps", isCorrect: true, explanation: "Bonne réponse : Il est né il y a longtemps." },
      { id: "D", label: "En 2025", isCorrect: false, explanation: "Ce n’est pas 2025." }
    ],
  },

  {
    id: 14,
    question: "Où est-ce qu’ils habitent ?",
    image: "/images/courses/elementary/questions-reponses/q14-where.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/youhoutest.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_14.mp3",
    choices: [
      { id: "A", label: "Dans une grande ville", isCorrect: false, explanation: "Ce n’est pas en ville." },
      { id: "B", label: "Dans la jungle", isCorrect: true, explanation: "Bonne réponse : Ils vivent dans la jungle." },
      { id: "C", label: "Dans un petit village", isCorrect: false, explanation: "Ce n’est pas un village." },
      { id: "D", label: "Sur un bateau", isCorrect: false, explanation: "Ils n’habitent pas sur un bateau." }
    ],
  },

  {
    id: 15,
    question: "Mais... Qu’est-ce que c’est que ce machin ?",
    image: "/images/courses/elementary/questions-reponses/q15-whatisit.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_15.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_15.mp3",
    choices: [
      { id: "A", label: "Un objet venu de l’espace", isCorrect: false, explanation: "Ce n’est pas un objet extraterrestre." },
      { id: "B", label: "Une mauvaise blague", isCorrect: false, explanation: "Ce n’est pas une blague." },
      { id: "C", label: "Des toilettes portatives", isCorrect: false, explanation: "Ce ne sont pas des toilettes portatives." },
      { id: "D", label: "Une œuvre d’art", isCorrect: true, explanation: "Bonne réponse : C’est une œuvre d’art." }
    ],
  },
];

/* =======================================================================================
   EXERCICE 2 — QUIZ À CHOIX MULTIPLES
======================================================================================= */

const Exercice2: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (src: string) => {
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.src = src;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSelect = (id: string) => {
    if (showAnswer) return;

    setSelectedChoice(id);
    setShowAnswer(true);

    const choice = currentQuestion.choices.find((c) => c.id === id);

    if (choice?.isCorrect) {
      playAudio(currentQuestion.correctAudio);
      setScore((prev) => prev + 1);
    } else {
      playAudio(currentQuestion.wrongAudio);
    }

    if (currentIndex === totalQuestions - 1) {
      setTimeout(() => setShowModal(true), 900);
    }
  };

  const nextQuestion = () => {
    setSelectedChoice(null);
    setShowAnswer(false);
    setCurrentIndex((i) => i + 1);
  };

  /* ========= AFFICHAGE FINAL AVEC RÉSULTATS ========= */
  if (showResults) {
    return (
      <section className="mt-16 bg-white pb-20">
        <div className="container mx-auto max-w-3xl">
          <div className="rounded-2xl bg-amber-50 p-10 shadow-lg ring-1 ring-amber-200">

            <h2 className="mb-4 text-3xl font-extrabold text-black">
              🎉 Résultats de ton exercice
            </h2>

            <p className="text-xl text-black/80 mb-6">
              Tu as obtenu <strong>{score}</strong> bonnes réponses sur {totalQuestions}.
            </p>

            <p className="mb-10 text-lg leading-relaxed text-black/70">
              {score === totalQuestions
                ? "Excellent travail ! Tu maîtrises parfaitement ce chapitre."
                : score >= totalQuestions * 0.7
                ? "Très bon score ! Il ne te manque que quelques détails à consolider."
                : score >= totalQuestions * 0.5
                ? "C’est un bon début ! Avec un peu plus de pratique, tu vas y arriver."
                : "Courage ! Reprends l'exercice et n'hésite pas à regarder les explications pour progresser."}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-black px-6 py-3 text-white hover:bg-black/90"
            >
              Recommencer l'exercice
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* ========= QCM NORMAL ========= */
  return (
    <section className="mt-16 bg-white pb-20">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-amber-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="mx-auto mb-10 max-w-5xl rounded-xl bg-amber-50 p-8 shadow-sm ring-1 ring-amber-200">
          <h3 className="mb-6 text-xl font-semibold text-black">
            🗣 Question {currentIndex + 1} / {totalQuestions}
          </h3>

          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-1">
              <p className="mb-6 text-lg text-black">{currentQuestion.question}</p>

              <div className="space-y-3">
                {currentQuestion.choices.map((choice) => {
                  const isSelected = selectedChoice === choice.id;

                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleSelect(choice.id)}
                      className={`
                        w-full rounded-lg border px-4 py-3 text-left text-black transition
                        ${
                          !showAnswer
                            ? "border-black/20 hover:bg-white"
                            : choice.isCorrect
                              ? "border-green-500 bg-green-100 text-green-800"
                              : isSelected
                                ? "border-red-500 bg-red-100 text-red-800"
                                : "border-black/10"
                        }
                      `}
                    >
                      <strong>{choice.id}. </strong>
                      {choice.label}
                    </button>
                  );
                })}
              </div>

              {showAnswer &&
                (() => {
                  const selected = currentQuestion.choices.find(
                    (c) => c.id === selectedChoice,
                  );
                  const correct = currentQuestion.choices.find((c) => c.isCorrect);

                  return (
                    <div className="mt-6 rounded-lg bg-white p-4 ring-1 ring-black/5">
                      {selected?.isCorrect ? (
                        <p className="mb-2 text-lg font-bold text-green-600">
                          ✔ Bonne réponse !
                        </p>
                      ) : (
                        <p className="mb-2 text-lg font-bold text-red-600">
                          ✘ Mauvaise réponse
                        </p>
                      )}

                      <p className="text-black/80">
                        {correct?.explanation
                          .replace("Bonne réponse :", "")
                          .trim()}
                      </p>
                    </div>
                  );
                })()}
            </div>

            <div className="relative w-full lg:w-1/3">
              <div className="relative overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/10 lg:top-10">
                <Image
                  src={currentQuestion.image}
                  alt="Illustration"
                  width={600}
                  height={400}
                  className="h-64 w-full object-cover"
                />
              </div>
            </div>
          </div>

          {showAnswer && currentIndex < totalQuestions - 1 && (
            <div className="mt-8 text-right">
              <button
                onClick={nextQuestion}
                className="rounded-lg bg-black px-6 py-2.5 text-white hover:bg-black/90"
              >
                Question suivante →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODALE SCORE */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-500">
              Résultat final
            </p>
            <p className="text-5xl font-extrabold text-black">
              {Math.round((score / totalQuestions) * 100)}
              <span className="text-2xl text-black/60"> / 100</span>
            </p>

            <p className="mt-3 text-black/70">Score : {score} / {totalQuestions}</p>

            <button
              onClick={() => {
                setShowModal(false);
                setShowResults(true);
              }}
              className="mt-6 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-black hover:bg-amber-400"
            >
              Voir mes résultats
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Exercice2;
