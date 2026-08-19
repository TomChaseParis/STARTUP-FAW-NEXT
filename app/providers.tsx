"use client";

import { ThemeProvider } from "next-themes";

import { ProgressProvider } from "@/components/courses/engines/ProgressEngine/ProgressProvider";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="dark"
    >
      <ProgressProvider>
        {children}
      </ProgressProvider>
    </ThemeProvider>
  );
}