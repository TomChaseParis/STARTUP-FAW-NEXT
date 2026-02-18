import { Question } from "@/hooks/useQuizEngine";

export const quizData: Question[] = [
  {
    id: 1,
    question: "Avec qui le chanteur passait-il ses vacances ?",
    choices: [
      {
        id: "A",
        label: "Avec des amis de sa classe",
        isCorrect: false,
        explanation: "La chanson ne parle jamais d’amis.",
      },
      {
        id: "B",
        label: "Il était en colonie de vacances",
        isCorrect: false,
        explanation: "Il n’est pas question d’une colonie.",
      },
      {
        id: "C",
        label: "Avec sa famille",
        isCorrect: true,
        explanation: "Il évoque clairement ses parents et sa sœur.",
      },
    ],
  },
  {
    id: 2,
    question: "Est-ce que sa famille avait de l’argent ?",
    choices: [
      {
        id: "A",
        label: "Oui, sa famille était très riche",
        isCorrect: false,
        explanation: "La famille devait faire attention à ses dépenses.",
      },
      {
        id: "B",
        label: "Non, ses parents n’avaient pas beaucoup d’argent",
        isCorrect: true,
        explanation: "Ils surveillaient leurs dépenses pendant les vacances.",
      },
    ],
  },
  {
    id: 3,
    question:
      "Quelles étaient les activités de la famille pendant les vacances ?",
    choices: [
      {
        id: "A",
        label: "Ils faisaient du bateau tous les jours",
        isCorrect: false,
        explanation:
          "Le bateau n’est pas présenté comme une activité principale.",
      },
      {
        id: "B",
        label: "Ils allaient surtout à la plage",
        isCorrect: true,
        explanation:
          "La plage est décrite comme le lieu central des journées.",
      },
      {
        id: "C",
        label: "Ils restaient à l’hôtel toute la journée",
        isCorrect: false,
        explanation: "Ils passaient leurs journées dehors.",
      },
    ],
  },
  {
    id: 4,
    question:
      "Est-ce que la famille aimait bien rester tard au lit le matin ?",
    choices: [
      {
        id: "A",
        label: "Non, ils préféraient profiter de leur journée",
        isCorrect: true,
        explanation: "Ils se levaient tôt pour profiter de la journée.",
      },
      {
        id: "B",
        label: "Oui, ils ne sortaient jamais avant midi",
        isCorrect: false,
        explanation: "C’est l’inverse qui est décrit.",
      },
      {
        id: "C",
        label: "Oui, ils dormaient jusqu’à midi",
        isCorrect: false,
        explanation: "Ils se réveillaient tôt le matin.",
      },
    ],
  },
  {
    id: 5,
    question:
      "Quelles étaient les deux conditions pour aller aux îles ?",
    choices: [
      {
        id: "A",
        label: "Trouver un bateau qui accepte tout le monde",
        isCorrect: false,
        explanation: "Ce n’est pas évoqué dans la chanson.",
      },
      {
        id: "B",
        label: "De bonnes conditions météo et ne rien avoir à faire",
        isCorrect: false,
        explanation: "Il manquait une condition importante.",
      },
      {
        id: "C",
        label:
          "De bonnes conditions météo et avoir suffisamment d’argent",
        isCorrect: true,
        explanation:
          "La météo et l’argent étaient déterminants.",
      },
    ],
  },
];
