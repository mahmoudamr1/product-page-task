// app/page.tsx
import ProductShell from "@/app/products/[slug]/ProductShell";
import ProductSection from "@/components/ProductSection/ProductSection";
import DashedLine from "@/components/DashedLine/DashedLine";
import FirstDiscount from "@/components/FirstDiscount/FirstDiscount";
import Header from "@/components/Header/Header";
import { fetchProductBySlug } from "@/lib/fetchProductBySlug";

export default async function Home() {
  const product = await fetchProductBySlug("Sneakers12");

  return (
    <main className="">
      <FirstDiscount />
      <Header />
      <ProductShell initialProduct={product} />
      <DashedLine />
      <ProductSection />
    </main>
  );
}
