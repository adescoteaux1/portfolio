"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { experience } from '../content/experience';
import NatureBackground from '../components/NatureBackground';
import { useTheme } from '../context/theme';

const ExperiencePage = () => {
  const { colors } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const workExperience = experience.filter(exp => exp.category !== 'Academics');
  const categories = [...new Set(workExperience.map(item => item.category))];
  const filteredExperience = filter === 'all'
    ? workExperience
    : workExperience.filter(item => item.category === filter);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

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
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
        >
          ← Back
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-1px' }}>
            Experience
          </h1>
          <div style={{ width: '60px', height: '2px', background: colors.accent }} />
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '60px' }}>
          <button
            type="button"
            onClick={() => setFilter('all')}
            style={{
              padding: '8px 16px',
              border: `1px solid ${filter === 'all' ? colors.accent : colors.border}`,
              borderRadius: '4px',
              fontSize: '14px',
              background: filter === 'all' ? colors.tagBg : 'transparent',
              color: filter === 'all' ? colors.accent : colors.textMuted,
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              style={{
                padding: '8px 16px',
                border: `1px solid ${filter === category ? colors.accent : colors.border}`,
                borderRadius: '4px',
                fontSize: '14px',
                background: filter === category ? colors.tagBg : 'transparent',
                color: filter === category ? colors.accent : colors.textMuted,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Experience items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredExperience.map((item, index) => (
            <div
              key={index}
              style={{
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '24px',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              onClick={() => toggleExpanded(index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.accent;
                e.currentTarget.style.background = colors.cardHoverBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <Briefcase size={18} color={colors.accent} />
                    <h3 style={{ fontSize: '20px', fontWeight: '600' }}>{item.position}</h3>
                  </div>
                  <p style={{ color: colors.accent, fontSize: '16px', marginBottom: '6px' }}>{item.company}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.textDim, fontSize: '14px' }}>
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                </div>
                <div style={{ color: colors.accent }}>
                  {expandedItems[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {expandedItems[index] && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {item.bullets.map((detail, i) => (
                    <li
                      key={i}
                      style={{
                        color: colors.textMuted,
                        fontSize: '14px',
                        marginBottom: '8px',
                        paddingLeft: '20px',
                        position: 'relative',
                      }}
                    >
                      <span style={{ position: 'absolute', left: '0', color: colors.accent }}>•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Skills section */}
        <div style={{ marginTop: '80px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px', color: colors.accent }}>
            Skills Gained
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {[
              {
                category: 'Technical Skills',
                skills: ['Full-Stack Development', 'Data Engineering', 'Database Design', 'DevOps & Automation', 'Quality Assurance', 'Version Control'],
              },
              {
                category: 'Soft Skills',
                skills: ['Team Leadership', 'Project Management', 'Problem Solving', 'Technical Communication', 'Code Review', 'Time Management'],
              },
              {
                category: 'Domain Knowledge',
                skills: ['Carbon Accounting', 'Sustainability Metrics', 'Risk Analysis', 'Financial Systems', 'Educational Technology', 'Enterprise Software'],
              },
            ].map((skillGroup, idx) => (
              <div key={idx}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: colors.text }}>
                  {skillGroup.category}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {skillGroup.skills.map((skill, i) => (
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
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
