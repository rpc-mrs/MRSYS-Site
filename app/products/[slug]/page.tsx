import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.summary,
      url: `${SITE_URL}/products/${product.slug}`,
      type: "website",
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    url: `${SITE_URL}/products/${product.slug}`,
    brand: { "@type": "Brand", name: "MRSYS" },
    additionalProperty: product.specs
      .filter((s) => !s.value.startsWith("[TODO"))
      .map((s) => ({
        "@type": "PropertyValue",
        name: s.label,
        value: s.value,
      })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Link href="/products" className="text-sm font-semibold text-signal hover:underline">
        ← Вся продукция
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div>
          <p className="eyebrow">Прибор</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-muted">{product.tagline}</p>
        </div>

        {/* Gallery */}
        <div className="grid gap-4">
          {product.images.map((img) => (
            <div
              key={img.src}
              className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-line bg-steel-50 font-mono text-xs uppercase tracking-widest text-steel-300"
            >
              {/* TODO: swap for <img src={img.src} alt={img.alt} /> once real photos are in /public/images */}
              {img.alt}
            </div>
          ))}
        </div>
      </div>

      {product.videoUrl && (
        <div className="mt-12">
          <p className="eyebrow mb-3">Видео</p>
          <div className="aspect-video overflow-hidden rounded-2xl border border-line">
            <iframe
              src={product.videoUrl}
              title={`Видео: ${product.name}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="mt-14 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <p className="eyebrow">Описание</p>
          {product.description.map((para, i) => (
            <p
              key={i}
              className={
                para.startsWith("[TODO")
                  ? "font-mono text-xs uppercase tracking-wide text-signal"
                  : "text-muted"
              }
            >
              {para}
            </p>
          ))}
        </div>

        <div>
          <p className="eyebrow">Характеристики</p>
          <dl className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:justify-between sm:gap-4">
                <dt className="text-sm font-medium text-ink">{spec.label}</dt>
                <dd className="font-mono text-sm text-muted sm:text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-14 rounded-2xl border border-line bg-white p-8 text-center">
        <p className="font-display text-xl font-bold text-ink">
          Нужна консультация или расчёт стоимости?
        </p>
        <Link
          href="/contacts"
          className="mt-4 inline-block rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-steel-700"
        >
          Написать нам
        </Link>
      </div>
    </main>
  );
}
