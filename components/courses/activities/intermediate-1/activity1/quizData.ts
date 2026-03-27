
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
  image?: string;
  teacherImage?: string;
  correctAudio: string;
  wrongAudio: string;
  teacherAudioQuestion: string;
};


export const quizData: Question[] = [
  {
    id: 1,
    question: "Avec qui le chanteur passait-il ses vacances ?",
    teacherImage: "/images/courses/teacher/etiennetalkquestion.png",
    teacherAudioQuestion: "/audios/teacher/intermediate-1/activity1/q1/qteacher1.mp3",
    correctAudio: "/audios/courses/song/q1_correct.mp3",
    wrongAudio: "/audios/courses/song/q1_wrong.mp3",
    choices: [
      {
        id: "A",
        label: "Avec des amis de sa classe",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : il partait avec sa famille.",
        explanationWrong: "Non, la chanson ne parle pas d’amis.",
        teacherAudioWrong: "/audios/teacher/intermediate-1/activity1/q1/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Il était en colonie de vacances",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : il partait avec sa famille.",
        explanationWrong: "Non, il n’est pas question d’une colonie.",
        teacherAudioWrong: "/audios/teacher/intermediate-1/activity1/q1/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Avec sa famille",
        isCorrect: true,
        explanationCorrect: "Exact ! Il évoque ses parents et sa sœur.",
        explanationWrong: "Cette réponse était correcte.",
        teacherAudioCorrect: "/audios/teacher/intermediate-1/activity1/q1/C_correct.mp3",
      },
    ],
  },

  {
    id: 2,
    question: "Est-ce que sa famille avait de l’argent ?",
    teacherImage: "/images/courses/teacher/etiennetalkquestion.png",
    teacherAudioQuestion: "/audios/teacher/intermediate-1/activity1/q2/qteacher2.mp3",
    correctAudio: "/audios/courses/song/q2_correct.mp3",
    wrongAudio: "/audios/courses/song/q2_wrong.mp3",
    choices: [
      {
        id: "A",
        label: "Oui, sa famille était très riche",
        isCorrect: false,
        explanationCorrect:
          "Bonne réponse : ils n’avaient pas beaucoup d’argent.",
        explanationWrong: "Non, la famille devait surveiller ses dépenses.",
        teacherAudioWrong: "/audios/teacher/intermediate-1/activity1/q2/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Non, ses parents n’avaient pas beaucoup d’argent",
        isCorrect: true,
        explanationCorrect: "Exact ! Ils faisaient attention à leurs dépenses.",
        explanationWrong: "Cette réponse était correcte.",
        teacherAudioCorrect: "/audios/teacher/intermediate-1/activity1/q2/B_correct.mp3",
      },
    ],
  },

  {
    id: 3,
    question:
      "Quelles étaient les activités de la famille pendant les vacances ?",
      teacherImage: "/images/courses/teacher/etiennetalkquestion.png",
      teacherAudioQuestion: "/audios/teacher/intermediate-1/activity1/q3/qteacher3.mp3",
    correctAudio: "/audios/courses/song/q3_correct.mp3",
    wrongAudio: "/audios/courses/song/q3_wrong.mp3",
    choices: [
      {
        id: "A",
        label: "Ils faisaient du bateau tous les jours",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils allaient surtout à la plage.",
        explanationWrong: "Non, le bateau n’est pas l’activité principale.",
        teacherAudioWrong: "/audios/teacher/intermediate-1/activity1/q3/A_wrong.mp3",
      },
      {
        id: "B",
        label: "Ils allaient surtout à la plage",
        isCorrect: true,
        explanationCorrect: "Exact ! La plage est au centre des vacances.",
        explanationWrong: "Cette réponse était correcte.",
        teacherAudioCorrect: "/audios/teacher/intermediate-1/activity1/q3/B_correct.mp3",
      },
      {
        id: "C",
        label: "Ils restaient à l’hôtel toute la journée",
        isCorrect: false,
        explanationCorrect:
          "Bonne réponse : ils passaient la journée à la plage.",
        explanationWrong: "Non, ils passaient la journée dehors.",
        teacherAudioWrong: "/audios/teacher/intermediate-1/activity1/q3/C_wrong.mp3",
      },
    ],
  },

  {
    id: 4,
    question: "Est-ce que la famille aimait bien rester tard au lit le matin ?",
    teacherImage: "/images/courses/teacher/etiennetalkquestion.png",
    teacherAudioQuestion: "/audios/teacher/intermediate-1/activity1/q4/qteacher4.mp3",
    correctAudio: "/audios/courses/song/q4_correct.mp3",
    wrongAudio: "/audios/courses/song/q4_wrong.mp3",
    choices: [
      {
        id: "A",
        label: "Non, ils préféraient profiter de leur journée",
        isCorrect: true,
        explanationCorrect: "Exact ! Ils se levaient tôt.",
        explanationWrong: "Cette réponse était correcte.",
        teacherAudioCorrect: "/audios/teacher/intermediate-1/activity1/q4/A_correct.mp3",
      },
      {
        id: "B",
        label: "Oui, ils ne sortaient jamais avant midi",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils se levaient tôt.",
        explanationWrong: "Non, ils ne restaient pas au lit.",
        teacherAudioWrong: "/audios/teacher/intermediate-1/activity1/q4/B_wrong.mp3",
      },
      {
        id: "C",
        label: "Oui, ils dormaient jusqu’à midi",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : ils se levaient tôt.",
        explanationWrong: "Non, ils se réveillaient tôt.",
        teacherAudioWrong: "/audios/teacher/intermediate-1/activity1/q4/C_wrong.mp3",
      },
    ],
  },

  {
    id: 5,
    question: "Quelles étaient les deux conditions pour aller aux îles ?",
    teacherImage: "/images/courses/teacher/etiennetalkquestion.png",
    teacherAudioQuestion: "/audios/teacher/intermediate-1/activity1/q5/qteacher5.mp3",
    correctAudio: "/audios/courses/song/q5_correct.mp3",
    wrongAudio: "/audios/courses/song/q5_wrong.mp3",
    choices: [
      {
        id: "A",
        label: "Trouver un bateau qui accepte tout le monde",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : météo favorable et argent.",
        explanationWrong: "Non, cela n’est pas évoqué.",
        teacherAudioWrong: "/audios/teacher/intermediate-1/activity1/q5/A_wrong.mp3",
      },
      {
        id: "B",
        label: "De bonnes conditions météo et ne rien avoir à faire",
        isCorrect: false,
        explanationCorrect: "Bonne réponse : météo et argent.",
        explanationWrong: "Il manque la condition de l’argent.",
        teacherAudioWrong: "/audios/teacher/intermediate-1/activity1/q5/B_wrong.mp3",
      },
      {
        id: "C",
        label: "De bonnes conditions météo et avoir suffisamment d’argent",
        isCorrect: true,
        explanationCorrect: "Exact ! La météo et l’argent étaient nécessaires.",
        explanationWrong: "Cette réponse était correcte.",
        teacherAudioCorrect: "/audios/teacher/intermediate-1/activity1/q5/C_correct.mp3",
      },
    ],
  },
];
