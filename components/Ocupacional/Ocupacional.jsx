"use client";
import { useState, useEffect } from "react";
import styles from "./Ocupacional.module.css";
import Image from "next/image";

const GALLERY_IMAGES = [
  { src: "/images/ocupacional/galeria-1.jpg", top: "4%",  left: "2%",  rotate: "-7deg", orientation: "vertical" },
  { src: "/images/ocupacional/galeria-2.jpg", top: "8%",  left: "26%", rotate: "5deg",  orientation: "horizontal" },
  { src: "/images/ocupacional/galeria-3.jpg", top: "2%",  left: "52%", rotate: "-4deg", orientation: "vertical" },
  { src: "/images/ocupacional/galeria-4.jpg", top: "38%", left: "12%", rotate: "6deg",  orientation: "horizontal" },
  { src: "/images/ocupacional/galeria-5.jpg", top: "42%", left: "38%", rotate: "-6deg", orientation: "vertical" },
  { src: "/images/ocupacional/galeria-6.jpg", top: "34%", left: "64%", rotate: "3deg",  orientation: "horizontal" },
];

// Las tres etapas del cuidado ocupacional. El orden importa: primero se
// evalúa, luego se previene, luego se gestiona la información — por eso
// van numeradas y unidas por la misma línea teal que borda el Hero.
const STAGES = [
  {
    num: "01",
    title: "Evaluamos",
    accent: "teal",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1Z" />
        <rect x="6" y="5" width="12" height="16" rx="2" />
        <path d="M9 11l2 2 4-4" />
      </svg>
    ),
    items: [
      "Exámenes pre ocupacionales",
      "Exámenes periódicos",
      "Exámenes de retiro",
      "Exámenes complementarios",
    ],
  },
  {
    num: "02",
    title: "Prevenimos",
    accent: "plum",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        <path d="M12 8v5M12 15.5h.01" />
      </svg>
    ),
    items: [
      "Enfermedades ocupacionales",
      "Riesgos laborales",
      "Alteraciones de salud relacionadas al trabajo",
      "Vigilancia médica ocupacional",
    ],
  },
  {
    num: "03",
    title: "Gestionamos",
    accent: "teal",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 15l2.5-3 2.5 2 3-4" />
        <path d="M8 8h.01M11 8h5" />
      </svg>
    ),
    items: [
      "Resultados médicos ocupacionales",
      "Reportes para empresas",
      "Plataforma digital MEDIWEB",
      "Información segura y confidencial",
    ],
  },
];

// Logos de empresas: coloca los archivos en /public/empresas/ con estos
// nombres (o cambia la lista por los nombres reales de tus archivos)
const COMPANY_LOGOS = [
  { file: "empresa-1.png", scale: 1 },
  { file: "empresa-2.png", scale: 1 },
  { file: "empresa-3.png", scale: 1 },
  { file: "empresa-4.png", scale: 1 },
];

export default function Ocupacional() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  useEffect(() => {
    if (!galleryOpen) return;
    document.body.style.overflow = "hidden";
    function handleKey(e) {
      if (e.key === "Escape") setGalleryOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [galleryOpen]);
  return (
    <section id="ocupacional" className={styles.section}>
      {/* Costura con el Hero: retoma el blanco de su bottomWave */}
      <svg
        className={styles.topWave}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className={styles.topWaveFill}
          d="M0,0 L1440,0 L1440,30 C1200,55 960,10 720,20 C480,30 240,60 0,25 Z"
        />
      </svg>

      <div className={styles.inner}>
        <div className={styles.headerGrid}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>Salud ocupacional</span>
            <h2 className={styles.title}>Medicina Ocupacional</h2>
            <p className={styles.text}>
              En Centro Médico Monte Carmelo contamos con una Unidad de{" "}
              <strong>Medicina Ocupacional</strong> activa desde el año{" "}
              <strong>2008</strong>, especializada en la evaluación y
              prevención de la salud de los trabajadores. Brindamos{" "}
              <strong>Exámenes Médicos Ocupacionales (EMO)</strong> adaptados
              al perfil y riesgos de cada puesto laboral.
            </p>
            <div className={styles.statRow}>
              <span className={styles.stat}>
                <span className={styles.statNum}>+33</span> años de
                experiencia
              </span>
              <span className={styles.stat}>
                <span className={styles.statNum}>3</span> etapas de
                acompañamiento
              </span>
            </div>
          </header>

          {/* Foto: mismo recurso visual que la sección Nosotros — borde
              inferior ondulado + trazo teal, para que se sienta de la
              misma familia. Cambia la url por tu foto real. */}
          <div className={styles.media}>
            <button
              type="button"
              className={styles.photoButton}
              onClick={() => setGalleryOpen(true)}
              onMouseEnter={() => {
                GALLERY_IMAGES.forEach((img) => {
                  const preload = new window.Image();
                  preload.src = img.src;
                });
              }}
              aria-label="Ver galería de imágenes de medicina ocupacional"
            >
              <div className={styles.photo}>
                <Image
                  src="/images/ocupacional.jpg"
                  alt="Evaluación médica ocupacional en Monte Carmelo"
                  fill
                  sizes="(max-width: 880px) 90vw, 400px"
                  style={{ objectFit: "cover" }}
                  
                />
            </div>
              <svg
                className={styles.photoEdge}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="ocupacionalEdgeFade" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--teal)" stopOpacity="0" />
                    <stop offset="16%" stopColor="var(--teal)" stopOpacity="0.9" />
                    <stop offset="84%" stopColor="var(--teal)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0.00,93.00 L2.08,93.40 L4.17,94.00 L6.25,94.73 L8.33,95.55 L10.42,96.39 L12.50,97.21 L14.58,97.94 L16.67,98.52 L18.75,98.92 L20.83,99.05 L22.92,98.88 L25.00,98.35 L27.08,97.52 L29.17,96.46 L31.25,95.26 L33.33,93.98 L35.42,92.70 L37.50,91.50 L39.58,90.46 L41.67,89.64 L43.75,89.13 L45.83,89.00 L47.92,89.25 L50.00,89.82 L52.08,90.63 L54.17,91.61 L56.25,92.68 L58.33,93.78 L60.42,94.82 L62.50,95.73 L64.58,96.45 L66.67,96.89 L68.75,96.99 L70.83,96.61 L72.92,95.84 L75.00,94.81 L77.08,93.64 L79.17,92.45 L81.25,91.37 L83.33,90.53 L85.42,90.05 L87.50,90.05 L89.58,90.55 L91.67,91.41 L93.75,92.45 L95.83,93.51 L97.92,94.41 L100.00,95.00"
                  fill="none"
                  stroke="url(#ocupacionalEdgeFade)"
                  strokeWidth="0.9"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span className={styles.badge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1Z" />
                  <rect x="6" y="5" width="12" height="16" rx="2" />
                  <path d="M9 11l2 2 4-4" />
                </svg>
                Desde 2008
              </span>
              <span className={styles.tapHint}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11.5V7a2 2 0 0 1 4 0v4" />
                  <path d="M13 9V6a2 2 0 0 1 4 0v5" />
                  <path d="M17 10a2 2 0 0 1 4 0v4c0 4-3 7-7 7h-1c-3.5 0-5-1.2-6.5-3.5L4 13.8c-.6-.9-.3-1.9.6-2.3.8-.4 1.7-.1 2.2.6L9 15" />
                </svg>
                Toca para ver más
              </span>
            </button>
          </div>
        </div>

        {/* Hilo del cuidado: evaluamos → prevenimos → gestionamos */}
        <div className={styles.pathway}>
          <svg
            className={styles.thread}
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="threadFade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.1" />
                <stop offset="18%" stopColor="var(--teal)" stopOpacity="0.5" />
                <stop offset="50%" stopColor="var(--teal)" stopOpacity="0.5" />
                <stop offset="82%" stopColor="var(--teal)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--teal)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path
              d="M100,23 C 300,-40 300,150 600,93 C 900,36 900,150 1100,63"
              fill="none"
              stroke="url(#threadFade)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <div className={styles.cards}>
            {STAGES.map((stage, i) => (
              <article
                key={stage.num}
                className={`${styles.card} ${
                  i === 1 ? styles.cardStage2 : ""
                }`}
                style={{ "--delay": `${i * 0.12}s` }}
                data-accent={stage.accent}
              >
                <div className={styles.cardTop}>
                  <span className={styles.iconWrap}>{stage.icon}</span>
                  <span className={styles.stageNum}>{stage.num}</span>
                </div>
                <h3 className={styles.cardTitle}>{stage.title}</h3>
                <ul className={styles.list}>
                  {stage.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* Panel compacto: empresas que confían + contacto, todo en una
            sola franja para no alargar la página */}
        <div className={styles.trustPanel}>
          <div className={styles.trustLeft}>
            <span className={styles.trustEyebrow}>Confían en nosotros</span>
            <h3 className={styles.trustTitle}>
              Empresas que confían en nosotros
            </h3>
            <div className={styles.logos}>
              {COMPANY_LOGOS.map((logo) => (
                <div key={logo.file} className={styles.logo}>
                  <Image
                    src={`/images/empresas/${logo.file}`}
                    alt=""
                    width={180}
                    height={90}
                    className={styles.logoImg}
                    style={{ transform: `scale(${logo.scale})` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <a href="#contacto" className={styles.trustCta}>
            Contáctanos
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {galleryOpen && (
        <div
          className={styles.galleryOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes"
          onClick={() => setGalleryOpen(false)}
        >
          <button
            type="button"
            className={styles.galleryClose}
            onClick={() => setGalleryOpen(false)}
            aria-label="Cerrar galería"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className={styles.galleryStage} onClick={(e) => e.stopPropagation()}>
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={img.src}
                className={`${styles.galleryImg} ${
                  img.orientation === "horizontal" ? styles.galleryImgHorizontal : styles.galleryImgVertical
                }`}
                style={{ top: img.top, left: img.left, "--rot": img.rotate, "--i": i, zIndex: i + 1 }}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 45vw, 25vw"
                  style={{ objectFit: "cover" }}
                  
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}