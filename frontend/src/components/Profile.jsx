import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('devnetwork_user');
    if (data) {
      setUser(JSON.parse(data));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null;

  const LinkButton = ({ url, label, icon }) => {
    if (!url) return null;
    return (
      <a href={url.startsWith('http') ? url : `https://${url}`} target="_blank" rel="noreferrer"
         style={{
           display: 'inline-flex', alignItems: 'center', gap: '8px',
           padding: '8px 16px', borderRadius: '8px',
           background: '#1a1a1a', border: '1px solid #2d2d2d',
           color: '#e5e7eb', textDecoration: 'none', fontSize: '14px',
           transition: 'all 0.2s'
         }}
         onMouseEnter={e => { e.target.style.borderColor = '#FACC15'; e.target.style.color = '#FACC15'; }}
         onMouseLeave={e => { e.target.style.borderColor = '#2d2d2d'; e.target.style.color = '#e5e7eb'; }}
      >
        {icon} {label}
      </a>
    );
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: '#0a0a0a', padding: '40px 16px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse at center, rgba(250,204,21,0.10) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      <div style={{
        width: '100%', maxWidth: '700px', margin: '0 auto',
        position: 'relative', zIndex: 1
      }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'transparent', border: 'none', color: '#9ca3af',
            display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
            fontSize: '15px', marginBottom: '24px', padding: 0
          }}
          onMouseEnter={e => e.target.style.color = '#FACC15'}
          onMouseLeave={e => e.target.style.color = '#9ca3af'}
        >
          ← Back to Dashboard
        </button>

        {/* Profile Card */}
        <div style={{
          background: 'linear-gradient(135deg, #111111 0%, #161616 100%)',
          border: '1px solid rgba(250,204,21,0.25)', borderRadius: '20px', padding: '40px',
          boxShadow: '0 0 60px rgba(250,204,21,0.07), 0 8px 32px rgba(0,0,0,0.8)',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', borderBottom: '1px solid #2d2d2d', paddingBottom: '32px', marginBottom: '32px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #FACC15, #F59E0B)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(250,204,21,0.3)',
              color: '#0a0a0a', fontSize: '32px', fontWeight: '800'
            }}>
              {user.name?.charAt(0).toUpperCase() || 'D'}
            </div>
            <div>
              <h1 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '700', margin: '0 0 4px 0' }}>{user.name}</h1>
              <p style={{ color: '#9ca3af', fontSize: '15px', margin: 0 }}>@{user.username} • {user.email}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Personal Details */}
            <div>
              <h2 style={{ color: '#FACC15', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Personal Details</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {user.collegeName && <div style={{ color: '#d1d5db', fontSize: '15px' }}><span style={{ color: '#6b7280', display: 'inline-block', width: '80px' }}>College:</span> {user.collegeName}</div>}
                {user.age && <div style={{ color: '#d1d5db', fontSize: '15px' }}><span style={{ color: '#6b7280', display: 'inline-block', width: '80px' }}>Age:</span> {user.age}</div>}
                {(user.city || user.state) && <div style={{ color: '#d1d5db', fontSize: '15px' }}><span style={{ color: '#6b7280', display: 'inline-block', width: '80px' }}>Location:</span> {[user.city, user.state].filter(Boolean).join(', ')}</div>}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 style={{ color: '#FACC15', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Technical Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {user.skills && user.skills.length > 0 ? user.skills.map((skill, i) => (
                  <span key={i} style={{
                    background: 'rgba(250,204,21,0.1)', color: '#FACC15',
                    padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '500',
                    border: '1px solid rgba(250,204,21,0.2)'
                  }}>
                    {skill}
                  </span>
                )) : <span style={{ color: '#6b7280', fontSize: '14px' }}>No skills added</span>}
              </div>
            </div>
          </div>

          {/* Links & Projects */}
          <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #2d2d2d' }}>
            <h2 style={{ color: '#FACC15', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Links & Profiles</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <LinkButton url={user.github} label="GitHub" icon="💻" />
              <LinkButton url={user.twitter} label="Twitter / X" icon="🐦" />
              <LinkButton url={user.leetcode} label="LeetCode" icon="⚡" />
              <LinkButton url={user.youtube} label="YouTube" icon="▶️" />
            </div>

            {user.projects && user.projects.length > 0 && user.projects.some(p => p.trim() !== "") && (
              <div style={{ marginTop: '24px' }}>
                <h3 style={{ color: '#d1d5db', fontSize: '14px', marginBottom: '12px' }}>Projects:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {user.projects.filter(p => p.trim()).map((proj, i) => (
                    <a key={i} href={proj.startsWith('http') ? proj : `https://${proj}`} target="_blank" rel="noreferrer"
                       style={{ color: '#60a5fa', textDecoration: 'none', fontSize: '14px' }}>
                      🔗 {proj}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
