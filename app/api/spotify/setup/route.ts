import { NextRequest, NextResponse } from 'next/server'

const SCOPES = 'user-top-read user-read-currently-playing'

export async function GET(req: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  if (!clientId) {
    return new NextResponse('Missing SPOTIFY_CLIENT_ID in environment variables.', { status: 500 })
  }

  const redirectBase = process.env.SPOTIFY_REDIRECT_BASE ?? 'http://127.0.0.1:3000'
  const redirectUri = `${redirectBase}/api/spotify/callback`

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: SCOPES,
    show_dialog: 'true',
  })

  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${params}`)
}
