import type { Metadata } from "next";
import Link from "next/link";
import Waveform from "@/components/Waveform";
import { products } from "@/lib/products";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: { absolute: "Магнитно-резонансные системы" },
  description:
    "Производим и поставляем ЯМР-анализатор АКС-2020 и лабораторные термостаты для экспресс-контроля масличности и влажности семян масличных культур.",
  alternates: { canonical: "/" },
};

function getYearsOnMarket(): string {
  const startDate = new Date("2019-08-09");
  const today = new Date();
  
  let years = today.getFullYear() - startDate.getFullYear();
  const monthDiff = today.getMonth() - startDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < startDate.getDate())) {
    years--;
  }

  const getYearWord = (num: number) => {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return "лет";
    if (lastDigit === 1) return "год";
    if (lastDigit >= 2 && lastDigit <= 4) return "года";
    return "лет";
  };

  return `${years} ${getYearWord(years)}`;
}

const STATS = [
  {
    value: "720+",
    label: "поверок проведено с использованием разработанных и утвержденных «ГСО 12699-2024 СО масличности и влажности семян масличных культур и продуктов их переработки (имитаторы) (комплект МРС)",
  },
  { value: "380+", label: "приборов обслуживаем в общей сложности" },
  { value: "250+", label: "поверок ЯМР-анализаторов выполняется каждый год" },
  { value: "30 секунд", label: "время измерения одной пробы масличных семян" },
  { value: "28", label: "регионов России, в которых производим обслуживание, поверки и поставки ЯМР" },
  { value: "20", label: "термостатов на элементах Пельтье с аттестацией поставлено за 1 год" },
  {
    value: "15",
    label: "ЯМР-анализаторов АКС-2020 было выпущено за неполный год с момента их разработки и утверждения в качестве средства измерения",
  },
  { value: getYearsOnMarket(), label: "на рынке — с 9 августа 2019 года" },
  { value: "3", label: "страны СНГ, в которые поставляли оборудование" },
  { value: "0,5", label: "абсолютная погрешность измерения масличности и влажности масличных семян и продуктов их переработки" },
  { value: "0", label: "количество используемых веществ необходимых для измерения масличности семян" },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line grid-texture">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <p className="eyebrow">О методе</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Ядерный магнитный резонанс
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Спектроскопия ядерного магнитного резонанса (ЯМР) — универсальный
            аналитический метод для определения качественного и
            количественного состава образцов. Высокая информативность,
            воспроизводимость и точность, неразрушающий характер измерений,
            экологичность, отсутствие сложной пробоподготовки и высокая
            скорость делают ЯМР одним из наиболее востребованных инструментов
            в производственных и научно-исследовательских лабораториях.
          </p>
          <p className="mt-4 max-w-2xl text-muted">
            Мы выполняем полный цикл работ: разработку оборудования и методик
            на основе ЯМР, их метрологическое обеспечение, внедрение в
            производственные и исследовательские процессы, сервисное
            обслуживание, гарантийный и постгарантийный ремонт, поверку
            ЯМР-анализаторов.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-steel-700"
            >
              Смотреть продукцию
            </Link>
            <Link
              href="/services"
              className="rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-steel-300"
            >
              Наши услуги
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
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-12 sm:px-6 sm:grid-cols-3 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-bold text-steel-700">{s.value}</p>
              <p className="mt-1.5 text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product teaser */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
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
      </section>

      {/* Services teaser */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="eyebrow">Услуги</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink">
                Поверка, ремонт, модернизация, НИОКР
              </h2>
            </div>
            <Link href="/services" className="text-sm font-semibold text-signal hover:underline">
              Все услуги →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-line bg-white p-6 transition-all hover:border-steel-300 hover:shadow-sm"
              >
                <h3 className="font-display text-lg font-bold text-ink group-hover:text-steel-700">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{s.tagline}</p>
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
