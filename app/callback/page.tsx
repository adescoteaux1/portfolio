'use client';

import { useSearchParams } from 'next/navigation';

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>Success!</h1>
      <p>Copy this code:</p>
      <code style={{ 
        background: '#f0f0f0', 
        padding: '10px', 
        display: 'block',
        wordBreak: 'break-all'
      }}>
        {code}
      </code>
      <p style={{ marginTop: '20px' }}>
        Now run the curl command with this code to get your refresh token.
      </p>
    </div>
  );
}