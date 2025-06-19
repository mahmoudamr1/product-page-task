// app/page.tsx
import ProductShell from "@/app/products/[slug]/ProductShell";
import FirstDiscount from "@/components/ui/FirstDiscount/FirstDiscount";
import Header from "@/components/ui/Header/Header";
import { fetchProductBySlug } from "@/lib/fetchProductBySlug";

export default async function Home() {
  const product = await fetchProductBySlug("Sneakers12");

  return (
    <main className="">
      <FirstDiscount />
      <Header />
      <ProductShell initialProduct={product} />
    </main>
  );
}
