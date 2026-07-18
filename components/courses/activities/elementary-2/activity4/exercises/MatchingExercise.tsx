"use client";

import MatchingEngine from "@/components/courses/engines/MatchingEngine";
import { matchingData } from "../data/matchingData";

export default function MatchingExercise() {
  return <MatchingEngine data={matchingData} />;
}