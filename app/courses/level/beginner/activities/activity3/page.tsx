import React from "react";
import Description from "./Description";
import Audio from "./Audio";
import Exercice from "./Exercice";
import ExerciceTable from "./ExerciceTable";
import Exercice2 from "./Exercice2";
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
