"use client";

import VideoBlock from "../blocks/VideoBlock";


type ModuleIntroductionProps = {
  badge: string;
  title: string;
  description: string;
  videoSrc: string;
  poster: string;
  objectifs: string[];
};

export default function ModuleIntroduction({
  badge,
  title,
  description,
  videoSrc,
  poster,
  objectifs,
}: ModuleIntroductionProps) {
  return (
    <section className="mx-auto mb-20 max-w-7xl">
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
      <div className="grid items-center lg:grid-cols-[1.8fr_1fr]">          {/* VIDEO */}
          <div className="p-5">
            <VideoBlock
              videoSrc={videoSrc}
              poster={poster}
            />
          </div>

          {/* TEXTE */}
          <div className="flex flex-col justify-center p-10">
            <span className="mb-4 inline-flex w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-bold uppercase tracking-wider text-blue-700">
              {badge}
            </span>

            <h2 className="text-4xl font-extrabold text-slate-900">
              {title}
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              {description}
            </p>

            <div className="mt-8">
              <p className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                Dans ce module tu vas apprendre :
              </p>

              <ul className="space-y-3">
                {objectifs.map((objectif, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>

                    {objectif}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}