import styles from "./LegalDoc.module.css";

export default function LegalDoc({ eyebrow, title, updated, children }) {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>Última actualización: {updated}</p>
        <div className={styles.content}>{children}</div>
      </div>
    </main>
  );
}