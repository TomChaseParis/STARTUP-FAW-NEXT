"use client";

import ClassificationEngine from "@/components/courses/engines/ClassificationEngine";
import { angelDemonData } from "../data/angelDemonData";
import { tenseData } from "../data/tenseData";
export default function ClassificationExercise() {
  return (
    <div className="space-y-20">
      <div>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Partie 1 • Ange ou démon
        </h2>

        <ClassificationEngine data={angelDemonData} />
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Partie 2 • Passé, présent ou futur
        </h2>

        <ClassificationEngine data={tenseData} />
      </div>
    </div>
  );
}