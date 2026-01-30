"use client";

import React, { useState } from "react";

/* --- Fonction pour enlever les accents (tolérance clavier) --- */
const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const Exercice2: React.FC = () => {
  const [showCorrection, setShowCorrection] = useState(false);

  // -------- TEXTE À TROUS --------
  const gaps = [
    {
      id: 1,
      before:
        "Les loisirs pr&eacute;f&eacute;r&eacute;s des Fran&ccedil;ais.\nBien s&ucirc;r, &ccedil;a d&eacute;pend des g&eacute;n&eacute;rations, mais en g&eacute;n&eacute;ral, quand ils sont chez eux, ils ",
      answer: "aiment",
      after:
        " bien &eacute;couter de la musique, regarder un film &agrave; la t&eacute;l&eacute;vision ou en DVD.",
      hint: "aimer",
    },
    {
      id: 2,
      before:
        "L&rsquo;ordinateur prend une place de plus en plus importante. Les Fran&ccedil;ais l&rsquo;",
      answer: "utilisent",
      after:
        " pour surfer sur Internet, mais aussi pour tenir leur blog, faire des montages vid&eacute;os, s&rsquo;occuper de leurs photos ou encore t&eacute;l&eacute;charger de la musique.",
      hint: "utiliser",
    },
    {
      id: 3,
      before: "Ils ",
      answer: "adorent",
      after: " jouer aux jeux vid&eacute;o.",
      hint: "adorer",
    },
    {
      id: 4,
      before: "En g&eacute;n&eacute;ral, ils ",
      answer: "jouent",
      after:
        " sur leur ordinateur ou sur leur console, mais il y a de plus en plus de gens qui ",
      hint: "jouer",
    },
    {
      id: 5,
      before: "",
      answer: "jouent",
      after: " sur leurs t&eacute;l&eacute;phones portables.",
      hint: "jouer",
    },
    {
      id: 6,
      before: "Il y a aussi ceux qui ",
      answer: "aiment",
      after: " bricoler, laver leur voiture ou s&rsquo;occuper de leur jardin.",
      hint: "aimer",
    },
    {
      id: 7,
      before: "Ils ",
      answer: "lisent",
      after:
        " aussi beaucoup de romans, des magazines et des bandes dessin&eacute;es.",
      hint: "lire",
    },
    {
      id: 8,
      before: "Quand ils ",
      answer: "sortent",
      after: ", les Fran&ccedil;ais ",
      hint: "sortir",
    },
    {
      id: 9,
      before: "",
      answer: "vont",
      after: " beaucoup au cin&eacute;ma.",
      hint: "aller",
    },
    {
      id: 10,
      before: "Les jeunes ",
      answer: "passent",
      after:
        " beaucoup de temps &agrave; boire des caf&eacute;s au bar, et les &eacute;tudiants ",
      hint: "passer",
    },
    {
      id: 11,
      before: "",
      answer: "aiment",
      after:
        " bien sortir boire une bi&egrave;re en ville ou aller en discoth&egrave;que.",
      hint: "aimer",
    },
    {
      id: 12,
      before: "Les Fran&ccedil;ais ",
      answer: "appr&eacute;cient",
      after:
        " aussi les visites de mus&eacute;es, le th&eacute;&acirc;tre et les concerts de rock, les concerts de jazz, les concerts de musique pop, etc.",
      hint: "apprécier",
    },
    {
      id: 13,
      before: "Quand ils ",
      answer: "font",
      after:
        " du sport, les gar&ccedil;ons font du football, du tennis, du rugby, du basket et des arts martiaux comme le judo ou le karat&eacute;.",
      hint: "faire",
    },
    {
      id: 14,
      before: "Les filles ",
      answer: "pr&eacute;f&egrave;rent",
      after:
        " le tennis, la danse, la natation, l&rsquo;&eacute;quitation ou la gymnastique.",
      hint: "pr&eacute;f&eacute;rer",
    },
    {
      id: 15,
      before: "Les plus &acirc;g&eacute;s ",
      answer: "pr&eacute;f&egrave;rent",
      after:
        " le v&eacute;lo, la marche, la natation ou, bien s&ucirc;r, une bonne partie de p&eacute;tanque.",
      hint: "pr&eacute;f&eacute;rer",
    },
    {
      id: 16,
      before: "Les Fran&ccedil;ais ",
      answer: "aiment",
      after: " aussi jouer de la musique : ils ",
      hint: "aimer",
    },
    {
      id: 17,
      before: "",
      answer: "jouent",
      after: " surtout du piano et de la guitare.",
      hint: "jouer",
    },
    {
      id: 18,
      before: "Mais depuis quelques ann&eacute;es, les percussions africaines ",
      answer: "sont",
      after:
        " tr&egrave;s &agrave; la mode et on entend de plus en plus le son du djemb&eacute; dans les parcs et les rues de France.",
      hint: "être",
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
      <div className="container mx-auto max-w-5xl text-center">
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
            Compl&egrave;te le texte :
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
                    ${
                      answers[i]
                        ? "rounded-md border-l-4 border-amber-400 bg-amber-50/60 pl-3"
                        : ""
                    }
                  `}
                >
                  {gap.before}

                  {gap.answer !== "" && (
                    <span className="inline-flex flex-col">
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

                      <span className="ml-3 text-sm text-slate-400">
                        ({gap.hint})
                      </span>
                    </span>
                  )}

                  {gap.after}

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
                V&eacute;rifier mes r&eacute;ponses
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
              R&eacute;sultat final
            </p>

            <p className="text-5xl font-extrabold text-black">
              {score}
              <span className="text-2xl text-black/60"> / 100</span>
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-black hover:bg-amber-400"
            >
              Voir mes r&eacute;sultats
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Exercice2;
