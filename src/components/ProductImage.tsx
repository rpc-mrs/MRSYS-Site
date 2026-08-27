"use client";

import { useState } from "react";

export default function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-steel-50">
      {!imgFailed ? (
        <img
          src={src}
          alt={alt}
          className="aspect-[4/3] w-full object-contain"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center font-mono text-xs uppercase tracking-widest text-steel-300">
          {alt}
        </div>
      )}
    </div>
  );
}