import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const floatAnim = (delay = 0, duration = 4, x = 10, y = 15) => ({
  y: [-y, y, -y],
  x: [-x, x, -x],
  rotate: [-5, 5, -5],
  transition: { duration, repeat: Infinity, ease: 'easeInOut', delay },
});

/* ── Splash burst that appears on click ── */
const SplashBurst = ({ onDone }) => {
  const drops = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return { x: Math.cos(angle) * 45, y: Math.sin(angle) * 45 };
  });
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={onDone}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30 }}
    >
      {drops.map((d, i) => (
        <motion.div key={i}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{ x: d.x, y: d.y, scale: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: 10, height: 10,
            borderRadius: '50%',
            background: 'rgba(135,205,237,0.9)',
            boxShadow: '0 0 6px rgba(255,255,255,0.8)',
            transform: 'translate(-50%,-50%)',
          }}
        />
      ))}
      {/* Central flash */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0.9 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: 20, height: 20,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.85)',
          transform: 'translate(-50%,-50%)',
        }}
      />
    </motion.div>
  );
};

/* ── SVG Elements ── */
const BeachBall = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#f5f5f5" />
    <path d="M50 2 Q75 25 75 50 Q75 75 50 98 Q25 75 25 50 Q25 25 50 2Z" fill="#FF6B9E" opacity=".9" />
    <path d="M2 50 Q25 25 50 25 Q75 25 98 50 Q75 75 50 75 Q25 75 2 50Z" fill="#FFD166" opacity=".9" />
    <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
    <ellipse cx="35" cy="30" rx="8" ry="5" fill="rgba(255,255,255,0.6)" transform="rotate(-30,35,30)" />
  </svg>
);

const DonutFloat = ({ size = 90, color = '#FF6B9E' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" fill={color} />
    <circle cx="50" cy="50" r="22" fill="#87CDED" />
    {[[25,22,30],[75,22,-30],[20,75,20],[80,75,-20],[50,18,0]].map(([x,y,r],i)=>(
      <rect key={i} x={x-6} y={y-2} width="12" height="4" rx="2"
        fill={['#06D6A0','#FFD166','#fff','#FF6B9E','#0093E9'][i]}
        transform={`rotate(${r},${x},${y})`} />
    ))}
    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
    <ellipse cx="35" cy="30" rx="6" ry="4" fill="rgba(255,255,255,0.5)" transform="rotate(-30,35,30)" />
  </svg>
);

const Lifebuoy = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#fff" />
    <path d="M50 4 A46 46 0 0 1 96 50" fill="#FF4444" />
    <path d="M96 50 A46 46 0 0 1 50 96" fill="#fff" />
    <path d="M50 96 A46 46 0 0 1 4 50" fill="#FF4444" />
    <path d="M4 50 A46 46 0 0 1 50 4" fill="#fff" />
    <circle cx="50" cy="50" r="22" fill="#87CDED" />
    <ellipse cx="35" cy="30" rx="5" ry="3" fill="rgba(255,255,255,0.6)" transform="rotate(-30,35,30)" />
  </svg>
);

const PalmLeaf = ({ size = 90, flip = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 120" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
    <path d="M50 110 Q52 70 70 20 Q80 0 90 5 Q85 15 78 35 Q68 60 50 110Z" fill="#06D6A0" />
    <path d="M50 110 Q48 70 30 20 Q20 0 10 5 Q15 15 22 35 Q32 60 50 110Z" fill="#04C48B" />
    <path d="M50 110 Q52 65 90 40 Q100 35 100 45 Q88 52 72 70 Q60 85 50 110Z" fill="#06D6A0" />
    <path d="M50 110 Q48 65 10 40 Q0 35 0 45 Q12 52 28 70 Q40 85 50 110Z" fill="#04C48B" />
    <line x1="50" y1="110" x2="70" y2="20" stroke="#04A877" strokeWidth="1.5" />
    <line x1="50" y1="110" x2="30" y2="20" stroke="#04A877" strokeWidth="1.5" />
  </svg>
);

const Starfish = ({ size = 55 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="#FF6B35" />
    <polygon points="50,15 58,38 82,38 63,52 70,76 50,62 30,76 37,52 18,38 42,38" fill="#FF8C5A" />
    <circle cx="50" cy="50" r="10" fill="#FF6B35" />
    <ellipse cx="38" cy="35" rx="4" ry="2.5" fill="rgba(255,255,255,0.4)" transform="rotate(-20,38,35)" />
  </svg>
);

const Flamingo = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 130">
    <ellipse cx="55" cy="55" rx="28" ry="35" fill="#FF9EC4" />
    <ellipse cx="60" cy="50" rx="20" ry="12" fill="#FFB6D1" transform="rotate(-20,60,50)" />
    <path d="M45 30 Q38 15 42 5" stroke="#FF9EC4" strokeWidth="8" fill="none" strokeLinecap="round" />
    <circle cx="42" cy="5" r="9" fill="#FF9EC4" />
    <path d="M47 6 Q55 8 52 12 Q46 10 47 6Z" fill="#FF6B9E" />
    <circle cx="40" cy="4" r="2" fill="#333" />
    <circle cx="40.8" cy="3.3" r="0.8" fill="white" />
    <line x1="50" y1="88" x2="48" y2="115" stroke="#FF9EC4" strokeWidth="4" strokeLinecap="round" />
    <line x1="60" y1="88" x2="62" y2="115" stroke="#FF9EC4" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const Umbrella = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 120">
    <path d="M10 50 Q50 0 90 50Z" fill="#FF6B9E"/>
    <path d="M10 50 Q20 10 50 5 Q50 0 30 50Z" fill="#FFD166"/>
    <path d="M30 50 Q40 5 60 5 Q60 0 50 50Z" fill="#FF6B9E"/>
    <path d="M50 50 Q60 5 80 10 Q90 0 70 50Z" fill="#FFD166"/>
    <line x1="50" y1="50" x2="50" y2="110" stroke="#8B4513" strokeWidth="3" strokeLinecap="round"/>
    <path d="M50 110 Q60 120 65 115" stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
);

const ELEMENTS = [
  { C: BeachBall,  pos: { top:'5%',  left:'4%'   }, anim: floatAnim(0,   3.5, 8,  12), size: 72 },
  { C: DonutFloat, pos: { top:'7%',  right:'3%'  }, anim: floatAnim(1,   4,   10, 16), size: 80, extra:{color:'#FF6B9E'} },
  { C: Lifebuoy,   pos: { bottom:'11%', left:'3%'}, anim: floatAnim(0.5, 4.5, 12, 10), size: 76 },
  { C: PalmLeaf,   pos: { top:'0%',  left:'-2%'  }, anim: floatAnim(0.2, 5,   5,  8),  size: 110 },
  { C: PalmLeaf,   pos: { top:'0%',  right:'-2%' }, anim: floatAnim(0.8, 4.8, 5,  8),  size: 110, extra:{flip:true} },
  { C: Starfish,   pos: { bottom:'19%', right:'6%'}, anim: floatAnim(1.5, 3.8, 8,  8), size: 52 },
  { C: Starfish,   pos: { top:'42%', left:'2%'   }, anim: floatAnim(0.7, 4.2, 5,  10), size: 44 },
  { C: DonutFloat, pos: { bottom:'4%', right:'2%'}, anim: floatAnim(2,   5,   8,  14), size: 84, extra:{color:'#06D6A0'} },
  { C: Flamingo,   pos: { bottom:'3%', left:'17%'}, anim: floatAnim(1.2, 4.5, 6,  10), size: 82 },
  { C: BeachBall,  pos: { bottom:'8%', right:'24%'},anim: floatAnim(0.3, 3.8, 9,  12), size: 58 },
  { C: Umbrella,   pos: { top:'20%', right:'1%'  }, anim: floatAnim(0.9, 5.2, 5,  8),  size: 82 },
];

/* ── Single interactive floating element ── */
const FloatingItem = ({ C, pos, anim, size, extra = {}, onSplash }) => {
  const [splashing, setSplashing] = useState(false);
  const [tapped, setTapped]       = useState(false);

  const handleClick = useCallback(() => {
    setSplashing(true);
    setTapped(true);
    onSplash?.();
    setTimeout(() => setTapped(false), 400);
  }, [onSplash]);

  return (
    <motion.div
      style={{ position:'absolute', cursor:'pointer', ...pos }}
      animate={anim}
    >
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.18, filter: 'brightness(1.2) drop-shadow(0 6px 14px rgba(255,255,255,0.55))' }}
        animate={tapped ? { rotate:[0,-20,20,-15,15,-10,0], scale:[1,1.3,0.9,1.1,1] } : {}}
        transition={tapped ? { duration: 0.35, ease:'easeOut' } : { duration: 0.2 }}
        style={{ position:'relative', display:'inline-block' }}
      >
        <C size={size} {...extra} />
        <AnimatePresence>
          {splashing && (
            <SplashBurst key="splash" onDone={() => setSplashing(false)} />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/* ── Main container ── */
const FloatingElements = ({ onSplash }) => (
  <div style={{ position:'absolute', inset:0, zIndex:5, pointerEvents:'none' }}>
    {ELEMENTS.map((el, i) => (
      <div key={i} style={{ pointerEvents:'auto' }}>
        <FloatingItem {...el} onSplash={onSplash} />
      </div>
    ))}
  </div>
);

export default FloatingElements;
