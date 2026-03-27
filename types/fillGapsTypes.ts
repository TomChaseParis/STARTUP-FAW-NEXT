"use client";

import { ActivityType } from "./activityTypes";

export type GapPart =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "input";
      answer: string;
      hint?: string;
    };

export type GapSentence = {
  id: number;
  parts: GapPart[];
};

export type FillGapsData = {
  title?: string;
  instruction?: string;
  verbs?: string[];
  sentences: GapSentence[];
  activityType?: ActivityType;
};