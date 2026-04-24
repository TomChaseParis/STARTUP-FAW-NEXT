"use client";

import { FillGapsData } from "@/types/fillGapsTypes";

export const articlesData: FillGapsData = {
  title: "✍️ ARTICLES — Défini / Indéfini",
  activityType: "type",

  instruction:
    "Complète avec le, la, l’, les, un, une, des ou de.",

  verbs: [
    "le",
    "la",
    "l’",
    "les",
    "un",
    "une",
    "des",
    "de",
  ],

  sentences: [
    {
      id: 1,
      parts: [
        {
          type: "text",
          value:
            "Mme Legrand : Alors, mon chéri, tu as passé une bonne journée ?",
        },
      ],
    },

    {
      id: 2,
      parts: [
        { type: "text", value: "Hector : Pas vraiment. J’ai eu " },
        { type: "input", answer: "des", hint: "article" },
        { type: "text", value: " problèmes avec " },
        { type: "input", answer: "le", hint: "article" },
        { type: "text", value: " professeur de français." },
      ],
    },

    {
      id: 3,
      parts: [
        { type: "text", value: "Mme Legrand : " },
        { type: "input", answer: "des", hint: "article" },
        { type: "text", value: " problèmes graves ?" },
      ],
    },

    {
      id: 4,
      parts: [
        { type: "text", value: "Hector : En fait, j’ai eu " },
        { type: "input", answer: "une", hint: "article" },
        { type: "text", value: " très mauvaise note : 4 sur 20." },
      ],
    },

    {
      id: 5,
      parts: [
        {
          type: "text",
          value:
            "Mme Legrand : Oh là là, tu as raison, c’est très mauvais ! Et c’est ",
        },
        { type: "input", answer: "la", hint: "article" },
        { type: "text", value: " dernière note avant " },
        { type: "input", answer: "l’", hint: "article" },
        { type: "text", value: " examen ?" },
      ],
    },

    {
      id: 6,
      parts: [{ type: "text", value: "Hector : Oui." }],
    },

    {
      id: 7,
      parts: [
        {
          type: "text",
          value:
            "Mme Legrand : Eh bien, j’espère que tu auras ",
        },
        { type: "input", answer: "un", hint: "article" },
        { type: "text", value: " meilleur résultat à " },
        { type: "input", answer: "la", hint: "article" },
        { type: "text", value: " fin de " },
        { type: "input", answer: "l’", hint: "article" },
        { type: "text", value: " année !" },
      ],
    },

    {
      id: 8,
      parts: [
        { type: "text", value: "Hector : Mais tu sais, " },
        { type: "input", answer: "les", hint: "article" },
        { type: "text", value: " autres élèves, ils ont eu " },
        { type: "input", answer: "une", hint: "article" },
        {
          type: "text",
          value: " note catastrophique aussi.",
        },
      ],
    },

    {
      id: 9,
      parts: [{ type: "text", value: "Mme Legrand : Vraiment ?" }],
    },


  ],
};