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
    <div className="flex w-full items-center justify-center">
<div className="relative w-full max-w-[360px] overflow-hidden rounded-xl shadow-md ring-1 ring-black/10">        <Image
          src={image}
          alt={alt}
          width={800}
          height={500}
          className="h-auto max-h-[360px] w-full object-contain lg:max-h-[330px]"
        />
      </div>
    </div>
  );
}