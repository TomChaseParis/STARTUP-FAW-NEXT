"use client";

/* ========= Types normalisés pour QuizEngine ========= */
type Choice = {
  id: string;
  label: string;
  isCorrect: boolean;
  explanationCorrect: string;
  explanationWrong: string;
  teacherAudioCorrect?: string;
  teacherAudioWrong?: string;
};

type Question = {
  id: number;
  question: string;
  choices: Choice[];
  image: string;
  teacherImage?: string;
  correctAudio: string;
  wrongAudio: string;
  teacherAudioQuestion: string;
};

/* ==========================================================================
   QUIZ DATA — FORMAT 100% COMPATIBLE AVEC QUIZENGINE
========================================================================== */

export const quizData: Question[] = [
  {
    id: 1,
    question: "Il y a combien de joueurs dans une équipe de Rugby ?",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q1/qteacher1.mp3",
    image: "/images/courses/elementary/questions-reponses/q1-rugby.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_1.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_1.mp3",
    choices: [
      {
        id: "A",
        label: "12",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas 12 joueurs.",
        teacherAudioCorrect: "",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q1/A_wrong.mp3",
      },
      {
        id: "B",
        label: "11",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas 11 joueurs.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q1/B_wrong.mp3",
      },
      {
        id: "C",
        label: "15",
        isCorrect: true,
        explanationCorrect: "Une équipe de rugby compte 15 joueurs.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q1/C_correct.mp3",
      },
      {
        id: "D",
        label: "8",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas 8 joueurs.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q1/D_wrong.mp3",
      },
    ],
  },

  {
    id: 2,
    question: "En France, quel jour commence l'été ?",
    image: "/images/courses/elementary/questions-reponses/q2-summer.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q2/qteacher2.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_2.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_2.mp3",
    choices: [
      {
        id: "A",
        label: "Le 12 avril",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas en avril.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q2/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Le 21 juin",
        isCorrect: true,
        explanationCorrect: "L'été commence le 21 juin.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q2/B_correct.mp3",
      },
      {
        id: "C",
        label: "Le 1er juillet",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas en juillet.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q2/C_wrong.mp3",
      },
      {
        id: "D",
        label: "Le 11 juin",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas le 11 juin.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q2/D_wrong.mp3",
      },
    ],
  },

  {
    id: 3,
    question: "Avec quels ingrédients fait-on une Paella ?",
    image: "/images/courses/elementary/questions-reponses/q3-food.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q3/qteacher3.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_3.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_3.mp3",
    choices: [
      {
        id: "A",
        label: "Avec du fromage et des pommes de terre",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "La paella ne se prépare pas comme ça.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q3/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Avec du riz, du chorizo, du poulet et/ou des fruits de mer",
        isCorrect: true,
        explanationCorrect:
          "Les ingrédients traditionnels incluent du riz, du chorizo, du poulet et/ou des fruits de mer.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q3/B_correct.mp3",
      },
      {
        id: "C",
        label: "Avec des pâtes et de la sauce tomate",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas une paella.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q3/C_wrong.mp3",
      },
      {
        id: "D",
        label: "Pain et beurre",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est absolument pas une paella.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q3/D_wrong.mp3",
      },
    ],
  },

  {
    id: 4,
    question: "Comment font les gens pour avoir des bébés ?",
    image: "/images/courses/elementary/questions-reponses/q4-baby.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q4/qteacher4.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_4.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_4.mp3",
    choices: [
      {
        id: "A",
        label: "Ils font du ski",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Non, ce n’est pas lié.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q4/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Ils font la vaisselle",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Toujours pas.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q4/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Ils font la cuisine",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Non plus.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q4/C_wrong.mp3",
      },
      {
        id: "D",
        label: "Ils font l'amour",
        isCorrect: true,
        explanationCorrect: "Ils font l'amour.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q4/D_correct.mp3",
      },
    ],
  },

  {
    id: 5,
    question: "Comment est-ce qu'ils vont au travail ?",
    image: "/images/courses/elementary/questions-reponses/q5-work.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q5/qteacher5.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_5.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_5.mp3",
    choices: [
      {
        id: "A",
        label: "En taxi",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas en taxi.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q5/A_wrong.mp3",
      },
      {
        id: "B",
        label: "En métro",
        isCorrect: true,
        explanationCorrect: "Ils prennent le métro.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q5/B_correct.mp3",
      },
      {
        id: "C",
        label: "En avion",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ils ne prennent pas l’avion pour aller au travail.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q5/C_wrong.mp3",
      },
      {
        id: "D",
        label: "À pied",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ils ne marchent pas jusqu'au travail.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q5/D_wrong.mp3",
      },
    ],
  },

  {
    id: 6,
    question: "Quelle est la capitale de la France ?",
    image: "/images/courses/elementary/questions-reponses/q6-city.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q6/qteacher6.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_6.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_6.mp3",
    choices: [
      {
        id: "A",
        label: "Paris",
        isCorrect: true,
        explanationCorrect: "Paris est la capitale de la France.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q6/A_correct.mp3",
      },
      {
        id: "B",
        label: "Lyon",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Lyon n'est pas la capitale.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q6/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Marseille",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q6/C_wrong.mp3",
      },
      {
        id: "D",
        label: "Toulouse",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q6/D_wrong.mp3",
      },
    ],
  },

  {
    id: 7,
    question: "Qu'est-ce qu'ils font ?",
    image: "/images/courses/elementary/questions-reponses/q7-sport.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q7/qteacher7.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_7.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_7.mp3",
    choices: [
      {
        id: "A",
        label: "Du basket",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas du basket.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q7/A_wrong.mp3",
      },
      {
        id: "B",
        label: "De la natation",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ils ne nagent pas.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q7/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Du judo",
        isCorrect: true,
        explanationCorrect: "Ils pratiquent le judo.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q7/C_correct.mp3",
      },
      {
        id: "D",
        label: "Du trampoline",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ils ne font pas de trampoline.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q7/D_wrong.mp3",
      },
    ],
  },

  {
    id: 8,
    question: "De quelle couleur est le ciel quand il fait beau ?",
    image: "/images/courses/elementary/questions-reponses/q8-weather.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q8/qteacher8.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_8.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_8.mp3",
    choices: [
      {
        id: "A",
        label: "Rouge",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas rouge.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q8/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Vert",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas vert.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q8/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Bleu",
        isCorrect: true,
        explanationCorrect: "Le ciel est bleu quand il fait beau.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q8/C_correct.mp3",
      },
      {
        id: "D",
        label: "Jaune",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas jaune.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q8/D_wrong.mp3",
      },
    ],
  },

  {
    id: 9,
    question: "Qui a été le dernier président de l’URSS ?",
    image: "/images/courses/elementary/questions-reponses/q9-president.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q9/qteacher9.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_9.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_9.mp3",
    choices: [
      {
        id: "A",
        label: "Céline Dion",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "C’est une chanteuse, pas une présidente.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q9/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Gorbatchev",
        isCorrect: true,
        explanationCorrect:
          "Mikhaïl Gorbatchev a été le dernier dirigeant de l’URSS.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q9/B_correct.mp3",
      },
      {
        id: "C",
        label: "Staline",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Staline est mort bien avant la fin de l’URSS.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q9/C_wrong.mp3",
      },
      {
        id: "D",
        label: "Brejnev",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Brejnev n’a pas été le dernier dirigeant.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q9/D_wrong.mp3",
      },
    ],
  },

  {
    id: 10,
    question: "Quel instrument est-ce qu’il joue ?",
    image: "/images/courses/elementary/questions-reponses/q10-music.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q10/qteacher10.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_10.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_10.mp3",
    choices: [
      {
        id: "A",
        label: "De la flûte",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas une flûte.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q10/A_wrong.mp3",
      },
      {
        id: "B",
        label: "De la harpe",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Il ne joue pas de la harpe.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q10/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Du piano",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas un piano.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q10/C_wrong.mp3",
      },
      {
        id: "D",
        label: "De la guitare",
        isCorrect: true,
        explanationCorrect: "Il joue de la guitare.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q10/D_correct.mp3",
      },
    ],
  },

  {
    id: 11,
    question: "Pourquoi est-ce que les oiseaux chantent ?",
    image: "/images/courses/elementary/questions-reponses/q11-birds.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q11/qteacher11.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_11.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_11.mp3",
    choices: [
      {
        id: "A",
        label: "Pour qu’on leur donne de l’argent",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas pour de l’argent.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q11/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Pour tuer le temps",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas pour s’occuper.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q11/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Pour communiquer",
        isCorrect: true,
        explanationCorrect: "Les oiseaux chantent pour communiquer.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q11/C_correct.mp3",
      },
      {
        id: "D",
        label: "Pour s'amuser",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas pour s’amuser.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q11/D_wrong.mp3",
      },
    ],
  },

  {
    id: 12,
    question: "Quel moment historique illustre cette photo ?",
    image: "/images/courses/elementary/questions-reponses/q12-monument.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q12/qteacher12.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_12.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_12.mp3",
    choices: [
      {
        id: "A",
        label: "Le couronnement de la reine Elisabeth II",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas ce monument.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q12/A_wrong.mp3",
      },
      {
        id: "B",
        label: "L’inauguration du Louvre",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas cette scène.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q12/B_wrong.mp3",
      },
      {
        id: "C",
        label: "La destruction de la Tour Eiffel",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "La Tour Eiffel n’a jamais été détruite.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q12/C_wrong.mp3",
      },
      {
        id: "D",
        label: "La construction du mur de Berlin",
        isCorrect: true,
        explanationCorrect:
          "Il s’agit bien de la construction du mur de Berlin en 1961.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q12/D_correct.mp3",
      },
    ],
  },

  {
    id: 13,
    question: "Quand est-ce qu’il est né ?",
    image: "/images/courses/elementary/questions-reponses/q13-born.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q13/qteacher13.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_13.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_13.mp3",
    choices: [
      {
        id: "A",
        label: "Hier soir",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas hier soir.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q13/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Demain matin",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "On ne peut pas naître demain.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q13/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Il y a très longtemps",
        isCorrect: true,
        explanationCorrect: "Il est né il y a longtemps.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q13/C_correct.mp3",
      },
      {
        id: "D",
        label: "En 2025",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas 2025.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q13/D_wrong.mp3",
      },
    ],
  },

  {
    id: 14,
    question: "Où est-ce qu’ils habitent ?",
    image: "/images/courses/elementary/questions-reponses/q14-where.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q14/qteacher14.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/youhoutest.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_14.mp3",
    choices: [
      {
        id: "A",
        label: "Dans une grande ville",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas en ville.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q14/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Dans la jungle",
        isCorrect: true,
        explanationCorrect: "Ils vivent dans la jungle.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q14/B_correct.mp3",
      },
      {
        id: "C",
        label: "Dans un petit village",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas un village.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q14/C_wrong.mp3",
      },
      {
        id: "D",
        label: "Sur un bateau",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ils n’habitent pas sur un bateau.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q14/D_wrong.mp3",
      },
    ],
  },

  {
    id: 15,
    question: "Mais... Qu’est-ce que c’est que ce machin ?",
    image: "/images/courses/elementary/questions-reponses/q15-whatisit.png",
    teacherImage:         "/images/courses/teacher/jeanbulle.png",
    teacherAudioQuestion:
    "/audios/teacher/elementary-1/activity1/q15/qteacher15.mp3",
    correctAudio:
      "/audios/courses/elementary/questions-reponses/jean_good-answer_15.mp3",
    wrongAudio:
      "/audios/courses/elementary/questions-reponses/jean_bad-answer_15.mp3",
    choices: [
      {
        id: "A",
        label: "Un objet venu de l’espace",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas un objet extraterrestre.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q15/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Une mauvaise blague",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce n’est pas une blague.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q15/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Des toilettes portatives",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Ce ne sont pas des toilettes portatives.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity1/q15/C_wrong.mp3",
      },
      {
        id: "D",
        label: "Une œuvre d’art",
        isCorrect: true,
        explanationCorrect: "C’est une œuvre d’art.",
        explanationWrong: "",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity1/q15/D_correct.mp3",
      },
    ],
  },
];
