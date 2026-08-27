"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all hover:border-steel-300 hover:shadow-md"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-steel-50">
        {!imgFailed ? (
          <img
            src={product.images[0].src}
            alt={product.images[0].alt}
            className="h-full w-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="font-mono text-xs uppercase tracking-widest text-steel-300">
            Фото прибора
          </span>
        )}
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