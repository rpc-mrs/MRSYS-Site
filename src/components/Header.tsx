import Link from "next/link";

const NAV = [
  { href: "/", label: "Главная" },
  { href: "/products", label: "Продукция" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="hidden font-mono text-xs uppercase tracking-widest text-muted sm:inline">
            ООО НПФ «МРС»
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-steel-50 hover:text-steel-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
