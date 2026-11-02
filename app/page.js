'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [serverStatus, setServerStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setServerStatus(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to contact Node backend:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ maxWidth: '640px', margin: '4rem auto', padding: '0 1rem' }}>
      <div style={{ background: '#ffffff', borderRadius: '10px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h1 style={{ marginTop: 0 }}>📚 Student Reading Tracker</h1>
        <p style={{ color: '#4b5563' }}>Next.js full stack starter page.</p>

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f3f4f6', borderRadius: '6px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Backend Status (Node.js API Route):</h3>
          {loading ? (
            <p style={{ margin: 0, color: '#6b7280' }}>Connecting to backend...</p>
          ) : (
            <pre style={{ margin: 0, fontSize: '0.875rem' }}>
              {JSON.stringify(serverStatus, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </main>
  );
}