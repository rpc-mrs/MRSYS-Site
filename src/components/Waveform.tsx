import { useMemo } from "react";

interface WaveformProps {
  className?: string;
  pointsCount?: number; // Плотность точек (чем больше, тем детальнее шум и волна)
}

export default function Waveform({ className = "", pointsCount = 800 }: WaveformProps) {
  const width = 900;
  const height = 260;
  const centerY = height / 2;

  // Рассчитываем ключевые зоны графика (в пикселях по оси X)
  const noiseEndX = 100;     // Где заканчивается чистый начальный шум (x = 0..100)
  const signalStartX = 110;    // Точка пика (всплеска) ЯМР-сигнала
  const maxAmplitude = 100;    // Максимальная высота волны в пике

  const dPath = useMemo(() => {
    const pathPoints: string[] = [];

    for (let x = 0; x <= width; x += width / pointsCount) {
      let y = centerY;

      if (x < noiseEndX) {
        // --- ФАЗА 1: Чистый начальный шум (Мертвое время детектора) ---
        // Генерируем псевдослучайный шум на основе функции Math.sin с высокой частотой
        const noise = (Math.sin(x * 1.9) + Math.cos(x * 3.7) + Math.sin(x * 5.1)) / 3;
        const noiseAmplitude = 12; // Высота шума в начале
        y = centerY - noise * noiseAmplitude;

      } else if (x >= noiseEndX && x < signalStartX) {
        // --- ПЕРЕХОД: Взлет к пику ЯМР (Резкий импульс вверх/вниз) ---
        // Плавно соединяем последнюю точку шума с вершиной основного сигнала
        const t = (x - noiseEndX) / (signalStartX - noiseEndX);
        // Интерполяция к началу синусоиды
        const signalAtStart = maxAmplitude * Math.sin(0); 
        const noiseAtEnd = ((Math.sin(noiseEndX * 1.9) + Math.cos(noiseEndX * 3.7)) / 3) * 12;
        
        y = centerY - (noiseAtEnd * (1 - t) + signalAtStart * t);

      } else {
        // --- ФАЗА 2 и 3: Основной ЯМР-сигнал + Экспоненциальное затухание ---
        // xRelative — расстояние от точки импульса (начинается с 0)
        const xRelative = x - signalStartX;

        // Формула затухания (decay = 0.007). Чем дальше вправо, тем ближе к 0
        const damping = Math.exp(-0.007 * xRelative);

        // Основная синусоида (частота = 0.18)
        const frequency = 0.18;
        const mainSignal = Math.sin(frequency * xRelative);

        // Добавляем остаточный микро-шум интернета/окружения (чтобы сигнал в конце не был стерильным)
        const backgroundNoise = (Math.sin(x * 2.5) * 2) * damping;

        y = centerY - (maxAmplitude * damping * mainSignal + backgroundNoise);
      }

      // Формируем SVG команду: M для старта, L для продолжения линии
      if (x === 0) {
        pathPoints.push(`M ${x.toFixed(1)} ${y.toFixed(1)}`);
      } else {
        pathPoints.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`);
      }
    }

    return pathPoints.join(" ");
  }, [pointsCount, centerY, width]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      xmlns="http://w3.org"
      aria-hidden="true"
    >
      {/* Фоновая сетка для красоты (опционально, можно удалить) */}
      <line x1="0" y1={centerY} x2={width} y2={centerY} stroke="#E2E5EA" strokeWidth="1" />
      
      {/* Единый совмещенный ЯМР сигнал (Шум -> Пик -> Затухание) */}
      <path
        className="waveform-path"
        d={dPath}
        stroke="#0E7C86"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
