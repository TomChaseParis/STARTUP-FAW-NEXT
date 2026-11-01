
export type QuestionMatchingOption = {
  id: string;
  text: string;
};

export type QuestionMatchingData = {
  id: string;
  imageSrc: string;
  options: QuestionMatchingOption[];
  correctOptionId: string;
  expectedSpeech: string;
  feedback: {
    correct: string;
    incorrect: string;
  };
  audio: {
    correct: string;
    incorrect: string;
  };
  maxAttempts: 1;
};

const AUDIO_BASE_PATH =
  "/audios/courses/elementary-2/activity1/exercise-2";

const IMAGE_BASE_PATH =
  "/images/courses/elementary2/activity1/exercise-2";

const INCORRECT_AUDIO = `${AUDIO_BASE_PATH}/bad-answer.mp3`;

const FIRST_QUESTIONS_OPTIONS: QuestionMatchingOption[] = [
  {
    id: "option-1",
    text: "Comment est-ce que tu vas au travail ?",
  },
  {
    id: "option-2",
    text: "De quelle couleur est ton pyjama ?",
  },
  {
    id: "option-3",
    text: "À quelle heure est-ce que tu pars de chez toi ?",
  },
  {
    id: "option-4",
    text: "Qu'est-ce que tu prends pour ton petit déjeuner ?",
  },
  {
    id: "option-5",
    text: "À quelle heure est-ce que tu te lèves le matin ?",
  },
];

const WORK_QUESTIONS_OPTIONS: QuestionMatchingOption[] = [
  {
    id: "option-1",
    text: "Qu'est-ce que tu fais après le travail ?",
  },
  {
    id: "option-2",
    text: "Qu'est-ce que tu fais après le déjeuner ?",
  },
  {
    id: "option-3",
    text: "Jusqu'à quelle heure est-ce que tu travailles ?",
  },
  {
    id: "option-4",
    text: "Qu'est-ce que tu fais comme travail ?",
  },
  {
    id: "option-5",
    text: "Avec qui est-ce que tu déjeunes le midi ?",
  },
];

const EVENING_QUESTIONS_OPTIONS: QuestionMatchingOption[] = [
  {
    id: "option-1",
    text: "Qu'est-ce que tu fais après le travail ?",
  },
  {
    id: "option-2",
    text: "Qu'est-ce que tu fais en rentrant chez toi ?",
  },
  {
    id: "option-3",
    text: "À quelle heure est-ce que tu te couches ?",
  },
  {
    id: "option-4",
    text: "Qu'est-ce que tu fais avant de dormir ?",
  },
  {
    id: "option-5",
    text: "À qui est-ce que tu téléphones ?",
  },
];

export const questionMatchingData: QuestionMatchingData[] = [
  // QUESTION 1 — LE RÉVEIL
  {
    id: "question-1",
    imageSrc: `${IMAGE_BASE_PATH}/img1.jpg`,
    options: FIRST_QUESTIONS_OPTIONS,
    correctOptionId: "option-5",
    expectedSpeech: "À quelle heure est-ce que tu te lèves le matin ?",
    feedback: {
      correct: "Je me lève à 9 heures.",
      incorrect: "Ce n'était pas bonne question, désolée.",
    },
    audio: {
      correct: `${AUDIO_BASE_PATH}/good-answer-1.mp3`,
      incorrect: INCORRECT_AUDIO,
    },
    maxAttempts: 1,
  },

  // QUESTION 2 — LE PETIT DÉJEUNER
  {
    id: "question-2",
    imageSrc: `${IMAGE_BASE_PATH}/img2.jpg`,
    options: FIRST_QUESTIONS_OPTIONS,
    correctOptionId: "option-4",
    expectedSpeech: "Qu'est-ce que tu prends pour ton petit déjeuner ?",
    feedback: {
      correct:
        "Je bois du thé avec du miel et je mange une tartine de pain avec de la confiture, et des céréales.",
      incorrect: "Ce n'était pas bonne question, désolée.",
    },
    audio: {
      correct: `${AUDIO_BASE_PATH}/good-answer-2.mp3`,
      incorrect: INCORRECT_AUDIO,
    },
    maxAttempts: 1,
  },

  // QUESTION 3 — LE DÉPART DE LA MAISON
  {
    id: "question-3",
    imageSrc: `${IMAGE_BASE_PATH}/img3.jpg`,
    options: FIRST_QUESTIONS_OPTIONS,
    correctOptionId: "option-3",
    expectedSpeech: "À quelle heure est-ce que tu pars de chez toi ?",
    feedback: {
      correct: "Je pars de chez moi à 10 heures moins le quart.",
      incorrect: "Ce n'était pas bonne question, désolée.",
    },
    audio: {
      correct: `${AUDIO_BASE_PATH}/good-answer-3.mp3`,
      incorrect: INCORRECT_AUDIO,
    },
    maxAttempts: 1,
  },

  // QUESTION 4 — LE TRAJET AU TRAVAIL
  {
    id: "question-4",
    imageSrc: `${IMAGE_BASE_PATH}/img4.jpg`,
    options: FIRST_QUESTIONS_OPTIONS,
    correctOptionId: "option-1",
    expectedSpeech: "Comment est-ce que tu vas au travail ?",
    feedback: {
      correct: "Je vais au travail en métro.",
      incorrect: "Ce n'était pas bonne question, désolée.",
    },
    audio: {
      correct: `${AUDIO_BASE_PATH}/good-answer-4.mp3`,
      incorrect: INCORRECT_AUDIO,
    },
    maxAttempts: 1,
  },

  // QUESTION 5 — LE MÉTIER
  {
    id: "question-5",
    imageSrc: `${IMAGE_BASE_PATH}/img5.jpg`,
    options: WORK_QUESTIONS_OPTIONS,
    correctOptionId: "option-4",
    expectedSpeech: "Qu'est-ce que tu fais comme travail ?",
    feedback: {
      correct: "Je suis professeurs de danse orientale.",
      incorrect: "Ce n'était pas bonne question, désolée.",
    },
    audio: {
      correct: `${AUDIO_BASE_PATH}/good-answer-5.mp3`,
      incorrect: INCORRECT_AUDIO,
    },
    maxAttempts: 1,
  },

  // QUESTION 6 — LE DÉJEUNER AVEC LES COLLÈGUES
  {
    id: "question-6",
    imageSrc: `${IMAGE_BASE_PATH}/img6.jpg`,
    options: WORK_QUESTIONS_OPTIONS,
    correctOptionId: "option-5",
    expectedSpeech: "Avec qui est-ce que tu déjeunes le midi ?",
    feedback: {
      correct: "En général, je déjeune avec mes collègues.",
      incorrect: "Ce n'était pas bonne question, désolée.",
    },
    audio: {
      correct: `${AUDIO_BASE_PATH}/good-answer-6.mp3`,
      incorrect: INCORRECT_AUDIO,
    },
    maxAttempts: 1,
  },

  // QUESTION 7 — APRÈS LE DÉJEUNER
  {
    id: "question-7",
    imageSrc: `${IMAGE_BASE_PATH}/img7.jpg`,
    options: WORK_QUESTIONS_OPTIONS,
    correctOptionId: "option-2",
    expectedSpeech: "Qu'est-ce que tu fais après le déjeuner ?",
    feedback: {
      correct:
        "Après le restaurant ? Je vais parfois m'asseoir dans un parc pour lire un bon livre et m'aérer l'esprit.",
      incorrect: "Ce n'était pas bonne question, désolée.",
    },
    audio: {
      correct: `${AUDIO_BASE_PATH}/good-answer-7.mp3`,
      incorrect: INCORRECT_AUDIO,
    },
    maxAttempts: 1,
  },

  // QUESTION 8 — LA FIN DE LA JOURNÉE DE TRAVAIL
  {
    id: "question-8",
    imageSrc: `${IMAGE_BASE_PATH}/img8.jpg`,
    options: WORK_QUESTIONS_OPTIONS,
    correctOptionId: "option-3",
    expectedSpeech: "Jusqu'à quelle heure est-ce que tu travailles ?",
    feedback: {
      correct: "Je travaille jusqu'à quatre heures de l'après-midi.",
      incorrect: "Ce n'était pas bonne question, désolée.",
    },
    audio: {
      correct: `${AUDIO_BASE_PATH}/good-answer-8.mp3`,
      incorrect: INCORRECT_AUDIO,
    },
    maxAttempts: 1,
  },

  // QUESTION 9 — APRÈS LE TRAVAIL
  {
    id: "question-9",
    imageSrc: `${IMAGE_BASE_PATH}/img9.jpg`,
    options: WORK_QUESTIONS_OPTIONS,
    correctOptionId: "option-1",
    expectedSpeech: "Qu'est-ce que tu fais après le travail ?",
    feedback: {
      correct:
        "Après le travail ? Je me promène un peu et je vais faire des courses.",
      incorrect: "Ce n'était pas bonne question, désolée.",
    },
    audio: {
      correct: `${AUDIO_BASE_PATH}/good-answer-9.mp3`,
      incorrect: INCORRECT_AUDIO,
    },
    maxAttempts: 1,
  },

  // QUESTION 10 — EN RENTRANT CHEZ SOI
  {
    id: "question-10",
    imageSrc: `${IMAGE_BASE_PATH}/img10.jpg`,
    options: EVENING_QUESTIONS_OPTIONS,
    correctOptionId: "option-2",
    expectedSpeech: "Qu'est-ce que tu fais en rentrant chez toi ?",
    feedback: {
      correct: "Je donne à manger à Gaston et je prépare mon dîner.",
      incorrect: "Ce n'était pas bonne question, désolée.",
    },
    audio: {
      correct: `${AUDIO_BASE_PATH}/good-answer-10.mp3`,
      incorrect: INCORRECT_AUDIO,
    },
    maxAttempts: 1,
  },

  // QUESTION 11 — AVANT DE DORMIR
  {
    id: "question-11",
    imageSrc: `${IMAGE_BASE_PATH}/img11.jpg`,
    options: EVENING_QUESTIONS_OPTIONS,
    correctOptionId: "option-4",
    expectedSpeech: "Qu'est-ce que tu fais avant de dormir ?",
    feedback: {
      correct: "Je lis un peu dans mon lit.",
      incorrect: "Ce n'était pas bonne question, désolée.",
    },
    audio: {
      correct: `${AUDIO_BASE_PATH}/good-answer-11.mp3`,
      incorrect: INCORRECT_AUDIO,
    },
    maxAttempts: 1,
  },
];
