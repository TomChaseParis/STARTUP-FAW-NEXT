"use client";

type InfoBlockProps = {
  objectifs?: string[];
  competences?: string[];
  prerequis?: string[];
  duree?: string;
};

export default function InfoBlock({
  objectifs = [],
  competences = [],
  prerequis = [],
  duree,
}: InfoBlockProps) {
  const hasContent =
    objectifs.length ||
    competences.length ||
    prerequis.length ||
    duree;

  if (!hasContent) return null;

  return (
    <div className="w-full">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg ring-1 ring-black/5">
        <div className="grid gap-8 md:grid-cols-2">
          
          {/* 🎯 Objectifs */}
          {objectifs.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold text-black">
                🎯 Objectifs
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-black/80">
                {objectifs.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 🧠 Compétences */}
          {competences.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold text-black">
                🧠 Compétences mises en œuvre
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-black/80">
                {competences.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 📘 Prérequis */}
          {prerequis.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold text-black">
                📘 Prérequis
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-black/80">
                {prerequis.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ⏱ Durée */}
          {duree && (
            <div>
              <h3 className="mb-3 text-lg font-semibold text-black">
                ⏱ Durée estimée
              </h3>
              <p className="text-black/80">
                Environ <strong>{duree}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
