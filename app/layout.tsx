import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link"; // Импортируем компонент для ссылок
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "НПФ — Магнитно-резонансные технологии",
  description: "Разработка и производство высокотехнологичного оборудования",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Шапка сайта с меню навигации */}
        <nav className="border-b bg-white sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link href="/" className="font-bold text-lg text-slate-900">
              НПФ "МРС"
            </Link>
            <div className="flex gap-6 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition">Главная</Link>
              <Link href="/products" className="hover:text-blue-600 transition">Продукция</Link>
              <Link href="/contacts" className="hover:text-blue-600 transition">Контакты</Link>
            </div>
          </div>
        </nav>

        {/* Сюда подставляется содержимое каждой конкретной страницы */}
        {children}
      </body>
    </html>
  );
}
