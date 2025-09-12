import Image from "next/image";
import Link from "next/link";
import ImgTeacher1 from "../../../public/images/courses/teacher/jean.jpg";

const ElementaryCard = () => {
  return (
    <section>
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center justify-center">
          {/* Partie image */}
          <div className="w-full px-4 ">
            {/* Encadré cliquable */}
            <Link href="/courses/elementary" className="block">
              <div
                className="relative mx-auto mb-12 flex items-center justify-center cursor-pointer 
                  rounded-2xl shadow-lg bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-600
                  transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
                style={{
                  width: "320px",
                  height: "320px",
                }}
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
                  <span className="text-3xl font-extrabold uppercase tracking-wide 
                    text-black drop-shadow-lg bg-white/70 px-4 py-1 rounded-lg">
                    Élémentaire
                  </span>
                </div>

                {/* Badge niveau */}
                <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  A2
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElementaryCard;
