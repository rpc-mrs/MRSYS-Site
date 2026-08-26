import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.tagline,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.name,
      description: service.tagline,
      url: `${SITE_URL}/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Link href="/services" className="text-sm font-semibold text-signal hover:underline">
        ← Все услуги
      </Link>

      <p className="eyebrow mt-6">Услуга</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
        {service.name}
      </h1>
      <p className="mt-4 text-lg text-muted">{service.tagline}</p>

      <div className="mt-12 space-y-10">
        {service.sections.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <h2 className="mb-4 font-display text-xl font-bold text-ink">
                {section.heading}
              </h2>
            )}
            {section.paragraphs && (
              <div className="space-y-4">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-muted">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {section.list && (
              <ul className="mt-4 space-y-3">
                {section.list.map((item, j) => (
                  <li key={j} className="flex gap-3 text-muted">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-line bg-white p-8 text-center">
        <p className="font-display text-xl font-bold text-ink">
          Обсудить задачу или заказать услугу
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
