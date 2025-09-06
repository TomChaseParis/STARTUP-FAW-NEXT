import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-[100vh] overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/header/faw2.png"  // dans public/images/header/headerpic.png
          alt="French Around the World background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Voile pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/20" />
      </div>

      {/* Contenu centré verticalement */}
      <div className="container h-full">
        <div className="grid h-full place-items-center px-4">
          <div className="max-w-3xl text-center rounded-xl bg-white/70 backdrop-blur-sm shadow-lg p-6 sm:p-10">
        {/*     <h1 className="mb-4 text-3xl font-bold leading-tight text-black sm:text-4xl md:text-5xl">
              FRENCH AROUND THE WORLD
            </h1>
            <p className="text-base leading-relaxed text-black/80 sm:text-lg md:text-xl">
              Découvrez le français à travers le monde, avec des cours
              interactifs, des exercices ludiques et une ambiance unique 🌍✨
            </p> */}
            {/* Boutons d'action (optionnels) */}
            {/* <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a className="inline-block rounded-md bg-amber-400 px-6 py-3 font-semibold text-black hover:bg-amber-300 transition">
                Commencer
              </a>
              <a className="inline-block rounded-md border border-black/20 bg-white px-6 py-3 font-semibold text-black hover:bg-black/5 transition">
                Voir les niveaux
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
