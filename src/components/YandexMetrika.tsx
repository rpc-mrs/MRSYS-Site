"use client";

import Script from "next/script";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const YM_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

// Next.js навигирует между страницами без полной перезагрузки, поэтому
// автоматический просмотр страницы у Метрики (срабатывает один раз, при
// первой загрузке) не видит последующие переходы. Сообщаем о них вручную.
function MetrikaRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!YM_ID || typeof window.ym !== "function") return;
    const query = searchParams?.toString();
    const url = pathname + (query ? `?${query}` : "");
    window.ym(Number(YM_ID), "hit", url);
  }, [pathname, searchParams]);

  return null;
}

export default function YandexMetrika() {
  if (!YM_ID) return null;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${YM_ID}, "init", {
               clickmap:true,
               trackLinks:true,
               accurateTrackBounce:true,
               webvisor:true
          });
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YM_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
      <Suspense fallback={null}>
        <MetrikaRouteTracker />
      </Suspense>
    </>
  );
}