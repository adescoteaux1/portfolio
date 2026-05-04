'use client'

import React, { useMemo } from 'react'
import { useTheme } from '../context/theme'

function rnd(n: number): number {
  const x = Math.sin(n * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

function forestEdge(
  w: number, baseY: number, count: number,
  minH: number, maxH: number, seed: number
): string {
  const seg = w / count
  const d = [`M0,${baseY}`]
  for (let i = 0; i < count; i++) {
    const h = minH + rnd(seed + i * 0.71) * (maxH - minH)
    const bx = i * seg
    const px = bx + seg * (0.4 + rnd(seed + i * 1.37) * 0.2)
    const lbH = 0.19 + rnd(seed + i * 2.1) * 0.09
    const lmH = 0.41 + rnd(seed + i * 2.8) * 0.1
    const rbH = 0.17 + rnd(seed + i * 3.3) * 0.09
    const rmH = 0.39 + rnd(seed + i * 3.9) * 0.1
    d.push(
      `L${bx + seg * 0.05},${baseY - h * lbH}`,
      `L${bx + seg * 0.18},${baseY - h * lmH}`,
      `L${px - seg * 0.08},${baseY - h * 0.76}`,
      `L${px},${baseY - h}`,
      `L${px + seg * 0.08},${baseY - h * 0.76}`,
      `L${bx + seg * 0.82},${baseY - h * rmH}`,
      `L${bx + seg * 0.95},${baseY - h * rbH}`,
    )
  }
  d.push(`L${w},${baseY}`, `L${w},430`, `L0,430`, 'Z')
  return d.join(' ')
}

const NatureBackground = () => {
  const { isDark, colors } = useTheme()

  const farForest  = useMemo(() => forestEdge(1440, 230, 30, 24, 50, 1.0), [])
  const midForest  = useMemo(() => forestEdge(1440, 285, 24, 36, 70, 2.5), [])
  const nearForest = useMemo(() => forestEdge(1440, 345, 20, 50, 98, 4.2), [])

  const fgTrees = useMemo(() => [
    { x: 52,   h: 118, w: 34, swayDur: 3.8, swayDelay: 0 },
    { x: 125,  h: 96,  w: 28, swayDur: 4.2, swayDelay: -0.7 },
    { x: 202,  h: 132, w: 38, swayDur: 3.5, swayDelay: -1.4 },
    { x: 292,  h: 108, w: 31, swayDur: 4.6, swayDelay: -0.3 },
    { x: 370,  h: 82,  w: 24, swayDur: 3.9, swayDelay: -2.1 },
    { x: 448,  h: 122, w: 35, swayDur: 4.1, swayDelay: -1.0 },
    { x: 552,  h: 136, w: 39, swayDur: 3.6, swayDelay: -2.8 },
    { x: 638,  h: 92,  w: 27, swayDur: 4.4, swayDelay: -0.5 },
    { x: 728,  h: 128, w: 37, swayDur: 3.7, swayDelay: -1.9 },
    { x: 812,  h: 104, w: 30, swayDur: 4.3, swayDelay: -3.2 },
    { x: 902,  h: 116, w: 33, swayDur: 3.5, swayDelay: -0.8 },
    { x: 992,  h: 86,  w: 25, swayDur: 4.7, swayDelay: -2.4 },
    { x: 1082, h: 124, w: 36, swayDur: 4.0, swayDelay: -1.6 },
    { x: 1162, h: 97,  w: 28, swayDur: 3.6, swayDelay: -0.2 },
    { x: 1252, h: 140, w: 40, swayDur: 4.5, swayDelay: -3.0 },
    { x: 1342, h: 110, w: 32, swayDur: 3.8, swayDelay: -1.2 },
    { x: 1408, h: 90,  w: 26, swayDur: 4.2, swayDelay: -2.6 },
  ], [])

  const stars = useMemo(() =>
    [...Array(65)].map((_, i) => ({
      left: rnd(i * 3.17) * 100,
      top:  rnd(i * 3.17 + 1) * 52,
      size: 1 + rnd(i * 3.17 + 2) * 2,
      op:   0.3 + rnd(i * 3.17 + 3) * 0.65,
      dur:  1.8 + rnd(i * 3.17 + 4) * 3.5,
      delay: -(rnd(i * 3.17 + 5) * 4),
    })), [])

  const leaves = useMemo(() =>
    [...Array(20)].map((_, i) => ({
      id: i,
      left: ((i * 5.3 + Math.sin(i * 1.7) * 9 + 10) % 90) + 5,
      size: 7 + (i % 5) * 2,
      duration: 22 + (i % 7) * 4.5,
      delay: -(i * 3.1),
      rotation: (i * 37) % 360,
      isAlt: i % 3 === 0,
      swing: (i % 2 === 0 ? 1 : -1) * (15 + (i % 4) * 8),
    })), [])

  const fireflies = useMemo(() =>
    [...Array(14)].map((_, i) => ({
      id: i,
      left:   5 + rnd(i * 7.3) * 90,
      bottom: 8 + rnd(i * 7.3 + 1) * 42,
      size:   2 + rnd(i * 7.3 + 2) * 2.5,
      dur:    4.5 + rnd(i * 7.3 + 3) * 6,
      delay:  -(rnd(i * 7.3 + 4) * 8),
      dx:     (rnd(i * 7.3 + 5) - 0.5) * 90,
      dy:     -(20 + rnd(i * 7.3 + 6) * 45),
    })), [])

  // Bird flocks: y% from top, direction, timing, bird count
  const birdFlocks = useMemo(() => [
    { id: 0, y: 10, dur: 26, delay: -4,  dir: 'l' as const, count: 4 },
    { id: 1, y: 17, dur: 32, delay: -19, dir: 'r' as const, count: 3 },
    { id: 2, y: 7,  dur: 21, delay: -38, dir: 'l' as const, count: 5 },
    { id: 3, y: 22, dur: 28, delay: -55, dir: 'r' as const, count: 3 },
    { id: 4, y: 13, dur: 35, delay: -70, dir: 'l' as const, count: 4 },
  ], [])

  // Offsets for individual birds within a flock
  const flockBirdOffsets = [
    { x: 0,   y: 0,   bobDur: 2.2, bobDelay: 0 },
    { x: 22,  y: -10, bobDur: 1.9, bobDelay: -0.5 },
    { x: 42,  y: 5,   bobDur: 2.6, bobDelay: -0.9 },
    { x: 14,  y: 12,  bobDur: 2.1, bobDelay: -1.3 },
    { x: -16, y: -6,  bobDur: 2.4, bobDelay: -0.3 },
  ]

  // Fog wisps for the mist band
  const fogWisps = useMemo(() => [
    { id: 0, topPct: 20, widthVw: 45, height: 22, dur: 34, delay: 0,   dir: 'l' as const },
    { id: 1, topPct: 55, widthVw: 35, height: 18, dur: 26, delay: -10, dir: 'r' as const },
    { id: 2, topPct: 35, widthVw: 58, height: 28, dur: 42, delay: -22, dir: 'l' as const },
    { id: 3, topPct: 68, widthVw: 40, height: 20, dur: 30, delay: -38, dir: 'r' as const },
  ], [])

  // Sun rays (10 rays evenly spaced)
  const sunRays = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      angle: i * 36,
      opacity: 0.04 + (i % 3) * 0.015,
      dur: 4.5 + i * 0.6,
      delay: -(i * 0.55),
    })), [])

  const c = isDark ? {
    farMtn:     '#1f4835',
    farForest:  '#17382a',
    midMtn:     colors.mountainMid,
    midForest:  '#0f2419',
    nearForest: '#0c1e14',
    fgForest:   colors.treeFill,
    trunk:      '#050b07',
    ground:     '#040908',
    mist:       'rgba(14, 28, 18, 0.42)',
    mistEdge:   'rgba(14, 28, 18, 0)',
    mistWisp:   'rgba(25, 50, 35, 0.55)',
    leafColor:  '#3d7a56',
    leafAlt:    '#2a5c3e',
    ffColor:    colors.accent,
    ffGlow:     'rgba(109, 213, 168, 0.25)',
    birdColor:  'rgba(200, 230, 210, 0.45)',
  } : {
    farMtn:     '#aecfbc',
    farForest:  '#96b8a3',
    midMtn:     colors.mountainMid,
    midForest:  '#6a9a7d',
    nearForest: '#4a7a5e',
    fgForest:   colors.treeFill,
    trunk:      '#1a3d25',
    ground:     '#163320',
    mist:       'rgba(210, 235, 220, 0.32)',
    mistEdge:   'rgba(210, 235, 220, 0)',
    mistWisp:   'rgba(220, 238, 228, 0.65)',
    leafColor:  '#5a9470',
    leafAlt:    '#417a5a',
    ffColor:    'transparent',
    ffGlow:     'transparent',
    birdColor:  'rgba(45, 75, 55, 0.55)',
  }

  const BY = 388

  return (
    <>
      <style>{`
        @keyframes leaf-fall {
          0%   { transform: translateY(-50px) rotate(var(--rot));   opacity: 0; }
          8%   { opacity: 0.6; }
          35%  { transform: translateY(35vh) rotate(calc(var(--rot) + 130deg)) translateX(var(--sw)); }
          65%  { transform: translateY(70vh) rotate(calc(var(--rot) + 250deg)) translateX(calc(var(--sw) * -0.5)); }
          100% { transform: translateY(108vh) rotate(calc(var(--rot) + 360deg)); opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: var(--op); }
          50%       { opacity: calc(var(--op) * 0.15); }
        }
        @keyframes firefly {
          0%   { transform: translate(0,0);   opacity: 0; }
          15%  { opacity: 0.9; }
          50%  { transform: translate(calc(var(--dx) * 0.6), calc(var(--dy) * 0.5)); opacity: 0.65; }
          85%  { opacity: 0.2; }
          100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
        }
        @keyframes tree-sway {
          0%, 100% { transform: rotate(-1.4deg); }
          50%       { transform: rotate(1.4deg); }
        }
        @keyframes fog-drift-l {
          from { transform: translateX(120vw); }
          to   { transform: translateX(-80vw); }
        }
        @keyframes fog-drift-r {
          from { transform: translateX(-80vw); }
          to   { transform: translateX(120vw); }
        }
        @keyframes flock-fly-l {
          from { transform: translateX(115vw); }
          to   { transform: translateX(-25vw); }
        }
        @keyframes flock-fly-r {
          from { transform: translateX(-25vw); }
          to   { transform: translateX(115vw); }
        }
        @keyframes bird-bob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes ray-pulse {
          0%, 100% { opacity: var(--ray-op); }
          50%       { opacity: calc(var(--ray-op) * 2.8); }
        }
      `}</style>

      {/* Sky */}
      <div style={{
        position: 'fixed', inset: 0,
        background: colors.bgGradient,
        zIndex: 0, pointerEvents: 'none',
        transition: 'background 0.5s ease',
      }} />

      {/* Sun rays — light mode only */}
      {!isDark && (
        <div style={{
          position: 'fixed',
          top: '5%', left: '13%',
          width: '74px', height: '74px',
          zIndex: 0, pointerEvents: 'none',
        }}>
          {sunRays.map((ray, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: '72vmax',
              height: '7px',
              background: 'linear-gradient(to right, rgba(255,248,160,0.7) 0%, transparent 100%)',
              transformOrigin: '0 50%',
              transform: `rotate(${ray.angle}deg)`,
              ['--ray-op' as string]: ray.opacity,
              opacity: ray.opacity,
              animation: `ray-pulse ${ray.dur}s ${ray.delay}s ease-in-out infinite`,
            } as React.CSSProperties} />
          ))}
        </div>
      )}

      {/* Sun / Moon */}
      <div style={{
        position: 'fixed',
        top:   isDark ? '7%' : '5%',
        left:  isDark ? 'auto' : '13%',
        right: isDark ? '14%' : 'auto',
        width:  isDark ? '50px' : '74px',
        height: isDark ? '50px' : '74px',
        borderRadius: '50%',
        background: isDark ? '#d5e8ce' : '#fffbbf',
        opacity: isDark ? 0.88 : 0.68,
        boxShadow: isDark
          ? '0 0 50px 28px rgba(190, 225, 205, 0.12)'
          : '0 0 90px 50px rgba(255, 248, 170, 0.2)',
        zIndex: 0, pointerEvents: 'none',
        transition: 'background 0.5s ease',
      }} />

      {/* Stars — dark mode */}
      {isDark && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          {stars.map((s, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${s.left}%`, top: `${s.top}%`,
              width: `${s.size}px`, height: `${s.size}px`,
              borderRadius: '50%', background: 'white',
              ['--op' as string]: s.op,
              opacity: s.op,
              animation: `twinkle ${s.dur}s ${s.delay}s infinite ease-in-out`,
            } as React.CSSProperties} />
          ))}
        </div>
      )}

      {/* Birds */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {birdFlocks.map(flock => (
          <div key={flock.id} style={{
            position: 'absolute',
            top: `${flock.y}%`,
            left: 0,
            animation: `flock-fly-${flock.dir} ${flock.dur}s ${flock.delay}s linear infinite`,
          }}>
            {flockBirdOffsets.slice(0, flock.count).map((bird, bi) => (
              <div key={bi} style={{
                position: 'absolute',
                left: `${bird.x}px`,
                top: `${bird.y}px`,
                animation: `bird-bob ${bird.bobDur}s ${bird.bobDelay}s ease-in-out infinite`,
              }}>
                <svg width="18" height="10" viewBox="-9 -5 18 10" fill="none" style={{ display: 'block' }}>
                  <path
                    d="M-9,0 C-5,-6 -1,-4 0,-2 C1,-4 5,-6 9,0"
                    stroke={c.birdColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Landscape */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0,
        width: '100%', height: '65%',
        zIndex: 0, pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        {/* Far mountains */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 1440 420" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <path
              d="M0,198 C140,140 300,166 472,108 C644,50 804,116 984,90 C1164,64 1308,126 1440,102 L1440,420 L0,420 Z"
              fill={c.farMtn} opacity={0.5}
            />
          </svg>
        </div>

        {/* Far forest */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 1440 420" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <path d={farForest} fill={c.farForest} opacity={0.62} />
          </svg>
        </div>

        {/* Mid mountains + static mist */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 1440 420" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="mistGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor={c.mistEdge} />
                <stop offset="45%" stopColor={c.mist} />
                <stop offset="100%" stopColor={c.mistEdge} />
              </linearGradient>
            </defs>
            <path
              d="M0,256 C116,206 274,230 442,180 C610,130 760,198 950,170 C1140,142 1278,204 1440,182 L1440,420 L0,420 Z"
              fill={c.midMtn} opacity={0.78}
            />
            <rect x="0" y="245" width="1440" height="92" fill="url(#mistGrad)" />
          </svg>
        </div>

        {/* Mid forest */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 1440 420" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <path d={midForest} fill={c.midForest} opacity={0.88} />
          </svg>
        </div>

        {/* Near forest */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 1440 420" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <path d={nearForest} fill={c.nearForest} opacity={0.96} />
          </svg>
        </div>

        {/* Foreground trees with sway */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 1440 420" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {fgTrees.map(({ x, h, w, swayDur, swayDelay }, i) => (
              <g
                key={i}
                style={{
                  transformOrigin: `${x}px ${BY}px`,
                  animationName: 'tree-sway',
                  animationDuration: `${swayDur}s`,
                  animationDelay: `${swayDelay}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                } as React.CSSProperties}
              >
                <rect
                  x={x - w * 0.055} y={BY - h * 0.08}
                  width={w * 0.11} height={h * 0.08 + 4}
                  fill={c.trunk}
                />
                <polygon
                  points={`${x},${BY - h * 0.42} ${x - w * 0.5},${BY - h * 0.07} ${x + w * 0.5},${BY - h * 0.07}`}
                  fill={c.fgForest}
                />
                <polygon
                  points={`${x},${BY - h * 0.63} ${x - w * 0.36},${BY - h * 0.34} ${x + w * 0.36},${BY - h * 0.34}`}
                  fill={c.fgForest} opacity={0.92}
                />
                <polygon
                  points={`${x},${BY - h * 0.81} ${x - w * 0.24},${BY - h * 0.57} ${x + w * 0.24},${BY - h * 0.57}`}
                  fill={c.fgForest} opacity={0.88}
                />
                <polygon
                  points={`${x},${BY - h} ${x - w * 0.14},${BY - h * 0.76} ${x + w * 0.14},${BY - h * 0.76}`}
                  fill={c.fgForest} opacity={0.84}
                />
              </g>
            ))}
            <rect x="0" y={BY - 4} width="1440" height="36" fill={c.ground} />
          </svg>
        </div>
      </div>

      {/* Fog drift wisps — over the mist band */}
      <div style={{
        position: 'fixed',
        top: '70%', width: '100%', height: '18%',
        zIndex: 0, pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        {fogWisps.map(wisp => (
          <div key={wisp.id} style={{
            position: 'absolute',
            top: `${wisp.topPct}%`,
            width: `${wisp.widthVw}vw`,
            height: `${wisp.height}px`,
            background: `linear-gradient(to right, transparent 0%, ${c.mistWisp} 30%, ${c.mistWisp} 70%, transparent 100%)`,
            borderRadius: '50%',
            filter: 'blur(4px)',
            animation: `fog-drift-${wisp.dir} ${wisp.dur}s ${wisp.delay}s linear infinite`,
          }} />
        ))}
      </div>

      {/* Particles */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        {isDark
          ? fireflies.map(ff => (
            <div key={ff.id} style={{
              position: 'absolute',
              left: `${ff.left}%`, bottom: `${ff.bottom}%`,
              width: `${ff.size}px`, height: `${ff.size}px`,
              borderRadius: '50%',
              background: c.ffColor,
              boxShadow: `0 0 ${ff.size * 4}px ${ff.size * 1.5}px ${c.ffGlow}`,
              opacity: 0,
              ['--dx' as string]: `${ff.dx}px`,
              ['--dy' as string]: `${ff.dy}px`,
              animation: `firefly ${ff.dur}s ${ff.delay}s infinite ease-in-out`,
            } as React.CSSProperties} />
          ))
          : leaves.map(leaf => (
            <div key={leaf.id} style={{
              position: 'absolute',
              left: `${leaf.left}%`, top: '-30px',
              width: `${leaf.size}px`, height: `${leaf.size * 0.58}px`,
              background: leaf.isAlt ? c.leafAlt : c.leafColor,
              borderRadius: '50% 0 50% 0',
              opacity: 0,
              ['--rot' as string]: `${leaf.rotation}deg`,
              ['--sw' as string]: `${leaf.swing}px`,
              animation: `leaf-fall ${leaf.duration}s ${leaf.delay}s infinite linear`,
            } as React.CSSProperties} />
          ))
        }
      </div>
    </>
  )
}

export default NatureBackground
