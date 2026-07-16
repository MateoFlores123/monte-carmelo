"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./Galeria.module.css";

/* 7 fotos, cada una con su "area" del mosaico (definida en el CSS) y
   una etiqueta corta que aparece al pasar el mouse. Cambia src/alt/label
   por tu contenido real — el orden a→g determina dónde cae cada una
   en la grilla, no el orden en que las listas aquí. */
const IMAGES = [
  { src: "/images/galeria/1.jpg", alt: "Recepción de Monte Carmelo", label: "Recepción", area: "a" },
  { src: "/images/galeria/2.jpg", alt: "Sala de espera", label: "Sala de espera", area: "b" },
  { src: "/images/galeria/3.jpg", alt: "Consultorio médico", label: "Consultorio", area: "c" },
  { src: "/images/galeria/4.jpg", alt: "Equipo médico en atención", label: "Nuestro equipo", area: "d" },
  { src: "/images/galeria/5.jpg", alt: "Sala de procedimientos", label: "Procedimientos", area: "e" },
  { src: "/images/galeria/6.jpg", alt: "Fachada del centro médico", label: "Fachada", area: "f" },
  { src: "/images/galeria/7.jpg", alt: "Detalle de equipamiento", label: "Equipamiento", area: "g" },
];

export default function Galeria() {
  const [openIndex, setOpenIndex] = useState(null); // null = lightbox cerrado

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + IMAGES.length) % IMAGES.length)),
    []
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % IMAGES.length)),
    []
  );

  // Navegación por teclado en el lightbox + bloqueo de scroll de fondo
  useEffect(() => {
    if (openIndex === null) return;

    function onKey(e) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, showPrev, showNext]);

  return (
    <section id="galeria" className={styles.galeria}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Nuestro espacio</span>
        <h2 className={styles.title}>Galería</h2>
        <svg className={styles.headerWave} viewBox="0 0 160 14" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,7 C 20,1 30,13 50,7 C 70,1 80,13 100,7 C 120,1 130,13 150,7 L160,7"
            fill="none"
            stroke="var(--teal)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p className={styles.intro}>
          Un vistazo a nuestras instalaciones, nuestro equipo y el cuidado con el que
          preparamos cada espacio para tu atención.
        </p>
      </div>

      <div className={styles.grid}>
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className={`${styles.item} ${styles[img.area]}`}
            onClick={() => setOpenIndex(i)}
            aria-label={`Ampliar imagen: ${img.label}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 900px) 40vw, 25vw"
              className={styles.img}
            />
            <span className={styles.overlay} aria-hidden="true">
              <span className={styles.overlayLabel}>{img.label}</span>
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={IMAGES[openIndex].label}
          onClick={close}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={close}
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M5 5 19 19M19 5 5 19" />
            </svg>
          </button>

          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Imagen anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5 8 12l7 7" />
            </svg>
          </button>

          <div className={styles.lightboxFigure} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImgWrap}>
              <Image
                src={IMAGES[openIndex].src}
                alt={IMAGES[openIndex].alt}
                fill
                sizes="90vw"
                className={styles.lightboxImg}
                priority
              />
            </div>
            <span className={styles.lightboxCaption}>{IMAGES[openIndex].label}</span>
          </div>

          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Imagen siguiente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}