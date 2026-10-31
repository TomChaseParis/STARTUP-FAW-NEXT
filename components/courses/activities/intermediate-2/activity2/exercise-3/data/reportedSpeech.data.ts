export type ReportedSpeechQuestion = {
  id: number;
  speaker: string;
  sentence: string;
  imageSrc: string;
  audioSrc: string;
  professorAudioSrc?: string;
  instruction: string;
  expectedAnswer: string;
  acceptedAnswers: string[];
  explanation: string;
};

const HENRI_AUDIO =
  "/audios/courses/intermediate-2/activities/activity2/exercise-3/henri1.mp3";

export const REPORTED_SPEECH_EXAMPLE: ReportedSpeechQuestion = {
  id: 0,
  speaker: "Pauline",
  sentence: "Viens m'aider à vider la voiture !",
  imageSrc: "/images/courses/intermediate-2/activities/activity2/exercise-3/img0.png",
  audioSrc: "/audios/courses/intermediate-2/activities/activity2/exercise-3/paulineQ1.mp3",
  professorAudioSrc: HENRI_AUDIO,
  instruction: "Rapporte les paroles de Pauline au discours indirect.",
  expectedAnswer: "Elle m'a demandé de l'aider à vider la voiture.",
  acceptedAnswers: [
    "Elle m'a demandé de l'aider à vider la voiture",
  ],
  explanation:
    "L'impératif devient « de » suivi de l'infinitif.",
};

export const REPORTED_SPEECH_QUESTIONS: ReportedSpeechQuestion[] = [
  {
    id: 1,
    speaker: "Pauline",
    sentence: "Viens mettre la table !",
    imageSrc: "/images/courses/intermediate-2/activities/activity2/exercise-3/img1.png",
    audioSrc: "/audios/courses/intermediate-2/activities/activity2/exercise-3/paulineQ2.mp3",
    professorAudioSrc: HENRI_AUDIO,
    instruction: "Rapporte les paroles de Pauline au discours indirect.",
    expectedAnswer: "Elle m'a demandé de venir mettre la table.",
    acceptedAnswers: [
      "Elle m'a demandé de venir mettre la table.",
      "Elle m'a demandé de venir mettre la table",
    ],
    explanation:
      "L'impératif « viens » devient « de venir ». Le verbe « mettre » reste à l'infinitif.",
  },
  {
    id: 2,
    speaker: "Pauline",
    sentence: "Repose le chat par terre !",
    imageSrc: "/images/courses/intermediate-2/activities/activity2/exercise-3/img2.png",
    audioSrc: "/audios/courses/intermediate-2/activities/activity2/exercise-3/paulineQ3.mp3",
    professorAudioSrc: HENRI_AUDIO,
    instruction: "Rapporte les paroles de Pauline au discours indirect.",
    expectedAnswer: "Elle m'a demandé de reposer le chat par terre.",
    acceptedAnswers: [
      "Elle m'a demandé de reposer le chat par terre.",
    ],
    explanation:
      "L'impératif « repose » devient « de reposer ».",
  },
  {
    id: 3,
    speaker: "Pauline",
    sentence: "Éteins l'ordinateur et viens te coucher !",
    imageSrc: "/images/courses/intermediate-2/activities/activity2/exercise-3/img3.png",
    audioSrc: "/audios/courses/intermediate-2/activities/activity2/exercise-3/paulineQ4.mp3",
    professorAudioSrc: HENRI_AUDIO,
    instruction: "Rapporte les deux actions demandées par Pauline au discours indirect.",
    expectedAnswer: "Elle m'a demandé d'éteindre l'ordinateur et de venir me coucher.",
    acceptedAnswers: [
      "Elle m'a demandé d'éteindre l'ordinateur et de venir me coucher.",
    ],
    explanation:
      "Les deux impératifs deviennent des infinitifs introduits par « de » ou « d' ». Le pronom « te » devient « me ».",
  },
  {
    id: 4,
    speaker: "Pauline",
    sentence: "Donne-moi de l'argent pour les courses !",
    imageSrc: "/images/courses/intermediate-2/activities/activity2/exercise-3/img4.png",
    audioSrc: "/audios/courses/intermediate-2/activities/activity2/exercise-3/paulineQ5.mp3",
    professorAudioSrc: HENRI_AUDIO,
    instruction: "Attention aux changements de pronoms. Rapporte cette demande au discours indirect.",
    expectedAnswer: "Elle m'a demandé de lui donner de l'argent pour les courses.",
    acceptedAnswers: [
      "Elle m'a demandé de lui donner de l'argent pour les courses.",
    ],
    explanation:
      "Le pronom « moi » désignant Pauline devient « lui ». L'impératif « donne » devient « de donner ».",
  },
  {
    id: 5,
    speaker: "Pauline",
    sentence: "Où est-ce que tu as prévu d'aller ?",
    imageSrc: "/images/courses/intermediate-2/activities/activity2/exercise-3/img5.png",
    audioSrc: "/audios/courses/intermediate-2/activities/activity2/exercise-3/paulineQ6.mp3",
    professorAudioSrc: HENRI_AUDIO,
    instruction: "Rapporte cette question de Pauline au discours indirect.",
    expectedAnswer: "Elle m'a demandé où j'avais prévu d'aller.",
    acceptedAnswers: [
      "Elle m'a demandé où j'avais prévu d'aller.",
    ],
    explanation:
      "Le mot interrogatif « où » est conservé. Le passé composé devient plus-que-parfait.",
  },
  {
    id: 6,
    speaker: "Pauline",
    sentence: "Est-ce que tu as pensé à appeler ma mère pour son anniversaire ?",
    imageSrc: "/images/courses/intermediate-2/activities/activity2/exercise-3/img6.png",
    audioSrc: "/audios/courses/intermediate-2/activities/activity2/exercise-3/paulineQ7.mp3",
    professorAudioSrc: HENRI_AUDIO,
    instruction: "Attention à la transformation de la question et au changement de personne.",
    expectedAnswer: "Elle m'a demandé si j'avais pensé à appeler sa mère pour son anniversaire.",
    acceptedAnswers: [
      "Elle m'a demandé si j'avais pensé à appeler sa mère pour son anniversaire.",
    ],
    explanation:
      "« Est-ce que » devient « si ». « Ma mère » devient « sa mère » et le passé composé devient plus-que-parfait.",
  },
  {
    id: 7,
    speaker: "Pauline",
    sentence: "Qu'est-ce que tu comptes faire pour trouver un travail ?",
    imageSrc: "/images/courses/intermediate-2/activities/activity2/exercise-3/img7.png",
    audioSrc: "/audios/courses/intermediate-2/activities/activity2/exercise-3/paulineQ8.mp3",
    professorAudioSrc: HENRI_AUDIO,
    instruction: "Reformule cette question au discours indirect en faisant attention au mot interrogatif.",
    expectedAnswer: "Elle m'a demandé ce que je comptais faire pour trouver un travail.",
    acceptedAnswers: [
      "Elle m'a demandé ce que je comptais faire pour trouver un travail.",
    ],
    explanation:
      "« Qu'est-ce que » devient « ce que ». Le sujet « tu » devient « je » et « comptes » devient « comptais ».",
  },
  {
    id: 8,
    speaker: "Pauline",
    sentence: "Tu es le pire mec que j'aie jamais rencontré.",
    imageSrc: "/images/courses/intermediate-2/activities/activity2/exercise-3/img8.png",
    audioSrc: "/audios/courses/intermediate-2/activities/activity2/exercise-3/paulineQ9.mp3",
    instruction: "Pauline ne pose pas de question cette fois. Rapporte ce qu'elle t'a dit au discours indirect.",
    expectedAnswer: "Elle m'a dit que j'étais le pire mec qu'elle avait jamais rencontré.",
    acceptedAnswers: [
      "Elle m'a dit que j'étais le pire mec qu'elle avait jamais rencontré.",
    ],
    explanation:
      "Une phrase déclarative est introduite par « que ». Les pronoms et les temps verbaux sont adaptés au discours indirect.",
  },
];