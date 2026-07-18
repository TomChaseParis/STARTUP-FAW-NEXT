"use client";

import ActivityLayout from "@/components/courses/layout/ActivityLayout";
import LessonBlock from "@/components/courses/layout/LessonBlock";
import ConjugationTableSection from "./exercises/ConjugationTableSection";
import MonsterQuizSection from "./exercises/MonsterQuizSection";
import ClassificationSection from "./exercises/ClassificationSection";

// import ListeningQuizSection from "./exercises/ListeningQuizSection";
// import ListeningFillGapsSection from "./exercises/ListeningFillGapsSection";
// import ConjugationSection from "./exercises/ConjugationSection";
// import SpeakingSection from "./exercises/SpeakingSection";

export default function Activity() {
  return (
    <ActivityLayout>
      {/* ================= INTRODUCTION ================= */}

      <LessonBlock
        badge="Niveau élémentaire 2"
        title="ANGES ET DÉMONS"
        description="Découvre comment utiliser le présent, le passé composé et le futur proche afin de parler d'événements passés, présents et futurs. Tu apprendras également à reconnaître les principaux marqueurs temporels pour situer correctement une action dans le temps."
        videoSrc="/videos/courses/elementary-2/activities/activityX/presentation.mp4"
        poster="/images/courses/elementary-2/activities/activityX/poster.png"
        info={{
          objectifs: [
            "Identifier et pratiquer le présent, le futur proche et le passé composé.",
            "Identifier et utiliser les principaux marqueurs temporels : hier, aujourd'hui, demain, ce soir, etc.",
          ],
          competences: ["Compréhension écrite", "Conjugaison"],
          prerequis: [
            "Conjugaison des verbes au présent, au passé composé et au futur proche.",
            "Les principaux marqueurs temporels.",
          ],
          duree: "25 minutes",
        }}
      />

      {/* ================= EXERCICE 1 ================= */}

      <ConjugationTableSection />

      {/* ================= EXERCICE 2 ================= */}

      {/* <ListeningQuizSection /> */}
      <MonsterQuizSection />


      {/* ================= EXERCICE 3 ================= */}
      <ClassificationSection />

      {/* <ListeningFillGapsSection /> */}

      {/* ================= EXERCICE 4 ================= */}

      {/* <ConjugationSection /> */}

      {/* ================= EXERCICE 5 ================= */}

      {/* <SpeakingSection /> */}
    </ActivityLayout>
  );
}
