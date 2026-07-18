"use client";

import { useEffect, useState } from "react";
import LessonCard from "@/components/courses/Shared/LessonCard";

type Lesson = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
};

type Level =
  | "beginner"
  | "elementary-1"
  | "elementary-2"
  | "intermediate-1"
  | "intermediate-2"
  | "advanced";

type LessonsGridProps = {
  level: string;
};

export default function LessonsGrid({
  level,
}: LessonsGridProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const res = await fetch(`/api/courses/${level}/lessons`);

        if (!res.ok) {
          throw new Error("Impossible de charger les leçons");
        }

        const data = await res.json();
        setLessons(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, [level]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Chargement des leçons...
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500">
        Aucune leçon disponible.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.slug}
          title={lesson.title}
          subtitle={lesson.subtitle}
          description={lesson.description}
          href={`/courses/${level}/lessons/${lesson.slug}`}
          level={level as Level}
        />
      ))}
    </div>
  );
}