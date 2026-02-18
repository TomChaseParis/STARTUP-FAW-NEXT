import { Question } from "@/hooks/useQuizEngine";

export const quizData: Question[] = [
  {
    id: 1,
    question: "Qu’est-ce qu’ils font ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/tennis.png",
    choices: [
      {
        id: "A",
        label: "Ils font du judo",
        isCorrect: false,
        explanation: "On voit clairement qu’ils ne pratiquent pas le judo.",
      },
      {
        id: "B",
        label: "Ils font du ping-pong",
        isCorrect: false,
        explanation: "Ce n’est pas du ping-pong.",
      },
      {
        id: "C",
        label: "Ils font du tennis",
        isCorrect: true,
        explanation: "Bonne réponse : ils jouent au tennis.",
      },
    ],
  },
  {
    id: 2,
    question: "Qu’est-ce qu’elles mangent ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/pizza.png",
    choices: [
      {
        id: "A",
        label: "Elles mangent une ratatouille",
        isCorrect: false,
        explanation: "Ce n’est pas une ratatouille.",
      },
      {
        id: "B",
        label: "Elles mangent une pizza",
        isCorrect: true,
        explanation: "Bonne réponse : elles mangent bien une pizza.",
      },
      {
        id: "C",
        label: "Elles mangent un couscous",
        isCorrect: false,
        explanation: "Ce n’est pas un couscous.",
      },
    ],
  },
  {
    id: 3,
    question: "Où est-ce qu’ils vont ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/beach.png",
    choices: [
      {
        id: "A",
        label: "Ils vont aux toilettes",
        isCorrect: false,
        explanation: "Ils ne vont pas aux toilettes.",
      },
      {
        id: "B",
        label: "Ils vont à la plage",
        isCorrect: true,
        explanation: "Bonne réponse : on les voit aller à la plage.",
      },
      {
        id: "C",
        label: "Ils vont au travail",
        isCorrect: false,
        explanation: "Ils ne vont pas au travail.",
      },
    ],
  },
  {
    id: 4,
    question: "Est-ce qu’ils aiment leur repas à la cantine ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/cantine.png",
    choices: [
      {
        id: "A",
        label: "Non, ils détestent leur repas",
        isCorrect: true,
        explanation: "Bonne réponse : ils n’aiment pas du tout leur repas.",
      },
      {
        id: "B",
        label: "Oui, ils adorent leur repas",
        isCorrect: false,
        explanation: "Ce n’est pas le cas.",
      },
      {
        id: "C",
        label: "Comme ci, comme ça",
        isCorrect: false,
        explanation: "Ils détestent leur repas : ce n’est pas neutre.",
      },
    ],
  },
  {
    id: 5,
    question: "À quel jeu est-ce qu’ils jouent ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/chess.png",
    choices: [
      {
        id: "A",
        label: "Ils jouent au poker",
        isCorrect: false,
        explanation: "Ce n’est pas du poker.",
      },
      {
        id: "B",
        label: "Ils jouent au scrabble",
        isCorrect: false,
        explanation: "Ils ne jouent pas au scrabble.",
      },
      {
        id: "C",
        label: "Ils jouent aux échecs",
        isCorrect: true,
        explanation: "Bonne réponse : ils jouent bien aux échecs.",
      },
    ],
  },
  {
    id: 6,
    question: "Qu’est-ce qu’elles font ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/teach.png",
    choices: [
      {
        id: "A",
        label: "Elles finissent leurs devoirs de classe",
        isCorrect: true,
        explanation: "Bonne réponse : elles sont en train de travailler.",
      },
      {
        id: "B",
        label: "Elles regardent la télévision",
        isCorrect: false,
        explanation: "Elles ne regardent pas la télévision.",
      },
      {
        id: "C",
        label: "Elles choisissent leurs habits",
        isCorrect: false,
        explanation: "Ce n’est pas ce qu’elles font.",
      },
    ],
  },
  {
    id: 7,
    question: "Dans quel pays est-ce qu’ils sont ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/maroc.png",
    choices: [
      {
        id: "A",
        label: "Ils sont en Islande",
        isCorrect: false,
        explanation: "Ce n’est pas l’Islande.",
      },
      {
        id: "B",
        label: "Ils sont en Australie",
        isCorrect: false,
        explanation: "Ce n’est pas l’Australie.",
      },
      {
        id: "C",
        label: "Ils sont au Maroc",
        isCorrect: true,
        explanation: "Bonne réponse : ils sont bien au Maroc.",
      },
    ],
  },
  {
    id: 8,
    question: "Quel est leur problème ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/tired.png",
    choices: [
      {
        id: "A",
        label: "Ils ont trop froid, ils ont besoin d’un abri",
        isCorrect: false,
        explanation: "Ce n’est pas le cas.",
      },
      {
        id: "B",
        label: "Ils sont trop fatigués, ils ne peuvent plus marcher",
        isCorrect: true,
        explanation:
          "Bonne réponse : ils n’en peuvent plus et sont épuisés.",
      },
      {
        id: "C",
        label: "Ils sont très contents, ils rient sans s’arrêter",
        isCorrect: false,
        explanation: "Ce n’est pas du tout ce qui se passe.",
      },
    ],
  },
];
