export type SpotifyImage = { url: string; width: number; height: number }

export type SpotifyArtistSimple = { id: string; name: string; external_urls: { spotify: string } }

export type SpotifyAlbum = {
  id: string
  name: string
  images: SpotifyImage[]
  external_urls: { spotify: string }
  release_date: string
}

export type SpotifyTrack = {
  id: string
  name: string
  artists: SpotifyArtistSimple[]
  album: SpotifyAlbum
  duration_ms: number
  preview_url: string | null
  external_urls: { spotify: string }
}

export type SpotifyArtist = {
  id: string
  name: string
  genres: string[]
  images: SpotifyImage[]
  popularity: number
  followers: { total: number }
  external_urls: { spotify: string }
}

export type NowPlaying = {
  isPlaying: boolean
  track: SpotifyTrack | null
  progress_ms: number | null
}

export function isConfigured(): boolean {
  return !!(
    process.env.SPOTIFY_CLIENT_ID &&
    process.env.SPOTIFY_CLIENT_SECRET &&
    process.env.SPOTIFY_REFRESH_TOKEN
  )
}

export async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    cache: 'no-store',
  })

  const data = await res.json()
  return data.access_token as string
}

export async function getTopTracks(timeRange: string, limit = 20): Promise<SpotifyTrack[]> {
  const token = await getAccessToken()
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeRange}`,
    { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 3600 } }
  )
  const data = await res.json()
  return data.items ?? []
}

export async function getTopArtists(timeRange: string, limit = 20): Promise<SpotifyArtist[]> {
  const token = await getAccessToken()
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeRange}`,
    { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 3600 } }
  )
  const data = await res.json()
  return data.items ?? []
}

export async function getNowPlaying(): Promise<NowPlaying> {
  const token = await getAccessToken()
  const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (res.status === 204 || res.status !== 200) {
    return { isPlaying: false, track: null, progress_ms: null }
  }

  const data = await res.json()
  return {
    isPlaying: data.is_playing ?? false,
    track: data.item ?? null,
    progress_ms: data.progress_ms ?? null,
  }
}

export function msToMinSec(ms: number): string {
  const min = Math.floor(ms / 60000)
  const sec = Math.floor((ms % 60000) / 1000)
  return `${min}:${sec.toString().padStart(2, '0')}`
}

export function formatFollowers(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K'
  return String(n)
}
