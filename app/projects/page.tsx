"use client"

import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, FileText } from 'lucide-react';
import content from "../content/content";
import Link from 'next/link';
import NatureBackground from '../components/NatureBackground';
import { useTheme } from '../context/theme';

const ProjectsPage = () => {
  const { colors } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const allSkills = [...new Set(content.projects.flatMap(project => project.skills))].sort();
  const filteredProjects = filter === 'all'
    ? content.projects
    : content.projects.filter(project => project.skills.includes(filter));

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
        maxWidth: '1100px',
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
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '1'}
        >
          ← Back
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-1px' }}>
            Projects
          </h1>
          <div style={{ width: '60px', height: '2px', background: colors.accent, marginBottom: '20px' }} />
          <p style={{ fontSize: '16px', color: colors.textMuted, maxWidth: '600px' }}>
            A collection of my work in web development, data engineering, and software design.
          </p>
        </div>

        {/* Filter buttons */}
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
          {allSkills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => setFilter(skill)}
              style={{
                padding: '8px 16px',
                border: `1px solid ${filter === skill ? colors.accent : colors.border}`,
                borderRadius: '4px',
                fontSize: '14px',
                background: filter === skill ? colors.tagBg : 'transparent',
                color: filter === skill ? colors.accent : colors.textMuted,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '25px',
        }}>
          {filteredProjects.map((project) => (
            <div
              key={project.path}
              style={{
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '24px',
                transition: 'all 0.3s',
                cursor: 'pointer',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px' }}>{project.emoji}</span>
                <h3 style={{ fontSize: '22px', fontWeight: '600', flex: 1 }}>{project.name}</h3>
                {project.featured && (
                  <span style={{
                    fontSize: '11px',
                    padding: '4px 8px',
                    background: colors.tagBg,
                    color: colors.accent,
                    borderRadius: '3px',
                    fontWeight: '600',
                  }}>
                    Featured
                  </span>
                )}
              </div>

              <p style={{ color: colors.textMuted, fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                {project.shortDescription}
              </p>

              <p style={{ color: colors.textDim, fontSize: '13px', marginBottom: '16px' }}>
                {project.dates}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {project.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '4px 10px',
                      background: colors.skillBg,
                      borderRadius: '3px',
                      fontSize: '12px',
                      color: colors.textMuted,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={`/projects/${project.path}`}
                  style={{
                    flex: 1,
                    padding: '10px',
                    textAlign: 'center',
                    border: `1px solid ${colors.accent}`,
                    borderRadius: '4px',
                    fontSize: '14px',
                    color: colors.accent,
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.cardHoverBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  View <ExternalLink size={14} />
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    style={{
                      padding: '10px',
                      border: `1px solid ${colors.border}`,
                      borderRadius: '4px',
                      color: colors.textMuted,
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.accent;
                      e.currentTarget.style.color = colors.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.color = colors.textMuted;
                    }}
                  >
                    <Github size={18} />
                  </a>
                )}
                {project.presentation && (
                  <a
                    href={project.presentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Presentation"
                    style={{
                      padding: '10px',
                      border: `1px solid ${colors.border}`,
                      borderRadius: '4px',
                      color: colors.textMuted,
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.accent;
                      e.currentTarget.style.color = colors.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.color = colors.textMuted;
                    }}
                  >
                    <FileText size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
