"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import styles from "./Nav.module.css";

/* Iconos de línea, minimalistas, un trazo — mismo estilo para las 5 secciones */
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

const LINKS = [
  { label: "Home", href: "#home", Icon: IconHome },
  { label: "Nosotros", href: "#nosotros", Icon: IconNosotros },
  { label: "Ocupacional", href: "#ocupacional", Icon: IconOcupacional },
  { label: "Asistencial", href: "#asistencial", Icon: IconAsistencial },
  { label: "Galería", href: "#galeria", Icon: IconGaleria },
];

// Cambia este número por el WhatsApp real del centro médico
const WHATSAPP = "https://wa.me/51999999999";

// Debe coincidir con la duración de "height"/"clip-path" en .header.covering (Nav.module.css)
const WAVE_DURATION = 620;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [covering, setCovering] = useState(false);
  const busyRef = useRef(false);

  function handleSectionClick(e, href) {
    e.preventDefault();
    setOpen(false);

    if (busyRef.current) return; // evita clicks encimados mientras anima
    busyRef.current = true;

    setCovering(true); // el propio nav crece y se "derrite" cubriendo la página

    window.setTimeout(() => {
      // pantalla totalmente cubierta de morado: saltamos a la sección sin que se note
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      } else {
        window.location.hash = href;
      }

      setCovering(false); // el nav se encoge de nuevo a su tamaño normal

      window.setTimeout(() => {
        busyRef.current = false;
      }, WAVE_DURATION);
    }, WAVE_DURATION);
  }

  return (
    <>
      <header className={`${styles.header} ${covering ? styles.covering : ""}`}>
        <div className={styles.hero} aria-hidden="true" />

        <div className={styles.bar}>
          {/* Logo como imagen. El id="navLogoTarget" es el punto de
              destino que usa Loader.jsx para calcular hacia dónde debe
              "viajar" el logo cuando termina de cargar la página. */}
          <a href="#home" className={styles.logo} aria-label="Monte Carmelo, Centro Médico — Inicio">
            <Image
              id="navLogoTarget"
              src="/logo.png"
              alt="Monte Carmelo"
              width={180}
              height={60}
              priority
            />
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
            <a
              href={WHATSAPP}
              className={styles.whatsappMobile}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
          </nav>

          <a
            href={WHATSAPP}
            className={styles.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 012.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 01-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24zm-3.2 4.53c-.15 0-.4.06-.6.28-.2.22-.79.77-.79 1.88s.81 2.18.92 2.33c.11.15 1.57 2.4 3.8 3.36.53.23.95.37 1.27.47.53.17 1.02.15 1.4.09.43-.06 1.32-.54 1.5-1.06.19-.52.19-.97.13-1.06-.06-.09-.2-.15-.43-.26-.22-.11-1.32-.65-1.53-.73-.2-.07-.35-.11-.5.11-.15.22-.57.73-.7.88-.13.15-.26.17-.48.06-.22-.11-.93-.34-1.77-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.21-.68-1.66-.18-.43-.36-.37-.5-.38h-.43z" />
            </svg>
            WhatsApp
          </a>

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

        
      </header>

      {/* Espaciador: como el nav ahora es "fixed", este div reserva su
          alto normal para que el contenido de la página no quede tapado
          debajo. Debe ser el primer elemento después de <Nav /> en tu página. */}
      <div className={styles.navSpacer} aria-hidden="true" />
    </>
  );
}