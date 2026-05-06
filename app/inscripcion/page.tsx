"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzBWqLv7mToPvKJU5dwcWHGyByXh_Q1MgNUsMdRQjPc13EjRUP-Swqi3ZvM4z-2fv3R/exec";
const BANK_ALIAS = "erick.cabrera.11";
const PRICE_INDIVIDUAL = 50000;
const PRICE_TEAM = 90000;

const CATEGORY_TREE: Record<string, Record<string, string[]>> = {
  individual: {
    recreativo: ["Hombre", "Mujer"],
    intermedio: ["Hombre", "Mujer"],
    avanzado: ["Hombre", "Mujer"],
  },
  equipo: {
    principiante: ["Masculino", "Femenino", "Mixto"],
    intermedio: ["Masculino", "Femenino", "Mixto"],
  },
};

export default function Inscripcion() {
  const [step, setStep] = useState(1);
  const [tipo, setTipo] = useState("");
  const [nivel, setNivel] = useState("");
  const [genero, setGenero] = useState("");
  const [aptos, setAptos] = useState<{ atleta1: string; atleta2: string }>({
    atleta1: "",
    atleta2: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const deslindeRef = useRef<HTMLDivElement>(null);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  // Watch deslinde scroll
  useEffect(() => {
    const el = deslindeRef.current;
    if (!el) return;
    const check = () => {
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
      if (atBottom) setDisclaimerAccepted(true);
    };
    el.addEventListener("scroll", check);
    return () => el.removeEventListener("scroll", check);
  }, [step]);

  const updatePrice = () => (tipo === "individual" ? PRICE_INDIVIDUAL : PRICE_TEAM);

  const canProceedStep2 = tipo && nivel;
  const canProceedStep3 = tipo === "individual" ? !!aptos.atleta1 : !!(aptos.atleta1 && aptos.atleta2);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      tipo,
      categoria: `${nivel} ${genero}`,
      ...data,
      aptoMedico1: aptos.atleta1,
      aptoMedico2: aptos.atleta2,
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });
      setConfirmName(data.nombre as string || "");
      setShowConfirmation(true);
    } catch {
      setErrorMsg("Error al enviar. Por favor reintentá o escribinos por WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderRanks = () => {
    const ranks = Object.keys(CATEGORY_TREE[tipo] || {});
    return ranks.map((r) => (
      <div
        key={r}
        className={`categoria-card card${nivel === r ? " selected" : ""}`}
        data-value={r}
        onClick={() => { setNivel(r); setGenero(""); }}
        style={{ padding: 30, cursor: "pointer", textAlign: "center" }}
      >
        <span className="heading">{r}</span>
      </div>
    ));
  };

  const renderGenders = () => {
    if (!tipo || !nivel) return null;
    const genders = CATEGORY_TREE[tipo]?.[nivel] || [];
    return genders.map((g) => (
      <div
        key={g}
        className={`categoria-card card${genero === g ? " selected" : ""}`}
        onClick={() => setGenero(g)}
        style={{ padding: 30, cursor: "pointer", textAlign: "center" }}
      >
        <span className="heading">{g}</span>
      </div>
    ));
  };

  if (showConfirmation) {
    return (
      <div className="confirmation-storm active">
        <div className="storm-content" id="storm-content" style={{ opacity: 1, transform: "scale(1)" }}>
          <h1 className="storm-title">INSCRIPCIÓN RECIBIDA</h1>
          <p className="storm-subtitle">PREPARATE PARA LA GUERRA</p>
          <p style={{ color: "var(--gray-light)", marginBottom: 10 }}>Gracias {confirmName}. Tu lugar está casi asegurado.</p>
          <div className="storm-payment-card" style={{ opacity: 1, transform: "translateY(0)" }}>
            <span className="tech-text">PRÓXIMO PASO: PAGO</span>
            <p style={{ color: "var(--gray-light)", marginBottom: 10 }}>Realizá la transferencia a:</p>
            <div className="storm-alias">ALIAS: {BANK_ALIAS}</div>
            <p style={{ fontSize: "0.8rem", color: "var(--gray-light)" }}>Una vez realizado, enviá el comprobante por WhatsApp.</p>
          </div>
          <div className="storm-cta">
            <a href="https://wa.me/5493541690852" className="btn btn-primary btn-glow" target="_blank" rel="noopener noreferrer">
              ENVIAR COMPROBANTE
            </a>
          </div>
          <Link href="/" className="storm-home-link">VOLVER AL INICIO</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollReveal />

      <section className="section page-content">
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: "center" }}>
            <div className="tech-text">SECURE REGISTRATION</div>
            <h1 className="section-title">INSCRIPCIÓN</h1>
          </div>

          <div className="reveal" id="registration-container" style={{ maxWidth: 1000, margin: "0 auto", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "var(--border-radius-lg)", overflow: "hidden", backdropFilter: "blur(20px)", position: "relative", zIndex: 10 }}>

            <div style={{ height: 4, background: "rgba(255,255,255,0.05)", position: "relative" }}>
              <div className="registration-progress-bar" style={{ width: `${(step / 4) * 100}%` }} />
            </div>

            <form id="inscription-form" style={{ padding: 60 }} onSubmit={submitForm}>
              <div className="form-steps-container">

                {errorMsg && (
                  <div style={{ background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.4)", padding: "15px 20px", borderRadius: 8, marginBottom: 20, color: "#ff6b6b", fontFamily: "var(--font-tech)", fontSize: "0.75rem", textAlign: "center" }}>
                    {errorMsg}
                  </div>
                )}

                {/* STEP 1 */}
                <div className={`form-step${step === 1 ? " active" : ""}`} data-step="1" style={{ display: step === 1 ? "block" : "none" }}>
                  <h3 className="heading" style={{ color: "var(--cyan)", marginBottom: 40 }}>DATOS PERSONALES</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 30 }}>
                    <div><label className="tech-text" htmlFor="nombre" style={{ fontSize: "0.6rem" }}>NOMBRE *</label><input type="text" id="nombre" name="nombre" className="input-field" required placeholder="TU NOMBRE" autoComplete="given-name" /></div>
                    <div><label className="tech-text" htmlFor="apellido" style={{ fontSize: "0.6rem" }}>APELLIDO *</label><input type="text" id="apellido" name="apellido" className="input-field" required placeholder="TU APELLIDO" autoComplete="family-name" /></div>
                    <div><label className="tech-text" htmlFor="dni" style={{ fontSize: "0.6rem" }}>DNI *</label><input type="text" id="dni" name="dni" className="input-field" required placeholder="SOLO NÚMEROS" pattern="[0-9]{7,8}" autoComplete="off" /></div>
                    <div><label className="tech-text" htmlFor="fechaNacimiento" style={{ fontSize: "0.6rem" }}>FECHA NACIMIENTO *</label><input type="date" id="fechaNacimiento" name="fechaNacimiento" className="input-field" required /></div>
                    <div><label className="tech-text" htmlFor="email" style={{ fontSize: "0.6rem" }}>EMAIL *</label><input type="email" id="email" name="email" className="input-field" required placeholder="TU@EMAIL.COM" autoComplete="email" /></div>
                    <div><label className="tech-text" htmlFor="telefono" style={{ fontSize: "0.6rem" }}>WHATSAPP *</label><input type="tel" id="telefono" name="telefono" className="input-field" required placeholder="+54 9 ..." autoComplete="tel" /></div>
                    <div><label className="tech-text" htmlFor="ciudad" style={{ fontSize: "0.6rem" }}>CIUDAD *</label><input type="text" id="ciudad" name="ciudad" className="input-field" required placeholder="EJ: CÓRDOBA" autoComplete="address-level2" /></div>
                    <div><label className="tech-text" htmlFor="equipoGimnasio" style={{ fontSize: "0.6rem" }}>BOX / EQUIPO</label><input type="text" id="equipoGimnasio" name="equipoGimnasio" className="input-field" placeholder="NOMBRE DE TU BOX" autoComplete="organization" /></div>
                  </div>
                  <div style={{ marginTop: 60, display: "flex", justifyContent: "flex-end" }}>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>SIGUIENTE PASO</button>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className={`form-step${step === 2 ? " active" : ""}`} data-step="2" style={{ display: step === 2 ? "block" : "none" }}>
                  <h3 className="heading" style={{ color: "var(--cyan)", marginBottom: 40 }}>ELEGÍ TU CATEGORÍA</h3>

                  <div style={{ marginBottom: 50 }}>
                    <div className="tech-text" style={{ marginBottom: 20, opacity: 0.5 }}>01. SELECCIONÁ MODALIDAD</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                      <div className={`card categoria-card${tipo === "individual" ? " selected" : ""}`} onClick={() => { setTipo("individual"); setNivel(""); setGenero(""); setAptos({ atleta1: "", atleta2: "" }); }} style={{ padding: 30, cursor: "pointer", textAlign: "center" }}>
                        <span style={{ fontSize: "2rem", display: "block", marginBottom: 10 }}>🏃</span>
                        <span className="heading">INDIVIDUAL</span>
                      </div>
                      <div className={`card categoria-card${tipo === "equipo" ? " selected" : ""}`} onClick={() => { setTipo("equipo"); setNivel(""); setGenero(""); setAptos({ atleta1: "", atleta2: "" }); }} style={{ padding: 30, cursor: "pointer", textAlign: "center" }}>
                        <span style={{ fontSize: "2rem", display: "block", marginBottom: 10 }}>👥</span>
                        <span className="heading">DUPLA</span>
                      </div>
                    </div>
                  </div>

                  {tipo && (
                    <div style={{ marginBottom: 50 }}>
                      <div className="tech-text" style={{ marginBottom: 20, opacity: 0.5 }}>02. SELECCIONÁ NIVEL</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 15 }}>
                        {renderRanks()}
                      </div>
                    </div>
                  )}

                  {nivel && (
                    <div>
                      <div className="tech-text" style={{ marginBottom: 20, opacity: 0.5 }}>03. SELECCIONÁ GÉNERO / MIX</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 15 }}>
                        {renderGenders()}
                      </div>
                    </div>
                  )}

                  {tipo === "equipo" && (
                    <div style={{ marginTop: 60, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 40 }}>
                      <div className="tech-text" style={{ marginBottom: 30, color: "var(--cyan)" }}>DATOS DEL SEGUNDO ATLETA</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
                        <div><label className="tech-text" style={{ fontSize: "0.6rem" }}>NOMBRE 2 *</label><input type="text" name="nombre2" className="input-field" /></div>
                        <div><label className="tech-text" style={{ fontSize: "0.6rem" }}>APELLIDO 2 *</label><input type="text" name="apellido2" className="input-field" /></div>
                        <div><label className="tech-text" style={{ fontSize: "0.6rem" }}>DNI 2 *</label><input type="text" name="dni2" className="input-field" /></div>
                      </div>
                    </div>
                  )}

                  {tipo && (
                    <div style={{ textAlign: "right", marginTop: 50 }}>
                      <span className="tech-text" style={{ opacity: 0.5 }}>TOTAL A PAGAR:</span>
                      <div className="heading" style={{ color: "var(--cyan)" }}>${updatePrice().toLocaleString()}</div>
                    </div>
                  )}

                  <div style={{ marginTop: 60, display: "flex", gap: 20, justifyContent: "flex-end" }}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>VOLVER</button>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(3)} disabled={!canProceedStep2}>SIGUIENTE</button>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className={`form-step${step === 3 ? " active" : ""}`} data-step="3" style={{ display: step === 3 ? "block" : "none" }}>
                  <h3 className="heading" style={{ color: "var(--cyan)", marginBottom: 40 }}>DOCUMENTACIÓN</h3>

                  <div className="card" style={{ marginBottom: 40, borderColor: "var(--cyan-border)", background: "var(--cyan-glow)" }}>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--white)" }}>
                      <strong>IMPORTANTE:</strong> El apto médico es requisito excluyente para competir.
                      Podés subirlo ahora digitalmente o entregarlo impreso el día de la acreditación.
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 40 }}>
                    <div>
                      <div className="tech-text" style={{ marginBottom: 20 }}>APTO MÉDICO ATLETA 1</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
                        <div className={`card categoria-card${aptos.atleta1 && aptos.atleta1 !== "PAPEL" ? " selected" : ""}`} onClick={() => setAptos({ ...aptos, atleta1: "UPLOADED_LINK" })} style={{ padding: 20, cursor: "pointer", textAlign: "center" }}>
                          <span className="heading" style={{ fontSize: "1rem" }}>SUBIR DIGITAL</span>
                        </div>
                        <div className={`card categoria-card${aptos.atleta1 === "PAPEL" ? " selected" : ""}`} onClick={() => setAptos({ ...aptos, atleta1: "PAPEL" })} style={{ padding: 20, cursor: "pointer", textAlign: "center" }}>
                          <span className="heading" style={{ fontSize: "1rem" }}>LLEVO PAPEL</span>
                        </div>
                      </div>
                    </div>

                    {tipo === "equipo" && (
                      <div>
                        <div className="tech-text" style={{ marginBottom: 20 }}>APTO MÉDICO ATLETA 2</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
                          <div className={`card categoria-card${aptos.atleta2 && aptos.atleta2 !== "PAPEL" ? " selected" : ""}`} onClick={() => setAptos({ ...aptos, atleta2: "UPLOADED_LINK" })} style={{ padding: 20, cursor: "pointer", textAlign: "center" }}>
                            <span className="heading" style={{ fontSize: "1rem" }}>SUBIR DIGITAL</span>
                          </div>
                          <div className={`card categoria-card${aptos.atleta2 === "PAPEL" ? " selected" : ""}`} onClick={() => setAptos({ ...aptos, atleta2: "PAPEL" })} style={{ padding: 20, cursor: "pointer", textAlign: "center" }}>
                            <span className="heading" style={{ fontSize: "1rem" }}>LLEVO PAPEL</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: 60, display: "flex", gap: 20, justifyContent: "flex-end" }}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>VOLVER</button>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(4)} disabled={!canProceedStep3}>SIGUIENTE</button>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className={`form-step${step === 4 ? " active" : ""}`} data-step="4" style={{ display: step === 4 ? "block" : "none" }}>
                  <h3 className="heading" style={{ color: "var(--cyan)", marginBottom: 40 }}>REVISIÓN FINAL</h3>

                  <div className="tech-text" style={{ marginBottom: 20, opacity: 0.5 }}>POR FAVOR LEE ATENTAMENTE</div>
                  <div ref={deslindeRef} style={{ height: 250, overflowY: "auto", background: "rgba(255,255,255,0.02)", padding: 30, border: "1px solid rgba(255,255,255,0.05)", borderRadius: "var(--border-radius-sm)", fontSize: "0.85rem", lineHeight: 1.8, color: "var(--gray-light)" }}>
                    <p style={{ marginBottom: 20 }}><strong>DESLINDE DE RESPONSABILIDAD - VICTORY RACE II</strong></p>
                    <p style={{ marginBottom: 20 }}>Al inscribirme en esta competencia, declaro voluntariamente que me encuentro en perfecto estado de salud y condición física para realizar esfuerzos extremos...</p>
                    <p style={{ marginBottom: 20 }}>Libero a la organización Victory Race, Opus Suplementos y al Playón Municipal de toda responsabilidad por lesiones o accidentes que puedan ocurrir durante el evento...</p>
                    <p>Reconozco que el CrossFit es una actividad de alto impacto y asumo todos los riesgos asociados...</p>
                  </div>

                  <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 15 }}>
                    <input type="checkbox" id="accept-disclaimer" disabled={!disclaimerAccepted} style={{ width: 20, height: 20, accentColor: "var(--cyan)" }} />
                    <label className="tech-text" style={{ fontSize: "0.7rem", cursor: "pointer" }} htmlFor="accept-disclaimer">ACEPTO LOS TÉRMINOS Y EL DESLINDE DE RESPONSABILIDAD</label>
                  </div>

                  <div style={{ marginTop: 60, display: "flex", gap: 20, justifyContent: "flex-end" }}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(3)}>VOLVER</button>
                    <button type="submit" className="btn btn-primary btn-glow" disabled={submitting || !disclaimerAccepted}>
                      {submitting ? "ENVIANDO..." : "CONFIRMAR INSCRIPCIÓN"}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {submitting && (
              <div id="loading-spinner" style={{ padding: "100px 40px", textAlign: "center" }}>
                <div style={{ fontSize: "4rem" }}>⚡</div>
                <p className="tech-text" style={{ marginTop: 30, letterSpacing: 2 }}>ENVIANDO DATOS AL SERVIDOR...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
