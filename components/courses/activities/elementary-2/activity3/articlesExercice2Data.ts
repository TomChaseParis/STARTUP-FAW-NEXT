"use client";

import { FillGapsData } from "@/types/fillGapsTypes";

export const articlesExercice2Data: FillGapsData = {
  title: "✍️ ARTICLES — Exercice 2",
  activityType: "type",

  instruction:
    "Complète avec le, la, les, un, une, des ou de.",

  verbs: [
    "le",
    "la",
    "les",
    "un",
    "une",
    "des",
    "de",
  ],

  sentences: [
    {
      id: 10,
      parts: [
        {
          type: "text",
          value:
            "La cliente : Bonjour madame, je cherche des chaussures noires pour une cérémonie.",
        },
      ],
    },

    {
      id: 11,
      parts: [
        {
          type: "text",
          value:
            "La vendeuse : Oui, vous avez vu quelque chose dans ",
        },
        { type: "input", answer: "la", hint: "article" },
        { type: "text", value: " vitrine ?" },
      ],
    },

    {
      id: 12,
      parts: [
        { type: "text", value: "La cliente : Vous avez " },
        { type: "input", answer: "un", hint: "article" },
        {
          type: "text",
          value: " modèle qui me plaît beaucoup.",
        },
      ],
    },

    {
      id: 13,
      parts: [
        { type: "text", value: "La cliente : Oui, regardez, " },
        { type: "input", answer: "les", hint: "article" },
        {
          type: "text",
          value:
            " chaussures noires plates, au milieu.",
        },
      ],
    },

    {
      id: 14,
      parts: [
        { type: "text", value: "La vendeuse : Voilà " },
        { type: "input", answer: "le", hint: "article" },
        {
          type: "text",
          value:
            " style est élégant, vous ne trouvez pas ?",
        },
      ],
    },

    {
      id: 15,
      parts: [
        {
          type: "text",
          value:
            "La vendeuse : 95 euros, mais en ce moment, nous proposons ",
        },
        { type: "input", answer: "une", hint: "article" },
        { type: "text", value: " réduction de 15 %." },
      ],
    },

    {
      id: 16,
      parts: [
        { type: "text", value: "Et nous avons aussi " },
        { type: "input", answer: "de", hint: "article" },
        { type: "text", value: " très beaux collants, c’est " },
        { type: "input", answer: "la", hint: "article" },
        {
          type: "text",
          value:
            " nouvelle collection d’hiver.",
        },
      ],
    },

    {
      id: 17,
      parts: [
        {
          type: "text",
          value:
            "Ça vous intéresse ? La cliente : Oui, volontiers, je cherche toujours ",
        },
        { type: "input", answer: "de", hint: "article" },
        {
          type: "text",
          value:
            " nouvelles idées de cadeaux.",
        },
      ],
    },

    {
      id: 18,
      parts: [
        { type: "text", value: "Vous acceptez " },
        { type: "input", answer: "les", hint: "article" },
        {
          type: "text",
          value:
            " cartes de crédit ?",
        },
      ],
    },
  ],
};