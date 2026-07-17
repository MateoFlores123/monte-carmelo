"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Hero.module.css";
import Image from "next/image";

// Cada slide trae su propia foto y su propio texto — cámbialos por tu
// contenido real (fachada, consultorios, equipo, etc.)
const SLIDES = [
  {
    img: "/images/hero-1.1.webp",
    imgPosition: "100% 40%",
    imgSize: "85% auto",
    eyebrow: "Bienvenido a",
    title: "Monte Carmelo",
    titleLine: "Centro Médico",
    text: "Atención médica ocupacional y asistencial con calidez humana y los más altos estándares de calidad.",
    ctaLabel: "Agenda tu cita",
    ctaHref: "#contacto",
    ctaGhostLabel: "Conócenos",
    ctaGhostHref: "#nosotros",
  },
  {
    img: "/images/hero-2.webp",
    imgPosition: "117% 40%",
    eyebrow: "Salud ocupacional",
    title: "Cuidamos",
    titleLine: "a tu equipo",
    text: "Exámenes médicos ocupacionales y programas de prevención pensados para el bienestar de tus colaboradores.",
    ctaLabel: "Ver servicios",
    ctaHref: "#ocupacional",
    ctaGhostLabel: "Más información",
    ctaGhostHref: "#ocupacional",
  },
  {
    img: "/images/hero-3.3.webp",
    imgPosition: "150% center", // más hacia la izquierda
    imgSize: "30% auto",
    eyebrow: "Atención asistencial",
    title: "Un equipo",
    titleLine: "para tu salud",
    text: "Especialistas y equipamiento moderno para acompañarte en cada etapa de tu bienestar.",
    ctaLabel: "Agenda tu cita",
    ctaHref: "#asistencial",
    ctaGhostLabel: "Conoce el equipo",
    ctaGhostHref: "#nosotros",
  },
];

const AUTOPLAY_MS = 3500;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  // Alterna en cada transición (no según el índice del slide). Con 3
  // slides, usar par/impar del índice dejaba 2 de los 3 del mismo lado
  // (0 y 2 son pares) — esto en cambio alterna siempre, sin importar
  // cuántos slides haya.
  const [enterFromRight, setEnterFromRight] = useState(true);
  const timerRef = useRef(null);

  const advanceTo = useCallback(
    (i) => {
      setPrev(current);
      setCurrent(i);
      setEnterFromRight((v) => !v);
    },
    [current]
  );

  const restartTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        setEnterFromRight((v) => !v);
        return (c + 1) % SLIDES.length;
      });
    }, AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    restartTimer();
    return () => clearInterval(timerRef.current);
  }, [restartTimer]);

  function handleDotClick(i) {
    if (i === current) return;
    advanceTo(i);
    restartTimer();
  }

  // El slide actual va al centro. El que sale (prev) se va al lado
  // OPUESTO al que entró el nuevo. Para el texto usamos el lado
  // contrario al de la imagen, para que crucen en direcciones opuestas.
  function slotFor(i, reversed = false) {
    if (i === current) return styles.slotCurrent;
    const enterSide = reversed ? !enterFromRight : enterFromRight;
    if (i === prev) {
      return enterSide ? styles.slotLeft : styles.slotRight;
    }
    return enterSide ? styles.slotRight : styles.slotLeft;
  }

  return (
    <section id="home" className={styles.hero}>
      {/* Carrusel a pantalla completa, se mete detrás del nav fijo */}
      <div className={styles.carousel} aria-hidden="true">
        {SLIDES.map((slide, i) => (
          <div key={slide.img} className={`${styles.slide} ${slotFor(i)}`}>
            <Image
              src={slide.img}
              alt=""
              fill
              priority={i === 0}          // solo la primera carga con prioridad
              fetchPriority={i === 0 ? "high" : "auto"}
              loading={i === 0 ? "eager" : "lazy"}
              sizes="100vw"
              quality={75}
              style={{
                objectFit: "cover",
                objectPosition: slide.imgPosition || "center",
              }}
            />
          </div>
        ))}
      </div>

      {/* Halo difuminado: sigue el mismo recorte que el panel, pero borroso */}
      <div className={styles.panelGlow} aria-hidden="true" />

      {/* Panel de texto: cada slide trae su propio contenido, se desliza
          en sincronía con la imagen */}
      <div className={styles.panel}>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.title + slide.titleLine}
            className={`${styles.textSlide} ${slotFor(i, true)}`}
            aria-hidden={i !== current}
          >
            <span className={styles.eyebrow}>{slide.eyebrow}</span>
            <h1 className={styles.title}>
              {slide.title}
              <span className={styles.titleLine}>{slide.titleLine}</span>
            </h1>
            <p className={styles.text}>{slide.text}</p>
            <div className={styles.actions}>
              <a href={slide.ctaHref} className={styles.cta} tabIndex={i === current ? 0 : -1}>
                {slide.ctaLabel}
              </a>
              <a
                href={slide.ctaGhostHref}
                className={styles.ctaGhost}
                tabIndex={i === current ? 0 : -1}
              >
                {slide.ctaGhostLabel}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Rayito teal trazando el borde ondulado del panel, igual que en el nav */}
      <svg
        className={styles.edgeAccent}
        viewBox="0 0 100 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="edgeFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0" />
            <stop offset="18%" stopColor="var(--teal)" stopOpacity="0.85" />
            <stop offset="82%" stopColor="var(--teal)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M58.00,0.00 L58.16,1.67 L58.42,3.33 L58.75,5.00 L59.11,6.67 L59.48,8.33 L59.82,10.00 L60.10,11.67 L60.29,13.33 L60.34,15.00 L60.23,16.67 L59.93,18.33 L59.42,20.00 L58.71,21.67 L57.83,23.33 L56.83,25.00 L55.76,26.67 L54.65,28.33 L53.57,30.00 L52.54,31.67 L51.62,33.33 L50.86,35.00 L50.29,36.67 L49.95,38.33 L49.90,40.00 L50.11,41.67 L50.53,43.33 L51.09,45.00 L51.74,46.67 L52.41,48.33 L53.04,50.00 L53.56,51.67 L53.92,53.33 L54.05,55.00 L53.90,56.67 L53.46,58.33 L52.80,60.00 L51.96,61.67 L51.01,63.33 L50.00,65.00 L48.99,66.67 L48.04,68.33 L47.20,70.00 L46.54,71.67 L46.10,73.33 L45.93,75.00 L46.04,76.67 L46.38,78.33 L46.88,80.00 L47.50,81.67 L48.15,83.33 L48.79,85.00 L49.35,86.67 L49.78,88.33 L50.00,90.00 L49.99,91.67 L49.70,93.33 L49.25,95.00 L48.74,96.67 L48.29,98.33 L48.00,100.00"
          transform="scale(1 6)"
          fill="none"
          stroke="url(#edgeFade)"
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Indicadores del carrusel */}
      <div className={styles.dots} role="tablist" aria-label="Imágenes destacadas">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Ir a la imagen ${i + 1}`}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>

      {/* Onda sutil al pie del Hero */}
      <svg
        className={styles.bottomWave}
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className={styles.bottomWaveFill}
          d="M0,0 L1440,0 L1440,25.2 L1410.0,24.2 L1380.0,22.5 L1350.0,20.6 L1320.0,18.7 L1290.0,17.3 L1260.0,16.6 L1230.0,17.0 L1200.0,18.4 L1170.0,20.6 L1140.0,23.3 L1110.0,26.2 L1080.0,29.1 L1050.0,31.7 L1020.0,33.7 L990.0,34.9 L960.0,34.9 L930.0,34.2 L900.0,32.8 L870.0,31.0 L840.0,28.9 L810.0,26.7 L780.0,24.5 L750.0,22.6 L720.0,21.0 L690.0,19.9 L660.0,19.5 L630.0,20.0 L600.0,21.3 L570.0,23.3 L540.0,25.7 L510.0,28.5 L480.0,31.5 L450.0,34.5 L420.0,37.3 L390.0,39.8 L360.0,41.8 L330.0,43.1 L300.0,43.6 L270.0,43.4 L240.0,42.7 L210.0,41.6 L180.0,40.1 L150.0,38.5 L120.0,36.7 L90.0,35.0 L60.0,33.5 L30.0,32.3 L0.0,31.5 Z"
        />
      </svg>
    </section>
  );
}