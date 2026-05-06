"use client";

import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";

const GALLERY_IMAGES = [
  { src: "https://iili.io/BM3ChDF.jpg", alt: "Atletas compitiendo en el Playón Municipal de Villa Carlos Paz" },
  { src: "https://iili.io/BM3nNm7.jpg", alt: "Competencia de alto rendimiento en arena Victory Race" },
  { src: "https://iili.io/BM3nimP.jpg", alt: "Atletas en plena competencia durante Victory Race II" },
  { src: "https://iili.io/BM3osa4.jpg", alt: "Movimientos técnicos en el área de competencia" },
  { src: "https://iili.io/BM3xfwP.jpg", alt: "Esfuerzo y determinación en cada repetición" },
  { src: "https://iili.io/BM3x5NI.jpg", alt: "Ambiente competitivo en el Playón Municipal" },
  { src: "https://iili.io/BM3xkKb.jpg", alt: "Comunidad y espíritu deportivo en Victory Race" },
  { src: "https://iili.io/BM3xsig.jpg", alt: "Workout de alta intensidad en la arena" },
  { src: "https://iili.io/BM3zdsn.jpg", alt: "Atletas dando todo en cada heat" },
  { src: "https://iili.io/BM3zIse.jpg", alt: "Premio y reconocimientos Victory Race II" },
  { src: "https://iili.io/BM3zwep.jpg", alt: "Competidor en plena final del evento" },
  { src: "https://iili.io/BM3zQh7.jpg", alt: "Vista del Playón Municipal con competidores" },
  { src: "https://iili.io/BM3IFQ1.jpg", alt: "Éxito y logro en la competencia" },
  { src: "https://iili.io/BM3IN3b.jpg", alt: "Energía y pasión del CrossFit competitivo" },
  { src: "https://iili.io/BM3TCo7.jpg", alt: "Compañerismo y trabajo en equipo en la arena" },
  { src: "https://iili.io/BM3Tkfn.jpg", alt: "Rendimiento máximo en cada workout" },
  { src: "https://iili.io/BM3TbJj.jpg", alt: "Fair play y respeto entre competidores" },
  { src: "https://iili.io/BM3u7dG.jpg", alt: "Superación personal en Victory Race" },
  { src: "https://iili.io/BM3uNmQ.jpg", alt: "Cierre épico de la jornada competitiva" },
  { src: "https://iili.io/BM3AqG9.jpg", alt: "Celebración y victoria en la gran final" },
];

export default function Galeria() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <ScrollReveal />

      {/* LIGHTBOX */}
      {lightboxSrc && (
        <div
          className="lightbox active"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="close-lightbox"
            onClick={() => setLightboxSrc(null)}
            aria-label="Cerrar visor de imagen"
          >
            &times;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxSrc}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <section className="section page-content">
        <div className="container">
          <div className="section-header reveal">
            <div className="tech-text">THE ARENA FEED</div>
            <h1 className="section-title">GALERÍA</h1>
            <p style={{ marginTop: 30, color: "var(--gray-light)", fontSize: "1.1rem", maxWidth: 600 }}>
              Capturando la esencia del rendimiento puro. Cada imagen cuenta una historia de superación y fuerza colectiva.
            </p>
          </div>

          <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="gallery-item reveal"
                style={{ position: "relative", overflow: "hidden", borderRadius: "var(--border-radius-md)", background: "var(--gray-dark)", cursor: "pointer" }}
                onClick={() => setLightboxSrc(img.src)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  width={640}
                  height={480}
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", transition: "all 0.6s var(--ease-smooth)" }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="gallery-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0, 242, 255, 0.3), transparent)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "all 0.4s var(--ease-smooth)" }}>
                  <span className="tech-text">EXPANDIR</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
