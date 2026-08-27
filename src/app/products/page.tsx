import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Продукция: ЯМР-анализатор АКС-2020, термостат Термо-П",
  description:
    "ЯМР-анализатор АКС-2020 для измерения масличности и влажности семян, термостат Термо-П для пробоподготовки. Характеристики, фото, консультация.",
  keywords: ["ямр анализатор", "акс-2020", "термо-П", "термостат для проб", "анализатор масличности"],
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Каталог</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
        Продукция
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Приборы для экспресс-контроля качества семян масличных культур и
        продуктов их переработки.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  );
}
