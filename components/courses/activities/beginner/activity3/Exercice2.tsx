"use client";

import React, { useState } from "react";

/* --- Fonction pour enlever les accents (tolérance clavier) --- */
const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const Exercice2: React.FC = () => {
  const [showCorrection, setShowCorrection] = useState(false);

  // -------- TEXTE À TROUS (DIALOGUE) --------
  const gaps = [
    {
      id: 1,
      before:
        "L’agence matrimoniale : Bonjour monsieur, vous vous appelez comment s’il vous plaît ?\nFabien : Je m’appelle Monsieur Delpêche.\nL’agence matrimoniale : Vous pouvez l’épeler s’il vous plaît ?\nFabien : Bien sûr. D-E-L-P-E accent circonflexe – C-H-E.\nL’agence matrimoniale : Merci. Et quel ",
      after: " votre prénom, s’il vous plaît ?",
      answer: "est",
    },
    {
      id: 2,
      before: "Fabien : Fabien.\nL’agence matrimoniale : Merci. Vous ",
      after: " français ?",
      answer: "êtes",
    },
    {
      id: 3,
      before: "Fabien : Euh non.\nL’agence matrimoniale : Vous ",
      after: " d’où ?",
      answer: "êtes",
    },
    {
      id: 4,
      before:
        "Fabien : Je suis canadien.\nL’agence matrimoniale : Vous parlez très bien français.\nFabien : Merci.\nL’agence matrimoniale : Alors, quelle ",
      after: " votre date de naissance, Monsieur Delpêche ?",
      answer: "est",
    },
    {
      id: 5,
      before:
        "Fabien : Je suis né le 24 mars 1965.\nL’agence matrimoniale : Donc, voyons, vous ",
      after: " quel âge ?",
      answer: "avez",
    },
    {
      id: 6,
      before:
        "Fabien : J’ai 47 ans.\nL’agence matrimoniale : Vous ne les faites pas.\nFabien : Merci.\nL’agence matrimoniale : Quel ",
      after:
        " votre état civil ? Vous êtes célibataire ? Marié ? Divorcé ? Veuf ?",
      answer: "est",
    },
    {
      id: 7,
      before: "Fabien : Je ",
      after: " divorcé.",
      answer: "suis",
    },
    {
      id: 8,
      before: "L’agence matrimoniale : Très bien. Vous ",
      after: " des enfants ?",
      answer: "avez",
    },
    {
      id: 9,
      before: "Fabien : Oui. J’",
      after: " deux enfants, une fille de douze ans et un garçon de neuf ans.",
      answer: "ai",
    },
    {
      id: 10,
      before:
        "L’agence matrimoniale : Vous faites quoi dans la vie, monsieur Delpêche ?\nFabien : Je ",
      after: " ingénieur.",
      answer: "suis",
    },
    {
      id: 11,
      before: "L’agence matrimoniale : Très bien. Quelle ",
      after: " votre adresse, s’il vous plaît ?",
      answer: "est",
    },
    {
      id: 12,
      before:
        "Fabien : J’habite à Paris, au 45 rue Vaugirard. Deuxième étage, porte B.\nL’agence matrimoniale : Le code postal, s’il vous plaît ?\nFabien : 75006.\nL’agence matrimoniale : Merci. Quel ",
      after: " votre numéro de téléphone ?",
      answer: "est",
    },
    {
      id: 13,
      before:
        "Fabien : Mon portable ou mon fixe ?\nL’agence matrimoniale : Les deux.\nFabien : Alors le portable, c’est 06 23 92 62 34. Et le fixe : 01 20 00 76 88.\nL’agence matrimoniale : Vous ",
      after: " une adresse email ?",
      answer: "avez",
    },
    {
      id: 14,
      before: "Fabien : Oui, c’",
      after: " delpêche23@yahoo.fr.",
      answer: "est",
    },
    {
      id: 15,
      before:
        "L’agence matrimoniale : Qu’est-ce que vous aimez faire pendant votre temps libre ? Vous ",
      after: " des hobbies ?",
      answer: "avez",
    },
    {
      id: 16,
      before:
        "Fabien : J’aime la musique et le sport.\nL’agence matrimoniale : Très bien. Alors voyons, vous cherchez une femme d’environ 30 ans, mince, plutôt blonde, sympathique et sportive.",
      after: "",
      answer: "",
    },
  ];

  const [answers, setAnswers] = useState<string[]>(Array(gaps.length).fill(""));

  /* --- Compteurs / Score --- */
  const totalQuestions = gaps.filter((g) => g.answer !== "").length;
  const answeredCount = answers.filter((a, i) =>
    gaps[i].answer === "" ? false : a.trim() !== "",
  ).length;

  const allAnswered = answeredCount === totalQuestions;

  const [score, setScore] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (i: number, value: string) => {
    const next = [...answers];
    next[i] = value;
    setAnswers(next);
  };

  const checkAnswers = () => {
    let correctCount = 0;

    gaps.forEach((gap, i) => {
      if (!gap.answer) return;
      const userAnswer = removeAccents(answers[i].trim().toLowerCase());
      const correctAnswer = removeAccents(gap.answer.trim().toLowerCase());
      if (userAnswer === correctAnswer) correctCount++;
    });

    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    setScore(finalScore);
    setShowCorrection(true);
    setShowModal(true);
  };

  return (
    <section className="mt-12 bg-white pb-20">
      <div className=" mx-auto max-w-5xl text-center">
        {/* -------- BARRE DE PROGRESSION -------- */}
        <div className="mb-6 h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-amber-500 transition-all duration-500"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          ></div>
        </div>

        {/* -------- TEXTE À TROUS -------- */}
        <div className="rounded-xl bg-white p-8 text-left shadow-lg ring-1 ring-black/5 transition-all duration-300">
          <h3 className="mb-6 text-lg font-semibold text-black">
            Complète le dialogue :
          </h3>

          <div className="space-y-4 whitespace-pre-line text-[17px] leading-relaxed text-slate-800">
            {gaps.map((gap, i) => {
              const rawUserAnswer = answers[i].trim().toLowerCase();
              const rawCorrect = gap.answer.trim().toLowerCase();

              const isCorrect =
                removeAccents(rawUserAnswer) === removeAccents(rawCorrect);

              return (
                <p
                  key={gap.id}
                  className={`
                    transition-all duration-300
                    ${answers[i] ? "rounded-md border-l-4 border-amber-400 bg-amber-50/60 pl-3" : ""}
                  `}
                >
                  {gap.before}

                  {gap.answer !== "" && (
                    <input
                      type="text"
                      value={answers[i]}
                      onChange={(e) => handleChange(i, e.target.value)}
                      placeholder="..."
                      disabled={showCorrection}
                      className={`
                        mx-2 h-10 min-w-[140px] rounded-md
                        border-2 border-slate-300
                        bg-slate-50 px-3 text-[16px]
                        placeholder-slate-400 shadow-sm transition-all
                        duration-300
                        focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500
                        ${
                          showCorrection
                            ? isCorrect
                              ? "border-green-500 bg-green-100 font-semibold text-green-900"
                              : "border-red-500 bg-red-100 font-semibold text-red-900"
                            : ""
                        }
                      `}
                    />
                  )}

                  {gap.after}

                  {/* ------ Correction visuelle DEMANDÉE ------ */}
                  {showCorrection && gap.answer !== "" && (
                    <span className="ml-3 inline-flex items-center gap-2">
                      {isCorrect ? (
                        <span className="text-lg font-bold text-green-600">
                          ✔
                        </span>
                      ) : (
                        <>
                          <span className="font-semibold text-red-600">
                            ❌ {answers[i]}
                          </span>
                          <span className="font-semibold text-green-600">
                            ✔ {gap.answer}
                          </span>
                        </>
                      )}
                    </span>
                  )}
                </p>
              );
            })}
          </div>

          {/* -------- BOUTONS -------- */}
          <div className="mt-10 flex justify-center gap-4">
            {!showCorrection && (
              <button
                onClick={checkAnswers}
                disabled={!allAnswered}
                className={`
                  rounded-xl px-10 py-3 font-semibold text-white 
                  shadow-md transition-all duration-300
                  ${
                    allAnswered
                      ? "bg-black hover:bg-black/90 hover:shadow-xl active:scale-95"
                      : "cursor-not-allowed bg-black/30"
                  }
                `}
              >
                Vérifier mes réponses
              </button>
            )}

            <button
              onClick={() => {
                setAnswers(Array(gaps.length).fill(""));
                setShowCorrection(false);
                setShowModal(false);
                setScore(null);
              }}
              className="rounded-xl bg-slate-100 px-6 py-3 text-slate-700 shadow hover:bg-slate-200"
            >
              Effacer
            </button>
          </div>
        </div>
      </div>

      {/* -------- MODALE SCORE -------- */}
      {showModal && score !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-500">
              Résultat final
            </p>

            <p className="text-5xl font-extrabold text-black">
              {score}
              <span className="text-2xl text-black/60"> / 100</span>
            </p>

            <button
              onClick={() => setShowModal(false)}
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
