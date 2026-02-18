import { getLevels } from "@/lib/courses/getLevels";
import LevelCard from "../../components/courses/LevelCard";

export default async function CoursesPage() {
  const levels = await getLevels();

  return (
    <section className="bg-gradient-to-b from-amber-50 to-white py-20 pt-[200px]">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* TITRE */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Explorez nos <span className="text-amber-500">niveaux</span>
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Chaque niveau vous rapproche de la maîtrise du français, avec un parcours guidé et interactif.
          </p>
        </div>

        {/* GRILLE DES NIVEAUX */}
        <div className="mt-16 grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {levels.map((lvl: any, i: number) => (
            <div key={i} className="group relative h-[320px] w-[320px]">
              <LevelCard
                slug={lvl.slug}
                title={lvl.title}
                description={lvl.description}
                image={lvl.image}
                badge={lvl.badge}
              />

              {/* BADGE GOLD */}
              <span
                className="from-yellow-400 via-yellow-500 to-yellow-600 absolute bottom-0 left-3 
                flex items-center gap-1 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-black shadow-md"
              >
                {lvl.badge === "A1" ? "⭐ Free" : "🎓 Get Started"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
