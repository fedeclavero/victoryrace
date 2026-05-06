import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              VICTORY<span>RACE</span>
            </Link>
            <p style={{ color: 'var(--gray-light)', marginTop: 30, fontWeight: 300 }}>
              Redefiniendo el CrossFit competitivo en Argentina. Una experiencia que une comunidad, fuerza y resiliencia en un solo lugar.
            </p>
            <div className="social-links">
              <a href="https://www.instagram.com/victoryrace.arg/" className="social-icon" target="_blank" rel="noopener" aria-label="Victory Race en Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" fill="currentColor">
                  <rect width="308" height="308" x="102" y="102" rx="81" fill="none" stroke="currentColor" strokeWidth="30" />
                  <circle cx="256" cy="256" r="72" fill="none" stroke="currentColor" strokeWidth="30" />
                  <circle cx="347" cy="165" r="6" fill="currentColor" />
                </svg>
              </a>
              <a href="https://wa.me/5493541690852" className="social-icon" target="_blank" rel="noopener" aria-label="Contactar a Victory Race por WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" fill="currentColor">
                  <path d="m79 434 25.7-93.9a181.1 181.2 0 1170.3 68.7M122.5 391l57-15a150.6 150.6 0 10-41.8-40.6m93-127c2 5 0 10-11 22.2-6 6-4 8 6.6 23s28 29 44 36.5 15 7 21.7-1c15-17 11-21 26-14.2l27 13c8 4 8.4 4 8.5 9s-1.7 18-7 23.6-25 24.8-60 12-59-23-99-77-1.6-86 3.6-88 7-1.5 17-1.3q4 0 7 5" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="heading" style={{ marginBottom: 30, color: 'var(--cyan)' }}>NAVEGACIÓN</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 15 }}>
              <li><Link href="/la-carrera" className="tech-text" style={{ textDecoration: 'none', color: 'var(--gray-light)' }}>La Carrera</Link></li>
              <li><Link href="/categorias" className="tech-text" style={{ textDecoration: 'none', color: 'var(--gray-light)' }}>Categorías</Link></li>
              <li><Link href="/wods" className="tech-text" style={{ textDecoration: 'none', color: 'var(--gray-light)' }}>WODs</Link></li>
              <li><Link href="/galeria" className="tech-text" style={{ textDecoration: 'none', color: 'var(--gray-light)' }}>Galería</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="heading" style={{ marginBottom: 30, color: 'var(--cyan)' }}>CONEXIÓN</h4>
            <p className="tech-text" style={{ color: 'var(--gray-light)', display: 'block', marginBottom: 10 }}>Villa Carlos Paz, Córdoba</p>
            <p className="tech-text" style={{ color: 'var(--white)' }}>victoryrace.arg@gmail.com</p>
            <div style={{ marginTop: 40, padding: 20, border: '1px solid var(--cyan-border)', borderRadius: 'var(--border-radius-sm)' }}>
              <p className="tech-text" style={{ fontSize: '0.5rem', color: 'var(--cyan)' }}>POWERED BY OPUS</p>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 100, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <p className="tech-text" style={{ fontSize: '0.5rem', color: 'var(--gray-light)' }}>© 2026 VICTORY RACE — THE FUTURE OF FITNESS — ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
}
