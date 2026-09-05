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

export default async function ModulePage({
  params,
}: PageProps) {
  const { level, module } = await params;

  const moduleData = await getModule(level, module);

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-[200px] pb-20">
      <div className="container mx-auto px-6 pt-18 lg:px-12">

        {/* =====================================================
            LEÇON
        ===================================================== */}

        <section>
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-900">
              Leçon
            </h2>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* La zone ne prend plus toute la largeur */}
          <div className="flex w-fit justify-start">
            <LessonCard
              level={level}
              lesson={moduleData.lesson}
            />
          </div>
        </section>

        {/* =====================================================
            ACTIVITÉS
        ===================================================== */}

        <section className="mt-16">
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-900">
                Activités
              </h2>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Mets en pratique ce que tu as appris.
            </p>
          </div>

          <div className="flex justify-start">
            <ActivityGrid
              level={level}
              activities={moduleData.activities}
            />
          </div>
        </section>

      </div>
    </section>
  );
}