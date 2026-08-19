/* PAGE DES MODULES */


import { getModules } from "@/lib/courses/getModules";
import ModuleCard from "@/components/courses/Shared/ModuleCard";

type PageProps = {
  params: Promise<{
    level: string;
  }>;
};

export default async function LevelPage({ params }: PageProps) {
  const { level } = await params;

  const modules = await getModules(level);

  const formattedLevel =
    level.charAt(0).toUpperCase() + level.slice(1).replace(/-/g, " ");

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-20 pt-[200px]">
      <div className="mx-auto max-w-[1800px] px-8">
        {/* TITRE */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Découvrez les modules du niveau{" "}
            <span className="text-amber-500">{formattedLevel}</span>
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Chaque module est conçu pour développer une compétence précise à
            travers une leçon et plusieurs activités interactives.
          </p>
        </div>

      {/* GRILLE DES MODULES */}
<div
  className="
    mt-20
    grid
    justify-center
    gap-x-10
    gap-y-10
    [grid-template-columns:repeat(auto-fit,minmax(480px,480px))]
  "
>
  {modules.map((module: any) => (
    <div
      key={module.slug}
      className="w-[480px] max-w-full"
    >
      <ModuleCard
        title={module.title}
        category={module.category}
        categoryColor={module.categoryColor}
        description={module.description}
        image={module.image}
        href={`/courses/${level}/modules/${module.slug}`}
      />
    </div>
  ))}
</div>
      </div>
    </section>
  );
}