// components/ProductSection2/ProductSection2.tsx
// category of products 2
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductsSectionTitle from "@/Ui/ProductsSectionTitle/ProductsSectionTitle";
import OneProduct, { Product } from "@/Ui/OneProduct/OneProduct";

const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY!;
const ENDPOINT = "https://api.easy-orders.net/api/v1/external-apps/products";
const CATEGORY_ID = "9561bca7-ff85-4450-9e59-a008ec1afc08";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const DEFAULT_RETRY_DELAY = 5000; // 5 seconds

// In-memory session cache
const productsCache = new Map<string, { data: Product[]; ts: number }>();

function getFromCache(key: string): Product[] | null {
  const entry = productsCache.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL) {
    return entry.data;
  }
  return null;
}

function setInCache(key: string, data: Product[]) {
  productsCache.set(key, { data, ts: Date.now() });
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 5
): Promise<Response> {
  const res = await fetch(url, options);
  if (res.status === 429 && retries > 0) {
    const ra = res.headers.get("Retry-After");
    const delay = ra ? parseInt(ra, 10) * 1000 : DEFAULT_RETRY_DELAY * (6 - retries); // Exponential backoff
    console.warn(`Rate limit hit (429). Retrying after ${delay}ms...`);
    await new Promise((r) => setTimeout(r, delay));
    return fetchWithRetry(url, options, retries - 1);
  }
  return res;
}

async function fetchProducts(): Promise<Product[]> {
  const cacheKey = `products_${CATEGORY_ID}`;
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  const url = `${ENDPOINT}?category_id=${CATEGORY_ID}`;
  const options: RequestInit = {
    headers: {
      "Api-Key": API_KEY,
      Accept: "application/json",
    },
  };

  try {
    const res = await fetchWithRetry(url, options, 1);

    if (res.status === 400) {
      // log the detailed message from the API
      const text = await res.text();
      console.error("Section2 – 400 Bad Request:", text);
      return [];
    }

    if (!res.ok) {
      const text = await res.text();
      console.error(`Section2 – HTTP ${res.status}:`, text);
      throw new Error(`HTTP ${res.status}`);
    }

    const json = await res.json();

    let products: Product[] = [];
    if (Array.isArray(json)) {
      products = json;
    } else if (json.data && Array.isArray(json.data)) {
      products = json.data;
    } else if (json.products && Array.isArray(json.products)) {
      products = json.products;
    }

    setInCache(cacheKey, products);
    return products;
  } catch (err) {
    console.error("Section2 fetchProducts failed:", err);
    return [];
  }
}

export function ProductSection2() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery<Product[], Error, Product[], [string, string]>({
    queryKey: ["products", CATEGORY_ID],
    queryFn: fetchProducts,
    staleTime: CACHE_TTL * 2, // Increased to reduce refetch frequency
    gcTime: CACHE_TTL * 3, // Added gcTime to keep data longer
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 3, // Added retries for better rate limit handling
    retryDelay: (attempt) => Math.min(attempt * DEFAULT_RETRY_DELAY, 30000), // Dynamic retry delay up to 30s
  });

  if (isLoading) {
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
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Error: {error.message === "HTTP 429" ? "Rate limit exceeded, please try again later." : error.message}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-gray-500 text-center py-10">
        No products found for this category.
      </div>
    );
  }

  return (
    <section
      id="ProductSection2"
      className="overflow-hidden px-4 lg:px-7 max-w-full"
    >
      <div className="container flex flex-col gap-6 xl:gap-10 max-w-full md:max-w-screen-xl mx-auto">
        <ProductsSectionTitle title="Popular this week" actionText="View All" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-8">
          {products.map((p: Product) => (
            <OneProduct key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSection2;