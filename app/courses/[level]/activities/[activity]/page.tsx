import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const Activity = dynamic(
    () =>
      import(
        `@/components/courses/activities/${params.level}/${params.activity}/Activity`
      ),
    { ssr: false }
  );

  return  <div className="bg-white pt-[130px]">
  <Activity />
</div>
}
