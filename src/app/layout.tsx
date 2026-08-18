import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["500", "700"],
});

const body = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Магнитно-резонансные системы",
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "ЯМР-анализатор АКС-2020 и термостаты для контроля масличности и влажности семян масличных культур. Экспресс-анализ без реактивов.",
  keywords: [
    "ЯМР анализатор",
    "ЯМР-анализатор масличности",
    "АКС-2020",
    "анализатор масличности и влажности",
    "термостат для проб",
    "оборудование для контроля качества семян",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Магнитно-резонансные системы",
    description:
      "ЯМР-анализатор АКС-2020 и термостаты для контроля масличности и влажности семян масличных культур.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // TODO: вставьте свои коды подтверждения после регистрации сайта:
    // Яндекс.Вебмастер → Информация о сайте → HTML-тег
    // yandex: "ваш-код-подтверждения",
    // Google Search Console → HTML tag
    // google: "ваш-код-подтверждения",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: 'ООО НПФ «МРС»',
  taxID: "2311292920",
  url: SITE_URL,
  description:
    "Производство и поставка ЯМР-анализаторов и лабораторного оборудования для контроля качества семян масличных культур.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Платнировская, д. 7, пом. 1",
    addressLocality: "пос. Краснодарский, Краснодар",
    addressCountry: "RU",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-902-403-20-20",
    email: "dir@mrsys.ru",
    contactType: "sales",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col font-body">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />

      </body>
    </html>
  );
}
