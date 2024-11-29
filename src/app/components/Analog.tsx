import React, { useEffect, useRef } from 'react';
import { WstTime } from '../hooks/useWstClock';

export const Analog = ({ time }: { time: WstTime }) => {
  const clockRef = useRef<HTMLDivElement>(null);

  const HALF_DAY_MILLISECONDS = 43200000;
  const HOUR_MILLISECONDS = 3600000;
  const MINUTE_MILLISECONDS = 60000;

  const toDegree = (time: number, base: number) => (time % base) / base * 360 + 180;

  useEffect(() => {
    if (!clockRef.current) return;

    const offset = new Date().getTimezoneOffset() * 60000;
    const degHour = toDegree(time.unix - offset, HALF_DAY_MILLISECONDS);
    const degMin = toDegree(time.unix, HOUR_MILLISECONDS);
    const degSec = toDegree(time.unix, MINUTE_MILLISECONDS);

    clockRef.current.style.setProperty("--degHour", `${degHour}deg`);
    clockRef.current.style.setProperty("--degMin", `${degMin}deg`);
    clockRef.current.style.setProperty("--degSec", `${degSec}deg`);
  }, [time]);

  return (
    <div className="flex justify-center">
      <div ref={clockRef} className="relative w-64 h-64 rounded-full border-4 border-gray-800 bg-white">
        {/* Clock numbers */}
        {[...Array(12)].map((_, i) => {
          const angle = ((i + 1) * 30 * Math.PI) / 180;
          const x = Math.sin(angle) * 100;
          const y = -Math.cos(angle) * 100;
          return (
            <div
              key={i}
              className="absolute font-bold text-lg transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            >
              {i + 1}
            </div>
          );
        })}

        {/* Clock hands */}
        <div className="absolute inset-0">
          {/* Hour hand */}
          <div
            className="absolute left-1/2 top-1/2 will-change-transform -translate-x-1/2 origin-top w-1.5 h-16 bg-black"
            style={{ transform: `rotate(var(--degHour))` }}
          />

          {/* Minute hand */}
          <div
            className="absolute left-1/2 top-1/2 will-change-transform -translate-x-1/2 origin-top w-1 h-20 bg-black"
            style={{ transform: `rotate(var(--degMin))` }}
          />

          {/* Second hand */}
          <div
            className="absolute left-1/2 top-1/2 will-change-transform -translate-x-1/2 origin-top w-0.5 h-24 bg-red-500"
            style={{ transform: `rotate(var(--degSec))` }}
          />

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-black -translate-x-1/2 -translate-y-1/2 z-10" />
        </div>
      </div>
    </div>
  );
};
