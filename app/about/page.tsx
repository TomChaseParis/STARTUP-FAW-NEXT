import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { BookOpen, Users, Award, PlayCircle } from "lucide-react";

import ImgTeacher from "../../public/images/courses/teacher/proffemme.png";
import ImgHero from "../../public/images/about/beach.png";

export const metadata: Metadata = {
  title: "À propos | Plateforme d’apprentissage du français",
  description: "Découvrez notre mission, notre pédagogie et nos professeurs virtuels.",
};

const AboutPage = () => {
  return (
    <section className="bg-white pt-[200px] pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* HERO */}
        <div className="grid lg:grid-cols-2 items-center gap-12 mb-24">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Apprenez le français <span className="text-amber-500">autrement</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Une plateforme innovante où les professeurs virtuels vous guident à travers chaque niveau,
              de débutant à avancé. Une expérience immersive, interactive et gamifiée.
            </p>
            <Link
              href="/courses"
              className="inline-block px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg shadow hover:bg-amber-400 transition"
            >
              Commencez dès aujourd’hui →
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src={ImgHero}
              alt="Illustration apprentissage"
              width={500}
              height={500}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>

        {/* NOTRE MISSION */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Rendre l’apprentissage du français accessible, engageant et efficace. 
            Grâce à une pédagogie progressive et des professeurs virtuels, 
            chaque étudiant avance à son rythme tout en découvrant la culture 
            et la langue dans un cadre moderne et intuitif.
          </p>
        </div>

        {/* PROFESSEURS VIRTUELS */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Vos professeurs virtuels
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-gradient-to-br from-amber-100 via-white to-amber-50 p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={ImgTeacher}
                    alt="Professeur virtuel"
                    width={120}
                    height={120}
                    className="rounded-full shadow-md object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center">Professeur {n}</h3>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Spécialiste du niveau {n === 1 ? "A1" : n === 2 ? "A2" : "B1"} avec une approche
                  interactive et bienveillante.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* POURQUOI NOUS CHOISIR */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir notre plateforme ?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <BookOpen className="w-10 h-10 text-amber-500 mb-3" />
              <h4 className="font-semibold text-gray-800">Méthode claire</h4>
              <p className="text-sm text-gray-600 mt-2">
                Une progression guidée du niveau A1 à B2, étape par étape.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <Users className="w-10 h-10 text-emerald-500 mb-3" />
              <h4 className="font-semibold text-gray-800">Professeurs virtuels</h4>
              <p className="text-sm text-gray-600 mt-2">
                Des enseignants interactifs qui vous accompagnent tout au long du parcours.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <PlayCircle className="w-10 h-10 text-red-500 mb-3" />
              <h4 className="font-semibold text-gray-800">Activités immersives</h4>
              <p className="text-sm text-gray-600 mt-2">
                QCM vocaux, vidéos, chansons et mises en situation pratiques.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <Award className="w-10 h-10 text-blue-500 mb-3" />
              <h4 className="font-semibold text-gray-800">Résultats concrets</h4>
              <p className="text-sm text-gray-600 mt-2">
                Améliorez votre compréhension, votre oral et votre confiance en vous.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Prêt à démarrer votre aventure ?
          </h2>
          <Link
            href="/courses"
            className="px-8 py-4 bg-amber-500 text-black font-semibold rounded-lg shadow hover:bg-amber-400 transition"
          >
            Explorer les cours →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
