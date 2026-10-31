/* ========= Types normalisés pour QuizEngine ========= */

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
  teacherAudioQuestion: string;
};

/* ==========================================================================
   QCM DATA — INTERMEDIATE 2 — ACTIVITY 1 — EXERCISE 3
   Il faut qu'ils fassent quoi ?
========================================================================== */

export const QCMData: Question[] = [
  {
    id: 1,
    question:
      "Le petit Paul a le trac avant son concert...",
    image:
      "/images/courses/intermediate-2/activities/activity1/QCM/Q1.jpg",
    teacherAudioQuestion: "/audios/courses/intermediate-2/activities/activity1/QCM/Q1.mp3",
    choices: [
      {
        id: "A",
        label: "Il faut qu’il annule le concert.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Il n'est pas nécessaire d'annuler le concert. Paul peut essayer de se détendre avant de monter sur scène.",
      },
      {
        id: "B",
        label: "Il faut qu’il boive un grand verre d’eau.",
        isCorrect: true,
        explanationCorrect:
          "Exactement ! Après « il faut que », on utilise le subjonctif présent : « qu’il boive ».",
        explanationWrong: "",
      },
      {
        id: "C",
        label: "Il faut qu’il prenne un Xanax.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Ce n'est pas le conseil proposé dans cette situation.",
      },
    ],
  },

  {
    id: 2,
    question:
      "Roman s’ennuie comme jamais...",
    image:
      "/images/courses/intermediate-2/activities/activity1/QCM/Q2.jpg",
      teacherAudioQuestion: "/audios/courses/intermediate-2/activities/activity1/QCM/Q2.mp3",
      choices: [
      {
        id: "A",
        label: "Il faut qu’ils changent de chaîne.",
        isCorrect: true,
        explanationCorrect:
          "Bravo ! La bonne réponse est « qu’ils changent ». Le verbe changer est au subjonctif présent.",
        explanationWrong: "",
      },
      {
        id: "B",
        label: "Il faut qu’il change de copine.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Ce n'est pas le conseil adapté à cette situation.",
      },
      {
        id: "C",
        label: "Il faut qu’il change de vie.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Changer de vie est une solution un peu radicale pour quelqu'un qui s'ennuie devant la télévision !",
      },
    ],
  },

  {
    id: 3,
    question:
      "Lucas se fait massacrer...",
    image:
      "/images/courses/intermediate-2/activities/activity1/QCM/Q3.jpg",
      teacherAudioQuestion: "/audios/courses/intermediate-2/activities/activity1/QCM/Q3.mp3",
      choices: [
      {
        id: "A",
        label: "Il faut qu’il sorte un revolver.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "La violence n'est pas une solution.",
      },
      {
        id: "B",
        label: "Il faut qu’il se relève.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Dans cette situation, le conseil attendu est d'arrêter le combat.",
      },
      {
        id: "C",
        label: "Il faut qu’il arrête la boxe.",
        isCorrect: true,
        explanationCorrect:
          "Exact ! « Qu’il arrête » est au subjonctif présent après « il faut que ».",
        explanationWrong: "",
      },
    ],
  },

  {
    id: 4,
    question:
      "Nathan ne comprend rien à ce qu’on lui dit...",
    image:
      "/images/courses/intermediate-2/activities/activity1/QCM/Q4.png",
      teacherAudioQuestion: "/audios/courses/intermediate-2/activities/activity1/QCM/Q4.mp3",
      choices: [
      {
        id: "A",
        label: "Il faut qu’il se coupe les cheveux.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Se couper les cheveux ne l'aidera pas à comprendre ce qu'on lui dit.",
      },
      {
        id: "B",
        label: "Il faut qu’il reprenne des cours de chinois.",
        isCorrect: true,
        explanationCorrect:
          "Très bien ! « Qu’il reprenne » est au subjonctif présent du verbe reprendre.",
        explanationWrong: "",
      },
      {
        id: "C",
        label: "Il faut qu’il arrête de parler.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Le conseil attendu est de reprendre des cours de chinois.",
      },
    ],
  },

  {
    id: 5,
    question:
      "Anne-Lise a très mal à la dent...",
    image:
      "/images/courses/intermediate-2/activities/activity1/QCM/Q5.jpg",
      teacherAudioQuestion: "/audios/courses/intermediate-2/activities/activity1/QCM/Q5.mp3",
      choices: [
      {
        id: "A",
        label: "Il faut qu’elle se l’arrache.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Il vaut mieux consulter un professionnel plutôt que d'essayer de s'arracher une dent soi-même.",
      },
      {
        id: "B",
        label: "Il faut qu’elle aille voir un garagiste.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Un garagiste ne soigne pas les dents !",
      },
      {
        id: "C",
        label: "Il faut qu’elle aille voir un dentiste.",
        isCorrect: true,
        explanationCorrect:
          "Exactement ! « Qu’elle aille » est au subjonctif présent du verbe aller.",
        explanationWrong: "",
      },
    ],
  },

  {
    id: 6,
    question:
      "René est tombé dans l’enclos des ours...",
    image:
      "/images/courses/intermediate-2/activities/activity1/QCM/Q6.png",
      teacherAudioQuestion: "/audios/courses/intermediate-2/activities/activity1/QCM/Q6.mp3",
      choices: [
      {
        id: "A",
        label: "Il faut qu’il reste calme.",
        isCorrect: true,
        explanationCorrect:
          "Bravo ! « Qu’il reste » est au subjonctif présent du verbe rester.",
        explanationWrong: "",
      },
      {
        id: "B",
        label: "Il faut qu’il les attaque avec sa canne.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Attaquer les ours serait particulièrement dangereux !",
      },
      {
        id: "C",
        label: "Il faut qu’il se transforme en ours.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Malheureusement, René ne peut pas se transformer en ours !",
      },
    ],
  },

  {
    id: 7,
    question:
      "Johan et Sabrina sont pris de vertige...",
    image:
      "/images/courses/intermediate-2/activities/activity1/QCM/Q7.png",
      teacherAudioQuestion: "/audios/courses/intermediate-2/activities/activity1/QCM/Q7.mp3",
      choices: [
      {
        id: "A",
        label: "Il faut qu’ils sautent dans le vide.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Sauter dans le vide serait extrêmement dangereux.",
      },
      {
        id: "B",
        label: "Il faut qu’ils avancent très lentement.",
        isCorrect: true,
        explanationCorrect:
          "Très bien ! « Qu’ils avancent » est au subjonctif présent du verbe avancer.",
        explanationWrong: "",
      },
      {
        id: "C",
        label: "Il faut qu’ils se déshabillent.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Se déshabiller ne résoudra pas leur problème de vertige !",
      },
    ],
  },

  {
    id: 8,
    question:
      "Minouchat a croisé la fille de sa vie...",
    image:
      "/images/courses/intermediate-2/activities/activity1/QCM/Q8.png",
      teacherAudioQuestion: "/audios/courses/intermediate-2/activities/activity1/QCM/Q8.mp3",
      choices: [
      {
        id: "A",
        label: "Il faut qu’il aille lui parler.",
        isCorrect: true,
        explanationCorrect:
          "Exact ! « Qu’il aille » est au subjonctif présent du verbe aller.",
        explanationWrong: "",
      },
      {
        id: "B",
        label: "Il faut qu’il lui renifle le derrière.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Ce n'est pas vraiment la meilleure façon de faire connaissance !",
      },
      {
        id: "C",
        label: "Il faut qu’il se rase la tête.",
        isCorrect: false,
        explanationCorrect: "",
        explanationWrong:
          "Se raser la tête ne l'aidera pas à faire connaissance.",
      },
    ],
  },
];