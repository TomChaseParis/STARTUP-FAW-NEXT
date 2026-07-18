"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ExerciseCard({ children }: Props) {
  return (
    <div className="rounded-2xl bg-white p-10 shadow-xl ring-1 ring-black/5">
      {children}
    </div>
  );
}