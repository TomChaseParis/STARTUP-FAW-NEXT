import MemoryGame from "@/components/courses/Activity/Memory/MemoryGame";
import React from "react";
import InstructionBlock from "@/components/courses/layout/InstructionBlock";
const Exercice2 = () => {
  return (
    <div>
      <InstructionBlock
        title="🧠 EPISODE 2 — La visite du nouvel appartement"
        subtitle="Jeu du memory : associe l’image au mot correspondant."
      ></InstructionBlock>

      <MemoryGame />
    </div>
  );
};

export default Exercice2;
