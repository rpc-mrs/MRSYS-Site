import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-slate-50 min-h-screen">
      
      {/* 1. Главный баннер (Hero Section) */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-16 md:py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
              Научно-производственная фирма
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Магнитно-резонансные системы
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Разработка, проектирование и серийное производство высокотехнологичного оборудования и специализированных систем автоматизации.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/products" className="bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-xs">
                Посмотреть продукцию
              </Link>
              <Link href="/contacts" className="bg-slate-900 text-white text-center px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition">
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Основной презентационный блок (Текст с оригинального сайта) */}
      <section className="max-w-7xl mx-auto px-8 py-16 space-y-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
            Ядерно-магнитный резонанс
          </h2>
          <div className="text-slate-700 leading-relaxed space-y-4 text-base">
            <p>
              Спектроскопия ядерного магнитного резонанса (ЯМР) представляет собой универсальный, надежный и передовой аналитический метод, позволяющий получать информацию о качественном и количественном составе исследуемых образцов. Мы занимаемся разработкой оборудования и методик на основе метода ЯМР, их внедрением, обслуживанием, гарантийным и постгарантийным ремонтом.
            </p>
          </div>
        </div>

        {/* 3. Ключевые компетенции / Преимущества */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">⚙️</div>
            <h3 className="font-bold text-slate-900 mb-2 text-lg">Метрологическая служба</h3>
            <p className="text-slate-600 text-md leading-relaxed">
              Метрологическая служба предприятия координирует работы, связанные с испытаниями и сертификацией продукции, её метрологическим обеспечением, а также метрологическим обеспечением рабочих средств измерения производственных подразделений. Обеспечивает проведение работ по первичной и периодической поверке оборудования заказчиков.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">🖥️</div>
            <h3 className="font-bold text-slate-900 mb-2 text-lg">Производство</h3>
            <p className="text-slate-600 text-md leading-relaxed">
              Сборочное производство оснащено современными станками и оборудованием для обработки металлов, пластиков и др. материалов, электромонтажных работ и монтажа печатных плат. Высокая технологическая оснащённость и налаженная система производственной логистики и кооперации позволяют быстро осваивать выпуск новых изделий и оперативно менять ассортимент выпускаемой продукции, обеспечивая при этом высокий уровень её качества. В производстве используются сырье, материалы и комплектующие известных брендов.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">📦</div>
            <h3 className="font-bold text-slate-900 mb-2 text-base">Разработка</h3>
            <p className="text-slate-600 text-md leading-relaxed">
              Разработка новых образцов продукции, выпуск опытных партий и единичных заказных изделий, а также подготовка к серийному выпуску производятся силами высококвалифицированных специалистов Конструкторского отдел предприятия, имеющих многолетний опыт работы в данной области.
            </p>
          </div>
        </div>

        {/* 4. Призыв к действию (Footer Banner) */}
        <div className="bg-linear-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold">Ищете решение для научного или медицинского проекта?</h3>
          <p className="text-slate-300 max-w-lg mx-auto text-sm">
            Свяжитесь с нашими инженерами. Мы готовы рассчитать конфигурацию оборудования под ваши технические требования и задачи.
          </p>
          <div className="pt-2">
            <Link href="/contacts" className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              Отправить ТЗ на расчет
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
