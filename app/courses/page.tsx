import AdvancedCard from "@/components/Courses/CardsLevel/AdvancedCard";
import BeginnerCard from "@/components/Courses/CardsLevel/BeginnerCard";
import ElementaryCards from "@/components/Courses/CardsLevel/ElementaryCards";
import IntermediateCards from "@/components/Courses/CardsLevel/IntermediateCards";
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
      <div className="flex-1 flex flex-col gap-1">
        <BeginnerCard />
        <ElementaryCards />
        <IntermediateCards />
        <AdvancedCard />
      </div>

      {/* --- Image agrandie et alignée à gauche pour desktop --- */}
      <div className="hidden lg:block flex-shrink-0 relative mt-[80px] -translate-x-44">
        <Image
          src={ImgSide}
          alt="Illustration niveau"
          width={600}    // agrandi depuis 300px
          height={600}   // agrandi depuis 300px
          className="rounded-lg shadow-lg object-cover"
        />
      </div>

    </div>
  );
};

export default CoursesCardsPage;
