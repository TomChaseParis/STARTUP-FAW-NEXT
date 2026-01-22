import Image from "next/image";
import Link from "next/link";
import ImgTeacher1 from "../../../public/images/courses/teacher/card-karla.png";

const BeginnerCard = () => {
  return (
    <section>
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center justify-center">
          {/* Partie image */}
          <div className="w-full px-4 ">
            {/* Encadré cliquable */}
            <Link href="/courses/beginner" className="block">
              <div
                className="relative mx-auto mb-12 flex cursor-pointer items-center justify-center 
                  rounded-2xl bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-lg
                  transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                style={{
                  width: "320px",
                  height: "320px",
                }}
                data-wow-delay=".15s"
              >
                {/* Image centrée */}
                <div className="relative mt-6 h-[80%] w-[80%]">
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
                    className="rounded-lg bg-white/70 px-4 py-1 
                    text-3xl font-extrabold uppercase tracking-wide text-black drop-shadow-lg"
                  >
                    Débutant
                  </span>
                </div>

                {/* Badge niveau */}
                <span className="absolute bottom-3 right-3 rounded-full bg-black/80 px-3 py-1 text-xs text-white shadow-md">
                  A1
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeginnerCard;
