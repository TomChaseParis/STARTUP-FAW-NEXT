"use client";

import { ActivityType } from "./activityTypes";

/* ================= PART ================= */

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

/* ================= SENTENCE ================= */

export type GapSentence = {
  id: number;

  parts: GapPart[];

  /* UI / META */
  teacherImage?: string;
};

/* ================= DATA ================= */

export type FillGapsData = {
  title?: string;
  instruction?: string;
  verbs?: string[];

  sentences: GapSentence[];

  activityType?: ActivityType;
};