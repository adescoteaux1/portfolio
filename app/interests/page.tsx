"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Puzzle, BookOpen, ChefHat, Mountain, Lightbulb, Heart } from 'lucide-react';
import { interests } from '../content/interests';
import NatureBackground from '../components/NatureBackground';
import { useTheme } from '../context/theme';

const InterestsPage = () => {
  const { colors } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const iconMap = { Puzzle, BookOpen, ChefHat, Mountain, Lightbulb, Heart };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'transparent',
      color: colors.text,
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <NatureBackground />

      {/* Cursor glow */}
      <div style={{
        position: 'fixed',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.cursorGlow} 0%, transparent 70%)`,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '80px 40px',
      }}>
        <Link
          href="/"
          style={{
            color: colors.accent,
            textDecoration: 'none',
            fontSize: '14px',
            display: 'inline-block',
            marginBottom: '40px',
            transition: 'opacity 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          ← Back
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-1px' }}>
            Interests & Hobbies
          </h1>
          <div style={{ width: '60px', height: '2px', background: colors.accent, marginBottom: '20px' }} />
          <p style={{ fontSize: '16px', color: colors.textMuted, maxWidth: '700px', lineHeight: '1.6' }}>
            Beyond coding and mathematics, I have a diverse set of interests that keep me balanced, creative, and continuously growing.
          </p>
        </div>

        {/* Interests Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '30px',
          marginBottom: '60px',
        }}>
          {interests.map((interest, idx) => {
            const Icon = iconMap[interest.icon as keyof typeof iconMap];
            return (
              <div
                key={idx}
                style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  padding: '30px',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.background = colors.cardHoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  {Icon && <Icon size={28} color={colors.accent} />}
                  <h3 style={{ fontSize: '22px', fontWeight: '600', margin: 0 }}>{interest.title}</h3>
                </div>

                <p style={{ color: colors.textMuted, lineHeight: '1.7', marginBottom: '20px', fontSize: '15px' }}>
                  {interest.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {interest.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '6px 12px',
                        background: colors.tagBg,
                        border: `1px solid ${colors.borderFaint}`,
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: colors.textMuted,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote section */}
        <div
          style={{
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = colors.accent;
            e.currentTarget.style.background = colors.cardHoverBg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = colors.border;
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <p style={{ fontSize: '20px', fontStyle: 'italic', color: colors.accent, marginBottom: '16px', lineHeight: '1.6' }}>
            &quot;Balance is not something you find, it&apos;s something you create.&quot;
          </p>
          <p style={{ color: colors.textDim, fontSize: '15px' }}>
            I believe in nurturing diverse interests to stay creative, curious, and well-rounded both as a developer and as a person.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterestsPage;
