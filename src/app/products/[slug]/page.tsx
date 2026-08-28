import type { Metadata } from "next";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import ProductTabs from "@/components/ProductTabs";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
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

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const pinnedParagraphs = product.pinned ?? [];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    url: `${SITE_URL}/products/${product.slug}`,
    brand: { "@type": "Brand", name: 'ООО НПФ «МРС»' },
    additionalProperty: product.specs.map((s) => ({
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
          <p className="mt-4 text-lg text-muted">{product.summary}</p>
          {pinnedParagraphs.map((p, i) => (
            <p key={i} className="mt-4 text-muted">
              {p}
            </p>
          ))}
        </div>

        <div className="grid gap-4">
          {product.images.map((img) => (
            <ProductImage key={img.src} src={img.src} alt={img.alt} />
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

      <ProductTabs product={product} description={product.description ?? []} />

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
