"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import VideoExerciseBlock from "@/components/courses/blocks/VideoExerciseBlock";

import Exercice from "./Exercice";
import Exercice2 from "./Exercice2";

export default function Activity() {
  return (
    <ActivityLayout>
      {/* ================= PRÉSENTATION COURS ================= */}
      <LessonBlock
        badge="Niveau Élémentaire 2"
        title="L’emploi du temps mouvementé de Clara"
        description="Dans cette activité, vous allez découvrir la journée quotidienne de Clara. Vous réviserez les heures, les moments de la journée, les verbes pronominaux et la conjugaison au présent."
        videoSrc="/videos/courses/elementary-2/activity1/presentation.mp4"
        poster="/images/courses/elementary2/activity1/posterirene.png"
        info={{
          objectifs: [
            "Comprendre une journée type",
            "Réviser les verbes pronominaux",
            "Formuler des questions",
          ],
          competences: [
            "Compréhension orale",
            "Expression écrite",
            "Transformation grammaticale",
          ],
          prerequis: [
            "Présent de l’indicatif",
            "Questions interrogatives",
            "Pronoms sujets",
          ],
          duree: "35 minutes",
        }}
      />

      {/* ================= EXERCICE 1 ================= */}
      <ExerciseSection>
        <InstructionBlock
          stampLabel="EXERCICE 1"
          title="La journée quotidienne de Clara"
          activityType="listen"
          description={
            <div className="space-y-5 text-black">
              <div
                className="
                  rounded-2xl
                  border border-amber-200
                  bg-gradient-to-br from-amber-50 via-white to-amber-50
                  p-5
                  shadow-sm
                "
              >
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className="
                      flex h-12 w-12 shrink-0 items-center justify-center
                      rounded-2xl
                      bg-gradient-to-br from-amber-300 to-yellow-400
                      shadow-[0_10px_20px_rgba(245,158,11,0.25)]
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 3h6v4H9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 16h4"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                      Consigne
                    </p>

                    <p className="text-sm text-slate-500">
                      Observe attentivement avant de répondre
                    </p>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-slate-800">
                  Regarde la vidéo sur la journée de Clara, puis réponds aux
                  questions qui suivent.
                </p>
              </div>
            </div>
          }
        />

        <VideoExerciseBlock
          videoSrc="/videos/clara-video.mp4"
          poster="/images/courses/clarapic.png"
        />

        <Exercice />
      </ExerciseSection>

      {/* ================= EXERCICE 2 ================= */}
      <ExerciseSection>
        <InstructionBlock
          stampLabel="EXERCICE 2"
          title="Posez des questions à Clara"
          activityType="click-or-speak"
          description={
            <div className="space-y-5 text-black">
              <div
                className="
                  rounded-2xl
                  border border-amber-200
                  bg-gradient-to-br from-amber-50 via-white to-amber-50
                  p-5
                  shadow-sm
                "
              >
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className="
                      flex h-12 w-12 shrink-0 items-center justify-center
                      rounded-2xl
                      bg-gradient-to-br from-amber-300 to-yellow-400
                      shadow-[0_10px_20px_rgba(245,158,11,0.25)]
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 3h6v4H9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 16h4"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                      Consigne
                    </p>

                    <p className="text-sm text-slate-500">
                      Réfléchis avant de répondre
                    </p>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-slate-800">
                  Trouve la question correspondante à chaque réponse pour
                  dialoguer avec Clara. Tu peux répondre à l’oral (micro) ou à
                  l’écrit.
                </p>
              </div>
            </div>
          }
        />

        <Exercice />
      </ExerciseSection>

      {/* ================= EXERCICE 3 ================= */}
      <ExerciseSection>
        <InstructionBlock
          stampLabel="EXERCICE 3"
          title="Transformation JE → ELLE"
          activityType="type"
          description={
            <div className="space-y-5 text-black">
              <div
                className="
                  rounded-2xl
                  border border-amber-200
                  bg-gradient-to-br from-amber-50 via-white to-amber-50
                  p-5
                  shadow-sm
                "
              >
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className="
                      flex h-12 w-12 shrink-0 items-center justify-center
                      rounded-2xl
                      bg-gradient-to-br from-amber-300 to-yellow-400
                      shadow-[0_10px_20px_rgba(245,158,11,0.25)]
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 3h6v4H9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 16h4"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                      Consigne
                    </p>

                    <p className="text-sm text-slate-500">
                      Applique toutes les transformations nécessaires
                    </p>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-slate-800">
                  Transforme l’intégralité du texte en passant de « je » à
                  « elle » en modifiant correctement les pronoms, accords,
                  possessifs et verbes pronominaux.
                </p>
              </div>
            </div>
          }
        />

        <Exercice2 />
      </ExerciseSection>
    </ActivityLayout>
  );
}