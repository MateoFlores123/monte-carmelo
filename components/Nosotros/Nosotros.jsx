"use client";
import styles from "./Nosotros.module.css";

const STATS = [
  { value: "31+", label: "Años de experiencia" },
  { value: "I-3", label: "Categoría IPRESS" },
  { value: "1º", label: "Centro de investigación oncológica" },
];

export default function Nosotros() {
  return (
    <section id="nosotros" className={styles.section}>
      <div className={styles.inner}>
        {/* Foto con borde ondulado, mismo lenguaje visual del nav/hero */}
        <div className={styles.media}>
          <div
            className={styles.photo}
            style={{ backgroundImage: "url(/images/nosotros.jpg)" }}
            role="img"
            aria-label="Instalaciones de Centro Médico Monte Carmelo"
          />
          <svg
            className={styles.photoEdge}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="nosotrosEdgeFade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--teal)" stopOpacity="0" />
                <stop offset="16%" stopColor="var(--teal)" stopOpacity="0.9" />
                <stop offset="84%" stopColor="var(--teal)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0.00,93.00 L2.08,93.40 L4.17,94.00 L6.25,94.73 L8.33,95.55 L10.42,96.39 L12.50,97.21 L14.58,97.94 L16.67,98.52 L18.75,98.92 L20.83,99.05 L22.92,98.88 L25.00,98.35 L27.08,97.52 L29.17,96.46 L31.25,95.26 L33.33,93.98 L35.42,92.70 L37.50,91.50 L39.58,90.46 L41.67,89.64 L43.75,89.13 L45.83,89.00 L47.92,89.25 L50.00,89.82 L52.08,90.63 L54.17,91.61 L56.25,92.68 L58.33,93.78 L60.42,94.82 L62.50,95.73 L64.58,96.45 L66.67,96.89 L68.75,96.99 L70.83,96.61 L72.92,95.84 L75.00,94.81 L77.08,93.64 L79.17,92.45 L81.25,91.37 L83.33,90.53 L85.42,90.05 L87.50,90.05 L89.58,90.55 L91.67,91.41 L93.75,92.45 L95.83,93.51 L97.92,94.41 L100.00,95.00"
              fill="none"
              stroke="url(#nosotrosEdgeFade)"
              strokeWidth="0.9"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className={styles.mark} aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <rect x="3" y="3" width="42" height="42" rx="13" fill="var(--plum)" />
              <path d="M24 13v22M13 24h22" stroke="#fff" strokeWidth="4.4" strokeLinecap="round" />
              <circle cx="35.5" cy="12.5" r="2.6" fill="var(--teal-soft)" />
            </svg>
          </span>
        </div>

        {/* Texto */}
        <div className={styles.content}>
          <span className={styles.eyebrow}>Nuestra institución</span>
          <h2 className={styles.title}>Acerca de Nosotros</h2>

          <p className={styles.text}>
            En Centro Médico Monte Carmelo contamos con más de 31 años de
            experiencia brindando servicios integrales de salud y salud
            ocupacional, con un enfoque basado en la calidad, innovación y
            atención humanizada.
          </p>
          <p className={styles.text}>
            Somos una institución IPRESS I-3, con profesionales
            especializados, infraestructura propia y servicios orientados al
            bienestar de personas y organizaciones.
          </p>
          <p className={styles.text}>
            Contamos con el Primer Centro de Investigación Oncológica,
            fortaleciendo nuestro compromiso con la innovación médica, la
            investigación científica y el desarrollo de una atención
            oncológica integral.
          </p>

          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rayito teal al pie, mismo acento que en el nav/hero */}
      <svg
        className={styles.bottomWave}
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="nosotrosBottomFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--teal)" stopOpacity="0.8" />
            <stop offset="80%" stopColor="var(--teal)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className={styles.bottomWaveStroke}
          d="M0,31.5 L30.0,32.3 L60.0,33.5 L90.0,35.0 L120.0,36.7 L150.0,38.5 L180.0,40.1 L210.0,41.6 L240.0,42.7 L270.0,43.4 L300.0,43.6 L330.0,43.1 L360.0,41.8 L390.0,39.8 L420.0,37.3 L450.0,34.5 L480.0,31.5 L510.0,28.5 L540.0,25.7 L570.0,23.3 L600.0,21.3 L630.0,20.0 L660.0,19.5 L690.0,19.9 L720.0,21.0 L750.0,22.6 L780.0,24.5 L810.0,26.7 L840.0,28.9 L870.0,31.0 L900.0,32.8 L930.0,34.2 L960.0,34.9 L990.0,34.9 L1020.0,33.7 L1050.0,31.7 L1080.0,29.1 L1110.0,26.2 L1140.0,23.3 L1170.0,20.6 L1200.0,18.4 L1230.0,17.0 L1260.0,16.6 L1290.0,17.3 L1320.0,18.7 L1350.0,20.6 L1380.0,22.5 L1410.0,24.2 L1440,25.2"
          fill="none"
          stroke="url(#nosotrosBottomFade)"
          strokeWidth="3"
        />
      </svg>
    </section>
  );
}