"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./Especialidades.module.css";
import Image from "next/image";

const SPECIALTIES = [
  {
    id: "oncologia",
    name: "Oncología",
    shortDesc:
      "Brindamos atención especializada en la prevención, diagnóstico y tratamiento",
    fullDesc:
      "Contamos con un equipo de oncólogos especialistas que acompañan al paciente en cada etapa: prevención, diagnóstico temprano, tratamiento y seguimiento integral, siempre con calidez humana y los más altos estándares de calidad.",
    cover: "/images/especialidades/oncologia/1.jpg",
    gallery: [
      "/images/especialidades/oncologia/1.jpg",
      "/images/especialidades/oncologia/2.jpg",
      "/images/especialidades/oncologia/3.jpg",
    ],
  },
  {
    id: "neumologia",
    name: "Neumología",
    shortDesc:
      "Brindamos evaluación, diagnóstico y tratamiento de enfermedades respiratorias cuidando la salud pulmonar",
    fullDesc:
      "Evaluamos y tratamos enfermedades respiratorias con equipamiento moderno, enfocados en cuidar la salud pulmonar de nuestros pacientes a través de un diagnóstico preciso y un seguimiento cercano.",
    cover: "/images/especialidades/neumologia/1.jpg",
    gallery: [
      "/images/especialidades/neumologia/1.jpg",
      "/images/especialidades/neumologia/2.jpg",
      "/images/especialidades/neumologia/3.jpg",
    ],
  },
  {
    id: "cardiologia",
    name: "Endocrinología",
    shortDesc:
      "Hacemos evaluación y seguimiento de enfermedades del sitema hormonal y metabólico.",
    fullDesc:
      "Nuestro equipo de endocrinología ofrece evaluación integral, diagnóstico oportuno y tratamiento personalizado para el cuidado de la salud, acompañando al paciente con seguimiento continuo.",
    cover: "/images/especialidades/endocrinologia/1.jpg",
    gallery: [
      "/images/especialidades/endocrinologia/1.jpg",
      "/images/especialidades/endocrinologia/2.jpg",
      "/images/especialidades/endocrinologia/3.jpg",
    ],
  },
  {
    id: "ozonoterapia",
    name: "Ozonoterapia",
    shortDesc:
      "Brindamos terapia médica orientada al bienestar y acompañamiento integral del paciente",
    fullDesc:
      "Brindamos terapia médica orientada al bienestar y acompañamiento integral del paciente, aplicando protocolos seguros y personalizados según cada caso.",
    cover: "/images/especialidades/ozonoterapia/1.jpg",
    gallery: [
      "/images/especialidades/ozonoterapia/1.jpg",
      "/images/especialidades/ozonoterapia/2.jpg",
      "/images/especialidades/ozonoterapia/3.jpg",
    ],
  },
  {
    id: "terapia-sueno",
    name: "Terapia del Sueño",
    shortDesc:
      "Evaluamos y tratamos trastornos del sueño promoviendo un descanso reparador",
    fullDesc:
      "Evaluamos y tratamos trastornos del sueño promoviendo un descanso reparador como parte fundamental de la salud, con un enfoque integral y seguimiento personalizado.",
    cover: "/images/especialidades/terapia/1.jpg",
    gallery: [
      "/images/especialidades/terapia/1.jpg",
      "/images/especialidades/terapia/sueno-2.jpg",
      "/images/especialidades/terapia/sueno-3.jpg",
    ],
  },
  {
    id: "oftalmologia",
    name: "Oftalmología",
    shortDesc:
      "Realizamos evaluaciones oftalmológicas orientadas al cuidado integral de la visión",
    fullDesc:
      "Realizamos evaluaciones oftalmológicas orientadas al cuidado integral de la visión y la detección temprana de alteraciones visuales, con equipamiento especializado.",
    cover: "/images/especialidades/oftalmologia/1.jpg",
    gallery: [
      "/images/especialidades/oftalmologia/1.jpg",
      "/images/especialidades/oftalmologia/2.jpg",
      "/images/especialidades/oftalmologia/3.jpg",
    ],
  },
];

const MORE_HREF = "/especialidades";

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

  // Bloquea el scroll del body mientras el modal está abierto,
  // para que el nav fijo del sitio no quede "flotando" sobre el modal.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
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
          <Image
            key={slide}
            src={specialty.gallery[slide]}
            alt={`${specialty.name} ${slide + 1}`}
            fill
            priority={slide === 0}
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
              <Image
                src={sp.cover}
                alt={sp.name}
                width={400}
                height={300}
                className={styles.cardImage}
              />
            </span>
            <span className={styles.cardName}>{sp.name}</span>
            <span className={styles.cardDesc}>{sp.shortDesc}</span>
          </button>
        ))}
      </div>

      <a href={MORE_HREF} className={styles.moreLink}>
        <span className={styles.moreCircle}>
          <ChevronIcon direction="right" />
        </span>
        <span className={styles.moreLabel}>Ver más</span>
      </a>

      {activeSpecialty && (
        <SpecialtyModal
          specialty={activeSpecialty}
          onClose={() => setOpenId(null)}
        />
      )}
    </section>
  );
}