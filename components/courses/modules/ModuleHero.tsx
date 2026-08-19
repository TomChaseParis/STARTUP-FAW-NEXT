type ModuleHeroProps = {
  title: string;
  category: string;
  description: string;
};

export default function ModuleHero({
  title,
  category,
  description,
}: ModuleHeroProps) {
  return (
    <section className="rounded-3xl bg-white border border-slate-200 p-10 shadow-sm">
      <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
        {category}
      </span>

      <h1 className="mt-5 text-5xl font-black text-slate-900">
        {title}
      </h1>

      <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-600">
        {description}
      </p>
    </section>
  );
}