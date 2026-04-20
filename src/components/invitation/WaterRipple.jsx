import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * A single water ripple that expands and fades at (x, y).
 * Calls onDone when the animation completes so parent can clean up.
 */
const WaterRipple = ({ x, y, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ width: 0, height: 0, opacity: 0.85 }}
      animate={{ width: 160, height: 160, opacity: 0 }}
      transition={{ duration: 0.85, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        border: '3px solid rgba(255, 255, 255, 0.75)',
        boxShadow: '0 0 12px rgba(255,255,255,0.4)',
        pointerEvents: 'none',
        zIndex: 8,
      }}
    />
  );
};

export default WaterRipple;
