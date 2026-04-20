import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.45 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.7 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 16 } },
};

// 3D extruded white text effect matching the reference image
const pool3D = {
  fontFamily: "'Bangers', cursive",
  fontSize: 'clamp(4.5rem, 18vw, 7.5rem)',
  color: '#FFFFFF',
  letterSpacing: '6px',
  lineHeight: 1,
  // Progressive shadow layers = 3D extrusion depth
  textShadow: `
    1px  1px 0 #d0eeff,
    2px  2px 0 #b8d8f0,
    3px  3px 0 #a0c4e0,
    4px  4px 0 #88b0d0,
    5px  5px 0 #709cbf,
    6px  6px 0 #5888ae,
    7px  7px 12px rgba(0,60,120,0.55)
  `,
  filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.35))',
};

// Cursive Party style matching the reference image script
const partyStyle = {
  fontFamily: "'Dancing Script', cursive",
  fontWeight: 700,
  fontSize: 'clamp(3rem, 12vw, 5.5rem)',
  color: '#FFFFFF',
  lineHeight: 1,
  textShadow: `
    2px 3px 0 rgba(0,60,120,0.5),
    0 6px 18px rgba(0,0,0,0.4)
  `,
  fontStyle: 'italic',
  marginTop: '-10px',
};

const Scene1 = () => (
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
      padding: '28px 32px 24px',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '28px',
      border: '2px solid rgba(255,255,255,0.5)',
      boxShadow: '0 8px 40px rgba(0,100,200,0.35)',
      maxWidth: '380px',
      width: '90vw',
    }}
  >
    {/* Wave header */}
    <motion.p variants={itemVariants} style={{ fontSize: '2rem', lineHeight: 1 }}>
      🌊🏊‍♂️🌊
    </motion.p>

    {/* POOL — big 3D letters */}
    <motion.div variants={itemVariants} style={pool3D}>
      POOL
    </motion.div>

    {/* Party — cursive script */}
    <motion.div variants={itemVariants} style={partyStyle}>
      Party!
    </motion.div>

    {/* Thin divider */}
    <motion.div variants={itemVariants} style={{
      width: '70%',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
      borderRadius: '4px',
      margin: '4px 0',
    }} />

    {/* Invitation text */}
    <motion.p variants={itemVariants} style={{
      fontFamily: "'Fredoka', sans-serif",
      fontSize: 'clamp(1rem, 4vw, 1.2rem)',
      fontWeight: 600,
      color: '#fff',
      textShadow: '1px 2px 6px rgba(0,0,0,0.35)',
      textAlign: 'center',
      lineHeight: 1.4,
    }}>
      te invita a celebrar
    </motion.p>

    {/* DIEGO name */}
    <motion.div
      variants={itemVariants}
      style={{
        fontFamily: "'Bangers', cursive",
        fontSize: 'clamp(3rem, 13vw, 5rem)',
        color: '#FFD166',
        letterSpacing: '4px',
        lineHeight: 1,
        textShadow: `
          1px 1px 0 #c8900a,
          2px 2px 0 #b07800,
          3px 3px 0 #986000,
          4px 4px 8px rgba(0,0,0,0.4)
        `,
      }}
    >
      DIEGO
    </motion.div>

    {/* Age badge */}
    <motion.div variants={itemVariants} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
      <span style={{ fontSize: '1.5rem' }}>🎂</span>
      <span style={{
        fontFamily: "'Fredoka', sans-serif",
        fontSize: 'clamp(1.1rem, 4.5vw, 1.4rem)',
        fontWeight: 700,
        color: '#fff',
        textShadow: '1px 2px 8px rgba(0,0,0,0.4)',
      }}>
        ¡Cumple 11 años!
      </span>
      <span style={{ fontSize: '1.5rem' }}>🎂</span>
    </motion.div>
  </motion.div>
);

export default Scene1;
