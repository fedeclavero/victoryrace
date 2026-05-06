'use client';

import { useEffect, useState, useRef } from 'react';

const RACE_DATE = new Date("2026-09-11T08:00:00").getTime();

export default function Countdown() {
  const [display, setDisplay] = useState("SINCRONIZANDO CRONÓMETRO...");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const dist = RACE_DATE - now;

      if (dist < 0) {
        setDisplay("EL DESAFÍO HA COMENZADO");
        return;
      }

      const d = Math.floor(dist / (1000 * 60 * 60 * 24));
      const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((dist % (1000 * 60)) / 1000);

      setDisplay(`${d}D / ${h}H / ${m}M / ${s}S`);
    };

    update();
    intervalRef.current = setInterval(update, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return <div className="countdown-minimal tech-text">{display}</div>;
}
