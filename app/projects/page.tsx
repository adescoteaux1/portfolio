"use client"

import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, FileText } from 'lucide-react';
import content from "../content/content";
import Link from 'next/link';

const ProjectsPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  // Get unique skills from all projects
  const allSkills = [...new Set(content.projects.flatMap(project => project.skills))].sort();
  
  // Filter projects based on selected filter
  const filteredProjects = filter === 'all' 
    ? content.projects 
    : content.projects.filter(project => project.skills.includes(filter));

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
        maxWidth: '1100px',
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
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '1'}
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
            Projects
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
            maxWidth: '600px'
          }}>
            A collection of my work in web development, data engineering, and software design.
          </p>
        </div>

        {/* Filter buttons */}
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
          {allSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => setFilter(skill)}
              style={{
                padding: '8px 16px',
                border: `1px solid ${filter === skill ? colors.mysticalGlow : colors.mysticalGlow + '40'}`,
                borderRadius: '4px',
                fontSize: '14px',
                background: filter === skill ? `${colors.mysticalGlow}10` : 'transparent',
                color: filter === skill ? colors.mysticalGlow : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                transition: 'all 0.3s'
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
          gap: '25px'
        }}>
          {filteredProjects.map((project) => (
            <div
              key={project.path}
              style={{
                border: `1px solid ${colors.mysticalGlow}40`,
                borderRadius: '8px',
                padding: '24px',
                transition: 'all 0.3s',
                cursor: 'pointer'
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
                gap: '10px',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '32px' }}>{project.emoji}</span>
                <h3 style={{ fontSize: '22px', fontWeight: '600', flex: 1 }}>
                  {project.name}
                </h3>
                {project.featured && (
                  <span style={{
                    fontSize: '11px',
                    padding: '4px 8px',
                    background: `${colors.mysticalGlow}20`,
                    color: colors.mysticalGlow,
                    borderRadius: '3px',
                    fontWeight: '600'
                  }}>
                    Featured
                  </span>
                )}
              </div>

              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                {project.shortDescription}
              </p>

              <p style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '13px',
                marginBottom: '16px'
              }}>
                {project.dates}
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginBottom: '20px'
              }}>
                {project.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '4px 10px',
                      background: `${colors.darkGreen}60`,
                      borderRadius: '3px',
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div style={{
                display: 'flex',
                gap: '10px'
              }}>
                <a
                  href={`/projects/${project.path}`}
                  style={{
                    flex: 1,
                    padding: '10px',
                    textAlign: 'center',
                    border: `1px solid ${colors.mysticalGlow}`,
                    borderRadius: '4px',
                    fontSize: '14px',
                    color: colors.mysticalGlow,
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${colors.mysticalGlow}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  View <ExternalLink size={14} />
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '10px',
                      border: `1px solid ${colors.mysticalGlow}40`,
                      borderRadius: '4px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.mysticalGlow;
                      e.currentTarget.style.color = colors.mysticalGlow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${colors.mysticalGlow}40`;
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
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
                    style={{
                      padding: '10px',
                      border: `1px solid ${colors.mysticalGlow}40`,
                      borderRadius: '4px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.mysticalGlow;
                      e.currentTarget.style.color = colors.mysticalGlow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${colors.mysticalGlow}40`;
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
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