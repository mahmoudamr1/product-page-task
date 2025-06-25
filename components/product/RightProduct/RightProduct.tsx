// components/product/RightProduct/RightProduct.tsx
"use client";
import React, { useState } from "react";
import "./RightProduct.css";
import {
  Product,
  Variation,
  VariationProp,
  ProductVariant,
} from "@/types/product";
import { useCartStore } from "@/lib/useCartStore";
import toast from "react-hot-toast";

export interface RightProductProps {
  product: Product;
}

// Helper to pick white or black text based on background brightness
function getContrastColor(hex: string) {
  const c = hex.charAt(0) === "#" ? hex.substring(1) : hex;
  const num = parseInt(c, 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF";
}

const RightProduct: React.FC<RightProductProps> = ({ product }) => {
  const {
    name,
    description = "",
    price,
    sale_price,
    quantity,
    buy_now_text,
    variations = [],
    variants,
    categories,
  } = product;

  // 1️⃣ Pre-select the first prop of each variation
  const [selectedProps, setSelectedProps] = useState<Record<string, string>>(
    () => {
      const defaults: Record<string, string> = {};
      variations.forEach((v) => {
        if (v.props.length > 0) {
          defaults[v.name] = v.props[0].name;
        }
      });
      return defaults;
    }
  );

  // strip HTML tags
  const descriptionText = description.replace(/<[^>]+>/g, "");

  const handleSelectProp = (variationName: string, propName: string) => {
    setSelectedProps((prev) => ({
      ...prev,
      // لو نفس الخيار: خليه كما هو، لو مختلف: غيّره
      [variationName]: propName,
    }));
  };

  // find matching variant
  const selectedVariant: ProductVariant | undefined = variants?.find((v) =>
    v.variation_props.every(
      (vp) => selectedProps[vp.variation] === vp.variation_prop
    )
  );

  const displayPrice = selectedVariant?.price ?? price;
  const displaySalePrice = selectedVariant?.sale_price || sale_price;

  // cart store action
  const addItem = useCartStore((s) => s.addItem);

  // when clicking "Add To Cart"
  const handleAddToCart = () => {
    const finalProps: Record<string, string> = {};
    variations.forEach((v) => {
      finalProps[v.name] = selectedProps[v.name] || v.props[0]?.name || "";
    });

    addItem(product, finalProps, 1);

    const firstWord = name.split(" ")[0].slice(0, 15);
    toast.success(`"${firstWord}" added to cart  `, {
      position: "top-center",
    });
  };

  return (
    <div id="product-main">
      <div className="flex flex-col gap-4 lg:gap-5">
        <div className="marka">{categories?.[0]?.name || ""}</div>
        <div className="product-name">{name}</div>
        <div className="flex justify-between gap-4 w-full">
          <div className="flex items-center justify-center gap-3">
            {displaySalePrice && (
              <div className="before-discount-price">{displayPrice}$</div>
            )}
            <div className="after-discount-price">
              {displaySalePrice ?? displayPrice}$
            </div>
          </div>
          <div className="flex items-center justify-center lg:gap-3 gap-2">
            <div className="numper-sold">{quantity} Sold</div>
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
        <div className="flex flex-col gap-2 text-start">
          <div className="desc-txt">الوصف:</div>
          <div className="product-description">{descriptionText}</div>
        </div>
        {variations.map((variation: Variation) => (
          <div
            key={variation.id}
            className="main-variation flex flex-col gap-3"
          >
            <div className="flex gap-2 text-start">
              <div className="clr-txt">{variation.name} :</div>
              <div className="product-color">
                {selectedProps[variation.name] || variation.props[0]?.name}
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              {variation.props.map((prop: VariationProp) => {
                const isSelected = selectedProps[variation.name] === prop.name;
                return (
                  <div
                    key={prop.id}
                    onClick={() => handleSelectProp(variation.name, prop.name)}
                    className={
                      variation.type === "color"
                        ? `container-color ${isSelected ? "color-slected" : ""}`
                        : `Size-variant ${isSelected ? "Size-slected" : ""}`
                    }
                    style={
                      variation.type === "color" && isSelected && prop.value
                        ? {
                            border: `2px solid ${prop.value}`,
                          }
                        : undefined
                    }
                  >
                    {variation.type === "color" ? (
                      <div
                        className="color-variant"
                        style={{
                          backgroundColor: prop.value || undefined,
                          fontSize: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: prop.value
                            ? getContrastColor(prop.value)
                            : "#000000",
                        }}
                      >
                        {prop.name}
                      </div>
                    ) : variation.type === "image" && prop.value ? (
                      <img
                        src={prop.value}
                        alt={prop.name}
                        className="variant-image"
                      />
                    ) : (
                      prop.name
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div className="main-variation gap-3 grid grid-cols-1 lg:grid-cols-2">
          <button
            onClick={handleAddToCart}
            className="add-to-card flex items-center justify-center"
          >
            Add To Cart
          </button>
          <button className="Checkout-Now flex items-center justify-center">
            {buy_now_text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightProduct;
