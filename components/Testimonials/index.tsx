import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Suzanne Beurk",
    designation: "Apprenant Débutant",
    content:
      "Grâce aux cours, j'ai pu progresser rapidement et comprendre les bases de manière intuitive et ludique.",
    image: "/images/testimonials/auth-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Marie Dupont",
    designation: "Apprenant Intermédiaire",
    content:
      "Les exercices pratiques m'ont beaucoup aidée à consolider mes connaissances et gagner en confiance.",
    image: "/images/testimonials/auth-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "Luc Martin",
    designation: "Apprenant Avancé",
    content:
      "J'apprécie particulièrement l'approche claire et structurée des cours, avec un vrai suivi pédagogique.",
    image: "/images/testimonials/auth-03.png",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-blue-600 relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Ce que nos apprenants disent"
          paragraph=""
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonialData.map((testimonial) => (
            <SingleTestimonial
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>

      {/* Formes décoratives plus douces */}
      <div className="absolute right-0 top-5 z-[-1]">
        <svg width="238" height="531" viewBox="0 0 238 531" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            opacity="0.2"
            x="422.819"
            y="-70.8145"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 422.819 -70.8145)"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient id="paint0_linear" x1="517.152" y1="-251.373" x2="517.152" y2="459.865" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFD166" />
              <stop offset="1" stopColor="#FFD166" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Testimonials;
