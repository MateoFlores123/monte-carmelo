"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Loader.module.css";

const MIN_DURATION = 1400;  // ms mínimo visible, para que no "parpadee" en conexiones rápidas
const MAX_DURATION = 3000;  // ms máximo de espera, aunque falten imágenes por cargar
const TRAVEL_DURATION = 700; // debe coincidir con la transición de .travelGroup.docking

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [docking, setDocking] = useState(false);
  const groupRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const start = Date.now();
    let finished = false;

    function finish() {
      if (finished) return;
      finished = true;

      const elapsed = Date.now() - start;
      const wait = Math.max(MIN_DURATION - elapsed, 0);

      window.setTimeout(() => {
        travelToNavLogo();
      }, wait);
    }

    function travelToNavLogo() {
      const target = document.getElementById("navLogoTarget");
      const logoEl = logoRef.current;
      const groupEl = groupRef.current;

      if (target && logoEl && groupEl) {
        const from = logoEl.getBoundingClientRect();
        const to = target.getBoundingClientRect();

        const fromCenterX = from.left + from.width / 2;
        const fromCenterY = from.top + from.height / 2;
        const toCenterX = to.left + to.width / 2;
        const toCenterY = to.top + to.height / 2;

        const dx = toCenterX - fromCenterX;
        const dy = toCenterY - fromCenterY;
        const scale = Math.max(to.width / from.width, 0.12);

        groupEl.style.setProperty("--dx", `${dx}px`);
        groupEl.style.setProperty("--dy", `${dy}px`);
        groupEl.style.setProperty("--dock-scale", scale.toFixed(3));
      }

      setDocking(true);
      window.setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = prevOverflow;
      }, TRAVEL_DURATION);
    }

    // Tope máximo: si "load" tarda demasiado (imágenes pesadas, etc.),
    // igual avanzamos pasado MAX_DURATION.
    const maxTimer = window.setTimeout(finish, MAX_DURATION);

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(maxTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`${styles.loader} ${docking ? styles.docking : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Cargando Monte Carmelo"
    >
      <div className={styles.bg} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobTeal}`} />
        <span className={`${styles.blob} ${styles.blobLav}`} />
        <span className={`${styles.blob} ${styles.blobPlumLight}`} />
      </div>

      <svg
        className={styles.bottomWave}
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,55 C240,20 480,80 720,50 C960,20 1200,80 1440,45"
          fill="none"
          stroke="var(--teal)"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
      </svg>

      <p className={styles.eyebrow}>Bienvenido a</p>

      <div ref={groupRef} className={styles.travelGroup}>
        <Image
            ref={logoRef}
            src="/logo.png"
            alt="Monte Carmelo, Centro Médico"
            width={300}
            height={120}
            className={styles.logo}
            priority
            />
        <span className={styles.dot} aria-hidden="true" />
      </div>
    </div>
  );
}