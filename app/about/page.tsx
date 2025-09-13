import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { BookOpen, Users, Award, PlayCircle } from "lucide-react";

import ImgHero from "../../public/images/about/beach.png";
import ImgVirtualTeacher from "../../public/images/about/allteachers.png"; // image à droite de la section "profs virtuels"

export const metadata: Metadata = {
  title: "À propos | Plateforme d’apprentissage du français",
  description: "Découvrez notre mission, nos professeurs virtuels et nos points forts.",
};

const AboutPage = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50 to-white pt-[200px] pb-20">
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
              width={520}
              height={520}
              className="rounded-2xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>

        {/* NOTRE MISSION */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-12">
            Rendre l’apprentissage du français accessible, engageant et efficace. Grâce à une pédagogie
            progressive et des professeurs virtuels, chaque étudiant avance à son rythme tout en
            découvrant la culture et la langue dans un cadre moderne et intuitif.
          </p>

          {/* 3 points mission */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow hover:shadow-md transition">
              <BookOpen className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Clarté</h3>
              <p className="text-sm text-gray-600 mt-2">
                Des parcours simples et progressifs pour apprendre sans confusion.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow hover:shadow-md transition">
              <Users className="w-12 h-12 text-emerald-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Accompagnement</h3>
              <p className="text-sm text-gray-600 mt-2">
                Des professeurs virtuels qui adaptent leur pédagogie à votre rythme.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow hover:shadow-md transition">
              <Award className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Réussite</h3>
              <p className="text-sm text-gray-600 mt-2">
                Des résultats concrets visibles dès les premières semaines.
              </p>
            </div>
          </div>
        </div>

        {/* VOS PROFESSEURS VIRTUELS (titre conservé, texte à gauche, image à droite) */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Vos professeurs virtuels
          </h2>

          <div className="grid lg:grid-cols-2 items-center gap-12">
            {/* Texte à gauche */}
            <div className="space-y-5">
              <p className="text-lg text-gray-700 leading-relaxed">
                Nos professeurs virtuels ne sont pas de simples avatars : ils structurent votre parcours
                et adaptent leur guidance à votre profil. À chaque étape, vous êtes accompagné·e par une
                pédagogie claire, bienveillante et motivante.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>🎯 <strong>Guidage personnalisé</strong> : objectifs clairs et feedback immédiat.</li>
                <li>🗣️ <strong>Oral au cœur</strong> : questions vocales, répétitions, mises en situation.</li>
                <li>📈 <strong>Progression visible</strong> : activités graduées, révisions intelligentes.</li>
                <li>💡 <strong>Confiance</strong> : vous pratiquez sans pression, avec des scénarios concrets.</li>
              </ul>
              <p className="text-gray-600">
                Résultat : vous apprenez plus vite, avec plus de plaisir — et vous osez vraiment parler.
              </p>
            </div>

            {/* Image à droite */}
            <div className="flex justify-center">
              <Image
                src={ImgVirtualTeacher}
                alt="Professeurs virtuels"
                width={520}
                height={420}
                className="rounded-2xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* POURQUOI NOUS CHOISIR */}
        <div className="mb-24 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Pourquoi choisir notre plateforme ?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-12">
            Une expérience pensée pour que chaque étudiant progresse sans stress, en restant motivé et
            accompagné à chaque étape.
          </p>

          {/* 3 points clés */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-rose-50 to-white rounded-2xl shadow hover:shadow-md transition">
              <PlayCircle className="w-12 h-12 text-rose-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Activités immersives</h3>
              <p className="text-sm text-gray-600 mt-2">
                QCM vocaux, vidéos, chansons et mises en situation pratiques.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-teal-50 to-white rounded-2xl shadow hover:shadow-md transition">
              <Users className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Encadrement humain</h3>
              <p className="text-sm text-gray-600 mt-2">
                Des professeurs virtuels interactifs, disponibles à tout moment.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow hover:shadow-md transition">
              <Award className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Résultats concrets</h3>
              <p className="text-sm text-gray-600 mt-2">
                Améliorez vos compétences orales, écrites et gagnez en confiance.
              </p>
            </div>
          </div>
        </div>

        {/* CTA FINAL — Votre prochain pas */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-white to-amber-50" />
          <div className="relative p-10 md:p-12 lg:p-14 text-center rounded-3xl ring-1 ring-black/5 shadow">
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Votre prochain pas commence ici
            </h3>
            <p className="mt-3 text-lg text-gray-700 max-w-2xl mx-auto">
              Choisissez votre niveau, lancez la première activité, et laissez nos professeurs virtuels
              vous guider. Simple, fluide et motivant.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/courses"
                className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg shadow hover:bg-amber-400 transition"
              >
                Explorer les cours
              </Link>
          
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
