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
    <section>
      <h2 className="mb-8 text-3xl font-bold">
        Activités
      </h2>

      <div
        className="
          grid
          justify-start
          gap-8
          [grid-template-columns:repeat(auto-fit,minmax(420px,420px))]
        "
      >
        {activities.map((activity) => (
          <ActivityCard
            key={activity.slug}
            level={level}
            activity={activity}
          />
        ))}
      </div>
    </section>
  );
}