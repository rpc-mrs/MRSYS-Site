import Link from "next/link";
import { productsList } from "@/data/productsData";

export default function Products() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Наша продукция</h1>
        <p className="text-slate-500 mt-2">
          Разработка и производство наукоемкого оборудования для магнитно-резонансных исследований.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {productsList.map((product) => (
          <div key={product.id} className="border rounded-xl p-6 bg-white shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">{product.title}</h2>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{product.description}</p>
            </div>
            
            <div className="border-t pt-4 flex flex-col gap-4">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Особенности:</h3>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                  {product.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
              
              {/* Ссылка на внутреннюю страницу прибора */}
              <Link href={`/products/${product.id}`} className="text-sm text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
