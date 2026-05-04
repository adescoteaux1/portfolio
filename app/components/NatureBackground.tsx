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
    { x: 52,   h: 118, w: 34 },
    { x: 125,  h: 96,  w: 28 },
    { x: 202,  h: 132, w: 38 },
    { x: 292,  h: 108, w: 31 },
    { x: 370,  h: 82,  w: 24 },
    { x: 448,  h: 122, w: 35 },
    { x: 552,  h: 136, w: 39 },
    { x: 638,  h: 92,  w: 27 },
    { x: 728,  h: 128, w: 37 },
    { x: 812,  h: 104, w: 30 },
    { x: 902,  h: 116, w: 33 },
    { x: 992,  h: 86,  w: 25 },
    { x: 1082, h: 124, w: 36 },
    { x: 1162, h: 97,  w: 28 },
    { x: 1252, h: 140, w: 40 },
    { x: 1342, h: 110, w: 32 },
    { x: 1408, h: 90,  w: 26 },
  ], [])

  const stars = useMemo(() =>
    [...Array(65)].map((_, i) => ({
      left: rnd(i * 3.17) * 100,
      top: rnd(i * 3.17 + 1) * 52,
      size: 1 + rnd(i * 3.17 + 2) * 2,
      op: 0.3 + rnd(i * 3.17 + 3) * 0.65,
      dur: 1.8 + rnd(i * 3.17 + 4) * 3.5,
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
      left: 5 + rnd(i * 7.3) * 90,
      bottom: 8 + rnd(i * 7.3 + 1) * 42,
      size: 2 + rnd(i * 7.3 + 2) * 2.5,
      dur: 4.5 + rnd(i * 7.3 + 3) * 6,
      delay: -(rnd(i * 7.3 + 4) * 8),
      dx: (rnd(i * 7.3 + 5) - 0.5) * 90,
      dy: -(20 + rnd(i * 7.3 + 6) * 45),
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
    leafColor:  '#3d7a56',
    leafAlt:    '#2a5c3e',
    ffColor:    colors.accent,
    ffGlow:     'rgba(109, 213, 168, 0.25)',
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
    leafColor:  '#5a9470',
    leafAlt:    '#417a5a',
    ffColor:    'transparent',
    ffGlow:     'transparent',
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
      `}</style>

      {/* Sky gradient */}
      <div style={{
        position: 'fixed', inset: 0,
        background: colors.bgGradient,
        zIndex: 0, pointerEvents: 'none',
        transition: 'background 0.5s ease',
      }} />

      {/* Sun / Moon */}
      <div style={{
        position: 'fixed',
        top: isDark ? '7%' : '5%',
        left: isDark ? 'auto' : '13%',
        right: isDark ? '14%' : 'auto',
        width: isDark ? '50px' : '74px',
        height: isDark ? '50px' : '74px',
        borderRadius: '50%',
        background: isDark ? '#d5e8ce' : '#fffbbf',
        opacity: isDark ? 0.88 : 0.68,
        boxShadow: isDark
          ? '0 0 50px 28px rgba(190, 225, 205, 0.12)'
          : '0 0 90px 50px rgba(255, 248, 170, 0.2)',
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'all 0.5s ease',
      }} />

      {/* Stars — dark mode only */}
      {isDark && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          {stars.map((s, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                borderRadius: '50%',
                background: 'white',
                ['--op' as string]: s.op,
                opacity: s.op,
                animation: `twinkle ${s.dur}s ${s.delay}s infinite ease-in-out`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* Landscape SVG */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0,
        width: '100%', height: '65%',
        zIndex: 0, pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 1440 420" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="mistGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={c.mistEdge} />
              <stop offset="45%"  stopColor={c.mist} />
              <stop offset="100%" stopColor={c.mistEdge} />
            </linearGradient>
          </defs>

          {/* Far mountains */}
          <path
            d="M0,198 C140,140 300,166 472,108 C644,50 804,116 984,90 C1164,64 1308,126 1440,102 L1440,420 L0,420 Z"
            fill={c.farMtn} opacity={0.5}
          />

          {/* Far forest */}
          <path d={farForest} fill={c.farForest} opacity={0.62} />

          {/* Mid mountains */}
          <path
            d="M0,256 C116,206 274,230 442,180 C610,130 760,198 950,170 C1140,142 1278,204 1440,182 L1440,420 L0,420 Z"
            fill={c.midMtn} opacity={0.78}
          />

          {/* Atmospheric mist */}
          <rect x="0" y="245" width="1440" height="92" fill="url(#mistGrad)" />

          {/* Mid forest */}
          <path d={midForest} fill={c.midForest} opacity={0.88} />

          {/* Near forest */}
          <path d={nearForest} fill={c.nearForest} opacity={0.96} />

          {/* Foreground detailed trees */}
          {fgTrees.map(({ x, h, w }, i) => (
            <g key={i}>
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

          {/* Ground */}
          <rect x="0" y={BY - 4} width="1440" height="36" fill={c.ground} />
        </svg>
      </div>

      {/* Particles */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        {isDark
          ? fireflies.map(ff => (
            <div
              key={ff.id}
              style={{
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
              } as React.CSSProperties}
            />
          ))
          : leaves.map(leaf => (
            <div
              key={leaf.id}
              style={{
                position: 'absolute',
                left: `${leaf.left}%`, top: '-30px',
                width: `${leaf.size}px`, height: `${leaf.size * 0.58}px`,
                background: leaf.isAlt ? c.leafAlt : c.leafColor,
                borderRadius: '50% 0 50% 0',
                opacity: 0,
                ['--rot' as string]: `${leaf.rotation}deg`,
                ['--sw' as string]: `${leaf.swing}px`,
                animation: `leaf-fall ${leaf.duration}s ${leaf.delay}s infinite linear`,
              } as React.CSSProperties}
            />
          ))
        }
      </div>
    </>
  )
}

export default NatureBackground
