import ScrollReveal from "../components/ScrollReveal";

export default function LaCarrera() {
  return (
    <>
      <ScrollReveal />

      <section className="section page-content" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: "-10%", width: "50%", height: "100%", background: "radial-gradient(circle at center, rgba(0, 242, 255, 0.05) 0%, transparent 70%)", zIndex: -1 }} />

        <div className="container">
          <div className="section-header reveal">
            <div className="tech-text">THE MISSION</div>
            <h1 className="section-title">EL DESAFÍO</h1>
            <p style={{ marginTop: 40, color: "var(--gray-light)", fontSize: "1.2rem", maxWidth: 850, lineHeight: 1.8, fontWeight: 300 }}>
              Victory Race no es solo una competencia; es el epicentro de la comunidad física en las sierras.
              Nuestra misión es elevar el estándar del CrossFit competitivo en Argentina, fusionando un entorno
              natural imponente con una programación técnica de clase mundial.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40 }}>
            <div className="card reveal stagger-1">
              <div className="tech-text" style={{ color: "var(--cyan)", marginBottom: 20 }}>01. EXIGENCIA TÉCNICA</div>
              <h3 className="heading" style={{ marginBottom: 20 }}>PROGRAMACIÓN PRO</h3>
              <p style={{ color: "var(--gray-light)" }}>Workouts diseñados meticulosamente para testear cada dominio del fitness: potencia, resistencia y agilidad mental.</p>
            </div>
            <div className="card reveal stagger-2">
              <div className="tech-text" style={{ color: "var(--cyan)", marginBottom: 20 }}>02. ESPÍRITU COMUNITARIO</div>
              <h3 className="heading" style={{ marginBottom: 20 }}>ARENA PARA TODOS</h3>
              <p style={{ color: "var(--gray-light)" }}>Desde el atleta de élite hasta el amateur apasionado, todos comparten el mismo aliento en una arena vibrante.</p>
            </div>
            <div className="card reveal stagger-3">
              <div className="tech-text" style={{ color: "var(--cyan)", marginBottom: 20 }}>03. INTEGRIDAD & JUECEO</div>
              <h3 className="heading" style={{ marginBottom: 20 }}>GLORIA LEGÍTIMA</h3>
              <p style={{ color: "var(--gray-light)" }}>Estándares rigurosos y transparencia total en cada repetición. Si lo lograste, es porque diste el 100%.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CRONOGRAMA */}
      <section className="section" style={{ background: "var(--black-soft)", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <div className="container">
          <div className="section-header reveal">
            <div className="tech-text">THE TIMELINE</div>
            <h2 className="section-title">CRONOGRAMA</h2>
          </div>

          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="reveal" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 40, marginBottom: 60 }}>
              <div className="heading" style={{ fontSize: "2.5rem", color: "var(--cyan)", textAlign: "right" }}>08:00</div>
              <div style={{ borderLeft: "1px solid var(--cyan-border)", paddingLeft: 40, position: "relative" }}>
                <div style={{ position: "absolute", left: -5, top: 15, width: 10, height: 10, background: "var(--cyan)", borderRadius: "50%", boxShadow: "0 0 15px var(--cyan)" }} />
                <h4 className="heading" style={{ fontSize: "1.5rem", marginBottom: 10 }}>ACREDITACIÓN</h4>
                <p style={{ color: "var(--gray-light)" }}>Check-in de atletas, entrega de kits oficiales y verificación final de documentación.</p>
              </div>
            </div>

            <div className="reveal" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 40, marginBottom: 60 }}>
              <div className="heading" style={{ fontSize: "2.5rem", color: "var(--gray-light)", textAlign: "right" }}>10:00</div>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.05)", paddingLeft: 40 }}>
                <h4 className="heading" style={{ fontSize: "1.5rem", marginBottom: 10 }}>BRIEFING TÉCNICO</h4>
                <p style={{ color: "var(--gray-light)" }}>Explicación detallada de WODs, estándares de movimiento y dudas reglamentarias.</p>
              </div>
            </div>

            <div className="reveal" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 40, marginBottom: 60 }}>
              <div className="heading" style={{ fontSize: "2.5rem", color: "var(--cyan)", textAlign: "right" }}>11:30</div>
              <div style={{ borderLeft: "1px solid var(--cyan-border)", paddingLeft: 40, position: "relative" }}>
                <div style={{ position: "absolute", left: -5, top: 15, width: 10, height: 10, background: "var(--cyan)", borderRadius: "50%", boxShadow: "0 0 15px var(--cyan)" }} />
                <h4 className="heading" style={{ fontSize: "1.5rem", marginBottom: 10 }}>HEAT 1 — OPENING</h4>
                <p style={{ color: "var(--gray-light)" }}>Inicio de la competencia oficial. La arena cobra vida en el Playón Municipal.</p>
              </div>
            </div>

            <div className="reveal" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 40 }}>
              <div className="heading" style={{ fontSize: "2.5rem", color: "var(--gray-light)", textAlign: "right" }}>19:00</div>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.05)", paddingLeft: 40 }}>
                <h4 className="heading" style={{ fontSize: "1.5rem", marginBottom: 10 }}>PREMIACIÓN</h4>
                <p style={{ color: "var(--gray-light)" }}>Consagración de los campeones de cada categoría y cierre épico de la edición 2026.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
