"use client";

type VideoBlockProps = {
  videoSrc: string;
  poster?: string;
};

export default function VideoBlock({
  videoSrc,
  poster,
}: VideoBlockProps) {
  return (
    <div className="mx-auto w-full">
      <div
        className="
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
          ring-1 ring-black/5
        "
      >
        <div className="relative aspect-video w-full bg-black">
          <video
            controls
            preload="metadata"
            poster={poster}
            className="h-full w-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        </div>
      </div>
    </div>
  );
}