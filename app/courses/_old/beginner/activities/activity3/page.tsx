import React from "react";
import Description from "../../../../../../components/courses/activities/beginner/activity3/Description";
import Audio from "../../../../../../components/courses/activities/beginner/activity3/Audio";
import Exercice from "../../../../../../components/courses/activities/beginner/activity3/Exercice";
import ExerciceTable from "../../../../../../components/courses/activities/beginner/activity3/ExerciceTable";
import Exercice2 from "../../../../../../components/courses/activities/beginner/activity3/Exercice2";
const page = () => {
  return (
    <div className="bg-white p-10 pt-[200px]">
      <Description />
      <Audio />
      <Exercice />
      <Exercice2 />
    </div>
  );
};

export default page;
