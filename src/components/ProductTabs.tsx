"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";

const TABS = [
  { id: "description", label: "Описание" },
  { id: "specs", label: "Характеристики" },
  { id: "features", label: "Особенности" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ProductTabs({
  product,
  description,
}: {
  product: Product;
  description: string[];
}) {
  const availableTabs = TABS.filter((t) => {
    if (t.id === "description") return description.length > 0;
    if (t.id === "features") return !!product.features?.length;
    return true;
  });

  const [active, setActive] = useState<TabId>(availableTabs[0].id);

  return (
    <div className="mt-14">
      <div className="flex flex-wrap gap-2 border-b border-line">
        {availableTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              active === tab.id
                ? "border-b-2 border-signal text-ink"
                : "text-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pt-8">
        {active === "description" && (
          <div className="max-w-2xl space-y-4">
            {description.map((p, i) => (
              <p key={i} className="text-muted">
                {p}
              </p>
            ))}
          </div>
        )}

        {active === "specs" && (
          <dl className="max-w-2xl divide-y divide-line rounded-2xl border border-line bg-white">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:justify-between sm:gap-4"
              >
                <dt className="text-sm font-medium text-ink">{spec.label}</dt>
                <dd className="font-mono text-sm text-muted sm:text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {active === "features" && product.features && (
          <ul className="max-w-2xl space-y-3">
            {product.features.map((f, i) => (
              <li key={i} className="flex gap-3 text-muted">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}