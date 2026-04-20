import React from 'react';

const PoolBackground = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'linear-gradient(135deg, var(--color-water-1) 0%, var(--color-water-2) 100%)',
      zIndex: 1,
      overflow: 'hidden'
    }}>
      <style>
        {`
          .water-ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            animation: morph 8s ease-in-out infinite both alternate, float 10s ease-in-out infinite;
            filter: blur(8px);
          }
          @keyframes morph {
            0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
            34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
            67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
            100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          }
          @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(20px, -20px) rotate(10deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          .pool-grid {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: 
              linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px);
            background-size: 50px 50px;
            z-index: 2;
          }
        `}
      </style>
      
      {/* Sun reflections / moving water */}
      <div className="water-ripple" style={{ width: '150vw', height: '150vw', top: '-50vw', left: '-25vw', opacity: 0.6 }} />
      <div className="water-ripple" style={{ width: '80vw', height: '80vw', bottom: '-20vw', right: '-10vw', animationDelay: '-3s', opacity: 0.7 }} />
      <div className="water-ripple" style={{ width: '100vw', height: '100vw', top: '20%', left: '10%', animationDelay: '-5s', opacity: 0.5 }} />

      {/* Tiles line pattern */}
      <div className="pool-grid" />
    </div>
  );
};

export default PoolBackground;
