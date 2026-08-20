import { getLevel } from "@/lib/courses/getLevel";
import { getModules } from "@/lib/courses/getModules";
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

  const modules = await getModules(params.level);

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-20 pt-[200px]">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-amber-500">
            {level.badge}
          </p>

          <h1 className="mt-4 text-4xl font-black text-slate-900">
            {level.title}
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-slate-600">
            {level.description}
          </p>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          {modules.map((module: any) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              category={module.category}
              description={module.description}
              image={module.image}
              href={`/courses/${params.level}/modules/${module.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}