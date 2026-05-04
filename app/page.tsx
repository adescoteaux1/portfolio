"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Code, User, Briefcase, Heart, Brain, BookOpen, Film, Music, GraduationCap } from 'lucide-react';
import NatureBackground from './components/NatureBackground';
import { useTheme } from './context/theme';

type Ripple = { id: number; x: number; y: number }

const FULL_NAME = 'Ally Descoteaux'

const EnchantedPortfolio = () => {
  const { colors, isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [displayed, setDisplayed] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  // Mouse tracking for cursor glow
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Typewriter — starts after the riseIn entrance animation
  useEffect(() => {
    const start = setTimeout(() => {
      let i = 0;
      const tick = setInterval(() => {
        i++;
        setDisplayed(FULL_NAME.slice(0, i));
        if (i >= FULL_NAME.length) {
          clearInterval(tick);
          setTimeout(() => setTypingDone(true), 500);
        }
      }, 72);
      return () => clearInterval(tick);
    }, 750);
    return () => clearTimeout(start);
  }, []);

  // Click ripple
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const id = rippleId.current++;
      setRipples(prev => [...prev.slice(-5), { id, x: e.clientX, y: e.clientY }]);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const removeRipple = (id: number) =>
    setRipples(prev => prev.filter(r => r.id !== id));

  const copyEmail = () => {
    navigator.clipboard.writeText('descoteaux.a@northeastern.edu');
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 800);
  };

  const buttonBaseStyle: React.CSSProperties = {
    background: isDark ? 'transparent' : 'rgba(240, 248, 243, 0.62)',
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    padding: '15px 20px',
    fontSize: '16px',
    color: colors.accent,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    fontFamily: 'inherit',
    transform: 'scale(1)',
    boxShadow: '0 0 0px transparent',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.currentTarget.style.background = colors.cardHoverBg;
    e.currentTarget.style.borderColor = colors.accent;
    e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
    e.currentTarget.style.boxShadow = `0 0 20px ${colors.cursorGlow}, 0 5px 15px rgba(0,0,0,0.1)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.currentTarget.style.background = isDark ? 'transparent' : 'rgba(240, 248, 243, 0.62)';
    e.currentTarget.style.borderColor = colors.border;
    e.currentTarget.style.transform = 'scale(1) translateY(0)';
    e.currentTarget.style.boxShadow = '0 0 0px transparent';
  };

  const enter = (i: number): React.CSSProperties => ({
    opacity: 0,
    animation: `riseIn 0.55s ease-out ${0.15 + i * 0.07}s forwards`,
  });

  return (
    <div style={{
      minHeight: '100vh',
      height: '100vh',
      background: 'transparent',
      color: colors.text,
      overflow: 'hidden',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <NatureBackground />

      {/* Cursor glow */}
      <div style={{
        position: 'fixed',
        width: '700px', height: '700px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.cursorGlow} 0%, ${colors.cursorGlow}80 20%, transparent 65%)`,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transition: 'left 0.1s ease-out, top 0.1s ease-out',
        zIndex: 1,
      }} />

      {/* Click ripples */}
      {ripples.flatMap(r =>
        [0, 1, 2].map(ring => (
          <div
            key={`${r.id}-${ring}`}
            onAnimationEnd={ring === 2 ? () => removeRipple(r.id) : undefined}
            style={{
              position: 'fixed',
              left: r.x, top: r.y,
              borderRadius: '50%',
              border: `1px solid ${colors.accent}`,
              opacity: 0,
              pointerEvents: 'none',
              zIndex: 5,
              animation: `ripple-out 0.9s ${ring * 0.14}s ease-out forwards`,
            }}
          />
        ))
      )}

      <style>{`
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes ripple-out {
          0%   { width: 0px;   height: 0px;   opacity: 0.65; transform: translate(-50%, -50%); }
          100% { width: 160px; height: 160px; opacity: 0;    transform: translate(-50%, -50%); }
        }
      `}</style>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '700px',
        padding: '40px',
        ...(isDark && {
          borderRadius: '20px',
          background: 'rgba(8, 20, 12, 0.52)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(109, 213, 168, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }),
      }}>
        {/* Name — typewriter */}
        <div style={{ marginBottom: '60px', textAlign: 'center', minHeight: '80px', ...enter(0) }}>
          <h1 style={{
            fontSize: '64px',
            fontWeight: '400',
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.text})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-1px',
            fontFamily: 'Georgia, serif',
          }}>
            {displayed}
            {!typingDone && (
              <span style={{
                WebkitTextFillColor: colors.accent,
                animation: 'cursor-blink 0.65s step-end infinite',
              }}>|</span>
            )}
          </h1>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          {/* Email */}
          <div style={{ gridColumn: 'span 2', position: 'relative', ...enter(1) }}>
            <button
              type="button"
              onClick={copyEmail}
              style={buttonBaseStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Mail size={18} />
              <span>Email</span>
            </button>
            {copiedMessage && (
              <div style={{
                position: 'absolute',
                top: '-35px', left: '50%',
                transform: 'translateX(-50%)',
                background: colors.accent,
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                animation: 'fadeIn 0.2s ease-out',
              }}>
                Copied!
              </div>
            )}
          </div>

          {/* LinkedIn */}
          <div style={{ ...enter(2) }}>
            <a href="https://www.linkedin.com/in/alexandradescoteaux/" target="_blank" rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ ...buttonBaseStyle, justifyContent: 'center' }}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Linkedin size={18} />
            </a>
          </div>

          {/* GitHub */}
          <div style={{ ...enter(3) }}>
            <a href="https://github.com/adescoteaux1" target="_blank" rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ ...buttonBaseStyle, justifyContent: 'center' }}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Github size={18} />
            </a>
          </div>

          {/* Projects */}
          <div style={{ gridColumn: 'span 2', ...enter(4) }}>
            <a href="/projects" style={buttonBaseStyle}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Code size={18} />
              <span>Projects</span>
            </a>
          </div>

          {/* About */}
          <div style={{ ...enter(5) }}>
            <a href="/about" aria-label="About" style={{ ...buttonBaseStyle, justifyContent: 'center' }}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <User size={18} />
            </a>
          </div>

          {/* Experience */}
          <div style={{ ...enter(6) }}>
            <a href="/experience" style={buttonBaseStyle}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Briefcase size={18} />
              <span>Experience</span>
            </a>
          </div>

          {/* Interests */}
          <div style={{ ...enter(7) }}>
            <a href="/interests" style={buttonBaseStyle}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Heart size={18} />
              <span>Interests</span>
            </a>
          </div>

          {/* Brain Dump */}
          <div style={{ gridColumn: 'span 2', ...enter(8) }}>
            <a href="/brain-dump" style={buttonBaseStyle}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Brain size={18} />
              <span>Brain Dump</span>
            </a>
          </div>

          {/* Reading */}
          <div style={{ ...enter(9) }}>
            <a href="/reading" aria-label="Reading" style={{ ...buttonBaseStyle, justifyContent: 'center' }}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <BookOpen size={18} />
            </a>
          </div>

          {/* Watch List */}
          <div style={{ ...enter(10) }}>
            <a href="/watch-list" aria-label="Watch List" style={{ ...buttonBaseStyle, justifyContent: 'center' }}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Film size={18} />
            </a>
          </div>

          {/* Music */}
          <div style={{ ...enter(11) }}>
            <a href="/music" aria-label="Music" style={{ ...buttonBaseStyle, justifyContent: 'center' }}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Music size={18} />
            </a>
          </div>

          {/* Education */}
          <div style={{ gridColumn: 'span 3', ...enter(12) }}>
            <a href="/education" style={{ ...buttonBaseStyle, justifyContent: 'center' }}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <GraduationCap size={18} />
              <span>Education</span>
            </a>
          </div>
        </div>
      </div>

      {/* Old Site Button */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 10, ...enter(13) }}>
        <a
          href="/oldHome"
          style={{
            display: 'block',
            backgroundColor: colors.accent,
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '9999px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontFamily: 'inherit',
            fontSize: '14px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
        >
          Old Site
        </a>
      </div>
    </div>
  );
};

export default EnchantedPortfolio;
