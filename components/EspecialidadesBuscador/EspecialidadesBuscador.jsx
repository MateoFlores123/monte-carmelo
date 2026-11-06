"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import styles from "./EspecialidadesBuscador.module.css";
import { whatsappLink } from "@/lib/site";

// Lista completa de especialidades. Agrega, quita o reordena libremente.
const ALL_SPECIALTIES = [
  "Cardiología",
  "Cirugía Oncológica",
  "Dermatología",
  "Endocrinología",
  "Fisioterapia y Rehabilitación Física",
  "Gastroenterología y Endoscopía Digestiva",
  "Ginecología y Obstetricia",
  "Hematología",
  "Medicina General",
  "Medicina Interna",
  "Medicina Ocupacional",
  "Nefrología",
  "Neumología",
  "Neumología Pediátrica",
  "Neurología",
  "Nutrición",
  "Odontología",
  "Oftalmología",
  "Oncología Clínica",
  "Otorrinolaringología",
  "Psicología",
  "Patología",
  "Pediatría",
  "Psiquiatría",
  "Radiología y Ecografía",
  "Reumatología",
  "Traumatología y Ortopedia",
  "Urología",
];

// Antes apuntaba a un número de ejemplo (51999999999): las citas no
// llegaban a nadie. Ahora usa el WhatsApp real definido en lib/site.ts.

function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function SpecialtyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
         strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7.3-4.4-9.2-9A5 5 0 0 1 12 6.6 5 5 0 0 1 21.2 12c-1.9 4.6-9.2 9-9.2 9Z" />
      <path d="M8.3 12.5h1.8l1-2 1.6 4 1-2h2" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export default function EspecialidadesBuscador() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return ALL_SPECIALTIES;
    return ALL_SPECIALTIES.filter((name) => normalize(name).includes(q));
  }, [query]);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <Image src="/logo-color.webp" alt="Monte Carmelo Centro Médico Arequipa" width={179} height={40} className={styles.logo} style={{ height: "auto" }} priority />

        <div className={styles.headerText}>
          <a href="/" className={styles.backLink}>
            ← Volver al inicio
          </a>
          <span className={styles.eyebrow}>Nuestra oferta médica</span>
          <h1 className={styles.title}>Especialidades médicas en Arequipa</h1>
          <p className={styles.subtitle}>
            Más de 28 especialidades en Monte Carmelo Centro Médico.
            Encuentra la que necesitas y agenda tu cita directamente por
            WhatsApp.
          </p>
        </div>
      </div>

      <div className={styles.searchWrap}>
        <span className={styles.searchIcon} aria-hidden="true">
          <SearchIcon />
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar especialidad, ej. Cardiología..."
          className={styles.searchInput}
          aria-label="Buscar especialidad"
        />
        {query && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => setQuery("")}
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>

      <p className={styles.count}>
        {filtered.length}{" "}
        {filtered.length === 1 ? "especialidad" : "especialidades"}
      </p>

      <div className={styles.grid}>
        {filtered.map((name) => (
          <article key={name} className={styles.card}>
            <span className={styles.cardIcon} aria-hidden="true">
              <SpecialtyIcon />
            </span>
            <h2 className={styles.cardName}>{name}</h2>
            <a
              href={whatsappLink(`Hola, quisiera agendar una cita en ${name}`)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardCta}
            >
              Agendar cita
            </a>
          </article>
        ))}

        {filtered.length === 0 && (
          <p className={styles.empty}>
            No encontramos especialidades para “{query}”.
          </p>
        )}
      </div>
    </main>
  );
}