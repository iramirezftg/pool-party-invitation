import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Fecha objetivo: 23 de Abril, 3:00 PM ── */
const TARGET = new Date('2026-04-23T15:00:00');

function getTimeLeft() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null; // ya pasó el evento
  return {
    dias:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos:Math.floor((diff / 1000) % 60),
  };
}

/* Dígito animado: rebota cuando cambia */
const Digit = ({ value, label }) => {
  const display = String(value).padStart(2, '0');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <div
        style={{
          position: 'relative',
          width: 'clamp(52px, 14vw, 66px)',
          height: 'clamp(52px, 14vw, 66px)',
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '14px',
          border: '1.5px solid rgba(255,255,255,0.45)',
          boxShadow: '0 4px 18px rgba(0,80,180,0.28)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            exit={{    y:  30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: 'clamp(1.7rem, 6vw, 2.2rem)',
              color: '#fff',
              letterSpacing: '2px',
              textShadow: '0 2px 8px rgba(0,0,0,0.35)',
              position: 'absolute',
            }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(0.6rem, 2.5vw, 0.75rem)',
          color: 'rgba(255,255,255,0.82)',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
        }}
      >
        {label}
      </span>
    </div>
  );
};

/* Separador parpadeante */
const Colon = () => (
  <motion.span
    animate={{ opacity: [1, 0.15, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
    style={{
      fontFamily: "'Bangers', cursive",
      fontSize: 'clamp(1.6rem, 6vw, 2.1rem)',
      color: 'rgba(255,255,255,0.7)',
      lineHeight: 1,
      paddingBottom: '18px',   // alinea con los dígitos
      userSelect: 'none',
    }}
  >
    :
  </motion.span>
);

const Countdown = () => {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  /* Si el evento ya pasó */
  if (!time) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          padding: '12px 24px',
          background: 'rgba(255,209,102,0.28)',
          border: '1.5px solid rgba(255,209,102,0.65)',
          borderRadius: '16px',
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(1rem, 4vw, 1.2rem)',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        🎉 ¡La fiesta ya comenzó! 🌊
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 180, damping: 18 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 18px 12px',
        background: 'rgba(0,100,200,0.22)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderRadius: '22px',
        border: '2px solid rgba(255,255,255,0.38)',
        boxShadow: '0 6px 32px rgba(0,80,180,0.3)',
        width: '90vw',
        maxWidth: '340px',
      }}
    >
      {/* Título */}
      <p
        style={{
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(0.85rem, 3.5vw, 1rem)',
          color: '#FFD166',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          margin: 0,
          textShadow: '0 1px 6px rgba(0,0,0,0.3)',
        }}
      >
        ⏳ Faltan…
      </p>

      {/* Dígitos */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Digit value={time.dias}     label="días"    />
        <Colon />
        <Digit value={time.horas}    label="horas"   />
        <Colon />
        <Digit value={time.minutos}  label="min"     />
        <Colon />
        <Digit value={time.segundos} label="seg"     />
      </div>
    </motion.div>
  );
};

export default Countdown;
