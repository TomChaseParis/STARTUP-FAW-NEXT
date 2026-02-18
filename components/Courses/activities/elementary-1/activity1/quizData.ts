"use client";

/* ========= Types normalisés pour QuizEngine ========= */
type Choice = {
  id: string;
  label: string;
  isCorrect: boolean;
  explanationCorrect: string;
  explanationWrong: string;
};

type Question = {
  id: number;
  question: string;
  choices: Choice[];
  image: string;
  correctAudio: string;
  wrongAudio: string;
};

/* ==========================================================================
   QUIZ DATA — FORMAT 100% COMPATIBLE AVEC QUIZENGINE
========================================================================== */

export const quizData: Question[] = [
  {
    id: 1,
    question: "Il y a combien de joueurs dans une équipe de Rugby ?",
    image: "/images/courses/elementary/questions-reponses/q1-rugby.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_1.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_1.mp3",
    choices: [
      { id: "A", label: "12", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas 12 joueurs." },
      { id: "B", label: "11", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas 11 joueurs." },
      { id: "C", label: "15", isCorrect: true, explanationCorrect: "Une équipe de rugby compte 15 joueurs.", explanationWrong: "" },
      { id: "D", label: "8", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas 8 joueurs." }
    ]
  },

  {
    id: 2,
    question: "En France, quel jour commence l'été ?",
    image: "/images/courses/elementary/questions-reponses/q2-summer.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_2.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_2.mp3",
    choices: [
      { id: "A", label: "Le 12 avril", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas en avril." },
      { id: "B", label: "Le 21 juin", isCorrect: true, explanationCorrect: "L'été commence le 21 juin.", explanationWrong: "" },
      { id: "C", label: "Le 1er juillet", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas en juillet." },
      { id: "D", label: "Le 11 juin", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas le 11 juin." }
    ]
  },

  {
    id: 3,
    question: "Avec quels ingrédients fait-on une Paella ?",
    image: "/images/courses/elementary/questions-reponses/q3-food.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_3.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_3.mp3",
    choices: [
      { id: "A", label: "Fromage et pommes de terre", isCorrect: false, explanationCorrect: "", explanationWrong: "La paella ne se prépare pas comme ça." },
      { id: "B", label: "Riz, chorizo, poulet et/ou fruits de mer", isCorrect: true, explanationCorrect: "Les ingrédients traditionnels incluent du riz, du chorizo, du poulet et/ou des fruits de mer.", explanationWrong: "" },
      { id: "C", label: "Pâtes et sauce tomate", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas une paella." },
      { id: "D", label: "Pain et beurre", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est absolument pas une paella." }
    ]
  },

  {
    id: 4,
    question: "Comment font les gens pour avoir des bébés ?",
    image: "/images/courses/elementary/questions-reponses/q4-baby.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_4.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_4.mp3",
    choices: [
      { id: "A", label: "Ils font du ski", isCorrect: false, explanationCorrect: "", explanationWrong: "Non, ce n’est pas lié." },
      { id: "B", label: "Ils font la vaisselle", isCorrect: false, explanationCorrect: "", explanationWrong: "Toujours pas." },
      { id: "C", label: "Ils font la cuisine", isCorrect: false, explanationCorrect: "", explanationWrong: "Non plus." },
      { id: "D", label: "Ils font l'amour", isCorrect: true, explanationCorrect: "Ils font l'amour.", explanationWrong: "" }
    ]
  },

  {
    id: 5,
    question: "Comment est-ce qu'ils vont au travail ?",
    image: "/images/courses/elementary/questions-reponses/q5-work.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_5.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_5.mp3",
    choices: [
      { id: "A", label: "En taxi", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas en taxi." },
      { id: "B", label: "En métro", isCorrect: true, explanationCorrect: "Ils prennent le métro.", explanationWrong: "" },
      { id: "C", label: "En avion", isCorrect: false, explanationCorrect: "", explanationWrong: "Ils ne prennent pas l’avion pour aller au travail." },
      { id: "D", label: "À pied", isCorrect: false, explanationCorrect: "", explanationWrong: "Ils ne marchent pas jusqu'au travail." }
    ]
  },

  {
    id: 6,
    question: "Quelle est la capitale de la France ?",
    image: "/images/courses/elementary/questions-reponses/q6-city.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_6.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_6.mp3",
    choices: [
      { id: "A", label: "Paris", isCorrect: true, explanationCorrect: "Paris est la capitale de la France.", explanationWrong: "" },
      { id: "B", label: "Lyon", isCorrect: false, explanationCorrect: "", explanationWrong: "Lyon n'est pas la capitale." },
      { id: "C", label: "Marseille", isCorrect: false, explanationCorrect: "", explanationWrong: "" },
      { id: "D", label: "Toulouse", isCorrect: false, explanationCorrect: "", explanationWrong: "" }
    ]
  },

  {
    id: 7,
    question: "Qu'est-ce qu'ils font ?",
    image: "/images/courses/elementary/questions-reponses/q7-sport.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_7.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_7.mp3",
    choices: [
      { id: "A", label: "Du basket", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas du basket." },
      { id: "B", label: "De la natation", isCorrect: false, explanationCorrect: "", explanationWrong: "Ils ne nagent pas." },
      { id: "C", label: "Du judo", isCorrect: true, explanationCorrect: "Ils pratiquent le judo.", explanationWrong: "" },
      { id: "D", label: "Du trampoline", isCorrect: false, explanationCorrect: "", explanationWrong: "Ils ne font pas de trampoline." }
    ]
  },

  {
    id: 8,
    question: "De quelle couleur est le ciel quand il fait beau ?",
    image: "/images/courses/elementary/questions-reponses/q8-weather.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_8.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_8.mp3",
    choices: [
      { id: "A", label: "Rouge", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas rouge." },
      { id: "B", label: "Vert", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas vert." },
      { id: "C", label: "Bleu", isCorrect: true, explanationCorrect: "Le ciel est bleu quand il fait beau.", explanationWrong: "" },
      { id: "D", label: "Jaune", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas jaune." }
    ]
  },

  {
    id: 9,
    question: "Qui a été le dernier président de l’URSS ?",
    image: "/images/courses/elementary/questions-reponses/q9-president.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_9.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_9.mp3",
    choices: [
      { id: "A", label: "Céline Dion", isCorrect: false, explanationCorrect: "", explanationWrong: "C’est une chanteuse, pas une présidente." },
      { id: "B", label: "Gorbatchev", isCorrect: true, explanationCorrect: "Mikhaïl Gorbatchev a été le dernier dirigeant de l’URSS.", explanationWrong: "" },
      { id: "C", label: "Staline", isCorrect: false, explanationCorrect: "", explanationWrong: "Staline est mort bien avant la fin de l’URSS." },
      { id: "D", label: "Brejnev", isCorrect: false, explanationCorrect: "", explanationWrong: "Brejnev n’a pas été le dernier dirigeant." }
    ]
  },

  {
    id: 10,
    question: "Quel instrument est-ce qu’il joue ?",
    image: "/images/courses/elementary/questions-reponses/q10-music.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_10.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_10.mp3",
    choices: [
      { id: "A", label: "De la flûte", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas une flûte." },
      { id: "B", label: "De la harpe", isCorrect: false, explanationCorrect: "", explanationWrong: "Il ne joue pas de la harpe." },
      { id: "C", label: "Du piano", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas un piano." },
      { id: "D", label: "De la guitare", isCorrect: true, explanationCorrect: "Il joue de la guitare.", explanationWrong: "" }
    ]
  },

  {
    id: 11,
    question: "Pourquoi est-ce que les oiseaux chantent ?",
    image: "/images/courses/elementary/questions-reponses/q11-birds.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_11.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_11.mp3",
    choices: [
      { id: "A", label: "Pour qu’on leur donne de l’argent", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas pour de l’argent." },
      { id: "B", label: "Pour tuer le temps", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas pour s’occuper." },
      { id: "C", label: "Pour communiquer", isCorrect: true, explanationCorrect: "Les oiseaux chantent pour communiquer.", explanationWrong: "" },
      { id: "D", label: "Pour s'amuser", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas pour s’amuser." }
    ]
  },

  {
    id: 12,
    question: "Quel moment historique illustre cette photo ?",
    image: "/images/courses/elementary/questions-reponses/q12-monument.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_12.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_12.mp3",
    choices: [
      { id: "A", label: "Le couronnement de la reine Elisabeth II (1953)", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas cette date." },
      { id: "B", label: "L’inauguration du Louvre (1793)", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas cette scène." },
      { id: "C", label: "La destruction de la Tour Eiffel (2056)", isCorrect: false, explanationCorrect: "", explanationWrong: "La Tour Eiffel n’a jamais été détruite." },
      { id: "D", label: "La construction du mur de Berlin (1961)", isCorrect: true, explanationCorrect: "Il s’agit bien de la construction du mur de Berlin en 1961.", explanationWrong: "" }
    ]
  },

  {
    id: 13,
    question: "Quand est-ce qu’il est né ?",
    image: "/images/courses/elementary/questions-reponses/q13-born.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_13.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_13.mp3",
    choices: [
      { id: "A", label: "Hier soir", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas hier soir." },
      { id: "B", label: "Demain matin", isCorrect: false, explanationCorrect: "", explanationWrong: "On ne peut pas naître demain." },
      { id: "C", label: "Il y a très longtemps", isCorrect: true, explanationCorrect: "Il est né il y a longtemps.", explanationWrong: "" },
      { id: "D", label: "En 2025", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas 2025." }
    ]
  },

  {
    id: 14,
    question: "Où est-ce qu’ils habitent ?",
    image: "/images/courses/elementary/questions-reponses/q14-where.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/youhoutest.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_14.mp3",
    choices: [
      { id: "A", label: "Dans une grande ville", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas en ville." },
      { id: "B", label: "Dans la jungle", isCorrect: true, explanationCorrect: "Ils vivent dans la jungle.", explanationWrong: "" },
      { id: "C", label: "Dans un petit village", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas un village." },
      { id: "D", label: "Sur un bateau", isCorrect: false, explanationCorrect: "", explanationWrong: "Ils n’habitent pas sur un bateau." }
    ]
  },

  {
    id: 15,
    question: "Mais... Qu’est-ce que c’est que ce machin ?",
    image: "/images/courses/elementary/questions-reponses/q15-whatisit.png",
    correctAudio: "/audios/courses/elementary/questions-reponses/jean_good-answer_15.mp3",
    wrongAudio: "/audios/courses/elementary/questions-reponses/jean_bad-answer_15.mp3",
    choices: [
      { id: "A", label: "Un objet venu de l’espace", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas un objet extraterrestre." },
      { id: "B", label: "Une mauvaise blague", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce n’est pas une blague." },
      { id: "C", label: "Des toilettes portatives", isCorrect: false, explanationCorrect: "", explanationWrong: "Ce ne sont pas des toilettes portatives." },
      { id: "D", label: "Une œuvre d’art", isCorrect: true, explanationCorrect: "C’est une œuvre d’art.", explanationWrong: "" }
    ]
  }
];
