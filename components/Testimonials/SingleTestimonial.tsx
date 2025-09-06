import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation } = testimonial;

  // Icône étoile personnalisée
  const starIcon = (
    <svg width="20" height="20" viewBox="0 0 18 16" className="fill-yellow-400">
      <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
    </svg>
  );

  const ratingIcons = Array.from({ length: star }, (_, i) => (
    <span key={i} className="mr-1">{starIcon}</span>
  ));

  return (
    <div className="w-full">
      <div
        className="bg-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
      >
        {/* Étoiles */}
        <div className="mb-4 flex items-center space-x-1">{ratingIcons}</div>

        {/* Contenu */}
        <p className="mb-6 border-b border-blue-100 pb-6 text-base text-gray-800 italic">
          “{content}”
        </p>

        {/* Auteur */}
        <div className="flex items-center mt-4">
          <div className="relative mr-4 h-[50px] w-[50px] overflow-hidden rounded-full">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
          <div className="w-full">
            <h3 className="mb-1 text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonial;
