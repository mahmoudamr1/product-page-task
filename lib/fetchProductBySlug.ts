// lib/fetchProductBySlug.ts

import { Product } from "@/types/product";

const ENDPOINT = "https://api.easy-orders.net/api/v1/external-apps/products";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const DEFAULT_RETRY_DELAY = 5000; // 5 seconds default retry delay
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL

// Local cache using Map with typed data
const cache = new Map<string, { data: Product; timestamp: number }>();

// Helper to get/set cache
function getFromCache(key: string): Product | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setInCache(key: string, data: Product) {
  cache.set(key, { data, timestamp: Date.now() });
}

// Periodically clear expired cache
function clearExpiredCache() {
  const now = Date.now();
  for (const [key, { timestamp }] of cache) {
    if (now - timestamp >= CACHE_TTL) {
      cache.delete(key);
    }
  }
}
setInterval(clearExpiredCache, 10 * 60 * 1000); // Run every 10 minutes

// Helper for fetch with retry on 429 and 500 errors
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 3
): Promise<Response> {
  try {
    const res = await fetch(url, options);
    if (res.status === 429 && retries > 0) {
      const retryAfter = res.headers.get("Retry-After");
      const delay = retryAfter
        ? parseInt(retryAfter, 10) * 1000
        : DEFAULT_RETRY_DELAY;
      console.warn(
        `Rate limit hit (429) for ${url}. Retrying after ${delay}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1);
    }
    if (res.status >= 500 && retries > 0) {
      console.warn(
        `Server error (${res.status}) for ${url}. Retrying after ${DEFAULT_RETRY_DELAY}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, DEFAULT_RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res;
  } catch (error) {
    if (retries > 0 && error instanceof Error && /50\d/.test(error.message)) {
      console.warn(
        `Network/server error for ${url}. Retrying after ${DEFAULT_RETRY_DELAY}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, DEFAULT_RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

/**
 * Fetches full product details by slug using filter endpoint.
 * @param slug - the product slug from URL.
 * @param options.revalidate - ISR cache duration in seconds.
 */
export async function fetchProductBySlug(
  slug: string,
  { revalidate = 60 } = {}
): Promise<Product> {
  const headers = {
    "Api-Key": API_KEY,
    Accept: "application/json",
  };

  // Try cache first
  const cacheKey = `product_${slug}`;
  let product = getFromCache(cacheKey);
  if (product) {
    return product;
  }

  // Step 1: Fetch product summary using filter by slug
  const filterQuery = `filter=slug||cont||${encodeURIComponent(slug)}`;
  const res = await fetchWithRetry(
    `${ENDPOINT}?${filterQuery}`,
    {
      headers,
      next: { revalidate: 300 },
    },
    3
  );

  const products = await res.json();
  if (!Array.isArray(products) || !products.length) {
    throw new Error(`No product found for slug "${slug}"`);
  }

  const summary = products[0]; // Take the first match (assuming unique slugs)
  if (!summary.id || !summary.slug) {
    throw new Error(`Invalid product summary for slug "${slug}"`);
  }

  // Step 2: Fetch full details by ID
  const detailCacheKey = `product_${summary.id}`;
  product = getFromCache(detailCacheKey);
  if (!product) {
    const detailRes = await fetchWithRetry(
      `${ENDPOINT}/${summary.id}`,
      {
        headers,
        next: { revalidate },
      },
      3
    );
    product = await detailRes.json();
    if (!product?.id || !product?.slug) {
      throw new Error(`Invalid or missing product data for slug "${slug}"`);
    }
    setInCache(detailCacheKey, product);
  }

  setInCache(cacheKey, product);
  return product as Product;
}
