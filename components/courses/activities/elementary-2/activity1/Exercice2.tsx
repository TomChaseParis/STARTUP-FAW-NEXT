"use client";

import React from "react";
import TransformationTextEngine from "../../../engines/TransformationTextEngine";
import { TransformationIToHerData } from "./TransformationIToHer.data";

const Exercice2: React.FC = () => {
  const { sourceText, expectedText } = TransformationIToHerData;

  return (
    <section className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-3xl pb-16 pt-12">
        <TransformationTextEngine
          sourceText={sourceText}
          expectedText={expectedText}
        />
      </div>
    </section>
  );
};

export default Exercice2;
