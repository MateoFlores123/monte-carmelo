"use client";
import { useEffect, useRef } from "react";
import styles from "./Misionvisionvalores.module.css";

const CARDS = [
  {
    key: "mision",
    eyebrow: "Nuestro propósito",
    title: "Misión",
    icon: (
      // brújula / punto de enfoque
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="14" stroke="#fff" strokeWidth="3.4" />
        <circle cx="24" cy="24" r="3.4" fill="#fff" />
        <path
          d="M24 6v6M24 36v6M6 24h6M36 24h6"
          stroke="#fff"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    body: (
      <p>
        Brindar servicios de salud especializados con calidad, seguridad y
        calidez humana, mediante una atención médica oportuna, ética y
        centrada en las necesidades de cada paciente.
      </p>
    ),
  },
  {
    key: "vision",
    eyebrow: "Hacia dónde vamos",
    title: "Visión",
    icon: (
      // ojo / mirada a futuro
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M6 24c4.6-8 12-12.5 18-12.5S37.4 16 42 24c-4.6 8-12 12.5-18 12.5S10.6 32 6 24Z"
          stroke="#fff"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="24" r="5.4" fill="#fff" />
      </svg>
    ),
    body: (
      <p>
        Ser un centro médico referente a nivel nacional, reconocido por su
        excelencia médica, innovación, investigación y compromiso con la
        salud de las personas.
      </p>
    ),
  },
  {
    key: "valores",
    eyebrow: "Lo que nos guía",
    title: "Valores",
    icon: (
      // check-list
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M10 14h20M10 24h20M10 34h12"
          stroke="#fff"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M34 30l3.2 3.2L42 27.4"
          stroke="var(--teal-soft)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    body: (
      <ul className={styles.valuesList}>
        <li>Seguridad</li>
        <li>Calidad</li>
        <li>Humanización</li>
        <li>Innovación e investigación</li>
      </ul>
    ),
  },
];

export default function MisionVisionValores() {
  const cardRefs = useRef([]);
  useEffect(() => {
    const cards = cardRefs.current;

    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle(styles.visible, entry.isIntersecting);
        });
        },
        { threshold: 0.25, rootMargin: "0px 0px -40px 0px" }
    );

    cards.forEach((el) => {
        if (el) observer.observe(el);
    });

    return () => {
        cards.forEach((el) => {
        if (el) observer.unobserve(el);
        });
        observer.disconnect();
    };
    }, [cardRefs]);

  return (
    <section id="mision-vision-valores" className={styles.section}>
      {/* Onda teal decorativa al inicio de la sección */}
      <svg
        className={styles.topWave}
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mvvTopFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--teal)" stopOpacity="0.8" />
            <stop offset="80%" stopColor="var(--teal)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,31.5 L30.0,32.3 L60.0,33.5 L90.0,35.0 L120.0,36.7 L150.0,38.5 L180.0,40.1 L210.0,41.6 L240.0,42.7 L270.0,43.4 L300.0,43.6 L330.0,43.1 L360.0,41.8 L390.0,39.8 L420.0,37.3 L450.0,34.5 L480.0,31.5 L510.0,28.5 L540.0,25.7 L570.0,23.3 L600.0,21.3 L630.0,20.0 L660.0,19.5 L690.0,19.9 L720.0,21.0 L750.0,22.6 L780.0,24.5 L810.0,26.7 L840.0,28.9 L870.0,31.0 L900.0,32.8 L930.0,34.2 L960.0,34.9 L990.0,34.9 L1020.0,33.7 L1050.0,31.7 L1080.0,29.1 L1110.0,26.2 L1140.0,23.3 L1170.0,20.6 L1200.0,18.4 L1230.0,17.0 L1260.0,16.6 L1290.0,17.3 L1320.0,18.7 L1350.0,20.6 L1380.0,22.5 L1410.0,24.2 L1440,25.2"
          fill="none"
          stroke="url(#mvvTopFade)"
          strokeWidth="3"
        />
      </svg>

      {/* Manchas / burbujas teal ambientales */}
      <span className={`${styles.blob} ${styles.blobOne}`} aria-hidden="true" />
      <span className={`${styles.blob} ${styles.blobTwo}`} aria-hidden="true" />
      <svg className={styles.dots} viewBox="0 0 120 120" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <circle
            key={i}
            cx={10 + (i % 3) * 20}
            cy={10 + Math.floor(i / 3) * 20}
            r="2.6"
            fill="var(--teal)"
          />
        ))}
      </svg>

      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Lo que nos define</span>
          <h2 className={styles.title}>Misión, Visión y Valores</h2>
        </div>

        <div className={styles.grid}>
          {CARDS.map((card, i) => (
            <div
              key={card.key}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={styles.card}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <span className={styles.mark}>{card.icon}</span>
              <span className={styles.cardEyebrow}>{card.eyebrow}</span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <div className={styles.cardBody}>{card.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Onda teal decorativa al pie de la sección */}
      <svg
        className={styles.bottomWave}
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mvvBottomFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0" />
            <stop offset="16%" stopColor="var(--teal)" stopOpacity="0.9" />
            <stop offset="84%" stopColor="var(--teal)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0.00,25.00 L30.00,26.20 L60.00,29.40 L90.00,34.00 L120.00,39.20 L150.00,44.20 L180.00,48.40 L210.00,51.20 L240.00,52.40 L270.00,51.80 L300.00,49.60 L330.00,46.00 L360.00,41.60 L390.00,37.00 L420.00,32.80 L450.00,29.60 L480.00,28.00 L510.00,28.00 L540.00,29.60 L570.00,32.80 L600.00,37.00 L630.00,41.60 L660.00,46.00 L690.00,49.60 L720.00,51.80 L750.00,52.40 L780.00,51.20 L810.00,48.40 L840.00,44.20 L870.00,39.20 L900.00,34.00 L930.00,29.40 L960.00,26.20 L990.00,25.00 L1020.00,26.20 L1050.00,29.40 L1080.00,34.00 L1110.00,39.20 L1140.00,44.20 L1170.00,48.40 L1200.00,51.20 L1230.00,52.40 L1260.00,51.80 L1290.00,49.60 L1320.00,46.00 L1350.00,41.60 L1380.00,37.00 L1410.00,32.80 L1440,29.60"
          fill="none"
          stroke="url(#mvvBottomFade)"
          strokeWidth="3"
        />
      </svg>
    </section>
  );
}