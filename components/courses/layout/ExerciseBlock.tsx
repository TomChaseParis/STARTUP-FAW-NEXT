"use client";

import { ReactNode } from "react";
import ExerciseSection, { type ExerciseWidth } from "./ExerciseSection";
import InstructionBlock from "./InstructionBlock";
import { ActivityType } from "@/types/activityTypes";
import AccentHelper from "../blocks/AccentHelper";

type InfoCard = {
  title: string;
  subtitle?: string;
  content?: string;
  items?: string[];
  variant?: "info" | "warning" | "success";
};

interface ExerciseBlockProps {
  number: number;
  title: string;
  subtitle?: string;
  description?: ReactNode;
  activityType?: ActivityType;
  cards?: InfoCard[];
  children: ReactNode;
  width?: ExerciseWidth;
  keywords?: string[];
  showAccentHelper?: boolean;
}

export default function ExerciseBlock({
  number,
  title,
  subtitle,
  description,
  activityType,
  cards,
  children,
  width = "normal",
  showAccentHelper = false,
}: ExerciseBlockProps) {
  return (
    <ExerciseSection width={width}>
      <InstructionBlock
        stampLabel={`EXERCICE ${number}`}
        title={title}
        subtitle={subtitle}
        description={description}
        cards={cards}
        activityType={activityType}
      />
      {showAccentHelper && <AccentHelper />}

      {children}
    </ExerciseSection>
  );
}
