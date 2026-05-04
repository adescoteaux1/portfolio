'use client'

import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/theme'

const ThemeToggle = () => {
  const { isDark, toggle, colors } = useTheme()

  return (
    <button
      onClick={toggle}
      style={{
        position: 'fixed',
        top: '18px',
        right: '18px',
        zIndex: 200,
        background: isDark ? 'rgba(109, 213, 168, 0.12)' : 'rgba(255, 255, 255, 0.5)',
        border: `1px solid ${colors.border}`,
        borderRadius: '50%',
        width: '38px',
        height: '38px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: colors.accent,
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(8px)',
        boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
        e.currentTarget.style.background = isDark ? 'rgba(109, 213, 168, 0.22)' : 'rgba(255, 255, 255, 0.8)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.background = isDark ? 'rgba(109, 213, 168, 0.12)' : 'rgba(255, 255, 255, 0.5)'
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

export default ThemeToggle
