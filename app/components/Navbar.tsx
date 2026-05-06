'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'INICIO' },
  { href: '/la-carrera', label: 'EL DESAFÍO' },
  { href: '/categorias', label: 'CATEGORÍAS' },
  { href: '/wods', label: 'WORKOUTS' },
  { href: '/galeria', label: 'GALERÍA' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1000);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (!isMobile && menuOpen) {
        setMenuOpen(false);
        document.body.classList.remove('no-scroll');
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen, isMobile]);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('no-scroll');
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const openMenu = () => {
    setMenuOpen(true);
    document.body.classList.add('no-scroll');
  };

  const toggleMenu = () => {
    if (menuOpen) closeMenu();
    else openMenu();
  };

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''} aria-label="Navegación principal">
      <div className="container">
        <div className="nav-inner">
          <div className="nav-left">
            <Link href="/" className="logo" aria-label="Victory Race — Inicio">
              VICTORY<span>RACE</span>
            </Link>
          </div>

          <ul className={`nav-links${isMobile ? ' mobile' : ''}${menuOpen ? ' active' : ''}`}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={pathname === href ? 'active' : ''}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="nav-cta-mobile">
              <Link href="/inscripcion" className="btn btn-primary" onClick={closeMenu}>
                RESERVÁ TU LUGAR
              </Link>
            </li>
          </ul>

          <div className="nav-right">
            <Link href="/inscripcion" className="btn btn-primary nav-cta-desktop nav-cta">
              <span className="btn">RESERVÁ TU LUGAR</span>
            </Link>
            <div
              className={`menu-trigger${menuOpen ? ' active' : ''}`}
              id="mobile-menu-trigger"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              role="button"
              tabIndex={0}
              onClick={toggleMenu}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleMenu();
                }
              }}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
