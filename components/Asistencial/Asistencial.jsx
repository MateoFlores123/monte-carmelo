"use client";
import { useRef, useCallback } from "react";
import styles from "./Asistencial.module.css";
import Image from "next/image";

// El archivo de video dura 45s, pero el banner solo debe reproducir
// el fragmento entre estos segundos (6s–20s), en loop.
const CLIP_START = 6;
const CLIP_END = 20;

export default function Asistencial() {
  const videoRef = useRef(null);

  // Al cargar el video, lo posicionamos directamente en el inicio del recorte
  const handleLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (v) v.currentTime = CLIP_START;
  }, []);

  // En cada frame comprobamos si salimos del recorte para volver al inicio.
  // Esto evita tener que cortar el archivo de video en sí.
  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.currentTime >= CLIP_END || v.currentTime < CLIP_START) {
      v.currentTime = CLIP_START;
    }
  }, []);

  return (
    <section id="asistencial" className={styles.asistencial}>
      <div className={styles.watermark} aria-hidden="true" />
      {/* Banner superior: título sobre el fragmento de video en loop */}
      <div className={styles.banner}>
        <video
          ref={videoRef}
          className={styles.bannerVideo}
          src="/videos/asistencial.mp4" // reemplaza por la ruta de tu video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
        />
        <div className={styles.bannerOverlay} aria-hidden="true" />
        <h2 className={styles.bannerTitle}>Medicina Asistencial</h2>
      </div>

      <div className={styles.content}>
        <p className={styles.intro}>
          En Centro Médico Monte Carmelo brindamos atención médica
          especializada orientada a la prevención, diagnóstico, tratamiento y
          seguimiento integral de diversas condiciones de salud contando con
          el:
        </p>

        <div className={styles.grid}>
          <div className={styles.textCol}>
            <span className={styles.badge}>
              
              Primero y único en su categoría
            </span>

            <h3 className={styles.heading}>
              Primer y <mark className={styles.highlight}>único</mark> centro de
              <span className={styles.headingLine}>investigación oncológica</span>
            </h3>

            <p className={styles.emphasisLine}>
              No existe otro centro con este enfoque de investigación oncológica
              en la región.
            </p>

            <p className={styles.desc}>
              El Primer Centro de Investigación Oncológica, dirigido por el
              Dr. Renzo Álvarez Barreda, Médico Oncólogo especialista, tiene
              como objetivo fortalecer el desarrollo del conocimiento
              médico, promoviendo la investigación y contribuyendo al avance
              en el diagnóstico, tratamiento y seguimiento integral de las
              enfermedades oncológicas.
            </p>
            <a href="#contacto" className={styles.cta}>
              Ver más
            </a>
          </div>

          <div className={styles.imageCol}>
            <Image
              src="/images/asistencial/oncologia.jpg"
              alt="Centro de Investigación Oncológica"
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}