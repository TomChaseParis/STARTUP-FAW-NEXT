"use client";

import { FillGapsData } from "@/types/fillGapsTypes";

export const fourVerbsData: FillGapsData = {
  activityType: "type",

  instruction:
    "Complète les phrases avec un des verbes au présent : devoir, vouloir, pouvoir, savoir.",

  verbs: [
    "devoir",
    "vouloir",
    "pouvoir",
    "savoir",
  ],

  sentences: [
    {
      id: 1,
      parts: [
        { type: "text", value: "Pourquoi tu restes là, il fait froid ! Je " },
        { type: "input", answer: "veux", hint: "vouloir" },
        { type: "text", value: " téléphoner, mais la cabine est occupée." },
      ],
    },

    {
      id: 2,
      parts: [
        { type: "text", value: "Pardon Monsieur, je " },
        { type: "input", answer: "veux", hint: "vouloir" },
        { type: "text", value: " aller à Lille, mais je ne " },
        { type: "input", answer: "sais", hint: "savoir" },
        { type: "text", value: " pas où est la gare du Nord." },
      ],
    },

    {
      id: 3,
      parts: [
        { type: "text", value: "Vous " },
        { type: "input", answer: "voulez", hint: "vouloir" },
        { type: "text", value: " un carnet de tickets ou un pass navigo ? Je " },
        { type: "input", answer: "veux", hint: "vouloir" },
        { type: "text", value: " un pass navigo, c’est plus pratique." },
      ],
    },

    {
      id: 4,
      parts: [
        { type: "text", value: "En France, on " },
        { type: "input", answer: "doit", hint: "devoir" },
        { type: "text", value: " rouler à gauche ou à droite ?" },
      ],
    },

    {
      id: 5,
      parts: [
        { type: "text", value: "Tu " },
        { type: "input", answer: "sais", hint: "savoir" },
        { type: "text", value: " où est l’université de Paris III ? Oui, tu " },
        { type: "input", answer: "peux", hint: "pouvoir" },
        { type: "text", value: " prendre le métro jusqu’à Censier Daubenton." },
      ],
    },

    {
      id: 6,
      parts: [
        { type: "text", value: "Je " },
        { type: "input", answer: "veux", hint: "vouloir" },
        { type: "text", value: " ouvrir un compte en banque. Alors, tu " },
        { type: "input", answer: "dois", hint: "devoir" },
        { type: "text", value: " montrer une pièce d’identité." },
      ],
    },

    {
      id: 7,
      parts: [
        { type: "text", value: "Dans le métro je " },
        { type: "input", answer: "dois", hint: "devoir" },
        { type: "text", value: " garder mon ticket ?" },
      ],
    },

    {
      id: 8,
      parts: [
        { type: "text", value: "Où allez-vous ? Je " },
        { type: "input", answer: "vais", hint: "aller (piège toléré)" },
        { type: "text", value: " aller à la poste pour envoyer un colis." },
      ],
    },

    {
      id: 9,
      parts: [
        { type: "text", value: "Vous avez des photos d’identité ? Non. Alors vous " },
        { type: "input", answer: "devez", hint: "devoir" },
        { type: "text", value: " revenir avec deux photos." },
      ],
    },

    {
      id: 10,
      parts: [
        { type: "text", value: "Comment ! Vous avez un billet de seconde classe ! Alors, vous " },
        { type: "input", answer: "devez", hint: "devoir" },
        { type: "text", value: " monter en seconde classe, pas en première ! Vous " },
        { type: "input", answer: "devez", hint: "devoir" },
        { type: "text", value: " payer une contravention de 50 euros." },
      ],
    },

    {
      id: 11,
      parts: [
        { type: "text", value: "Désolé, mais sans passeport, vous ne " },
        { type: "input", answer: "pouvez", hint: "pouvoir" },
        { type: "text", value: " pas entrer au Japon." },
      ],
    },

    {
      id: 12,
      parts: [
        { type: "text", value: "J’ai trouvé un travail avec un salaire de 1300 euros. Tu sais, avec 1300 euros par mois, on ne " },
        { type: "input", answer: "peut", hint: "pouvoir" },
        { type: "text", value: " pas vivre facilement à Paris." },
      ],
    },

    {
      id: 13,
      parts: [
        { type: "text", value: "Le feu est vert, tu " },
        { type: "input", answer: "peux", hint: "pouvoir" },
        { type: "text", value: " avancer !" },
      ],
    },

    {
      id: 14,
      parts: [
        { type: "text", value: "Je " },
        { type: "input", answer: "peux", hint: "pouvoir" },
        { type: "text", value: " prendre cette rue ? Ah non ! Tu ne " },
        { type: "input", answer: "peux", hint: "pouvoir" },
        { type: "text", value: " pas passer, c’est interdit !" },
      ],
    },
  ],
};