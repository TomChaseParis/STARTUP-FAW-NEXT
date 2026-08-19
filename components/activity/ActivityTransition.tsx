"use client";

import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ActivityIntro from "./ActivityIntro/ActivityIntro";

type ActivityTransitionProps = {
  title: string;
  video: string;
  children: ReactNode;
};

export default function ActivityTransition({
  title,
  video,
  children,
}: ActivityTransitionProps) {
  const [started, setStarted] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!started ? (
        <ActivityIntro
          key="intro"
          title={title}
          video={video}
          onStart={() => setStarted(true)}
        />
      ) : (
        <motion.div
          key="activity"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}