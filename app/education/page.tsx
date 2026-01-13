"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import { experience } from '../content/experience';

const EducationPage = () => {
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

  // Filter education entries from experience
  const education = experience.filter(exp => exp.category === 'Academics');

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
        maxWidth: '900px',
        margin: '0 auto',
        padding: '80px 40px'
      }}>
        {/* Back link */}
        <div style={{
          color: colors.mysticalGlow,
          textDecoration: 'none',
          fontSize: '14px',
          display: 'inline-block',
          marginBottom: '40px',
          transition: 'opacity 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
          <Link href="/" style={{
            color: colors.mysticalGlow,
            textDecoration: 'none'
          }}>
            ← Back
          </Link>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '20px',
            letterSpacing: '-1px'
          }}>
            Education
          </h1>
          <div style={{
            width: '60px',
            height: '2px',
            background: colors.mysticalGlow
          }} />
        </div>

        {/* Education entries */}
        {education.map((edu, idx) => {
          // Extract coursework from bullets (look for "Relevant Coursework:" bullet)
          const courseworkBullet = edu.bullets.find(b => b.includes('Relevant Coursework:'));
          const coursework = courseworkBullet 
            ? courseworkBullet.replace('Relevant Coursework:', '').trim().split(',').map(c => c.trim())
            : [];

          // Extract GPA
          const gpaBullet = edu.bullets.find(b => b.includes('GPA:'));
          const gpa = gpaBullet ? gpaBullet.match(/GPA: ([\d.]+\/[\d.]+)/)?.[1] : null;

          // Extract honors
          const honorsBullet = edu.bullets.find(b => b.includes("Dean's List"));
          const honors = honorsBullet ? "Khoury Dean's List" : null;

          // Extract degree info
          const degreeBullet = edu.bullets.find(b => b.includes('Pursuing'));
          const degree = degreeBullet || edu.position;

          // Extract graduation date
          // const gradBullet = edu.bullets.find(b => b.includes('Graduation:'));
          // const graduationDate = gradBullet 
          //   ? gradBullet.replace('Estimated Graduation:', '').trim()
          //   : edu.date;

          return (
            <div
              key={idx}
              style={{
                border: `1px solid ${colors.mysticalGlow}40`,
                borderRadius: '8px',
                padding: '30px',
                marginBottom: idx === education.length - 1 ? 0 : '30px',
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
                <GraduationCap size={24} color={colors.mysticalGlow} />
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  margin: 0
                }}>
                  {edu.company}
                </h2>
              </div>
              
              <p style={{
                fontSize: '18px',
                color: colors.mysticalGlow,
                marginBottom: '12px'
              }}>
                {degree}
              </p>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                marginBottom: '20px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={16} />
                  <span>{edu.date}</span>
                </div>
                {gpa && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={16} />
                    <span>GPA: {gpa}</span>
                  </div>
                )}
              </div>

              {honors && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'inline-flex',
                    padding: '6px 12px',
                    background: `${colors.mysticalGlow}20`,
                    borderRadius: '4px',
                    fontSize: '13px',
                    color: colors.mysticalGlow,
                    fontWeight: '600'
                  }}>
                    {honors}
                  </div>
                </div>
              )}

              {coursework.length > 0 && (
                <div style={{
                  paddingTop: '20px',
                  borderTop: `1px solid ${colors.mysticalGlow}20`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <BookOpen size={18} color={colors.mysticalGlow} />
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      margin: 0
                    }}>
                      Relevant Coursework
                    </h3>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {coursework.map((course, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '6px 12px',
                          background: `${colors.darkGreen}40`,
                          borderRadius: '4px',
                          fontSize: '13px',
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Show other bullets that aren't coursework, GPA, or graduation */}
              {edu.bullets.filter(b => 
                !b.includes('Relevant Coursework:') && 
                !b.includes('GPA:') && 
                !b.includes('Graduation:') && 
                !b.includes('Pursuing') &&
                !b.includes("Dean's List")
              ).length > 0 && (
                <div style={{
                  paddingTop: '20px',
                  borderTop: `1px solid ${colors.mysticalGlow}20`,
                  marginTop: '20px'
                }}>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {edu.bullets.filter(b => 
                      !b.includes('Relevant Coursework:') && 
                      !b.includes('GPA:') && 
                      !b.includes('Graduation:') && 
                      !b.includes('Pursuing') &&
                      !b.includes("Dean's List")
                    ).map((bullet, i) => (
                      <li
                        key={i}
                        style={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '14px',
                          marginBottom: '8px',
                          paddingLeft: '16px',
                          position: 'relative'
                        }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: '0',
                          color: colors.mysticalGlow,
                          fontSize: '10px'
                        }}>
                          ▸
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EducationPage;