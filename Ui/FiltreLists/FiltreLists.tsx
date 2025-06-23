import React from "react";
import FiltreComments from "../FiltreComments/FiltreComments";
import ReviewLists from "../ReviewLists/ReviewLists";

const FiltreLists = () => {
  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <FiltreComments className="col-span-12 lg:col-span-4" />
      <ReviewLists className="col-span-12 lg:col-span-8" />
    </div>
  );
};

export default FiltreLists;
