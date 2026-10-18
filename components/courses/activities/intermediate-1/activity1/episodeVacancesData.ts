import { FillGapsData } from "@/types/fillGapsTypes";

export const episodeVacancesData: FillGapsData = {
  title: "✍️ Exercice 1 — Compléter les paroles",

  activityType: "type",

  instruction:
    "Complète les paroles de la chanson avec le verbe à la bonne forme.",

  sentences: [
    {
      id: 1,
      parts: [
        { type: "text", value: "On " },
        { type: "input", answer: "allait", hint: "aller" },
        { type: "text", value: " au bord de la mer\n\nAvec mon père, ma sœur, ma mère\nOn " },        { type: "input", answer: "regardait", hint: "regarder" },
        { type: "text", value: " les autres gens\nComme ils " },
        { type: "input", answer: "dépensaient", hint: "dépenser" },
        { type: "text", value: " leur argent.\n\nNous il " },
        { type: "input", answer: "fallait", hint: "falloir" },
        { type: "text", value: " faire attention\n\nQuand on avait payé\nLe prix d’une location\nIl ne nous " },
        { type: "input", answer: "restait", hint: "rester" },
        { type: "text", value: " pas grand-chose.\n\nAlors on " },
        { type: "input", answer: "regardait", hint: "regarder" },
        { type: "text", value: " les bateaux\nOn " },
        { type: "input", answer: "suçait", hint: "sucer" },
        { type: "text", value: " des glaces à l’eau\nLe matin on " },
        { type: "input", answer: "se réveillait", hint: "se réveiller" },
        { type: "text", value: " tôt\n\nSur la plage pendant des heures\nOn " },
        { type: "input", answer: "prenait", hint: "prendre" },
        { type: "text", value: " de belles couleurs.\n\nEt quand les vagues " },
        { type: "input", answer: "étaient", hint: "être" },
        { type: "text", value: " tranquilles\nOn " },
        { type: "input", answer: "passait", hint: "passer" },
        { type: "text", value: " la journée aux îles\nSauf quand on " },
        { type: "input", answer: "pouvait", hint: "pouvoir" },
        { type: "text", value: " déjà plus.\n\nOn " },
        { type: "input", answer: "avait", hint: "avoir" },
        { type: "text", value: " le cœur un peu gros\nMais " },
        { type: "input", answer: "c'était", hint: "être" },
        { type: "text", value: " quand même beau." },
      ],
    },
  ],
};