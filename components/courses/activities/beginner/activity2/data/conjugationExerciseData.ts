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
          type: "text",
          value:
            "L’agence matrimoniale : Bonjour monsieur, vous vous appelez comment s’il vous plaît ?\nXavier : Je m’appelle Monsieur Plantu.\nL’agence matrimoniale : Vous pouvez l’épeler s’il vous plaît ?\nXavier : Bien sûr. P-L-A-N-T-U.\nL’agence matrimoniale : Merci. Et quel ",
        },
        {
          type: "input",
          answer: "est",
          hint: "être",
        },
        {
          type: "text",
          value: " votre prénom, s’il vous plaît ?",
        },
      ],
    },

    {
      id: 2,
      parts: [
        {
          type: "text",
          value:
            "Xavier : Xavier.\nL’agence matrimoniale : Merci. Vous ",
        },
        {
          type: "input",
          answer: "êtes",
          hint: "être",
        },
        {
          type: "text",
          value: " français ?",
        },
      ],
    },

    {
      id: 3,
      parts: [
        {
          type: "text",
          value:
            "Xavier : Euh non.\nL’agence matrimoniale : Vous ",
        },
        {
          type: "input",
          answer: "êtes",
          hint: "être",
        },
        {
          type: "text",
          value: " d’où ?",
        },
      ],
    },

    {
      id: 4,
      parts: [
        {
          type: "text",
          value:
            "Xavier : Je suis canadien.\nL’agence matrimoniale : Vous parlez très bien français.\nXavier : Merci.\nL’agence matrimoniale : Alors, quelle ",
        },
        {
          type: "input",
          answer: "est",
          hint: "être",
        },
        {
          type: "text",
          value: " votre date de naissance, Monsieur Plantu ?",
        },
      ],
    },

    {
      id: 5,
      parts: [
        {
          type: "text",
          value:
            "Xavier : Je suis né le 24 mars 1980.\nL’agence matrimoniale : Donc, voyons, vous ",
        },
        {
          type: "input",
          answer: "avez",
          hint: "avoir",
        },
        {
          type: "text",
          value: " quel âge ?",
        },
      ],
    },

    {
      id: 6,
      parts: [
        {
          type: "text",
          value:
            "Xavier : J’ai 46 ans.\nL’agence matrimoniale : Vous ne les faites pas.\nXavier : Merci.\nL’agence matrimoniale : Quel ",
        },
        {
          type: "input",
          answer: "est",
          hint: "être",
        },
        {
          type: "text",
          value:
            " votre état civil ? Vous êtes célibataire ? Marié ? Divorcé ? Veuf ?",
        },
      ],
    },

    {
      id: 7,
      parts: [
        {
          type: "text",
          value: "Xavier : Je ",
        },
        {
          type: "input",
          answer: "suis",
          hint: "être",
        },
        {
          type: "text",
          value: " divorcé.",
        },
      ],
    },

    {
      id: 8,
      parts: [
        {
          type: "text",
          value: "L’agence matrimoniale : Très bien. Vous ",
        },
        {
          type: "input",
          answer: "avez",
          hint: "avoir",
        },
        {
          type: "text",
          value: " des enfants ?",
        },
      ],
    },

    {
      id: 9,
      parts: [
        {
          type: "text",
          value: "Xavier : Oui. J’",
        },
        {
          type: "input",
          answer: "ai",
          hint: "avoir",
        },
        {
          type: "text",
          value:
            " deux enfants, une fille de douze ans et un garçon de neuf ans.",
        },
      ],
    },

    {
      id: 10,
      parts: [
        {
          type: "text",
          value:
            "L’agence matrimoniale : Vous faites quoi dans la vie, monsieur Plantu ?\nXavier : Je ",
        },
        {
          type: "input",
          answer: "suis",
          hint: "être",
        },
        {
          type: "text",
          value: " ingénieur.",
        },
      ],
    },

    {
      id: 11,
      parts: [
        {
          type: "text",
          value: "L’agence matrimoniale : Très bien. Quelle ",
        },
        {
          type: "input",
          answer: "est",
          hint: "être",
        },
        {
          type: "text",
          value: " votre adresse, s’il vous plaît ?",
        },
      ],
    },

    {
      id: 12,
      parts: [
        {
          type: "text",
          value:
            "Xavier : J’habite à Paris, au 34 rue des entrepreneurs.\nL’agence matrimoniale : Le code postal, s’il vous plaît ?\nXavier : 75006.\nL’agence matrimoniale : Merci. Quel ",
        },
        {
          type: "input",
          answer: "est",
          hint: "être",
        },
        {
          type: "text",
          value: " votre numéro de téléphone ?",
        },
      ],
    },

    {
      id: 13,
      parts: [
        {
          type: "text",
          value:
            "Xavier : Mon portable ou mon fixe ?\nL’agence matrimoniale : Les deux.\nXavier : Alors le portable, c’est 06 32 15 45 30. Et le fixe : 01 20 00 76 88.\nL’agence matrimoniale : Vous ",
        },
        {
          type: "input",
          answer: "avez",
          hint: "avoir",
        },
        {
          type: "text",
          value: " une adresse email ?",
        },
      ],
    },

    {
      id: 14,
      parts: [
        {
          type: "text",
          value: "Xavier : Oui, c’",
        },
        {
          type: "input",
          answer: "est",
          hint: "être",
        },
        {
          type: "text",
          value: " plantu.xavier@gmail.com.",
        },
      ],
    },

    {
      id: 15,
      parts: [
        {
          type: "text",
          value:
            "L’agence matrimoniale : Qu’est-ce que vous aimez faire pendant votre temps libre ? Vous ",
        },
        {
          type: "input",
          answer: "avez",
          hint: "avoir",
        },
        {
          type: "text",
          value: " des hobbies ?",
        },
      ],
    },

  
  ],
};