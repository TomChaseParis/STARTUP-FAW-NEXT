"use client";

import { FillGapsData } from "@/types/fillGapsTypes";

export const exercice1Data: FillGapsData = {
  title: "✍️ Conjugaison — Je / Vous",
  activityType: "type",

  instruction:
    "Complète avec la forme « je » et « vous » des verbes suivants.",

  sentences: [
    {
      id: 1,
      parts: [
        { type: "text", value: "1. (je) " },
        { type: "input", answer: "parle", hint: "parler" },
        { type: "text", value: " / (vous) " },
        { type: "input", answer: "parlez", hint: "parler" },
      ],
    },
    {
      id: 2,
      parts: [
        { type: "text", value: "2. (je) " },
        { type: "input", answer: "propose", hint: "proposer" },
        { type: "text", value: " / (vous) " },
        { type: "input", answer: "proposez", hint: "proposer" },
      ],
    },
    {
      id: 3,
      parts: [
        { type: "text", value: "3. (je) " },
        { type: "input", answer: "réserve", hint: "réserver" },
        { type: "text", value: " / (vous) " },
        { type: "input", answer: "réservez", hint: "réserver" },
      ],
    },
    {
      id: 4,
      parts: [
        { type: "text", value: "4. (je) " },
        { type: "input", answer: "écoute", hint: "écouter" },
        { type: "text", value: " / (vous) " },
        { type: "input", answer: "écoutez", hint: "écouter" },
      ],
    },
    {
      id: 5,
      parts: [
        { type: "text", value: "5. (je) " },
        { type: "input", answer: "utilise", hint: "utiliser" },
        { type: "text", value: " / (vous) " },
        { type: "input", answer: "utilisez", hint: "utiliser" },
      ],
    },
    {
      id: 6,
      parts: [
        { type: "text", value: "6. (je) " },
        { type: "input", answer: "habite", hint: "habiter" },
        { type: "text", value: " / (vous) " },
        { type: "input", answer: "habitez", hint: "habiter" },
      ],
    },
    {
      id: 7,
      parts: [
        { type: "text", value: "7. (je) " },
        { type: "input", answer: "joue", hint: "jouer" },
        { type: "text", value: " / (vous) " },
        { type: "input", answer: "jouez", hint: "jouer" },
      ],
    },
    {
      id: 8,
      parts: [
        { type: "text", value: "8. (je) " },
        { type: "input", answer: "étudie", hint: "étudier" },
        { type: "text", value: " / (vous) " },
        { type: "input", answer: "étudiez", hint: "étudier" },
      ],
    },
  ],
};