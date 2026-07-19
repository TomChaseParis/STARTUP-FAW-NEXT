import { BookOpen, Mic, Trophy } from "lucide-react";
import Image from "next/image";

export default function LoginHero() {
  return (
    <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 text-white lg:flex before:absolute
    before:inset-0
    before:bg-[url('/images/noise.png')]
    before:opacity-[0.04]
    before:content-['']">
      {/* Motifs lumineux */}

<div className="absolute inset-0 overflow-hidden">

<div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

<div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-300/20 blur-3xl" />

<div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

</div>
      {/* Dégradé lumineux */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.20),transparent_45%)]" />

      {/* Décoration */}
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

      <div className="relative z-10 flex h-full w-full flex-col justify-between p-16">
        {/* Haut */}
        <div>
          <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
            🇫🇷 French Around the World
          </span>

          <h1 className="mt-10 text-5xl font-extrabold leading-tight">
            Bienvenue !
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
            Apprends le français grâce à des activités interactives, des vidéos,
            des exercices de prononciation et un suivi personnalisé de ta
            progression.
          </p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center">
          <div className="relative mx-auto h-[420px] w-full max-w-[450px]">
            <Image
              src="/images/auth/login-hero.jpg"
              alt="French Around the World"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Bas */}
        <div className="grid gap-5">
          <Feature
            icon={<BookOpen size={22} />}
            title="Cours interactifs"
            text="Progresse à ton rythme avec des centaines d'activités."
          />

          <Feature
            icon={<Mic size={22} />}
            title="Prononciation assistée par IA"
            text="Entraîne-toi à parler comme un natif."
          />

          <Feature
            icon={<Trophy size={22} />}
            title="Suis tes progrès"
            text="Débloque des niveaux et améliore ton français chaque jour."
          />
        </div>
      </div>
    </div>
  );
}

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

function Feature({ icon, title, text }: FeatureProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="text-blue-100">{text}</p>
      </div>
    </div>
  );
}
