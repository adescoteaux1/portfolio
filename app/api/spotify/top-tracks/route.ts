import { NextRequest, NextResponse } from 'next/server'
import { isConfigured, getTopTracks } from '@/app/lib/spotify'

export async function GET(req: NextRequest) {
  if (!isConfigured()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const timeRange = req.nextUrl.searchParams.get('time_range') ?? 'medium_term'
  const valid = ['short_term', 'medium_term', 'long_term']
  if (!valid.includes(timeRange)) {
    return NextResponse.json({ error: 'invalid_time_range' }, { status: 400 })
  }

  try {
    const tracks = await getTopTracks(timeRange)
    return NextResponse.json({ items: tracks })
  } catch {
    return NextResponse.json({ error: 'spotify_error' }, { status: 500 })
  }
}
