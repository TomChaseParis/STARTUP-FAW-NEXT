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

  /*
   * ============================================================
   * PERSONNAGE 2 — ELLE
   * ============================================================
   */

  {
    id: 3,

    image:
      "/images/courses/beginner/activities/activity1/exercice4/p3.png",

    buttonLabel: "ELLE",

    video: "",

    audio:
      "/audios/courses/beginner/activity1/exercice4/marieaudio3.mp3",

    sentences: [
      {
        prompt:
          "Avoir soixante-dix ans",

        expectedSentence:
          "Elle a soixante-dix ans.",

        audio: {
          ...exercise2Audio("AVOIR", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ELLE/Q1.mp3",
        },
      },

      {
        prompt:
          "Être veuve",

        expectedSentence:
          "Elle est veuve.",

        audio: {
          ...exercise2Audio("ETRE", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ELLE/Q2.mp3",
        },
      },

      {
        prompt:
          "Être retraitée",

        expectedSentence:
          "Elle est retraitée.",

        audio: {
          ...exercise2Audio("ETRE", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ELLE/Q3.mp3",
        },
      },

      {
        prompt:
          "Faire beaucoup de sport",

        expectedSentence:
          "Elle fait beaucoup de sport.",

        audio: {
          ...exercise2Audio("FAIRE", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ELLE/Q4.mp3",
        },
      },

      {
        prompt:
          "Aller au club de gym tous les jours",

        expectedSentence:
          "Elle va au club de gym tous les jours.",

        audio: {
          ...exercise2Audio("ALLER", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ELLE/Q5.mp3",
        },
      },

      {
        prompt:
          "Avoir un chat",

        expectedSentence:
          "Elle a un chat.",

        audio: {
          ...exercise2Audio("AVOIR", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ELLE/Q6.mp3",
        },
      },

      {
        prompt:
          "Être en très bonne santé",

        expectedSentence:
          "Elle est en très bonne santé.",

        audio: {
          ...exercise2Audio("ETRE", 3),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ELLE/Q7.mp3",
        },
      },

      {
        prompt:
          "Aller très bien depuis que son mari est mort",

        expectedSentence:
          "Elle va très bien depuis que son mari est mort.",

        audio: {
          ...exercise2Audio("ALLER", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/ELLE/Q8.mp3",
        },
      },
    ],
  },

  /*
   * ============================================================
   * PERSONNAGE 3 — NOUS
   * ============================================================
   */

  {
    id: 4,

    image:
      "/images/courses/beginner/activities/activity1/exercice4/p4.png",

    buttonLabel: "NOUS",

    video: "",

    audio:
      "/audios/courses/beginner/activity1/exercice4/marieaudio4.mp3",

    sentences: [
      {
        prompt:
          "Avoir dix-sept ans, trois mois et deux jours",

        expectedSentence:
          "Nous avons dix-sept ans, trois mois et deux jours.",

        audio: {
          ...exercise2Audio("AVOIR", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/NOUS/Q1.mp3",
        },
      },

      {
        prompt:
          "Être frère et sœur",

        expectedSentence:
          "Nous sommes frère et sœur.",

        audio: {
          ...exercise2Audio("ETRE", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/NOUS/Q2.mp3",
        },
      },

      {
        prompt:
          "Être jumeaux",

        expectedSentence:
          "Nous sommes jumeaux.",

        audio: {
          ...exercise2Audio("ETRE", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/NOUS/Q3.mp3",
        },
      },

      {
        prompt:
          "Faire les mêmes choses",

        expectedSentence:
          "Nous faisons les mêmes choses.",

        audio: {
          ...exercise2Audio("FAIRE", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/NOUS/Q4.mp3",
        },
      },

      {
        prompt:
          "Aller au même lycée",

        expectedSentence:
          "Nous allons au même lycée.",

        audio: {
          ...exercise2Audio("ALLER", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/NOUS/Q5.mp3",
        },
      },

      {
        prompt:
          "Avoir les mêmes amis",

        expectedSentence:
          "Nous avons les mêmes amis.",

        audio: {
          ...exercise2Audio("AVOIR", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/NOUS/Q6.mp3",
        },
      },

      {
        prompt:
          "Avoir un chien qui s’appelle Ziggy",

        expectedSentence:
          "Nous avons un chien qui s’appelle Ziggy.",

        audio: {
          ...exercise2Audio("AVOIR", 3),

          solution:
          "/audios/courses/beginner/activity1/exercice3/NOUS/Q7.mp3",
        },
      },

      {
        prompt:
          "Être les stars de la famille",

        expectedSentence:
          "Nous sommes les stars de la famille.",

        audio: {
          ...exercise2Audio("ETRE", 3),

          solution:
          "/audios/courses/beginner/activity1/exercice3/NOUS/Q8.mp3",
        },
      },
    ],
  },

  /*
   * ============================================================
   * PERSONNAGE 4 — VOUS
   * ============================================================
   */

  {
    id: 5,

    image:
      "/images/courses/beginner/activities/activity1/exercice4/p5.png",

    buttonLabel: "VOUS",

    video: "",

    audio:
      "/audios/courses/beginner/activity1/exercice4/marieaudio5.mp3",

    sentences: [
      {
        prompt:
          "Avoir entre vingt et vingt-cinq ans",

        expectedSentence:
          "Vous avez entre vingt et vingt-cinq ans.",

        audio: {
          ...exercise2Audio("AVOIR", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/VOUS/Q1.mp3",
        },
      },

      {
        prompt:
          "Être jeunes et beaux",

        expectedSentence:
          "Vous êtes jeunes et beaux.",

        audio: {
          ...exercise2Audio("ETRE", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/VOUS/Q2.mp3",
        },
      },

      {
        prompt:
          "Être des surfers",

        expectedSentence:
          "Vous êtes des surfers.",

        audio: {
          ...exercise2Audio("ETRE", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/VOUS/Q3.mp3",
        },
      },

      {
        prompt:
          "Aller à la plage tous les jours",

        expectedSentence:
          "Vous allez à la plage tous les jours.",

        audio: {
          ...exercise2Audio("ALLER", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/VOUS/Q4.mp3",
        },
      },

      {
        prompt:
          "Faire du surf du matin au soir",

        expectedSentence:
          "Vous faites du surf du matin au soir.",

        audio: {
          ...exercise2Audio("FAIRE", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/VOUS/Q5.mp3",
        },
      },

      {
        prompt:
          "Avoir un très beau bronzage",

        expectedSentence:
          "Vous avez un très beau bronzage.",

        audio: {
          ...exercise2Audio("AVOIR", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/VOUS/Q6.mp3",
        },
      },

      {
        prompt:
          "Avoir des corps d’athlètes",

        expectedSentence:
          "Vous avez des corps d’athlètes.",

        audio: {
          ...exercise2Audio("AVOIR", 3),

          solution:
          "/audios/courses/beginner/activity1/exercice3/VOUS/Q7.mp3",
        },
      },

      {
        prompt:
          "Faire quand même un peu pitié",

        expectedSentence:
          "Vous faites quand même un peu pitié.",

        audio: {
          ...exercise2Audio("FAIRE", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/VOUS/Q8.mp3",
        },
      },

      {
        prompt:
          "Être ridicules avec vos lunettes et votre crème solaire",

        expectedSentence:
          "Vous êtes ridicules avec vos lunettes et votre crème solaire.",

        audio: {
          ...exercise2Audio("ETRE", 3),

          solution:
          "/audios/courses/beginner/activity1/exercice3/VOUS/Q9.mp3",
        },
      },
    ],
  },

  /*
   * ============================================================
   * PERSONNAGE 5 — TU
   * ============================================================
   */

  {
    id: 6,

    image:
      "/images/courses/beginner/activities/activity1/exercice4/p6.png",

    buttonLabel: "TU",

    video: "",

    audio:
      "/audios/courses/beginner/activity1/exercice4/marieaudio6.mp3",

    sentences: [
      {
        prompt:
          "Être un bébé chien",

        expectedSentence:
          "Tu es un bébé chien.",

        audio: {
          ...exercise2Audio("ETRE", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/TU/Q1.mp3",
        },
      },

      {
        prompt:
          "Avoir six mois",

        expectedSentence:
          "Tu as six mois.",

        audio: {
          ...exercise2Audio("AVOIR", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/TU/Q2.mp3",
        },
      },

      {
        prompt:
          "Avoir une couche",

        expectedSentence:
          "Tu as une couche.",

        audio: {
          ...exercise2Audio("AVOIR", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/TU/Q3.mp3",
        },
      },

      {
        prompt:
          "Faire pipi dans ta couche",

        expectedSentence:
          "Tu fais pipi dans ta couche.",

        audio: {
          ...exercise2Audio("FAIRE", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/TU/Q4.mp3",
        },
      },

      {
        prompt:
          "Avoir beaucoup de jouets",

        expectedSentence:
          "Tu as beaucoup de jouets.",

        audio: {
          ...exercise2Audio("AVOIR", 3),

          solution:
          "/audios/courses/beginner/activity1/exercice3/TU/Q5.mp3",
        },
      },

      {
        prompt:
          "Faire des misères au chat",

        expectedSentence:
          "Tu fais des misères au chat.",

        audio: {
          ...exercise2Audio("FAIRE", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/TU/Q6.mp3",
        },
      },

      {
        prompt:
          "Aller souvent chez le vétérinaire",

        expectedSentence:
          "Tu vas souvent chez le vétérinaire.",

        audio: {
          ...exercise2Audio("ALLER", 1),

          solution:
          "/audios/courses/beginner/activity1/exercice3/TU/Q7.mp3",
        },
      },

      {
        prompt:
          "Avoir un problème avec les chats",

        expectedSentence:
          "Tu as un problème avec les chats.",

        audio: {
          ...exercise2Audio("AVOIR", 4),

          solution:
          "/audios/courses/beginner/activity1/exercice3/TU/Q8.mp3",
        },
      },

      {
        prompt:
          "Être un chien un peu cruel",

        expectedSentence:
          "Tu es un chien un peu cruel.",

        audio: {
          ...exercise2Audio("ETRE", 2),

          solution:
          "/audios/courses/beginner/activity1/exercice3/TU/Q9.mp3",
        },
      },

      {
        prompt:
          "Faire beaucoup de bêtises à la maison",

        expectedSentence:
          "Tu fais beaucoup de bêtises à la maison.",

        audio: {
          ...exercise2Audio("FAIRE", 3),

          solution:
          "/audios/courses/beginner/activity1/exercice3/TU/Q10.mp3",
        },
      },
    ],
  },
];

export default characterPresentationData;