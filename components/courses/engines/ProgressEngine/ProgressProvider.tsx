"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { ProgressEngine } from "./ProgressEngine";

type ProgressContextValue = {
  progress: ProgressEngine;
  refresh: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

type ProgressProviderProps = {
  children: ReactNode;
};

export function ProgressProvider({
  children,
}: ProgressProviderProps) {
  const progress = useMemo(() => new ProgressEngine(), []);

  const [, setVersion] = useState(0);

  const refresh = () => {
    setVersion((v) => v + 1);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        refresh,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error(
      "useProgress must be used inside ProgressProvider."
    );
  }

  return context;
}