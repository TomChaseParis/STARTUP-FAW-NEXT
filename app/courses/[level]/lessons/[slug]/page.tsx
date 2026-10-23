import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

type LessonComponent = ReturnType<typeof dynamic>;

const lessonMap: Record<string, LessonComponent> = {
  "beginner/introduce-yourself": dynamic(
    () =>
      import(
        "@/components/courses/lessons/beginner/introduce-yourself/Lesson"
      ),
    { ssr: false },
  ),

  "intermediate-1/imparfait-dhabitude": dynamic(
    () =>
      import(
        "@/components/courses/lessons/intermediate-1/imparfait-dhabitude/Lesson"
      ),
    { ssr: false },
  ),
};

export default function LessonPageRoute({
  params,
}: {
  params: { level: string; slug: string };
}) {
  const key = `${params.level}/${params.slug}`;

  const Lesson = lessonMap[key];

  if (!Lesson) {
    notFound();
  }

  return (
    <div className="bg-white pt-[130px]">
      <Lesson />
    </div>
  );
}
