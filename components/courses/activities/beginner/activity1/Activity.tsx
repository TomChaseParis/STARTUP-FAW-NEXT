"use client";

import { useState } from "react";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";

import CharacterPresentationSection from "./exercises/CharacterPresentationSection";

import { moduleCategories } from "@/data/courses/modules/ModuleCategories";
import { bigFourActivity } from "@/data/courses/activities/bigFour";

import ActivityFlow from "@/core/navigation/ActivityFlow";
import { ActivityNavigationProvider } from "@/core/navigation/ActivityNavigationProvider";
import VerbConjugationSection from "./exercises/exercice-1/VerbConjugationSection";
import VerbListeningSection from "./exercises/exercice-1/VerbListeningSection";

export default function Activity() {
  const [started, setStarted] = useState(false);

  return (
    <ActivityLayout activity={bigFourActivity}>
      {/* ================= HEADER + VIDEO ================= */}

      <LessonBlock
        level="beginner"
        badge={moduleCategories.grammar.label}
        title="ZE BIG FOUR : Être – Avoir – Faire – Aller"
        description="Regarde la vidéo puis fais les exercices."
        videoSrc="/videos/courses/beginner/activities/activity1/presentation.mp4"
        poster="/images/courses/beginner/activities/activity1/postermarie.png"
        info={{
          objectifs: [
            "Conjuguer des verbes de base pour faire des phrases simples",
          ],
          competences: [
            "Compréhension écrite",
            "Transformation grammaticale",
            "Phonie / graphie",
            "Prononciation",
          ],
          prerequis: [
            "Les verbes « être », « avoir », « aller » et « faire » au présent",
            "Les pronoms sujets : « Je », « Tu », « Il », « Elle », « On », « Nous », « Vous », « Ils » et « Elles »",
          ],
          duree: "30 minutes",
        }}
      />

      {/* ================= LANCEMENT DE L'ACTIVITÉ ================= */}

      {!started && (
        <div className="container flex justify-center">
          <button
            type="button"
            onClick={() => {
              setStarted(true);

              requestAnimationFrame(() => {
                document
                  .getElementById("activity-1-exercises")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              });
            }}
            className="
              group
              relative
              inline-flex
              items-center
              gap-4
              overflow-hidden
              rounded-2xl
              border
              border-white/80
              bg-white
              px-8
              py-4
              text-base
              font-bold
              text-slate-900
              shadow-[0_15px_40px_rgba(15,23,42,0.12)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_20px_50px_rgba(15,23,42,0.17)]
              active:translate-y-0
            "
          >
            <span
              className="
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-amber-300/30
                blur-2xl
                transition-opacity
                duration-300
                group-hover:opacity-80
              "
            />

            <span className="relative z-10">
              Commencer l&apos;activité
            </span>

            <span
              className="
                relative
                z-10
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-amber-300
                text-lg
                font-bold
                text-slate-900
                shadow-sm
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </button>
        </div>
      )}

      {/* ================= EXERCICES ================= */}

      {started && (
        <div id="activity-1-exercises" className="scroll-mt-10">
          <ActivityNavigationProvider
            totalExercises={bigFourActivity.exercises.length}
          >
            <ActivityFlow>
              {/* EXERCICE 1 */}
              <VerbListeningSection />

              {/* EXERCICE 2 */}
              <VerbConjugationSection />

              {/* EXERCICE 3 */}
              <CharacterPresentationSection />
            </ActivityFlow>
          </ActivityNavigationProvider>
        </div>
      )}
    </ActivityLayout>
  );
}