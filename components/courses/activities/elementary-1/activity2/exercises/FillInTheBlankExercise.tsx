import FillGapsEngine from "@/components/courses/engines/FillGapsEngine";
import { frenchLeisureData } from "../data/frenchLeisureData";

export default function FillInTheBlankExercise() {
  return (
    <FillGapsEngine
      data={frenchLeisureData}
      teacherImage="/images/courses/elementary/activities/activity2/bubble.png"
    />
  );
}