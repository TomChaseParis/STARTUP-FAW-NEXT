"use client";

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

export const verbSpeakingData: ExerciseCategory[] = [
  /* ================= ÊTRE ================= */
 
  {
    title: "1. ÊTRE",
    image: "/images/courses/beginner/activities/activity1/asset-etre.png",
    items: [
      {
        phrase: "Qui ....... étudiant ? Qui travaille ?",
        answer: "est",
        expectedSentence:
          "Qui est étudiant ? Qui travaille ?",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q1/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q1/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q1/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q1/answer.mp3",
        },
      },
      {
        phrase: "Où ....... les toilettes ?",
        answer: "sont",
        expectedSentence:
          "Où sont les toilettes ?",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q2/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q2/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q2/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q2/answer.mp3",
        },
      },
      {
        phrase: "Je ne ....... pas français",
        answer: "suis",
        expectedSentence:
          "Je ne suis pas français",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q3/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q3/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q3/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q3/answer.mp3",
        },
      },
      {
        phrase: "Tu ....... fatigué ?",
        answer: "es",
        expectedSentence:
          "Tu es fatigué ?",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q4/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q4/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q4/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q4/answer.mp3",
        },
      },
      {
        phrase: "Nous ....... étrangers",
        answer: "sommes",
        expectedSentence:
          "Nous sommes étrangers",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q5/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q5/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q5/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q5/answer.mp3",
        },
      },
      {
        phrase: "Merci, vous ....... bien aimables",
        answer: "êtes",
        expectedSentence:
          "Merci, vous êtes bien aimables",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q6/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q6/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q6/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q6/answer.mp3",
        },
      },
      {
        phrase: "On ....... en retard. Excusez-nous",
        answer: "est",
        expectedSentence:
          "On est en retard. Excusez-nous",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q7/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q7/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q7/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ETRE/Q7/answer.mp3",
        },
      },
    ],
  },
  /* ================= AVOIR ================= */
  {
    title: "2. AVOIR",
    image: "/images/courses/beginner/activities/activity1/asset-avoir.png",
    items: [
      {
        phrase: "Tu ....... quel âge ?",
        answer: "as",
        expectedSentence: "Tu as quel âge",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q1/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q1/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q1/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q1/answer.mp3",
        },
      },
      {
        phrase: "Excusez-moi, je n'....... pas le temps",
        answer: "ai",
        expectedSentence: "Excusez moi je n ai pas le temps",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q2/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q2/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q2/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q2/answer.mp3",
        },
      },
      {
        phrase: "Ils n'....... pas d'argent",
        answer: "ont",
        expectedSentence: "Ils n ont pas d argent",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q3/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q3/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q3/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q3/answer.mp3",
        },
      },
      {
        phrase: "Pardon, vous ....... l'heure ?",
        answer: "avez",
        expectedSentence: "Pardon vous avez l heure",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q4/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q4/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q4/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q4/answer.mp3",
        },
      },
      {
        phrase: "Nous ....... un problème",
        answer: "avons",
        expectedSentence: "Nous avons un problème",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q5/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q5/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q5/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q5/answer.mp3",
        },
      },
      {
        phrase: "Elle ....... 15 ans",
        answer: "a",
        expectedSentence: "Elle a 15 ans",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q6/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q6/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q6/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q6/answer.mp3",
        },
      },
      {
        phrase: "Vous ....... une minute s'il vous plaît ?",
        answer: "avez",
        expectedSentence: "Vous avez une minute s il vous plaît",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q7/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q7/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q7/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q7/answer.mp3",
        },
      },
      {
        phrase: "On ....... faim et soif",
        answer: "a",
        expectedSentence: "On a faim et soif",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q8/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q8/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q8/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/AVOIR/Q8/answer.mp3",
        },
      },
    ],
  },

  /* ================= FAIRE ================= */
  {
    title: "3. FAIRE",
    image: "/images/courses/beginner/activities/activity1/asset-faire.png",
    items: [
      {
        phrase: "Qu'est-ce qu'elle ....... comme études ?",
        answer: "fait",
        expectedSentence: "Qu'est-ce qu'elle fait comme études ?",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q1/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q1/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q1/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q1/answer.mp3",
        },
      },
      {
        phrase: "Vous ....... du sport ?",
        answer: "faites",
        expectedSentence: "Vous faites du sport ?",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q2/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q2/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q2/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q2/answer.mp3",
        },
      },
      {
        phrase: "Elles ....... un voyage en Asie",
        answer: "font",
        expectedSentence: "Elles font un voyage en Asie",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q3/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q3/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q3/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q3/answer.mp3",
        },
      },
      {
        phrase: "Je vous ....... un café ?",
        answer: "fais",
        expectedSentence: "Je vous fais un café ?",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q4/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q4/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q4/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q4/answer.mp3",
        },
      },
      {
        phrase: "Il ....... froid aujourd'hui ?",
        answer: "fait",
        expectedSentence: "Il fait froid aujourd'hui ?",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q5/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q5/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q5/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q5/answer.mp3",
        },
      },
      {
        phrase: "Nous ....... des études en France",
        answer: "faisons",
        expectedSentence: "Nous faisons des études en France",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q6/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q6/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q6/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q6/answer.mp3",
        },
      },
      {
        phrase: "Qu'est-ce que tu ....... ce soir ?",
        answer: "fais",
        expectedSentence: "Qu'est-ce que tu fais ce soir ?",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q7/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q7/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q7/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/FAIRE/Q7/answer.mp3",
        },
      },
    ],
  },

  /* ================= ALLER ================= */
  {
    title: "4. ALLER",
    image: "/images/courses/beginner/activities/activity1/asset-aller.png",
    items: [
      {
        phrase: "Vous ....... bien ?",
        answer: "allez",
        expectedSentence: "Vous allez bien ?",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q1/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q1/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q1/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q1/answer.mp3",
        },
      },
      {
        phrase: "Elle ....... où ?",
        answer: "va",
        expectedSentence: "Elle va où ?",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q2/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q2/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q2/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q2/answer.mp3",
        },
      },
      {
        phrase: "On ....... au cinéma ?",
        answer: "va",
        expectedSentence: "On va au cinéma ?",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q3/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q3/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q3/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q3/answer.mp3",
        },
      },
      {
        phrase: "Tu ....... téléphoner ?",
        answer: "vas",
        expectedSentence: "Tu vas téléphoner ?",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q4/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q4/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q4/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q4/answer.mp3",
        },
      },
      {
        phrase: "Mes parents ne ....... pas bien",
        answer: "vont",
        expectedSentence: "Mes parents ne vont pas bien",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q5/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q5/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q5/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q5/answer.mp3",
        },
      },
      {
        phrase: "Je ....... avec toi",
        answer: "vais",
        expectedSentence: "Je vais avec toi",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q6/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q6/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q6/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q6/answer.mp3",
        },
      },
      {
        phrase: "Nous ....... à la banque",
        answer: "allons",
        expectedSentence: "Nous allons à la banque",
        audio: {
          correct: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q7/goodanswermarie.mp3"],
          wrong1: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q7/badanswermarie1.mp3"],
          wrong2: ["/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q7/badanswermarie2.mp3"],
          solution: "/audios/courses/beginner/activity1/exercice2/prononciation/ALLER/Q7/answer.mp3",
        },
      },
    ],
  },
];

export default verbSpeakingData;