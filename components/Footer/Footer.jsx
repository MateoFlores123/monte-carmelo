"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

// Actualiza estos datos con la información real de la clínica.
const CONTACT = {
  phone: "+51 954 000 000",
  email: "contacto@montecarmelo.pe",
};

const NAV_LINKS = [
  { label: "Inicio", href: "#home" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Ocupacional", href: "#ocupacional" },
  { label: "Asistencial", href: "#asistencial" },
  { label: "Contacto", href: "#contacto" },
];

const LEGAL_LINKS = [
  { label: "Términos y condiciones", href: "/terminos-y-condiciones" },
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Libro de reclamaciones", href: "/libro-de-reclamaciones" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <path d="M14.2 8.4h-1.8V7.1c0-.47.38-.85.85-.85h.95V4h-1.8a2.7 2.7 0 0 0-2.7 2.7v1.7H8.1v2.35h1.6V18h2.7v-7.25h1.6l.2-2.35Z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <>
        <rect x="4.5" y="4.5" width="15" height="15" rx="4.2" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/51954000000",
    icon: (
      <path d="M12 4.5a7.5 7.5 0 0 0-6.47 11.28L4.5 19.5l3.86-1.01A7.5 7.5 0 1 0 12 4.5Zm4.14 10.6c-.17.49-.99.93-1.4.98-.36.05-.77.07-1.24-.07-.29-.09-.65-.21-1.12-.41-1.98-.86-3.27-2.85-3.37-2.98-.1-.14-.8-1.07-.8-2.04 0-.97.5-1.44.68-1.64.17-.2.38-.24.5-.24h.37c.12 0 .28-.04.43.33.17.4.57 1.37.62 1.47.05.1.08.22.02.36-.07.14-.1.22-.2.35-.11.12-.22.27-.31.36-.1.1-.21.21-.09.43.12.21.53.89 1.15 1.44.8.71 1.47.93 1.68 1.03.21.1.34.09.47-.05.13-.14.54-.62.68-.84.15-.21.29-.17.48-.1.2.07 1.24.58 1.45.69.21.1.36.16.41.25.05.1.05.53-.12 1.02Z" />
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Trazo superior: una línea fina, no un bloque de color — marca el
          límite de sección con la misma sutileza que el borde del Hero */}
      <svg
        className={styles.edgeLine}
        viewBox="0 0 1440 24"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="footerEdgeFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--teal)" stopOpacity="0.55" />
            <stop offset="50%" stopColor="var(--teal)" stopOpacity="0.85" />
            <stop offset="80%" stopColor="var(--teal)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,16 C 180,16 220,4 360,4 S 540,16 720,16 S 900,4 1080,4 S 1260,16 1440,16"
          fill="none"
          stroke="url(#footerEdgeFade)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className={styles.inner}>
        <div className={styles.row}>
          {/* Marca */}
          <Link href="#home" className={styles.brand}>
            <Image
              src="/logo.png"
              alt="Monte Carmelo Centro Médico"
              width={116}
              height={38}
              className={styles.logo}
            />
          </Link>

          {/* Navegación */}
          <nav className={styles.nav} aria-label="Enlaces del pie de página">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contacto + redes */}
          <div className={styles.aside}>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className={styles.contactLink}>
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className={styles.contactLink}>
              {CONTACT.email}
            </a>
            <ul className={styles.socials}>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={styles.socialLink}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                      {s.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        {/* Barra inferior: copyright + legales */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} Monte Carmelo Centro Médico. Todos los derechos reservados.
          </p>
          <ul className={styles.legalLinks}>
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}