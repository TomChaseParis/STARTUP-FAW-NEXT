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

export const avoirSpeakingData: ExerciseCategory = {
  title: "2. AVOIR",

  image:
    "/images/courses/beginner/activities/activity1/asset-avoir.png",

  items: [
    {
      phrase: "Tu ....... quel âge ?",
      answer: "as",
      expectedSentence: "Tu as quel âge ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q1/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q1/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q1/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q1/answer.mp3",
      },
    },

  /*   {
      phrase: "Excusez-moi, je n'....... pas le temps",
      answer: "ai",
      expectedSentence:
        "Excusez-moi, je n'ai pas le temps",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q2/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q2/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q2/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q2/answer.mp3",
      },
    },

    {
      phrase: "Ils n'....... pas d'argent",
      answer: "ont",
      expectedSentence:
        "Ils n'ont pas d'argent",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q3/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q3/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q3/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q3/answer.mp3",
      },
    },

    {
      phrase: "Pardon, vous ....... l'heure ?",
      answer: "avez",
      expectedSentence:
        "Pardon, vous avez l'heure ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q4/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q4/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q4/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q4/answer.mp3",
      },
    },

    {
      phrase: "Nous ....... un problème",
      answer: "avons",
      expectedSentence:
        "Nous avons un problème",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q5/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q5/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q5/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q5/answer.mp3",
      },
    },

    {
      phrase: "Elle ....... 15 ans",
      answer: "a",
      expectedSentence:
        "Elle a 15 ans",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q6/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q6/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q6/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q6/answer.mp3",
      },
    },

    {
      phrase: "Vous ....... une minute s'il vous plaît ?",
      answer: "avez",
      expectedSentence:
        "Vous avez une minute s'il vous plaît ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q7/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q7/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q7/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q7/answer.mp3",
      },
    },

    {
      phrase: "On ....... faim et soif",
      answer: "a",
      expectedSentence:
        "On a faim et soif",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q8/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q8/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q8/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q8/answer.mp3",
      },
    }, */
  ],
};

export default avoirSpeakingData;