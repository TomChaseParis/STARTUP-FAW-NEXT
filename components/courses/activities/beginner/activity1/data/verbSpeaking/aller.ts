export type ExerciseItem = {
  phrase: string;
  answer: string;
  expectedSentence: string;

  audio: {
    correct: string[];
    wrong1: string[];
    wrong2: string[];
    solution: string;
  };
};

export type ExerciseCategory = {
  title: string;
  image: string;
  items: ExerciseItem[];
};

export const allerSpeakingData: ExerciseCategory = {
  title: "4. ALLER",

  image:
    "/images/courses/beginner/activities/activity1/asset-aller.png",

  items: [
    {
      phrase: "Vous ....... bien ?",
      answer: "allez",
      expectedSentence:
        "Vous allez bien ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q1/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q1/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q1/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q1/answer.mp3",
      },
    },

    {
      phrase: "Elle ....... où ?",
      answer: "va",
      expectedSentence:
        "Elle va où ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q2/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q2/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q2/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q2/answer.mp3",
      },
    },

    {
      phrase: "On ....... au cinéma ?",
      answer: "va",
      expectedSentence:
        "On va au cinéma ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q3/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q3/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q3/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q3/answer.mp3",
      },
    },

    {
      phrase: "Tu ....... téléphoner ?",
      answer: "vas",
      expectedSentence:
        "Tu vas téléphoner ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q4/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q4/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q4/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q4/answer.mp3",
      },
    },

    {
      phrase: "Mes parents ne ....... pas bien",
      answer: "vont",
      expectedSentence:
        "Mes parents ne vont pas bien",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q5/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q5/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q5/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q5/answer.mp3",
      },
    },

    {
      phrase: "Je ....... avec toi",
      answer: "vais",
      expectedSentence:
        "Je vais avec toi",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q6/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q6/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q6/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q6/answer.mp3",
      },
    },

    {
      phrase: "Nous ....... à la banque",
      answer: "allons",
      expectedSentence:
        "Nous allons à la banque",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q7/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q7/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q7/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q7/answer.mp3",
      },
    },
  ],
};

export default allerSpeakingData;