import { NextResponse } from 'next/server'
import { isConfigured, getNowPlaying } from '@/app/lib/spotify'

export async function GET() {
  if (!isConfigured()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  try {
    const data = await getNowPlaying()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'spotify_error' }, { status: 500 })
  }
}
