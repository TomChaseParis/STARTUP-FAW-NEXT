"use client";

import Image from "next/image";

type Props = {
  image: string;
  size?: number;
  speaking?: boolean;
};

export default function TeacherAvatar({
  image,
  size = 96,
  speaking = false,
}: Props) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-full
        shadow-lg
        ring-4
        ring-amber-400

        ${speaking ? "animate-pulse" : ""}
      `}
      style={{
        width: size,
        height: size,
      }}
    >
      <Image
        src={image}
        alt="Professeur"
        fill
        className="object-cover"
      />
    </div>
  );
}