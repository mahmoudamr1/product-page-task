import React from "react";
import FiltreComments from "../FiltreComments/FiltreComments";
import ReviewLists from "../ReviewLists/ReviewLists";

const FiltreAndLists = () => {
  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
      <FiltreComments className="col-span-12 lg:col-span-4" />
      <ReviewLists className="col-span-12 lg:col-span-8" />
    </div>
  );
};

export default FiltreAndLists;
