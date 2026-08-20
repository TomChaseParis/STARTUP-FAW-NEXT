import LessonPage from "@/components/courses/layout/LessonPage";
import IntroduceYourselfQuiz from "@/components/courses/lessons/quiz/introduce-yourself";

export default function LessonPageRoute() {
  return (
    <LessonPage
      title="Se présenter en français"
      subtitle="Les bases pour parler de soi"
      description="Apprends à te présenter naturellement en français."
      videoSrc="https://vz-29802eea-b38.b-cdn.net/bc1452b5-9b7d-4c0d-baca-a611dd21ff33/playlist.m3u8"
      poster=""
      quiz={<IntroduceYourselfQuiz />}
    />
  );
}