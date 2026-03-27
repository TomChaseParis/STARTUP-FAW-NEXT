"use client";

import { FillGapsData } from "@/types/fillGapsTypes";

export const episode1Data: FillGapsData = {
  title: "✍️ EPISODE 1 — Le nouveau logement",
  activityType:"type",

  instruction:
    "Complète le texte avec les verbes suivants au bon temps et à la bonne personne.",

  verbs: [
    "Travailler (présent)",
    "Décider (passé composé)",
    "Demander (présent)",
    "Savoir (présent)",
    "Trouver (passé composé)",
    "Pouvoir (futur)",
    "Rentrer (présent)",
    "Avoir (futur)",
  ],

  sentences: [
    {
      id: 1,
      parts: [
        { type: "text", value: "Papa et maman " },
        {
          type: "input",
          answer: "travaillent",
          hint: "travailler (présent)",
        },
        {
          type: "text",
          value:
            " loin. Tous les jours. Ils partent en train de bonne heure et ",
        },
        {
          type: "input",
          answer: "rentrent",
          hint: "rentrer (présent)",
        },
        {
          type: "text",
          value: " tard, fatigués.",
        },
      ],
    },

    {
      id: 2,
      parts: [
        { type: "text", value: "Alors papa et maman " },
        {
          type: "input",
          answer: "ont décidé",
          hint: "décider (passé composé)",
        },
        {
          type: "text",
          value: " d’aller habiter en ville.",
        },
      ],
    },

    {
      id: 3,
      parts: [
        { type: "text", value: "- Qu’est-ce que tu " },
        {
          type: "input",
          answer: "sais",
          hint: "savoir (présent)",
        },
        {
          type: "text",
          value: " ?, demande maman.",
        },
      ],
    },

    {
      id: 4,
      parts: [
        { type: "text", value: "J’ai " },
        {
          type: "input",
          answer: "trouvé",
          hint: "trouver (passé composé)",
        },
        {
          type: "text",
          value: " un appartement près de ton travail…",
        },
      ],
    },

    {
      id: 5,
      parts: [
        { type: "text", value: "Elle " },
        {
          type: "input",
          answer: "demande",
          hint: "demander (présent)",
        },
        {
          type: "text",
          value:
            " à papa : « Quand pourrons-nous le visiter ? »",
        },
      ],
    },

    {
      id: 6,
      parts: [
        { type: "text", value: "On " },
        {
          type: "input",
          answer: "pourra",
          hint: "pouvoir (futur)",
        },
        {
          type: "text",
          value: " aller le voir samedi.",
        },
      ],
    },

    {
      id: 7,
      parts: [
        {
          type: "text",
          value: "La petite sœur de Pierre ne ",
        },
        {
          type: "input",
          answer: "sait",
          hint: "savoir (présent)",
        },
        {
          type: "text",
          value: " pas encore parler.",
        },
      ],
    },

    {
      id: 8,
      parts: [
        { type: "text", value: "Toi aussi tu " },
        {
          type: "input",
          answer: "auras",
          hint: "avoir (futur)",
        },
        {
          type: "text",
          value: " ta chambre.",
        },
      ],
    },
  ],
};