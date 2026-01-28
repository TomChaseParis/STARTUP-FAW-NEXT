import React from "react";
import Description from "./Description";
import Audio from "./Audio";
import Exercice from "./Exercice";
import ExerciceTable from "./ExerciceTable";
const page = () => {
  return (
    <div className="bg-white p-10 pt-[200px]">
      <Description />
      <Audio />
      <Exercice />
      <ExerciceTable />
    </div>
  );
};

export default page;
