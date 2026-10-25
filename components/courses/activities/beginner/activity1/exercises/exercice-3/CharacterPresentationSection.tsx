
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ActivityResults from "@/components/courses/common/ActivityResults";
import ClickAndSpeakInstruction from "@/components/courses/layout/ClickAndSpeakInstruction";
import TeacherComicBubble from "@/components/courses/common/teacher/TeacherComicBubble";
import type { ActivityResult } from "@/core/activity/models/ActivityResult";
import CharacterPresentationExercise from "./CharacterPresentationExercise";

const exampleSentences = [
  { prompt: "Avoir vingt ans", spoken: "J’ai vingt ans.", start: 0, end: 0.76 },
  { prompt: "Être jeune", spoken: "Je suis jeune.", start: 2.25, end: 3.15 },
  { prompt: "Aller à l’université", spoken: "Je vais à l’université.", start: 4.61, end: 6.15 },
  { prompt: "Être étudiant", spoken: "Je suis étudiant.", start: 7.76, end: 8.92 },
  { prompt: "Faire des études", spoken: "Je fais des études.", start: 10.45, end: 11.59 },
  { prompt: "Avoir des lunettes", spoken: "J’ai des lunettes.", start: 13.15, end: 13.97 },
  { prompt: "Être un nerd", spoken: "Je suis un nerd.", start: 15.7, end: 16.84 },
  {
    prompt: "Avoir un seul ami : mon professeur de chimie.",
    spoken: <>J’ai un seul ami : mon professeur<br />de chimie.</>,
    start: 18.49,
    end: 21.94,
  },
];

type CharacterPresentationSectionProps = {
  onComplete?: (result: ActivityResult) => void;
  onFinishActivity?: () => void;
};

export default function CharacterPresentationSection({
  onComplete,
  onFinishActivity,
}: CharacterPresentationSectionProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingExample, setIsPlayingExample] = useState(false);
  const [currentExampleSentenceIndex, setCurrentExampleSentenceIndex] = useState(0);
  const [exampleBubbleDismissed, setExampleBubbleDismissed] = useState(false);
  const [showExamplePhoto, setShowExamplePhoto] = useState(false);
  const [showExampleBubble, setShowExampleBubble] = useState(false);

  /*
   * Étapes du parcours :
   * 1 = instruction
   * 2 = exemple interactif
   * 3 = exercice réel
   */
  const [exerciseStep, setExerciseStep] = useState<1 | 2 | 3>(1);

  /*
   * RÉSULTAT
   */
  const [result, setResult] = useState<ActivityResult | null>(null);

  /*
   * CLÉ DE L'EXERCICE
   */
  const [exerciseKey, setExerciseKey] = useState(0);

  /*
   * APPARITION DE MARIE ET DE SA BULLE
   *
   * L'aide apparaît une seule fois, au démarrage de l'exemple.
   * Le changement de phrase ne réinitialise pas cette aide.
   */
  useEffect(() => {
    if (exerciseStep < 2 || exampleBubbleDismissed) return;

    setShowExamplePhoto(false);
    setShowExampleBubble(false);

    const photoTimeout = window.setTimeout(() => {
      setShowExamplePhoto(true);
    }, 500);

    const bubbleTimeout = window.setTimeout(() => {
      setShowExampleBubble(true);
    }, 1200);

    return () => {
      window.clearTimeout(photoTimeout);
      window.clearTimeout(bubbleTimeout);
    };
  }, [exerciseStep, exampleBubbleDismissed]);

  /*
   * DÉBUT DE L'EXERCICE
   */
  const handleStartExercise = () => {
    setExerciseStep(2);

    requestAnimationFrame(() => {
      document
        .getElementById("character-presentation-example")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };

  /*
   * LECTURE DE L'EXEMPLE
   */
  const handlePlayExample = () => {
    // La bulle et la photo disparaissent dès le premier clic.
    // Elles ne réapparaîtront pas au changement de phrase.
    setExampleBubbleDismissed(true);
    setShowExamplePhoto(false);
    setShowExampleBubble(false);

    if (audioRef.current && !audioRef.current.paused) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    const audio = new Audio(
      "/audios/courses/beginner/activity1/exercice3/exemple/exempleaudio.mp3",
    );

    audioRef.current = audio;
    setCurrentExampleSentenceIndex(0);
    setIsPlayingExample(true);

    audio.ontimeupdate = () => {
      const sentenceIndex = exampleSentences.findIndex(
        (sentence) =>
          audio.currentTime >= sentence.start &&
          audio.currentTime < sentence.end,
      );

      if (sentenceIndex !== -1) {
        setCurrentExampleSentenceIndex(sentenceIndex);
      }
    };

    audio.onended = () => {
      setIsPlayingExample(false);
      setCurrentExampleSentenceIndex(exampleSentences.length - 1);
      audioRef.current = null;
      setExerciseStep(3);

      requestAnimationFrame(() => {
        setTimeout(() => {
          document
            .getElementById("click-and-speak-exercise")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }, 50);
      });
    };

    audio.onerror = () => {
      setIsPlayingExample(false);
      audioRef.current = null;
    };

    audio.play().catch(() => {
      setIsPlayingExample(false);
      audioRef.current = null;
    });
  };

  const currentExampleSentence =
    exampleSentences[currentExampleSentenceIndex];

  /*
   * EXERCICE TERMINÉ
   */
  const handleExerciseComplete = (
    exerciseResult: ActivityResult,
    handleContainerComplete: (
      sessionResult: ActivityResult["session"],
    ) => void,
  ) => {
    setResult(exerciseResult);

    handleContainerComplete(exerciseResult.session);

    onComplete?.(exerciseResult);
  };

  /*
   * RECOMMENCER
   */
  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setIsPlayingExample(false);
    setResult(null);
    setExerciseKey((previous) => previous + 1);
    setExerciseStep(3);

    requestAnimationFrame(() => {
      setTimeout(() => {
        document
          .getElementById("click-and-speak-exercise")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    });
  };

  /*
   * AFFICHAGE
   */
  return (
    <ExerciseContainer
      key={exerciseKey}
      exerciseId="exercise-3"
    >
      {({ onComplete }) => {
        /*
         * RÉSULTAT FINAL
         */
        if (result) {
          return (
            <ActivityResults
              result={result}
              onRestart={handleRestart}
              onNext={() => {
                onFinishActivity?.();
              }}
              isLastExercise={true}
              detailedReport={
                <section className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      Détail des réponses
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Voici le détail de tes réponses phrase par phrase.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {result.session.history.map((item, index) => (
                      <div
                        key={item.questionId}
                        className={`
                          overflow-hidden rounded-2xl border
                          ${
                            item.isCorrect
                              ? "border-green-200 bg-green-50/60"
                              : "border-red-200 bg-red-50/60"
                          }
                        `}
                      >
                        <div className="flex items-center justify-between gap-4 border-b border-slate-200/70 bg-white/70 px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`
                                flex h-9 w-9 shrink-0 items-center justify-center
                                rounded-full text-sm font-black
                                ${
                                  item.isCorrect
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }
                              `}
                            >
                              {index + 1}
                            </div>

                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                Phrase {index + 1}
                              </p>

                              <p className="text-xs text-slate-500">
                                {item.question}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`
                              rounded-full px-3 py-1 text-xs font-bold
                              ${
                                item.isCorrect
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }
                            `}
                          >
                            {item.isCorrect ? "✓ Correct" : "✕ Incorrect"}
                          </span>
                        </div>

                        <div className="space-y-4 px-5 py-5">
                          <div>
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                              Ta réponse
                            </p>

                            <p
                              className={`
                                text-base font-bold
                                ${
                                  item.isCorrect
                                    ? "text-green-700"
                                    : "text-red-600"
                                }
                              `}
                            >
                              {item.selectedAnswer || "Aucune réponse"}
                            </p>
                          </div>

                          <div className="rounded-xl border border-green-200 bg-white px-4 py-3">
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-green-600">
                              Réponse attendue
                            </p>

                            <p className="font-extrabold text-green-700">
                              {item.correctAnswer}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              }
            />
          );
        }

        /*
         * INSTRUCTION ET EXERCICE
         */
        return (
          <div className="w-full min-w-0">
            {/* INSTRUCTION CLICK AND SPEAK */}
            <div
              id="character-presentation-instruction"
              className="scroll-mt-10"
            >
              <ClickAndSpeakInstruction
                category="EXERCICE 3 · CONJUGAISON"
                title="JE / TU / ELLE / NOUS / VOUS / ILS"
                description="Après avoir écouté l’exemple, transforme chaque groupe de mots en une phrase correctement conjuguée selon le pronom demandé."
                example="Exemple : « Ils ont un petit chien. »"
                steps={[
                  {
                    title: "Écoute",
                    description:
                      "Utilise le bouton audio pour écouter l’exemple avec le pronom « Je ».",
                    icon: "sound",
                  },
                  {
                    title: "Prononce",
                    description:
                      "Appuie sur le bouton microphone avant de prononcer toute la phrase.",
                    icon: "mic",
                  },
                ]}
                onStart={handleStartExercise}
                started={exerciseStep >= 2}
              />
            </div>

            {/* TRANSITION VERS L'EXEMPLE */}
            {exerciseStep >= 2 && (
              <div
                className="relative z-10 mx-auto flex h-[72px] w-full max-w-[1380px] items-center justify-center"
                aria-label="Étape 2"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-[#F4B323]"
                />

                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F2A900] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
                  1
                </span>
              </div>
            )}

            {/* EXEMPLE INTERACTIF */}
            {exerciseStep >= 2 && (
              <div
                id="character-presentation-example"
                className="mx-auto mt-0 w-full max-w-[1380px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-center gap-4 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50 px-5 py-4 sm:px-7">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F2A900] text-lg font-extrabold text-white shadow-sm">
                    1
                  </span>

                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-800">
                      EXEMPLE
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Observe comment transformer chaque expression avec le bon pronom.
                    </p>
                  </div>
                </div>

                <div className="grid h-auto overflow-hidden bg-white md:min-h-[360px] md:grid-cols-[1.15fr_1fr]">
                  {/* IMAGE DU PERSONNAGE */}
                  <div className="relative h-[260px] w-full md:h-[360px]">
                    <Image
                      src="/images/courses/beginner/activities/activity1/exercice4/p1.png"
                      alt="Exemple de personnage"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* CONTENU DE L'EXEMPLE */}
                  <div className="relative flex flex-col bg-gradient-to-br from-slate-50 to-white p-6 sm:p-8">
                    <div className="flex h-full w-full flex-col items-center justify-center">
                      <div className="mb-6 w-full text-center">
                        <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                          Pronom
                        </p>

                        <h2 className="text-5xl font-extrabold tracking-wide text-slate-900">
                          JE
                        </h2>

                        <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#E09F00]" />
                      </div>

                      <div className="mb-7 flex min-h-[120px] w-full flex-col items-center justify-center rounded-2xl border-2 border-amber-200 bg-white px-5 py-5 text-center shadow-sm">
                        <p
                          key={`prompt-${currentExampleSentenceIndex}`}
                          className="text-2xl font-extrabold leading-tight text-slate-900"
                        >
                          {currentExampleSentence.prompt}
                        </p>

                        <div
                          key={`spoken-${currentExampleSentenceIndex}`}
                          className="mt-3 flex items-center justify-center gap-2"
                        >
                          <span
                            className="text-xl font-extrabold text-green-500"
                            aria-hidden="true"
                          >
                            →
                          </span>

                          <p className="text-lg font-bold leading-tight text-green-600">
                            {currentExampleSentence.spoken}
                          </p>
                        </div>
                      </div>

                      {/* BOUTON AUDIO ET BULLE À DROITE */}
                      <div className="flex w-full flex-col items-center">
                        <div className="relative flex min-h-[72px] w-full items-center justify-center">
                          <button
                            type="button"
                            onClick={handlePlayExample}
                            disabled={isPlayingExample}
                            aria-label={
                              isPlayingExample
                                ? "Lecture de l’exemple en cours"
                                : "Écouter l’exemple"
                            }
                            aria-busy={isPlayingExample}
                            className={`
                              group/audio relative z-10 flex h-14 w-14 shrink-0
                              items-center justify-center rounded-full border
                              transition-all duration-300
                              ${
                                isPlayingExample
                                  ? "cursor-not-allowed border-amber-200 bg-amber-50 text-amber-600"
                                  : !exampleBubbleDismissed
                                    ? "animate-[audioAttention_1.4s_ease-in-out_infinite] border-amber-300 bg-amber-50 text-amber-500 hover:border-amber-400 hover:bg-amber-100"
                                    : "border-amber-200 bg-amber-50 text-amber-500 hover:border-amber-400 hover:bg-amber-100"
                              }
                            `}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              className={`relative z-10 h-6 w-6 transition-transform duration-300 ${
                                isPlayingExample
                                  ? "scale-90 opacity-70"
                                  : "ml-0.5 group-hover/audio:scale-110"
                              }`}
                            >
                              <path d="M8.5 5.2a1 1 0 0 1 1.54-.84l8.4 6.8a1.08 1.08 0 0 1 0 1.68l-8.4 6.8A1 1 0 0 1 8.5 18.8V5.2Z" />
                            </svg>
                          </button>

                          {!exampleBubbleDismissed && (
                            <div
                              className="pointer-events-none absolute left-[calc(50%+36px)] top-1/2 z-20 w-[min(58%,280px)] -translate-y-1/2 sm:left-[calc(50%+42px)]"
                              aria-hidden={!showExamplePhoto || !showExampleBubble}
                            >
                              <div
                                className={
                                  showExamplePhoto && showExampleBubble
                                    ? "visible"
                                    : "invisible"
                                }
                              >
                                <TeacherComicBubble
                                  className="w-full items-center gap-2"
                                  message="Clique ici pour écouter l’exemple"
                                  showPhoto={showExamplePhoto && !exampleBubbleDismissed}
                                  showBubble={showExampleBubble && !exampleBubbleDismissed}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <p className="mt-3 text-xs font-medium text-slate-400">
                          Écoute attentivement chaque phrase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TRANSITION VERS L'EXERCICE */}
            {exerciseStep === 3 && (
              <div
                className="relative z-10 mx-auto flex h-[72px] w-full max-w-[1380px] items-center justify-center"
                aria-label="Étape 3"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-[#F4B323]"
                />

                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F2A900] text-base font-extrabold text-white shadow-[0_2px_8px_rgba(224,159,0,0.25)] ring-1 ring-[#FFD875]">
                  2
                </span>
              </div>
            )}

            {/* EXERCICE INTERACTIF */}
            {exerciseStep === 3 && (
              <div id="click-and-speak-exercise">
                <CharacterPresentationExercise
                  onComplete={(exerciseResult) => {
                    handleExerciseComplete(
                      exerciseResult,
                      onComplete,
                    );
                  }}
                />
              </div>
            )}
          </div>
        );
      }}
    </ExerciseContainer>
  );
}
