"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";

const LEGACY_TABS = [
  { id: "description", label: "Описание" },
  { id: "specs", label: "Характеристики" },
  { id: "features", label: "Особенности" },
] as const;

type LegacyTabId = (typeof LEGACY_TABS)[number]["id"];

function SpecsTable({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <dl className="max-w-2xl divide-y divide-line rounded-2xl border border-line bg-white">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:justify-between sm:gap-4"
        >
          <dt className="text-sm font-medium text-ink">{spec.label}</dt>
          <dd className="font-mono text-sm text-muted sm:text-right">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function ProductTabs({
  product,
  description,
}: {
  product: Product;
  description: string[];
}) {
  // New, fully custom tab set (used by АКС-2020 and any future product with
  // rich, differently-shaped content per tab).
  if (product.tabs && product.tabs.length > 0) {
    return <CustomProductTabs product={product} />;
  }

  // Legacy fixed 3-tab layout (Описание / Характеристики / Особенности) —
  // still used by the thermostat, unchanged.
  const availableTabs = LEGACY_TABS.filter((t) => {
    if (t.id === "description") return description.length > 0;
    if (t.id === "features") return !!product.features?.length;
    return true;
  });

  const [active, setActive] = useState<LegacyTabId>(availableTabs[0].id);

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

        {active === "specs" && <SpecsTable specs={product.specs} />}

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

function CustomProductTabs({ product }: { product: Product }) {
  const tabs = product.tabs!;
  const [activeId, setActiveId] = useState(tabs[0].id);
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div className="mt-14">
      <div className="flex flex-wrap gap-2 border-b border-line">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveId(tab.id)}
            className={`rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              activeId === tab.id
                ? "border-b-2 border-signal text-ink"
                : "text-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-2xl space-y-10 pt-8">
        {active.blocks?.map((block, i) => (
          <div key={i}>
            {block.heading && (
              <h3 className="mb-4 font-display text-lg font-bold text-ink">
                {block.heading}
              </h3>
            )}
            {block.paragraphs && (
              <div className="space-y-4">
                {block.paragraphs.map((p, j) => (
                  <p key={j} className="text-muted">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {block.list && (
              <ul className="mt-4 space-y-3">
                {block.list.map((item, j) => (
                  <li key={j} className="flex gap-3 text-muted">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {active.useSpecs && (
          <div className={active.blocks?.length ? "" : ""}>
            <SpecsTable specs={product.specs} />
          </div>
        )}
      </div>
    </div>
  );
}