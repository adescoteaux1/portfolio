import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const error = req.nextUrl.searchParams.get('error')

  if (error || !code) {
    return new NextResponse(`Spotify auth error: ${error ?? 'no code returned'}`, { status: 400 })
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return new NextResponse('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET', { status: 500 })
  }

  const redirectBase = process.env.SPOTIFY_REDIRECT_BASE ?? 'http://127.0.0.1:3000'
  const redirectUri = `${redirectBase}/api/spotify/callback`

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
    cache: 'no-store',
  })

  const data = await tokenRes.json()

  if (!data.refresh_token) {
    return new NextResponse(`Token exchange failed: ${JSON.stringify(data)}`, { status: 500 })
  }

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Spotify Setup</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 600px; margin: 80px auto; padding: 0 20px; background: #f0f8f3; color: #1a2b1e; }
    h1 { color: #2d7a4f; }
    .token-box { background: #fff; border: 2px solid #2d7a4f; border-radius: 8px; padding: 20px; margin: 20px 0; word-break: break-all; font-family: monospace; font-size: 14px; }
    .step { background: #e8f4ec; border-radius: 6px; padding: 16px; margin: 12px 0; }
    code { background: #d4ecdf; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
    button { background: #2d7a4f; color: white; border: none; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-size: 14px; }
    button:hover { background: #235f3e; }
  </style>
</head>
<body>
  <h1>✅ Spotify Connected!</h1>
  <p>Copy the refresh token below and add it to your <code>.env.local</code>.</p>

  <div class="token-box" id="token">${data.refresh_token}</div>
  <button onclick="navigator.clipboard.writeText('${data.refresh_token}').then(() => this.textContent = 'Copied!')">
    Copy Token
  </button>

  <div class="step" style="margin-top:32px">
    <strong>Add to .env.local:</strong><br><br>
    <code>SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</code>
  </div>

  <div class="step">
    <strong>Then restart your dev server:</strong><br><br>
    <code>npm run dev</code>
  </div>

  <p style="color:#666; margin-top:24px; font-size:13px">
    Keep this token private — it gives read access to your Spotify listening history.
  </p>
</body>
</html>`

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
