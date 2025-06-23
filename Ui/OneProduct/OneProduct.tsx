import React from "react";
import Image from "next/image";
import SoldRating from "../SoldRating/SoldRating";
import "./OneProduct.css";

const OneProduct = () => {
  return (
    <div className="one-product-card flex flex-col gap-1 ">
      <div className="img-container">
        <Image
          src={`/img-product-now-1.png`}
          alt=""
          fill
          className="!relative"
        />
      </div>
      <div className="product-name">Whistle</div>
      <div className="price-container flex items-center gap-4">
        <div className="sale_price">$160</div>
        <div className="price-before-discount">$190</div>
      </div>
      <div className="main-description">only text max 150 character...</div>
      <SoldRating
        className="justify-start"
        soldText="1,238 Sold"
        ratingText="4.5"
      />
    </div>
  );
};

export default OneProduct;
