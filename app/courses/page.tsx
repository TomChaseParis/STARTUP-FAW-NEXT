import AdvancedCard from "@/components/Courses/CardsLevel/AdvancedCard";
import BeginnerCard from "@/components/Courses/CardsLevel/BeginnerCard";
import ElementaryCard from "@/components/Courses/CardsLevel/ElementaryCard";
import ElementaryCard2 from "@/components/Courses/CardsLevel/ElementaryCard2";
import IntermediateCard from "@/components/Courses/CardsLevel/IntermediateCard";
import IntermediateCard2 from "@/components/Courses/CardsLevel/IntermediateCard2";
import Image from "next/image";
import ImgSide from "../../public/images/courses/level-plan.png";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses Page | Free Next.js Template for Startup and SaaS",
  description: "Page présentant les niveaux de cours",
};

const CoursesCardsPage = () => {
  return (
    <div className="pt-[90px] bg-white px-6 flex flex-col lg:flex-row gap-12 relative">

      {/* --- Colonne de cards --- */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex">
        <BeginnerCard />


        </div>

        {/* Élémentaire 1 & 2 côte à côte */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <ElementaryCard />
          </div>
          <div className="flex-1">
            <ElementaryCard2 />
          </div>
        </div>

        {/* Intermédiaire 1 & 2 côte à côte */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <IntermediateCard />
          </div>
          <div className="flex-1">
            <IntermediateCard2 />
          </div>
        </div>
<div className="flex">

          <AdvancedCard />

</div>
      </div>

      {/* --- Image agrandie et alignée à gauche pour desktop --- */}
      <div className="hidden lg:block flex-shrink-0 relative mt-[80px] -translate-x-44">
        <Image
          src={ImgSide}
          alt="Illustration niveau"
          width={600}
          height={600}
          className="rounded-lg shadow-lg object-cover"
        />
      </div>
    </div>
  );
};

export default CoursesCardsPage;
