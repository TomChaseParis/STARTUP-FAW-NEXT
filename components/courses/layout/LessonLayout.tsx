"use client";

import { ReactNode } from "react";

type LessonLayoutProps = {
  children: ReactNode;
};

export default function LessonLayout({
  children,
}: LessonLayoutProps) {
  return (
    <section className="space-y-20 bg-white py-20">
      {children}
    </section>
  );
}