"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import VideoExerciseBlock from "@/components/courses/blocks/VideoExerciseBlock";

import Exercice from "./Exercice";
import Exercice2 from "./Exercice2";

import { elementary2Activity1 } from "@/data/courses/activities/elementary-2/activity1/activity1";

export default function Activity() {
  return (
    <ActivityLayout activity={elementary2Activity1}>
      {/* ================= PRÉSENTATION COURS ================= */}
      <LessonBlock
        contentType="activity"
        level="elementary-2"
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
          level="elementary2"
          stampLabel="EXERCICE 1"
          title="Trouvez la question qui correspond à la réponse de Clara"
          activityType="listen"
          description={
            <div
              className="
                flex flex-col items-center gap-4
                rounded-xl border border-slate-300 bg-white
                px-4 py-4
                sm:flex-row sm:items-center sm:gap-5 sm:px-5 sm:py-4
              "
            >
              <div className="flex shrink-0 items-center justify-center">
                <img
                  src="/images/courses/beginner/activities/brunogalopin/point.png"
                  alt="Point d'attention"
                  className="h-20 w-20 object-contain sm:h-28 sm:w-24"
                />
              </div>

              <div className="w-full min-w-0 text-sm leading-relaxed text-slate-800 sm:text-left sm:text-base">
                <p className="mb-2 font-semibold">
                  Rappel : il existe trois façons de poser la même question en
                  français :
                </p>

                <ul className="list-disc space-y-1 pl-5">
                  <li>
                    <strong>Tournure formelle (écrit) :</strong> Où habites-tu ?
                  </li>
                  <li>
                    <strong>Tournure classique (écrit + oral) :</strong> Où
                    est-ce que tu habites ?
                  </li>
                  <li>
                    <strong>Tournure familière (oral) :</strong> Tu habites où ?
                  </li>
                </ul>
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
          level="elementary2"
          stampLabel="EXERCICE 2"
          title="Pose des questions à Clara"
          activityType="click-or-speak"
          description={
            <p className="text-base leading-relaxed text-slate-800">
              Trouve la question correspondante à chaque réponse pour dialoguer
              avec Clara. Tu peux répondre à l’oral (micro) ou à l’écrit.
            </p>
          }
        />

        <Exercice />
      </ExerciseSection>

      {/* ================= EXERCICE 3 ================= */}
      <ExerciseSection>
        <InstructionBlock
          level="elementary2"
          stampLabel="EXERCICE 3"
          title="Transformation JE → ELLE"
          activityType="type"
          description={
            <p className="text-base leading-relaxed text-slate-800">
              Transforme l’intégralité du texte en passant de « je » à « elle »
              en modifiant correctement les pronoms, accords, possessifs et
              verbes pronominaux.
            </p>
          }
        />

        <Exercice2 />
      </ExerciseSection>
    </ActivityLayout>
  );
}
