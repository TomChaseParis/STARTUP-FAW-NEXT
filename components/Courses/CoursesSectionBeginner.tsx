import Image from "next/image";
import Link from "next/link";
import ImgTeacher1 from "../../public/images/courses/proffemme.png";

const CoursesSectionBeginner = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          {/* Partie image */}
          <div className="w-full px-4 lg:w-1/2">
            {/* Encadré noir avec image et texte */}
            <div
              className="relative mx-auto mb-12 flex items-center justify-center bg-amber-400"
              style={{
                width: "400px",   // largeur de l'encart, modifiable
                height: "400px",  // hauteur de l'encart, modifiable
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
                  DEBUTANT
                </span>
              </div>
            </div>
          </div>

          {/* Partie liens */}
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp max-w-[470px] space-y-6"
              data-wow-delay=".2s"
            >
              {/* Activité 1 */}
              <div>
                <h3 className="mb-2 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                  <Link href="/activite1">Activité 1</Link>
                </h3>
                <ul className="ml-4 list-disc space-y-1 text-base font-medium text-body-color">
                  <li>
                    <Link href="activity/activityone/exercice1">Exercice 1</Link>
                  </li>
                </ul>
              </div>

              {/* Activité 2 */}
              <div> 
                <h3 className="text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                  <Link href="/activite2">Activité 2</Link>
                  <ul className="ml-4 list-disc space-y-1 text-base font-medium text-body-color">
                    <li>
                      <Link href="activity/activitytwo/exercice2">Exercice 1</Link>
                    </li>
                  </ul>
                </h3>
              </div>

              {/* Activité 3 */}
              <div>
                <h3 className="text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                  <Link href="/activite3">Activité 3</Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSectionBeginner;
