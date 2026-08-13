import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all hover:border-steel-300 hover:shadow-md"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-steel-50 font-mono text-xs uppercase tracking-widest text-steel-300">
        {/* TODO: replace with product.images[0] once real photos are added */}
        Фото прибора
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold text-ink group-hover:text-steel-700">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted">{product.summary}</p>
        <span className="mt-4 text-sm font-semibold text-signal">
          Подробнее →
        </span>
      </div>
    </Link>
  );
}
