import Image from "next/image";
import Link from "next/link";
import ImgTeacher1 from "../../../public/images/courses/teacher/jean.jpg";

const IntermediateCards = () => {
  return (
    <section className="">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          {/* Partie image */}
          <div className="w-full px-4 lg:w-1/2">
            {/* Encadré noir avec image et texte */}
            <div
              className="relative mx-auto mb-12 flex items-center justify-center bg-pink-400"
              style={{
                width: "300px",   // largeur de l'encart, modifiable
                height: "300px",  // hauteur de l'encart, modifiable
              }}
              data-wow-delay=".15s"
            >
             {/* Image centrée dans l'encart, légèrement descendue */}
<div className="relative w-[80%] h-[80%] mt-8">
  <Image
    src={ImgTeacher1}
    alt="prof"
    fill
    style={{ objectFit: "contain" }}
    className="rounded-md"
  />
</div>

              {/* Texte centré sur l'image */}
              <div className="absolute inset-0 flex mt-3 justify-center">
                <span className="text-black text-3xl font-bold uppercase">
                  INTERMEDIAIRE
                </span>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default IntermediateCards;
