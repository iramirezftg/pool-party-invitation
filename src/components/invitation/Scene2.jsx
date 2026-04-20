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

    {/* ── Pase de entrada (Refinado para móviles) ── */}
    <motion.div
      variants={slideUp}
      style={{
        width: '100%',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '16px',
        border: '1px dashed rgba(255, 209, 102, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-10px',
        background: '#FFD166',
        color: '#004488',
        padding: '2px 12px',
        borderRadius: '10px',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }}>
        Pase de Entrada
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(10px, 4vw, 20px)',
        width: '100%',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(1.8rem, 6vw, 2.4rem)' }}>👨‍💼</div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginTop: '4px' }}>1 Adulto</p>
        </div>
        
        <div style={{ fontSize: '1.2rem', color: '#FFD166', fontWeight: 'bold' }}>+</div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>👦</div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginTop: '4px' }}>1 Niño</p>
        </div>
      </div>

      <div style={{
        width: '100%',
        height: '1px',
        background: 'rgba(255,255,255,0.2)',
        margin: '2px 0'
      }} />

      <p style={{
        fontFamily: 'var(--font-primary)',
        fontSize: 'clamp(0.75rem, 3.5vw, 0.9rem)',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        margin: 0,
      }}>
        Válido para <span style={{ color: '#FFD166' }}>1 Adulto + 1 Niño</span>
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
