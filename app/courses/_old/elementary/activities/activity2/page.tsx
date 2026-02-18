"use client";

import React from "react";
import Description from "../../../../../../components/courses/activities/elementary-1/activity2/Description";
import Exercice from "../../../../../../components/courses/activities/elementary-1/activity2/Exercice";
import ChatViviane from "@/app/components/ChatViviane";
import Exercice2 from "../../../../../../components/courses/activities/elementary-1/activity2/Exercice2";

const page = () => {
  return (
    <div className="bg-white p-10 pt-[200px]">
      <Description />
      <Exercice />
      <Exercice2 />
      <ChatViviane activityId="beginner_activity_1" />
    </div>
  );
};

export default page;
