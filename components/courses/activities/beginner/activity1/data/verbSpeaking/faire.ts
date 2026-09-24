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

export const faireSpeakingData: ExerciseCategory = {
  title: "3. FAIRE",

  image:
    "/images/courses/beginner/activities/activity1/asset-faire.png",

  items: [
    {
      phrase: "Qu'est-ce qu'elle ....... comme études ?",
      answer: "fait",
      expectedSentence:
        "Qu'est-ce qu'elle fait comme études ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q1/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q1/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q1/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q1/answer.mp3",
      },
    },

   /*  {
      phrase: "Vous ....... du sport ?",
      answer: "faites",
      expectedSentence:
        "Vous faites du sport ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q2/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q2/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q2/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q2/answer.mp3",
      },
    },

    {
      phrase: "Elles ....... un voyage en Asie",
      answer: "font",
      expectedSentence:
        "Elles font un voyage en Asie",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q3/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q3/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q3/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q3/answer.mp3",
      },
    },

    {
      phrase: "Je vous ....... un café ?",
      answer: "fais",
      expectedSentence:
        "Je vous fais un café ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q4/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q4/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q4/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q4/answer.mp3",
      },
    },

    {
      phrase: "Il ....... froid aujourd'hui ?",
      answer: "fait",
      expectedSentence:
        "Il fait froid aujourd'hui ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q5/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q5/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q5/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q5/answer.mp3",
      },
    },

    {
      phrase: "Nous ....... des études en France",
      answer: "faisons",
      expectedSentence:
        "Nous faisons des études en France",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q6/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q6/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q6/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q6/answer.mp3",
      },
    },

    {
      phrase: "Qu'est-ce que tu ....... ce soir ?",
      answer: "fais",
      expectedSentence:
        "Qu'est-ce que tu fais ce soir ?",

      audio: {
        correct: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q7/goodanswermarie.mp3",
        ],

        wrong1: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q7/badanswermarie1.mp3",
        ],

        wrong2: [
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q7/badanswermarie2.mp3",
        ],

        solution:
          "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q7/answer.mp3",
      },
    }, */
  ],
};

export default faireSpeakingData;