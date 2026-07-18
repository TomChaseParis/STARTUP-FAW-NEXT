import { getLevel } from "@/lib/courses/getLevel";
import ModuleCard from "@/components/courses/Shared/ModuleCard";

export default async function LevelPage({
  params,
}: {
  params: { level: string };
}) {
  const level = await getLevel(params.level);

  if (!level) {
    return <div>Niveau introuvable.</div>;
  }

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-20 pt-[200px]">
      <div className="container mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-amber-500">
            {level.badge}
          </p>

          <h1 className="mt-4 text-6xl font-black text-slate-900">
            {level.title}
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-slate-600">
            {level.description}
          </p>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">

          <ModuleCard
            title="Leçons"
            subtitle="Apprendre"
            description="Découvre toutes les notions importantes de ce niveau avec des explications simples, illustrées et progressives."
            image="/images/modules/lessons.jpg"
            href={`/courses/${params.level}/lessons`}
            color="blue"
          />

          <ModuleCard
            title="Activités"
            subtitle="S'entraîner"
            description="Mets immédiatement en pratique ce que tu viens d'apprendre grâce à des dizaines d'exercices interactifs."
            image="/images/modules/activities.jpg"
            href={`/courses/${params.level}/activities`}
            color="amber"
          />

        </div>

      </div>
    </section>
  );
}