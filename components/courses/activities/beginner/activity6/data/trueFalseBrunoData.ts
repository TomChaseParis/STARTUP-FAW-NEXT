export type TrueFalseBrunoQuestion = {
  id: number;
  statement: string;
  correctAnswer: "true" | "false";
  explanation: string;
};

export const trueFalseBrunoData: TrueFalseBrunoQuestion[] = [
  {
    id: 1,
    statement: "Son prénom est Bruno.",
    correctAnswer: "true",
    explanation:
      "Bruno Galopin se présente et donne son prénom : Bruno.",
  },
  {
    id: 2,
    statement: "Il habite dans le Nord.",
    correctAnswer: "false",
    explanation:
      "Bruno habite à Toulouse, dans le sud-ouest de la France.",
  },
  {
    id: 3,
    statement: "Il n’a pas d’enfant.",
    correctAnswer: "false",
    explanation:
      "Bruno a deux enfants : une fille de 8 ans et un garçon de 5 ans.",
  },
  {
    id: 4,
    statement: "Il est marié.",
    correctAnswer: "false",
    explanation:
      "Bruno dit qu’il est en couple.",
  },
  {
    id: 5,
    statement: "Il travaille dans l’informatique.",
    correctAnswer: "true",
    explanation:
      "Bruno travaille comme développeur web.",
  },
  {
    id: 6,
    statement: "Il est tous les jours à son bureau.",
    correctAnswer: "false",
    explanation:
      "La plupart du temps, Bruno travaille chez lui. Il va parfois à son bureau.",
  },
  {
    id: 7,
    statement: "Il est souvent en télétravail.",
    correctAnswer: "true",
    explanation:
      "Bruno explique que la plupart du temps, il travaille chez lui.",
  },
  {
    id: 8,
    statement: "Il aime la musique.",
    correctAnswer: "true",
    explanation:
      "Pendant son temps libre, Bruno fait du piano.",
  },
  {
    id: 9,
    statement: "Il fait de la moto.",
    correctAnswer: "false",
    explanation:
      "Bruno dit qu’il fait du vélo le long des berges de la Garonne.",
  },
  {
    id: 10,
    statement: "Il déteste les musées.",
    correctAnswer: "false",
    explanation:
      "Bruno aime visiter des expositions d’art contemporain.",
  },
];