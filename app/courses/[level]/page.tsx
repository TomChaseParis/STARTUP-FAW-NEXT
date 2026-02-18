import { getLevel } from "@/lib/courses/getLevel";
import ActivitiesGrid from "../../../components/courses/ActivitiesGrid";

export default async function LevelPage({
  params,
}: {
  params: { level: string };
}) {
  const level = await getLevel(params.level);

  if (!level) {
    return <div>Ce niveau n&apos;existe pas.</div>;
  }

  return (
    <section className="bg-white py-20 pt-[200px]">
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Niveau {level.title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-gray-600">
          {level.description}
        </p>

        <div className="mt-16">
          <ActivitiesGrid level={params.level} />
        </div>
      </div>
    </section>
  );
}
