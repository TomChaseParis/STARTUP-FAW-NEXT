import { SentenceAnswerData } from "@/components/courses/types/sentenceAnswerTypes";

export const sentenceAnswerData: SentenceAnswerData = {
  title: "Tu as vu ce fantôme ?",

  instruction:
    "Réponds à chaque question en utilisant le bon pronom complément et en faisant une phrase complète.",

  items: [
    {
      id: 1,

      image:
        "/images/courses/intermediate1/activity3/exercise1/q-1.png",

      question: "Tu prends ce parapluie ?",

      questionAudio:
        "/audios/courses/intermediate1/activity1/exercise-1/q-1.mp3",

      answer: "Oui, je le prends.",

      explanation:
        "Prendre quelque chose est un verbe transitif direct. « Un parapluie » est masculin singulier : on le remplace par le pronom COD « le ».",

      polarity: "affirmative",
    },

    {
      id: 2,

      image:
        "/images/courses/intermediate1/activity3/exercise1/q-2.png",

      question: "Tu aimes cette ville ?",

      questionAudio:
        "/audios/courses/intermediate1/activity1/exercise-1/q-2.mp3",

      answer: "Non, je ne l'aime pas.",

      explanation:
        "Aimer est un verbe transitif direct. « La ville » est féminin singulier : le pronom est « la », qui devient « l' » devant une voyelle.",

      polarity: "negative",
    },

    {
      id: 3,

      image:
        "/images/courses/intermediate1/activity3/exercise1/q-3.jpg",

      question: "Tu téléphones souvent à tes parents ?",

      questionAudio:
        "/audios/courses/intermediate1/activity1/exercise-1/q-3.mp3",

      answer: "Oui, je leur téléphone souvent.",

      explanation:
        "Téléphoner à quelqu'un est un verbe indirect. « Tes parents » est un complément d'objet indirect au pluriel : on utilise « leur ».",

      polarity: "affirmative",
    },

    {
      id: 4,

      image:
        "/images/courses/intermediate1/activity3/exercise1/q-4.png",

      question: "Tu accompagnes tes grands-parents ?",

      questionAudio:
        "/audios/courses/intermediate1/activity1/exercise-1/q-4.mp3",

      answer: "Oui, je les accompagne.",

      explanation:
        "Accompagner quelqu'un est un verbe transitif direct. « Tes grands-parents » est pluriel : on utilise le pronom COD « les ».",

      polarity: "affirmative",
    },

    {
      id: 5,

      image:
        "/images/courses/intermediate1/activity3/exercise1/q-5.png",

      question: "Tu vois cet écureuil ?",

      questionAudio:
        "/audios/courses/intermediate1/activity1/exercise-1/q-5.mp3",

      answer: "Oui, je le vois.",

      explanation:
        "Voir est un verbe transitif direct. « Un écureuil » est masculin singulier : on utilise « le ».",

      polarity: "affirmative",
    },

    {
      id: 6,

      image:
        "/images/courses/intermediate1/activity3/exercise1/q-6.png",

      question: "Tu connais bien tes voisins ?",

      questionAudio:
        "/audios/courses/intermediate1/activity3/exercise1/q-6.mp3",

      answer: "Non, je ne les connais pas bien.",

      explanation:
        "Connaître quelqu'un est un verbe transitif direct. « Tes voisins » est pluriel : on utilise « les ».",

      polarity: "negative",
    },

    {
      id: 7,

      image:
        "/images/courses/intermediate1/activity3/exercise1/q-7.png",

      question: "Tu as fait un cadeau à ton professeur ?",

      questionAudio:
        "/audios/courses/intermediate1/activity1/exercise-1/q-7.mp3",

      answer: "Oui, je lui ai fait un cadeau.",

      explanation:
        "Faire un cadeau à quelqu'un est une construction indirecte. « Ton professeur » est singulier : on utilise le pronom COI « lui ».",

      polarity: "affirmative",
    },

    {
      id: 8,

      image:
        "/images/courses/intermediate1/activity3/exercise1/q-8.png",

      question: "Tu as vu ce fantôme ?",

      questionAudio:
        "/audios/courses/intermediate1/activity1/exercise-1/q-8.mp3",

      answer: "Non, je ne l'ai pas vu.",

      explanation:
        "Voir est un verbe transitif direct. « Un fantôme » est masculin singulier. « Le » devient « l' » devant « ai ».",

      polarity: "negative",
    },
  ],
};