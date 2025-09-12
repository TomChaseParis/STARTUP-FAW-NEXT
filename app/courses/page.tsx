import AdvancedCard from "@/components/Courses/CardsLevel/AdvancedCard";
import BeginnerCard from "@/components/Courses/CardsLevel/BeginnerCard";
import ElementaryCard from "@/components/Courses/CardsLevel/ElementaryCard";
import ElementaryCard2 from "@/components/Courses/CardsLevel/ElementaryCard2";
import IntermediateCard from "@/components/Courses/CardsLevel/IntermediateCard";
import IntermediateCard2 from "@/components/Courses/CardsLevel/IntermediateCard2";

export const metadata = {
  title: "Cours — Choisissez votre niveau",
  description: "Découvrez tous les niveaux de cours avec vos professeurs virtuels.",
};

const CoursesCardsPage = () => {
  return (
    <section className="bg-white py-20 pt-[200px]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Titre principal */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Explorez nos <span className="text-amber-500">niveaux</span>
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Chaque niveau vous rapproche de la maîtrise du français, avec un parcours guidé et interactif.
          </p>
        </div>

        {/* Grille des cartes */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {/* Débutant */}
          <BeginnerCard />

          {/* Élémentaire 1 */}
          <ElementaryCard />

          {/* Élémentaire 2 */}
          <ElementaryCard2 />

          {/* Intermédiaire 1 */}
          <IntermediateCard />

          {/* Intermédiaire 2 */}
          <IntermediateCard2 />

          {/* Avancé */}
          <AdvancedCard />
        </div>
      </div>
    </section>
  );
};

export default CoursesCardsPage;
