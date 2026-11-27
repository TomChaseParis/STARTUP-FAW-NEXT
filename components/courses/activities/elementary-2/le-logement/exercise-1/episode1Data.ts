
"use client";

import { FillGapsData } from "@/types/fillGapsTypes";

export const episode1Data: FillGapsData = {
  title: "ÉPISODE 1 — Le nouveau logement",
  activityType: "type",

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
        {
          type: "dialogue",
          speaker: "papa",
          value: "« Ça y est, j’ai peut-être trouvé quelque chose ! »",
        },
      ],
    },

    {
      id: 2,
      parts: [
        {
          type: "dialogue",
          speaker: "narration",
          value: "Annonce papa en arrivant à la maison.",
        },
        {
          type: "narration",
          value: "Papa et maman ",
        },
        {
          type: "input",
          answer: "travaillent",
          hint: "travailler (présent)",
        },
        {
          type: "narration",
          value: " loin. Tous les jours, ils partent en train de bonne heure et ",
        },
        {
          type: "input",
          answer: "rentrent",
          hint: "rentrer (présent)",
        },
        {
          type: "narration",
          value: " tard, fatigués. Alors papa et maman ",
        },
        {
          type: "input",
          answer: "ont décidé",
          hint: "décider (passé composé)",
        },
        {
          type: "narration",
          value: " d’aller habiter en ville.",
        },
      ],
    },

    {
      id: 3,
      parts: [
        {
          type: "dialogue",
          speaker: "maman",
          value: "— Qu’est-ce que tu ",
        },
        {
          type: "input",
          answer: "as trouvé",
          hint: "trouver (passé composé)",
        },
        {
          type: "dialogue",
          speaker: "maman",
          value: " ?",
        },
        {
          type: "narration",
          value: "demande maman.",
        },
      ],
    },

    {
      id: 4,
      parts: [
        {
          type: "dialogue",
          speaker: "papa",
          value:
            "— J’ai trouvé un appartement près de ton travail. C’est dans un immeuble de six étages. Au second, il y a trois chambres et c’est clair.",
        },
      ],
    },

    {
      id: 5,
      parts: [
        {
          type: "narration",
          value: "Maman écoute avec attention. Elle ",
        },
        {
          type: "input",
          answer: "demande",
          hint: "demander (présent)",
        },
        {
          type: "narration",
          value: " à papa :",
        },
      ],
    },

    {
      id: 6,
      parts: [
        {
          type: "dialogue",
          speaker: "maman",
          value: "— Quand pourrons-nous le visiter ?",
        },
      ],
    },

    {
      id: 7,
      parts: [
        {
          type: "dialogue",
          speaker: "papa",
          value: "— On ",
        },
        {
          type: "input",
          answer: "pourra",
          hint: "pouvoir (futur)",
        },
        {
          type: "dialogue",
          speaker: "papa",
          value:
            " aller le voir samedi. Il sera libre dans un mois. Samedi, nous nous déciderons.",
        },
      ],
    },

    {
      id: 8,
      parts: [
        {
          type: "narration",
          value: "La petite sœur de Pierre ne ",
        },
        {
          type: "input",
          answer: "sait",
          hint: "savoir (présent)",
        },
        {
          type: "narration",
          value:
            " pas encore parler. Elle les regarde tous sans comprendre. Alors Pierre lui dit :",
        },
      ],
    },

    {
      id: 9,
      parts: [
        {
          type: "dialogue",
          speaker: "pierre",
          value: "— On va peut-être aller dans une nouvelle maison. Toi aussi, tu ",
        },
        {
          type: "input",
          answer: "auras",
          hint: "avoir (futur)",
        },
        {
          type: "dialogue",
          speaker: "pierre",
          value: " ta chambre.",
        },
      ],
    },
  ],
};
