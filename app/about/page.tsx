"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Github, Linkedin, MapPin, GraduationCap } from 'lucide-react';
import { skills } from '../content/skills';
import { frameworks } from '../content/frameworks';
import { experience } from '../content/experience';
import NatureBackground from '../components/NatureBackground';
import { useTheme } from '../context/theme';

const AboutPage = () => {
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
  const bachelorsDegree = education.find(edu => edu.position.includes('BS') || edu.position.includes('Bachelor'));

  const courseworkBullet = bachelorsDegree?.bullets.find(b => b.includes('Relevant Coursework:'));
  const courses = courseworkBullet
    ? courseworkBullet.replace('Relevant Coursework:', '').trim().split(',').map(c => c.trim()).slice(0, 8)
    : [];

  const gpaBullet = bachelorsDegree?.bullets.find(b => b.includes('GPA:'));
  const gpa = gpaBullet ? gpaBullet.match(/GPA: ([\d.]+\/[\d.]+)/)?.[1] : '3.8/4.0';

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

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '900px',
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
            About Me
          </h1>
          <div style={{ width: '60px', height: '2px', background: colors.accent }} />
        </div>

        {/* Bio */}
        <div style={{ marginBottom: '80px', lineHeight: '1.8', fontSize: '16px', color: colors.textMuted }}>
          <p style={{ marginBottom: '20px' }}>
            I&apos;m a Computer Science and Mathematics student at Northeastern University with a passion for building innovative, user-centered applications. My journey into technology began with my love for mathematics and solving puzzles, which naturally led me to the world of computer science where I could apply logical thinking to create solutions for real-world challenges.
          </p>
          <p style={{ marginBottom: '20px' }}>
            Through my co-op experiences at Verisk as a DevOps QA Engineer and TJX Companies as a Risk Assurance Data and Systems Analyst, I&apos;ve gained valuable industry knowledge in automation, data engineering, and systems optimization. These experiences have strengthened my technical skills while providing me with insights into how software development functions in enterprise environments.
          </p>
          <p style={{ marginBottom: '20px' }}>
            As a TA for Database Design and Object-Oriented Design, I&apos;ve developed a deeper understanding of data structures and programming principles while enjoying helping others grasp complex concepts. My work with Generate, Northeastern&apos;s student-led product development studio, has allowed me to develop innovative products like Arenius and Platnm, collaborating with cross-functional teams to deliver user-centered solutions.
          </p>
        </div>

        {/* Quick info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          marginBottom: '80px',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: colors.accent }}>
              <MapPin size={18} />
              <span style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Location</span>
            </div>
            <p style={{ color: colors.textMuted, fontSize: '15px' }}>Boston, Massachusetts</p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: colors.accent }}>
              <GraduationCap size={18} />
              <span style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Education</span>
            </div>
            <p style={{ color: colors.textMuted, fontSize: '15px' }}>Northeastern University</p>
            <p style={{ color: colors.textDim, fontSize: '13px' }}>BS Computer Science & Mathematics</p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: colors.accent }}>
              <Mail size={18} />
              <span style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</span>
            </div>
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <a
                href="mailto:descoteaux.a@northeastern.edu"
                aria-label="Email"
                style={{ color: colors.textMuted, transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.accent}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textMuted}
              >
                <Mail size={20} />
              </a>
              <a
                href="https://github.com/adescoteaux1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{ color: colors.textMuted, transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.accent}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textMuted}
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/alexandradescoteaux/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ color: colors.textMuted, transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.accent}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textMuted}
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: colors.accent }}>
            Skills
          </h2>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: colors.text }}>
            Languages
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
            {skills.map((skillObj, i) => (
              <span
                key={i}
                style={{
                  padding: '8px 16px',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '4px',
                  fontSize: '14px',
                  color: colors.textMuted,
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
                {skillObj.skill}
              </span>
            ))}
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: colors.text }}>
            Frameworks & Tools
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {frameworks.map((frameworkObj, i) => (
              <span
                key={i}
                style={{
                  padding: '8px 16px',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '4px',
                  fontSize: '14px',
                  color: colors.textMuted,
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
                {frameworkObj.skill}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        {bachelorsDegree && (
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: colors.accent }}>
              Education
            </h2>
            <div
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
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                {bachelorsDegree.company}
              </h3>
              <p style={{ color: colors.accent, marginBottom: '8px' }}>{bachelorsDegree.position}</p>
              <p style={{ color: colors.textDim, fontSize: '14px', marginBottom: '20px' }}>
                GPA: {gpa} • Khoury Dean&apos;s List • {bachelorsDegree.date}
              </p>
              {courses.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {courses.map((course, i) => (
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
              )}
            </div>
          </div>
        )}

        {/* Interests */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: colors.accent }}>
            Interests
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {['Puzzles & Problem Solving', 'Reading & Literature', 'Baking & Cooking', 'Outdoor Activities', 'Continuous Learning', 'Volunteer Work'].map((interest, i) => (
              <div
                key={i}
                style={{
                  padding: '20px',
                  border: `1px solid ${colors.borderFaint}`,
                  borderRadius: '6px',
                  transition: 'all 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.background = colors.cardHoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.borderFaint;
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <p style={{ fontSize: '15px', color: colors.textMuted }}>{interest}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
