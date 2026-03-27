"use client";

/* ========= Types ========= */
type Choice = {
  id: string;
  label: string;
  isCorrect: boolean;
  explanationCorrect: string;
  explanationWrong: string;
  teacherAudioCorrect?: string;
  teacherAudioWrong?: string;
};

type Question = {
  id: number;
  question: string;
  choices: Choice[];
  image: string;
  teacherImage?: string;
  correctAudio: string;
  wrongAudio: string;
  teacherAudioQuestion: string;
};

export const quizData: Question[] = [
  {
    id: 1,
    question: "L’imparfait d’habitude sert à…",
    teacherImage: "/images/courses/teacher/etiennetalkquestion.png",
    image: "/images/courses/intermediate/imparfait/q-qcm-1.png",
    teacherAudioQuestion:
      "/audios/courses/intermediate/imparfait/q1/q1_etienne.mp3",
    correctAudio:
      "/audios/courses/intermediate/imparfait/etienne_good-answer-1.mp3",
    wrongAudio:
      "/audios/courses/intermediate/imparfait/etienne_bad-answer-1.mp3",
    choices: [
      {
        id: "A",
        label: "Parler d’une action précise et datée dans le passé",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Non. Une action précise et datée utilise plutôt le passé composé.",
        teacherAudioCorrect: "",
        teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-1.mp3",
      },
      {
        id: "B",
        label: "Parler d’une action en cours d’accomplissement",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Non. L’imparfait d’habitude sert à parler d’actions répétées, pas d’une action en train de se faire.",
        teacherAudioCorrect: "",

        teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-2.mp3",
      },
      {
        id: "C",
        label: "Parler d’actions répétées dans le passé",
        isCorrect: true,
        explanationCorrect:
          "Exact. L’imparfait d’habitude sert à parler d’actions répétées ou régulières dans le passé.",
        explanationWrong: "",
        teacherAudioCorrect: "/audios/courses/intermediate/imparfait/etienne_good_answer-2.mp3",
        teacherAudioWrong:
          "",
        
      },
    ],
  },

  {
    id: 2,
    question: "Laquelle de ces phrases exprime un imparfait d’habitude ?",
    teacherImage: "/images/courses/teacher/etiennetalkquestion.png",
    image: "/images/courses/intermediate/imparfait/q-qcm-2.png",
    teacherAudioQuestion:
    "/audios/courses/intermediate/imparfait/q2/q2_etienne.mp3",
    correctAudio:
      "/audios/courses/intermediate/imparfait/etienne_good-answer-2.mp3",
    wrongAudio:
      "/audios/courses/intermediate/imparfait/etienne_bad-answer-2.mp3",
    choices: [
      {
        id: "A",
        label: "Hier soir, Lina était très fatiguée.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Non. Cette phrase décrit une situation ponctuelle, pas une habitude.",
          teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-2.mp3",
          teacherAudioCorrect: "",

      },
      {
        id: "B",
        label: "Avant, Lina allait tous les soirs au lit à 21 heures",
        isCorrect: true,
        explanationCorrect:
          "Exact. « Tous les soirs » indique une habitude, donc on utilise l’imparfait.",
        explanationWrong: "",
        teacherAudioWrong:
        "",
        teacherAudioCorrect: "/audios/courses/intermediate/imparfait/etienne_good_answer-2.mp3",

      },
      {
        id: "C",
        label:
          "Lina était sur le point de s’endormir quand son téléphone a sonné",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Non. Cette phrase parle d’une action ponctuelle interrompue, pas d’une habitude.",
          teacherAudioCorrect: "",
          teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-2.mp3",
      },
    ],
  },

  {
    id: 3,
    question:
      "Comment comprendre la phrase « Félix distribuait des flyers à la sortie du métro » ?",
    teacherImage: "/images/courses/teacher/etiennetalkquestion.png",
    image: "/images/courses/intermediate/imparfait/q-qcm-3.png",
    teacherAudioQuestion:
    "/audios/courses/intermediate/imparfait/q3/q3_etienne.mp3",
    correctAudio:
      "/audios/courses/intermediate/imparfait/etienne_good-answer-3.mp3",
    wrongAudio:
      "/audios/courses/intermediate/imparfait/etienne_bad-answer-3.mp3",
    choices: [
      {
        id: "A",
        label: "De temps en temps, Félix distribue des flyers",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Non. La phrase à l’imparfait parle d’une habitude dans le passé, pas du présent.",
          teacherAudioCorrect: "",
          teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-3.mp3",
      },
      {
        id: "B",
        label: "Félix ne distribue plus de flyers",
        isCorrect: true,
        explanationCorrect:
          "Exact. L’imparfait montre une habitude passée qui n’est plus forcément vraie aujourd’hui.",
        explanationWrong: "",
        teacherAudioCorrect: "/audios/courses/intermediate/imparfait/etienne_good_answer-2.mp3",
        teacherAudioWrong:
        "",
      },
      {
        id: "C",
        label: "Une fois, Félix a distribué des flyers",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Non. « Une fois » correspond au passé composé, pas à l’imparfait.",
          teacherAudioCorrect: "",
          teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-3.mp3",
      },
    ],
  },

  {
    id: 4,
    question: "Laquelle de ces phrases est correcte ?",
    teacherImage: "/images/courses/teacher/etiennetalkquestion.png",
    image: "/images/courses/intermediate/imparfait/q-qcm-4.png",
    teacherAudioQuestion:
    "/audios/courses/intermediate/imparfait/q4/q4_etienne.mp3",
    correctAudio:
      "/audios/courses/intermediate/imparfait/etienne_good-answer-4.mp3",
    wrongAudio:
      "/audios/courses/intermediate/imparfait/etienne_bad-answer-4.mp3",
    choices: [
      {
        id: "A",
        label:
          "Avant les années 1990, les gens n’ont pas de téléphone portable",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Non. On parle d’une situation passée, il faut utiliser l’imparfait.",
          teacherAudioCorrect: "",
          teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-4.mp3",
          
      },
      {
        id: "B",
        label:
          "Avant les années 1990, les gens n’ont pas eu de téléphone portable",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Non. Le passé composé ne convient pas pour une situation générale dans le passé.",
          teacherAudioCorrect: "",
          teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-4.mp3",
      },
      {
        id: "C",
        label:
          "Avant les années 1990, les gens n’avaient pas de téléphone portable",
        isCorrect: true,
        explanationCorrect:
          "Exact. L’imparfait est utilisé pour décrire une situation habituelle dans le passé.",
        explanationWrong: "",
        teacherAudioCorrect: "/audios/courses/intermediate/imparfait/etienne_good_answer-4.mp3",
        teacherAudioWrong:
        "",
      },
    ],
  },

  {
    id: 5,
    question:
      "Quels temps utiliser pour comparer aujourd’hui et les années 1990 ?",
    teacherImage: "/images/courses/teacher/etiennetalkquestion.png",
    image: "/images/courses/intermediate/imparfait/q-qcm-5.png",
    teacherAudioQuestion:
    "/audios/courses/intermediate/imparfait/q5/q5_etienne.mp3",
    correctAudio:
      "/audios/courses/intermediate/imparfait/etienne_good-answer-5.mp3",
    wrongAudio:
      "/audios/courses/intermediate/imparfait/etienne_bad-answer-5.mp3",
    choices: [
      {
        id: "A",
        label: "Le présent et l’imparfait",
        isCorrect: true,
        explanationCorrect:
          "Exact. On utilise le présent pour aujourd’hui et l’imparfait pour parler d’une habitude passée.",
        explanationWrong: "",
        teacherAudioCorrect: "/audios/courses/intermediate/imparfait/etienne_good_answer-5.mp3",
        teacherAudioWrong:
        "",
      },
      {
        id: "B",
        label: "Le présent et le passé composé",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Non. Le passé composé parle d’actions ponctuelles, pas d’habitudes.",
          teacherAudioCorrect: "",
          teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-5.mp3",
      },
      {
        id: "C",
        label: "L’imparfait et le passé composé",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Non. Pour comparer passé et présent, on utilise présent + imparfait.",
          teacherAudioCorrect: "",
          teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-5.mp3",
      },
    ],
  },
  {
    id: 6,
    question: "Laquelle de ces trois phrases est grammaticalement correcte ?",
    teacherImage: "/images/courses/teacher/etiennetalkquestion.png",
    image: "/images/courses/intermediate/imparfait/q-qcm-5.png",
    teacherAudioQuestion:
    "/audios/courses/intermediate/imparfait/q6/q6_etienne.mp3",
    correctAudio:
      "/audios/courses/intermediate/imparfait/etienne_good-answer-6.mp3",
    wrongAudio:
      "/audios/courses/intermediate/imparfait/etienne_bad-answer-6.mp3",
    choices: [
      {
        id: "A",
        label:
          "Marie et Rosamund aimions se parler pendant des heures au téléphone",
        isCorrect: false,
        explanationCorrect:
          "Exact. On utilise le présent pour aujourd’hui et l’imparfait pour parler d’une habitude passée.",
        explanationWrong: "",
        teacherAudioCorrect: "",
        teacherAudioWrong:
        "/audios/courses/intermediate/imparfait/etienne_bad_answer-6.mp3",
      },
      {
        id: "B",
        label:
          "Marie et Rosamund aimait se parler pendant des heures au téléphone",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Non. Le passé composé parle d’actions ponctuelles, pas d’habitudes.",
          teacherAudioCorrect: "",
          teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-6.mp3",
      },
      {
        id: "C",
        label:
          "Marie et Rosamund aimaient se parler pendant des heures au téléphone",
        isCorrect: true,
        explanationCorrect: "",
        explanationWrong:
          "Non. Pour comparer passé et présent, on utilise présent + imparfait.",
          teacherAudioCorrect: "/audios/courses/intermediate/imparfait/etienne_good_answer-6.mp3",
          teacherAudioWrong:
          "",
      },
    ],
  },
  {
    id: 7,
    question:
      "Laquelle de ces trois phrases est correcte du point de vue du sens ?",
    teacherImage: "/images/courses/teacher/etiennetalkquestion.png",
    image: "/images/courses/intermediate/imparfait/q-qcm-5.png",
    teacherAudioQuestion:
    "/audios/courses/intermediate/imparfait/q7/q7_etienne.mp3",
    correctAudio:
      "/audios/courses/intermediate/imparfait/etienne_good-answer-7.mp3",
    wrongAudio:
      "/audios/courses/intermediate/imparfait/etienne_bad-answer-7.mp3",
    choices: [
      {
        id: "A",
        label: "Ma grand-mère naissait en 1940 et elle mourait en 2024",
        isCorrect: false,
        explanationCorrect:
          "Exact. On utilise le présent pour aujourd’hui et l’imparfait pour parler d’une habitude passée.",
        explanationWrong: "",
        teacherAudioCorrect: "",
        teacherAudioWrong:
        "/audios/courses/intermediate/imparfait/etienne_bad_answer-7.mp3",
      },
      {
        id: "B",
        label: "Ma grand-mère est née en 1940 et elle est morte en 2024",
        isCorrect: true,
        explanationCorrect: "",
        explanationWrong:
          "Non. Le passé composé parle d’actions ponctuelles, pas d’habitudes.",
          teacherAudioCorrect: "/audios/courses/intermediate/etienne_good_answer-7.mp3",
          teacherAudioWrong:
          "",
      },
      {
        id: "C",
        label: "Ma grand-mère naît en 1940 et elle meurt en 2024",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Non. Pour comparer passé et présent, on utilise présent + imparfait.",
          teacherAudioCorrect: "",
          teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-7.mp3",
      },
    ],
  },
  {
    id: 8,
    question:
      "Complétez la phrase suivant de façon logique : « Avant, les parents apprenaient à leurs enfants à conduire une voiture… »",
    teacherImage: "/images/courses/teacher/etiennetalkquestion.png",
    image: "/images/courses/intermediate/imparfait/q-qcm-5.png",
    teacherAudioQuestion:
    "/audios/courses/intermediate/imparfait/q8/q8_etienne.mp3",
    correctAudio:
      "/audios/courses/intermediate/imparfait/etienne_good-answer-8.mp3",
    wrongAudio:
      "/audios/courses/intermediate/imparfait/etienne_bad-answer-8.mp3",
    choices: [
      {
        id: "A",
        label:
          "Aujourd’hui, les enfants apprennent à leurs parents à naviguer sur le web",
        isCorrect: false,
        explanationCorrect:
          "Exact. On utilise le présent pour aujourd’hui et l’imparfait pour parler d’une habitude passée.",
        explanationWrong: "",
        teacherAudioCorrect: "",
        teacherAudioWrong:
        "/audios/courses/intermediate/imparfait/etienne_bad_answer-8.mp3",
      },
      {
        id: "B",
        label:
          "Aujourd’hui, les enfants ont appris à leurs parents à naviguer sur le web",
        isCorrect: true,
        explanationCorrect: "",
        explanationWrong:
          "Non. Le passé composé parle d’actions ponctuelles, pas d’habitudes.",
          teacherAudioCorrect: "/audios/courses/intermediate/imparfait/etienne_good_answer_8.mp3",
          teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-3.mp3",
      },
      {
        id: "C",
        label:
          "Aujourd’hui, les enfants apprenaient à leurs parents à naviguer sur le web",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Non. Pour comparer passé et présent, on utilise présent + imparfait.",
          teacherAudioCorrect: "",
          teacherAudioWrong:
          "/audios/courses/intermediate/imparfait/etienne_bad_answer-8.mp3",
      },
    ],
  },
];
