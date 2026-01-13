"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code, User, Briefcase, Heart, Brain, BookOpen, Film, Music, GraduationCap } from 'lucide-react';

const EnchantedPortfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [buttonOpacities, setButtonOpacities] = useState<Record<string, number>>({});

  const colors = {
    mysticalGlow: '#6dd5a8',
    darkBg: '#000000'
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const buttons = document.querySelectorAll('[data-button-id]');
      const newOpacities: Record<string, number> = {};
      
      buttons.forEach((button) => {
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - buttonCenterX, 2) + 
          Math.pow(e.clientY - buttonCenterY, 2)
        );
        
        const maxDistance = 300;
        const fadeStart = 200;
        
        let opacity = 0;
        if (distance < fadeStart) {
          opacity = 1;
        } else if (distance < maxDistance) {
          opacity = 1 - ((distance - fadeStart) / (maxDistance - fadeStart));
        }
        
        const buttonId = button.getAttribute('data-button-id');
        if (buttonId) {
          newOpacities[buttonId] = opacity;
        }
      });
      
      setButtonOpacities(newOpacities);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('descoteaux.a@northeastern.edu');
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 800);
  };

  const buttonBaseStyle = {
    background: 'transparent',
    border: `1px solid ${colors.mysticalGlow}60`,
    borderRadius: '8px',
    padding: '15px 20px',
    fontSize: '16px',
    color: colors.mysticalGlow,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    fontFamily: 'inherit',
    transform: 'scale(1)',
    boxShadow: '0 0 0px transparent'
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.currentTarget.style.background = `${colors.mysticalGlow}10`;
    e.currentTarget.style.borderColor = colors.mysticalGlow;
    e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
    e.currentTarget.style.boxShadow = `0 0 20px ${colors.mysticalGlow}40, 0 5px 15px rgba(0,0,0,0.3)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.borderColor = `${colors.mysticalGlow}60`;
    e.currentTarget.style.transform = 'scale(1) translateY(0)';
    e.currentTarget.style.boxShadow = '0 0 0px transparent';
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
      {/* Background stars */}
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

      {/* Flashlight effect */}
      <div style={{
        position: 'fixed',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.mysticalGlow}40 0%, ${colors.mysticalGlow}20 30%, ${colors.mysticalGlow}05 50%, transparent 70%)`,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transition: 'left 0.1s ease-out, top 0.1s ease-out',
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

      {/* Main Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2,
        maxWidth: '700px',
        padding: '40px'
      }}>
        {/* Name */}
        <div 
          data-button-id="name"
          style={{
            marginBottom: '60px',
            textAlign: 'center',
            opacity: buttonOpacities['name'] || 0,
            transition: 'opacity 0.15s ease-out'
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

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {/* Email */}
          <div 
            data-button-id="email"
            style={{ 
              gridColumn: 'span 2',
              position: 'relative',
              opacity: buttonOpacities['email'] || 0,
              transition: 'opacity 0.15s ease-out'
            }}>
            <button
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
          <div 
            data-button-id="linkedin"
            style={{
              opacity: buttonOpacities['linkedin'] || 0,
              transition: 'opacity 0.15s ease-out'
            }}>
            <a
              href="https://www.linkedin.com/in/alexandradescoteaux/"
              target="_blank"
              rel="noopener noreferrer"
              style={{...buttonBaseStyle, justifyContent: 'center'}}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Linkedin size={18} />
            </a>
          </div>

          {/* GitHub */}
          <div 
            data-button-id="github"
            style={{
              opacity: buttonOpacities['github'] || 0,
              transition: 'opacity 0.15s ease-out'
            }}>
            <a
              href="https://github.com/adescoteaux1"
              target="_blank"
              rel="noopener noreferrer"
              style={{...buttonBaseStyle, justifyContent: 'center'}}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Github size={18} />
            </a>
          </div>

          {/* Projects */}
          <div 
            data-button-id="projects"
            style={{
              gridColumn: 'span 2',
              opacity: buttonOpacities['projects'] || 0,
              transition: 'opacity 0.15s ease-out'
            }}>
            <a
              href="/projects"
              style={buttonBaseStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Code size={18} />
              <span>Projects</span>
            </a>
          </div>

          {/* About */}
          <div 
            data-button-id="about"
            style={{
              opacity: buttonOpacities['about'] || 0,
              transition: 'opacity 0.15s ease-out'
            }}>
            <a
              href="/about"
              style={{...buttonBaseStyle, justifyContent: 'center'}}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <User size={18} />
            </a>
          </div>

          {/* Experience */}
          <div 
            data-button-id="experience"
            style={{
              opacity: buttonOpacities['experience'] || 0,
              transition: 'opacity 0.15s ease-out'
            }}>
            <a
              href="/experience"
              style={buttonBaseStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Briefcase size={18} />
              <span>Experience</span>
            </a>
          </div>

          {/* Interests */}
          <div 
            data-button-id="interests"
            style={{
              opacity: buttonOpacities['interests'] || 0,
              transition: 'opacity 0.15s ease-out'
            }}>
            <a
              href="/interests"
              style={buttonBaseStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Heart size={18} />
              <span>Interests</span>
            </a>
          </div>

          {/* Brain Dump */}
          <div 
            data-button-id="brain-dump"
            style={{
              gridColumn: 'span 2',
              opacity: buttonOpacities['brain-dump'] || 0,
              transition: 'opacity 0.15s ease-out'
            }}>
            <a
              href="/brain-dump"
              style={buttonBaseStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Brain size={18} />
              <span>Brain Dump</span>
            </a>
          </div>

          {/* Reading */}
          <div 
            data-button-id="reading"
            style={{
              opacity: buttonOpacities['reading'] || 0,
              transition: 'opacity 0.15s ease-out'
            }}>
            <a
              href="/reading"
              style={{...buttonBaseStyle, justifyContent: 'center'}}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <BookOpen size={18} />
            </a>
          </div>

          {/* Watch List */}
          <div 
            data-button-id="watch-list"
            style={{
              opacity: buttonOpacities['watch-list'] || 0,
              transition: 'opacity 0.15s ease-out'
            }}>
            <a
              href="/watch-list"
              style={{...buttonBaseStyle, justifyContent: 'center'}}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Film size={18} />
            </a>
          </div>

          {/* Music */}
          <div 
            data-button-id="music"
            style={{
              opacity: buttonOpacities['music'] || 0,
              transition: 'opacity 0.15s ease-out'
            }}>
            <a
              href="/music"
              style={{...buttonBaseStyle, justifyContent: 'center'}}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Music size={18} />
            </a>
          </div>

          {/* Education */}
          <div 
            data-button-id="education"
            style={{
              gridColumn: 'span 3',
              opacity: buttonOpacities['education'] || 0,
              transition: 'opacity 0.15s ease-out'
            }}>
            <a
              href="/education"
              style={{...buttonBaseStyle, justifyContent: 'center'}}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <GraduationCap size={18} />
              <span>Education</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Old Site Button */}
      <div
        data-button-id="old-site"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          opacity: buttonOpacities['old-site'] || 0,
          transition: 'opacity 0.15s ease-out',
          zIndex: 10
        }}>
        <a
          href="/oldHome"
          style={{
            display: 'block',
            backgroundColor: '#5C6D63',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '9999px',
            border: 'none',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '16px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#4a5950';
            e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(92, 109, 99, 0.5), 0 15px 25px -5px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#5C6D63';
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
          }}
        >
          Old Site
        </a>
      </div>
    </div>
  );
};

export default EnchantedPortfolio;