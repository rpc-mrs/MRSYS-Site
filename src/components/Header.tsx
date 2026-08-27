'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { services } from "@/lib/services";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const closeAll = () => {
    setIsOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2" onClick={closeAll}>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            ООО НПФ «МРС»
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex sm:gap-2">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-steel-50 hover:text-steel-700"
          >
            Главная
          </Link>
          <Link
            href="/products"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-steel-50 hover:text-steel-700"
          >
            Продукция
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-steel-50 hover:text-steel-700"
            >
              Услуги
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <div className={`absolute right-0 top-full z-50 w-72 pt-2 transition-all duration-150 ${
              isOpen
                ? 'visible opacity-100 translate-y-0'
                : 'invisible opacity-0 -translate-y-1'
            }`}>
              <div className="overflow-hidden rounded-xl border border-line bg-white shadow-lg">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="block px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-steel-50 hover:text-steel-700"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/contacts"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-steel-50 hover:text-steel-700"
          >
            Контакты
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-steel-50 sm:hidden"
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileOpen}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            {mobileOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <nav className="border-t border-line bg-paper px-4 py-3 sm:hidden">
          <Link
            href="/"
            onClick={closeAll}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-steel-50 hover:text-steel-700"
          >
            Главная
          </Link>
          <Link
            href="/products"
            onClick={closeAll}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-steel-50 hover:text-steel-700"
          >
            Продукция
          </Link>

          <Link
            href="/services"
            onClick={closeAll}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-steel-50 hover:text-steel-700"
          >
            Услуги
          </Link>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              onClick={closeAll}
              className="block rounded-lg py-2.5 pl-6 pr-3 text-sm font-medium text-ink/80 transition-colors hover:bg-steel-50 hover:text-steel-700"
            >
              {s.name}
            </Link>
          ))}

          <Link
            href="/contacts"
            onClick={closeAll}
            className="mt-2 block rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-steel-50 hover:text-steel-700"
          >
            Контакты
          </Link>
        </nav>
      )}
    </header>
  );
}
