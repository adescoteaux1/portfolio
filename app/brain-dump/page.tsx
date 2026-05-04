"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, FileText, Globe, File, ExternalLink, Star, CheckCircle, Clock, Bookmark } from 'lucide-react';
import { brainDump, Resource } from '@/app/content/braindump';
import { AddBrainDumpForm } from '../components/AddBrainDumpForm';
import NatureBackground from '../components/NatureBackground';
import { useTheme } from '../context/theme';

const BrainDumpPage = () => {
  const { colors } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitToGoogleForm = async (form: {
    url: string;
    title?: string;
    category?: string;
    type?: string;
    notes?: string;
    addedBy?: string;
  }) => {
    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSdnSvw0XPv_DS8KuWZsIu4C7adQ3er3VYlvpm3N9hzX0Yr1cw/formResponse";

    const body = new URLSearchParams({
      "entry.1979115312": form.url,
      "entry.1302302683": form.title || "",
      "entry.1567864519": form.category || "",
      "entry.346061128": form.type || "",
      "entry.44930186": form.notes || "",
      "entry.685666409": form.addedBy || "",
    });

    await fetch(formUrl, { method: "POST", mode: "no-cors", body });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddModal(false);
    }, 2000);
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
    'Reference': Bookmark,
  };

  const filterBtnStyle = (active: boolean) => ({
    padding: '8px 16px',
    border: `1px solid ${active ? colors.accent : colors.border}`,
    borderRadius: '4px',
    fontSize: '14px',
    background: active ? colors.tagBg : 'transparent',
    color: active ? colors.accent : colors.textMuted,
    cursor: 'pointer',
    transition: 'all 0.3s',
  });

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
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.opacity = '1'}
        >
          ← Back
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-1px' }}>
            Brain Dump
          </h1>
          <div style={{ width: '60px', height: '2px', background: colors.accent, marginBottom: '20px' }} />
          <p style={{ fontSize: '16px', color: colors.textMuted, maxWidth: '700px', lineHeight: '1.6' }}>
            A collection of useful resources, articles, textbooks, and references I&apos;ve found valuable or want to explore.
          </p>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '14px', color: colors.textDim, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Category
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button type="button" onClick={() => setCategoryFilter('all')} style={filterBtnStyle(categoryFilter === 'all')}>All</button>
              {categories.map((category: string) => (
                <button key={category} type="button" onClick={() => setCategoryFilter(category)} style={filterBtnStyle(categoryFilter === category)}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '14px', color: colors.textDim, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Type
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button type="button" onClick={() => setTypeFilter('all')} style={filterBtnStyle(typeFilter === 'all')}>All</button>
              {types.map((type: string) => (
                <button key={type} type="button" onClick={() => setTypeFilter(type)} style={filterBtnStyle(typeFilter === type)}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredResources.map((resource: Resource, idx: number) => {
            const TypeIcon = iconMap[resource.type as keyof typeof iconMap] || FileText;
            const StatusIcon = resource.status === 'completed' ? CheckCircle : resource.status === 'in-progress' ? BookOpen : Clock;
            const statusColor = resource.status === 'completed' ? colors.accent : resource.status === 'in-progress' ? colors.accentSecondary : colors.textDim;

            return (
              <div
                key={idx}
                style={{ border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '24px', transition: 'all 0.3s' }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.background = colors.cardHoverBg;
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <TypeIcon size={20} color={colors.accent} />
                      <h3 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>{resource.title}</h3>
                    </div>

                    {resource.author && (
                      <p style={{ color: colors.accent, fontSize: '15px', marginBottom: '10px' }}>{resource.author}</p>
                    )}

                    {resource.description && (
                      <p style={{ color: colors.textMuted, fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
                        {resource.description}
                      </p>
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ padding: '4px 10px', background: colors.skillBg, borderRadius: '3px', fontSize: '12px', color: colors.textMuted }}>
                        {resource.category}
                      </span>
                      <span style={{ padding: '4px 10px', border: `1px solid ${colors.border}`, borderRadius: '3px', fontSize: '12px', color: colors.textMuted }}>
                        {resource.type}
                      </span>
                      {resource.tags && resource.tags.map((tag: string, i: number) => (
                        <span key={i} style={{ padding: '4px 10px', background: colors.tagBg, borderRadius: '3px', fontSize: '11px', color: colors.textMuted }}>
                          {tag}
                        </span>
                      ))}
                      {resource.rating && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}>
                          {[...Array(5)].map((_: undefined, i: number) => (
                            <Star key={i} size={14} fill={i < resource.rating! ? colors.accent : 'none'} color={i < resource.rating! ? colors.accent : colors.textDim} />
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
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          padding: '8px 14px', border: `1px solid ${colors.accent}`,
                          borderRadius: '4px', fontSize: '13px', color: colors.accent,
                          textDecoration: 'none', transition: 'all 0.3s',
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = colors.cardHoverBg; }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <ExternalLink size={14} />
                        Access Resource
                      </a>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: statusColor, fontSize: '13px', marginLeft: '16px' }}>
                    <StatusIcon size={18} />
                    <span style={{ textTransform: 'capitalize' }}>{resource.status.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div style={{ marginTop: '60px', padding: '30px', border: `1px solid ${colors.border}`, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
            {[
              { count: brainDump.filter((r: Resource) => r.status === 'completed').length, label: 'Completed', color: colors.accent },
              { count: brainDump.filter((r: Resource) => r.status === 'in-progress').length, label: 'In Progress', color: colors.accentSecondary },
              { count: brainDump.filter((r: Resource) => r.status === 'to-read').length, label: 'To Read', color: colors.textDim },
              { count: brainDump.length, label: 'Total Resources', color: colors.textMuted },
            ].map(({ count, label, color }) => (
              <div key={label}>
                <p style={{ fontSize: '32px', fontWeight: '700', color, marginBottom: '4px' }}>{count}</p>
                <p style={{ fontSize: '14px', color: colors.textDim }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowAddModal(true)}
        style={{
          position: 'fixed', bottom: '32px', right: '32px',
          padding: '14px 18px', borderRadius: '999px',
          background: colors.accent, color: '#fff',
          fontWeight: 600, fontSize: '14px', border: 'none',
          cursor: 'pointer', boxShadow: `0 4px 16px ${colors.cursorGlow}`,
          zIndex: 50,
        }}
      >
        + Add to Brain Dump
      </button>

      {showAddModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(6px)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 100,
        }}>
          <div style={{
            background: colors.bg, border: `1px solid ${colors.border}`,
            borderRadius: '12px', padding: '32px', width: '100%', maxWidth: '420px',
            boxShadow: `0 8px 32px rgba(0,0,0,0.15)`,
          }}>
            {!submitted ? (
              <AddBrainDumpForm onSubmit={submitToGoogleForm} />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '20px', color: colors.accent, marginBottom: '8px' }}>Saved!</p>
                <p style={{ color: colors.textDim, fontSize: '14px' }}>You can curate it later</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrainDumpPage;
