'use client';

import { useEffect, useRef } from 'react';

export default function BgMusic() {
  const musicStarted = useRef(false);

  useEffect(() => {
    if (typeof Audio === 'undefined') return;

    const bgMusic = new Audio('/assets/audio/bg-music.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.5;

    const startMusic = () => {
      if (musicStarted.current) return;
      bgMusic.play().then(() => {
        musicStarted.current = true;
      }).catch(() => {});
    };

    document.addEventListener('click', startMusic, { once: false });
    document.addEventListener('touchstart', startMusic, { once: false });
    document.addEventListener('keydown', startMusic, { once: false });

    return () => {
      document.removeEventListener('click', startMusic);
      document.removeEventListener('touchstart', startMusic);
      document.removeEventListener('keydown', startMusic);
      bgMusic.pause();
      bgMusic.src = '';
    };
  }, []);

  return null;
}
