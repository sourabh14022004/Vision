import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * SplashScreen
 * ─────────────
 * Shows the splash video fullscreen.
 * Exits once the Spline model fires its 'load' event (modelLoaded = true)
 * or after a 12-second safety timeout — whichever comes first.
 */
const SAFETY_TIMEOUT_MS = 12_000;
const EXIT_DURATION_MS  = 900;

const SplashScreen = ({ modelLoaded = false, onFinish }) => {
  const videoRef  = useRef(null);
  const exitingRef = useRef(false);

  const [opacity,   setOpacity]   = useState(1); // fully visible from frame 1
  const [isExiting, setIsExiting] = useState(false);

  // ── Exit sequence ──────────────────────────────────────────────────────────
  const startExit = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setIsExiting(true);
    setOpacity(0);
    setTimeout(() => onFinish?.(), EXIT_DURATION_MS);
  }, [onFinish]);

  // ── Safety timeout ─────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(startExit, SAFETY_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [startExit]);

  // ── React to Spline 'load' event ───────────────────────────────────────────
  useEffect(() => {
    if (!modelLoaded) return;
    // Small grace period so the first 3D frame renders
    const t = setTimeout(startExit, 400);
    return () => clearTimeout(t);
  }, [modelLoaded, startExit]);

  // ── Auto-play video when mounted ───────────────────────────────────────────
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().catch(() => {/* autoplay blocked — still fine, poster shows */});
  }, []);

  return (
    <div
      id="splash-screen"
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        9999,
        overflow:      'hidden',
        opacity:       opacity,
        transform:     isExiting ? 'scale(1.04)' : 'scale(1)',
        transition:    `opacity ${EXIT_DURATION_MS}ms cubic-bezier(0.4,0,0.2,1),
                        transform ${EXIT_DURATION_MS}ms cubic-bezier(0.4,0,0.2,1)`,
        pointerEvents: isExiting ? 'none' : 'all',
        willChange:    'opacity, transform',
        background:    '#000',
      }}
    >
      {/* ── Fullscreen video ── */}
      <video
        ref={videoRef}
        src="/assets/splash.mp4"
        muted
        playsInline
        loop
        preload="auto"
        style={{
          position:   'absolute',
          inset:      0,
          width:      '100%',
          height:     '100%',
          objectFit:  'cover',
        }}
      />

      {/* ── Dark overlay so text stays readable ── */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.25) 100%)',
        }}
      />

      {/* ── Bottom centre: brand + loading bar ── */}
      <div
        style={{
          position:       'absolute',
          bottom:         '10%',
          left:           0,
          right:          0,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '16px',
          transform:      isExiting ? 'translateY(12px)' : 'translateY(0)',
          transition:     `transform ${EXIT_DURATION_MS}ms cubic-bezier(0.4,0,0.2,1)`,
        }}
      >
        {/* Logo row */}
        <div style={logoRowStyle}>
          <div style={logoIconStyle}>✦</div>
          <span style={logoTextStyle}>Vision</span>
        </div>

        {/* Loading bar */}
        <div style={trackStyle}>
          <div
            style={{
              ...barBase,
              animation: modelLoaded
                ? 'splashBarFill 0.3s ease forwards'
                : 'splashBarIndeterminate 1.8s ease-in-out infinite',
            }}
          />
        </div>

        {/* Sub-label */}
        <p style={labelStyle}>
          {modelLoaded ? 'Ready ✦' : 'Loading experience…'}
        </p>
      </div>

      <style>{`
        @keyframes splashBarIndeterminate {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 55%;  margin-left: 22%; }
          100% { width: 0%;   margin-left: 100%; }
        }
        @keyframes splashBarFill {
          from { width: 55%; margin-left: 22%; }
          to   { width: 100%; margin-left: 0%; }
        }
      `}</style>
    </div>
  );
};

// ── Styles ─────────────────────────────────────────────────────────────────────
const logoRowStyle = {
  display:     'flex',
  alignItems:  'center',
  gap:         '10px',
};

const logoIconStyle = {
  width:           '36px',
  height:          '36px',
  borderRadius:    '50%',
  background:      'rgba(255,255,255,0.12)',
  border:          '1px solid rgba(255,255,255,0.2)',
  display:         'flex',
  alignItems:      'center',
  justifyContent:  'center',
  fontSize:        '16px',
  color:           '#fff',
  backdropFilter:  'blur(8px)',
};

const logoTextStyle = {
  fontFamily:    "'Inter', 'Outfit', sans-serif",
  fontSize:      '1.5rem',
  fontWeight:    700,
  letterSpacing: '-0.02em',
  color:         '#ffffff',
  textShadow:    '0 2px 12px rgba(0,0,0,0.6)',
};

const trackStyle = {
  width:        'clamp(160px, 28vw, 220px)',
  height:       '2px',
  background:   'rgba(255,255,255,0.15)',
  borderRadius: '99px',
  overflow:     'hidden',
  position:     'relative',
};

const barBase = {
  position:     'absolute',
  left:         0,
  height:       '100%',
  background:   'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, #ffffff 100%)',
  borderRadius: '99px',
};

const labelStyle = {
  fontFamily:    "'Inter', monospace",
  fontSize:      '0.7rem',
  color:         'rgba(255,255,255,0.45)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
};

export default SplashScreen;
