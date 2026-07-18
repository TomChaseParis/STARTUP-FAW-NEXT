"use client";

import Image from "next/image";

type Props = {
  image?: string;
  alt?: string;
};

export default function QuestionImage({
  image,
  alt = "Illustration",
}: Props) {
  if (!image) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-center lg:w-1/3">
      <div className="relative w-full overflow-hidden rounded-xl shadow-md ring-1 ring-black/10">
        <Image
          src={image}
          alt={alt}
          width={600}
          height={400}
          className="h-64 w-full object-cover"
        />
      </div>
    </div>
  );
}