"use client";

import { ReactNode } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import { ProgressProvider } from "@/components/courses/engines/ProgressEngine/ProgressProvider";

type LessonLayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({
  children,
}: LessonLayoutProps) {
  return (
    <ProgressProvider>
      <Header />

      {children}

      <Footer />

      <ScrollToTop />
    </ProgressProvider>
  );
}
