export const fetchProductBySlug = async (slug: string) => {
  const res = await fetch(
    `https://api.easy-orders.net/api/v1/products/slug/clear-theme/${slug}?join=reviews`
  );
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};
