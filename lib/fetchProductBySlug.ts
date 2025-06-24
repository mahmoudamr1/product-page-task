import { Product } from "@/types/product";

const ENDPOINT = "https://api.easy-orders.net/api/v1/external-apps/products";
const CATEGORY_ENDPOINT =
  "https://api.easy-orders.net/api/v1/external-apps/categories";
const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "78f869d8-65d7-4a96-a3ec-f5d3c6141ff3";
const DEFAULT_RETRY_DELAY = 5000; // 5 seconds default retry delay
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL

// Local cache using Map
const cache = new Map<string, { data: any; timestamp: number }>();

// Helper to get/set cache
function getFromCache(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setInCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

// Helper for fetch with retry on 429
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 1
): Promise<Response> {
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
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res;
}

/**
 * Fetches full product details by slug across all categories.
 * 1. Loads categories to gather all category IDs.
 * 2. Fetches product summaries per category.
 * 3. Finds the summary matching the given slug.
 * 4. Fetches product detail by ID.
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

  // 1️⃣ Fetch all categories
  const categoriesCacheKey = "categories";
  let categoriesData: Category[] = getFromCache(categoriesCacheKey);
  if (!categoriesData) {
    const categoriesRes = await fetchWithRetry(
      CATEGORY_ENDPOINT,
      {
        headers,
        next: { revalidate: 300 },
      },
      1
    );
    categoriesData = await categoriesRes.json();
    setInCache(categoriesCacheKey, categoriesData);
  }

  type Category = { id: string; children: Category[] | null };
  // Collect all category IDs recursively
  const categoryIds: string[] = [];
  const traverse = (cats: Category[]) => {
    for (const cat of cats) {
      categoryIds.push(cat.id);
      if (cat.children) traverse(cat.children);
    }
  };
  traverse(categoriesData);

  // 2️⃣ Fetch product lists per category
  const allSummaries: Product[] = [];
  for (const catId of categoryIds) {
    const cacheKey = `products_${catId}`;
    let products = getFromCache(cacheKey);
    if (!products) {
      const res = await fetchWithRetry(
        `${ENDPOINT}?category_id=${catId}`,
        {
          headers,
          next: { revalidate: 300 },
        },
        1
      );
      products = await res.json();
      setInCache(cacheKey, products);
    }
    allSummaries.push(
      ...(Array.isArray(products)
        ? products
        : products.data || products.products || [])
    );
  }

  // 3️⃣ Find the product summary by slug
  const summary = allSummaries.find((p) => p.slug === slug);
  if (!summary) {
    throw new Error(`No product found for slug "${slug}"`);
  }

  // 4️⃣ Fetch full details by ID
  const detailCacheKey = `product_${summary.id}`;
  let product = getFromCache(detailCacheKey);
  if (!product) {
    const detailRes = await fetchWithRetry(
      `${ENDPOINT}/${summary.id}`,
      {
        headers,
        next: { revalidate },
      },
      1
    );
    product = await detailRes.json();
    setInCache(detailCacheKey, product);
  }

  return product as Product;
}
