"use client";

import React from "react";

import type { ActivityQuestion } from "../models/activity.types";

import MultipleChoiceQuestion from "./MultipleChoice/MultipleChoiceQuestion";
import ImageChoiceQuestion from "./ImageChoice/ImageChoiceQuestion";

type QuestionRendererProps = {
  question: ActivityQuestion;
  value: number | null;
  onChange: (value: number) => void;

  validated: boolean;
  correctAnswer: number;
};

export default function QuestionRenderer({
  question,
  value,
  onChange,
  validated,
  correctAnswer,
}: QuestionRendererProps) {
  switch (question.type) {
    case "multiple-choice":
      return (
        <MultipleChoiceQuestion
          options={question.options}
          value={value}
          validated={validated}
          correctAnswer={correctAnswer}
          onChange={onChange}
        />
      );

    case "image-choice":
      return (
        <ImageChoiceQuestion
          images={question.images}
          value={value}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
}