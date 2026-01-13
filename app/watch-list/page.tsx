"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Film, Tv, Star, Clock, CheckCircle } from 'lucide-react';
import { watchList } from '../content/watchlist';

const WatchListPage = () => {
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

  const types = [...new Set(watchList.map(item => item.type))];
  
  const filteredItems = filter === 'all'
    ? watchList
    : watchList.filter(item => item.type === filter);

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
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
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
            Watch List
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
            Movies and TV shows I&apos;ve watched, currently watching, and want to watch.
          </p>
        </div>

        {/* Type filters */}
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
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                padding: '8px 16px',
                border: `1px solid ${filter === type ? colors.mysticalGlow : colors.mysticalGlow + '40'}`,
                borderRadius: '4px',
                fontSize: '14px',
                background: filter === type ? `${colors.mysticalGlow}10` : 'transparent',
                color: filter === type ? colors.mysticalGlow : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Items list */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {filteredItems.map((item, idx) => {
            const TypeIcon = item.type === 'Movie' ? Film : Tv;
            const StatusIcon = item.status === 'watched' ? CheckCircle : item.status === 'watching' ? Film : Clock;
            const statusColor = item.status === 'watched' ? colors.mysticalGlow : item.status === 'watching' ? colors.mediumGreen : 'rgba(255, 255, 255, 0.5)';
            
            return (
              <div
                key={idx}
                style={{
                  border: `1px solid ${colors.mysticalGlow}40`,
                  borderRadius: '8px',
                  padding: '24px',
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
                        {item.title}
                      </h3>
                    </div>

                    {item.year && (
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '14px',
                        marginBottom: '12px'
                      }}>
                        {item.year}
                      </p>
                    )}

                    {item.description && (
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        marginBottom: '12px'
                      }}>
                        {item.description}
                      </p>
                    )}

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      alignItems: 'center'
                    }}>
                      {item.genres.map((genre, i) => (
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
                          {genre}
                        </span>
                      ))}
                      {item.rating && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < item.rating! ? colors.mysticalGlow : 'none'}
                              color={i < item.rating! ? colors.mysticalGlow : 'rgba(255, 255, 255, 0.3)'}
                            />
                          ))}
                        </div>
                      )}
                    </div>
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
                    <span style={{ textTransform: 'capitalize' }}>{item.status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WatchListPage;