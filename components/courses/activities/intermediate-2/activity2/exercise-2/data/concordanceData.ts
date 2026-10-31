import type { TransformationCardsData } from "@/types/transformationCardsTypes";

const concordanceData: TransformationCardsData = {
  title: "La concordance des temps",
  instruction:
    "Transforme les questions au discours indirect. Fais attention à la concordance des temps lorsque le verbe introducteur est à l'imparfait.",

  cards: [
    {
      id: "concordance-1",
      example: [
        { type: "text", value: "« Avec qui " },
        { type: "highlight", value: "es-tu sorti" },
        { type: "text", value: " hier ? »" },
      ],
      target: [
        {
          type: "text",
          value: "Ma petite amie me demandait toujours avec qui ",
        },
        {
          type: "input",
          id: "concordance-answer-1",
          answers: ["j’étais sorti"],
          hint: "Passé composé → plus-que-parfait",
        },
        { type: "text", value: " la veille." },
      ],
    },
    {
      id: "concordance-2",
      example: [
        { type: "text", value: "« Qu' " },
        { type: "highlight", value: "as-tu" },
        {
          type: "text",
          value: " l'intention de faire quand tu ",
        },
        { type: "highlight", value: "auras fini" },
        { type: "text", value: " ton stage ? »" },
      ],
      target: [
        {
          type: "text",
          value: "Ma responsable de stage me demandait toujours ce que ",
        },
        {
          type: "input",
          id: "concordance-answer-2",
          answers: ["j’avais"],
          hint: "Présent → imparfait",
        },
        {
          type: "text",
          value: " l’intention de faire quand ",
        },
        {
          type: "input",
          id: "concordance-answer-3",
          answers: ["j’aurais fini"],
          hint: "Futur antérieur → conditionnel passé",
        },
        { type: "text", value: " mon stage." },
      ],
    },
    {
      id: "concordance-3",
      example: [
        { type: "text", value: "« " },
        { type: "highlight", value: "As-tu utilisé" },
        {
          type: "text",
          value: " ChatGPT pour taper ton rapport de stage ? »",
        },
      ],
      target: [
        {
          type: "text",
          value: "Ma responsable de stage se demandait toujours si ",
        },
        {
          type: "input",
          id: "concordance-answer-4",
          answers: ["j’avais utilisé"],
          hint: "Passé composé → plus-que-parfait",
        },
        {
          type: "text",
          value: " ChatGPT pour taper mon rapport de stage.",
        },
      ],
    },
    {
      id: "concordance-4",
      example: [
        { type: "text", value: "« À quel moment " },
        { type: "highlight", value: "te décideras-tu" },
        {
          type: "text",
          value: " enfin à partir de chez nous ? »",
        },
      ],
      target: [
        {
          type: "text",
          value: "Mes parents avaient l’habitude de me demander à quel moment ",
        },
        {
          type: "input",
          id: "concordance-answer-5",
          answers: ["je me déciderais"],
          hint: "Futur → conditionnel présent",
        },
        {
          type: "text",
          value: " enfin à partir de chez eux.",
        },
      ],
    },
    {
      id: "concordance-5",
      example: [
        { type: "text", value: "« " },
        { type: "highlight", value: "As-tu" },
        {
          type: "text",
          value: " le moindre intérêt pour ton parcours universitaire ? »",
        },
      ],
      target: [
        {
          type: "text",
          value: "Mon professeur me demandait souvent si ",
        },
        {
          type: "input",
          id: "concordance-answer-6",
          answers: ["j’avais"],
          hint: "Présent → imparfait",
        },
        {
          type: "text",
          value: " le moindre intérêt pour mon parcours universitaire.",
        },
      ],
    },
    {
      id: "concordance-6",
      example: [
        { type: "text", value: "« " },
        { type: "highlight", value: "Es-tu" },
        {
          type: "text",
          value: " vraiment heureux avec moi ? »",
        },
      ],
      target: [
        {
          type: "text",
          value: "Ma petite amie passait son temps à me demander si ",
        },
        {
          type: "input",
          id: "concordance-answer-7",
          answers: ["j’étais"],
          hint: "Présent → imparfait",
        },
        {
          type: "text",
          value: " vraiment heureux avec elle.",
        },
      ],
    },
    {
      id: "concordance-7",
      example: [
        { type: "text", value: "« " },
        { type: "highlight", value: "As-tu compris" },
        {
          type: "text",
          value: " ma dernière leçon ? »",
        },
      ],
      target: [
        {
          type: "text",
          value: "Mon professeur me demandait à chaque cours si ",
        },
        {
          type: "input",
          id: "concordance-answer-8",
          answers: ["j’avais compris"],
          hint: "Passé composé → plus-que-parfait",
        },
        { type: "text", value: " sa dernière leçon." },
      ],
    },
    {
      id: "concordance-8",
      example: [
        { type: "text", value: "« " },
        { type: "highlight", value: "Peux-tu" },
        {
          type: "text",
          value: " lâcher ton ordinateur pour cinq minutes ? »",
        },
      ],
      target: [
        {
          type: "text",
          value: "Mes parents me demandaient tous les jours si ",
        },
        {
          type: "input",
          id: "concordance-answer-9",
          answers: ["je pouvais"],
          hint: "Présent → imparfait",
        },
        {
          type: "text",
          value: " lâcher mon ordinateur pour cinq minutes.",
        },
      ],
    },
  ],
};

export default concordanceData;