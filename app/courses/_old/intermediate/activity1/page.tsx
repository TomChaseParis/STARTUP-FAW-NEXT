import React from "react";
import Description from "../../../../../components/courses/activities/intermediate-1/activity1/Description";
import Exercice from "../../../../../components/courses/activities/intermediate-1/activity1/Exercice";
import Exercice2 from "../../../../../components/courses/activities/intermediate-1/activity1/Exercice2";

const page = () => {
  return (
    <div className="bg-white p-10 pt-[200px]">
      <Description />
      <Exercice />
      <Exercice2 />
    </div>
  );
};

export default page;
