"use client";

type ActivityIntroVideoProps = {
  src: string;
};

export default function ActivityIntroVideo({
  src,
}: ActivityIntroVideoProps) {
  return (
    <video
      className="w-full max-w-4xl rounded-2xl shadow-lg"
      controls
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}