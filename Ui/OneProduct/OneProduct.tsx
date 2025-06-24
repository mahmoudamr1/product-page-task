// Ui/OneProduct/OneProduct.tsx
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import SoldRating from "../SoldRating/SoldRating";
import "./OneProduct.css";

const BASE_URL = "https://app.easy-orders.net";
const API_KEY = "78f869d8-65d7-4a96-a3ec-f5d3c6141ff3";
const ENDPOINT = "https://api.easy-orders.net/api/v1/external-apps/products";

export interface ProductSummary {
  id: string;
  name: string;
  thumb: string;
  price: number;
  sale_price?: number;
  quantity: number;
}

// alias ProductSummary to Product for compatibility
export type Product = ProductSummary;

export interface ProductDetail extends ProductSummary {
  description: string;
  images: string[];
  // ...other fields as needed
}

interface OneProductProps {
  product?: ProductSummary;
}

// Fetch full product details by ID
async function fetchProductDetail(id: string): Promise<ProductDetail> {
  const url = `${ENDPOINT}/${id}`;
  const res = await fetch(url, {
    headers: {
      "Api-Key": API_KEY,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json;
}

const OneProduct: React.FC<OneProductProps> = ({ product }) => {
  if (!product) return null;

  const { data, isLoading, isError, error } = useQuery<ProductDetail, Error>({
    queryKey: ["product", product.id],
    queryFn: () => fetchProductDetail(product.id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div className="text-red-500">Error: {error.message}</div>;
  if (!data) return null; // guard against undefined data

  // Ensure thumb URL includes base URL
  const thumbPath = data.thumb || "";
  const thumbUrl = thumbPath.startsWith("http")
    ? thumbPath
    : `${BASE_URL}${thumbPath}`;

  return (
    <div className="one-product-card flex flex-col gap-1">
      <div className="img-container !relative w-full h-full">
        <Image
          src={thumbUrl}
          alt={data.name}
          fill
          className="object-cover !relative"
        />
      </div>
      <div className="product-name">{data.name}</div>
      <div className="price-container flex items-center gap-4">
        <div className="sale_price">${data.sale_price ?? data.price}</div>
        <div className="price-before-discount line-through text-gray-500">
          ${data.price}
        </div>
      </div>
      <SoldRating
        className="justify-start"
        soldText={`${data.quantity} Sold`}
        ratingText="4.5"
      />
      {/* Optionally render description or gallery */}
      {/* <div dangerouslySetInnerHTML={{ __html: data.description }} /> */}
    </div>
  );
};

export default OneProduct;
