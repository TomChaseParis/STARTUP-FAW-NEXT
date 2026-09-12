"use client";

import { FillGapsData } from "@/types/fillGapsTypes";

export const conjugationExerciseData: FillGapsData = {
  verbs: [
    "Être (présent)",
    "Avoir (présent)",
  ],

  sentences: [
    {
      id: 1,
      parts: [
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Bonjour monsieur, vous vous appelez comment s’il vous plaît ?",
        },
        {
          type: "dialogue",
          speaker: "xavier",
          value:
            "Xavier : Je m’appelle Monsieur Plantu.",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Vous pouvez l’épeler s’il vous plaît ?",
        },
        {
          type: "dialogue",
          speaker: "xavier",
          value:
            "Xavier : Bien sûr. P-L-A-N-T-U.",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Merci. Et quel ",
        },
        {
          type: "input",
          answer: "est",
          hint: "être",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            " votre prénom, s’il vous plaît ?",
        },
      ],
    },

    {
      id: 2,
      parts: [
        {
          type: "dialogue",
          speaker: "xavier",
          value: "Xavier : Xavier.",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Merci. Vous ",
        },
        {
          type: "input",
          answer: "êtes",
          hint: "être",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value: " français ?",
        },
      ],
    },

    {
      id: 3,
      parts: [
        {
          type: "dialogue",
          speaker: "xavier",
          value: "Xavier : Euh non.",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Vous ",
        },
        {
          type: "input",
          answer: "êtes",
          hint: "être",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value: " d’où ?",
        },
      ],
    },

    {
      id: 4,
      parts: [
        {
          type: "dialogue",
          speaker: "xavier",
          value:
            "Xavier : Je suis canadien.",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Vous parlez très bien français.",
        },
        {
          type: "dialogue",
          speaker: "xavier",
          value: "Xavier : Merci.",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Alors, quelle ",
        },
        {
          type: "input",
          answer: "est",
          hint: "être",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            " votre date de naissance, Monsieur Plantu ?",
        },
      ],
    },

    {
      id: 5,
      parts: [
        {
          type: "dialogue",
          speaker: "xavier",
          value:
            "Xavier : Je suis né le 24 mars 1980.",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Donc, voyons, vous ",
        },
        {
          type: "input",
          answer: "avez",
          hint: "avoir",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value: " quel âge ?",
        },
      ],
    },

    {
      id: 6,
      parts: [
        {
          type: "dialogue",
          speaker: "xavier",
          value:
            "Xavier : J’ai 46 ans.",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Vous ne les faites pas.",
        },
        {
          type: "dialogue",
          speaker: "xavier",
          value: "Xavier : Merci.",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Quel ",
        },
        {
          type: "input",
          answer: "est",
          hint: "être",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            " votre état civil ? Vous êtes célibataire ? Marié ? Divorcé ? Veuf ?",
        },
      ],
    },

    {
      id: 7,
      parts: [
        {
          type: "dialogue",
          speaker: "xavier",
          value: "Xavier : Je ",
        },
        {
          type: "input",
          answer: "suis",
          hint: "être",
        },
        {
          type: "dialogue",
          speaker: "xavier",
          value: " divorcé.",
        },
      ],
    },

    {
      id: 8,
      parts: [
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Très bien. Vous ",
        },
        {
          type: "input",
          answer: "avez",
          hint: "avoir",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value: " des enfants ?",
        },
      ],
    },

    {
      id: 9,
      parts: [
        {
          type: "dialogue",
          speaker: "xavier",
          value: "Xavier : Oui. J’",
        },
        {
          type: "input",
          answer: "ai",
          hint: "avoir",
        },
        {
          type: "dialogue",
          speaker: "xavier",
          value:
            " deux enfants, une fille de douze ans et un garçon de neuf ans.",
        },
      ],
    },

    {
      id: 10,
      parts: [
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Vous faites quoi dans la vie, monsieur Plantu ?",
        },
        {
          type: "dialogue",
          speaker: "xavier",
          value: "Xavier : Je ",
        },
        {
          type: "input",
          answer: "suis",
          hint: "être",
        },
        {
          type: "dialogue",
          speaker: "xavier",
          value: " ingénieur.",
        },
      ],
    },

    {
      id: 11,
      parts: [
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Très bien. Quelle ",
        },
        {
          type: "input",
          answer: "est",
          hint: "être",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            " votre adresse, s’il vous plaît ?",
        },
      ],
    },

    {
      id: 12,
      parts: [
        {
          type: "dialogue",
          speaker: "xavier",
          value:
            "Xavier : J’habite à Paris, au 34 rue des entrepreneurs.",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Le code postal, s’il vous plaît ?",
        },
        {
          type: "dialogue",
          speaker: "xavier",
          value: "Xavier : 75006.",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Merci. Quel ",
        },
        {
          type: "input",
          answer: "est",
          hint: "être",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            " votre numéro de téléphone ?",
        },
      ],
    },

    {
      id: 13,
      parts: [
        {
          type: "dialogue",
          speaker: "xavier",
          value:
            "Xavier : Mon portable ou mon fixe ?",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Les deux.",
        },
        {
          type: "dialogue",
          speaker: "xavier",
          value:
            "Xavier : Alors le portable, c’est 06 32 15 45 30. Et le fixe : 01 20 00 76 88.",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Vous ",
        },
        {
          type: "input",
          answer: "avez",
          hint: "avoir",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            " une adresse email ?",
        },
      ],
    },

    {
      id: 14,
      parts: [
        {
          type: "dialogue",
          speaker: "xavier",
          value: "Xavier : Oui, c’",
        },
        {
          type: "input",
          answer: "est",
          hint: "être",
        },
        {
          type: "dialogue",
          speaker: "xavier",
          value:
            " plantu.xavier@gmail.com.",
        },
      ],
    },

    {
      id: 15,
      parts: [
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            "L’agence matrimoniale : Qu’est-ce que vous aimez faire pendant votre temps libre ? Vous ",
        },
        {
          type: "input",
          answer: "avez",
          hint: "avoir",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value:
            " des hobbies ?",
        },
      ],
    },
  ],
};