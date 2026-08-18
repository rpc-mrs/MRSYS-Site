export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="text-sm text-muted">
          <p className="mb-2 font-semibold text-ink">Адрес</p>
          <p>Краснодар, пос. Краснодарский,<br />ул. Платнировская, д. 7, пом. 1</p>
        </div>
        <div className="text-sm text-muted">
          <p className="mb-2 font-semibold text-ink">Контакты</p>
          <p>
            <a href="tel:+79024032020" className="hover:text-signal">
              +7 (902) 403-20-20
            </a>
          </p>
          <p>
            <a href="mailto:sacred_jktu@bk.ru" className="hover:text-signal">
              sacred_jktu@bk.ru
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} ООО НПФ «МРС», ИНН 2311292920. Все права защищены.
      </div>
    </footer>
  );
}
