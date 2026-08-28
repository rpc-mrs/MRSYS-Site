'use client'

import { useEffect, useRef, useState } from "react";

interface WaveformProps {
  className?: string;
}

export default function Waveform({ className = "" }: WaveformProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Храним динамические размеры, полученные от родительского контейнера
  const [{ width, height }, setDimensions] = useState({ width: 0, height: 0 });

  // Следим за изменением размеров экрана (инициализируется и на десктопе, и на мобилках)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: containerWidth } = entry.contentRect;
        // Высота фиксированная (130px), а ширина тянется вслед за текстом
        setDimensions({ width: containerWidth, height: 130 });
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0) return;
    
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
    if (!ctx) return;

    const centerY = height / 2;
    let animationFrameId: number;
    const start = performance.now();
    const drawDuration = 1000;
    const morphDuration = 1500;
    const totalDuration = drawDuration + morphDuration;

    function render(timestamp: number) {
      if (!ctx) return;

      const elapsed = timestamp - start;
      const time = Math.min(elapsed, totalDuration);

      const drawProgress = Math.min(time / drawDuration, 1);
      
      let morphProgress = 0;
      if (time > drawDuration) {
        const linearMorph = Math.min((time - drawDuration) / morphDuration, 1);
        morphProgress = linearMorph < 0.5 
          ? 2 * linearMorph * linearMorph 
          : 1 - Math.pow(-2 * linearMorph + 2, 2) / 2;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Осевая линия
      ctx.beginPath();
      ctx.strokeStyle = "#E2E5EA";
      ctx.lineWidth = 1;
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // 2. ЯМР-кривая
      ctx.beginPath();
      ctx.strokeStyle = "#0E7C86";
      ctx.lineWidth = 0.6 + morphProgress * 0.8; 
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const currentMaxX = width * drawProgress;
      const step = 1; 

      for (let x = 0; x <= currentMaxX; x += step) {
        // Динамический коэффициент масштабирования: волна всегда гармонично 
        // распределяется по всей ширине холста, будь то 300px или 700px
        const scaleX = (x / width) * 900; 

        // Шумный сигнал
        const highFreqNoise = Math.sin(scaleX * 1.1) * 0.45 + Math.cos(scaleX * 2.7) * 0.35 + Math.sin(scaleX * 5.3) * 0.2;
        const upperEnvelope = Math.exp(-0.0035 * scaleX) * 32 + Math.sin(scaleX * 0.015) * 7;
        const upperSignalY = highFreqNoise * Math.max(0, upperEnvelope);

        // Чистый сигнал
        const lowerDecay = Math.exp(-0.006 * scaleX);
        const lowerSignalY = Math.sin(0.16 * scaleX) * 52 * lowerDecay;

        // Смешивание
        const mixedY = centerY - ((1 - morphProgress) * upperSignalY + morphProgress * lowerSignalY);
        const residualNoise = (Math.sin(scaleX * 1.8) * 0.6) * Math.exp(-0.002 * scaleX) * (1 - morphProgress * 0.8);
        const finalY = mixedY - residualNoise;

        if (x === 0) {
          ctx.moveTo(x, finalY);
        } else {
          ctx.lineTo(x, finalY);
        }
      }
      ctx.stroke();

      if (elapsed < totalDuration) {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [width, height]); // Перезапускаем анимацию, если изменился размер экрана

  return (
    // Обертка-контейнер задает максимальную ширину в соответствии с контентом страницы
    <div ref={containerRef} className="w-full max-w-2xl">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`block w-full h-auto ${className}`} 
      />
    </div>
  );
}
