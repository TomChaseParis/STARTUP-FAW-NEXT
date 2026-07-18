"use client";

import { ReactNode } from "react";

import TeacherAvatar from "./TeacherAvatar";
import TeacherSpeechBubble from "./TeacherSpeechBubble";
import QuestionImage from "./QuestionImage";

type Props = {
  question: string;

  teacherImage?: string;

  teacherTalking: boolean;

  choices: ReactNode;

  speech: ReactNode;

  feedback?: ReactNode;

  image?: string;
};

export default function QuestionBody({
  question,
  teacherImage,
  teacherTalking,
  choices,
  speech,
  feedback,
  image,
}: Props) {
  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="flex-1">
        <p className="mb-8 text-lg text-black">
          {question}
        </p>

        {teacherTalking && (
          <div className="mb-6 flex items-center gap-4">
            <TeacherAvatar
              image={
                teacherImage ??
                "/images/teachers/default.png"
              }
              speaking
            />

            <TeacherSpeechBubble
              text="Le professeur parle..."
            />
          </div>
        )}

        {choices}

        {speech}

        {feedback}
      </div>

      <QuestionImage image={image} />
    </div>
  );
}