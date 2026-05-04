'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type ThemeColors = {
  bg: string
  bgGradient: string
  accent: string
  accentSecondary: string
  text: string
  textMuted: string
  textDim: string
  border: string
  borderFaint: string
  cardHoverBg: string
  tagBg: string
  skillBg: string
  cursorGlow: string
  mountainBack: string
  mountainMid: string
  mountainFront: string
  treeFill: string
}

const lightColors: ThemeColors = {
  bg: '#f0f8f3',
  bgGradient: 'linear-gradient(180deg, #b8d9c4 0%, #d4ecdf 25%, #eaf5ef 60%, #f0f8f3 100%)',
  accent: '#2d7a4f',
  accentSecondary: '#4a7c59',
  text: '#1a2b1e',
  textMuted: 'rgba(26, 43, 30, 0.72)',
  textDim: 'rgba(26, 43, 30, 0.5)',
  border: 'rgba(45, 122, 79, 0.3)',
  borderFaint: 'rgba(45, 122, 79, 0.18)',
  cardHoverBg: 'rgba(45, 122, 79, 0.06)',
  tagBg: 'rgba(45, 122, 79, 0.1)',
  skillBg: 'rgba(45, 122, 79, 0.08)',
  cursorGlow: 'rgba(45, 122, 79, 0.1)',
  mountainBack: '#9ec4b0',
  mountainMid: '#6f9e87',
  mountainFront: '#4d8065',
  treeFill: '#2f5e46',
}

const darkColors: ThemeColors = {
  bg: '#0d1a12',
  bgGradient: 'linear-gradient(180deg, #0d1a12 0%, #0f2016 100%)',
  accent: '#6dd5a8',
  accentSecondary: '#4ab888',
  text: '#ffffff',
  textMuted: 'rgba(255, 255, 255, 0.72)',
  textDim: 'rgba(255, 255, 255, 0.5)',
  border: 'rgba(109, 213, 168, 0.35)',
  borderFaint: 'rgba(109, 213, 168, 0.18)',
  cardHoverBg: 'rgba(109, 213, 168, 0.05)',
  tagBg: 'rgba(45, 89, 66, 0.5)',
  skillBg: 'rgba(45, 89, 66, 0.4)',
  cursorGlow: 'rgba(109, 213, 168, 0.12)',
  mountainBack: '#1a3d2e',
  mountainMid: '#112b1e',
  mountainFront: '#0a1c12',
  treeFill: '#091510',
}

type ThemeContextType = {
  isDark: boolean
  toggle: () => void
  colors: ThemeColors
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggle: () => {},
  colors: lightColors,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved === 'dark') setIsDark(true)
  }, [])

  const toggle = () => {
    setIsDark(prev => {
      const next = !prev
      localStorage.setItem('portfolio-theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggle, colors: isDark ? darkColors : lightColors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
