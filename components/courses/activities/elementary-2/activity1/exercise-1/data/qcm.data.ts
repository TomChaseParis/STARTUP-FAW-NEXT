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
  teacherImage?: string;
  teacherAudioQuestion: string;
};

/* ==========================================================================
   QUIZ DATA — CLARA ET SON QUOTIDIEN
========================================================================== */

export const qcmData: Question[] = [
  {
    id: 1,
    question: "À ton avis, quel âge peut avoir Clara ?",
    image: "/images/courses/elementary2/activity1/exercise-1/QCM/QCMClara.jpg",
    teacherImage: "/images/courses/bulles-teacher/irene-question.png",
    teacherAudioQuestion: "/audios/courses/elementary-2/activity1/QCM/Q1.mp3",
    choices: [
      {
        id: "a",
        label: "Elle a 15 ans",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Clara n'a pas 15 ans.",
      },
      {
        id: "b",
        label: "Elle a 30 ans",
        isCorrect: true,
        explanationCorrect: "Clara a 30 ans.",
        explanationWrong: "",
      },
      {
        id: "c",
        label: "Elle a 45 ans",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Clara n'a pas 45 ans.",
      },
    ],
  },

  {
    id: 2,
    question: "Le matin, au petit déjeuner, Clara écoute",
    image: "/images/courses/elementary2/activity1/exercise-1/QCM/QCMClara.jpg",
    teacherImage: "",
    teacherAudioQuestion: "/audios/courses/elementary-2/activity1/QCM/Q2.mp3",
    choices: [
      {
        id: "a",
        label: "De la techno",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Clara n'écoute pas de techno.",
      },
      {
        id: "b",
        label: "Du rap",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Clara n'écoute pas de rap.",
      },
      {
        id: "c",
        label: "Du reggae",
        isCorrect: true,
        explanationCorrect: "Le matin, Clara écoute du reggae.",
        explanationWrong: "",
      },
    ],
  },

  {
    id: 3,
    question: "Qui est Gaston ?",
    image: "/images/courses/elementary2/activity1/exercise-1/QCM/QCMClara.jpg",
    teacherImage: "",
    teacherAudioQuestion: "/audios/courses/elementary-2/activity1/QCM/Q3.mp3",
    choices: [
      {
        id: "a",
        label: "C'est son flamand rose",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Gaston n'est pas son flamant rose.",
      },
      {
        id: "b",
        label: "C'est son chien",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Gaston n'est pas son chien.",
      },
      {
        id: "c",
        label: "C'est son chat",
        isCorrect: true,
        explanationCorrect: "Gaston est le chat de Clara.",
        explanationWrong: "",
      },
    ],
  },

  {
    id: 4,
    question: "Clara donne des cours",
    image: "/images/courses/elementary2/activity1/exercise-1/QCM/QCMClara.jpg",
    teacherImage: "",
    teacherAudioQuestion: "/audios/courses/elementary-2/activity1/QCM/Q4.mp3",
    choices: [
      {
        id: "a",
        label: "De danse classique",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Clara ne donne pas de cours de danse classique.",
      },
      {
        id: "b",
        label: "De danse orientale",
        isCorrect: true,
        explanationCorrect: "Clara donne des cours de danse orientale.",
        explanationWrong: "",
      },
      {
        id: "c",
        label: "De musique orientale",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Clara donne des cours de danse, pas de musique orientale.",
      },
    ],
  },

  {
    id: 5,
    question: "À ton avis, dans quelle ville habite Clara ?",
    image: "/images/courses/elementary2/activity1/exercise-1/QCM/QCMClara.jpg",
    teacherImage: "",
    teacherAudioQuestion: "/audios/courses/elementary-2/activity1/QCM/Q5.mp3",
    choices: [
      {
        id: "a",
        label: "Paris",
        isCorrect: true,
        explanationCorrect:
          "Clara habite à Paris. On peut voir le jardin des Tuileries et les Galeries Lafayette.",
        explanationWrong: "",
      },
      {
        id: "b",
        label: "Lyon",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Clara n'habite pas à Lyon.",
      },
      {
        id: "c",
        label: "Mogadiscio",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Clara n'habite pas à Mogadiscio.",
      },
    ],
  },

  {
    id: 6,
    question: "Qui est-ce qu'elle appelle souvent le soir ?",
    image: "/images/courses/elementary2/activity1/exercise-1/QCM/QCMClara.jpg",
    teacherImage: "",
    teacherAudioQuestion: "/audios/courses/elementary-2/activity1/QCM/Q6.mp3",
    choices: [
      {
        id: "a",
        label: "Son frère ou sa mère",
        isCorrect: true,
        explanationCorrect:
          "Le soir, Clara appelle souvent son frère ou sa mère.",
        explanationWrong: "",
      },
      {
        id: "b",
        label: "Sa sœur ou son père",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Clara n'appelle pas souvent sa sœur ou son père.",
      },
      {
        id: "c",
        label: "Son père et sa mère",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "La bonne réponse est son frère ou sa mère.",
      },
    ],
  },

  {
    id: 7,
    question: "Qui est Zig ?",
    image: "/images/courses/elementary2/activity1/exercise-1/QCM/QCMClara.jpg",
    teacherImage: "",
    teacherAudioQuestion: "/audios/courses/elementary-2/activity1/QCM/Q7.mp3",
    choices: [
      {
        id: "a",
        label: "Son lutin",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Zig n'est pas son lutin.",
      },
      {
        id: "b",
        label: "Son frère",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Zig n'est pas son frère.",
      },
      {
        id: "c",
        label: "Son cousin",
        isCorrect: true,
        explanationCorrect: "Zig est le cousin de Clara.",
        explanationWrong: "",
      },
    ],
  },

  {
    id: 8,
    question: "Est-ce qu'elle vit avec quelqu'un ?",
    image: "/images/courses/elementary2/activity1/exercise-1/QCM/QCMClara.jpg",
    teacherAudioQuestion: "/audios/courses/elementary-2/activity1/QCM/Q8.mp3",
    choices: [
      {
        id: "a",
        label: "Oui, elle vit avec Casper le fantôme",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Clara ne vit pas avec Casper le fantôme.",
      },
      {
        id: "b",
        label: "Non, elle vit seule avec son chat Gaston",
        isCorrect: true,
        explanationCorrect: "Clara vit seule avec son chat Gaston.",
        explanationWrong: "",
      },
      {
        id: "c",
        label: "Non, elle vit seule avec son rat",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong: "Clara vit avec son chat Gaston, pas avec un rat.",
      },
    ],
  },
];
