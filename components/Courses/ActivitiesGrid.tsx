"use client";

import ActivityCard from "@/components/courses/Shared/ActivityCard";
import { useEffect, useState } from "react";

type Activity = {
  slug: string;
  title: string;
  description: string;
  subtitle?: string;
};

type Level =
  | "beginner"
  | "elementary-1"
  | "elementary-2"
  | "intermediate-1"
  | "intermediate-2"
  | "advanced";

export default function ActivitiesGrid({ level }: { level: string }) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/courses/${level}/activities`);
      const data = await res.json();
      setActivities(data);
    }

    load();
  }, [level]);

  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {activities.map((act) => (
        <ActivityCard
          key={act.slug}
          title={act.title}
          subtitle={act.subtitle}
          description={act.description}
          href={`/courses/${level}/activities/${act.slug}`}
          level={level as any}
        />
      ))}
    </div>
  );
}
