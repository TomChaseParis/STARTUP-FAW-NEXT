"use client";

import Image from "next/image";
import { ReactNode } from "react";

type LessonExerciseBlockProps = {
  title: string;
  description?: string;
  instruction: string;
  image?: string;
  children: ReactNode;
};

export default function LessonExerciseBlock({
  title,
  description,
  instruction,
  image,
  children,
}: LessonExerciseBlockProps) {
  return (
    <>
      {/* =========================================================
          BLOC DE PRÉSENTATION DE L'EXERCICE
      ========================================================= */}

      <section className="relative overflow-hidden rounded-[28px] border border-amber-300 bg-gradient-to-br from-amber-50 via-white to-yellow-50 px-6 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10">
        {/* Décorations */}

        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 left-[35%] h-40 w-40 rounded-full bg-yellow-200/30 blur-3xl" />

        {/* Badge */}

        <div className="absolute -left-1 top-[-20px] rotate-[-4deg] rounded-lg border border-slate-200 bg-white px-6 py-3 shadow-[0_6px_20px_rgba(15,23,42,0.12)]">
          <div className="relative">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-900">
              Exercice
            </span>

            <div className="absolute -bottom-4 left-0 right-0 h-1 rounded-full bg-amber-400" />
          </div>
        </div>

        {/* Contenu */}

        <div className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            {/* Partie texte */}

            <div className="max-w-3xl">
              {/* Label */}

              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />

                <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                  Avant de commencer
                </span>
              </div>

              {/* Titre */}

              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                {title}
              </h2>

              {/* Description */}

              {description && (
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  {description}
                </p>
              )}
            </div>

            {/* Image facultative */}

            {image && (
              <div className="relative mx-auto h-28 w-36 shrink-0 lg:mx-0">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="144px"
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Instruction */}

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white/90 px-5 py-5 shadow-sm">
            <p className="text-sm leading-6 text-slate-800">
              {instruction}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          EXERCICE
      ========================================================= */}

      <div className="mt-8">
        {children}
      </div>
    </>
  );
}