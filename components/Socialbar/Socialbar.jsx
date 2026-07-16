"use client";
import styles from "./Socialbar.module.css";

/* Iconos simples de una sola pieza, mismo trazo fino que el resto del sitio */
const IconWhatsapp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 012.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 01-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24zm-3.2 4.53c-.15 0-.4.06-.6.28-.2.22-.79.77-.79 1.88s.81 2.18.92 2.33c.11.15 1.57 2.4 3.8 3.36.53.23.95.37 1.27.47.53.17 1.02.15 1.4.09.43-.06 1.32-.54 1.5-1.06.19-.52.19-.97.13-1.06-.06-.09-.2-.15-.43-.26-.22-.11-1.32-.65-1.53-.73-.2-.07-.35-.11-.5.11-.15.22-.57.73-.7.88-.13.15-.26.17-.48.06-.22-.11-.93-.34-1.77-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.21-.68-1.66-.18-.43-.36-.37-.5-.38h-.43z" />
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 15.6 4.3c-2.24 0-3.78 1.37-3.78 3.87v2.27H9.25v2.96h2.57V21h2.68Z" />
  </svg>
);

const IconTiktok = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 3c.3 1.9 1.5 3.3 3.5 3.5v2.6c-1.3.1-2.5-.3-3.5-1v6.4c0 3-2.4 5.5-5.5 5.5S5.5 17.5 5.5 14.5 8 9 11 9c.3 0 .6 0 .9.1v2.7c-.3-.1-.6-.1-.9-.1-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8 2.9-1.2 2.9-2.8V3h2.6Z" />
  </svg>
);

const SOCIALS = [
  { name: "WhatsApp", href: "https://wa.me/51959635451", Icon: IconWhatsapp },
  { name: "Instagram", href: "https://instagram.com/montecarmelo_med", Icon: IconInstagram },
  { name: "Facebook", href: "https://facebook.com/CMMonteCarmelo", Icon: IconFacebook },
  { name: "TikTok", href: "https://tiktok.com/@montecarmelocm", Icon: IconTiktok },
];

export default function SocialBar() {
  return (
    <div className={styles.bar} aria-label="Redes sociales">
      {SOCIALS.map(({ name, href, Icon }, i) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={styles.circle}
          style={{ "--i": i }}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}