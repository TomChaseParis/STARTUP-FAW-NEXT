"use client";

import { FillGapsData } from "@/types/fillGapsTypes";

export const verbSelectionData: FillGapsData = {
  title: "✍️ EXERCICE 3 : Choisis le bon verbe à la bonne forme",
  activityType: "type",

  verbs: ["être", "avoir", "faire", "aller"],

  sentences: [
    {
      id: 1,
      parts: [
        { type: "text", value: "Mes amis " },
        { type: "input", answer: "ont", hint: "avoir" },
        { type: "text", value: " une maison à la campagne." },
      ],
    },

    {
      id: 2,
      parts: [
        { type: "text", value: "La mère de Lucie " },
        { type: "input", answer: "est", hint: "être" },
        { type: "text", value: " espagnole." },
      ],
    },

    {
      id: 3,
      parts: [
        { type: "text", value: "Pierre et Jacques " },
        { type: "input", answer: "font", hint: "faire" },
        { type: "text", value: " du sport tous les week-ends." },
      ],
    },

    {
      id: 4,
      parts: [
        { type: "text", value: "Je " },
        { type: "input", answer: "vais", hint: "aller" },
        { type: "text", value: " au supermarché en voiture." },
      ],
    },

    {
      id: 5,
      parts: [
        { type: "text", value: "Vous " },
        { type: "input", answer: "avez", hint: "avoir" },
        { type: "text", value: " 20 ans." },
      ],
    },

    {
      id: 6,
      parts: [
        { type: "text", value: "Mes cousines " },
        { type: "input", answer: "ont", hint: "avoir" },
        { type: "text", value: " des amis à Lisbonne." },
      ],
    },

    {
      id: 7,
      parts: [
        { type: "text", value: "Nous " },
        { type: "input", answer: "allons", hint: "aller" },
        { type: "text", value: " au bureau à pied." },
      ],
    },

    {
      id: 8,
      parts: [
        { type: "text", value: "Vous " },
        { type: "input", answer: "êtes", hint: "être" },
        { type: "text", value: " en retard, ce matin !" },
      ],
    },

    {
      id: 9,
      parts: [
        { type: "text", value: "En Alaska, il " },
        { type: "input", answer: "fait", hint: "faire" },
        { type: "text", value: " souvent très froid." },
      ],
    },

    {
      id: 10,
      parts: [
        { type: "text", value: "Ils " },
        { type: "input", answer: "sont", hint: "être" },
        { type: "text", value: " mariés depuis 10 ans." },
      ],
    },

    {
      id: 11,
      parts: [
        { type: "text", value: "Mes voisins " },
        { type: "input", answer: "font", hint: "faire" },
        { type: "text", value: " la fête tous les vendredis soirs." },
      ],
    },

    {
      id: 12,
      parts: [
        { type: "text", value: "Le bébé pleure. Il " },
        { type: "input", answer: "a", hint: "avoir" },
        { type: "text", value: " faim." },
      ],
    },

    {
      id: 13,
      parts: [
        { type: "text", value: "Tu " },
        { type: "input", answer: "es", hint: "être" },
        { type: "text", value: " content ?" },
      ],
    },

    {
      id: 14,
      parts: [
        { type: "text", value: "Je " },
        { type: "input", answer: "suis", hint: "être" },
        { type: "text", value: " étudiant en médecine." },
      ],
    },

    {
      id: 15,
      parts: [
        { type: "text", value: "Lucien " },
        { type: "input", answer: "a", hint: "avoir" },
        { type: "text", value: " 11 ans et il " },
        { type: "input", answer: "a", hint: "avoir" },
        { type: "text", value: " déjà un téléphone portable." },
      ],
    },

    {
      id: 16,
      parts: [
        { type: "text", value: "Je " },
        { type: "input", answer: "suis", hint: "être" },
        { type: "text", value: " fatigué. J’" },
        { type: "input", answer: "ai", hint: "avoir" },
        { type: "text", value: " envie de dormir." },
      ],
    },

    {
      id: 17,
      parts: [
        { type: "text", value: "Vous " },
        { type: "input", answer: "faites", hint: "faire" },
        { type: "text", value: " vos courses chez Monoprix ou chez Carrefour ?" },
      ],
    },

    {
      id: 18,
      parts: [
        { type: "text", value: "Vous " },
        { type: "input", answer: "allez", hint: "aller" },
        { type: "text", value: " au restaurant tous les soirs ?" },
      ],
    },

    {
      id: 19,
      parts: [
        { type: "text", value: "Tu " },
        { type: "input", answer: "vas", hint: "aller" },
        { type: "text", value: " au théâtre avec Mélanie ou avec Eric ?" },
      ],
    },

    {
      id: 20,
      parts: [
        { type: "text", value: "Vous " },
        { type: "input", answer: "avez", hint: "avoir" },
        { type: "text", value: " soif ? Voilà une coupe de champagne pour vous !" },
      ],
    },
  ],
};