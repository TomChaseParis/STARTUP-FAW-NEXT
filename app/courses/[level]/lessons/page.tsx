import ModuleIntroduction from "@/components/courses/layout/ModuleIntroduction";
import LessonsGrid from "@/components/courses/LessonsGrid";

export default async function LessonsPage({
  params,
}: {
  params: { level: string };
}) {
  return (
    <section className="bg-white py-20 pt-[180px]">
      <div className="container mx-auto px-6">
        <ModuleIntroduction
          badge="LEÇONS"
          title="Bienvenue dans les leçons"
          description="Dans cette vidéo, je vais t'expliquer tout ce que tu vas apprendre dans ce module."
          videoSrc={`/videos/courses/beginner/lesson/marielesson.mp4`}
          poster={`/images/courses/${params.level}/lessons/poster.png`}
          objectifs={[
            "Comprendre les notions essentielles",
            "Découvrir le vocabulaire",
            "Maîtriser les verbes",
            "Préparer les activités",
          ]}
        />

        <LessonsGrid level={params.level} />
      </div>
    </section>
  );
}
