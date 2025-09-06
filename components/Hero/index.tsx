import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-[100vh] overflow-hidden"
    >
      {/* Background dézoomé */}
      <div className="absolute inset-0 -z-10">
        {/* Canvas élargi + image scale pour dézoomer */}
        <div className="">
          <Image
            src="/images/header/headerpic.png" // public/images/header/faw2.png
            alt="French Around the World background"
            fill
            className=" object-cover object-center transition-transform"
            priority
          />
        </div>

        {/* Voile lisibilité */}
        <div className="absolute inset-0  bg-gradient-to-b from-white/70 via-white/40 to-white/20" />
      </div>

      {/* Contenu centré verticalement */}
      <div className="container h-full">
        <div className="grid h-full place-items-center px-4">
          <div className="max-w-3xl text-center rounded-xl bg-white/70 backdrop-blur-sm shadow-lg p-6 sm:p-10">
            {/* 
            <h1 className="mb-4 text-3xl font-bold leading-tight text-black sm:text-4xl md:text-5xl">
              FRENCH AROUND THE WORLD
            </h1>
            <p className="text-base leading-relaxed text-black/80 sm:text-lg md:text-xl">
              Découvrez le français à travers le monde, avec des cours
              interactifs, des exercices ludiques et une ambiance unique 🌍✨
            </p>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
