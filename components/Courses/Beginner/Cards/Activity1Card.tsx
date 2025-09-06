import Link from "next/link";

const Activity1Card = () => {
  return (
    <Link href="/courses/beginner/activity1" className="block">
      <div className="w-64 h-64 bg-amber-400 flex items-center justify-center rounded-lg shadow-md hover:scale-105 transition">
        <h3 className="text-2xl font-bold text-black">Activité 1</h3>
      </div>
    </Link>
  );
};

export default Activity1Card;
