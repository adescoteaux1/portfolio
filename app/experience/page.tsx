"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { experience } from '../content/experience';


const ExperiencePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [filter, setFilter] = useState('all');

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

  const workExperience = experience.filter(exp => exp.category !== 'Academics');

  const categories = [...new Set(workExperience.map(item => item.category))];

  const filteredExperience = filter === 'all'
    ? workExperience
    : workExperience.filter(item => item.category === filter);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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
        maxWidth: '900px',
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
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '0.7';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '1';
          }}
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
            Experience
          </h1>
          <div style={{
            width: '60px',
            height: '2px',
            background: colors.mysticalGlow
          }} />
        </div>

        {/* Category filters */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '60px'
        }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '8px 16px',
              border: `1px solid ${filter === 'all' ? colors.mysticalGlow : colors.mysticalGlow + '40'}`,
              borderRadius: '4px',
              fontSize: '14px',
              background: filter === 'all' ? `${colors.mysticalGlow}10` : 'transparent',
              color: filter === 'all' ? colors.mysticalGlow : 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              style={{
                padding: '8px 16px',
                border: `1px solid ${filter === category ? colors.mysticalGlow : colors.mysticalGlow + '40'}`,
                borderRadius: '4px',
                fontSize: '14px',
                background: filter === category ? `${colors.mysticalGlow}10` : 'transparent',
                color: filter === category ? colors.mysticalGlow : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                transition: 'all 0.3s'
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
                border: `1px solid ${colors.mysticalGlow}40`,
                borderRadius: '8px',
                padding: '24px',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onClick={() => toggleExpanded(index)}
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
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '8px'
                  }}>
                    <Briefcase size={18} color={colors.mysticalGlow} />
                    <h3 style={{ fontSize: '20px', fontWeight: '600' }}>
                      {item.position}
                    </h3>
                  </div>
                  <p style={{ color: colors.mysticalGlow, fontSize: '16px', marginBottom: '6px' }}>
                    {item.company}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '14px'
                  }}>
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                </div>
                <div style={{ color: colors.mysticalGlow }}>
                  {expandedItems[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {expandedItems[index] && (
                <ul style={{ 
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {item.bullets.map((detail, i) => (
                    <li
                      key={i}
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '14px',
                        marginBottom: '8px',
                        paddingLeft: '20px',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        color: colors.mysticalGlow
                      }}>
                        •
                      </span>
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
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '20px',
            color: colors.mysticalGlow
          }}>
            Skills Gained
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {[
              {
                category: 'Technical Skills',
                skills: [
                  'Full-Stack Development',
                  'Data Engineering',
                  'Database Design',
                  'DevOps & Automation',
                  'Quality Assurance',
                  'Version Control'
                ]
              },
              {
                category: 'Soft Skills',
                skills: [
                  'Team Leadership',
                  'Project Management',
                  'Problem Solving',
                  'Technical Communication',
                  'Code Review',
                  'Time Management'
                ]
              },
              {
                category: 'Domain Knowledge',
                skills: [
                  'Carbon Accounting',
                  'Sustainability Metrics',
                  'Risk Analysis',
                  'Financial Systems',
                  'Educational Technology',
                  'Enterprise Software'
                ]
              }
            ].map((skillGroup, idx) => (
              <div key={idx}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  {skillGroup.category}
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {skillGroup.skills.map((skill, i) => (
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