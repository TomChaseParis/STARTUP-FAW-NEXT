/* PAGE DES MODULES */

import { redirect } from "next/navigation";

import { getModules } from "@/lib/courses/getModules";
import ModuleCard from "@/components/courses/Shared/ModuleCard";

type PageProps = {
  params: Promise<{
    level: string;
  }>;
};

const LEGACY_LEVELS = new Set([
  "intermediate-2",
  "advanced",
]);

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Débutant",
  "elementary-1": "Élémentaire 1",
  "elementary-2": "Élémentaire 2",
  "intermediate-1": "Intermédiaire 1",
  "intermediate-2": "Intermédiaire 2",
  advanced: "Avancé",
};

const LEVEL_TITLE_COLORS: Record<string, string> = {
  beginner: "#E09F00",
  "elementary-1": "#57CC99",
  "elementary-2": "#31572C",
  "intermediate-1": "#00296B",
  "intermediate-2": "#C94F91",
  advanced: "#C7443E",
};
export default async function LevelPage({
  params,
}: PageProps) {
  const { level } = await params;

  /*
   * Les niveaux qui n'ont pas encore été migrés
   * continuent d'utiliser l'ancien système
   * d'activités locales.
   */
  if (LEGACY_LEVELS.has(level)) {
    redirect(`/courses/${level}/activities`);
  }

  /*
   * Les niveaux migrés utilisent
   * maintenant le système de modules.
   */
  const modules = await getModules(level);

  /*
   * Nom français du niveau affiché à l'utilisateur.
   *
   * Exemple :
   *
   * elementary-1 → Élémentaire 1
   * elementary-2 → Élémentaire 2
   * intermediate-1 → Intermédiaire 1
   */
  const formattedLevel =
    LEVEL_LABELS[level] ?? level;

  /*
   * Couleur du niveau affiché dans le titre.
   */
  const levelTitleColor =
    LEVEL_TITLE_COLORS[level] ?? "#E09F00";

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-20 pt-[200px]">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-12">
        {/* TITRE */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Découvrez les modules du niveau{" "}
            <span
              style={{
                color: levelTitleColor,
              }}
            >
              {formattedLevel}
            </span>
          </h1>

          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            Chaque module est conçu pour développer une
            compétence précise à travers une leçon et
            plusieurs activités interactives.
          </p>
        </div>

        {/* GRILLE DES MODULES */}
        <div
          className="
            mt-12
            grid
            w-full
            grid-cols-1
            justify-items-center
            gap-8
            px-0
            sm:mt-16
            sm:px-2
            lg:grid-cols-2
            lg:gap-x-10
            lg:gap-y-10
            xl:grid-cols-3
          "
        >
          {modules.map((module: any) => (
            <div
              key={module.slug}
              className="w-full max-w-[480px]"
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