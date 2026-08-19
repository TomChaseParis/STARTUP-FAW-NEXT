import { createContext, useContext, ReactNode } from "react";
import { useActivityNavigation } from "./useActivityNavigation";
import { ActivityNavigationContextType } from "./types";

const ActivityNavigationContext =
  createContext<ActivityNavigationContextType | null>(null);

type Props = {
  children: ReactNode;
  totalExercises: number;
};

export function ActivityNavigationProvider({
  children,
  totalExercises,
}: Props) {
  const navigation = useActivityNavigation(totalExercises);

  return (
    <ActivityNavigationContext.Provider value={navigation}>
      {children}
    </ActivityNavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(ActivityNavigationContext);

  if (!context) {
    throw new Error(
      "useNavigation must be used inside ActivityNavigationProvider"
    );
  }

  return context;
}