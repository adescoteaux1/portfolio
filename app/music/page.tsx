"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ExternalLink, Music as MusicIcon, Disc } from 'lucide-react'
import NatureBackground from '../components/NatureBackground'
import { useTheme } from '../context/theme'
import type { SpotifyTrack, SpotifyArtist, NowPlaying, SpotifyAlbum } from '../lib/spotify'

type TimeRange = 'short_term' | 'medium_term' | 'long_term'
type Tab = 'tracks' | 'artists' | 'albums'

const TIME_LABELS: Record<TimeRange, string> = {
  short_term: 'Past 4 weeks',
  medium_term: 'Past 6 months',
  long_term: 'All time',
}

function msToMinSec(ms: number) {
  const min = Math.floor(ms / 60000)
  const sec = Math.floor((ms % 60000) / 1000)
  return `${min}:${sec.toString().padStart(2, '0')}`
}

function formatFollowers(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return Math.round(n / 1_000) + 'K'
  return String(n)
}

function getAlbums(tracks: SpotifyTrack[]): SpotifyAlbum[] {
  const seen = new Set<string>()
  return tracks
    .map(t => t.album)
    .filter(a => {
      if (seen.has(a.id)) return false
      seen.add(a.id)
      return true
    })
    .slice(0, 20)
}

export default function MusicPage() {
  const { colors } = useTheme()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [tab, setTab] = useState<Tab>('tracks')
  const [timeRange, setTimeRange] = useState<TimeRange>('medium_term')
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [artists, setArtists] = useState<SpotifyArtist[]>([])
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null)
  const [loading, setLoading] = useState(true)
  const [configured, setConfigured] = useState(true)
  const [preview, setPreview] = useState<HTMLAudioElement | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const fetchData = useCallback(async (range: TimeRange) => {
    setLoading(true)
    try {
      const [tracksRes, artistsRes, npRes] = await Promise.all([
        fetch(`/api/spotify/top-tracks?time_range=${range}`),
        fetch(`/api/spotify/top-artists?time_range=${range}`),
        fetch('/api/spotify/currently-playing'),
      ])

      if (tracksRes.status === 503) {
        setConfigured(false)
        return
      }

      const [tracksData, artistsData, npData] = await Promise.all([
        tracksRes.json(),
        artistsRes.json(),
        npRes.json(),
      ])

      setTracks(tracksData.items ?? [])
      setArtists(artistsData.items ?? [])
      setNowPlaying(npData.error ? null : npData)
    } catch {
      setConfigured(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData(timeRange)
  }, [timeRange, fetchData])

  const togglePreview = (track: SpotifyTrack) => {
    if (!track.preview_url) return
    if (playingId === track.id) {
      preview?.pause()
      setPreview(null)
      setPlayingId(null)
      return
    }
    preview?.pause()
    const audio = new Audio(track.preview_url)
    audio.volume = 0.5
    audio.play()
    audio.onended = () => { setPlayingId(null); setPreview(null) }
    setPreview(audio)
    setPlayingId(track.id)
  }

  const albums = getAlbums(tracks)

  const cardStyle: React.CSSProperties = {
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    transition: 'all 0.25s',
    overflow: 'hidden',
    background: 'transparent',
  }

  const filterBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '7px 16px',
    border: `1px solid ${active ? colors.accent : colors.border}`,
    borderRadius: '4px',
    fontSize: '13px',
    background: active ? colors.tagBg : 'transparent',
    color: active ? colors.accent : colors.textMuted,
    cursor: 'pointer',
    transition: 'all 0.2s',
  })

  const tabBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 22px',
    border: 'none',
    borderBottom: `2px solid ${active ? colors.accent : 'transparent'}`,
    background: 'transparent',
    color: active ? colors.accent : colors.textMuted,
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: active ? '600' : '400',
    transition: 'all 0.2s',
  })

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
        position: 'fixed', width: '400px', height: '400px', borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.cursorGlow} 0%, transparent 70%)`,
        pointerEvents: 'none', transform: 'translate(-50%, -50%)',
        left: `${mousePosition.x}px`, top: `${mousePosition.y}px`,
        transition: 'left 0.15s ease-out, top 0.15s ease-out', zIndex: 1,
      }} />

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes spin-disc {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', padding: '80px 40px' }}>
        <Link
          href="/"
          style={{ color: colors.accent, textDecoration: 'none', fontSize: '14px', display: 'inline-block', marginBottom: '40px', transition: 'opacity 0.3s' }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          ← Back
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-1px', margin: 0 }}>Music</h1>
            <span style={{ fontSize: '13px', padding: '4px 10px', background: colors.tagBg, color: colors.accent, borderRadius: '12px', fontWeight: '600' }}>
              via Spotify
            </span>
          </div>
          <div style={{ width: '60px', height: '2px', background: colors.accent }} />
        </div>

        {/* Not configured state */}
        {!configured && (
          <div style={{
            border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '48px',
            textAlign: 'center', maxWidth: '500px', margin: '0 auto',
          }}>
            <MusicIcon size={48} color={colors.accent} style={{ marginBottom: '20px', opacity: 0.6 }} />
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>Spotify not connected</h2>
            <p style={{ color: colors.textMuted, lineHeight: '1.7', marginBottom: '24px' }}>
              Add <code style={{ background: colors.skillBg, padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>SPOTIFY_CLIENT_ID</code>,{' '}
              <code style={{ background: colors.skillBg, padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>SPOTIFY_CLIENT_SECRET</code>, and{' '}
              <code style={{ background: colors.skillBg, padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>SPOTIFY_REFRESH_TOKEN</code>{' '}
              to <code style={{ background: colors.skillBg, padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>.env.local</code> to enable this page.
            </p>
            <p style={{ color: colors.textDim, fontSize: '13px' }}>
              Visit <code style={{ background: colors.skillBg, padding: '2px 6px', borderRadius: '3px' }}>/api/spotify/setup</code> after adding your credentials to get your refresh token.
            </p>
          </div>
        )}

        {configured && (
          <>
            {/* Now Playing */}
            <div style={{ marginBottom: '40px' }}>
              {nowPlaying?.isPlaying && nowPlaying.track ? (
                <div style={{
                  ...cardStyle,
                  display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px',
                  borderColor: colors.accent, background: colors.cardHoverBg,
                }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={nowPlaying.track.album.images[0]?.url}
                      alt={nowPlaying.track.album.name}
                      width={56} height={56}
                      style={{ borderRadius: '4px', display: 'block' }}
                    />
                    <Disc
                      size={18} color={colors.accent}
                      style={{ position: 'absolute', bottom: '-4px', right: '-4px', animation: 'spin-disc 3s linear infinite' }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: colors.accent, display: 'inline-block',
                        animation: 'pulse-dot 1.5s ease-in-out infinite',
                      }} />
                      <span style={{ fontSize: '11px', color: colors.accent, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                        Now Playing
                      </span>
                    </div>
                    <p style={{ fontWeight: '600', fontSize: '16px', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {nowPlaying.track.name}
                    </p>
                    <p style={{ color: colors.textMuted, fontSize: '14px', margin: 0 }}>
                      {nowPlaying.track.artists.map(a => a.name).join(', ')}
                    </p>
                  </div>
                  <a
                    href={nowPlaying.track.external_urls.spotify}
                    target="_blank" rel="noopener noreferrer"
                    aria-label="Open in Spotify"
                    style={{ color: colors.accent, flexShrink: 0 }}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              ) : (
                <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.textDim, display: 'inline-block' }} />
                  <span style={{ color: colors.textDim, fontSize: '14px' }}>Not currently playing</span>
                </div>
              )}
            </div>

            {/* Time range filters */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {(['short_term', 'medium_term', 'long_term'] as TimeRange[]).map(r => (
                <button key={r} type="button" onClick={() => setTimeRange(r)} style={filterBtnStyle(timeRange === r)}>
                  {TIME_LABELS[r]}
                </button>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: `1px solid ${colors.borderFaint}`, marginBottom: '32px' }}>
              {(['tracks', 'artists', 'albums'] as Tab[]).map(t => (
                <button key={t} type="button" onClick={() => setTab(t)} style={tabBtnStyle(tab === t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {/* Loading skeleton */}
            {loading && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} style={{
                    height: '80px', borderRadius: '8px',
                    background: colors.skillBg, opacity: 0.5 + (i % 3) * 0.1,
                    animation: 'pulse-dot 1.8s ease-in-out infinite',
                  }} />
                ))}
              </div>
            )}

            {/* Top Tracks */}
            {!loading && tab === 'tracks' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tracks.map((track, i) => (
                  <div
                    key={track.id}
                    style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', cursor: track.preview_url ? 'pointer' : 'default' }}
                    onClick={() => togglePreview(track)}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.accent; e.currentTarget.style.background = colors.cardHoverBg }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.background = 'transparent' }}
                  >
                    <span style={{ width: '24px', textAlign: 'right', color: colors.textDim, fontSize: '13px', flexShrink: 0 }}>
                      {playingId === track.id ? '▶' : i + 1}
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={track.album.images[2]?.url ?? track.album.images[0]?.url}
                      alt={track.album.name}
                      width={44} height={44}
                      style={{ borderRadius: '4px', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontWeight: '600', fontSize: '15px', margin: 0,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        color: playingId === track.id ? colors.accent : colors.text,
                      }}>
                        {track.name}
                      </p>
                      <p style={{ color: colors.textMuted, fontSize: '13px', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {track.artists.map(a => a.name).join(', ')} · {track.album.name}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                      {track.preview_url && (
                        <span style={{ fontSize: '11px', color: colors.textDim }}>preview</span>
                      )}
                      <span style={{ color: colors.textDim, fontSize: '13px' }}>{msToMinSec(track.duration_ms)}</span>
                      <a
                        href={track.external_urls.spotify}
                        target="_blank" rel="noopener noreferrer"
                        aria-label="Open in Spotify"
                        style={{ color: colors.textDim, transition: 'color 0.2s' }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={(e) => e.currentTarget.style.color = colors.accent}
                        onMouseLeave={(e) => e.currentTarget.style.color = colors.textDim}
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Top Artists */}
            {!loading && tab === 'artists' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                {artists.map((artist, i) => (
                  <a
                    key={artist.id}
                    href={artist.external_urls.spotify}
                    target="_blank" rel="noopener noreferrer"
                    style={{ ...cardStyle, display: 'block', textDecoration: 'none', color: 'inherit' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.accent; e.currentTarget.style.background = colors.cardHoverBg; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    {artist.images[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={artist.images[0].url}
                        alt={artist.name}
                        style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
                      />
                    )}
                    {!artist.images[0] && (
                      <div style={{ width: '100%', aspectRatio: '1', background: colors.skillBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MusicIcon size={40} color={colors.textDim} />
                      </div>
                    )}
                    <div style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                        <p style={{ fontWeight: '600', fontSize: '15px', margin: 0 }}>
                          <span style={{ color: colors.textDim, fontSize: '13px', marginRight: '6px' }}>#{i + 1}</span>
                          {artist.name}
                        </p>
                      </div>
                      {artist.genres.length > 0 && (
                        <p style={{ color: colors.textDim, fontSize: '12px', margin: '0 0 8px', textTransform: 'capitalize' }}>
                          {artist.genres.slice(0, 2).join(', ')}
                        </p>
                      )}
                      <p style={{ color: colors.textDim, fontSize: '12px', margin: 0 }}>
                        {formatFollowers(artist.followers.total)} followers
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Top Albums */}
            {!loading && tab === 'albums' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                {albums.map((album, i) => (
                  <a
                    key={album.id}
                    href={album.external_urls.spotify}
                    target="_blank" rel="noopener noreferrer"
                    style={{ ...cardStyle, display: 'block', textDecoration: 'none', color: 'inherit' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.accent; e.currentTarget.style.background = colors.cardHoverBg; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={album.images[0]?.url}
                      alt={album.name}
                      style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ padding: '14px' }}>
                      <p style={{ fontWeight: '600', fontSize: '14px', margin: '0 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span style={{ color: colors.textDim, fontSize: '12px', marginRight: '6px' }}>#{i + 1}</span>
                        {album.name}
                      </p>
                      <p style={{ color: colors.textDim, fontSize: '12px', margin: 0 }}>
                        {album.release_date?.slice(0, 4)}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
