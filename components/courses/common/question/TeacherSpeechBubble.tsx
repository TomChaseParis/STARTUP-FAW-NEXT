"use client";

type Props = {
  text: string;
};

export default function TeacherSpeechBubble({
  text,
}: Props) {
  return (
    <div className="rounded-2xl bg-amber-100 px-5 py-3 text-sm font-medium text-black shadow">
      {text}
    </div>
  );
}