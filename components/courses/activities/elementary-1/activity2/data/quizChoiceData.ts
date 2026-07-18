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

/* ========= Questions ========= */
export const quizChoiceQuestions: Question[] = [
  {
    id: 1,
    question: "Qu’est-ce qu’ils font ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/tennis.png",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    teacherAudioQuestion: "/audios/teacher/elementary-1/activity2/q1/qteacher1.mp3",
    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q1_correct.mp3",
    wrongAudio: "/audios/courses/elementary/lesloisirsdesfrancais/q1_wrong.mp3",
    choices: [
      {
        id: "A",
        label: "Ils font du judo",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils jouent au tennis.",
        explanationWrong: "Non, ce n’est pas du judo.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q1/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Ils font du ping-pong",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils jouent au tennis.",
        explanationWrong: "Non, ce n’est pas du ping-pong.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q1/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Ils font du tennis",
        isCorrect: true,
        explanationCorrect: "Exact ! Ils jouent au tennis.",
        explanationWrong: "Ce choix était correct : ils jouent au tennis.",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity2/q1/C_correct.mp3",
      },
    ],
  },

  {
    id: 2,
    question: "Qu’est-ce qu’elles mangent ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/pizza.png",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    teacherAudioQuestion: "/audios/teacher/elementary-1/activity2/q2/qteacher2.mp3",
    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q2_correct.mp3",
    wrongAudio: "/audios/courses/elementary/lesloisirsdesfrancais/q2_wrong.mp3",
    choices: [
      {
        id: "A",
        label: "Elles mangent une ratatouille",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : elles mangent une pizza.",
        explanationWrong: "Non, ce n’est pas une ratatouille.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q2/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Elles mangent une pizza",
        isCorrect: true,
        explanationCorrect: "Exact ! Elles mangent bien une pizza.",
        explanationWrong: "Ce choix était correct : elles mangent une pizza.",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity2/q2/B_correct.mp3",
      },
      {
        id: "C",
        label: "Elles mangent un couscous",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : elles mangent une pizza.",
        explanationWrong: "Non, ce n’est pas un couscous.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q2/C_wrong.mp3",
      },
    ],
  },

  {
    id: 3,
    question: "Où est-ce qu’ils vont ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/beach.png",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    teacherAudioQuestion: "/audios/teacher/elementary-1/activity2/q3/qteacher3.mp3",
    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q3_correct.mp3",
    wrongAudio: "/audios/courses/elementary/lesloisirsdesfrancais/q3_wrong.mp3",
    choices: [
      {
        id: "A",
        label: "Ils vont aux toilettes",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils vont à la plage.",
        explanationWrong: "Non, ils ne vont pas aux toilettes.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q3/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Ils vont à la plage",
        isCorrect: true,
        explanationCorrect: "Exact ! Ils vont à la plage.",
        explanationWrong: "Ce choix était correct : ils vont à la plage.",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity2/q3/B_correct.mp3",
      },
      {
        id: "C",
        label: "Ils vont au travail",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils vont à la plage.",
        explanationWrong: "Non, ils ne vont pas au travail.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q3/C_wrong.mp3",
      },
    ],
  },

  {
    id: 4,
    question: "Est-ce qu’ils aiment leur repas à la cantine ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/cantine.png",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    teacherAudioQuestion: "/audios/teacher/elementary-1/activity2/q4/qteacher4.mp3",
    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q4_correct.mp3",
    wrongAudio: "/audios/courses/elementary/lesloisirsdesfrancais/q4_wrong.mp3",
    choices: [
      {
        id: "A",
        label: "Non, ils détestent leur repas",
        isCorrect: true,
        explanationCorrect: "Exact ! Ils détestent leur repas.",
        explanationWrong: "Ce choix était correct : ils détestent leur repas.",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity2/q4/A_correct.mp3",
      },
      {
        id: "B",
        label: "Oui, ils adorent leur repas",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils détestent leur repas.",
        explanationWrong: "Non, ils n’aiment pas leur repas.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q4/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Comme ci, comme ça",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils détestent leur repas.",
        explanationWrong: "Non, ils n’aiment pas du tout leur repas.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q4/C_wrong.mp3",
      },
    ],
  },

  {
    id: 5,
    question: "À quel jeu est-ce qu’ils jouent ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/chess.png",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    teacherAudioQuestion: "/audios/teacher/elementary-1/activity2/q5/qteacher5.mp3",
    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q5_correct.mp3",
    wrongAudio: "/audios/courses/elementary/lesloisirsdesfrancais/q5_wrong.mp3",
    choices: [
      {
        id: "A",
        label: "Ils jouent au poker",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils jouent aux échecs.",
        explanationWrong: "Non, ce n’est pas du poker.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q5/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Ils jouent au scrabble",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils jouent aux échecs.",
        explanationWrong: "Non, ce n’est pas du scrabble.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q5/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Ils jouent aux échecs",
        isCorrect: true,
        explanationCorrect: "Exact ! Ils jouent aux échecs.",
        explanationWrong: "Ce choix était correct : ils jouent aux échecs.",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity2/q5/C_correct.mp3",
      },
    ],
  },

  {
    id: 6,
    question: "Qu’est-ce qu’elles font ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/teach.png",
    teacherAudioQuestion: "/audios/teacher/elementary-1/activity2/q6/qteacher6.mp3",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q6_correct.mp3",
    wrongAudio: "/audios/courses/elementary/lesloisirsdesfrancais/q6_wrong.mp3",
    choices: [
      {
        id: "A",
        label: "Elles finissent leurs devoirs de classe",
        isCorrect: true,
        explanationCorrect: "Exact ! Elles travaillent.",
        explanationWrong: "Ce choix était correct : elles travaillent.",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity2/q6/A_correct.mp3",
      },
      {
        id: "B",
        label: "Elles regardent la télévision",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : elles travaillent.",
        explanationWrong: "Non, elles ne regardent pas la télévision.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q6/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Elles choisissent leurs habits",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : elles travaillent.",
        explanationWrong: "Non, ce n’est pas ce qu’elles font.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q6/C_wrong.mp3",
      },
    ],
  },

  {
    id: 7,
    question: "Dans quel pays est-ce qu’ils sont ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/maroc.png",
    teacherAudioQuestion: "/audios/teacher/elementary-1/activity2/q7/qteacher7.mp3",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q7_correct.mp3",
    wrongAudio: "/audios/courses/elementary/lesloisirsdesfrancais/q7_wrong.mp3",
    choices: [
      {
        id: "A",
        label: "Ils sont en Islande",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils sont au Maroc.",
        explanationWrong: "Non, ce n’est pas l’Islande.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q7/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Ils sont en Australie",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils sont au Maroc.",
        explanationWrong: "Non, ce n’est pas l’Australie.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q7/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Ils sont au Maroc",
        isCorrect: true,
        explanationCorrect: "Exact ! Ils sont au Maroc.",
        explanationWrong: "Ce choix était correct : ils sont au Maroc.",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity2/q7/C_correct.mp3",
      },
    ],
  },

  {
    id: 8,
    question: "Quel est leur problème ?",
    image: "/images/courses/elementary/lesloisirsdesfrancais/tired.png",
    teacherAudioQuestion: "/audios/teacher/elementary-1/activity2/q8/qteacher8.mp3",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q8_correct.mp3",
    wrongAudio: "/audios/courses/elementary/lesloisirsdesfrancais/q8_wrong.mp3",
    choices: [
      {
        id: "A",
        label: "Ils ont trop froid, ils ont besoin d’un abri",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils sont épuisés.",
        explanationWrong: "Non, ce n’est pas le problème.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q8/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Ils sont trop fatigués, ils ne peuvent plus marcher",
        isCorrect: true,
        explanationCorrect: "Exact ! Ils sont épuisés.",
        explanationWrong: "Ce choix était correct : ils sont fatigués.",
        teacherAudioCorrect:
          "/audios/teacher/elementary-1/activity2/q8/B_correct.mp3",
      },
      {
        id: "C",
        label: "Ils sont très contents, ils rient sans s’arrêter",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils sont fatigués.",
        explanationWrong: "Non, ils sont épuisés.",
        teacherAudioWrong:
          "/audios/teacher/elementary-1/activity2/q8/C_wrong.mp3",
      },
    ],
  },
];
