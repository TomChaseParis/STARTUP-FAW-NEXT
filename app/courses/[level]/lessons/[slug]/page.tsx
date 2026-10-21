
import { notFound } from "next/navigation";

import LessonPage from "@/components/courses/layout/LessonPage";

import IntroduceYourselfQuiz from "@/components/courses/lessons/quiz/introduce-yourself";

import Intermediate1Quiz from "@/components/courses/lessons/indermediate-1/imparfait-dhabitude/Lesson";

type LessonConfig = {
  title: string;
  subtitle: string;
  description: string;
  videoSrc: string;
  poster: string;
  quiz: React.ReactNode;
};

const lessons: Record<string, LessonConfig> = {
  "beginner/introduce-yourself": {
    title: "Présentations",
    subtitle: "Les bases pour parler de soi",
    description:
      "Apprends à te présenter naturellement en français.",
    videoSrc:
      "https://vz-59620af9-b1f.b-cdn.net/15e8f303-14a7-448e-9690-0634dc67d365/playlist.m3u8",
    poster: "",
    quiz: <IntroduceYourselfQuiz />,
  },

  "intermediate-1/imparfait-dhabitude": {
    title: "L’imparfait d’habitude",
    subtitle: "Parler des habitudes dans le passé",
    description:
      "Apprends à utiliser l’imparfait pour parler des habitudes et des actions répétées dans le passé.",
      videoSrc:
      "https://vz-92b9aa69-e73.b-cdn.net/00f0736f-4f01-428c-a350-a4237adb5e41/playlist.m3u8",    poster: "",
    quiz: <Intermediate1Quiz />,
  },
};

type LessonPageRouteProps = {
  params: {
    level: string;
    slug: string;
  };
};

export default function LessonPageRoute({
  params,
}: LessonPageRouteProps) {
  const lessonKey = `${params.level}/${params.slug}`;
  const lesson = lessons[lessonKey];

  if (!lesson) {
    notFound();
  }

  return <LessonPage {...lesson} />;
}
