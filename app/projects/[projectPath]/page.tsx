"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, ArrowLeft, FileText } from 'lucide-react';
import content from '../../content/content';
import Link from 'next/link';

const ProjectDetailPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // In real implementation, you'd use useParams() from next/navigation
  // For now, showing first project as example
  const project = content.projects[0];

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

  const galleryImages = project.coverPhotos && project.coverPhotos.length > 0 
    ? project.coverPhotos 
    : [project.cardPhoto];

  const nextImage = useCallback(() => {
    if (galleryImages.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 300);
  }, [galleryImages.length]);

  const prevImage = useCallback(() => {
    if (galleryImages.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  }, [galleryImages.length]);

  useEffect(() => {
    if (galleryImages.length <= 1 || isTransitioning) return;
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length, isTransitioning, nextImage]);

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
          href="/projects"
          style={{
            color: colors.mysticalGlow,
            textDecoration: 'none',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '40px',
            transition: 'opacity 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        {/* Project header */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '48px' }}>{project.emoji}</span>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              letterSpacing: '-1px',
              margin: 0
            }}>
              {project.name}
            </h1>
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px'
          }}>
            <span>{project.dates}</span>
            {project.featured && (
              <span style={{
                padding: '4px 10px',
                background: `${colors.mysticalGlow}20`,
                color: colors.mysticalGlow,
                borderRadius: '3px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                Featured
              </span>
            )}
            {project.deployed && (
              <span style={{
                padding: '4px 10px',
                background: `${colors.darkGreen}60`,
                color: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '3px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                Deployed
              </span>
            )}
          </div>
        </div>

        {/* Main content grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Left column - Details */}
          <div>
            <div style={{
              border: `1px solid ${colors.mysticalGlow}40`,
              borderRadius: '8px',
              padding: '30px',
              marginBottom: '30px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.mysticalGlow;
              e.currentTarget.style.background = `${colors.mysticalGlow}05`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${colors.mysticalGlow}40`;
              e.currentTarget.style.background = 'transparent';
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '20px',
                color: colors.mysticalGlow
              }}>
                Overview
              </h2>
              <p style={{
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: '1.8',
                marginBottom: '20px'
              }}>
                {project.longDescription}
              </p>
              <div style={{
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: '1.8'
              }}>
                {project.details}
              </div>
            </div>

            {project.future && (
              <div style={{
                border: `1px solid ${colors.mysticalGlow}40`,
                borderRadius: '8px',
                padding: '30px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.mysticalGlow;
                e.currentTarget.style.background = `${colors.mysticalGlow}05`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${colors.mysticalGlow}40`;
                e.currentTarget.style.background = 'transparent';
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: colors.mysticalGlow
                }}>
                  Future Plans
                </h2>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  lineHeight: '1.8'
                }}>
                  {project.future}
                </div>
              </div>
            )}
          </div>

          {/* Right column - Sidebar */}
          <div>
            {/* Links */}
            <div style={{
              border: `1px solid ${colors.mysticalGlow}40`,
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: colors.mysticalGlow
              }}>
                Links
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '12px',
                      border: `1px solid ${colors.mysticalGlow}40`,
                      borderRadius: '6px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.mysticalGlow;
                      e.currentTarget.style.background = `${colors.mysticalGlow}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${colors.mysticalGlow}40`;
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Github size={18} />
                    GitHub Repository
                  </a>
                )}
                {project.url && project.deployed && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '12px',
                      border: `1px solid ${colors.mysticalGlow}`,
                      borderRadius: '6px',
                      color: colors.mysticalGlow,
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${colors.mysticalGlow}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <ExternalLink size={18} />
                    View Live Project
                  </a>
                )}
                {project.presentation && (
                  <a
                    href={project.presentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '12px',
                      border: `1px solid ${colors.mysticalGlow}40`,
                      borderRadius: '6px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.mysticalGlow;
                      e.currentTarget.style.background = `${colors.mysticalGlow}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${colors.mysticalGlow}40`;
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <FileText size={18} />
                    Presentation
                  </a>
                )}
              </div>
            </div>

            {/* Technologies */}
            <div style={{
              border: `1px solid ${colors.mysticalGlow}40`,
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: colors.mysticalGlow
              }}>
                Technologies
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {project.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '6px 12px',
                      background: `${colors.darkGreen}60`,
                      borderRadius: '4px',
                      fontSize: '13px',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Image carousel */}
            {galleryImages.length > 0 && (
              <div style={{
                border: `1px solid ${colors.mysticalGlow}40`,
                borderRadius: '8px',
                padding: '24px'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: colors.mysticalGlow
                }}>
                  Gallery
                </h3>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    height: '200px',
                    borderRadius: '8px',
                    background: `${colors.deepForest}40`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {galleryImages.map((photo, index) => (
                      <div
                        key={index}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: index === currentImageIndex ? (isTransitioning ? 0.5 : 1) : 0,
                          transition: 'opacity 0.3s ease-in-out',
                          zIndex: index === currentImageIndex ? 10 : 0
                        }}
                      >
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontSize: '14px'
                        }}>
                          Image {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>

                  {galleryImages.length > 1 && (
                    <>
                      <button
                        title="Previous Image"
                        onClick={prevImage}
                        disabled={isTransitioning}
                        style={{
                          position: 'absolute',
                          left: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: `${colors.darkBg}CC`,
                          border: `1px solid ${colors.mysticalGlow}40`,
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: colors.mysticalGlow,
                          zIndex: 20
                        }}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        title="Next Image"
                        onClick={nextImage}
                        disabled={isTransitioning}
                        style={{
                          position: 'absolute',
                          right: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: `${colors.darkBg}CC`,
                          border: `1px solid ${colors.mysticalGlow}40`,
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: colors.mysticalGlow,
                          zIndex: 20
                        }}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {galleryImages.length > 1 && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '6px',
                      marginTop: '12px'
                    }}>
                      {galleryImages.map((_, index) => (
                        <button
                          title={`Go to image ${index + 1}`}
                          key={index}
                          onClick={() => {
                            if (!isTransitioning) {
                              setIsTransitioning(true);
                              setTimeout(() => {
                                setCurrentImageIndex(index);
                                setIsTransitioning(false);
                              }, 300);
                            }
                          }}
                          disabled={isTransitioning}
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            border: 'none',
                            background: index === currentImageIndex ? colors.mysticalGlow : `${colors.mysticalGlow}40`,
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;