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
   QUIZ DATA — FORMAT 100% COMPATIBLE AVEC QUIZENGINE
========================================================================== */

export const quizData: Question[] = [
  {
    id: 1,
    question: "Il y a combien de joueurs dans une équipe de Rugby ?",
    teacherAudioQuestion:
      "/audios/teacher/elementary-1/activity1/q1/qteacher1.mp3",
    image:
      "/images/courses/elementary/questions-reponses/Q1.png",
    teacherImage:
      "/images/courses/teacher/jeanbulle.png",
    choices: [
      {
        id: "A",
        label: "12",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Ce n’est pas 12 joueurs.",
      },
      {
        id: "B",
        label: "11",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Ce n’est pas 11 joueurs.",
      },
      {
        id: "C",
        label: "15",
        isCorrect: true,
        explanationCorrect:
          "Une équipe de rugby compte 15 joueurs.",
        explanationWrong: "",
      },
      {
        id: "D",
        label: "8",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Ce n’est pas 8 joueurs.",
      },
    ],
  },

 
];