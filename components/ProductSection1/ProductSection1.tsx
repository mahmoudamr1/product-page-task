// ProductSection1.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductsSectionTitle from "@/Ui/ProductsSectionTitle/ProductsSectionTitle";
import OneProduct, { Product } from "@/Ui/OneProduct/OneProduct";

const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "78f869d8-65d7-4a96-a3ec-f5d3c6141ff3";
const ENDPOINT = "https://api.easy-orders.net/api/v1/external-apps/products";
const CATEGORY_ID = "29aec3e7-8732-48e8-ade6-16b8188255d1";

async function fetchProducts(): Promise<Product[]> {
  const url = `${ENDPOINT}?category_id=${CATEGORY_ID}`;
  const res = await fetch(url, {
    headers: {
      "Api-Key": API_KEY,
      Accept: "application/json",
    },
    next: { revalidate: 300 }, // Revalidate every 300 seconds (5 minutes)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  console.log("API raw response:", json);

  if (Array.isArray(json)) return json;
  if (json.data && Array.isArray(json.data)) return json.data;
  if (json.products && Array.isArray(json.products)) return json.products;
  return [];
}

export function ProductSection1() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products", CATEGORY_ID],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <svg
          className="w-8 h-8 animate-spin text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l-4 4v-4a4 4 0 00-4 4z"
          />
        </svg>
      </div>
    );
  if (isError)
    return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <section
      id="ProductSection1"
      className="overflow-hidden px-4 lg:px-7 max-w-full"
    >
      <div className="container flex flex-col gap-6 xl:gap-10 max-w-full md:max-w-screen-xl mx-auto ">
        <ProductsSectionTitle title="Related Product" actionText="View All" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-8">
          {products.map((p) => (
            <OneProduct key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSection1;
