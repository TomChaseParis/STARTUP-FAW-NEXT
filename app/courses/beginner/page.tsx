import Image from "next/image";
import ImgTeacher1 from "../../../public/images/courses/proffemme.png";
import ActivityCard from "@/components/Courses/Shared/ActivityCard";

const BeginnerPage = () => {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-28">
      <div className="container pt-[90px] flex flex-col items-start space-y-12">
        {/* Card DEBUTANT alignée au-dessus de la grille */}
        <div
          className="relative flex items-center justify-center bg-amber-400"
          style={{ width: "300px", height: "300px" }}
        >
          <div className="relative w-[80%] h-[80%] mt-8">
            <Image
              src={ImgTeacher1}
              alt="prof"
              fill
              style={{ objectFit: "contain" }}
              className="rounded-md"
            />
          </div>
          <div className="absolute inset-0 flex mt-3 justify-center">
            <span className="text-black text-3xl font-bold uppercase">
              DEBUTANT
            </span>
          </div>
        </div>

        {/* Grille des activités : on passe title/description/href en props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <ActivityCard
            title="Activité 1"
            description="Grammaire : Être / Avoir / Aller / Faire — écoute et répétition."
            href="/courses/beginner/activity1"
          />

          <ActivityCard
            title="Activité 2"
            description="Compréhension orale : se présenter, poser des questions simples."
            href="/courses/beginner/activity2"
          />

          <ActivityCard
            title="Activité 3"
            description="Vocabulaire du quotidien : horaires, lieux, objets utiles."
            href="/courses/beginner/activity3"
          />

          <ActivityCard
            title="Activité 4"
            description="Lecture guidée : repérer les infos clés dans un texte court."
            href="/courses/beginner/activity4"
          />

          <ActivityCard
            title="Activité 5"
            description="Prononciation : rythme, liaisons et intonation de base."
            href="/courses/beginner/activity5"
          />

          <ActivityCard
            title="Activité 6"
            description="Production orale : mini-dialogues du quotidien."
            href="/courses/beginner/activity6"
          />
        </div>
      </div>
    </section>
  );
};

export default BeginnerPage;
