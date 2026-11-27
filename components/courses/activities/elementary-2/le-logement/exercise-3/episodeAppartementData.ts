
import { FillGapsData } from "@/types/fillGapsTypes";

export const episodeAppartementData: FillGapsData = {
  title: "EPISODE 2.2",

  activityType: "type",

  instruction:
    "« LE DÉMÉNAGEMENT » : les mots surlignés en rouge sont mal écrits. Écoute le texte, puis réécris-les avec la bonne orthographe.",

  sentences: [
    {
      id: 1,
      parts: [
        {
          type: "narration",
          value: "Dans la rue du Lac, on remarque facilement l’",
        },
        {
          type: "input",
          answer: "immeuble",
          hint: "Nom masculin",
        },
        {
          type: "narration",
          value: " neuf. Pierre est étonné : que de ",
        },
        {
          type: "input",
          answer: "fenêtres",
          hint: "Nom féminin pluriel",
        },
        {
          type: "narration",
          value: " !",
        },
      ],
    },

    {
      id: 2,
      parts: [
        {
          type: "narration",
          value: "Une dame les attend pour la visite. Maman appelle l’",
        },
        {
          type: "input",
          answer: "ascenseur",
          hint: "Nom masculin",
        },
        {
          type: "narration",
          value:
            ". Toute la famille monte jusqu’au deuxième étage. La dame ouvre une ",
        },
        {
          type: "input",
          answer: "porte",
          hint: "Nom féminin",
        },
        {
          type: "narration",
          value: " et dit :",
        },
      ],
    },

    {
      id: 3,
      parts: [
        {
          type: "dialogue",
          speaker: "conseillere",
          value: "Voilà la ",
        },
        {
          type: "input",
          answer: "cuisine",
          hint: "Nom féminin",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value: " et son ",
        },
        {
          type: "input",
          answer: "balcon",
          hint: "Nom masculin",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value: ", la salle à manger et le salon, la ",
        },
        {
          type: "input",
          answer: "salle de bain",
          hint: "Nom féminin",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value: ", les ",
        },
        {
          type: "input",
          answer: "toilettes",
          hint: "Nom féminin pluriel",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value: ", les trois chambres.",
        },
      ],
    },

    {
      id: 4,
      parts: [
        {
          type: "narration",
          value: "Pierre demande à papa : ",
        },
        {
          type: "dialogue",
          speaker: "pierre",
          value: "Où sera ma ",
        },
        {
          type: "input",
          answer: "chambre",
          hint: "Nom féminin",
        },
        {
          type: "dialogue",
          speaker: "pierre",
          value: " ? Je voudrais bien la bleue.",
        },
      ],
    },

    {
      id: 5,
      parts: [
        {
          type: "narration",
          value: "La dame continue : ",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value: "En bas, vous avez un ",
        },
        {
          type: "input",
          answer: "jardin",
          hint: "Nom masculin",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value: " avec des jeux pour les enfants. Le ",
        },
        {
          type: "input",
          answer: "centre commercial",
          hint: "Nom masculin",
        },
        {
          type: "dialogue",
          speaker: "conseillere",
          value: " est à cinq minutes, tout près de l’école.",
        },
      ],
    },
  ],
};
