"use client";

import { useState } from "react";

import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import VerbListeningExercise from "./VerbListeningExercise";
import VerbSpeakingExercise from "./VerbSpeakingExercise";
import BigFourFinalResults from "../../../zeBigFour/ZeBigFourFinalResults";

import etreSpeakingData from "../../data/verbSpeaking/etre";
import avoirSpeakingData from "../../data/verbSpeaking/avoir";
import faireSpeakingData from "../../data/verbSpeaking/faire";
import allerSpeakingData from "../../data/verbSpeaking/aller";

type VerbKey = "etre" | "avoir" | "faire" | "aller";

type VerbScore = {
  score: number;
  totalQuestions: number;
};

type VerbListeningSectionProps = {
  onNext?: () => void;
};

const verbOrder: VerbKey[] = ["etre", "avoir", "faire", "aller"];

const verbConfig: Record<
  VerbKey,
  {
    title: string;
    forms: string[];
    timings: number[];
    audioSrc: string;
    speakingData: typeof etreSpeakingData;
  }
> = {
  etre: {
    title: "ÊTRE",

    forms: [
      "Je suis",
      "Tu es",
      "Il / Elle / On est",
      "Nous sommes",
      "Vous êtes",
      "Ils / Elles sont",
    ],

    timings: [0, 1.1, 2.4, 4.8, 6.5, 8.1],

    audioSrc: "/audios/courses/beginner/activity1/exercice4/etreverbe.mp3",

    speakingData: etreSpeakingData,
  },

  avoir: {
    title: "AVOIR",

    forms: [
      "J'ai",
      "Tu as",
      "Il / Elle / On a",
      "Nous avons",
      "Vous avez",
      "Ils / Elles ont",
    ],

    timings: [0, 1.1, 2.4, 4.8, 6.5, 8.1],

    audioSrc: "/audios/courses/beginner/activity1/exercice4/avoirverbe.mp3",

    speakingData: avoirSpeakingData,
  },

  faire: {
    title: "FAIRE",

    forms: [
      "Je fais",
      "Tu fais",
      "Il / Elle / On fait",
      "Nous faisons",
      "Vous faites",
      "Ils / Elles font",
    ],

    timings: [0, 1.1, 2.4, 4.8, 6.5, 8.1],

    audioSrc: "/audios/courses/beginner/activity1/exercice4/faireverbe.mp3",

    speakingData: faireSpeakingData,
  },

  aller: {
    title: "ALLER",

    forms: [
      "Je vais",
      "Tu vas",
      "Il / Elle / On va",
      "Nous allons",
      "Vous allez",
      "Ils / Elles vont",
    ],

    timings: [0, 1.1, 2.4, 4.8, 6.5, 8.1],

    audioSrc: "/audios/courses/beginner/activity1/exercice4/allerverbe.mp3",

    speakingData: allerSpeakingData,
  },
};

export default function VerbListeningSection({
  onNext,
}: VerbListeningSectionProps) {
  const [exerciseStarted, setExerciseStarted] = useState(false);

  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);

  const [hasListenedToCurrentVerb, setHasListenedToCurrentVerb] =
    useState(false);

  /*
   * =========================================================
   * SCORES DES 4 VERBES
   * =========================================================
   */

  const [verbScores, setVerbScores] = useState<
    Partial<Record<VerbKey, VerbScore>>
  >({});

  /*
   * =========================================================
   * AFFICHAGE DU RÉSULTAT FINAL
   * =========================================================
   */

  const [showFinalResults, setShowFinalResults] = useState(false);

  const currentVerb = verbOrder[currentVerbIndex];

  const currentVerbConfig = verbConfig[currentVerb];

  const isLastVerb = currentVerbIndex === verbOrder.length - 1;

  /*
   * =========================================================
   * DÉMARRER L'EXERCICE
   * =========================================================
   */

  const handleStartExercise = () => {
    setExerciseStarted(true);

    requestAnimationFrame(() => {
      document.getElementById("verb-exercise-content")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  /*
   * =========================================================
   * PREMIÈRE ÉCOUTE DU VERBE TERMINÉE
   * =========================================================
   */

  const handleFirstListenComplete = () => {
    setHasListenedToCurrentVerb(true);

    requestAnimationFrame(() => {
      document.getElementById("verb-speaking-exercise")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  /*
   * =========================================================
   * ENREGISTRER LE SCORE D'UN VERBE
   * =========================================================
   */

  const handleVerbComplete = (result: VerbScore) => {
    setVerbScores((previous) => ({
      ...previous,
      [currentVerb]: result,
    }));
  };

  /*
   * =========================================================
   * PASSER AU VERBE SUIVANT
   * =========================================================
   */

  const handleNextVerb = () => {
    if (isLastVerb) {
      return;
    }

    /*
     * Le nouveau verbe doit être écouté
     * entièrement avant d'afficher son
     * exercice de prononciation.
     */

    setHasListenedToCurrentVerb(false);

    setCurrentVerbIndex((previous) => previous + 1);

    requestAnimationFrame(() => {
      document.getElementById("verb-exercise-content")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  /*
   * =========================================================
   * FIN DE L'ACTIVITÉ
   * =========================================================
   */

  const handleActivityComplete = (result: VerbScore) => {
    /*
     * ALLER est le dernier verbe.
     *
     * On ajoute son score aux trois précédents.
     */

    const updatedScores = {
      ...verbScores,
      aller: result,
    };

    setVerbScores(updatedScores);

    /*
     * On affiche maintenant le résultat
     * global des quatre verbes.
     */

    setShowFinalResults(true);

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  /*
   * =========================================================
   * RECOMMENCER L'ACTIVITÉ
   * =========================================================
   */

  const handleRestartActivity = () => {
    setExerciseStarted(false);

    setCurrentVerbIndex(0);

    setHasListenedToCurrentVerb(false);

    setVerbScores({});

    setShowFinalResults(false);

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  /*
   * =========================================================
   * RÉSULTAT FINAL
   * =========================================================
   */

  if (showFinalResults) {
    return (
      <BigFourFinalResults
        scores={verbScores}
        onRestart={handleRestartActivity}
        onNext={() => {
          onNext?.();
        }}
      />
    );
  }

  /*
   * =========================================================
   * ACTIVITÉ
   * =========================================================
   */

  return (
    <ExerciseSection width="wide">
      {/* =====================================================
          INSTRUCTION UNIQUE
      ====================================================== */}

      <InstructionBlock
        level="beginner"
        stampLabel="EXERCICE 1"
        title="Écoute et observe comment se conjuge chacun des verbes"
        subtitle="Les verbes essentiels au présent"
        activityType="listen"
        description={
          <>
            Écoute d&apos;abord la conjugaison des verbes{" "}
            <strong>être, avoir, faire et aller</strong>. Puis prononce les
            phrases une par une.
          </>
        }
        onStart={handleStartExercise}
        startLabel="Commencer l'exercice"
        started={exerciseStarted}
      />

      {/* =====================================================
          EXERCICE
      ====================================================== */}

      {exerciseStarted && (
        <div id="verb-exercise-content" className="scroll-mt-10">
          {/* =================================================
              ÉCOUTE DU VERBE
          ================================================== */}

          <div className="mt-10">
            <VerbListeningExercise
              key={currentVerb}
              category={{
                title: currentVerbConfig.title,
                forms: currentVerbConfig.forms,
                timings: currentVerbConfig.timings,
                audioSrc: currentVerbConfig.audioSrc,
              }}
              onFirstListenComplete={handleFirstListenComplete}
            />
          </div>

          {/* =================================================
              PRONONCIATION
          ================================================== */}

          {hasListenedToCurrentVerb && (
            <div id="verb-speaking-exercise" className="mt-12 scroll-mt-10">
              <div className="mx-auto w-full max-w-5xl px-6">
                <VerbSpeakingExercise
                  key={currentVerb}
                  data={currentVerbConfig.speakingData}
                  verbTitle={currentVerbConfig.title}
                  onComplete={
                    isLastVerb ? handleActivityComplete : handleVerbComplete
                  }
                  onNextVerb={isLastVerb ? undefined : handleNextVerb}
                  nextVerbLabel={
                    isLastVerb
                      ? undefined
                      : `Passer au verbe ${
                          verbOrder[currentVerbIndex + 1] === "avoir"
                            ? "AVOIR"
                            : verbOrder[currentVerbIndex + 1] === "faire"
                            ? "FAIRE"
                            : "ALLER"
                        } →`
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </ExerciseSection>
  );
}
