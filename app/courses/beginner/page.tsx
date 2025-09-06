import Image from "next/image";
import Link from "next/link";
import ImgTeacher1 from "../../../public/images/courses/proffemme.png";

const BeginnerPage = () => {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-28">
      <div className="container pt-[90px] flex flex-col items-start space-y-12">
        
        {/* Card DEBUTANT alignée au-dessus de Activité 1 */}
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

        {/* Grille des activités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* ACTIVITÉ 1 AVEC LIEN */}
          <Link href="/courses/beginner/activity1">
            <div
              className="bg-amber-400 flex items-center justify-center rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ width: "300px", height: "300px" }}
            >
              <span className="text-black text-3xl font-bold">Activité 1</span>
            </div>
          </Link>

          {/* ACTIVITÉ 2 */}
           <Link href="/courses/beginner/activity2">
            <div
              className="bg-amber-400 flex items-center justify-center rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ width: "300px", height: "300px" }}
            >
              <span className="text-black text-3xl font-bold">Activité 2</span>
            </div>
          </Link>

          {/* ACTIVITÉ 3 */}
          <div
            className="bg-amber-400 flex items-center justify-center rounded-lg shadow-md"
            style={{ width: "300px", height: "300px" }}
          >
            <span className="text-black text-3xl font-bold">Activité 3</span>
          </div>

          {/* ACTIVITÉ 4 */}
          <div
            className="bg-amber-400 flex items-center justify-center rounded-lg shadow-md"
            style={{ width: "300px", height: "300px" }}
          >
            <span className="text-black text-3xl font-bold">Activité 4</span>
          </div>

          {/* ACTIVITÉ 5 */}
          <div
            className="bg-amber-400 flex items-center justify-center rounded-lg shadow-md"
            style={{ width: "300px", height: "300px" }}
          >
            <span className="text-black text-3xl font-bold">Activité 5</span>
          </div>

          {/* ACTIVITÉ 6 */}
          <div
            className="bg-amber-400 flex items-center justify-center rounded-lg shadow-md"
            style={{ width: "300px", height: "300px" }}
          >
            <span className="text-black text-3xl font-bold">Activité 6</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeginnerPage;
