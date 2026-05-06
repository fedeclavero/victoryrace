import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#050505",
      color: "#ffffff",
      fontFamily: "var(--font-heading), sans-serif",
      textAlign: "center",
      padding: 40,
    }}>
      <div style={{ fontSize: "clamp(4rem, 10vw, 8rem)", color: "var(--cyan)", fontFamily: "var(--font-display), sans-serif", lineHeight: 1 }}>
        404
      </div>
      <h2 style={{ marginTop: 20, fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
        PÁGINA NO ENCONTRADA
      </h2>
      <p style={{ color: "var(--gray-light)", marginTop: 20, maxWidth: 500 }}>
        La ruta que buscás no existe o fue movida. Volvé al inicio para continuar.
      </p>
      <Link
        href="/"
        className="btn btn-primary"
        style={{ marginTop: 40, textDecoration: "none" }}
      >
        VOLVER AL INICIO
      </Link>
    </div>
  );
}
