import React from "react";
import "./ProductSection.css";
import ProductsSectionTitle from "@/Ui/ProductsSectionTitle/ProductsSectionTitle";
import Image from "next/image";
import SoldRating from "@/Ui/SoldRating/SoldRating";
import OneProduct from "@/Ui/OneProduct/OneProduct";

const ProductSection = () => {
  return (
    <section
      id="ProductSection"
      className="  overflow-hidden px-4 lg:px-7 max-w-full"
    >
      <div className="container flex flex-col gap-6 xl:gap-10 max-w-full md:max-w-screen-xl mx-auto ">
        <ProductsSectionTitle title="Related Product" actionText="View All" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-8">
          <OneProduct />
          <OneProduct />
          <OneProduct />
          <OneProduct />
          <OneProduct />
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
