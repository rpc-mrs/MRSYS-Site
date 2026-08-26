import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="eyebrow">Ошибка 404</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        Страница не найдена
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Похоже, здесь нет измеримого сигнала — такой страницы не существует
        или она была перемещена.
      </p>

      <svg
        viewBox="0 0 900 260"
        fill="none"
        className="mt-10 h-28 w-full max-w-xl sm:h-32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="0" y1="130" x2="900" y2="130" stroke="#E2E5EA" strokeWidth="1" />
        <path
          d="M0,130 L15,158.4 L30,174.0 L45,170.0 L60,148.1 L75,118.1 L90,93.4 L105,85.1 L120,96.8 L135,123.4 L150,152.9 L165,172.2 L180,172.6 L195,153.9 L210,124.6 L225,97.6 L240,85.2 L255,92.7 L270,117.0 L285,147.0 L298,192.7 L312,151.1 L321,175.0 L330,111.2 L338,187.4 L349,65.2 L363,118.5 L374,72.7 L388,68.3 L405,77.3 L416,148.3 L433,192.7 L450,142.0 L458,196.7 L466,137.9 L476,100.5 L486,135.7 L503,103.2 L521,85.3 L538,140.0 L549,112.1 L565,159.7 L582,68.3 L593,129.5 L609,119.9 L622,125.2 L637,110.6 L648,171.2 L659,71.5 L671,133.5 L684,162.1 L696,145.3 L705,76.5 L719,83.1 L732,81.3 L747,119.0 L765,70.9 L781,140.2 L794,107.6 L807,143.2 L824,171.6 L833,177.6 L845,126.4 L863,69.1 L875,150.6 L893,175.1 L900,160.3"
          stroke="#0E7C86"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="-mt-6 font-mono text-xs text-muted">
        сигнал теряется в шуме — как и эта страница
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-steel-700"
        >
          На главную
        </Link>
        <Link
          href="/products"
          className="rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-steel-300"
        >
          Смотреть продукцию
        </Link>
      </div>
    </main>
  );
}
