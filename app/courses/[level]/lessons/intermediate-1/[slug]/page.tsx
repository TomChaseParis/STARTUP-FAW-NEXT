import LessonPage from "@/components/courses/layout/LessonPage";
import Intermediate1Quiz from "@/components/courses/lessons/intermediate-1/imparfait-dhabitude/Lesson";

export default function LessonPageRoute() {
  return (
    <LessonPage
      title="L’imparfait d’habitude"
      subtitle="Parler des habitudes dans le passé"
      description="Apprends à utiliser l’imparfait pour parler des habitudes et des actions répétées dans le passé."
      videoSrc="/videos/courses/intermediate-1/lesson/imparfait-dhabitude.mp4"
      poster=""
      quiz={<Intermediate1Quiz />}
    />
  );
}
