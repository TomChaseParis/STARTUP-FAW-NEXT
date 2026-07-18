"use client";

import TeacherAudioButton from "../TeacherAudioButton";

type Props = {
  current: number;
  total: number;
  onPlay: () => void;
  disabled?: boolean;
};

export default function QuestionHeader({
  current,
  total,
  onPlay,
  disabled,
}: Props) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <TeacherAudioButton onClick={onPlay} disabled={disabled} />

      <h3 className="text-xl font-semibold text-black">
        Question {current} / {total}
      </h3>
    </div>
  );
}
