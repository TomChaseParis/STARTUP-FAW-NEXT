import Link from "next/link";
import { Trophy, Star, Coins, Crown } from "lucide-react";

export const metadata = {
  title: "Tarifs | Apprentissage gamifié",
  description: "Un système de tokens fun et transparent : 1 token = 1 activité = 1 €.",
};

const PricingPage = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50 to-white pt-[200px] pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* HERO GAMIFIÉ */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Transformez vos <span className="text-amber-500">tokens</span> en succès 🎯
          </h1>
          <p className="mt-5 text-lg text-gray-700">
            Chaque activité = <span className="font-bold text-amber-600">1 token</span>.  
            Collectez vos jetons, progressez dans les niveaux et débloquez vos compétences en français.
          </p>
        </div>

        {/* Jauge de progression */}
        <div className="max-w-2xl mx-auto mb-24 text-center">
          <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-amber-600 w-2/3 transition-all"></div>
          </div>
          <p className="mt-3 text-sm text-gray-600">Votre progression : 65% vers la maîtrise 🎉</p>
        </div>

        {/* PACKS AVEC STYLE GAMIFIÉ */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-24">
          {/* Starter */}
          <div className="relative p-8 bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition text-center">
            <Star className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">🎯 Starter Pack</h3>
            <p className="text-gray-600 mb-6">Pour découvrir la plateforme.</p>
            <p className="text-4xl font-extrabold text-amber-500 mb-4">5 €</p>
            <p className="text-sm text-gray-500 mb-6">= 5 tokens</p>
            <Link href="/signup" className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg shadow hover:bg-amber-400 transition">
              Obtenir →
            </Link>
          </div>

          {/* Learning */}
          <div className="relative p-8 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl shadow-xl border-2 border-amber-300 text-center">
            <Crown className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <span className="absolute top-0 right-0 bg-amber-500 text-white text-xs px-3 py-1 rounded-bl-lg font-semibold">
              Populaire
            </span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">🚀 Learning Pack</h3>
            <p className="text-gray-600 mb-6">Idéal pour progresser chaque semaine.</p>
            <p className="text-4xl font-extrabold text-amber-600 mb-4">20 €</p>
            <p className="text-sm text-gray-500 mb-6">= 20 tokens</p>
            <Link href="/signup" className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg shadow hover:bg-amber-500 transition">
              Choisir →
            </Link>
          </div>

          {/* Master */}
          <div className="relative p-8 bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition text-center">
            <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">🔥 Master Pack</h3>
            <p className="text-gray-600 mb-6">Parfait pour les apprenants motivés.</p>
            <p className="text-4xl font-extrabold text-amber-500 mb-4">50 €</p>
            <p className="text-sm text-gray-500 mb-6">= 50 tokens + 5 bonus 🎁</p>
            <Link href="/signup" className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg shadow hover:bg-amber-400 transition">
              Débloquer →
            </Link>
          </div>
        </div>

        {/* CTA FINAL GAMIFIÉ */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Commencez votre aventure linguistique aujourd’hui ✨
          </h2>
          <p className="text-gray-600 mb-6">
            Chaque token est une clé. Débloquez vos activités et franchissez les niveaux comme dans un jeu.
          </p>
          <Link
            href="/signup"
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg shadow hover:shadow-xl transition"
          >
            Récupérer mes tokens →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
