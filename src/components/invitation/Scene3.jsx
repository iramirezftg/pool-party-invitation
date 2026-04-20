import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  exit: { opacity: 0, scale: 1.1, transition: { duration: 0.4 } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.3, rotate: -15 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 250, damping: 15 } },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.06, 1],
    textShadow: [
      '3px 3px 0px #c0396c, 0 0 20px rgba(255,107,158,0.6)',
      '3px 3px 0px #c0396c, 0 0 45px rgba(255,107,158,1)',
      '3px 3px 0px #c0396c, 0 0 20px rgba(255,107,158,0.6)',
    ],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

const Scene3 = () => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      padding: '32px 28px',
      background: 'rgba(255, 50, 100, 0.18)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderRadius: '28px',
      border: '2px solid rgba(255,255,255,0.5)',
      boxShadow: '0 8px 40px rgba(255,107,158,0.5)',
      maxWidth: '360px',
      width: '90vw',
      maxHeight: '90vh',
      overflowY: 'auto',
    }}
  >
    {/* Animated alarm emoji */}
    <motion.p
      variants={popIn}
      style={{ fontSize: '3.5rem', lineHeight: 1 }}
    >
      🎉🤫🎉
    </motion.p>

    {/* FIESTA SORPRESA pulsing */}
    <motion.p
      variants={popIn}
      animate={pulseVariants.animate}
      style={{
        fontFamily: 'var(--font-accent)',
        fontSize: 'clamp(2rem, 9vw, 3.2rem)',
        color: '#FFD166',
        textShadow: '3px 3px 0px #b8860b, 0 0 20px rgba(255,209,102,0.6)',
        textAlign: 'center',
        lineHeight: 1.15,
        letterSpacing: '1px',
      }}
    >
      ¡FIESTA
    </motion.p>
    <motion.p
      variants={popIn}
      animate={pulseVariants.animate}
      style={{
        fontFamily: 'var(--font-accent)',
        fontSize: 'clamp(2rem, 9vw, 3.2rem)',
        color: '#FF6B9E',
        textShadow: '3px 3px 0px #c0396c, 0 0 20px rgba(255,107,158,0.6)',
        textAlign: 'center',
        lineHeight: 1.15,
        marginTop: '-10px',
        letterSpacing: '1px',
      }}
    >
      SORPRESA!
    </motion.p>

    {/* Divider */}
    <motion.div variants={popIn} style={{
      width: '75%',
      height: '3px',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
      borderRadius: '4px',
    }} />

    {/* Warning block with pulsing border */}
    <motion.div
      variants={popIn}
      animate={{
        boxShadow: [
          '0 0 0 2px rgba(255,107,158,0.4), inset 0 0 15px rgba(255,107,158,0.1)',
          '0 0 0 6px rgba(255,107,158,0.1), inset 0 0 30px rgba(255,107,158,0.2)',
          '0 0 0 2px rgba(255,107,158,0.4), inset 0 0 15px rgba(255,107,158,0.1)',
        ],
        transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '18px',
        padding: '16px 22px',
        border: '2px solid rgba(255,255,255,0.5)',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <p style={{
        fontFamily: 'var(--font-primary)',
        fontSize: 'clamp(1.1rem, 5vw, 1.5rem)',
        fontWeight: 700,
        color: '#fff',
        textShadow: '1px 2px 8px rgba(0,0,0,0.4)',
        letterSpacing: '1px',
      }}>
        ⏰ ¡LLEGA PUNTUAL! ⏰
      </p>
      <p style={{
        fontFamily: 'var(--font-primary)',
        fontSize: 'clamp(0.85rem, 3.5vw, 1rem)',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.85)',
        marginTop: '6px',
      }}>
        Es una sorpresa para Diego 🤫
      </p>
    </motion.div>

    <motion.p variants={popIn} style={{
      fontFamily: 'var(--font-primary)',
      fontSize: 'clamp(0.9rem, 3.8vw, 1.1rem)',
      color: 'rgba(255,255,255,0.85)',
      textAlign: 'center',
      fontWeight: 600,
    }}>
      🏊‍♀️ ¡Nos vemos en la piscina! 🏊‍♂️
    </motion.p>
  </motion.div>
);

export default Scene3;
