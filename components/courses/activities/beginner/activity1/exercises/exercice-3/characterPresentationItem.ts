"use client";

export type CharacterPresentationSentence = {
  prompt: string;
  expectedSentence: string;

  audio: {
    correct: string;
    wrong1: string;
    wrong2: string;
    solution: string;
  };
};

export type CharacterPresentationItem = {
  id: number;
  image: string;
  buttonLabel: string;
  video?: string;
  audio: string;
  sentences: CharacterPresentationSentence[];
};