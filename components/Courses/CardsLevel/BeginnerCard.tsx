import Image from "next/image";
import Link from "next/link";
import ImgTeacher1 from "../../../public/images/courses/proffemme.png";

const BeginnerCard = () => {
  return (
    <section className="">
      <div className="container pt-[90px]">
        <div className="-mx-4 flex flex-wrap items-center">
          {/* Partie image */}
          <div className="w-full px-4 lg:w-1/2">
            {/* Encadré cliquable */}
            <Link href="/courses/beginner" className="block">
              <div
                className="relative mx-auto mb-12 flex items-center justify-center bg-amber-400 cursor-pointer hover:opacity-90 transition"
                style={{
                  width: "300px",   // largeur de l'encart
                  height: "300px",  // hauteur de l'encart
                }}
                data-wow-delay=".15s"
              >
                {/* Image centrée dans l'encart */}
                <div className="relative w-[80%] h-[80%] mt-8">
                  <Image
                    src={ImgTeacher1}
                    alt="prof"
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-md"
                  />
                </div>

                {/* Texte centré */}
                <div className="absolute inset-0 flex mt-3 justify-center">
                  <span className="text-black text-3xl font-bold uppercase">
                    DEBUTANT
                  </span>
                </div>
              </div>
            </Link>
          </div>


          

        </div>
        
      </div>
    </section>
  );
};

export default BeginnerCard;
