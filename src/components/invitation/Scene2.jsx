import React from 'react';
import { motion } from 'framer-motion';
import Countdown from './Countdown';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.45 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 180, damping: 16 } },
};

const InfoRow = ({ icon, label, value, delay }) => (
  <motion.div
    variants={slideUp}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      background: 'rgba(255,255,255,0.25)',
      borderRadius: '16px',
      padding: '14px 20px',
      border: '1.5px solid rgba(255,255,255,0.5)',
      width: '100%',
    }}
  >
    <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{icon}</span>
    <div style={{ textAlign: 'left' }}>
      <div style={{
        fontFamily: 'var(--font-primary)',
        fontWeight: 600,
        fontSize: '0.78rem',
        color: 'rgba(255,255,255,0.75)',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-primary)',
        fontWeight: 700,
        fontSize: 'clamp(1.05rem, 4.5vw, 1.3rem)',
        color: '#fff',
        textShadow: '1px 1px 6px rgba(0,0,0,0.3)',
        lineHeight: 1.2,
      }}>
        {value}
      </div>
    </div>
  </motion.div>
);

const Scene2 = () => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      padding: '20px 20px',
      background: 'rgba(0, 100, 200, 0.22)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderRadius: '28px',
      border: '2px solid rgba(255,255,255,0.45)',
      boxShadow: '0 8px 40px rgba(0,100,200,0.35)',
      maxWidth: '360px',
      width: '90vw',
      maxHeight: '90vh',
      overflowY: 'auto',
    }}
  >
    <motion.p variants={slideUp} style={{ fontSize: '2rem' }}>📋 Detalles del Evento</motion.p>

    <motion.p variants={slideUp} style={{
      fontFamily: 'var(--font-accent)',
      fontSize: 'clamp(1.4rem, 6vw, 2rem)',
      color: '#FFD166',
      textShadow: '2px 2px 0px #b8860b, 0 4px 12px rgba(0,0,0,0.3)',
      textAlign: 'center',
      lineHeight: 1.2,
    }}>
      ¡Te Esperamos!
    </motion.p>

    <InfoRow icon="📅" label="Fecha" value="Jueves 23 de Abril" />
    <InfoRow icon="⏰" label="Hora" value="3:00 PM" />
    <InfoRow icon="📍" label="Lugar" value="La Vaperia" />

    {/* ── Pase de entrada ── */}
    <motion.div
      variants={slideUp}
      style={{
        width: '100%',
        background: 'linear-gradient(135deg, rgba(255,209,102,0.18) 0%, rgba(0,140,255,0.22) 100%)',
        border: '2px dashed rgba(255,209,102,0.7)',
        borderRadius: '18px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Etiqueta flotante */}
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '10px',
        background: 'rgba(255,209,102,0.25)',
        border: '1px solid rgba(255,209,102,0.5)',
        borderRadius: '20px',
        padding: '2px 10px',
        fontFamily: 'var(--font-primary)',
        fontWeight: 700,
        fontSize: '0.65rem',
        color: '#FFD166',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
      }}>
        🎟️ Entrada
      </div>

      {/* Personas */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginTop: '8px' }}>

        {/* Adulto */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          {/* Cabeza */}
          <div style={{
            width: '26px', height: '26px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: '2px solid rgba(255,209,102,0.8)',
          }} />
          {/* Cuerpo */}
          <div style={{
            width: '36px', height: '44px',
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '10px 10px 6px 6px',
            border: '2px solid rgba(255,209,102,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>🏊</span>
          </div>
          <span style={{
            fontFamily: 'var(--font-primary)', fontWeight: 700,
            fontSize: '0.7rem', color: 'rgba(255,255,255,0.9)',
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>Adulto</span>
        </div>

        {/* Signo + */}
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '1.8rem', color: '#FFD166',
          lineHeight: 1, paddingBottom: '28px',
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}>+</div>

        {/* Niño */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          {/* Cabeza */}
          <div style={{
            width: '20px', height: '20px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: '2px solid rgba(100,200,255,0.9)',
          }} />
          {/* Cuerpo */}
          <div style={{
            width: '28px', height: '34px',
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '8px 8px 5px 5px',
            border: '2px solid rgba(100,200,255,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '0.9rem', lineHeight: 1 }}>🤽</span>
          </div>
          <span style={{
            fontFamily: 'var(--font-primary)', fontWeight: 700,
            fontSize: '0.7rem', color: 'rgba(255,255,255,0.9)',
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>Niño</span>
        </div>
      </div>

      {/* Texto aclaratorio */}
      <p style={{
        fontFamily: 'var(--font-primary)', fontWeight: 600,
        fontSize: 'clamp(0.75rem, 3vw, 0.85rem)',
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        margin: 0,
        lineHeight: 1.3,
      }}>
        Esta invitación es válida para<br />
        <span style={{ color: '#FFD166', fontWeight: 700 }}>1 adulto + 1 niño</span>
      </p>
    </motion.div>

    {/* ── Countdown ── */}
    <motion.div variants={slideUp} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Countdown />
    </motion.div>

    <motion.div variants={slideUp} style={{
      marginTop: '4px',
      background: 'rgba(255,209,102,0.25)',
      border: '1.5px solid rgba(255,209,102,0.6)',
      borderRadius: '14px',
      padding: '10px 20px',
    }}>
      <p style={{
        fontFamily: 'var(--font-primary)',
        fontWeight: 600,
        fontSize: 'clamp(0.9rem, 3.5vw, 1.05rem)',
        color: '#fff',
        textAlign: 'center',
        opacity: 0.9,
      }}>
        🍹 Trae tu traje de baño y muchas ganas de divertirte 🌊
      </p>
    </motion.div>
  </motion.div>
);

export default Scene2;
