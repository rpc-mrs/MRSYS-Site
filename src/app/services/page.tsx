import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Поверка, модернизация, техническое обслуживание и ремонт ЯМР-анализаторов АМВ-1006М и АКС-2020, а также НИОКР на базе метода ЯМР.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Услуги</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
        Поверка, модернизация и обслуживание ЯМР-анализаторов
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Полный цикл сопровождения ЯМР-анализаторов АМВ-1006М и АКС-2020 — от
        обязательной поверки до разработки новых методик измерений под
        задачи предприятия.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-all hover:border-steel-300 hover:shadow-md"
          >
            <h2 className="font-display text-lg font-bold text-ink group-hover:text-steel-700">
              {s.name}
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted">{s.tagline}</p>
            <span className="mt-4 text-sm font-semibold text-signal">
              Подробнее →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
