"use client";

import Image from "next/image";

type ImageChoiceQuestionProps = {
  images: string[];
  value: number | null;
  onChange: (value: number) => void;
};

export default function ImageChoiceQuestion({
  images,
  value,
  onChange,
}: ImageChoiceQuestionProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {images.map((image, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onChange(index)}
          className={`
            overflow-hidden rounded-2xl border-4 transition-all duration-200
            ${
              value === index
                ? "scale-105 border-amber-500 shadow-xl"
                : "border-transparent hover:scale-105"
            }
          `}
        >
          <Image
            src={image}
            alt={`Choix ${index + 1}`}
            width={250}
            height={180}
            className="h-52 w-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}