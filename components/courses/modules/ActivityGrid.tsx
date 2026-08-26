import ActivityCard from "./ActivityCard";

type ActivityGridProps = {
  level: string;
  activities: any[];
};

export default function ActivityGrid({
  level,
  activities,
}: ActivityGridProps) {
  return (
    <section className="w-full">
      <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
        Activités
      </h2>

      <div
        className="
          grid
          w-full
          grid-cols-1
          justify-items-center
          gap-8
          sm:grid-cols-1
          lg:grid-cols-2
          xl:grid-cols-3
        "
      >
        {activities.map((activity) => (
          <div
            key={activity.slug}
            className="w-full max-w-[420px]"
          >
            <ActivityCard
              level={level}
              activity={activity}
            />
          </div>
        ))}
      </div>
    </section>
  );
}