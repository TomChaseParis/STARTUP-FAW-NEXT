"use client";

import type { CharacterPresentationItem } from "../exercises/characterPresentationItem";

export type characterPresentationSpeechData = {
  id: number;
  image: string;
  buttonLabel: string;
  video?: string;
  audio: string;
  sentences: string[];
};

export const characterPresentationData: CharacterPresentationItem[] = [
  {
    id: 1,
    image: "/images/courses/beginner/activities/activity1/exercice4/p1.png",
    buttonLabel: "ILS",
    video: "",
    audio: "/audios/courses/beginner/activity1/exercice4/marieaudio1.mp3",
    sentences: [
      "Avoir vingt ans",
      "Être jeune",
      "Aller à l’université",
      "Être étudiant",
      "Faire des études",
      "Avoir des lunettes",
      "Être un nerd",
      "Avoir un seul ami : mon professeur de chimie.",
    ],
  },

  {
    id: 2,
    image: "/images/courses/beginner/activities/activity1/exercice4/p2.png",
    buttonLabel: "ILS",
    video: "",
    audio: "/audios/courses/beginner/activity1/exercice4/marieaudio2.mp3",
    sentences: [
      "Être marié",
      "Faire une croisière",
      "Avoir beaucoup d’argent",
      "Avoir un petit chien",
      "Aller à New York en bateau",
      "Être riches",
      "Faire souvent des voyages",
      "Avoir beaucoup d’amis riches comme eux",
      "Être très snobs, mais un peu idiots.",
    ],
  },

  {
    id: 3,
    image: "/images/courses/beginner/activities/activity1/exercice4/p3.png",
    buttonLabel: "ILS",
    video: "",
    audio: "/audios/courses/beginner/activity1/exercice4/marieaudio3.mp3",
    sentences: [
      "Avoir soixante-dix ans",
      "Être veuve",
      "Être retraitée",
      "Faire beaucoup de sport",
      "Aller au club de gym tous les jours",
      "Avoir un chat",
      "Être en très bonne santé",
      "Aller très bien depuis que son mari est mort",
    ],
  },

  {
    id: 4,
    image: "/images/courses/beginner/activities/activity1/exercice4/p4.png",
    buttonLabel: "ILS",
    video: "",
    audio: "/audios/courses/beginner/activity1/exercice4/marieaudio4.mp3",
    sentences: [
      "Avoir dix-sept ans, trois mois et deux jours",
      "Être frère et sœur",
      "Être jumeaux",
      "Faire les mêmes choses",
      "Aller au même lycée",
      "Avoir les mêmes amis",
      "Avoir un chien qui s’appelle Ziggy",
      "Être les stars de la famille",
    ],
  },

  {
    id: 5,
    image: "/images/courses/beginner/activities/activity1/exercice4/p5.png",
    buttonLabel: "ILS",
    video: "",
    audio: "/audios/courses/beginner/activity1/exercice4/marieaudio5.mp3",
    sentences: [
      "Avoir entre vingt et vingt-cinq ans",
      "Être jeunes et beaux",
      "Être des surfers",
      "Aller à la plage tous les jours",
      "Faire du surf du matin au soir",
      "Avoir un très beau bronzage",
      "Avoir des corps d’athlètes",
      "Faire quand même un peu pitié",
      "Être ridicules avec vos lunettes et votre crème solaire",
    ],
  },

  {
    id: 6,
    image: "/images/courses/beginner/activities/activity1/exercice4/p6.png",
    buttonLabel: "ILS",
    video: "",
    audio: "/audios/courses/beginner/activity1/exercice4/marieaudio6.mp3",
    sentences: [
      "Être un bébé chien",
      "Avoir six mois",
      "Avoir une couche",
      "Faire pipi dans ta couche",
      "Avoir beaucoup de jouets",
      "Faire des misères au chat",
      "Aller souvent chez le vétérinaire",
      "Avoir un problème avec les chats",
      "Être un chien un peu cruel",
      "Faire beaucoup de bêtises à la maison",
    ],
  },
];