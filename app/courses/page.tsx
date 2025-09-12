import AdvancedCard from "@/components/Courses/CardsLevel/AdvancedCard";
import BeginnerCard from "@/components/Courses/CardsLevel/BeginnerCard";
import ElementaryCard from "@/components/Courses/CardsLevel/ElementaryCard";
import ElementaryCard2 from "@/components/Courses/CardsLevel/ElementaryCard2";
import IntermediateCard from "@/components/Courses/CardsLevel/IntermediateCard";
import IntermediateCard2 from "@/components/Courses/CardsLevel/IntermediateCard2";
import Image from "next/image";
import ImgSide from "../../public/images/courses/level-plan.png";
import ImgTeacher from "../../public/images/courses/teacher/proffemme.png"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses Page | Free Next.js Template for Startup and SaaS",
  description: "Page présentant les niveaux de cours",
};

const CoursesCardsPage = () => {
  return (
    
     <section className="bg-white py-16 md:py-20 lg:py-28">
      <div className="container pt-[90px] flex flex-col items-start space-y-12">
        {/* Card DEBUTANT alignée au-dessus de la grille */}
        <div   >
          <BeginnerCard />
        
       
        </div>

        {/* Grille des activités : on passe title/description/href en props */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ElementaryCard />

          <ElementaryCard2 />

        <IntermediateCard />
    
    <IntermediateCard2 />
    
    <AdvancedCard />
        </div>
      </div>
    </section>
  );
};

export default CoursesCardsPage;





