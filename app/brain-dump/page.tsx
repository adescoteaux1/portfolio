"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, FileText, Globe, File, ExternalLink, Star, CheckCircle, Clock, Bookmark } from 'lucide-react';
import { brainDump, Resource } from '@/app/content/braindump';

const BrainDumpPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

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

  const categories: string[] = [...new Set(brainDump.map((item: Resource) => item.category))] as string[];
  const types: string[] = [...new Set(brainDump.map((item: Resource) => item.type))] as string[];
  
  const filteredResources = brainDump.filter((item: Resource) => {
    const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter;
    const typeMatch = typeFilter === 'all' || item.type === typeFilter;
    return categoryMatch && typeMatch;
  });

  const iconMap = {
    'Textbook': BookOpen,
    'Article': FileText,
    'Website': Globe,
    'PDF': File,
    'Documentation': BookOpen,
    'Tutorial': FileText,
    'Reference': Bookmark
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
        {[...Array(30)].map((_: undefined, i: number) => {
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
        maxWidth: '1000px',
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
            Brain Dump
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
            maxWidth: '700px',
            lineHeight: '1.6'
          }}>
            A collection of useful resources, articles, textbooks, and references I&apos;ve found valuable or want to explore.
          </p>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: '40px' }}>
          {/* Category filters */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Category
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <button
                onClick={() => setCategoryFilter('all')}
                style={{
                  padding: '8px 16px',
                  border: `1px solid ${categoryFilter === 'all' ? colors.mysticalGlow : colors.mysticalGlow + '40'}`,
                  borderRadius: '4px',
                  fontSize: '14px',
                  background: categoryFilter === 'all' ? `${colors.mysticalGlow}10` : 'transparent',
                  color: categoryFilter === 'all' ? colors.mysticalGlow : 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                All
              </button>
              {categories.map((category: string) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  style={{
                    padding: '8px 16px',
                    border: `1px solid ${categoryFilter === category ? colors.mysticalGlow : colors.mysticalGlow + '40'}`,
                    borderRadius: '4px',
                    fontSize: '14px',
                    background: categoryFilter === category ? `${colors.mysticalGlow}10` : 'transparent',
                    color: categoryFilter === category ? colors.mysticalGlow : 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Type filters */}
          <div>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Type
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <button
                onClick={() => setTypeFilter('all')}
                style={{
                  padding: '8px 16px',
                  border: `1px solid ${typeFilter === 'all' ? colors.mysticalGlow : colors.mysticalGlow + '40'}`,
                  borderRadius: '4px',
                  fontSize: '14px',
                  background: typeFilter === 'all' ? `${colors.mysticalGlow}10` : 'transparent',
                  color: typeFilter === 'all' ? colors.mysticalGlow : 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                All
              </button>
              {types.map((type: string) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  style={{
                    padding: '8px 16px',
                    border: `1px solid ${typeFilter === type ? colors.mysticalGlow : colors.mysticalGlow + '40'}`,
                    borderRadius: '4px',
                    fontSize: '14px',
                    background: typeFilter === type ? `${colors.mysticalGlow}10` : 'transparent',
                    color: typeFilter === type ? colors.mysticalGlow : 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources list */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {filteredResources.map((resource: Resource, idx: number) => {
            const TypeIcon = iconMap[resource.type as keyof typeof iconMap] || FileText;
            const StatusIcon = resource.status === 'completed' ? CheckCircle : resource.status === 'in-progress' ? BookOpen : Clock;
            const statusColor = resource.status === 'completed' ? colors.mysticalGlow : resource.status === 'in-progress' ? colors.mediumGreen : 'rgba(255, 255, 255, 0.5)';
            
            return (
              <div
                key={idx}
                style={{
                  border: `1px solid ${colors.mysticalGlow}40`,
                  borderRadius: '8px',
                  padding: '24px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.borderColor = colors.mysticalGlow;
                  e.currentTarget.style.background = `${colors.mysticalGlow}05`;
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.borderColor = `${colors.mysticalGlow}40`;
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '8px'
                    }}>
                      <TypeIcon size={20} color={colors.mysticalGlow} />
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        margin: 0
                      }}>
                        {resource.title}
                      </h3>
                    </div>

                    {resource.author && (
                      <p style={{
                        color: colors.mysticalGlow,
                        fontSize: '15px',
                        marginBottom: '10px'
                      }}>
                        {resource.author}
                      </p>
                    )}

                    {resource.description && (
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        marginBottom: '12px'
                      }}>
                        {resource.description}
                      </p>
                    )}

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}>
                      <span style={{
                        padding: '4px 10px',
                        background: `${colors.darkGreen}60`,
                        borderRadius: '3px',
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        {resource.category}
                      </span>
                      <span style={{
                        padding: '4px 10px',
                        border: `1px solid ${colors.mysticalGlow}40`,
                        borderRadius: '3px',
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>
                        {resource.type}
                      </span>
                      {resource.tags && resource.tags.map((tag: string, i: number) => (
                        <span
                          key={i}
                          style={{
                            padding: '4px 10px',
                            background: `${colors.deepForest}80`,
                            borderRadius: '3px',
                            fontSize: '11px',
                            color: 'rgba(255, 255, 255, 0.7)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {resource.rating && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}>
                          {[...Array(5)].map((_: undefined, i: number) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < resource.rating! ? colors.mysticalGlow : 'none'}
                              color={i < resource.rating! ? colors.mysticalGlow : 'rgba(255, 255, 255, 0.3)'}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          border: `1px solid ${colors.mysticalGlow}`,
                          borderRadius: '4px',
                          fontSize: '13px',
                          color: colors.mysticalGlow,
                          textDecoration: 'none',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.currentTarget.style.background = `${colors.mysticalGlow}10`;
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <ExternalLink size={14} />
                        Access Resource
                      </a>
                    )}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: statusColor,
                    fontSize: '13px',
                    marginLeft: '16px'
                  }}>
                    <StatusIcon size={18} />
                    <span style={{ textTransform: 'capitalize' }}>{resource.status.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div style={{
          marginTop: '60px',
          padding: '30px',
          border: `1px solid ${colors.mysticalGlow}40`,
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <p style={{
                fontSize: '32px',
                fontWeight: '700',
                color: colors.mysticalGlow,
                marginBottom: '4px'
              }}>
                {brainDump.filter((r: Resource) => r.status === 'completed').length}
              </p>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                Completed
              </p>
            </div>
            <div>
              <p style={{
                fontSize: '32px',
                fontWeight: '700',
                color: colors.mediumGreen,
                marginBottom: '4px'
              }}>
                {brainDump.filter((r: Resource) => r.status === 'in-progress').length}
              </p>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                In Progress
              </p>
            </div>
            <div>
              <p style={{
                fontSize: '32px',
                fontWeight: '700',
                color: 'rgba(255, 255, 255, 0.5)',
                marginBottom: '4px'
              }}>
                {brainDump.filter((r: Resource) => r.status === 'to-read').length}
              </p>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                To Read
              </p>
            </div>
            <div>
              <p style={{
                fontSize: '32px',
                fontWeight: '700',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '4px'
              }}>
                {brainDump.length}
              </p>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                Total Resources
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainDumpPage;