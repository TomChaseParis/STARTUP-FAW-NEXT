"use client";

export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white py-20 space-y-20">
      {children}
    </section>
  );
}
