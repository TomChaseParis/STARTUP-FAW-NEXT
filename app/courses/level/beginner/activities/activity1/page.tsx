"use client";

import React from "react";
import Description from "./Description";
import Exercice from "./Exercice";
import ChatViviane from "@/app/components/ChatViviane";

const page = () => {
  return (
    <div className="bg-white p-10 pt-[200px]">
      <Description />
      <Exercice />
      <ChatViviane activityId="beginner_activity_1" />
    </div>
  );
};

export default page;
