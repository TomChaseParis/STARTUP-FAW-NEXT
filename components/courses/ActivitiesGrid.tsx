
"use client";

import ActivityCard from "@/components/courses/Shared/ActivityCard";
import { useEffect, useState } from "react";

type Activity = {
  slug: string;
  title: string;
  description?: string;
  additionalDescription?: string;
  subtitle?: string;
  image?: string;
  objectives?: string[];
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
      try {
        const res = await fetch(`/api/courses/${level}/activities`);

        if (!res.ok) {
          throw new Error("Impossible de charger les activités.");
        }

        const data: Activity[] = await res.json();

        setActivities(data);
      } catch (error) {
        console.error("Erreur lors du chargement des activités :", error);
      }
    }

    load();
  }, [level]);

  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {activities.map((act) => {
        const objectives = [
          ...(act.description ? [act.description] : []),
          ...(act.additionalDescription
            ? [act.additionalDescription]
            : []),
          ...(act.objectives ?? []),
        ];

        return (
          <ActivityCard
            key={act.slug}
            title={act.title}
            subtitle={act.subtitle}
            image={act.image}
            objectives={objectives}
            href={`/courses/${level}/activities/${act.slug}`}
            level={level as Level}
          />
        );
      })}
    </div>
  );
}
