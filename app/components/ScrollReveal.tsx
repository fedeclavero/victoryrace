'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated', 'active');
          }
        });
      },
      { threshold: 0.15 }
    );

    if (prefersReducedMotion) {
      reveals.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
    } else {
      reveals.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
