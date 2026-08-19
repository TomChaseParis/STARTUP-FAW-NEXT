/* PAGE DES LECONS ET ACTIVITES */


import { getModule } from "@/lib/courses/getModule";

import LessonCard from "@/components/courses/modules/LessonCard";
import ActivityGrid from "@/components/courses/modules/ActivityGrid";

type PageProps = {
  params: Promise<{
    level: string;
    module: string;
  }>;
};

export default async function ModulePage({ params }: PageProps) {
  const { level, module } = await params;

  const moduleData = await getModule(level, module);

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-[200px] pb-20">
      <div className="container mx-auto px-6 lg:px-12 pt-18">
        {/* LESSON CARD */}
        <div className="flex justify-start">
          <LessonCard
            level={level}
            lesson={moduleData.lesson}
          />
        </div>

        {/* ACTIVITY CARDS */}
        <div className="flex justify-start">
          <ActivityGrid
            level={level}
            activities={moduleData.activities}
          />
        </div>
      </div>
    </section>
  );
}