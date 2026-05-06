import ScrollReveal from "../components/ScrollReveal";

export default function Wods() {
  return (
    <>
      <ScrollReveal />

      <section className="section section-internal" style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}>
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: "center" }}>
            <div className="tech-text">CLASSIFIED PROTOCOLS</div>
            <h1 className="section-title">WORKOUTS</h1>
          </div>

          <div className="reveal" style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
            <div className="card" style={{ padding: "80px 40px", textAlign: "center", border: "1px solid rgba(0, 242, 255, 0.1)", background: "rgba(5,5,5,0.8)", overflow: "hidden" }}>
              <div style={{ fontSize: "4rem", marginBottom: 30, filter: "drop-shadow(0 0 10px var(--cyan))" }}>⚡</div>
              <h3 className="heading" style={{ color: "var(--cyan)", marginBottom: 25, letterSpacing: 2 }}>ENCRIPTADO</h3>

              <p style={{ color: "var(--gray-light)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 50, maxWidth: 600, marginLeft: "auto", marginRight: "auto", fontWeight: 300 }}>
                Los desafíos técnicos de la edición 2026 están bajo fases finales de testeo.
                La revelación oficial se realizará de forma progresiva a través de nuestras plataformas digitales.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 60 }}>
                <div className="reveal stagger-1" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "30px 15px", borderRadius: "var(--border-radius-sm)", opacity: 0.5 }}>
                  <div className="heading" style={{ fontSize: "1.5rem", marginBottom: 10 }}>WOD 01</div>
                  <div className="tech-text" style={{ fontSize: "0.5rem", color: "var(--gray-light)" }}>LEVEL: LOCKED</div>
                </div>
                <div className="reveal stagger-2" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "30px 15px", borderRadius: "var(--border-radius-sm)", opacity: 0.5 }}>
                  <div className="heading" style={{ fontSize: "1.5rem", marginBottom: 10 }}>WOD 02</div>
                  <div className="tech-text" style={{ fontSize: "0.5rem", color: "var(--gray-light)" }}>LEVEL: LOCKED</div>
                </div>
                <div className="reveal stagger-3" style={{ background: "var(--cyan-glow)", border: "1px solid var(--cyan-border)", padding: "30px 15px", borderRadius: "var(--border-radius-sm)" }}>
                  <div className="heading" style={{ fontSize: "1.5rem", marginBottom: 10, color: "var(--cyan)" }}>WOD 03</div>
                  <div className="tech-text" style={{ fontSize: "0.5rem", color: "var(--cyan)" }}>ENCRYPTED</div>
                </div>
              </div>

              <div style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="tech-text" style={{ fontSize: "0.7rem", color: "var(--white)", marginBottom: 15 }}>MANTENETE ALERTA</div>
                <p style={{ fontSize: "0.9rem", color: "var(--gray-light)", fontStyle: "italic", letterSpacing: 1 }}>&quot;PREPARATE PARA LO INESPERADO.&quot;</p>
              </div>

              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2, background: "var(--cyan)", opacity: 0.2, pointerEvents: "none" }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
