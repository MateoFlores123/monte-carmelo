"use client";
import { useRef, useState } from "react";
import styles from "./MusicPlayer.module.css";

// Coloca tu archivo de música en: public/audio/musica.mp3
const SRC = "/audio/musica.mp3";
const VOLUMEN = 0.35; // 0 a 1

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [sonando, setSonando] = useState(false);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (sonando) {
      a.pause();
      setSonando(false);
    } else {
      try {
        a.volume = VOLUMEN;
        await a.play();
        setSonando(true);
      } catch {
        // El navegador bloqueó la reproducción
        setSonando(false);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        className={`${styles.boton} ${sonando ? styles.activo : ""}`}
        aria-label={sonando ? "Pausar música" : "Reproducir música"}
        aria-pressed={sonando}
      >
        {sonando ? (
          // Icono pausa con barras animadas
          <span className={styles.barras} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        ) : (
          // Icono nota musical
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"
            />
          </svg>
        )}
      </button>
    </>
  );
}