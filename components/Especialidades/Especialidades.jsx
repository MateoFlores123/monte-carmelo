"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./Especialidades.module.css";

// Cada especialidad trae su imagen de portada (la que se ve en la tarjeta)
// y una galería propia para el carrusel que aparece al abrir la tarjeta.
// Reemplaza las rutas e ideas de texto por tu contenido real.
const SPECIALTIES = [
  {
    id: "oncologia",
    name: "Oncología",
    shortDesc:
      "Brindamos atención especializada en la prevención, diagnóstico y tratamiento",
    fullDesc:
      "Contamos con un equipo de oncólogos especialistas que acompañan al paciente en cada etapa: prevención, diagnóstico temprano, tratamiento y seguimiento integral, siempre con calidez humana y los más altos estándares de calidad.",
    cover: "/images/especialidades/oncologia-1.jpg",
    gallery: [
      "/images/especialidades/oncologia-1.jpg",
      "/images/especialidades/oncologia-2.jpg",
      "/images/especialidades/oncologia-3.jpg",
    ],
  },
  {
    id: "neumologia",
    name: "Neumología",
    shortDesc:
      "Brindamos evaluación, diagnóstico y tratamiento de enfermedades respiratorias cuidando la salud pulmonar",
    fullDesc:
      "Evaluamos y tratamos enfermedades respiratorias con equipamiento moderno, enfocados en cuidar la salud pulmonar de nuestros pacientes a través de un diagnóstico preciso y un seguimiento cercano.",
    cover: "/images/especialidades/neumologia-1.jpg",
    gallery: [
      "/images/especialidades/neumologia-1.jpg",
      "/images/especialidades/neumologia-2.jpg",
      "/images/especialidades/neumologia-3.jpg",
    ],
  },
  {
    id: "cardiologia",
    name: "Cardiología",
    shortDesc:
      "Evaluamos y cuidamos la salud de tu corazón con diagnóstico oportuno y tratamiento personalizado",
    fullDesc:
      "Nuestro equipo de cardiología ofrece evaluación integral, diagnóstico oportuno y tratamiento personalizado para el cuidado de la salud cardiovascular, acompañando al paciente con seguimiento continuo.",
    cover: "/images/especialidades/cardiologia-1.jpg",
    gallery: [
      "/images/especialidades/cardiologia-1.jpg",
      "/images/especialidades/cardiologia-2.jpg",
      "/images/especialidades/cardiologia-3.jpg",
    ],
  },
];

// A dónde lleva el botón circular "Ver más" (ej: una página con todas las
// especialidades). Cámbialo por tu ruta real.
const MORE_HREF = "#todas-las-especialidades";

function ChevronIcon({ direction = "right" }) {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path
        d={direction === "right" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpecialtyModal({ specialty, onClose }) {
  const [slide, setSlide] = useState(0);
  const total = specialty.gallery.length;

  const prev = useCallback(
    () => setSlide((s) => (s - 1 + total) % total),
    [total]
  );
  const next = useCallback(() => setSlide((s) => (s + 1) % total), [total]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, next, prev]);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={specialty.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Cerrar"
        >
          <CloseIcon />
        </button>

        <div className={styles.carousel}>
          <img
            key={slide}
            src={specialty.gallery[slide]}
            alt={`${specialty.name} ${slide + 1}`}
            className={styles.carouselImage}
          />

          {total > 1 && (
            <>
              <button
                type="button"
                className={`${styles.carouselNav} ${styles.carouselNavLeft}`}
                onClick={prev}
                aria-label="Imagen anterior"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                className={`${styles.carouselNav} ${styles.carouselNavRight}`}
                onClick={next}
                aria-label="Siguiente imagen"
              >
                <ChevronIcon direction="right" />
              </button>

              <div className={styles.carouselDots}>
                {specialty.gallery.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`${styles.carouselDot} ${
                      i === slide ? styles.carouselDotActive : ""
                    }`}
                    aria-label={`Ir a la imagen ${i + 1}`}
                    onClick={() => setSlide(i)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className={styles.modalBody}>
          <h3 className={styles.modalTitle}>{specialty.name}</h3>
          <p className={styles.modalDesc}>{specialty.fullDesc}</p>
          <a href="#contacto" className={styles.cta}>
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Especialidades() {
  const [openId, setOpenId] = useState(null);
  const activeSpecialty = SPECIALTIES.find((s) => s.id === openId) || null;

  return (
    <section id="especialidades" className={styles.especialidades}>
      <h2 className={styles.title}>
        Contamos con todas las especialidades, destacando:
      </h2>

      <div className={styles.row}>
        {SPECIALTIES.map((sp) => (
          <button
            key={sp.id}
            type="button"
            className={styles.card}
            onClick={() => setOpenId(sp.id)}
          >
            <span className={styles.cardImageWrap}>
              <img
                src={sp.cover}
                alt={sp.name}
                className={styles.cardImage}
              />
            </span>
            <span className={styles.cardName}>{sp.name}</span>
            <span className={styles.cardDesc}>{sp.shortDesc}</span>
          </button>
        ))}

        <a href={MORE_HREF} className={styles.moreLink}>
          <span className={styles.moreCircle}>
            <ChevronIcon direction="right" />
          </span>
          <span className={styles.moreLabel}>Ver más</span>
        </a>
      </div>

      {activeSpecialty && (
        <SpecialtyModal
          specialty={activeSpecialty}
          onClose={() => setOpenId(null)}
        />
      )}
    </section>
  );
}