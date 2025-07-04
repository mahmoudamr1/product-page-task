// app/page.tsx
import ProductShell from "@/app/products/[slug]/ProductShell";
import DashedLine from "@/components/DashedLine/DashedLine";
import FirstDiscount from "@/components/FirstDiscount/FirstDiscount";
import Header from "@/components/Header/Header";
import { fetchProductBySlug } from "@/lib/fetchProductBySlug";
import ProductSection2 from "@/components/ProductSection2/ProductSection2";
import ProductSection1 from "@/components/ProductSection1/ProductSection1";
import Footer from "@/components/Footer/Footer";
import ReviewSection from "@/components/ReviewSection/ReviewSection";

export default async function Home() {
  return (
    <main className="">
      <FirstDiscount />
      <Header />
      {/* <ProductShell initialProduct={product} /> */}
      <DashedLine className="!py-3 invisible" />
      <ProductSection1 />
      <DashedLine />
      <ReviewSection />
      <DashedLine />
      <ProductSection2 />
      <Footer />
    </main>
  );
}
