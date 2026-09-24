"use client";

import type {
  CharacterPresentationItem,
} from "../exercises/exercice-3/characterPresentationItem";

const exercise2AudioPath =
  "/audios/courses/beginner/activity1/exercice2/prononciation";

const exercise3AudioPath =
  "/audios/courses/beginner/activity1/exercice3";

/**
 * ============================================================
 * AUDIO EXERCICE 2
 * ============================================================
 *
 * Les deux mauvaises réponses utilisent exactement
 * les audios de l'ancien exercice 2.
 *
 * wrong1 → première mauvaise réponse
 * wrong2 → deuxième mauvaise réponse
 *
 * IMPORTANT :
 * On retourne des STRING et non des tableaux.
 */

const exercise2Audio = (
  verb: "ETRE" | "AVOIR" | "FAIRE" | "ALLER",
  questionNumber: number,
) => ({
  correct:
    `${exercise2AudioPath}/${verb}/Q${questionNumber}/goodanswermarie.mp3`,

  wrong1:
    `${exercise2AudioPath}/${verb}/Q${questionNumber}/badanswermarie1.mp3`,

  wrong2:
    `${exercise2AudioPath}/${verb}/Q${questionNumber}/badanswermarie2.mp3`,
});
/**
 * ============================================================
 * DONNÉES EXERCICE 3
 * ============================================================
 */

export const characterPresentationData: CharacterPresentationItem[] = [
  /*
   * ============================================================
   * PERSONNAGE 1 — ILS
   * ============================================================
   */

  {
    id: 2,

    image:
      "/images/courses/beginner/activities/activity1/exercice4/p2.png",

    buttonLabel: "ILS",

    video: "",

    audio:
      "/audios/courses/beginner/activity1/exercice4/marieaudio2.mp3",

    sentences: [
      {
        prompt: "Être marié",

        expectedSentence:
          "Ils sont mariés.",

        audio: {
          ...exercise2Audio("ETRE", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ILS/Q1.mp3",
        },
      },

      {
        prompt: "Faire une croisière",

        expectedSentence:
          "Ils font une croisière.",

        audio: {
          ...exercise2Audio("FAIRE", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ILS/Q2.mp3",
        },
      },

      {
        prompt:
          "Avoir beaucoup d’argent",

        expectedSentence:
          "Ils ont beaucoup d’argent.",

        audio: {
          ...exercise2Audio("AVOIR", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ILS/Q3.mp3",
        },
      },

      {
        prompt:
          "Avoir un petit chien",

        expectedSentence:
          "Ils ont un petit chien.",

        audio: {
          ...exercise2Audio("AVOIR", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ILS/Q4.mp3",

        },
      },

      {
        prompt:
          "Aller à New York en bateau",

        expectedSentence:
          "Ils vont à New York en bateau.",

        audio: {
          ...exercise2Audio("ALLER", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ILS/Q5.mp3",

        },
      },

      {
        prompt:
          "Être riches",

        expectedSentence:
          "Ils sont riches.",

        audio: {
          ...exercise2Audio("ETRE", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ILS/Q6.mp3",
        },
      },

      {
        prompt:
          "Faire souvent des voyages",

        expectedSentence:
          "Ils font souvent des voyages.",

        audio: {
          ...exercise2Audio("FAIRE", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ILS/Q7.mp3",
        },
      },

      {
        prompt:
          "Avoir beaucoup d’amis riches comme eux",

        expectedSentence:
          "Ils ont beaucoup d’amis riches comme eux.",

        audio: {
          ...exercise2Audio("AVOIR", 3),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ILS/Q8.mp3",
        },
      },

      {
        prompt:
          "Être très snobs, mais un peu idiots.",

        expectedSentence:
          "Ils sont très snobs, mais un peu idiots.",

        audio: {
          ...exercise2Audio("ETRE", 3),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ILS/Q9.mp3",
        },
      },
    ],
  },

 
];

export default characterPresentationData;