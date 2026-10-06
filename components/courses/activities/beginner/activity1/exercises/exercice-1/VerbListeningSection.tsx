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

    audioSrc: "/audios/courses/beginner/activity1/exercice1/etreverbe.mp3",

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

    audioSrc: "/audios/courses/beginner/activity1/exercice1/avoirverbe.mp3",

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

    audioSrc: "/audios/courses/beginner/activity1/exercice1/faireverbe.mp3",

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

    audioSrc: "/audios/courses/beginner/activity1/exercice1/allerverbe.mp3",

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



      \====================================================== */}

      <InstructionBlock
        level="beginner"
        typeLabel="PRONONCIATION"
        stampLabel="EXERCICE 1"
        title="JE SUIS, TU AS, ELLE FAIT, NOUS ALLONS..."
        subtitle={
          <>
            Pour chaque verbe, écoute Marie décliner leur conjugaison au
            présent, puis choisis la bonne forme verbale du verbe pour chaque
            phrase qui t’est proposée.
            <br />
            <span>Exemple : « Qui est étudiant ? Qui travaille ? »</span>
          </>
        }
        activityType="listen-and-speak"
        onStart={handleStartExercise}
        startLabel="Commencer l'exercice"
        started={exerciseStarted}
        showPointAttention={true}
        pointAttention={{
          imageSrc:
            "/images/courses/beginner/activities/brunogalopin/point.png",

          imageAlt: "Point d'attention",

          title: (
            <>
              Tu dois prononcer <strong>toute la phrase</strong> qui t’es
              proposée.
            </>
          ),

          example: (
            <>
              <strong>Exemple : </strong>« Pardon, vous avez l’heure ? »
            </>
          ),
        }}
      >
        {/* ===================================================== */}

        {/* BLOC D'AIDE ÉCOUTE / MICRO */}

        {/* ===================================================== */}

        <div
          className="



      bg-white/65



      relative



      mb-7



      overflow-hidden



      rounded-2xl



      border



      border-white/80



      p-5



      shadow-[0_10px_30px_rgba(15,23,42,0.05)]



      backdrop-blur-sm



      sm:p-6



    "
        >
          {/* Barre verticale décorative */}

          <div
            className="



        absolute



        bottom-0



        left-0



        top-0



        w-1



        bg-amber-400



      "
          />

          <div className="space-y-4 pl-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            {/* ===================================================== */}

            {/* ÉCOUTE */}

            {/* ===================================================== */}

            <div className="flex flex-wrap items-center gap-2">
              <span>Utilise le bouton</span>

              {/* ICÔNE D'ÉCOUTE */}

              <span
                className="



            inline-flex



            h-10



            w-10



            shrink-0



            items-center



            justify-center



            rounded-full



            bg-white



            text-amber-600



            shadow-[0_6px_18px_rgba(15,23,42,0.10)]



          "
                aria-hidden="true"
              >
                <svg
                  xmlns="http\://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5L6 9H3v6h3l5 4V5z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13"
                  />
                </svg>
              </span>

              <span>pour écouter Marie décliner la conjugaison.</span>
            </div>

            {/* ===================================================== */}

            {/* MICRO */}

            {/* ===================================================== */}

            <div className="flex flex-wrap items-center gap-2">
              <span>Appuie sur le bouton</span>

              {/* ICÔNE MICRO */}

              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                className="



            pointer-events-none



            relative



            flex



            h-10



            w-10



            shrink-0



            items-center



            justify-center



            rounded-full



            bg-white



            text-amber-600



            shadow-[0_6px_18px_rgba(15,23,42,0.10)]



          "
              >
                <svg
                  xmlns="http\://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v3m0 0h3m-3 0H9m3-7a4 4 0 004-4V7a4 4 0 10-8 0v3a4 4 0 004 4z"
                  />
                </svg>
              </button>

              <span>avant de prononcer ta phrase.</span>
            </div>
          </div>
        </div>
      </InstructionBlock>

      {/* =====================================================



          EXERCICE



      \====================================================== */}

      {exerciseStarted && (
        <div id="verb-exercise-content" className="scroll-mt-10">
          {/* =================================================



              ÉCOUTE DU VERBE



          \================================================== */}

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



          \================================================== */}

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
