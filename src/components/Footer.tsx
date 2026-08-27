export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      {/* Основная сетка футера */}
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        
        {/* Блок адреса */}
        <div className="text-sm text-ink/80">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
            Адрес
          </p>
          <p className="leading-relaxed">
            Краснодар, пос. Краснодарский,
            <br />
            ул. Платнировская, д. 7, пом. 1
          </p>
        </div>

        {/* Блок контактов */}
        <div className="text-sm text-ink/80">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
            Контакты
          </p>
          <div className="space-y-1">
            <p>
              <a href="tel:+79024032020" className="transition-colors hover:text-signal">
                +7 (902) 403-20-20
              </a>
            </p>
            <p>
              <a href="mailto:sacred_jktu@bk.ru" className="transition-colors hover:text-signal">
                sacred_jktu@bk.ru
              </a>
            </p>
          </div>
        </div>

      </div>

      {/* Нижняя плашка (Копирайт) */}
      <div className="border-t border-line py-4 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} ООО НПФ «МРС», ИНН 2311292920. Все права защищены.
      </div>
    </footer>
  );
}
