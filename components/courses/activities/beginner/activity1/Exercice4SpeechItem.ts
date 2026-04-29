"use client";

export type SpeechSentence = {
  text: string;
  start: number;
};

export type Exercice4SpeechItem = {
  id: number;
  audio: string;
  sentences: SpeechSentence[];
};

export const exercice4SpeechData: Exercice4SpeechItem[] = [
  {
    id: 1,
    audio: "/audios/courses/beginner/activity1/exercice4/marieaudio1.mp3",
    sentences: [
      { text: "J’ai vingt ans.", start: 0 },
      { text: "Je suis jeune.", start: 1.8 },
      { text: "Je vais à l’université.", start: 3.6 },
      { text: "Je suis étudiant.", start: 5.7 },
      { text: "Je fais des études.", start: 7.5 },
      { text: "J’ai des lunettes.", start: 9.3 },
      { text: "Je suis un nerd.", start: 11.1 },
      { text: "J’ai un seul ami : mon professeur de chimie.", start: 13 },
    ],
    
  },
  {
    id: 2,
    audio: "/audios/courses/beginner/activity1/exercice4/marieaudio2.mp3",
    sentences: [
      { text: "Ils sont mariés.", start: 0 },
      { text: "Ils font une croisière.", start: 1.8 },
      { text: "Ils ont beaucoup d’argent.", start: 3.8 },
      { text: "Ils ont un petit chien.", start: 5.6 },
      { text: "Ils vont à New York en bateau.", start: 7.8 },
      { text: "Ils sont riches.", start: 10 },
      { text: "Ils font souvent des voyages.", start: 12.4 },
      { text: "Ils ont beaucoup d’amis riches comme eux.", start: 14.2 },
      { text: "Ils sont très snobs, mais un peu idiots.", start: 16.7 },
    ],
  },
  {
    id: 3,
    audio: "/audios/courses/beginner/activity1/exercice4/marieaudio3.mp3",
    sentences: [
      { text: "Elle a soixante-dix ans.", start: 0 },
      { text: "Elle est veuve.", start: 1.8 },
      { text: "Elle est retraitée.", start: 3.9 },
      { text: "Elle fait beaucoup de sport.", start: 6.2 },
      { text: "Elle va au club de gym tous les jours.", start: 8.9 },
      { text: "Elle a un chat.", start: 12 },
      { text: "Elle est en très bonne santé.", start: 14.4 },
      { text: "Elle va très bien depuis que son mari est mort.", start: 17.4 },
    ],
  },
  {
    id: 4,
    audio: "/audios/courses/beginner/activity1/exercice4/marieaudio4.mp3",
    sentences: [
      { text: "Nous avons dix-sept ans, trois mois et deux jours.", start: 0 },
      { text: "Nous sommes frère et sœur.", start: 4.2 },
      { text: "Nous sommes jumeaux.", start: 6.4 },
      { text: "Nous faisons les mêmes choses.", start: 8.3 },
      { text: "Nous allons au même lycée.", start: 11 },
      { text: "Nous avons les mêmes amis.", start: 13.1 },
      { text: "Nous avons un chien qui s’appelle Ziggy.", start: 15.2 },
      { text: "Nous sommes les stars de la famille.", start: 18 },
    ],
  },
  {
    id: 5,
    audio: "/audios/courses/beginner/activity1/exercice4/marieaudio5.mp3",
    sentences: [
      { text: "Vous avez entre vingt et vingt-cinq ans.", start: 0 },
      { text: "Vous êtes jeunes et beaux.", start: 2.9 },
      { text: "Vous êtes des surfers.", start: 6 },
      { text: "Vous allez à la plage tous les jours.", start: 8 },
      { text: "Vous faites du surf du matin au soir.", start: 11 },
      { text: "Vous avez un très beau bronzage.", start: 14.7 },
      { text: "Vous avez des corps d’athlètes.", start: 17.7 },
      { text: "Vous faites quand même un peu pitié.", start: 19.9 },
      { text: "Vous êtes ridicules avec vos lunettes et votre crème solaire.", start: 23 },
    ],
  },
  {
    id: 6,
    audio: "/audios/courses/beginner/activity1/exercice4/marieaudio6.mp3",
    sentences: [
      { text: "Tu es un bébé chien.", start: 0 },
      { text: "Tu as six mois.", start: 2.3 },
      { text: "Tu as une couche.", start: 4.1 },
      { text: "Tu fais pipi dans ta couche.", start: 5.9 },
      { text: "Tu as beaucoup de jouets.", start: 8.5 },
      { text: "Tu fais des misères au chat.", start: 10.5 },
      { text: "Tu vas souvent chez le vétérinaire.", start: 12.6 },
      { text: "Tu as un problème avec les chats.", start: 15.1 },
      { text: "Tu es un chien un peu cruel.", start: 17.8 },
      { text: "Tu fais beaucoup de bêtises à la maison.", start: 20.4 },
    ],
  }
];