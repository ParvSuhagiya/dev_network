import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem('devnetwork_user');
    if (data) {
      setUser(JSON.parse(data));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '350px',
        background: 'radial-gradient(ellipse at center, rgba(250,204,21,0.10) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Logo */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '64px', height: '64px', borderRadius: '18px',
          background: 'linear-gradient(135deg, #FACC15, #F59E0B)',
          marginBottom: '24px', boxShadow: '0 0 32px rgba(250,204,21,0.4)'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#0a0a0a"/>
          </svg>
        </div>

        <h1 style={{ color: '#ffffff', fontSize: '36px', fontWeight: '800', letterSpacing: '-1px', marginBottom: '12px' }}>
          Welcome, <span style={{ color: '#FACC15' }}>{user.name}</span>!
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '48px' }}>
          You're logged in. Your dashboard is ready.
        </p>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
          {[
            { label: 'Connections', value: '—' },
            { label: 'Projects', value: '—' },
            { label: 'Skills', value: '—' },
          ].map(({ label, value }) => (
            <div key={label} style={{
              padding: '24px 36px',
              background: 'linear-gradient(135deg, #111 0%, #161616 100%)',
              border: '1px solid rgba(250,204,21,0.2)',
              borderRadius: '16px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
              minWidth: '140px'
            }}>
              <p style={{ color: '#FACC15', fontSize: '30px', fontWeight: '800' }}>{value}</p>
              <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '4px' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Actions Row */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/profile')}
            style={{
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #FACC15, #F59E0B)',
              color: '#0a0a0a', fontSize: '14px', fontWeight: '700',
              border: 'none', borderRadius: '10px', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(250,204,21,0.25)'
            }}
            onMouseEnter={e => e.target.style.opacity = '0.9'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            View Profile →
          </button>
          
          <button
            onClick={() => {
              localStorage.removeItem('devnetwork_user');
              navigate('/login');
            }}
            style={{
              padding: '12px 32px', background: 'transparent',
              color: '#FACC15', fontSize: '14px', fontWeight: '600',
              border: '1px solid rgba(250,204,21,0.4)', borderRadius: '10px', cursor: 'pointer'
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(250,204,21,0.08)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >
            ← Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
