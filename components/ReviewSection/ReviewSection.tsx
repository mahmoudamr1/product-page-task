import FiltreComments from "@/Ui/FiltreComments/FiltreComments";
import FiltreLists from "@/Ui/FiltreLists/FiltreLists";
import ProductsSectionTitle from "@/Ui/ProductsSectionTitle/ProductsSectionTitle";
import SummaryComments from "@/Ui/SummaryComments/SummaryComments";
import React from "react";

const ReviewSection = () => {
  return (
    <section
      id="ReviewSection"
      className="  overflow-hidden px-4 lg:px-7 max-w-full"
    >
      <div className="container flex flex-col gap-6 xl:gap-10 max-w-full md:max-w-screen-xl mx-auto ">
        <ProductsSectionTitle title="Product Reviews" actionText="" />
        <SummaryComments />
        <FiltreLists />
      </div>
    </section>
  );
};

export default ReviewSection;
