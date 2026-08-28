'use client';

import { useEffect, useRef, useState } from "react";

interface WaveformProps {
  className?: string;
}

const HEIGHT = 130;
const DRAW_DURATION = 1000;
const MORPH_DURATION = 1500;
const TOTAL_DURATION = DRAW_DURATION + MORPH_DURATION;

function drawFrame(ctx: CanvasRenderingContext2D, width: number, elapsed: number) {
  const centerY = HEIGHT / 2;
  const time = Math.min(elapsed, TOTAL_DURATION);
  const drawProgress = Math.min(time / DRAW_DURATION, 1);

  let morphProgress = 0;
  if (time > DRAW_DURATION) {
    const linearMorph = Math.min((time - DRAW_DURATION) / MORPH_DURATION, 1);
    morphProgress =
      linearMorph < 0.5 ? 2 * linearMorph * linearMorph : 1 - Math.pow(-2 * linearMorph + 2, 2) / 2;
  }

  ctx.clearRect(0, 0, width, HEIGHT);

  ctx.beginPath();
  ctx.strokeStyle = "#E2E5EA";
  ctx.lineWidth = 1;
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "#0E7C86";
  ctx.lineWidth = 0.6 + morphProgress * 0.8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const currentMaxX = width * drawProgress;
  const step = 2;

  for (let x = 0; x <= currentMaxX; x += step) {
    const scaleX = (x / width) * 900;

    const highFreqNoise =
      Math.sin(scaleX * 1.1) * 0.45 + Math.cos(scaleX * 2.7) * 0.35 + Math.sin(scaleX * 5.3) * 0.2;
    const upperEnvelope = Math.exp(-0.0035 * scaleX) * 32 + Math.sin(scaleX * 0.015) * 7;
    const upperSignalY = highFreqNoise * Math.max(0, upperEnvelope);

    const lowerDecay = Math.exp(-0.006 * scaleX);
    const lowerSignalY = Math.sin(0.16 * scaleX) * 52 * lowerDecay;

    const mixedY = centerY - ((1 - morphProgress) * upperSignalY + morphProgress * lowerSignalY);
    const residualNoise = Math.sin(scaleX * 1.8) * 0.6 * Math.exp(-0.002 * scaleX) * (1 - morphProgress * 0.8);
    const finalY = mixedY - residualNoise;

    if (x === 0) ctx.moveTo(x, finalY);
    else ctx.lineTo(x, finalY);
  }
  ctx.stroke();
}

export default function Waveform({ className = "" }: WaveformProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const widthRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.round(entry.contentRect.width);
        if (w <= 0) continue;
        widthRef.current = w;
        canvas.width = w;
        canvas.height = HEIGHT;
        setReady(true);
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const start = performance.now();

    function render(timestamp: number) {
      if (!ctx) return;
      const elapsed = timestamp - start;
      drawFrame(ctx, widthRef.current, elapsed);
      if (elapsed < TOTAL_DURATION) {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <div ref={containerRef} className="w-full max-w-2xl">
      <canvas ref={canvasRef} className={`block w-full h-auto ${className}`} />
    </div>
  );
}