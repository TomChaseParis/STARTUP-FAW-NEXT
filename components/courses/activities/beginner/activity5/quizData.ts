"use client";

/* ========= Types ========= */
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
};

export const quizData: Question[] = [
  {
    id: 1,
    question: "Alain et Michel ____ au concert",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q1.png",
    choices: [
      { id: "A", label: "chante", isCorrect: false, explanationCorrect: "", explanationWrong: "Sujet pluriel." },
      { id: "B", label: "chantent", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
      { id: "C", label: "chantons", isCorrect: false, explanationCorrect: "", explanationWrong: "“Nous chantons”." },
    ],
  },

  {
    id: 2,
    question: "Daniel se ____ les mains",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q2.png",
    choices: [
      { id: "A", label: "laves", isCorrect: false, explanationCorrect: "", explanationWrong: "“Tu laves”." },
      { id: "B", label: "lave", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
      { id: "C", label: "lavez", isCorrect: false, explanationCorrect: "", explanationWrong: "“Vous lavez”." },
    ],
  },

  {
    id: 3,
    question: "Mon amie ____ à son devoir en maths",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q3.png",
    choices: [
      { id: "A", label: "pensez", isCorrect: false, explanationCorrect: "", explanationWrong: "“Vous pensez”." },
      { id: "B", label: "pensent", isCorrect: false, explanationCorrect: "", explanationWrong: "Sujet singulier." },
      { id: "C", label: "pense", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
    ],
  },

  {
    id: 4,
    question: "J’ ____ de la musique",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q4.png",
    choices: [
      { id: "A", label: "écoute", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
      { id: "B", label: "écoutons", isCorrect: false, explanationCorrect: "", explanationWrong: "“Nous écoutons”." },
      { id: "C", label: "écoutez", isCorrect: false, explanationCorrect: "", explanationWrong: "“Vous écoutez”." },
    ],
  },

  {
    id: 5,
    question: "Tu ____ la télévision",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q5.png",
    choices: [
      { id: "A", label: "regardez", isCorrect: false, explanationCorrect: "", explanationWrong: "“Vous regardez”." },
      { id: "B", label: "regardes", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
      { id: "C", label: "regardent", isCorrect: false, explanationCorrect: "", explanationWrong: "Sujet singulier." },
    ],
  },

  {
    id: 6,
    question: "Elle ____ chaque matin",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q6.png",
    choices: [
      { id: "A", label: "danses", isCorrect: false, explanationCorrect: "", explanationWrong: "“Tu danses”." },
      { id: "B", label: "dansent", isCorrect: false, explanationCorrect: "", explanationWrong: "Sujet singulier." },
      { id: "C", label: "danse", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
    ],
  },

  {
    id: 7,
    question: "Ma voisine ____ au téléphone",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q7.png",
    choices: [
      { id: "A", label: "parle", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
      { id: "B", label: "parlons", isCorrect: false, explanationCorrect: "", explanationWrong: "“Nous parlons”." },
      { id: "C", label: "parlent", isCorrect: false, explanationCorrect: "", explanationWrong: "Sujet singulier." },
    ],
  },

  {
    id: 8,
    question: "On ____ dans ma chambre",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q8.png",
    choices: [
      { id: "A", label: "entres", isCorrect: false, explanationCorrect: "", explanationWrong: "“Tu entres”." },
      { id: "B", label: "entrent", isCorrect: false, explanationCorrect: "", explanationWrong: "Sujet singulier." },
      { id: "C", label: "entre", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
    ],
  },

  {
    id: 9,
    question: "Vous ____ beaucoup de choses",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q9.png",
    choices: [
      { id: "A", label: "achètent", isCorrect: false, explanationCorrect: "", explanationWrong: "Mauvaise personne." },
      { id: "B", label: "achetez", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
      { id: "C", label: "achètes", isCorrect: false, explanationCorrect: "", explanationWrong: "“Tu achètes”." },
    ],
  },

  {
    id: 10,
    question: "Nous ____ au football",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q10.png",
    choices: [
      { id: "A", label: "joue", isCorrect: false, explanationCorrect: "", explanationWrong: "Sujet pluriel." },
      { id: "B", label: "jouent", isCorrect: false, explanationCorrect: "", explanationWrong: "“Ils jouent”." },
      { id: "C", label: "jouons", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
    ],
  },

  {
    id: 11,
    question: "Tu ____ tes vêtements",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q11.png",
    choices: [
      { id: "A", label: "laves", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
      { id: "B", label: "lavons", isCorrect: false, explanationCorrect: "", explanationWrong: "“Nous lavons”." },
      { id: "C", label: "lavez", isCorrect: false, explanationCorrect: "", explanationWrong: "“Vous lavez”." },
    ],
  },

  {
    id: 12,
    question: "Ma grand-mère ____ ce soir",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q12.png",
    choices: [
      { id: "A", label: "arrive", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
      { id: "B", label: "arrives", isCorrect: false, explanationCorrect: "", explanationWrong: "“Tu arrives”." },
      { id: "C", label: "arrivez", isCorrect: false, explanationCorrect: "", explanationWrong: "“Vous arrivez”." },
    ],
  },

  {
    id: 13,
    question: "Ils ____ beaucoup d’argent",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q13.png",
    choices: [
      { id: "A", label: "gagne", isCorrect: false, explanationCorrect: "", explanationWrong: "Sujet pluriel." },
      { id: "B", label: "gagnez", isCorrect: false, explanationCorrect: "", explanationWrong: "“Vous gagnez”." },
      { id: "C", label: "gagnent", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
    ],
  },

  {
    id: 14,
    question: "On ____ trop dans cette entreprise",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q14.png",
    choices: [
      { id: "A", label: "travaille", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
      { id: "B", label: "travaillons", isCorrect: false, explanationCorrect: "", explanationWrong: "“Nous travaillons”." },
      { id: "C", label: "travaillent", isCorrect: false, explanationCorrect: "", explanationWrong: "Sujet singulier." },
    ],
  },

  {
    id: 15,
    question: "Elle ____ beaucoup",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q15.png",
    choices: [
      { id: "A", label: "voyagez", isCorrect: false, explanationCorrect: "", explanationWrong: "“Vous voyagez”." },
      { id: "B", label: "voyage", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
      { id: "C", label: "voyagent", isCorrect: false, explanationCorrect: "", explanationWrong: "Sujet singulier." },
    ],
  },

  {
    id: 16,
    question: "Nous ____ un arbre",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q16.png",
    choices: [
      { id: "A", label: "plantons", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
      { id: "B", label: "plantent", isCorrect: false, explanationCorrect: "", explanationWrong: "“Ils plantent”." },
      { id: "C", label: "plantez", isCorrect: false, explanationCorrect: "", explanationWrong: "“Vous plantez”." },
    ],
  },

  {
    id: 17,
    question: "Ils ____ sans savoir pourquoi",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q17.png",
    choices: [
      { id: "A", label: "pleure", isCorrect: false, explanationCorrect: "", explanationWrong: "Sujet pluriel." },
      { id: "B", label: "pleures", isCorrect: false, explanationCorrect: "", explanationWrong: "“Tu pleures”." },
      { id: "C", label: "pleurent", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
    ],
  },

  {
    id: 18,
    question: "Mes cousins ____ le canapé au troisième",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q18.png",
    choices: [
      { id: "A", label: "montent", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
      { id: "B", label: "montons", isCorrect: false, explanationCorrect: "", explanationWrong: "“Nous montons”." },
      { id: "C", label: "montes", isCorrect: false, explanationCorrect: "", explanationWrong: "“Tu montes”." },
    ],
  },

  {
    id: 19,
    question: "Vous ____ tout le temps",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q19.png",
    choices: [
      { id: "A", label: "étudie", isCorrect: false, explanationCorrect: "", explanationWrong: "Sujet pluriel." },
      { id: "B", label: "étudions", isCorrect: false, explanationCorrect: "", explanationWrong: "“Nous étudions”." },
      { id: "C", label: "étudiez", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
    ],
  },

  {
    id: 20,
    question: "Il ____ les traces du voleur",
    teacherImage: "/images/courses/teacher/jeantalkquestion.png",
    image: "/images/courses/beginner/activities/activity5/q20.png",
    choices: [
      { id: "A", label: "cherchez", isCorrect: false, explanationCorrect: "", explanationWrong: "“Vous cherchez”." },
      { id: "B", label: "cherche", isCorrect: true, explanationCorrect: "Correct !", explanationWrong: "" },
      { id: "C", label: "cherchent", isCorrect: false, explanationCorrect: "", explanationWrong: "Sujet singulier." },
    ],
  },
];