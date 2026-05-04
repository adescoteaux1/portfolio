"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import { experience } from '../content/experience';
import NatureBackground from '../components/NatureBackground';
import { useTheme } from '../context/theme';

const EducationPage = () => {
  const { colors } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const education = experience.filter(exp => exp.category === 'Academics');

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
        maxWidth: '900px',
        margin: '0 auto',
        padding: '80px 40px',
      }}>
        <div
          style={{ color: colors.accent, fontSize: '14px', display: 'inline-block', marginBottom: '40px', transition: 'opacity 0.3s' }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <Link href="/" style={{ color: colors.accent, textDecoration: 'none' }}>← Back</Link>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-1px' }}>
            Education
          </h1>
          <div style={{ width: '60px', height: '2px', background: colors.accent }} />
        </div>

        {/* Education entries */}
        {education.map((edu, idx) => {
          const courseworkBullet = edu.bullets.find(b => b.includes('Relevant Coursework:'));
          const coursework = courseworkBullet
            ? courseworkBullet.replace('Relevant Coursework:', '').trim().split(',').map(c => c.trim())
            : [];

          const gpaBullet = edu.bullets.find(b => b.includes('GPA:'));
          const gpa = gpaBullet ? gpaBullet.match(/GPA: ([\d.]+\/[\d.]+)/)?.[1] : null;

          const honorsBullet = edu.bullets.find(b => b.includes("Dean's List"));
          const honors = honorsBullet ? "Khoury Dean's List" : null;

          const degreeBullet = edu.bullets.find(b => b.includes('Pursuing'));
          const degree = degreeBullet || edu.position;

          return (
            <div
              key={idx}
              style={{
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '30px',
                marginBottom: idx === education.length - 1 ? 0 : '30px',
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
                <GraduationCap size={24} color={colors.accent} />
                <h2 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>{edu.company}</h2>
              </div>

              <p style={{ fontSize: '18px', color: colors.accent, marginBottom: '12px' }}>{degree}</p>

              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px',
                color: colors.textDim, fontSize: '15px',
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
                    background: colors.tagBg,
                    borderRadius: '4px',
                    fontSize: '13px',
                    color: colors.accent,
                    fontWeight: '600',
                  }}>
                    {honors}
                  </div>
                </div>
              )}

              {coursework.length > 0 && (
                <div style={{ paddingTop: '20px', borderTop: `1px solid ${colors.borderFaint}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <BookOpen size={18} color={colors.accent} />
                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Relevant Coursework</h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {coursework.map((course, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '6px 12px',
                          background: colors.skillBg,
                          borderRadius: '4px',
                          fontSize: '13px',
                          color: colors.textMuted,
                        }}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {edu.bullets.filter(b =>
                !b.includes('Relevant Coursework:') &&
                !b.includes('GPA:') &&
                !b.includes('Graduation:') &&
                !b.includes('Pursuing') &&
                !b.includes("Dean's List")
              ).length > 0 && (
                <div style={{ paddingTop: '20px', borderTop: `1px solid ${colors.borderFaint}`, marginTop: '20px' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
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
                          color: colors.textMuted,
                          fontSize: '14px',
                          marginBottom: '8px',
                          paddingLeft: '16px',
                          position: 'relative',
                        }}
                      >
                        <span style={{ position: 'absolute', left: '0', color: colors.accent, fontSize: '10px' }}>▸</span>
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
