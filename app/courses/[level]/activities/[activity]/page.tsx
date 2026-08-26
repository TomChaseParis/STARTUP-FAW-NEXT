import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

type ActivityComponent = ReturnType<typeof dynamic>;

const activityMap: Record<string, ActivityComponent> = {
  "beginner/big-four": dynamic(
    () =>
      import(
        "@/components/courses/activities/beginner/activity1/Activity"
      ),
    { ssr: false },
  ),

  "beginner/introduce-yourself": dynamic(
    () =>
      import(
        "@/components/courses/activities/beginner/activity2/Activity"
      ),
    { ssr: false },
  ),

  "beginner/activity3": dynamic(
    () =>
      import(
        "@/components/courses/activities/beginner/activity3/Activity"
      ),
    { ssr: false },
  ),

  "beginner/activity4": dynamic(
    () =>
      import(
        "@/components/courses/activities/beginner/activity4/Activity"
      ),
    { ssr: false },
  ),

  "beginner/activity5": dynamic(
    () =>
      import(
        "@/components/courses/activities/beginner/activity5/Activity"
      ),
    { ssr: false },
  ),

  "elementary-1/questions-francais": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-1/activity1/Activity"
      ),
    { ssr: false },
  ),

  "elementary-1/activity1": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-1/activity1/Activity"
      ),
    { ssr: false },
  ),

  "elementary-1/activity2": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-1/activity2/Activity"
      ),
    { ssr: false },
  ),

  "elementary-1/gouts-loisirs": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-1/activity2/Activity"
      ),
    { ssr: false },
  ),

  "elementary-1/activity3": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-1/activity3/Activity"
      ),
    { ssr: false },
  ),

  "elementary-1/activity4": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-1/activity4/Activity"
      ),
    { ssr: false },
  ),

  /*
   * ÉLÉMENTAIRE 2
   */

  "elementary-2/activity1": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-2/activity1/Activity"
      ),
    { ssr: false },
  ),

  "elementary-2/activity2": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-2/activity2/Activity"
      ),
    { ssr: false },
  ),

  "elementary-2/activity3": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-2/activity3/Activity"
      ),
    { ssr: false },
  ),

  "elementary-2/activity4": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-2/activity4/Activity"
      ),
    { ssr: false },
  ),

  "elementary-2/activity5": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-2/activity5/Activity"
      ),
    { ssr: false },
  ),

  /*
   * ALIAS DES ACTIVITÉS DES MODULES
   */

  "elementary-2/emploi-du-temps-clara": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-2/activity1/Activity"
      ),
    { ssr: false },
  ),

  "elementary-2/non-non-non": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-2/activity4/Activity"
      ),
    { ssr: false },
  ),

  "elementary-2/la-famille-demenage": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-2/activity2/Activity"
      ),
    { ssr: false },
  ),

  "elementary-2/anges-et-demons": dynamic(
    () =>
      import(
        "@/components/courses/activities/elementary-2/activity5/Activity"
      ),
    { ssr: false },
  ),

  /*
   * INTERMÉDIAIRE 1
   */

  "intermediate-1/activity1": dynamic(
    () =>
      import(
        "@/components/courses/activities/intermediate-1/activity1/Activity"
      ),
    { ssr: false },
  ),

  "intermediate-1/activity2": dynamic(
    () =>
      import(
        "@/components/courses/activities/intermediate-1/activity2/Activity"
      ),
    { ssr: false },
  ),

  "intermediate-1/activity3": dynamic(
    () =>
      import(
        "@/components/courses/activities/intermediate-1/activity3/Activity"
      ),
    { ssr: false },
  ),

  "intermediate-1/pronoms-complements": dynamic(
    () =>
      import(
        "@/components/courses/activities/intermediate-1/activity1/Activity"
      ),
    { ssr: false },
  ),

  "intermediate-1/imparfait-dhabitude": dynamic(
    () =>
      import(
        "@/components/courses/activities/intermediate-1/activity2/Activity"
      ),
    { ssr: false },
  ),
};

export default function Page({
  params,
}: {
  params: { level: string; activity: string };
}) {
  const key = `${params.level}/${params.activity}`;

  const Activity = activityMap[key];

  if (!Activity) {
    notFound();
  }

  return (
    <div className="bg-white pt-[130px]">
      <Activity />
    </div>
  );
}