"use client";

import { motion } from "framer-motion";

import ActivityIntroVideo from "./ActivityIntroVideo";
import ActivityStartButton from "./ActivityStartButton";

type ActivityIntroProps = {
  title: string;
  video: string;
  onStart: () => void;
};

export default function ActivityIntro({
  title,
  video,
  onStart,
}: ActivityIntroProps) {
  return (
    <motion.div
      initial={{ x: 0, opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex max-w-5xl flex-col items-center py-12"
    >
      <h1 className="mb-8 text-center text-4xl font-bold text-slate-900">
        {title}
      </h1>

      <ActivityIntroVideo src={video} />

      <div className="mt-10">
        <ActivityStartButton onClick={onStart} />
      </div>
    </motion.div>
  );
}