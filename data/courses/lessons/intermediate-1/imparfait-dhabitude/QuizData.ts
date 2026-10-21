export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: number;
  type: "single-choice" | "multiple-choice";
  image: string;
  teacherImage?: string;
  question: string;
  teacherAudioQuestion?: string;
  options: QuizOption[];
  correctAnswer?: string;
  correctAnswers?: string[];
};

export type LessonQuizDataType = {
  title: string;
  description: string;
  questions: QuizQuestion[];
};

export const LessonQuizData: LessonQuizDataType = {
  title: "Quiz — L’imparfait d’habitude",

  description:
    "Vérifie tes connaissances sur l’imparfait d’habitude après avoir regardé la leçon.",

  questions: [
    {
      id: 1,
      type: "single-choice",
      image:
        "/images/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q1.png",
      teacherImage: "/images/courses/teacher/etiennetalkquestion.png",

      question: "L’imparfait d’habitude sert à…",
      teacherAudioQuestion:
        "/audios/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q1.mp3",
      correctAnswer: "c",
      options: [
        {
          id: "a",
          text: "Parler d’une action précise et datée dans le passé",
        },
        {
          id: "b",
          text: "Parler d’une action en cours d’accomplissement",
        },
        {
          id: "c",
          text: "Parler d’actions répétées dans le passé",
        },
      ],
    },

    {
      id: 2,
      type: "single-choice",
      image:
        "/images/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q2.png",
      teacherImage: "/images/courses/teacher/etiennetalkquestion.png",

      question: "Laquelle de ces phrases exprime un imparfait d’habitude ?",
      teacherAudioQuestion:
        "/audios/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q2.mp3",
      correctAnswer: "b",
      options: [
        {
          id: "a",
          text: "Hier soir, Lina était très fatiguée.",
        },
        {
          id: "b",
          text: "Avant, Lina allait tous les soirs au lit à 21 heures.",
        },
        {
          id: "c",
          text: "Lina était sur le point de s’endormir quand son téléphone a sonné.",
        },
      ],
    },

    {
      id: 3,
      type: "single-choice",
      image:
        "/images/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q3.png",
      teacherImage: "/images/courses/teacher/etiennetalkquestion.png",

      question:
        "Comment comprendre la phrase « Pour gagner un peu d’argent, Félix distribuait des flyers à la sortie du métro » ?",
      teacherAudioQuestion:
        "/audios/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q3.mp3",
      correctAnswer: "b",
      options: [
        {
          id: "a",
          text: "De temps en temps, Félix distribue des flyers.",
        },
        {
          id: "b",
          text: "Félix ne distribue plus de flyers.",
        },
        {
          id: "c",
          text: "Une fois, Félix a distribué des flyers.",
        },
      ],
    },

    {
      id: 4,
      type: "single-choice",
      image:
        "/images/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q4.png",
      teacherImage: "/images/courses/teacher/etiennetalkquestion.png",

      question: "Laquelle de ces trois phrases est correcte ?",
      teacherAudioQuestion:
        "/audios/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q4.mp3",
      correctAnswer: "c",
      options: [
        {
          id: "a",
          text: "Avant les années 1990, les gens n’ont pas de téléphone portable.",
        },
        {
          id: "b",
          text: "Avant les années 1990, les gens n’ont pas eu de téléphone portable.",
        },
        {
          id: "c",
          text: "Avant les années 1990, les gens n’avaient pas de téléphone portable.",
        },
      ],
    },

    {
      id: 5,
      type: "single-choice",
      image:
        "/images/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q5.png",
      teacherImage: "/images/courses/teacher/etiennetalkquestion.png",

      question:
        "Quels temps dois-je utiliser pour comparer l’époque actuelle aux années 1990 ?",
      teacherAudioQuestion:
        "/audios/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q5.mp3",
      correctAnswer: "a",
      options: [
        {
          id: "a",
          text: "Le présent et l’imparfait.",
        },
        {
          id: "b",
          text: "Le présent et le passé composé.",
        },
        {
          id: "c",
          text: "L’imparfait et le passé composé.",
        },
      ],
    },

    {
      id: 6,
      type: "single-choice",
      image:
        "/images/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q6.png",
      teacherImage: "/images/courses/teacher/etiennetalkquestion.png",

      question: "Laquelle de ces trois phrases est grammaticalement correcte ?",
      teacherAudioQuestion:
        "/audios/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q6.mp3",
      correctAnswer: "c",
      options: [
        {
          id: "a",
          text: "Marie et Rosamund aimions se parler pendant des heures au téléphone.",
        },
        {
          id: "b",
          text: "Marie et Rosamund aimait se parler pendant des heures au téléphone.",
        },
        {
          id: "c",
          text: "Marie et Rosamund aimaient se parler pendant des heures au téléphone.",
        },
      ],
    },

    {
      id: 7,
      type: "single-choice",
      image:
        "/images/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q7.jpg",
      teacherImage: "/images/courses/teacher/etiennetalkquestion.png",

      question:
        "Laquelle de ces trois phrases est correcte du point de vue du sens ?",
      teacherAudioQuestion:
        "/audios/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q7.mp3",
      correctAnswer: "b",
      options: [
        {
          id: "a",
          text: "Ma grand-mère naissait en 1940 et elle mourait en 2024.",
        },
        {
          id: "b",
          text: "Ma grand-mère est née en 1940 et elle est morte en 2024.",
        },
        {
          id: "c",
          text: "Ma grand-mère naît en 1940 et elle meurt en 2024.",
        },
      ],
    },

    {
      id: 8,
      type: "single-choice",
      image:
        "/images/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q8.png",
      teacherImage: "/images/courses/teacher/etiennetalkquestion.png",

      question:
        "Complétez la phrase de façon logique : « Avant, les parents apprenaient à leurs enfants à conduire une voiture… »",
      teacherAudioQuestion:
        "/audios/courses/intermediate1/lessons/limparfait-dhabitude/QCM/Q8.mp3",
      correctAnswer: "a",
      options: [
        {
          id: "a",
          text: "Aujourd’hui, les enfants apprennent à leurs parents à naviguer sur le web.",
        },
        {
          id: "b",
          text: "Aujourd’hui, les enfants ont appris à leurs parents à naviguer sur le web.",
        },
        {
          id: "c",
          text: "Aujourd’hui, les enfants apprenaient à leurs parents à naviguer sur le web.",
        },
      ],
    },
  ],
};
