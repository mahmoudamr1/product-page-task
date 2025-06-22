import React from "react";
import "./RightProduct.css";

const RightProduct = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 lg:gap-5 ">
        <div className="marka">John Lewis ANYDAY</div>
        <div className="product-name">Long Sleeve Overshirt, Khaki, 6</div>
        <div className="flex justify-between gap-4 w-full">
          <div className="flex items-center justify-center gap-3">
            <div className="before-discount-price">£40.00</div>
            <div className="after-discount-price">£28.00</div>
          </div>
          <div className="flex items-center justify-center lg:gap-3 gap-2">
            <div className="numper-sold">1,238 Sold</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="7"
              viewBox="0 0 6 7"
              fill="none"
            >
              <circle cx="3" cy="3.02905" r="3" fill="#E0E0E0" />
            </svg>
            <div className="after-discount-price flex justify-center items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M9.04894 0.956105C9.3483 0.0347939 10.6517 0.0347927 10.9511 0.956103L12.4697 5.62987C12.6035 6.04189 12.9875 6.32085 13.4207 6.32085H18.335C19.3037 6.32085 19.7065 7.56046 18.9228 8.12987L14.947 11.0184C14.5966 11.2731 14.4499 11.7244 14.5838 12.1364L16.1024 16.8102C16.4017 17.7315 15.3472 18.4976 14.5635 17.9282L10.5878 15.0397C10.2373 14.7851 9.7627 14.7851 9.41221 15.0397L5.43648 17.9282C4.65276 18.4976 3.59828 17.7315 3.89763 16.8102L5.41623 12.1364C5.55011 11.7244 5.40345 11.2731 5.05296 11.0184L1.07722 8.12987C0.293507 7.56046 0.696283 6.32085 1.66501 6.32085H6.57929C7.01252 6.32085 7.39647 6.04189 7.53035 5.62987L9.04894 0.956105Z"
                  fill="#FFA439"
                />
              </svg>

              <div className="rating">4.5</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full py-2">
          <div className="dashed-line"></div>
        </div>
        <div className="flex flex-col gap-2 text-start ">
          <div className="desc-txt">Description:</div>
          <div className="product-description">
            Boba etiam ut bulla tea est potus dilectus singulari compositione
            saporum et textuum, quae in Taiwan annis 1980 orta sunt. Boba refert
            ad pilas masticas tapiocas in fundo potus inventas, quae typice
            lacte tea nigro sapiuntur. Boba phaenomenon. See More....
          </div>
        </div>
        <div className="main-color flex flex-col gap-3">
          <div className="flex gap-2 text-start">
            <div className="clr-txt">Color :</div>
            <div className="product-color">Royal Brown</div>
          </div>
          <div className="flex gap-3 flex-wrap ">
            <div
              className="container-color color-slected "
              style={{
                border: "1px solid #EBEBEB",
              }}
            >
              <div
                className="color-variant"
                style={{
                  backgroundColor: "#EBEBEB",
                }}
              ></div>
            </div>
            <div className="container-color  ">
              <div
                className="color-variant"
                style={{
                  backgroundColor: "#534029",
                }}
              ></div>
            </div>
            <div className="container-color  ">
              <div
                className="color-variant"
                style={{
                  backgroundColor: "#3A6A90",
                }}
              ></div>
            </div>
            <div className="container-color  ">
              <div
                className="color-variant"
                style={{
                  backgroundColor: "#11171D",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="main-color flex flex-col gap-3">
          <div className="flex gap-2 text-start">
            <div className="clr-txt">Size :</div>
            <div className="product-Size">8</div>
          </div>
          <div className="flex gap-3 flex-wrap ">
            <div className="Size-variant Size-slected">6</div>
            <div className="Size-variant">8</div>
            <div className="Size-variant">10</div>
            <div className="Size-variant">14</div>
          </div>
        </div>
        <div className="main-color gap-3 grid grid-cols-1 lg:grid-cols-2 ">
          <button className="add-to-card flex items-center justify-center">
            Add To Cart
          </button>
          <button className="Checkout-Now flex items-center justify-center">
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightProduct;

// <div className="space-y-4 col-span-1 ">
//           <h1 className="text-2xl font-bold">{activeProduct.name}</h1>
//           <div
//             className="prose"
//             dangerouslySetInnerHTML={{ __html: activeProduct.description }}
//           />
//           <p className="text-xl font-semibold">
//             السعر: {activeProduct.sale_price || activeProduct.price} ج.م
//           </p>
//           <button className="px-6 py-2 bg-green-600 text-white rounded">
//             {activeProduct.buy_now_text}
//           </button>
//         </div>
