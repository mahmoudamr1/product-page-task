/* src/lib/fetchProductBySlug.ts */
import { Product } from "@/types/product";

/**
 * يجلب منتجًا بالـ slug ويضمّ المراجعات (reviews).
 * يفعّل الكاش 60 ثانية (يمكن تعديلها).
 */
export async function fetchProductBySlug(
  slug: string,
  { revalidate = 60 } = {}
): Promise<Product> {
  const url = `https://api.easy-orders.net/api/v1/products/slug/clear-theme/${slug}?join=reviews`;

  const res = await fetch(url, {
    next: { revalidate }, // ISR فى Next.js
    // cache: "force-cache"        // لو عايز Cache دائم
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.statusText}`);
  }

  /**  ✅ هنا شكل الاستجابة يطابق واجهة Product */
  const data: Product = await res.json();
  return data;
}
