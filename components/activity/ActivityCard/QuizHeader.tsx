import ProgressBar from "./ProgressBar";

type QuizHeaderProps = {
  title: string;

  current: number;

  total: number;
};

export default function QuizHeader({
  title,
  current,
  total,
}: QuizHeaderProps) {
  return (
    <header className="mb-12">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>

        <p className="mt-2 text-lg text-slate-500">
          Réponds aux questions une par une.
        </p>
      </div>

      <ProgressBar
        current={current}
        total={total}
      />
    </header>
  );
}