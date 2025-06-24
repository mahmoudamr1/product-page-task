// Ui/OneProduct/OneProduct.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import SoldRating from "../SoldRating/SoldRating";
import "./OneProduct.css";

const BASE_URL = "https://app.easy-orders.net";
const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "78f869d8-65d7-4a96-a3ec-f5d3c6141ff3";
const ENDPOINT = "https://api.easy-orders.net/api/v1/external-apps/products";

export interface ProductSummary {
  id: string;
  name: string;
  thumb: string;
  price: number;
  sale_price?: number;
  quantity: number;
}

export type Product = ProductSummary;

export interface ProductDetail extends ProductSummary {
  slug: string;
  description: string;
  images: string[];
}

interface OneProductProps {
  product?: ProductSummary;
}

// Fetch full product details by ID with basic 429 handling
async function fetchProductDetail(id: string): Promise<ProductDetail> {
  const url = `${ENDPOINT}/${id}`;
  const res = await fetch(url, {
    headers: {
      "Api-Key": API_KEY,
      Accept: "application/json",
    },
  });
  if (res.status === 429) {
    throw new Error("Rate limit exceeded, please try again later.");
  }
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const json = await res.json();
  return json;
}

const OneProduct: React.FC<OneProductProps> = ({ product }) => {
  if (!product) return null;

  const { data, isLoading, isError, error } = useQuery<ProductDetail, Error>({
    queryKey: ["product", product.id],
    queryFn: () => fetchProductDetail(product.id),
    retry: false, // disable retries to avoid repeated 429s
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div className="text-red-500">Error: {error.message}</div>;
  if (!data) return null;

  const thumbPath = data.thumb || "";
  const thumbUrl = thumbPath.startsWith("http")
    ? thumbPath
    : `${BASE_URL}${thumbPath}`;

  const productLink = `/products/${data.slug}`;

  return (
    <Link href={productLink}>
      <div className="one-product-card flex flex-col gap-1 hover:shadow-lg transition-shadow cursor-pointer">
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
          <div className="sale_price">{data.sale_price ?? data.price}$</div>
          <div className="price-before-discount line-through text-gray-500">
            {data.price}$
          </div>
        </div>
        <SoldRating
          className="justify-start"
          soldText={`${data.quantity} Sold`}
          ratingText="4.5"
        />
      </div>
    </Link>
  );
};

export default OneProduct;
