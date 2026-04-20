import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicButton = ({ isPlaying, onToggle }) => (
  <motion.button
    onClick={onToggle}
    whileHover={{ scale: 1.12 }}
    whileTap={{ scale: 0.88 }}
    title={isPlaying ? 'Silenciar música' : 'Reproducir música'}
    style={{
      position: 'fixed',
      bottom: '72px',
      right: '18px',
      zIndex: 50,
      width: '54px',
      height: '54px',
      borderRadius: '50%',
      border: '2.5px solid rgba(255,255,255,0.7)',
      background: isPlaying
        ? 'linear-gradient(135deg, #FF6B9E, #FFD166)'
        : 'rgba(0,100,200,0.4)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      boxShadow: isPlaying
        ? '0 0 18px rgba(255,107,158,0.7), 0 4px 12px rgba(0,0,0,0.3)'
        : '0 4px 12px rgba(0,0,0,0.25)',
      transition: 'background 0.3s, box-shadow 0.3s',
    }}
  >
    {/* Pulsing ring when playing */}
    <AnimatePresence>
      {isPlaying && (
        <motion.span
          key="ring"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 1.8, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid rgba(255,209,102,0.8)',
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
    <span style={{ position: 'relative', zIndex: 1, userSelect: 'none' }}>
      {isPlaying ? '🎵' : '🔇'}
    </span>
  </motion.button>
);

export default MusicButton;
