'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/theme'

type Particle = {
  id: number
  x: number
  y: number
  size: number
  dx: number
  dy: number
  dur: number
  shape: 'circle' | 'cross'
}

let uid = 0

const SparkleTrail = () => {
  const { isDark, colors } = useTheme()
  const [particles, setParticles] = useState<Particle[]>([])
  const lastSpawn = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastSpawn.current < 48) return
      lastSpawn.current = now

      const count = Math.random() < 0.4 ? 2 : 1
      const batch: Particle[] = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2
        const speed = 28 + Math.random() * 48
        return {
          id: uid++,
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          size: 4 + Math.random() * 10,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed - 18,
          dur: 0.55 + Math.random() * 0.65,
          shape: Math.random() < 0.35 ? 'cross' : 'circle',
        }
      })

      setParticles(prev => [...prev.slice(-22), ...batch])
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const remove = (id: number) =>
    setParticles(prev => prev.filter(p => p.id !== id))

  const col = colors.accent
  const glow = isDark ? `${col}40` : `${col}50`

  return (
    <>
      <style>{`
        @keyframes spark-out {
          0%   { transform: translate(0,0) scale(1) rotate(var(--rot)); opacity: 0.88; }
          55%  { opacity: 0.45; }
          100% { transform: translate(var(--pdx),var(--pdy)) scale(0.08) rotate(calc(var(--rot) + 90deg)); opacity: 0; }
        }
        .spark-cross::before,
        .spark-cross::after {
          content: '';
          position: absolute;
          background: inherit;
          border-radius: 2px;
        }
        .spark-cross::before {
          top: 50%; left: 0;
          width: 100%; height: 30%;
          transform: translateY(-50%);
        }
        .spark-cross::after {
          left: 50%; top: 0;
          height: 100%; width: 30%;
          transform: translateX(-50%);
        }
      `}</style>
      <div style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', zIndex: 10,
        overflow: 'hidden',
      }}>
        {particles.map(p => (
          <div
            key={p.id}
            className={p.shape === 'cross' ? 'spark-cross' : undefined}
            onAnimationEnd={() => remove(p.id)}
            style={{
              position: 'absolute',
              left: p.x - p.size / 2,
              top: p.y - p.size / 2,
              width: p.size,
              height: p.size,
              borderRadius: p.shape === 'circle' ? '50%' : '2px',
              background: p.shape === 'circle'
                ? `radial-gradient(circle, ${col} 0%, ${col}99 35%, transparent 70%)`
                : col,
              boxShadow: `0 0 ${p.size * 1.6}px ${p.size * 0.7}px ${glow}`,
              ['--pdx' as string]: `${p.dx}px`,
              ['--pdy' as string]: `${p.dy}px`,
              ['--rot' as string]: `${Math.random() * 360}deg`,
              animation: `spark-out ${p.dur}s ease-out forwards`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  )
}

export default SparkleTrail
