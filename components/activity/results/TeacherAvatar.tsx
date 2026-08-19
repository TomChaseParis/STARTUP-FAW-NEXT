"use client";

import Image from "next/image";

type TeacherAvatarProps = {
  image: string;
  alt?: string;
};

export default function TeacherAvatar({
  image,
  alt = "Professeur",
}: TeacherAvatarProps) {
  return (
    <div className="relative flex-shrink-0">
      <div
        className="
          relative
          h-56
          w-56
          overflow-hidden
          rounded-full
          border-4
          border-white
          bg-white
          shadow-2xl
        "
      >
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}