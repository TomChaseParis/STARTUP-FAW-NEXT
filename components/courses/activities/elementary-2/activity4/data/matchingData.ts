"use client";

import { MatchingData } from "@/components/courses/types/matchingTypes";

export const matchingData: MatchingData = {
  title: "Marc au Venezuela",

  instruction:
    "Pour chaque question, retrouve la réponse qui correspond le mieux.",

  questions: [
    {
      id: 1,
      text: "Tu as vu Miguel et Rosa pendant ton séjour ?",
      answerId: "f",
    },
    {
      id: 2,
      text: "Tu as rapporté quelque chose du Venezuela ?",
      answerId: "i",
    },
    {
      id: 3,
      text: "Tu as mangé de la bonne cuisine là-bas ? Tu as goûté les cachapas ?",
      answerId: "c",
    },
    {
      id: 4,
      text: "Tu as pu voir les chutes de Salto Ángel ?",
      answerId: "e",
    },
    {
      id: 5,
      text: "Tu as rencontré des filles sympas ?",
      answerId: "a",
    },
    {
      id: 6,
      text: "Tu as visité Coro ?",
      answerId: "b",
    },
    {
      id: 7,
      text: "Tu as pratiqué un peu ton espagnol ?",
      answerId: "j",
    },
    {
      id: 8,
      text: "Tu as demandé ton chemin à quelqu’un dans les rues de Caracas ?",
      answerId: "d",
    },
    {
      id: 9,
      text: "Tu as loué une voiture pour visiter le pays ?",
      answerId: "h",
    },
    {
      id: 10,
      text: "Tu as pris de belles photos pendant ton séjour ?",
      answerId: "g",
    },
  ],

  answers: [
    {
      id: "a",
      text: "Non, je n’ai rencontré personne. Je ne suis pas beaucoup sorti, le soir.",
    },
    {
      id: "b",
      text: "Oui, mais je n’y suis resté qu’une seule journée. Je n’ai pas vu grand-chose.",
    },
    {
      id: "c",
      text: "Non, je n’ai goûté aucun plat local. Je suis seulement allé au Burger King.",
    },
    {
      id: "d",
      text: "Non, je n’ai pas eu besoin. J’avais Google Maps.",
    },
    {
      id: "e",
      text: "Non, je n’ai pas eu le temps d’aller dans les montagnes. Je ne suis pas resté assez longtemps.",
    },
    {
      id: "f",
      text: "Non, ils n’étaient pas là, malheureusement.",
    },
    {
      id: "g",
      text: "Non, je n’ai pris aucune photo. Je n’y ai même pas pensé.",
    },
    {
      id: "h",
      text: "Non, je n’ai jamais pris la voiture. J’ai tout fait en bus.",
    },
    {
      id: "i",
      text: "Non, je n’ai rien rapporté. Je n’avais pas de place dans ma valise.",
    },
    {
      id: "j",
      text: "Non, pas vraiment. Je n’ai parlé à personne, sauf à la dame de la réception de l’hôtel.",
    },
  ],
};