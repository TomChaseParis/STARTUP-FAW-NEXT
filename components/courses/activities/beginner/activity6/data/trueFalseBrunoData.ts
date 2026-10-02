export type TrueFalseBrunoQuestion = {
  id: number;
  statement: string;
  correctAnswer: "true" | "false";
  explanation: string;
  image: string;
};

export const trueFalseBrunoData: TrueFalseBrunoQuestion[] = [
  {
    id: 1,
    statement: "Son prénom est Bruno.",
    correctAnswer: "true",
    explanation:
      "Bruno Galopin se présente et donne son prénom : Bruno.",
    image: "/images/courses/beginner/activities/brunogalopin/Q1.jpg",
  },

  {
    id: 2,
    statement: "Il habite dans le Nord.",
    correctAnswer: "false",
    explanation:
      "Bruno habite à Toulouse, dans le sud-ouest de la France.",
    image: "/images/courses/beginner/activities/brunogalopin/Q2.jpg",
  },

  {
    id: 3,
    statement: "Il n’a pas d’enfant.",
    correctAnswer: "false",
    explanation:
      "Bruno a deux enfants : une fille de 8 ans et un garçon de 5 ans.",
    image: "/images/courses/beginner/activities/brunogalopin/Q3.jpg",
  },

  {
    id: 4,
    statement: "Il est marié.",
    correctAnswer: "false",
    explanation:
      "Bruno dit qu’il est en couple.",
    image: "/images/courses/beginner/activities/brunogalopin/Q4.jpg",
  },

  {
    id: 5,
    statement: "Il travaille dans l’informatique.",
    correctAnswer: "true",
    explanation:
      "Bruno travaille comme développeur web.",
    image: "/images/courses/beginner/activities/brunogalopin/Q5.jpg",
  },

  {
    id: 6,
    statement: "Il est tous les jours à son bureau.",
    correctAnswer: "false",
    explanation:
      "La plupart du temps, Bruno travaille chez lui. Il va parfois à son bureau.",
    image: "/images/courses/beginner/activities/brunogalopin/Q6.jpg",
  },

  {
    id: 7,
    statement: "Il est souvent en télétravail.",
    correctAnswer: "true",
    explanation:
      "Bruno explique que la plupart du temps, il travaille chez lui.",
    image: "/images/courses/beginner/activities/brunogalopin/Q7.jpg",
  },

  {
    id: 8,
    statement: "Il aime la musique.",
    correctAnswer: "true",
    explanation:
      "Pendant son temps libre, Bruno fait du piano.",
    image: "/images/courses/beginner/activities/brunogalopin/Q8.jpg",
  },

  {
    id: 9,
    statement: "Il fait de la moto.",
    correctAnswer: "false",
    explanation:
      "Bruno dit qu’il fait du vélo le long des berges de la Garonne.",
    image: "/images/courses/beginner/activities/brunogalopin/Q9.jpg",
  },

  {
    id: 10,
    statement: "Il déteste les musées.",
    correctAnswer: "false",
    explanation:
      "Bruno aime visiter des expositions d’art contemporain.",
    image: "/images/courses/beginner/activities/brunogalopin/Q10.jpg",
  },
];