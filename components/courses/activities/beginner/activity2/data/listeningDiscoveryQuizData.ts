import { Question } from "@/hooks/useQuizEngine";

export const listeningDiscoveryQuizData: Question[] = [
  {
    id: 1,
    question: "Comment s'appelle l'homme qui se présente ?",
    choices: [
      {
        id: "a",
        label: "Xavier Plantu",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Pierre Martin",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Jean Dupont",
        isCorrect: false,
      },
    ],
  },

  {
    id: 2,
    question: "Quelle est sa nationalité ?",
    choices: [
      {
        id: "a",
        label: "Française",
        isCorrect: false,
      },
      {
        id: "b",
        label: "Canadienne",
        isCorrect: true,
      },
      {
        id: "c",
        label: "Belge",
        isCorrect: false,
      },
    ],
  },

  {
    id: 3,
    question: "Quel âge a Xavier ?",
    choices: [
      {
        id: "a",
        label: "36 ans",
        isCorrect: false,
      },
      {
        id: "b",
        label: "40 ans",
        isCorrect: false,
      },
      {
        id: "c",
        label: "46 ans",
        isCorrect: true,
      },
    ],
  },

  {
    id: 4,
    question: "Quel est son métier ?",
    choices: [
      {
        id: "a",
        label: "Ingénieur",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Professeur",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Médecin",
        isCorrect: false,
      },
    ],
  },

  {
    id: 5,
    question: "Que recherche Xavier ?",
    choices: [
      {
        id: "a",
        label: "Un emploi",
        isCorrect: false,
      },
      {
        id: "b",
        label: "Une femme sportive et sympathique",
        isCorrect: true,
      },
      {
        id: "c",
        label: "Un appartement à Paris",
        isCorrect: false,
      },
    ],
  },
];