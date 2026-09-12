import LessonPage from "@/components/courses/layout/LessonPage";
import IntroduceYourselfQuiz from "@/components/courses/lessons/quiz/introduce-yourself";

export default function LessonPageRoute() {
  return (
    <LessonPage
      title="Se présenter en français"
      subtitle="Les bases pour parler de soi"
      description="Apprends à te présenter naturellement en français."
      videoSrc="https://vz-59620af9-b1f.b-cdn.net/15e8f303-14a7-448e-9690-0634dc67d365/playlist.m3u8"
      poster=""
      quiz={<IntroduceYourselfQuiz />}
    />
  );
}