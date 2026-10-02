"use client";

import { useState } from "react";

import ExerciseContainer from "@/components/activity/ExerciseContainer";
import ExerciseSection from "@/components/courses/layout/ExerciseSection";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";

import LeisureConjugationExercise from "./LeisureConjugationExercise";

export default function FillInTheBlankSection() {
  const [started, setStarted] = useState(false);

  return (
    <ExerciseContainer exerciseId="exercise-1">
      {({ onComplete }) => (
        <ExerciseSection>
          <InstructionBlock
            level="elementary1"
            stampLabel="EXERCICE 1"
            typeLabel="COMPRÉHENSION ORALE"
            title="Complète les phrases
            "
            subtitle="Écoute une première fois le dialogue ci-dessus, puis complète les phrases."
            activityType="listen-type"
            audioSrc="/audios/courses/elementary/activities/loisirs.mp3"
            audioImage="/images/courses/audioBlock/beginner/am.png"
            audioBadge="Dialogue"
            description={
              <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                {/* ===================================================== */}
                {/* UTILISATION DU LECTEUR AUDIO */}
                {/* ===================================================== */}

                {/* ===================================================== */}
                {/* RECONNAISSANCE VOCALE */}
                {/* ===================================================== */}

                <p>
                  Pour aider l&apos;outil de reconnaissance vocale à bien
                  identifier ta réponse, pense à dire la lettre (A, B ou C) qui
                  correspond à ta réponse, suivie de la réponse en entier.
                  Exemple :
                  <span className="font-semibold text-slate-900">
                    {" « A : ingénieur »."}
                  </span>
                </p>
              </div>
            }
            onStart={() => {
              setStarted(true);
            }}
            started={started}
          />

          {/* ========================================================= */}
          {/* EXERCICE */}
          {/* ========================================================= */}

          {started && (
            <div id="exercise-1-qcm" className="scroll-mt-10">
              <LeisureConjugationExercise />
            </div>
          )}
        </ExerciseSection>
      )}
    </ExerciseContainer>
  );
}
