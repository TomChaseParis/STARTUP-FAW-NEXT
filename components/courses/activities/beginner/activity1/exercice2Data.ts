"use client";

export type ExerciseItem = {
  phrase: string;
  answer: string;

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

export const exercice2Data: ExerciseCategory[] = [
  /* ================= ÊTRE ================= */
  {
    title: "1. ÊTRE",
    image: "/images/courses/beginner/activities/activity1/asset-etre.png",
    items: [
      {
        phrase: "Qui ....... étudiant ? Qui travaille ?",
        answer: "est",
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

export default exercice2Data;