"use client";

import { FillGapsData } from "@/types/fillGapsTypes";

export const episodeAppartementData: FillGapsData = {
  title: "✍️ EPISODE 2.2 — Compléte avec les mots manquants",

  instruction:
    `« LE DEMENAGEMENT » > les mots surlignés en rouge sont
    mal écrits : écoutez le texte, puis réécrivez-les avec la bonne
    orthographe`,

  sentences: [
    {
      id: 1,
      parts: [
        { type: "text", value: "Dans la rue du Lac, on remarque facilement l’" },
        { type: "input", answer: "immeuble" },
        { type: "text", value: " neuf. Pierre est étonné : que de " },
        { type: "input", answer: "fenêtres" },
        { type: "text", value: " !" },
      ],
    },

    {
      id: 2,
      parts: [
        {
          type: "text",
          value:
            "Une dame les attend pour la visite. Maman appelle l’",
        },
        { type: "input", answer: "ascenseur" },
        {
          type: "text",
          value:
            ". Toute la famille monte jusqu’au deuxième étage. La dame ouvre une ",
        },
        { type: "input", answer: "porte" },
        { type: "text", value: " et dit :" },
      ],
    },

    {
      id: 3,
      parts: [
        {
          type: "text",
          value:
            "Voilà la ",
        },
        { type: "input", answer: "cuisine" },
        { type: "text", value: " et son " },
        { type: "input", answer: "balcon" },
        {
          type: "text",
          value:
            ", la salle à manger et le salon, la ",
        },
        { type: "input", answer: "salle de bain" },
        { type: "text", value: ", les " },
        { type: "input", answer: "toilettes" },
        {
          type: "text",
          value:
            ", les trois chambres.",
        },
      ],
    },

    {
      id: 4,
      parts: [
        {
          type: "text",
          value:
            "Pierre demande à papa : Où sera ma ",
        },
        { type: "input", answer: "chambre" },
        {
          type: "text",
          value:
            " ? Je voudrais bien la bleue.",
        },
      ],
    },

    {
      id: 5,
      parts: [
        {
          type: "text",
          value:
            "La dame continue : En bas, vous avez un ",
        },
        { type: "input", answer: "jardin" },
        {
          type: "text",
          value:
            " avec des jeux pour les enfants. Le ",
        },
        { type: "input", answer: "centre commercial" },
        {
          type: "text",
          value:
            " est à cinq minutes, tout près de l’école.",
        },
      ],
    },
  ],
};