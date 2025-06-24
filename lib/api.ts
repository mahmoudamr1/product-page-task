// lib/api.ts

const ENDPOINT = "https://api.easy-orders.net/api/v1/external-apps/products";
const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "78f869d8-65d7-4a96-a3ec-f5d3c6141ff3";

/**
 * Fetches full product details by product ID (slug) including reviews.
 */
export const fetchProductBySlug = async (slug: string) => {
  const url = `${ENDPOINT}/${slug}`;
  const res = await fetch(url, {
    headers: {
      "Api-Key": API_KEY,
      Accept: "application/json",
    },
    // Optional ISR revalidation
    // next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
  }

  return await res.json();
};
