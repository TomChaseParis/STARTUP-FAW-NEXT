"use client";

import { FillGapsData } from "@/types/fillGapsTypes";

export const episode2Data: FillGapsData = {
  title: "✍️ EPISODE 2 — L’agence matrimoniale",

  activityType: "type",

  instruction:
    "Complète le dialogue avec le bon verbe au présent.",

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
            "L’agence matrimoniale : Bonjour monsieur, vous vous appelez comment s’il vous plaît ?\nFabien : Je m’appelle Monsieur Delpêche.\nL’agence matrimoniale : Vous pouvez l’épeler s’il vous plaît ?\nFabien : Bien sûr. D-E-L-P-E accent circonflexe – C-H-E.\nL’agence matrimoniale : Merci. Et quel ",
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
        { type: "text", value: "Fabien : Fabien.\nL’agence matrimoniale : Merci. Vous " },
        { type: "input", answer: "êtes", hint: "être" },
        { type: "text", value: " français ?" },
      ],
    },

    {
      id: 3,
      parts: [
        { type: "text", value: "Fabien : Euh non.\nL’agence matrimoniale : Vous " },
        { type: "input", answer: "êtes", hint: "être" },
        { type: "text", value: " d’où ?" },
      ],
    },

    {
      id: 4,
      parts: [
        {
          type: "text",
          value:
            "Fabien : Je suis canadien.\nL’agence matrimoniale : Vous parlez très bien français.\nFabien : Merci.\nL’agence matrimoniale : Alors, quelle ",
        },
        { type: "input", answer: "est", hint: "être" },
        {
          type: "text",
          value: " votre date de naissance, Monsieur Delpêche ?",
        },
      ],
    },

    {
      id: 5,
      parts: [
        {
          type: "text",
          value:
            "Fabien : Je suis né le 24 mars 1965.\nL’agence matrimoniale : Donc, voyons, vous ",
        },
        { type: "input", answer: "avez", hint: "avoir" },
        { type: "text", value: " quel âge ?" },
      ],
    },

    {
      id: 6,
      parts: [
        {
          type: "text",
          value:
            "Fabien : J’ai 47 ans.\nL’agence matrimoniale : Vous ne les faites pas.\nFabien : Merci.\nL’agence matrimoniale : Quel ",
        },
        { type: "input", answer: "est", hint: "être" },
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
        { type: "text", value: "Fabien : Je " },
        { type: "input", answer: "suis", hint: "être" },
        { type: "text", value: " divorcé." },
      ],
    },

    {
      id: 8,
      parts: [
        { type: "text", value: "L’agence matrimoniale : Très bien. Vous " },
        { type: "input", answer: "avez", hint: "avoir" },
        { type: "text", value: " des enfants ?" },
      ],
    },

    {
      id: 9,
      parts: [
        { type: "text", value: "Fabien : Oui. J’" },
        { type: "input", answer: "ai", hint: "avoir" },
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
            "L’agence matrimoniale : Vous faites quoi dans la vie, monsieur Delpêche ?\nFabien : Je ",
        },
        { type: "input", answer: "suis", hint: "être" },
        { type: "text", value: " ingénieur." },
      ],
    },

    {
      id: 11,
      parts: [
        { type: "text", value: "L’agence matrimoniale : Très bien. Quelle " },
        { type: "input", answer: "est", hint: "être" },
        { type: "text", value: " votre adresse, s’il vous plaît ?" },
      ],
    },

    {
      id: 12,
      parts: [
        {
          type: "text",
          value:
            "Fabien : J’habite à Paris, au 45 rue Vaugirard. Deuxième étage, porte B.\nL’agence matrimoniale : Le code postal, s’il vous plaît ?\nFabien : 75006.\nL’agence matrimoniale : Merci. Quel ",
        },
        { type: "input", answer: "est", hint: "être" },
        { type: "text", value: " votre numéro de téléphone ?" },
      ],
    },

    {
      id: 13,
      parts: [
        {
          type: "text",
          value:
            "Fabien : Mon portable ou mon fixe ?\nL’agence matrimoniale : Les deux.\nFabien : Alors le portable, c’est 06 23 92 62 34. Et le fixe : 01 20 00 76 88.\nL’agence matrimoniale : Vous ",
        },
        { type: "input", answer: "avez", hint: "avoir" },
        { type: "text", value: " une adresse email ?" },
      ],
    },

    {
      id: 14,
      parts: [
        { type: "text", value: "Fabien : Oui, c’" },
        { type: "input", answer: "est", hint: "être" },
        { type: "text", value: " delpêche23@yahoo.fr." },
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
        { type: "input", answer: "avez", hint: "avoir" },
        { type: "text", value: " des hobbies ?" },
      ],
    },

    {
      id: 16,
      parts: [
        {
          type: "text",
          value:
            "Fabien : J’aime la musique et le sport.\nL’agence matrimoniale : Très bien. Alors voyons, vous cherchez une femme d’environ 30 ans, mince, plutôt blonde, sympathique et sportive.",
        },
      ],
    },
  ],
};