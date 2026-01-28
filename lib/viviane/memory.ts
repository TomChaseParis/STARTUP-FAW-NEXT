// lib/viviane/memory.ts

import type { Intent } from "./intents";

let lastIntent: Intent | null = null;
let lastQuestion: string | null = null;

export function setMemory(intent: Intent, question: string) {
  lastIntent = intent;
  lastQuestion = question;
}

export function getMemory() {
  return { lastIntent, lastQuestion };
}

export function resetMemory() {
  lastIntent = null;
  lastQuestion = null;
}