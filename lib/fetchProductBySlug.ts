// lib/fetchProductBySlug.ts
import { Product } from "@/types/product";

const ENDPOINT = "https://api.easy-orders.net/api/v1/external-apps/products";
const CATEGORY_ENDPOINT =
  "https://api.easy-orders.net/api/v1/external-apps/categories";
const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "78f869d8-65d7-4a96-a3ec-f5d3c6141ff3";

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
  const categoriesRes = await fetch(CATEGORY_ENDPOINT, {
    headers,
    next: { revalidate: 300 },
  });
  if (!categoriesRes.ok) {
    throw new Error(
      `Failed to load categories: ${categoriesRes.status} ${categoriesRes.statusText}`
    );
  }
  type Category = { id: string; children: Category[] | null };
  const categoriesData: Category[] = await categoriesRes.json();

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
  const productLists = await Promise.all(
    categoryIds.map((catId) =>
      fetch(`${ENDPOINT}?category_id=${catId}`, {
        headers,
        next: { revalidate: 300 },
      })
        .then((res) => (res.ok ? res.json() : []))
        .catch(() => [])
    )
  );
  const allSummaries = productLists.flat() as Product[];

  // 3️⃣ Find the product summary by slug
  const summary = allSummaries.find((p) => p.slug === slug);
  if (!summary) {
    throw new Error(`No product found for slug "${slug}"`);
  }

  // 4️⃣ Fetch full details by ID
  const detailRes = await fetch(`${ENDPOINT}/${summary.id}`, {
    headers,
    next: { revalidate },
  });
  if (!detailRes.ok) {
    throw new Error(
      `Failed to fetch product detail: ${detailRes.status} ${detailRes.statusText}`
    );
  }
  const product = (await detailRes.json()) as Product;
  return product;
}
