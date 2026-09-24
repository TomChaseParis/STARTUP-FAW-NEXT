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

export const etreSpeakingData: ExerciseCategory = {
  title: "1. ÊTRE",

  image:
    "/images/courses/beginner/activities/activity1/asset-etre.png",

  items: [
    {
      phrase: "Qui ....... étudiant ? Qui travaille ?",
      answer: "est",
      expectedSentence:
        "Qui est étudiant ? Qui travaille ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q1/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q1/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q1/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q1/answer.mp3",
      },
    },

    {
      phrase: "Où ....... les toilettes ?",
      answer: "sont",
      expectedSentence:
        "Où sont les toilettes ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q2/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q2/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q2/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q2/answer.mp3",
      },
    },

    {
      phrase: "Je ne ....... pas français",
      answer: "suis",
      expectedSentence:
        "Je ne suis pas français",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q3/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q3/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q3/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q3/answer.mp3",
      },
    },

    {
      phrase: "Tu ....... fatigué ?",
      answer: "es",
      expectedSentence:
        "Tu es fatigué ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q4/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q4/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q4/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q4/answer.mp3",
      },
    },

    {
      phrase: "Nous ....... étrangers",
      answer: "sommes",
      expectedSentence:
        "Nous sommes étrangers",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q5/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q5/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q5/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q5/answer.mp3",
      },
    },

    {
      phrase: "Merci, vous ....... bien aimables",
      answer: "êtes",
      expectedSentence:
        "Merci, vous êtes bien aimables",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q6/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q6/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q6/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q6/answer.mp3",
      },
    },

    {
      phrase: "On ....... en retard. Excusez-nous",
      answer: "est",
      expectedSentence:
        "On est en retard. Excusez-nous",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q7/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q7/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q7/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q7/answer.mp3",
      },
    },
  ],
};

export default etreSpeakingData;