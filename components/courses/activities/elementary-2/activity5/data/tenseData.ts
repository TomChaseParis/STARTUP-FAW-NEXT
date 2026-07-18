import { ClassificationData } from "@/components/courses/types/classificationTypes";

export const tenseData: ClassificationData = {
  title: "Passé, présent ou futur ?",

  instruction:
    "Lis chaque phrase puis classe-la dans le temps qui convient.",

  categories: [
    {
      id: "past",
      title: "Passé",
      emoji: "⏪",
      color: "blue",
    },

    {
      id: "present",
      title: "Présent",
      emoji: "📍",
      color: "green",
    },

    {
      id: "future",
      title: "Futur",
      emoji: "⏩",
      color: "amber",
    },
  ],

  items: [
    {
      id: 1,
      text: "Samedi prochain, je vais inviter mes parents au restaurant.",
      audio:
        "/audios/courses/elementary2/activity5/exercise-3/tense/q-1.mp3",
      categoryId: "future",
    },

    {
      id: 2,
      text: "Je vais acheter un cadeau à ma grand-mère.",
      audio:
        "/audios/courses/elementary2/activity5/exercise-3/tense/q-2.mp3",
      categoryId: "future",
    },

    {
      id: 3,
      text: "Une fois, j'ai volé des vêtements dans une boutique.",
      audio:
        "/audios/courses/elementary2/activity5/exercise-3/tense/q-3.mp3",
      categoryId: "past",
    },

    {
      id: 4,
      text: "Hier, j'ai donné 20 € à un mendiant dans la rue.",
      audio:
        "/audios/courses/elementary2/activity5/exercise-3/tense/q-4.mp3",
      categoryId: "past",
    },

    {
      id: 5,
      text: "Tous les dimanches matin, je vais à l'église.",
      audio:
        "/audios/courses/elementary2/activity5/exercise-3/tense/q-5.mp3",
      categoryId: "present",
    },

    {
      id: 6,
      text: "Je dis toujours « bonjour » à mes voisins quand je les croise dans mon immeuble.",
      audio:
        "/audios/courses/elementary2/activity5/exercise-3/tense/q-6.mp3",
      categoryId: "present",
    },

    {
      id: 7,
      text: "Quand je vais au restaurant, je pars sans payer l'addition.",
      audio:
        "/audios/courses/elementary2/activity5/exercise-3/tense/q-7.mp3",
      categoryId: "present",
    },

    {
      id: 8,
      text: "L'année dernière, j'ai adopté un chien abandonné.",
      audio:
        "/audios/courses/elementary2/activity5/exercise-3/tense/q-8.mp3",
      categoryId: "past",
    },

    {
      id: 9,
      text: "Après-demain, je vais attaquer une banque.",
      audio:
        "/audios/courses/elementary2/activity5/exercise-3/tense/q-9.mp3",
      categoryId: "future",
    },

    {
      id: 10,
      text: "Chez moi, je ne fais jamais la vaisselle.",
      audio:
        "/audios/courses/elementary2/activity5/exercise-3/tense/q-10.mp3",
      categoryId: "present",
    },

    {
      id: 11,
      text: "Ça fait trois mois que je ne me suis pas douché.",
      audio:
        "/audios/courses/elementary2/activity5/exercise-3/tense/q-11.mp3",
      categoryId: "past",
    },

    {
      id: 12,
      text: "Cette nuit, je vais réveiller tout l'immeuble en mettant la musique à fond.",
      audio:
        "/audios/courses/elementary2/activity5/exercise-3/tense/q-12.mp3",
      categoryId: "future",
    },
  ],
};