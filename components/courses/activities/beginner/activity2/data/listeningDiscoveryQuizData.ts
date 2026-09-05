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
   QUIZ DATA — AGENCE MATRIMONIALE
========================================================================== */

export const listeningDiscoveryQuizData: Question[] = [
  {
    id: 1,
    question: "Comment s'appelle l'homme qui se présente ?",
    image: "",
    teacherImage:"/images/courses/bulles-teacher/marie-question.png",
    teacherAudioQuestion:
      "/audios/courses/beginner/activity2/quiz/Q1.mp3",
    choices: [
      {
        id: "a",
        label: "Xavier Plantu",
        isCorrect: true,
        explanationCorrect:
          "L'homme qui se présente s'appelle Xavier Plantu.",
        explanationWrong:
          "L'homme qui se présente s'appelle Xavier Plantu.",
      },
      {
        id: "b",
        label: "Pierre Martin",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Ce n'est pas Pierre Martin.",
      },
      {
        id: "c",
        label: "Jean Dupont",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Ce n'est pas Jean Dupont.",
      },
    ],
  },

  {
    id: 2,
    question: "Quelle est sa nationalité ?",
    image: "",
    teacherImage:"/images/courses/bulles-teacher/marie-question.png",
    teacherAudioQuestion:
      "/audios/courses/beginner/activity2/quiz/Q2.mp3",
    choices: [
      {
        id: "a",
        label: "Française",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Xavier n'est pas français.",
      },
      {
        id: "b",
        label: "Canadienne",
        isCorrect: true,
        explanationCorrect:
          "Xavier est canadien.",
        explanationWrong: "",
      },
      {
        id: "c",
        label: "Belge",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Xavier n'est pas belge.",
      },
    ],
  },

  {
    id: 3,
    question: "Quel âge a Xavier ?",
    image: "",
    teacherImage:"/images/courses/bulles-teacher/marie-question.png",
    teacherAudioQuestion:
      "/audios/courses/beginner/activity2/quiz/Q3.mp3",
    choices: [
      {
        id: "a",
        label: "36 ans",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Xavier n'a pas 36 ans.",
      },
      {
        id: "b",
        label: "40 ans",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Xavier n'a pas 40 ans.",
      },
      {
        id: "c",
        label: "46 ans",
        isCorrect: true,
        explanationCorrect:
          "Xavier a 46 ans.",
        explanationWrong: "",
      },
    ],
  },

  {
    id: 4,
    question: "Quel est son métier ?",
    image: "",
    teacherImage:"/images/courses/bulles-teacher/marie-question.png",
    teacherAudioQuestion:
      "/audios/courses/beginner/activity2/quiz/Q4.mp3",
    choices: [
      {
        id: "a",
        label: "Ingénieur",
        isCorrect: true,
        explanationCorrect:
          "Xavier est ingénieur.",
        explanationWrong: "",
      },
      {
        id: "b",
        label: "Professeur",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Xavier n'est pas professeur.",
      },
      {
        id: "c",
        label: "Médecin",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Xavier n'est pas médecin.",
      },
    ],
  },

  {
    id: 5,
    question: "Que recherche Xavier ?",
    image: "",
    teacherImage:"/images/courses/bulles-teacher/marie-question.png",
    teacherAudioQuestion:
      "/audios/courses/beginner/activity2/quiz/Q5.mp3",
    choices: [
      {
        id: "a",
        label: "Un emploi",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Xavier ne recherche pas un emploi.",
      },
      {
        id: "b",
        label: "Une femme sportive et sympathique",
        isCorrect: true,
        explanationCorrect:
          "Xavier recherche une femme sportive et sympathique.",
        explanationWrong: "",
      },
      {
        id: "c",
        label: "Un appartement à Paris",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Xavier ne recherche pas un appartement à Paris.",
      },
    ],
  },
];