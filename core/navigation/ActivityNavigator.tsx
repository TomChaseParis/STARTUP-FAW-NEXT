import { ReactNode } from "react";
import { useActivityNavigation } from "./useActivityNavigation";

type ActivityNavigatorProps = {
  children: ReactNode;
};

export default function ActivityNavigator({
  children,
}: ActivityNavigatorProps) {
  const exercises = Array.isArray(children) ? children : [children];

  const navigation = useActivityNavigation(exercises.length);

  return (
    <>
      {exercises[navigation.currentExerciseIndex]}
    </>
  );
}