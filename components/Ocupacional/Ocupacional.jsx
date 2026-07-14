import styles from "./Ocupacional.module.css";

// Las tres etapas del cuidado ocupacional. El orden importa: primero se
// evalúa, luego se previene, luego se gestiona la información — por eso
// van numeradas y unidas por la misma línea teal que borda el Hero.
const STAGES = [
  {
    num: "01",
    title: "Evaluamos",
    accent: "teal",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1Z" />
        <rect x="6" y="5" width="12" height="16" rx="2" />
        <path d="M9 11l2 2 4-4" />
      </svg>
    ),
    items: [
      "Exámenes pre ocupacionales",
      "Exámenes periódicos",
      "Exámenes de retiro",
      "Exámenes complementarios",
    ],
  },
  {
    num: "02",
    title: "Prevenimos",
    accent: "plum",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        <path d="M12 8v5M12 15.5h.01" />
      </svg>
    ),
    items: [
      "Enfermedades ocupacionales",
      "Riesgos laborales",
      "Alteraciones de salud relacionadas al trabajo",
      "Vigilancia médica ocupacional",
    ],
  },
  {
    num: "03",
    title: "Gestionamos",
    accent: "teal",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 15l2.5-3 2.5 2 3-4" />
        <path d="M8 8h.01M11 8h5" />
      </svg>
    ),
    items: [
      "Resultados médicos ocupacionales",
      "Reportes para empresas",
      "Plataforma digital MEDIWEB",
      "Información segura y confidencial",
    ],
  },
];

export default function Ocupacional() {
  return (
    <section id="ocupacional" className={styles.section}>
      {/* Costura con el Hero: retoma el blanco de su bottomWave */}
      <svg
        className={styles.topWave}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className={styles.topWaveFill}
          d="M0,0 L1440,0 L1440,30 C1200,55 960,10 720,20 C480,30 240,60 0,25 Z"
        />
      </svg>

      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Salud ocupacional</span>
          <h2 className={styles.title}>Medicina Ocupacional</h2>
          <p className={styles.text}>
            En Centro Médico Monte Carmelo contamos con una Unidad de{" "}
            <strong>Medicina Ocupacional</strong> activa desde el año{" "}
            <strong>2008</strong>, especializada en la evaluación y
            prevención de la salud de los trabajadores. Brindamos{" "}
            <strong>Exámenes Médicos Ocupacionales (EMO)</strong> adaptados
            al perfil y riesgos de cada puesto laboral.
          </p>
          <div className={styles.statRow}>
            <span className={styles.stat}>
              <span className={styles.statNum}>+15</span> años de experiencia
            </span>
            <span className={styles.stat}>
              <span className={styles.statNum}>3</span> etapas de
              acompañamiento
            </span>
          </div>
        </header>

        {/* Hilo del cuidado: evaluamos → prevenimos → gestionamos */}
        <div className={styles.pathway}>
          <svg
            className={styles.thread}
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="threadFade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.1" />
                <stop offset="18%" stopColor="var(--teal)" stopOpacity="0.5" />
                <stop offset="50%" stopColor="var(--teal)" stopOpacity="0.5" />
                <stop offset="82%" stopColor="var(--teal)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--teal)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path
              d="M100,23 C 300,-40 300,150 600,93 C 900,36 900,150 1100,63"
              fill="none"
              stroke="url(#threadFade)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <div className={styles.cards}>
            {STAGES.map((stage, i) => (
              <article
                key={stage.num}
                className={`${styles.card} ${
                  i === 1 ? styles.cardStage2 : ""
                }`}
                style={{ "--delay": `${i * 0.12}s` }}
                data-accent={stage.accent}
              >
                <div className={styles.cardTop}>
                  <span className={styles.iconWrap}>{stage.icon}</span>
                  <span className={styles.stageNum}>{stage.num}</span>
                </div>
                <h3 className={styles.cardTitle}>{stage.title}</h3>
                <ul className={styles.list}>
                  {stage.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}