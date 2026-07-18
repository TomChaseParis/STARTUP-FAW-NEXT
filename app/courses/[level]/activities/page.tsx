import ModuleIntroduction from "@/components/courses/layout/ModuleIntroduction";
import ActivitiesGrid from "@/components/courses/ActivitiesGrid";

export default async function ActivitiesPage({
  params,
}: {
  params: { level: string };
}) {
  return (
    <section className="bg-white py-20 pt-[180px]">

      <div className="container mx-auto px-6">

        <ModuleIntroduction
          badge="ACTIVITÉS"
          title="Bienvenue dans les activités"
          description="Tu vas maintenant mettre en pratique tout ce que tu as appris grâce à des exercices interactifs."
          videoSrc={`/videos/courses/${params.level}/activities/introduction.mp4`}
          poster={`/images/courses/${params.level}/activities/poster.png`}
          objectifs={[
            "Compréhension orale",
            "Compréhension écrite",
            "Expression orale",
            "Quiz",
            "Prononciation",
          ]}
        />

        <ActivitiesGrid level={params.level} />

      </div>

    </section>
  );
}