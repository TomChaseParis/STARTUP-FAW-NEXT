"use client";

import { ReactNode } from "react";

import { ActivityDefinition } from "@/data/courses/activities/types";
import { ActivityProvider } from "../engines/ProgressEngine/ActivityContext";

type ActivityLayoutProps = {
  activity: ActivityDefinition;
  children: ReactNode;
};

export default function ActivityLayout({
  activity,
  children,
}: ActivityLayoutProps) {
  return (
    <ActivityProvider activity={activity}>
      <section className="space-y-20 bg-white py-20">{children}</section>
    </ActivityProvider>
  );
}
