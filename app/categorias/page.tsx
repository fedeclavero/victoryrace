import ScrollReveal from "../components/ScrollReveal";

export default function Categorias() {
  return (
    <>
      <ScrollReveal />

      <section className="section page-content">
        <div className="container">
          <div className="section-header reveal">
            <div className="tech-text">CLASSIFICATION SYSTEM</div>
            <h1 className="section-title">CATEGORÍAS</h1>
            <p style={{ marginTop: 30, color: "var(--gray-light)", fontSize: "1.1rem", maxWidth: 700 }}>
              Seleccioná tu nivel de batalla. Cada categoría cuenta con estándares específicos diseñados
              para garantizar una competencia justa, desafiante y épica.
            </p>
          </div>

          {/* INDIVIDUAL */}
          <div style={{ marginBottom: 120 }}>
            <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
              <span className="tech-text" style={{ color: "var(--white)", background: "var(--cyan-border)", padding: "5px 15px", borderRadius: 50 }}>MODALIDAD A</span>
              <h2 className="heading">INDIVIDUAL</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 30 }}>
              <div className="card reveal stagger-1">
                <h3 className="heading" style={{ color: "#00ff88" }}>RECREATIVO</h3>
                <div className="tech-text" style={{ fontSize: "0.6rem", color: "var(--gray-light)", margin: "15px 0" }}>ENTRY LEVEL</div>
                <p style={{ color: "var(--gray-light)", fontSize: "0.95rem", marginBottom: 30 }}>
                  Para atletas que buscan su primera experiencia competitiva. Enfoque en la técnica y la comunidad.
                </p>
                <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", fontFamily: "var(--font-tech)", fontSize: "0.7rem" }}>
                  HOMBRE / MUJER
                </div>
              </div>

              <div className="card reveal stagger-2">
                <h3 className="heading" style={{ color: "#f1c40f" }}>INTERMEDIO</h3>
                <div className="tech-text" style={{ fontSize: "0.6rem", color: "var(--gray-light)", margin: "15px 0" }}>MAINSTREAM LEVEL</div>
                <p style={{ color: "var(--gray-light)", fontSize: "0.95rem", marginBottom: 30 }}>
                  Atletas con dominio de la mayoría de los skills y pesos moderados. El corazón de la competencia.
                </p>
                <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", fontFamily: "var(--font-tech)", fontSize: "0.7rem" }}>
                  HOMBRE / MUJER
                </div>
              </div>

              <div className="card reveal stagger-3" style={{ borderBottom: "2px solid var(--cyan-border)" }}>
                <h3 className="heading" style={{ color: "var(--cyan)" }}>AVANZADO</h3>
                <div className="tech-text" style={{ fontSize: "0.6rem", color: "var(--gray-light)", margin: "15px 0" }}>ELITE LEVEL</div>
                <p style={{ color: "var(--gray-light)", fontSize: "0.95rem", marginBottom: 30 }}>
                  Sin filtros. Estándares máximos, movimientos complejos y pesos exigentes. Solo para los más fuertes.
                </p>
                <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", fontFamily: "var(--font-tech)", fontSize: "0.7rem" }}>
                  HOMBRE / MUJER
                </div>
              </div>
            </div>
          </div>

          {/* EQUIPOS */}
          <div style={{ marginBottom: 100 }}>
            <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
              <span className="tech-text" style={{ color: "var(--white)", background: "var(--cyan-border)", padding: "5px 15px", borderRadius: 50 }}>MODALIDAD B</span>
              <h2 className="heading">EQUIPOS (DUPLAS)</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 30 }}>
              <div className="card reveal stagger-1">
                <h3 className="heading" style={{ color: "#00ff88" }}>PRINCIPIANTE</h3>
                <div className="tech-text" style={{ fontSize: "0.6rem", color: "var(--gray-light)", margin: "15px 0" }}>TEAM START</div>
                <p style={{ color: "var(--gray-light)", fontSize: "0.95rem", marginBottom: 30 }}>
                  Duplas que buscan divertirse y superarse juntas. Requiere sincronización básica y mucha energía.
                </p>
                <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", fontFamily: "var(--font-tech)", fontSize: "0.7rem" }}>
                  MASC / FEM / MIXTO
                </div>
              </div>

              <div className="card reveal stagger-2">
                <h3 className="heading" style={{ color: "#f1c40f" }}>INTERMEDIO</h3>
                <div className="tech-text" style={{ fontSize: "0.6rem", color: "var(--gray-light)", margin: "15px 0" }}>DYNAMIC DUO</div>
                <p style={{ color: "var(--gray-light)", fontSize: "0.95rem", marginBottom: 30 }}>
                  Duplas con experiencia que dominan el trabajo sincronizado y skills técnicos intermedios.
                </p>
                <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", fontFamily: "var(--font-tech)", fontSize: "0.7rem" }}>
                  MASC / FEM / MIXTO
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="section" style={{ background: "var(--black-soft)", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="reveal">
            <h2 className="heading" style={{ marginBottom: 30 }}>¿DUDAS SOBRE TU NIVEL?</h2>
            <p style={{ color: "var(--gray-light)", marginBottom: 40, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
              Si no estás seguro de en qué categoría anotarte, escribinos. Te ayudamos a encontrar tu mejor lugar dentro de la arena.
            </p>
            <a href="https://wa.me/5493541690852" className="btn btn-outline" target="_blank" rel="noopener noreferrer" style={{ padding: "20px 50px" }}>
              CONSULTAR POR WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Cuáles son las categorías de Victory Race II?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hay dos modalidades: Individual (Recreativo, Intermedio, Avanzado) y Equipos/Duplas (Principiante, Intermedio). Cada categoría tiene subdivisiones por género."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuánto cuesta la inscripción?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "La inscripción para individual es de $50.000 ARS y para equipos (duplas) es de $90.000 ARS."
                }
              }
            ]
          }),
        }}
      />
    </>
  );
}
