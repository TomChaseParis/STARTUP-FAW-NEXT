"use client";

import FillGapsEngine from "@/components/courses/blocks/FillGapsEngine";
import { episodeVacancesData } from "./episodeVacancesData";

export default function Exercice() {
  return <FillGapsEngine data={episodeVacancesData} />;
}