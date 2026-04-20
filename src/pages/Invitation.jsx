import React, { useState, useEffect, useCallback, useRef } from 'react';
import PoolBackground from '../components/invitation/PoolBackground';
import FloatingElements from '../components/invitation/FloatingElements';
import Scene1 from '../components/invitation/Scene1';
import Scene2 from '../components/invitation/Scene2';
import Scene3 from '../components/invitation/Scene3';
import WaterRipple from '../components/invitation/WaterRipple';
import MusicButton from '../components/invitation/MusicButton';
import { AnimatePresence, motion } from 'framer-motion';
import { usePoolMusic } from '../hooks/usePoolMusic';

const SCENE_DURATION = 5500;
let rippleId = 0;

const Invitation = () => {
  const [currentScene, setCurrentScene] = useState(1);
  const [isPaused, setIsPaused]         = useState(false);
  const [ripples, setRipples]           = useState([]);
  const music = usePoolMusic();
  const sceneRef = useRef(null);

  /* ── Auto-advance scenes ── */
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentScene(p => (p >= 3 ? 1 : p + 1));
    }, SCENE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goToScene = (n) => {
    setCurrentScene(n);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  /* ── Background click → water ripple + splash sound ── */
  const handleBgClick = useCallback((e) => {
    // Ignore if the click is on a card/button
    if (e.target.closest('button') || e.target.closest('.scene-card')) return;
    const id = ++rippleId;
    setRipples(r => [...r, { id, x: e.clientX, y: e.clientY }]);
    music.playSplash();
  }, [music]);

  const removeRipple = useCallback((id) => {
    setRipples(r => r.filter(rr => rr.id !== id));
  }, []);

  /* ── Auto-start music on first user interaction ── */
  const handleFirstInteraction = useCallback(() => {
    if (!music.isPlaying) music.start();
  }, [music]);

  return (
    <div
      onClick={(e) => { handleBgClick(e); handleFirstInteraction(); }}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        height: '100dvh',
        overflow: 'hidden',
        cursor: 'crosshair',
        /* Safe area para iPhones con notch / Dynamic Island */
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {/* Pool background */}
      <PoolBackground />

      {/* Water ripples printed at click position */}
      {ripples.map(r => (
        <WaterRipple key={r.id} x={r.x} y={r.y} onDone={() => removeRipple(r.id)} />
      ))}

      {/* Floating pool elements */}
      <FloatingElements onSplash={music.playSplash} />

      {/* Scene content */}
      <div
        ref={sceneRef}
        style={{
          position:'absolute', top:0, left:0, width:'100%', height:'100%',
          display:'flex', flexDirection:'column',
          justifyContent:'center', alignItems:'center',
          zIndex:10, padding:'20px',
          pointerEvents:'none',
        }}
      >
        <div className="scene-card" style={{ pointerEvents:'auto' }}>
          <AnimatePresence mode="wait">
            {currentScene === 1 && <Scene1 key="scene1" />}
            {currentScene === 2 && <Scene2 key="scene2" />}
            {currentScene === 3 && <Scene3 key="scene3" />}
          </AnimatePresence>
        </div>
      </div>

      {/* Hint tap text – fades after 4 s */}
      <motion.p
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 2 }}
        style={{
          position:'absolute', bottom:'100px', left:'50%',
          transform:'translateX(-50%)',
          fontFamily:"'Fredoka', sans-serif",
          fontSize:'0.85rem', fontWeight:600,
          color:'rgba(255,255,255,0.75)',
          textShadow:'0 1px 4px rgba(0,0,0,0.3)',
          pointerEvents:'none', zIndex:20,
          whiteSpace:'nowrap',
        }}
      >
        👆 Toca el agua para salpicarte · Haz clic en los flotadores 🏊‍♂️
      </motion.p>

      {/* Progress bar */}
      <div style={{
        position:'absolute', bottom:'52px', left:'50%',
        transform:'translateX(-50%)', zIndex:20,
        width:'200px', height:'4px',
        background:'rgba(255,255,255,0.25)', borderRadius:'4px', overflow:'hidden',
      }}>
        <motion.div
          key={currentScene + (isPaused ? '-p' : '')}
          initial={{ width:'0%' }}
          animate={{ width: isPaused ? '50%' : '100%' }}
          transition={{ duration: isPaused ? 0 : SCENE_DURATION / 1000, ease:'linear' }}
          style={{ height:'100%', background:'rgba(255,255,255,0.85)', borderRadius:'4px' }}
        />
      </div>

      {/* Scene dot indicators */}
      <div style={{
        position:'absolute', bottom:'20px', left:'50%',
        transform:'translateX(-50%)',
        display:'flex', gap:'12px', zIndex:20,
      }}>
        {[1,2,3].map(n => (
          <motion.button
            key={n}
            onClick={(e) => { e.stopPropagation(); goToScene(n); music.playPop(); }}
            whileHover={{ scale:1.35 }}
            whileTap={{ scale:0.85 }}
            style={{
              width: currentScene === n ? '28px' : '12px',
              height:'12px', borderRadius:'6px',
              border:'2px solid rgba(255,255,255,0.8)',
              background: currentScene === n ? '#fff' : 'transparent',
              cursor:'pointer', padding:0,
              transition:'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Music toggle button */}
      <MusicButton isPlaying={music.isPlaying} onToggle={(e) => { e.stopPropagation(); music.toggle(); }} />
    </div>
  );
};

export default Invitation;
