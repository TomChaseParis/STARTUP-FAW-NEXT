"use client";

import SentenceAnswerEngine from "./SentenceAnswerEngine";
import { sentenceAnswerData } from "../data/sentenceAnswerData";

export default function SentenceAnswerExercise() {
  return <SentenceAnswerEngine data={sentenceAnswerData} />;
}