// Contacto.jsx
"use client";
import { useState } from "react";
import styles from "./Contacto.module.css";

const IconAsistencial = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.2s-7.3-4.4-9.2-9A5 5 0 0 1 12 6.6 5 5 0 0 1 21.2 11.2c-1.9 4.6-9.2 9-9.2 9Z" />
    <path d="M8.3 12h1.8l1-2 1.6 4 1-2h2" />
  </svg>
);

const IconOcupacional = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"
       strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="8.5" width="17" height="10.5" rx="1.8" />
    <path d="M8.5 8.5V6.3A1.8 1.8 0 0 1 10.3 4.5h3.4a1.8 1.8 0 0 1 1.8 1.8V8.5" />
    <path d="M3.5 13h17" />
    <path d="M11 13v2" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"
       strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M4 6.5 12 13l8-6.5" />
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z" />
  </svg>
);

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-6.8-6.1-6.8-11.2A6.8 6.8 0 0 1 12 3a6.8 6.8 0 0 1 6.8 6.8C18.8 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.6" r="2.3" />
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h15" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

/* Cambia estos datos por los reales de cada área. mapQuery es lo que
   se busca en Google Maps — puede ser una dirección o un nombre de
   sede si cada área atiende en un lugar distinto. */
const CONTACTS = {
  asistencial: {
    key: "asistencial",
    Icon: IconAsistencial,
    eyebrow: "Atención a pacientes",
    title: "Medicina Asistencial",
    email: "asistencial@montecarmelo.pe",
    phone: "+51 987 654 321",
    phoneHref: "+51987654321",
    mapQuery: "Centro Médico Monte Carmelo, Arequipa",
  },
  ocupacional: {
    key: "ocupacional",
    Icon: IconOcupacional,
    eyebrow: "Salud en el trabajo",
    title: "Medicina Ocupacional",
    email: "ocupacional.comercial@montecarmelocm.com",
    phone: "+51 912 345 678",
    phoneHref: "+51991437584",
    mapQuery: "Centro Médico Monte Carmelo, Arequipa",
  },
};

const INITIAL_FORM = { name: "", email: "", phone: "", message: "" };

export default function Contacto() {
  const [area, setArea] = useState("asistencial");
  const [form, setForm] = useState(INITIAL_FORM);
  const [sent, setSent] = useState(false);

  const contact = CONTACTS[area];
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setSent(false);
  }

  // Arma un mailto prellenado hacia el correo del área activa. Cuando
  // conectes un backend (Formspree, Resend, tu propia API), este es el
  // único lugar que hay que cambiar.
  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Consulta — ${contact.title}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nTeléfono: ${form.phone || "—"}\nÁrea: ${contact.title}\n\nMensaje:\n${form.message}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contacto" className={styles.contacto}>
      {/* Franja morada: solo el título, con ondas teal finas encima */}
      <div className={styles.band}>
        <svg className={styles.bandWaves} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,70 C 220,30 340,90 600,55 C 860,20 980,80 1220,45 C 1320,32 1380,40 1440,36"
            fill="none" stroke="var(--teal)" strokeWidth="1.1" strokeLinecap="round" opacity="0.55"
          />
          <path
            d="M0,90 C 240,55 380,105 640,78 C 900,50 1000,98 1260,70 C 1340,60 1390,66 1440,62"
            fill="none" stroke="var(--teal-light)" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"
          />
        </svg>
        <div className={styles.bandInner}>
          <span className={styles.eyebrow}>Hablemos</span>
          <h2 className={styles.title}>Contacto</h2>
        </div>
        <svg className={styles.bandBottom} viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 C 360,34 1080,-4 1440,20 L1440,40 L0,40 Z" fill="var(--ivory)" />
        </svg>
      </div>

      <div className={styles.layout}>
        {/* Panel de foto, en duotono suave */}
        <div className={styles.photoPanel}>
          <div className={styles.photoImg} />
        </div>

        <div className={styles.rightCol}>
          {/* Switch entre áreas */}
          <div className={styles.switch} role="tablist" aria-label="Elegir área">
            <span
              className={styles.switchThumb}
              style={{ transform: area === "ocupacional" ? "translateX(100%)" : "translateX(0%)" }}
              aria-hidden="true"
            />
            <button
              role="tab"
              aria-selected={area === "asistencial"}
              className={styles.switchBtn}
              onClick={() => setArea("asistencial")}
            >
              Asistencial
            </button>
            <button
              role="tab"
              aria-selected={area === "ocupacional"}
              className={styles.switchBtn}
              onClick={() => setArea("ocupacional")}
            >
              Ocupacional
            </button>
          </div>

          {/* Info de contacto de la área activa */}
          <div className={styles.infoRow}>
            <div className={styles.infoText}>
              <span className={styles.infoEyebrow}>{contact.eyebrow}</span>
              <span className={styles.infoTitle}>{contact.title}</span>
            </div>
            <div className={styles.infoLinks}>
              <a href={`mailto:${contact.email}`} className={styles.infoLink}>
                <IconMail /> {contact.email}
              </a>
              <a href={`tel:${contact.phoneHref}`} className={styles.infoLink}>
                <IconPhone /> {contact.phone}
              </a>
            </div>
            <a href={mapHref} target="_blank" rel="noopener noreferrer" className={styles.mapBtn}>
              <IconPin /> Ver ubicación
            </a>
          </div>

          {/* Formulario: cada campo en un rectángulo morado transparente */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span>Nombre</span>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" required />
              </label>

              <label className={styles.field}>
                <span>Teléfono</span>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+51 ..." />
              </label>

              <label className={`${styles.field} ${styles.fieldFull}`}>
                <span>Correo</span>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tucorreo@ejemplo.com" required />
              </label>

              <label className={`${styles.field} ${styles.fieldFull}`}>
                <span>Mensaje</span>
                <textarea name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Cuéntanos en qué podemos ayudarte" required />
              </label>
            </div>

            <button type="submit" className={styles.submit}>
              Enviar a {contact.title.toLowerCase()} <IconArrow />
            </button>

            {sent && <p className={styles.sentMsg}>Se abrió tu correo con el mensaje listo para enviar.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}