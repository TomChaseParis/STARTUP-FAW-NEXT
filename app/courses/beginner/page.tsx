import Image from "next/image";
import Link from "next/link";
import ImgTeacher1 from "../../../public/images/courses/proffemme.png";
import ActivityCard from "@/components/Courses/Shared/ActivityCard";

const BeginnerPage = () => {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-28">
      <div className="container pt-[90px] flex flex-col items-start space-y-12">
        {/* Card DEBUTANT alignée à gauche */}
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <Link href="/courses/beginner" className="block">
              <div
                className="relative mx-auto mb-12 flex items-center justify-center cursor-pointer 
                  rounded-2xl shadow-lg bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600
                  transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
                style={{ width: "320px", height: "320px" }}
                data-wow-delay=".15s"
              >
                {/* Image centrée */}
                <div className="relative w-[80%] h-[80%] mt-6">
                  <Image
                    src={ImgTeacher1}
                    alt="prof"
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-lg drop-shadow-md"
                  />
                </div>

                {/* Texte centré */}
                <div className="absolute inset-0 flex items-end justify-center pb-6">
                  <span
                    className="text-3xl font-extrabold uppercase tracking-wide 
                    text-black drop-shadow-lg bg-white/70 px-4 py-1 rounded-lg"
                  >
                    Débutant
                  </span>
                </div>

                {/* Badge niveau */}
                <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  A1
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Grille des activités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <ActivityCard
            title="Activité 1"
            description="Grammaire : Être / Avoir / Aller / Faire — écoute et répétition."
            href="/courses/beginner/activity1"
            level="beginner"
            duration="5mn"
          />

          <ActivityCard
            title="Activité 2"
            description="Compréhension orale : se présenter, poser des questions simples."
            href="/courses/beginner/activity2"
            level="beginner"
          />

          <ActivityCard
            title="Activité 3"
            description="Vocabulaire du quotidien : horaires, lieux, objets utiles."
            href="/courses/beginner/activity3"
            level="beginner"
          />

          <ActivityCard
            title="Activité 4"
            description="Lecture guidée : repérer les infos clés dans un texte court."
            href="/courses/beginner/activity4"
            level="beginner"
          />

          <ActivityCard
            title="Activité 5"
            description="Prononciation : rythme, liaisons et intonation de base."
            href="/courses/beginner/activity5"
            level="beginner"
          />

          <ActivityCard
            title="Activité 6"
            description="Production orale : mini-dialogues du quotidien."
            href="/courses/beginner/activity6"
            level="beginner"
          />
        </div>
      </div>
    </section>
  );
};

export default BeginnerPage;
