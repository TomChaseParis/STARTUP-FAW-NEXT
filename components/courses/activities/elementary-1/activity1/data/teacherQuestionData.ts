export interface TeacherQuestionExerciseData {
  id: string;

  category: string;

  interrogativeWords: string[];

  questionPrefix: string;

  questionSuffix: string;

  expectedQuestion: string;

  teacherAnswer: string;
}

export const teacherQuestionData: TeacherQuestionExerciseData[] = [
  {
    id: "geographie-1",

    category: "GEOGRAPHIE",

    interrogativeWords: [
      "Qui",
      "Comment",
      "Où",
      "Quand",
      "Pourquoi",
      "Combien",
      "Quelle",
    ],

    questionPrefix: "",

    questionSuffix:
      "est la capitale du Canada ?",

    expectedQuestion:
      "Quelle est la capitale du Canada ?",

    teacherAnswer:
      "La capitale du Canada est Ottawa.",
  },

  {
    id: "zoologie-1",

    category: "ZOOLOGIE",

    interrogativeWords: [
      "Qui",
      "Comment",
      "Où",
      "Quand",
      "Pourquoi",
      "Combien",
      "Quel",
    ],

    questionPrefix: "",

    questionSuffix:
      "d'années peut vivre une tortue marine ?",

    expectedQuestion:
      "Combien d'années peut vivre une tortue marine ?",

    teacherAnswer:
      "Une tortue marine peut vivre jusqu'à 100 ans.",
  },

  {
    id: "civilisation-1",

    category: "CIVILISATION",

    interrogativeWords: [
      "Qui",
      "Comment",
      "Où",
      "Quand",
      "Pourquoi",
      "Combien",
      "Quel",
    ],

    questionPrefix: "",

    questionSuffix:
      "commence le Nouvel An Chinois ?",

    expectedQuestion:
      "Quand commence le Nouvel An Chinois ?",

    teacherAnswer:
      "Le Nouvel An Chinois commence entre le 21 janvier et le 21 février.",
  },

  {
    id: "gastronomie-1",

    category: "GASTRONOMIE",

    interrogativeWords: [
      "Qui",
      "Comment",
      "Où",
      "Quand",
      "Pourquoi",
      "Combien",
      "Quel",
    ],

    questionPrefix: "",

    questionSuffix:
      "prépare-t-on un cassoulet ?",

    expectedQuestion:
      "Comment prépare-t-on un cassoulet ?",

    teacherAnswer:
      "On prépare un cassoulet avec des saucisses, du confit de canard et des haricots secs.",
  },

  {
    id: "histoire-1",

    category: "HISTOIRE",

    interrogativeWords: [
      "Qui",
      "Comment",
      "Où",
      "Quand",
      "Pourquoi",
      "Combien",
      "Quel",
    ],

    questionPrefix: "",

    questionSuffix:
      "est né le compositeur Wolfgang Amadeus Mozart ?",

    expectedQuestion:
      "Où est né le compositeur Wolfgang Amadeus Mozart ?",

    teacherAnswer:
      "Wolfgang Amadeus Mozart est né à Salzbourg.",
  },

  {
    id: "science-1",

    category: "SCIENCE",

    interrogativeWords: [
      "Qui",
      "Comment",
      "Où",
      "Quand",
      "Pourquoi",
      "Combien",
      "Quel",
    ],

    questionPrefix: "",

    questionSuffix:
      "l'eau et l'huile ne se mélangent jamais ?",

    expectedQuestion:
      "Pourquoi l'eau et l'huile ne se mélangent jamais ?",

    teacherAnswer:
      "Parce que l'huile est moins dense que l'eau, alors elle flotte au-dessus.",
  },

  {
    id: "inventions-1",

    category: "INVENTIONS",

    interrogativeWords: [
      "Qui",
      "Comment",
      "Où",
      "Quand",
      "Pourquoi",
      "Combien",
      "Quel",
    ],

    questionPrefix: "",

    questionSuffix:
      "est l'inventeur de la recette du Coca-Cola ?",

    expectedQuestion:
      "Qui est l'inventeur de la recette du Coca-Cola ?",

    teacherAnswer:
      "L'inventeur de la recette du Coca-Cola est John Pemberton.",
  },

  {
    id: "sport-1",

    category: "SPORT",

    interrogativeWords: [
      "Est-ce que",
      "Qu'est-ce que",
    ],

    questionPrefix: "",

    questionSuffix:
      "le joueur de tennis Roger Federer a gagné tous les tournois du Grand Chelem ?",

    expectedQuestion:
      "Est-ce que le joueur de tennis Roger Federer a gagné tous les tournois du Grand Chelem ?",

    teacherAnswer:
      "Oui. Il a gagné 8 fois Wimbledon, 6 fois l'Open d'Australie, 5 fois l'US Open et une seule fois Roland-Garros.",
  },

  {
    id: "france-francais-1",

    category: "LA FRANCE ET LES FRANÇAIS",

    interrogativeWords: [
      "Est-ce que",
      "Qu'est-ce que",
    ],

    questionPrefix: "",

    questionSuffix:
      "font généralement les Parisiens pour leurs vacances du mois d'août ?",

    expectedQuestion:
      "Qu'est-ce que font généralement les Parisiens pour leurs vacances du mois d'août ?",

    teacherAnswer:
      "Ils partent loin de Paris.",
  },
];