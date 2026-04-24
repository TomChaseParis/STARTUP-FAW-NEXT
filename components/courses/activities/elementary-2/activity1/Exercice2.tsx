"use client";

import React from "react";
import TransformationTextEngine from "../../../blocks/TransformationTextEngine";
import { TransformationIToHerData } from "./TransformationIToHer.data";

const Exercice2: React.FC = () => {
  const { sourceText, expectedText } = TransformationIToHerData;

  return (
    <section className="bg-white border-t border-black/10">
      <div className="max-w-3xl mx-auto pt-12 pb-16">

        <TransformationTextEngine
          sourceText={sourceText}
          expectedText={expectedText}
        />

      </div>
    </section>
  );
};

export default Exercice2;