import Link from "next/link";
import Countdown from "./components/Countdown";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />

      {/* HERO */}
      <section id="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />

        <div className="container hero-content">
          <div className="reveal">
            <div className="hero-tag tech-text">PRÓXIMA BATALLA — 11 SEP 2026</div>

            <h1 className="hero-title glitch" data-text="VICTORY RACE II">
              <span>VICTORY</span>
              <span>RACE II</span>
            </h1>

            <p className="hero-subtitle">
              <span className="text-yellow" style={{ fontFamily: "var(--font-tech)", fontWeight: 700 }}>{"// SYSTEM ONLINE"}</span><br />
              La élite del CrossFit se reúne en las sierras. Un escenario único,
              una comunidad imparable y el desafío técnico más exigente del año.
            </p>

            <Countdown />

            <div className="hero-actions" style={{ display: "flex", gap: 20 }}>
              <Link
                href="/inscripcion"
                className="btn btn-primary btn-glow"
                style={{ borderColor: "var(--yellow-acid)" }}
              >
                ASEGURÁ TU LUGAR (FASE 1)
              </Link>
              <Link
                href="/la-carrera"
                className="btn btn-outline"
                style={{ color: "var(--purple-neon)", boxShadow: "inset 0 0 0 2px var(--purple-neon)" }}
              >
                EXPLORAR DESAFÍO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS / TELEMETRÍA */}
      <section
        className="section"
        style={{
          background: "var(--black-soft)",
          borderTop: "2px solid var(--yellow-acid)",
          borderBottom: "2px solid var(--cyan-border)",
        }}
      >
        <div className="container">
          <div className="section-header reveal">
            <div className="tech-text text-yellow">[DATA.LINK]</div>
            <h2 className="section-title">TELEMETRÍA</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 30 }}>
            <div className="stat-card reveal stagger-1 tech-grid-bg">
              <div className="sys-ready-badge">ACTIVE</div>
              <div className="stat-number">500+</div>
              <div className="stat-label">ATLETAS REGISTRADOS</div>
              <p style={{ color: "var(--gray-light)", fontSize: "0.85rem", marginTop: 15 }}>
                La competencia atrae a la élite absoluta. Solo los mejores sobreviven al filtro.
              </p>
            </div>
            <div className="stat-card reveal stagger-2 tech-grid-bg">
              <div className="sys-ready-badge" style={{ color: "var(--purple-neon)", borderColor: "var(--purple-neon)" }}>
                WARNING
              </div>
              <div className="stat-number" style={{ color: "var(--yellow-acid)", textShadow: "2px 2px 0px var(--red-blood)" }}>
                15%
              </div>
              <div className="stat-label text-purple">TASA DE ABANDONO</div>
              <p style={{ color: "var(--gray-light)", fontSize: "0.85rem", marginTop: 15 }}>
                El castigo físico pondrá a prueba tu voluntad. No hay piedad en la arena.
              </p>
            </div>
            <div className="stat-card reveal stagger-3 tech-grid-bg">
              <div className="sys-ready-badge">ACTIVE</div>
              <div className="stat-number">03</div>
              <div className="stat-label">WODS EXTREMOS</div>
              <p style={{ color: "var(--gray-light)", fontSize: "0.85rem", marginTop: 15 }}>
                Diseñados para llevar tu frecuencia cardíaca al límite absoluto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-container">
        <div className="marquee">
          <span>SIN EXCUSAS / SIN LÁGRIMAS / THE FUTURE OF FITNESS / BRUTALIDAD ABSOLUTA /</span>
          <span>SIN EXCUSAS / SIN LÁGRIMAS / THE FUTURE OF FITNESS / BRUTALIDAD ABSOLUTA /</span>
          <span>SIN EXCUSAS / SIN LÁGRIMAS / THE FUTURE OF FITNESS / BRUTALIDAD ABSOLUTA /</span>
          <span>SIN EXCUSAS / SIN LÁGRIMAS / THE FUTURE OF FITNESS / BRUTALIDAD ABSOLUTA /</span>
        </div>
      </div>

      {/* PILLARS */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60 }}>
            <div className="step-card reveal stagger-1">
              <div className="tech-text" style={{ marginBottom: 15 }}>01. ESCENARIO ÉPICO</div>
              <h3 className="heading" style={{ marginBottom: 20 }}>PLAYÓN MUNICIPAL</h3>
              <p style={{ color: "var(--gray-light)" }}>
                Competí frente al lago en un entorno de alto rendimiento diseñado para llevarte al límite.
              </p>
            </div>
            <div className="step-card reveal stagger-2">
              <div className="tech-text" style={{ marginBottom: 15 }}>02. ALTA INTENSIDAD</div>
              <h3 className="heading" style={{ marginBottom: 20 }}>+500 ATLETAS</h3>
              <p style={{ color: "var(--gray-light)" }}>
                Individuales, duplas y equipos. Una estructura de competencia progresiva y justa para todos los niveles.
              </p>
            </div>
            <div className="step-card reveal stagger-3">
              <div className="tech-text" style={{ marginBottom: 15 }}>03. RECONOCIMIENTO</div>
              <h3 className="heading" style={{ marginBottom: 20 }}>LOGRÁ LA GLORIA</h3>
              <p style={{ color: "var(--gray-light)" }}>
                Premios exclusivos de sponsors internacionales y el prestigio de haber conquistado la Victory Race.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ACTION SHOT */}
      <section
        style={{ height: "60vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}
        role="img"
        aria-label="Atleta en plena competencia"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "url('https://files.catbox.moe/3ckn38.jpg') center/cover",
            backgroundAttachment: "local",
            filter: "brightness(0.4)",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div className="reveal">
            <h2 className="heading glitch" data-text="NO TE QUEDES AFUERA">
              NO TE QUEDES AFUERA
            </h2>
            <p className="tech-text" style={{ margin: "30px 0" }}>
              CUPOS LIMITADOS POR CATEGORÍA
            </p>
            <Link href="/inscripcion" className="btn btn-primary">
              ASEGURÁ TU CUPO
            </Link>
          </div>
        </div>
      </section>

      {/* IMAGE BREAK */}
      <div className="image-break">NO HAY ESCAPE</div>

      {/* SPONSORS */}
      <section className="section" id="sponsors">
        <div className="container">
          <div className="section-header reveal">
            <div className="tech-text">BACKED BY INDUSTRY LEADERS</div>
            <h2 className="section-title">PARTNERS 2026</h2>
          </div>

          <div className="sponsors-strip reveal">
            <a
              href="https://opussuplementos.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-tech)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--cyan)",
                  letterSpacing: "0.1em",
                  padding: "10px 20px",
                  border: "1px solid var(--cyan-border)",
                  borderRadius: "var(--border-radius-sm)",
                }}
              >
                OPUS
              </div>
            </a>
            <div className="tech-text" style={{ opacity: 0.2 }} aria-hidden="true">
              <span style={{ color: "var(--gray-mid)" }}>VELOCITY</span>
            </div>
            <div className="tech-text" style={{ opacity: 0.2 }} aria-hidden="true">
              <span style={{ color: "var(--gray-mid)" }}>NUTRIMAX</span>
            </div>
            <div className="tech-text" style={{ opacity: 0.2 }} aria-hidden="true">
              <span style={{ color: "var(--gray-mid)" }}>PRO-THLETES</span>
            </div>
            <div className="tech-text" style={{ opacity: 0.2 }} aria-hidden="true">
              <span style={{ color: "var(--gray-mid)" }}>CROSS-GEAR</span>
            </div>
          </div>
        </div>
      </section>

      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: "Victory Race II",
            description:
              "Competencia de CrossFit de alta intensidad en Villa Carlos Paz. Segunda edición.",
            startDate: "2026-09-11T08:00:00-03:00",
            endDate: "2026-09-11T20:00:00-03:00",
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: "Playón Municipal Villa Carlos Paz",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Illia y San Martín",
                addressLocality: "Villa Carlos Paz",
                addressRegion: "Córdoba",
                postalCode: "5152",
                addressCountry: "AR",
              },
            },
            image: ["https://victoryrace.pages.dev/assets/img/hero-bg.jpg"],
            organizer: {
              "@type": "Organization",
              name: "Victory Race",
              url: "https://victoryrace.pages.dev/",
            },
            offers: {
              "@type": "Offer",
              url: "https://victoryrace.pages.dev/inscripcion",
              price: 50000,
              priceCurrency: "ARS",
              availability: "https://schema.org/InStock",
              validFrom: "2026-03-01",
            },
          }),
        }}
      />
    </>
  );
}
