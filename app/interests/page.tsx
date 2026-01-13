"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Puzzle, BookOpen, ChefHat, Mountain, Lightbulb, Heart } from 'lucide-react';
import { interests } from '../content/interests';

const InterestsPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const colors = {
    deepForest: '#1a3d2e',
    darkGreen: '#2d5942',
    mediumGreen: '#4a7c59',
    mysticalGlow: '#6dd5a8',
    darkBg: '#0f1e16'
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Icon mapping
  const iconMap = {
    Puzzle,
    BookOpen,
    ChefHat,
    Mountain,
    Lightbulb,
    Heart
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: colors.darkBg,
      color: 'white',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Floating stars */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0
      }}>
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 3 + 1;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                background: colors.mysticalGlow,
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 20}s infinite ease-in-out`,
                opacity: Math.random() * 0.4 + 0.2,
                boxShadow: `0 0 ${Math.random() * 15 + 5}px ${colors.mysticalGlow}`
              }}
            />
          );
        })}
      </div>

      {/* Cursor glow */}
      <div style={{
        position: 'fixed',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.mysticalGlow}15 0%, transparent 70%)`,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
        zIndex: 1
      }} />

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(5px, -5px); }
            50% { transform: translate(-3px, 3px); }
            75% { transform: translate(-5px, -3px); }
          }
        `}
      </style>

      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2,
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '80px 40px'
      }}>
        {/* Back link */}
        <Link
          href="/"
          style={{
            color: colors.mysticalGlow,
            textDecoration: 'none',
            fontSize: '14px',
            display: 'inline-block',
            marginBottom: '40px',
            transition: 'opacity 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          ← Back
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '20px',
            letterSpacing: '-1px'
          }}>
            Interests & Hobbies
          </h1>
          <div style={{
            width: '60px',
            height: '2px',
            background: colors.mysticalGlow,
            marginBottom: '20px'
          }} />
          <p style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '700px',
            lineHeight: '1.6'
          }}>
            Beyond coding and mathematics, I have a diverse set of interests that keep me balanced, creative, and continuously growing.
          </p>
        </div>

        {/* Interests Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {interests.map((interest, idx) => {
            const Icon = iconMap[interest.icon as keyof typeof iconMap];
            return (
              <div
                key={idx}
                style={{
                  border: `1px solid ${colors.mysticalGlow}40`,
                  borderRadius: '8px',
                  padding: '30px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.mysticalGlow;
                  e.currentTarget.style.background = `${colors.mysticalGlow}05`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${colors.mysticalGlow}40`;
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  {Icon && <Icon size={28} color={colors.mysticalGlow} />}
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    margin: 0
                  }}>
                    {interest.title}
                  </h3>
                </div>

                <p style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  lineHeight: '1.7',
                  marginBottom: '20px',
                  fontSize: '15px'
                }}>
                  {interest.description}
                </p>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {interest.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '6px 12px',
                        background: `${colors.darkGreen}50`,
                        border: `1px solid ${colors.mysticalGlow}30`,
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.7)'
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

        {/* Quote/Philosophy section */}
        <div style={{
          border: `1px solid ${colors.mysticalGlow}40`,
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = colors.mysticalGlow;
          e.currentTarget.style.background = `${colors.mysticalGlow}05`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `${colors.mysticalGlow}40`;
          e.currentTarget.style.background = 'transparent';
        }}>
          <p style={{
            fontSize: '20px',
            fontStyle: 'italic',
            color: colors.mysticalGlow,
            marginBottom: '16px',
            lineHeight: '1.6'
          }}>
            &quot;Balance is not something you find, it&apos;s something you create.&quot;
          </p>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '15px'
          }}>
            I believe in nurturing diverse interests to stay creative, curious, and well-rounded both as a developer and as a person.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterestsPage;