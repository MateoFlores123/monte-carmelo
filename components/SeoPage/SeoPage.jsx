// Plantilla para las páginas de servicio orientadas a búsquedas
// (salud ocupacional, EMO, etc.). Es un Server Component: todo el
// texto sale en el HTML inicial, que es lo que Google indexa.
import Image from "next/image";
import Link from "next/link";
import styles from "./SeoPage.module.css";
import JsonLd from "@/components/Seo/JsonLd";
import Footer from "@/components/Footer/Footer";
import { SITE, fullAddress, whatsappOcupacional } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export function Section({ eyebrow, title, children, id, tone }) {
  return (
    <section id={id} className={`${styles.section} ${tone === "soft" ? styles.soft : ""}`}>
      <div className={styles.container}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        {title && <h2 className={styles.h2}>{title}</h2>}
        {children}
      </div>
    </section>
  );
}

export function CardGrid({ items }) {
  return (
    <div className={styles.cards}>
      {items.map((it) => (
        <article key={it.title} className={styles.card}>
          <h3 className={styles.h3}>
            {it.href ? <Link href={it.href}>{it.title}</Link> : it.title}
          </h3>
          <p>{it.text}</p>
          {it.list && (
            <ul className={styles.list}>
              {it.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

export function Steps({ steps }) {
  return (
    <ol className={styles.steps}>
      {steps.map((s, i) => (
        <li key={s.title} className={styles.step}>
          <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className={styles.h3}>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ faqs }) {
  return (
    <div className={styles.faq}>
      {faqs.map((f) => (
        <details key={f.q} className={styles.faqItem}>
          <summary>
            <h3 className={styles.faqQ}>{f.q}</h3>
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ title, text, waText }) {
  const tel = SITE.phones.ocupacional;
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2 className={styles.ctaTitle}>{title}</h2>
        {text && <p className={styles.ctaText}>{text}</p>}
        <div className={styles.ctaActions}>
          <a className={styles.btnPrimary} href={whatsappOcupacional(waText)} target="_blank" rel="noopener noreferrer">
            Cotizar por WhatsApp
          </a>
          <a className={styles.btnGhost} href={`tel:${tel.href}`}>
            Llamar al {tel.display}
          </a>
          <a className={styles.btnGhost} href={`mailto:${SITE.emails.ocupacional}`}>
            {SITE.emails.ocupacional}
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * @param {{ path: string, crumb: string, eyebrow: string, h1: string,
 *   lead: React.ReactNode, image?: {src: string, alt: string},
 *   faqs?: {q: string, a: string}[], schema?: object[], waText?: string,
 *   children: React.ReactNode }} props
 */
export default function SeoPage({ path, crumb, eyebrow, h1, lead, image, faqs, schema = [], waText, children }) {
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: crumb, path },
  ];
  const structured = [breadcrumbSchema(crumbs), ...schema];
  if (faqs?.length) structured.push(faqSchema(faqs));

  return (
    <>
      <JsonLd data={structured} />
      <header className={styles.topbar}>
        <div className={`${styles.container} ${styles.topbarInner}`}>
          <Link href="/" aria-label={`${SITE.name} — Inicio`}>
            <Image src={SITE.logo} alt={`${SITE.name} Arequipa`} width={179} height={40} className={styles.logo} style={{ height: 40, width: "auto" }} priority />
          </Link>
          <nav className={styles.topnav} aria-label="Navegación">
            <Link href="/salud-ocupacional-arequipa">Salud ocupacional</Link>
            <Link href="/examenes-medicos-ocupacionales-arequipa">Exámenes ocupacionales</Link>
            <Link href="/especialidades">Especialidades</Link>
            <Link href="/#contacto">Contacto</Link>
          </nav>
        </div>
      </header>

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`${styles.container} ${image ? styles.heroGrid : ""}`}>
            <div>
              <nav aria-label="Ruta de navegación" className={styles.breadcrumb}>
                <Link href="/">Inicio</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{crumb}</span>
              </nav>
              <span className={styles.eyebrow}>{eyebrow}</span>
              <h1 className={styles.h1}>{h1}</h1>
              <div className={styles.lead}>{lead}</div>
              <div className={styles.ctaActions}>
                <a className={styles.btnPrimary} href={whatsappOcupacional(waText)} target="_blank" rel="noopener noreferrer">
                  Solicitar cotización
                </a>
                <a className={styles.btnOutline} href={`tel:${SITE.phones.ocupacional.href}`}>
                  {SITE.phones.ocupacional.display}
                </a>
              </div>
              <p className={styles.address}>
                📍 {fullAddress} — <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar</a>
              </p>
            </div>
            {image && (
              <div className={styles.heroImg}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 480px" priority style={{ objectFit: "cover", objectPosition: image.position || "center" }} />
              </div>
            )}
          </div>
        </section>

        {children}
      </main>
      <Footer />
    </>
  );
}
