import LessonPage from "@/components/courses/layout/LessonPage";

export default function LessonPageRoute() {
  return (
    <LessonPage
      title="Se présenter en français"
      subtitle="Les bases pour parler de soi"
      description="Apprends à te présenter naturellement en français."
      videoSrc="/videos/courses/beginner/lesson/introduce-yourself.mp4"
      poster="/images/courses/beginner/lessons/introduce-yourself/poster.png"
      quiz={
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-lg font-bold text-slate-800">
            Quiz
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Le quiz sera branché ici à l'étape suivante.
          </p>
        </div>
      }
    />
  );
}