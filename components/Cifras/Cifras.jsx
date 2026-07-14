"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Cifras.module.css";

// Cambia la imagen de fondo y las cifras por tu contenido real.
// "value" es el número final, "suffix" es lo que se pega después
// (ej. "+", "%", "m²") sin que se anime.
const STATS = [
  { value: 128, suffix: "", label: "Años", text: "De trayectoria cuidando la salud de nuestra comunidad" },
  { value: 45, suffix: "k+", label: "Pacientes", text: "Atendidos con calidez humana cada año" },
  { value: 60, suffix: "+", label: "Especialistas", text: "Formando un equipo médico multidisciplinario" },
  { value: 98, suffix: "%", label: "Satisfacción", text: "De pacientes recomienda nuestra atención" },
];

const BG_IMAGE = "/images/cifras-bg.jpg";

function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic: arranca rápido y frena suave al llegar al número
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return value;
}

function StatItem({ stat, active, index }) {
  const count = useCountUp(stat.value, active, 1400 + index * 150);
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>
        {count.toLocaleString("es-PE")}
        <span className={styles.statSuffix}>{stat.suffix}</span>
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
      <p className={styles.statText}>{stat.text}</p>
    </div>
  );
}

export default function Cifras() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cifras"
      className={styles.cifras}
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Nuestra huella</span>
        <h2 className={styles.title}>
          Monte Carmelo <span className={styles.titleAccent}>en cifras</span>
        </h2>
        <div className={styles.divider} />

        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} active={active} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}