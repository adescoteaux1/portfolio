/* eslint-disable @next/next/no-html-link-for-pages */
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Code, User, Briefcase, Heart, Brain, BookOpen, Film, Music, GraduationCap } from 'lucide-react';

const EnchantedPortfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [copiedMessage, setCopiedMessage] = useState(false);

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

  const copyEmail = () => {
    navigator.clipboard.writeText('descoteaux.a@northeastern.edu');
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 800);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      height: '100vh',
      background: colors.darkBg,
      color: 'white',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Animated background stars */}
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
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 4 + 2;
          const shouldTwinkle = Math.random() > 0.5;
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
                animation: shouldTwinkle 
                  ? `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out` 
                  : `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
                opacity: Math.random() * 0.5 + 0.3,
                boxShadow: `0 0 ${Math.random() * 20 + 10}px ${colors.mysticalGlow}`
              }}
            />
          );
        })}
      </div>

      {/* Cursor glow effect */}
      <div style={{
        position: 'fixed',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.mysticalGlow}25 0%, ${colors.mysticalGlow}10 40%, transparent 70%)`,
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
            25% { transform: translate(10px, -10px); }
            50% { transform: translate(-5px, 5px); }
            75% { transform: translate(-10px, -5px); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          @keyframes twinkle {
            0%, 100% { 
              opacity: 0.3;
              transform: scale(1);
            }
            50% { 
              opacity: 1;
              transform: scale(1.2);
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>

      {/* Main Content - Abstract Layout */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2,
        maxWidth: '700px',
        padding: '40px'
      }}>
        {/* Name */}
        <div style={{
          marginBottom: '60px',
          animation: 'fadeInUp 0.8s ease-out',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '64px',
            fontWeight: '400',
            background: `linear-gradient(135deg, ${colors.mysticalGlow}, white)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-1px',
            fontFamily: 'Georgia, serif'
          }}>
            Ally Descoteaux
          </h1>
        </div>

        {/* Abstract Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {/* Email - spans 2 columns */}
          <div style={{ 
            gridColumn: 'span 2',
            position: 'relative',
            animation: 'fadeInUp 0.8s ease-out 0.1s both'
          }}>
            <button
              onClick={copyEmail}
              style={{
                background: 'transparent',
                border: `1px solid ${colors.mysticalGlow}60`,
                borderRadius: '8px',
                padding: '15px 20px',
                fontSize: '16px',
                color: colors.mysticalGlow,
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${colors.mysticalGlow}10`;
                e.currentTarget.style.borderColor = colors.mysticalGlow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = `${colors.mysticalGlow}60`;
              }}
            >
              <Mail size={18} />
              <span>Email</span>
            </button>
            {copiedMessage && (
              <div style={{
                position: 'absolute',
                top: '-35px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: colors.mysticalGlow,
                color: colors.darkBg,
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                animation: 'fadeIn 0.2s ease-out'
              }}>
                Copied!
              </div>
            )}
          </div>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/alexandradescoteaux/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'transparent',
              border: `1px solid ${colors.mysticalGlow}60`,
              borderRadius: '8px',
              padding: '15px 20px',
              fontSize: '16px',
              color: colors.mysticalGlow,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 0.2s both'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${colors.mysticalGlow}10`;
              e.currentTarget.style.borderColor = colors.mysticalGlow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = `${colors.mysticalGlow}60`;
            }}
          >
            <Linkedin size={18} />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/adescoteaux1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'transparent',
              border: `1px solid ${colors.mysticalGlow}60`,
              borderRadius: '8px',
              padding: '15px 20px',
              fontSize: '16px',
              color: colors.mysticalGlow,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 0.3s both'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${colors.mysticalGlow}10`;
              e.currentTarget.style.borderColor = colors.mysticalGlow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = `${colors.mysticalGlow}60`;
            }}
          >
            <Github size={18} />
          </a>

          {/* Projects - spans 2 columns */}
          <a
            href="/projects"
            style={{
              gridColumn: 'span 2',
              background: 'transparent',
              border: `1px solid ${colors.mysticalGlow}60`,
              borderRadius: '8px',
              padding: '15px 20px',
              fontSize: '16px',
              color: colors.mysticalGlow,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 0.4s both'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${colors.mysticalGlow}10`;
              e.currentTarget.style.borderColor = colors.mysticalGlow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = `${colors.mysticalGlow}60`;
            }}
          >
            <Code size={18} />
            <span>Projects</span>
          </a>

          {/* About */}
          <a
            href="/about"
            style={{
              background: 'transparent',
              border: `1px solid ${colors.mysticalGlow}60`,
              borderRadius: '8px',
              padding: '15px 20px',
              fontSize: '16px',
              color: colors.mysticalGlow,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 0.5s both'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${colors.mysticalGlow}10`;
              e.currentTarget.style.borderColor = colors.mysticalGlow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = `${colors.mysticalGlow}60`;
            }}
          >
            <User size={18} />
          </a>

          {/* Experience */}
          <a
            href="/experience"
            style={{
              background: 'transparent',
              border: `1px solid ${colors.mysticalGlow}60`,
              borderRadius: '8px',
              padding: '15px 20px',
              fontSize: '16px',
              color: colors.mysticalGlow,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 0.6s both'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${colors.mysticalGlow}10`;
              e.currentTarget.style.borderColor = colors.mysticalGlow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = `${colors.mysticalGlow}60`;
            }}
          >
            <Briefcase size={18} />
            <span>Experience</span>
          </a>

          {/* Interests */}
          <a
            href="/interests"
            style={{
              background: 'transparent',
              border: `1px solid ${colors.mysticalGlow}60`,
              borderRadius: '8px',
              padding: '15px 20px',
              fontSize: '16px',
              color: colors.mysticalGlow,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 0.7s both'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${colors.mysticalGlow}10`;
              e.currentTarget.style.borderColor = colors.mysticalGlow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = `${colors.mysticalGlow}60`;
            }}
          >
            <Heart size={18} />
            <span>Interests</span>
          </a>

          {/* Brain Dump - spans 2 columns */}
          <a
            href="/brain-dump"
            style={{
              gridColumn: 'span 2',
              background: 'transparent',
              border: `1px solid ${colors.mysticalGlow}60`,
              borderRadius: '8px',
              padding: '15px 20px',
              fontSize: '16px',
              color: colors.mysticalGlow,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 0.8s both'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${colors.mysticalGlow}10`;
              e.currentTarget.style.borderColor = colors.mysticalGlow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = `${colors.mysticalGlow}60`;
            }}
          >
            <Brain size={18} />
            <span>Brain Dump</span>
          </a>

          {/* Reading */}
          <a
            href="/reading"
            style={{
              background: 'transparent',
              border: `1px solid ${colors.mysticalGlow}60`,
              borderRadius: '8px',
              padding: '15px 20px',
              fontSize: '16px',
              color: colors.mysticalGlow,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 0.9s both'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${colors.mysticalGlow}10`;
              e.currentTarget.style.borderColor = colors.mysticalGlow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = `${colors.mysticalGlow}60`;
            }}
          >
            <BookOpen size={18} />
          </a>

          {/* Watch List */}
          <a
            href="/watch-list"
            style={{
              background: 'transparent',
              border: `1px solid ${colors.mysticalGlow}60`,
              borderRadius: '8px',
              padding: '15px 20px',
              fontSize: '16px',
              color: colors.mysticalGlow,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 1s both'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${colors.mysticalGlow}10`;
              e.currentTarget.style.borderColor = colors.mysticalGlow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = `${colors.mysticalGlow}60`;
            }}
          >
            <Film size={18} />
          </a>

          {/* Music */}
          <a
            href="/music"
            style={{
              background: 'transparent',
              border: `1px solid ${colors.mysticalGlow}60`,
              borderRadius: '8px',
              padding: '15px 20px',
              fontSize: '16px',
              color: colors.mysticalGlow,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 1.1s both'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${colors.mysticalGlow}10`;
              e.currentTarget.style.borderColor = colors.mysticalGlow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = `${colors.mysticalGlow}60`;
            }}
          >
            <Music size={18} />
          </a>

          {/* Education - spans all 3 columns */}
          <a
            href="/education"
            style={{
              gridColumn: 'span 3',
              background: 'transparent',
              border: `1px solid ${colors.mysticalGlow}60`,
              borderRadius: '8px',
              padding: '15px 20px',
              fontSize: '16px',
              color: colors.mysticalGlow,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 1.2s both'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${colors.mysticalGlow}10`;
              e.currentTarget.style.borderColor = colors.mysticalGlow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = `${colors.mysticalGlow}60`;
            }}
          >
            <GraduationCap size={18} />
            <span>Education</span>
          </a>
        </div>
      </div>
      <Link href="/oldHome">
        <button
          style={{ 
            backgroundColor: '#5C6D63', // dark green
            color: 'white'
          }}
          className="fixed bottom-6 right-6 px-4 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
        >
          Old Home
        </button>
      </Link>

    </div>
  );
};

export default EnchantedPortfolio;