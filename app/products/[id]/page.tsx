import { notFound } from "next/navigation";
import Link from "next/link";
import { productsList } from "@/data/productsData";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Получаем id из параметров строки адреса
  const resolvedParams = await params;
  const product = productsList.find((p) => p.id === resolvedParams.id);

  // Если прибор с таким id не найден в базе, Next.js покажет ошибку 404
  if (!product) {
    notFound();
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <Link href="/products" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        &larr; Назад к списку продукции
      </Link>
      
      <article className="bg-white border rounded-xl p-8 shadow-xs">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.title}</h1>
        <p className="text-slate-500 italic mb-6">{product.description}</p>
        
        <div className="prose max-w-none text-slate-800 mb-8">
          <h3 className="text-lg font-semibold mb-2">Детальное описание:</h3>
          <p className="leading-relaxed">{product.fullText}</p>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold text-slate-900 mb-3">Ключевые преимущества:</h3>
          <ul className="space-y-2">
            {product.specs.map((spec, index) => (
              <li key={index} className="text-sm text-slate-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </main>
  );
}
