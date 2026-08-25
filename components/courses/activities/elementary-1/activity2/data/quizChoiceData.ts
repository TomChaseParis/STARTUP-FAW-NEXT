"use client";

/* ========= Types ========= */

type Choice = {
  id: string;
  label: string;
  isCorrect: boolean;
  explanationCorrect: string;
  explanationWrong: string;
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

    image:
      "/images/courses/elementary/lesloisirsdesfrancais/Q1.png",

    teacherImage:
      "/images/courses/teacher/jeantalkquestion.png",

    teacherAudioQuestion:
      "/audios/teacher/elementary-1/activity2/q1/qteacher1.mp3",

    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q1_correct.mp3",

    wrongAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q1_wrong.mp3",

    choices: [
      {
        id: "A",

        label: "Ils font du judo",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils font du tennis.",

        explanationWrong:
          "Non, ce n’est pas du judo.",
      },

      {
        id: "B",

        label: "Ils font du ping-pong",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils font du tennis.",

        explanationWrong:
          "Non, ce n’est pas du ping-pong.",
      },

      {
        id: "C",

        label: "Ils font du tennis",

        isCorrect: true,

        explanationCorrect:
          "Exact ! Ils font du tennis.",

        explanationWrong:
          "Ce choix était correct : ils font du tennis.",
      },
    ],
  },

  {
    id: 2,

    question: "Où est-ce qu’ils dînent ?",

    image:
      "/images/courses/elementary/lesloisirsdesfrancais/Q2.png",

    teacherImage:
      "/images/courses/teacher/jeantalkquestion.png",

    teacherAudioQuestion:
      "/audios/teacher/elementary-1/activity2/q2/qteacher2.mp3",

    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q2_correct.mp3",

    wrongAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q2_wrong.mp3",

    choices: [
      {
        id: "A",

        label: "Ils dînent à la maison",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils dînent au restaurant.",

        explanationWrong:
          "Non, ils ne dînent pas à la maison.",
      },

      {
        id: "B",

        label: "Ils dînent au restaurant",

        isCorrect: true,

        explanationCorrect:
          "Exact ! Ils dînent au restaurant.",

        explanationWrong:
          "Ce choix était correct : ils dînent au restaurant.",
      },

      {
        id: "C",

        label: "Ils font un pique-nique",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils dînent au restaurant.",

        explanationWrong:
          "Non, ils ne font pas un pique-nique.",
      },
    ],
  },

  {
    id: 3,

    question: "À quoi est-ce qu’ils jouent ?",

    image:
      "/images/courses/elementary/lesloisirsdesfrancais/Q3.png",

    teacherImage:
      "/images/courses/teacher/Q3.png",

    teacherAudioQuestion:
      "/audios/teacher/elementary-1/activity2/q3/qteacher3.mp3",

    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q3_correct.mp3",

    wrongAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q3_wrong.mp3",

    choices: [
      {
        id: "A",

        label: "Ils jouent aux fléchettes",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils jouent à la pétanque.",

        explanationWrong:
          "Non, ils ne jouent pas aux fléchettes.",
      },

      {
        id: "B",

        label: "Ils jouent à la pétanque",

        isCorrect: true,

        explanationCorrect:
          "Exact ! Ils jouent à la pétanque.",

        explanationWrong:
          "Ce choix était correct : ils jouent à la pétanque.",
      },

      {
        id: "C",

        label: "Ils jouent aux cartes",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils jouent à la pétanque.",

        explanationWrong:
          "Non, ils ne jouent pas aux cartes.",
      },
    ],
  },

  {
    id: 4,

    question: "Où est-ce qu’ils vont ?",

    image:
      "/images/courses/elementary/lesloisirsdesfrancais/Q4.png",

    teacherImage:
      "/images/courses/teacher/jeantalkquestion.png",

    teacherAudioQuestion:
      "/audios/teacher/elementary-1/activity2/q4/qteacher4.mp3",

    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q4_correct.mp3",

    wrongAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q4_wrong.mp3",

    choices: [
      {
        id: "A",

        label: "Ils vont au cinéma",

        isCorrect: true,

        explanationCorrect:
          "Exact ! Ils vont au cinéma.",

        explanationWrong:
          "Ce choix était correct : ils vont au cinéma.",
      },

      {
        id: "B",

        label: "Ils vont aux toilettes",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils vont au cinéma.",

        explanationWrong:
          "Non, ils ne vont pas aux toilettes.",
      },

      {
        id: "C",

        label: "Ils vont au théâtre",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils vont au cinéma.",

        explanationWrong:
          "Non, ils ne vont pas au théâtre.",
      },
    ],
  },

  {
    id: 5,

    question: "Dans quel pays est-ce qu’ils voyagent ?",

    image:
      "/images/courses/elementary/lesloisirsdesfrancais/Q5.png",

    teacherImage:
      "/images/courses/teacher/jeantalkquestion.png",

    teacherAudioQuestion:
      "/audios/teacher/elementary-1/activity2/q5/qteacher5.mp3",

    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q5_correct.mp3",

    wrongAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q5_wrong.mp3",

    choices: [
      {
        id: "A",

        label: "Ils voyagent en Islande",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils voyagent au Maroc.",

        explanationWrong:
          "Non, ils ne voyagent pas en Islande.",
      },

      {
        id: "B",

        label: "Ils voyagent en Australie",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils voyagent au Maroc.",

        explanationWrong:
          "Non, ils ne voyagent pas en Australie.",
      },

      {
        id: "C",

        label: "Ils voyagent au Maroc",

        isCorrect: true,

        explanationCorrect:
          "Exact ! Ils voyagent au Maroc.",

        explanationWrong:
          "Ce choix était correct : ils voyagent au Maroc.",
      },
    ],
  },

  {
    id: 6,

    question: "Qu’est-ce qu’ils regardent ?",

    image:
      "/images/courses/elementary/lesloisirsdesfrancais/Q6.png",

    teacherImage:
      "/images/courses/teacher/jeantalkquestion.png",

    teacherAudioQuestion:
      "/audios/teacher/elementary-1/activity2/q6/qteacher6.mp3",

    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q6_correct.mp3",

    wrongAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q6_wrong.mp3",

    choices: [
      {
        id: "A",

        label: "Ils regardent un coucher du soleil",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils regardent une série sur Netflix.",

        explanationWrong:
          "Non, ils ne regardent pas un coucher du soleil.",
      },

      {
        id: "B",

        label: "Ils regardent une série sur Netflix",

        isCorrect: true,

        explanationCorrect:
          "Exact ! Ils regardent une série sur Netflix.",

        explanationWrong:
          "Ce choix était correct : ils regardent une série sur Netflix.",
      },

      {
        id: "C",

        label: "Ils regardent le journal télévisé",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils regardent une série sur Netflix.",

        explanationWrong:
          "Non, ils ne regardent pas le journal télévisé.",
      },
    ],
  },

  {
    id: 7,

    question: "Qu’est-ce qu’elles lisent ?",

    image:
      "/images/courses/elementary/lesloisirsdesfrancais/Q7.png",

    teacherImage:
      "/images/courses/teacher/jeantalkquestion.png",

    teacherAudioQuestion:
      "/audios/teacher/elementary-1/activity2/q7/qteacher7.mp3",

    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q7_correct.mp3",

    wrongAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q7_wrong.mp3",

    choices: [
      {
        id: "A",

        label: "Elles lisent des bandes dessinées",

        isCorrect: true,

        explanationCorrect:
          "Exact ! Elles lisent des bandes dessinées.",

        explanationWrong:
          "Ce choix était correct : elles lisent des bandes dessinées.",
      },

      {
        id: "B",

        label: "Elles lisent les mémoires du général de Gaulle",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : elles lisent des bandes dessinées.",

        explanationWrong:
          "Non, elles ne lisent pas les mémoires du général de Gaulle.",
      },

      {
        id: "C",

        label: "Elles lisent Les Misérables de Victor Hugo",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : elles lisent des bandes dessinées.",

        explanationWrong:
          "Non, elles ne lisent pas Les Misérables de Victor Hugo.",
      },
    ],
  },

  {
    id: 8,

    question: "Qu’est-ce qu’ils boivent ?",

    image:
      "/images/courses/elementary/lesloisirsdesfrancais/Q8.png",

    teacherImage:
      "/images/courses/teacher/jeantalkquestion.png",

    teacherAudioQuestion:
      "/audios/teacher/elementary-1/activity2/q8/qteacher8.mp3",

    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q8_correct.mp3",

    wrongAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q8_wrong.mp3",

    choices: [
      {
        id: "A",

        label: "Ils boivent de l’eau",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils boivent des cocktails.",

        explanationWrong:
          "Non, ils ne boivent pas de l’eau.",
      },

      {
        id: "B",

        label: "Ils boivent des cocktails",

        isCorrect: true,

        explanationCorrect:
          "Exact ! Ils boivent des cocktails.",

        explanationWrong:
          "Ce choix était correct : ils boivent des cocktails.",
      },

      {
        id: "C",

        label: "Ils boivent du thé",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils boivent des cocktails.",

        explanationWrong:
          "Non, ils ne boivent pas de thé.",
      },
    ],
  },

  {
    id: 9,

    question: "Où est-ce qu’elles se promènent ?",

    image:
      "/images/courses/elementary/lesloisirsdesfrancais/Q9.png",

    teacherImage:
      "/images/courses/teacher/jeantalkquestion.png",

    teacherAudioQuestion:
      "/audios/teacher/elementary-1/activity2/q9/qteacher9.mp3",

    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q9_correct.mp3",

    wrongAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q9_wrong.mp3",

    choices: [
      {
        id: "A",

        label: "Elles se promènent le long du bord de mer",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : elles se promènent sur les quais de Seine.",

        explanationWrong:
          "Non, elles ne se promènent pas le long du bord de mer.",
      },

      {
        id: "B",

        label: "Elles se promènent dans la forêt de Rambouillet",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : elles se promènent sur les quais de Seine.",

        explanationWrong:
          "Non, elles ne se promènent pas dans la forêt de Rambouillet.",
      },

      {
        id: "C",

        label: "Elles se promènent sur les quais de Seine",

        isCorrect: true,

        explanationCorrect:
          "Exact ! Elles se promènent sur les quais de Seine.",

        explanationWrong:
          "Ce choix était correct : elles se promènent sur les quais de Seine.",
      },
    ],
  },

  {
    id: 10,

    question: "À quel jeu est-ce qu’ils jouent ?",

    image:
      "/images/courses/elementary/lesloisirsdesfrancais/Q10.png",

    teacherImage:
      "/images/teacher/jeantalkquestion.png",

    teacherAudioQuestion:
      "/audios/teacher/elementary-1/activity2/q10/qteacher10.mp3",

    correctAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q10_correct.mp3",

    wrongAudio:
      "/audios/courses/elementary/lesloisirsdesfrancais/q10_wrong.mp3",

    choices: [
      {
        id: "A",

        label: "Ils jouent aux échecs",

        isCorrect: true,

        explanationCorrect:
          "Exact ! Ils jouent aux échecs.",

        explanationWrong:
          "Ce choix était correct : ils jouent aux échecs.",
      },

      {
        id: "B",

        label: "Ils jouent à un jeu vidéo",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils jouent aux échecs.",

        explanationWrong:
          "Non, ils ne jouent pas à un jeu vidéo.",
      },

      {
        id: "C",

        label: "Ils jouent au Duplo",

        isCorrect: false,

        explanationCorrect:
          "Bonne réponse : ils jouent aux échecs.",

        explanationWrong:
          "Non, ils ne jouent pas au Duplo.",
      },
    ],
  },
];