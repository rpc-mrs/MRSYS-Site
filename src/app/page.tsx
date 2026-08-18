import type { Metadata } from "next";
import Link from "next/link";
import Waveform from "@/components/Waveform";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: { absolute: "Магнитно-резонансные системы" },
  description:
    "Производим и поставляем ЯМР-анализатор АКС-2020 и лабораторные термостаты для экспресс-контроля масличности и влажности семян масличных культур.",
  alternates: { canonical: "/" },
};

const STATS = [
  { value: "150+", label: "предприятий используют ЯМР-анализаторы" },
  { value: "2", label: "показателя за один цикл: масличность и влажность" },
  { value: "0", label: "химических реактивов при пробоподготовке" },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line grid-texture">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <p className="eyebrow">Ядерный магнитный резонанс в лаборатории</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Экспресс-анализ масличности и влажности — без реактивов, без разрушения пробы
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Производим и поставляем ЯМР-анализаторы и лабораторные термостаты
            для контроля качества семян масличных культур и продуктов их
            переработки.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-steel-700"
            >
              Смотреть продукцию
            </Link>
            <Link
              href="/contacts"
              className="rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-steel-300"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <Waveform className="h-32 w-full sm:h-40" />
          <p className="mt-2 font-mono text-xs text-muted">
            Сигнал свободной индукции — характерная кривая ЯМР-измерения
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl font-bold text-steel-700">{s.value}</p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">О компании</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink">
              Оборудование для контроля качества масличного сырья
            </h2>
          </div>
          <div className="space-y-4 text-muted">
            <p>
              Метод ЯМР позволяет определить масличность и влажность пробы за
              одно измерение, без химической подготовки образца. Это делает
              анализ быстрым, воспроизводимым и не зависящим от квалификации
              оператора — что особенно важно на приёмке сырья и в лабораториях
              масложировых предприятий.
            </p>
            <p>
              Мы занимаемся разработкой оборудования и методик на основе
              ядерного магнитного резонанса, их внедрением на предприятиях,
              а также сервисным, гарантийным и постгарантийным обслуживанием
              поставленных приборов.
            </p>
          </div>
        </div>
      </section>

      {/* Product teaser */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="eyebrow">Продукция</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink">
                Приборы
              </h2>
            </div>
            <Link href="/products" className="text-sm font-semibold text-signal hover:underline">
              Вся продукция →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group rounded-2xl border border-line bg-paper p-6 transition-all hover:border-steel-300 hover:shadow-sm"
              >
                <h3 className="font-display text-lg font-bold text-ink group-hover:text-steel-700">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{p.tagline}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-signal">
                  Подробнее →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
