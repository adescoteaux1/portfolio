"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Star, Clock, CheckCircle } from 'lucide-react';
import { readingList } from '../content/reading';
import NatureBackground from '../components/NatureBackground';
import { useTheme } from '../context/theme';

const ReadingListPage = () => {
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

  const categories = [...new Set(readingList.map(item => item.category))];
  const filteredBooks = filter === 'all'
    ? readingList
    : readingList.filter(item => item.category === filter);

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
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '80px 40px',
      }}>
        <Link
          href="/"
          style={{ color: colors.accent, textDecoration: 'none', fontSize: '14px', display: 'inline-block', marginBottom: '40px', transition: 'opacity 0.3s' }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          ← Back
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-1px' }}>
            Reading List
          </h1>
          <div style={{ width: '60px', height: '2px', background: colors.accent, marginBottom: '20px' }} />
          <p style={{ fontSize: '16px', color: colors.textMuted, maxWidth: '700px', lineHeight: '1.6' }}>
            Books I&apos;m reading, have read, and want to read — from technical textbooks to fiction.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '60px' }}>
          <button
            type="button"
            onClick={() => setFilter('all')}
            style={{
              padding: '8px 16px',
              border: `1px solid ${filter === 'all' ? colors.accent : colors.border}`,
              borderRadius: '4px', fontSize: '14px',
              background: filter === 'all' ? colors.tagBg : 'transparent',
              color: filter === 'all' ? colors.accent : colors.textMuted,
              cursor: 'pointer', transition: 'all 0.3s',
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
                borderRadius: '4px', fontSize: '14px',
                background: filter === category ? colors.tagBg : 'transparent',
                color: filter === category ? colors.accent : colors.textMuted,
                cursor: 'pointer', transition: 'all 0.3s',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Books list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredBooks.map((book, idx) => {
            const StatusIcon = book.status === 'read' ? CheckCircle : book.status === 'reading' ? BookOpen : Clock;
            const statusColor = book.status === 'read' ? colors.accent : book.status === 'reading' ? colors.accentSecondary : colors.textDim;

            return (
              <div
                key={idx}
                style={{ border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '24px', transition: 'all 0.3s' }}
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
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '6px' }}>{book.title}</h3>
                    <p style={{ color: colors.accent, fontSize: '16px', marginBottom: '12px' }}>{book.author}</p>
                    {book.description && (
                      <p style={{ color: colors.textMuted, fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
                        {book.description}
                      </p>
                    )}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                      <span style={{ padding: '4px 10px', background: colors.skillBg, borderRadius: '3px', fontSize: '12px', color: colors.textMuted }}>
                        {book.category}
                      </span>
                      {book.rating && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < book.rating! ? colors.accent : 'none'} color={i < book.rating! ? colors.accent : colors.textDim} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: statusColor, fontSize: '13px', marginLeft: '16px' }}>
                    <StatusIcon size={18} />
                    <span style={{ textTransform: 'capitalize' }}>{book.status}</span>
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

export default ReadingListPage;
