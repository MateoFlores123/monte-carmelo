"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import styles from "./Nav.module.css";

/* Iconos de línea, minimalistas, un trazo — mismo estilo para las 6 secciones */
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11.5 12 4l8 7.5" />
    <path d="M6 10v9h12v-9" />
    <path d="M10 19v-5h4v5" />
  </svg>
);

const IconNosotros = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19c.6-3.1 3-5 5.5-5s4.9 1.9 5.5 5" />
    <circle cx="17" cy="8.5" r="2.4" />
    <path d="M15.3 12.4c2.1.3 3.9 1.9 4.4 5.1" />
  </svg>
);

const IconOcupacional = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="8.5" width="17" height="10.5" rx="1.8" />
    <path d="M8.5 8.5V6.3A1.8 1.8 0 0 1 10.3 4.5h3.4a1.8 1.8 0 0 1 1.8 1.8V8.5" />
    <path d="M3.5 13h17" />
    <path d="M11 13v2" />
  </svg>
);

const IconAsistencial = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.2s-7.3-4.4-9.2-9A5 5 0 0 1 12 6.6 5 5 0 0 1 21.2 11.2c-1.9 4.6-9.2 9-9.2 9Z" />
    <path d="M8.3 12h1.8l1-2 1.6 4 1-2h2" />
  </svg>
);

const IconGaleria = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="4.8" width="17" height="14.4" rx="1.8" />
    <circle cx="8.4" cy="9.4" r="1.6" />
    <path d="M3.5 16.2 8.7 11l3.4 3.4L15.7 10l4.8 6.2" />
  </svg>
);

const IconContacto = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M4 6.5 12 13l8-6.5" />
  </svg>
);

const LINKS = [
  { label: "Home", href: "#home", Icon: IconHome },
  { label: "Nosotros", href: "#nosotros", Icon: IconNosotros },
  { label: "Ocupacional", href: "#ocupacional", Icon: IconOcupacional },
  { label: "Asistencial", href: "#asistencial", Icon: IconAsistencial },
  { label: "Galería", href: "#galeria", Icon: IconGaleria },
  { label: "Contacto", href: "#contacto", Icon: IconContacto },
];

// Debe coincidir con la duración de "height" en .header.covering (Nav.module.css)
const WAVE_DURATION = 620;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [covering, setCovering] = useState(false);
  const [melting, setMelting] = useState(false);
  const busyRef = useRef(false);

  function handleSectionClick(e, href) {
    e.preventDefault();
    setOpen(false);

    if (busyRef.current) return; // evita clicks encimados mientras anima
    busyRef.current = true;

    setCovering(true); // el nav crece hasta cubrir toda la pantalla
    setMelting(true); // ...y mientras crece, el borde recto pasa por una onda

    window.setTimeout(() => {
      setMelting(false); // termina de crecer: vuelve a quedar recto (ya cubriendo todo)

      // pantalla totalmente cubierta de morado: saltamos a la sección sin que se note
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      } else {
        window.location.hash = href;
      }

      setCovering(false); // el nav se encoge de nuevo a su tamaño normal
      setMelting(true); // ...y al encogerse, vuelve a pasar por la onda

      window.setTimeout(() => {
        setMelting(false); // termina de encogerse: recto de nuevo, en reposo
        busyRef.current = false;
      }, WAVE_DURATION);
    }, WAVE_DURATION);
  }

  return (
    <>
      <header className={`${styles.header} ${covering ? styles.covering : ""} ${melting ? styles.melting : ""}`}>
        <div className={styles.hero} aria-hidden="true" />

        <div className={styles.bar}>
          {/* Logo: la imagen completa (con el nombre incluido) vive dentro
              de una placa circular que sobresale del borde inferior recto
              del nav. El id="navLogoTarget" es el punto de destino que
              usa Loader.jsx para el efecto de "viaje" del logo. */}
          <a href="#home" className={styles.logo} aria-label="Monte Carmelo, Centro Médico — Inicio">
            <span className={styles.logoBadge}>
              <Image
                id="navLogoTarget"
                src="/logo.png"
                alt="Monte Carmelo"
                width={180}
                height={60}
                priority
                className={styles.logoImg}
              />
            </span>
          </a>

          <nav
            className={`${styles.links} ${open ? styles.open : ""}`}
            aria-label="Menú principal"
          >
            {LINKS.map(({ label, href, Icon }) => (
              <a
                key={href}
                href={href}
                className={styles.link}
                onClick={(e) => handleSectionClick(e, href)}
              >
                <span className={styles.linkIcon} aria-hidden="true">
                  <Icon />
                </span>
                {label}
              </a>
            ))}
          </nav>

          <button
            className={styles.burger}
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Doble línea inferior: una recta y, justo debajo, una onda sutil */}
        <div className={styles.borderLine} aria-hidden="true" />
        <svg
          className={styles.waveLine}
          viewBox="0 0 1440 24"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0.0,11.0 L30.0,10.6 L60.0,10.0 L90.0,9.3 L120.0,8.5 L150.0,7.9 L180.0,7.5 L210.0,7.5 L240.0,7.8 L270.0,8.6 L300.0,9.6 L330.0,10.8 L360.0,12.0 L390.0,13.1 L420.0,14.0 L450.0,14.4 L480.0,14.4 L510.0,14.0 L540.0,13.2 L570.0,12.2 L600.0,11.1 L630.0,10.0 L660.0,9.1 L690.0,8.5 L720.0,8.2 L750.0,8.4 L780.0,8.9 L810.0,9.7 L840.0,10.6 L870.0,11.6 L900.0,12.5 L930.0,13.2 L960.0,13.7 L990.0,13.8 L1020.0,13.5 L1050.0,12.9 L1080.0,12.1 L1110.0,11.3 L1140.0,10.4 L1170.0,9.7 L1200.0,9.1 L1230.0,8.9 L1260.0,9.0 L1290.0,9.3 L1320.0,9.8 L1350.0,10.3 L1380.0,10.9 L1410.0,11.4 L1440.0,11.7"
            fill="none"
            stroke="var(--teal)"
            strokeWidth="2"
          />
        </svg>
      </header>

      {/* Espaciador: como el nav ahora es "fixed", este div reserva su
          alto normal para que el contenido de la página no quede tapado
          debajo. Debe ser el primer elemento después de <Nav /> en tu página. */}
      <div className={styles.navSpacer} aria-hidden="true" />
    </>
  );
}