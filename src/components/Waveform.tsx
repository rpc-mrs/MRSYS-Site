'use client'

import { useEffect, useState, useMemo } from "react";

interface WaveformProps {
  className?: string;
  pointsCount?: number; // Оптимально для плотного высокочастотного ЯМР шума
}

export default function Waveform({ className = "", pointsCount = 900 }: WaveformProps) {
  const width = 900;
  const height = 260;
  const centerY = height / 2;

  // Хранит текущее время анимации в миллисекундах от 0 до общего лимита
  const [time, setTime] = useState(0);

  // Константы таймингов (в мс)
  const drawDuration = 1000;    // Этап 1: Отрисовка шума слева направо (1 сек)
  const morphDuration = 1500;   // Этап 2: Плавная замена на хорошую волну (1.5 сек)
  const totalDuration = drawDuration + morphDuration;

  useEffect(() => {
    let start: number | null = null;

    function animate(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      setTime(Math.min(elapsed, totalDuration));

      if (elapsed < totalDuration) {
        requestAnimationFrame(animate);
      }
    }

    const animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [totalDuration]);

  // Вычисляем два коэффициента прогресса на основе текущего времени
  const { drawProgress, morphProgress } = useMemo(() => {
    // 1. Прогресс прорисовки (0 до 1 в течение первой секунды)
    const dProg = Math.min(time / drawDuration, 1);

    // 2. Прогресс морфинга (0 до 1 в течение последующих 1.5 секунд)
    let mProg = 0;
    if (time > drawDuration) {
      const morphElapsed = time - drawDuration;
      const linearMorph = Math.min(morphElapsed / morphDuration, 1);
      // Применяем плавность (easing), чтобы волна разглаживалась мягко
      mProg = linearMorph < 0.5 
        ? 2 * linearMorph * linearMorph 
        : 1 - Math.pow(-2 * linearMorph + 2, 2) / 2;
    }

    return { drawProgress: dProg, morphProgress: mProg };
  }, [time, drawDuration, morphDuration]);

  // Генерация динамической математической кривой
  const dPath = useMemo(() => {
    const pathPoints: string[] = [];
    
    // Текущий предел видимости линии по оси X (для эффекта прорисовки)
    const currentMaxX = width * drawProgress;

    for (let x = 0; x <= width; x += width / pointsCount) {
      // Прекращаем считать точки, если график еще не дорисован до этой координаты X
      if (x > currentMaxX && drawProgress < 1) break;

      // --- 1. Модель ШУМНОГО сигнала (Верхний график) ---
      const highFreqNoise = (
        Math.sin(x * 1.1) * 0.45 + 
        Math.cos(x * 2.7) * 0.35 + 
        Math.sin(x * 5.3) * 0.2
      );
      // Огибающая форма шумного сигнала: спад в начале, подъем и затухание
      const upperEnvelope = Math.exp(-0.0035 * x) * 65 + Math.sin(x * 0.015) * 15;
      const upperSignalY = highFreqNoise * Math.max(0, upperEnvelope);

      // --- 2. Модель ХОРОШЕГО сигнала (Нижний график) ---
      const lowerDecay = Math.exp(-0.006 * x);
      const lowerFreq = 0.16; // Приятная чистая частота
      const lowerSignalY = Math.sin(lowerFreq * x) * 105 * lowerDecay;

      // --- 3. Смешивание (Морфинг) во времени ---
      // Сначала morphProgress равен 0 (видим только верхний шум).
      // По мере роста morphProgress линия превращается в нижний чистый график.
      const mixedY = centerY - ((1 - morphProgress) * upperSignalY + morphProgress * lowerSignalY);

      // Микро-шум окружения, который слегка затухает, чтобы линия в конце не была стерильной
      const residualNoise = (Math.sin(x * 1.8) * 1.2) * Math.exp(-0.002 * x) * (1 - morphProgress * 0.8);
      const finalY = mixedY - residualNoise;

      if (x === 0) {
        pathPoints.push(`M ${x.toFixed(1)} ${finalY.toFixed(1)}`);
      } else {
        pathPoints.push(`L ${x.toFixed(1)} ${finalY.toFixed(1)}`);
      }
    }

    return pathPoints.join(" ");
  }, [drawProgress, morphProgress, pointsCount, centerY, width]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      xmlns="http://w3.org"
      aria-hidden="true"
    >
      {/* Центральная осевая линия */}
      <line x1="0" y1={centerY} x2={width} y2={centerY} stroke="#E2E5EA" strokeWidth="1" />
      
      {/* Последовательно анимируемый ЯМР-сигнал */}
      <path
        d={dPath}
        stroke="#0E7C86"
        // Во время шума линия тоньше (0.9), при чистой волне становится плотнее (2)
        strokeWidth={0.9 + morphProgress * 1.1} 
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke-width 0.2s ease" }}
      />
    </svg>
  );
}
