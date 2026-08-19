"use client";
import { ActivityQuestion } from "@/components/activity/models/activity.types";

export const comprehensionQuizData: ActivityQuestion[] = [
  {
    id: "q1",
    type: "multiple-choice",
    question: "« Xavier » est…",
    options: ["son nom de famille", "son prénom", "le nom de son chien"],
    correctIndex: 1,
  },
  {
    id: "q2",
    type: "multiple-choice",
    question: "« Plantu » est…",
    options: ["son nom de famille", "son prénom", "le nom de sa tortue"],
    correctIndex: 0,
  },
  {
    id: "q3",
    type: "multiple-choice",
    question: "Quelle est sa nationalité ?",
    options: ["Il est belge", "Il est français", "Il est canadien"],
    correctIndex: 2,
  },
  {
    id: "q4",
    type: "multiple-choice",
    question: "Est-ce qu’il sait parler français ?",
    options: ["Non, pas du tout", "Oui, un peu", "Oui, très bien"],
    correctIndex: 2,
  },
  {
    id: "q5",
    type: "multiple-choice",
    question: "Il a quel âge ?",
    options: ["45 ans", "46 ans", "47 ans"],
    correctIndex: 1,
  },
  {
    id: "q6",
    type: "multiple-choice",
    question: "Est-ce qu’il est… ?",
    options: ["divorcé", "marié", "veuf"],
    correctIndex: 0,
  },
  {
    id: "q7",
    type: "multiple-choice",
    question: "Est-ce qu’il a des enfants ?",
    options: [
      "Non, il n’a pas d’enfant",
      "Oui, il a un garçon et une fille",
      "Oui, il a deux garçons",
    ],
    correctIndex: 1,
  },
  {
    id: "q8",
    type: "multiple-choice",
    question: "Quel est son travail ?",
    options: ["Il est artiste", "Il est ingénieur", "Il n’a pas de travail"],
    correctIndex: 1,
  },
  {
    id: "q9",
    type: "multiple-choice",
    question: "Dans quelle ville est-ce qu’il habite ?",
    options: [
      "Il habite à Vancouver",
      "Il habite à Bruxelles",
      "Il habite à Paris",
    ],
    correctIndex: 2,
  },
  {
    id: "q10",
    type: "multiple-choice",
    question: "Dans quel arrondissement ?",
    options: [
      "Dans le sixième arrondissement",
      "Dans le seizième arrondissement",
      "Dans le quinzième arrondissement",
    ],
    correctIndex: 2,
  },
  {
    id: "q11",
    type: "multiple-choice",
    question: "Quel est son numéro de téléphone portable ?",
    options: ["01 20 00 76 88", "06 32 12 45 30", "06 33 82 72 24"],
    correctIndex: 1,
  },
  {
    id: "q12",
    type: "multiple-choice",
    question: "Quelle est son adresse email ?",
    options: [
      "plantu_xavier@gmail.com",
      "plantuxavier@gmail.com",
      "plantu.xavier@gmail.com",
    ],
    correctIndex: 2,
  },
  {
    id: "q13",
    type: "multiple-choice",
    question: "Quels sont ses hobbies ?",
    options: [
      "Les tortues et le bowling",
      "La musique et le sport",
      "Les jeux vidéo",
    ],
    correctIndex: 1,
  },
  {
    id: "q14",
    type: "multiple-choice",
    question: "Quel type de femme est-ce qu’il cherche ?",
    options: [
      "Une femme de 30 ans, sympathique et sportive",
      "Une femme de 85 ans, vieille et édentée",
      "Une femme de son âge, plutôt intellectuelle",
    ],
    correctIndex: 0,
  },
  {
    id: "q15",
    type: "image-choice",
    question: "À ton avis, quelle image correspond le mieux à Xavier Plantu ?",
    images: [
      "/images/courses/beginner/punkman.png",
      "/images/courses/beginner/classman.png",
      "/images/courses/beginner/oldman.png",
    ],
    correctIndex: 1,
  },
];