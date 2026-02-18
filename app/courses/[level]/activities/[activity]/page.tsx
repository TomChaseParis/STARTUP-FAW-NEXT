import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import path from "path";

export default function Page({ params }: { params: { level: string; activity: string } }) {
  const Activity = dynamic(
    () =>
      import(
        `../../../../../components/courses/activities/${params.level}/${params.activity}/Activity`
      ),
    { ssr: false }
  );
  

  if (!Activity) {
    notFound();
  }

  return (
    <div className="bg-white pt-[130px]">
      <Activity />
    </div>
  );
}
