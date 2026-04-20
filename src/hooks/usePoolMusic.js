import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * Para usar tu propia canción:
 *  1. Copia tu archivo de audio a /public/cancion.mp3  (o .ogg, .wav, etc.)
 *  2. Cambia SONG_PATH al nombre de tu archivo si es diferente.
 */
const SONG_PATH   = '/cancion.mp3';   // ← Cambia esto si tu archivo tiene otro nombre
const START_TIME  = 25;              // ← Segundo desde donde empieza la reproducción

export function usePoolMusic() {
  const audioRef = useRef(null);
  const ctxRef   = useRef(null);   // para efectos de sonido (pop/splash)
  const [isPlaying, setIsPlaying] = useState(false);

  /* ── Crear elemento <audio> una sola vez ── */
  useEffect(() => {
    const audio = new Audio(SONG_PATH);
    audio.loop        = true;
    audio.volume      = 0.65;
    
    // Esperar a que cargue la info para asignar el tiempo correctamente (Safari/iOS es delicado con esto)
    audio.addEventListener('loadedmetadata', () => {
      if (audio.currentTime < START_TIME) {
        audio.currentTime = START_TIME;
      }
    });

    audioRef.current  = audio;

    audio.addEventListener('play',  () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('ended', () => setIsPlaying(false));

    // Intentar auto-reproducir inmediatamente que se crea el reproductor
    audio.play().catch(() => {
      // Si el navegador (Chrome/Safari) lo bloquea por políticas de interacción, no pasa nada, 
      // lo iniciará el usuario con el primer tap en la pantalla
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  /* ── Controles ── */
  const start = useCallback(() => {
    if (audioRef.current) {
      // Forzar el inicio en el segundo 25 cada vez que iniciamos si el tiempo actual es menor
      if (audioRef.current.currentTime < START_TIME) {
        audioRef.current.currentTime = START_TIME;
      }
      audioRef.current.play().catch(() => {
        // Bloqueado hasta interacción del usuario
      });
    }
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) start();
    else stop();
  }, [start, stop]);

  /* ── Contexto de audio para efectos de sonido (pop/splash) ── */
  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  /* Sonido "pop" al hacer clic en los dots de escena */
  const playPop = useCallback(() => {
    try {
      const ctx  = getCtx();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch (_) {}
  }, [getCtx]);

  /* Sonido "splash" al hacer clic en el agua o en los flotadores */
  const playSplash = useCallback(() => {
    try {
      const ctx    = getCtx();
      const frames = ctx.sampleRate * 0.3;
      const buf    = ctx.createBuffer(1, frames, ctx.sampleRate);
      const data   = buf.getChannelData(0);
      for (let i = 0; i < frames; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.06));
      }
      const src    = ctx.createBufferSource();
      src.buffer   = buf;
      const filter = ctx.createBiquadFilter();
      filter.type  = 'bandpass';
      filter.frequency.value = 800;
      filter.Q.value = 0.5;
      const gain   = ctx.createGain();
      src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      src.start(ctx.currentTime);
    } catch (_) {}
  }, [getCtx]);

  useEffect(() => () => { ctxRef.current?.close(); }, []);

  return { isPlaying, start, stop, toggle, playPop, playSplash };
}
