"use client";

import ImageChoiceEngine from "@/components/courses/engines/ImageChoiceEngine";
import { imageChoiceData,  } from "../data/imageChoiceData";
import { dialogues } from "../data/dialogues";

export default function ImageChoiceExercise() {
  return (
    <ImageChoiceEngine
      data={{
        dialogues,
        questions: imageChoiceData,
      }}
    />
  );
}