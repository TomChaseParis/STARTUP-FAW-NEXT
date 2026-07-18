"use client";

import ImageWordInputSlider from "@/components/courses/engines/ImageFillGapsSliderEngine";

import { prohibitionExpressionsData } from "../data/prohibitionExpressionsData";

export default function FillInTheBlankExercise() {
  return <ImageWordInputSlider data={prohibitionExpressionsData} />;
}