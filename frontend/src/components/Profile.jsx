import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('devnetwork_user');
    if (data) {
      const parsedUser = JSON.parse(data);
      setUser(parsedUser);
      setForm({
        ...parsedUser,
        skills: parsedUser.skills ? parsedUser.skills.join(', ') : '',
        projects: parsedUser.projects ? parsedUser.projects.join(', ') : ''
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(user.email)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('devnetwork_user', JSON.stringify(data.user));
        setUser(data.user);
        setIsEditing(false);
      } else {
        alert(data.message || 'Failed to update profile');
      }
    } catch {
      alert('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const inp = {
    width: '100%', padding: '10px 14px',
    background: '#0d0d0d', border: '1px solid #2a2a2a',
    borderRadius: '10px', color: '#fff', fontSize: '14px',
    fontFamily: "'Inter', system-ui, sans-serif", outline: 'none',
    transition: 'border-color 0.2s',
  };

  const SectionLabel = ({ children }) => (
    <p style={{ color: '#374151', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 12px 0' }}>{children}</p>
  );

  const LinkBtn = ({ url, label, icon, color }) => {
    if (!url) return null;
    return (
      <a href={url.startsWith('http') ? url : `https://${url}`} target="_blank" rel="noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '9px 16px', borderRadius: '10px',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          color: color || '#9ca3af', textDecoration: 'none', fontSize: '13px', fontWeight: '600',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(250,204,21,0.3)'; e.currentTarget.style.color = '#FACC15'; e.currentTarget.style.background = 'rgba(250,204,21,0.05)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = color || '#9ca3af'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
      >
        {icon} {label}
      </a>
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0a0a0a', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      <div style={{ flex: 1, marginLeft: '220px', paddingBottom: '80px', paddingTop: '48px', padding: '48px 40px 80px', position: 'relative' }}>
        {/* Glow */}
        <div style={{
          position: 'fixed', top: '0', left: 'calc(220px + 30%)', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(250,204,21,0.07) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 0
        }} />

        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1, animation: 'fadeIn 0.4s ease-out' }}>

          {/* ── Hero Card ── */}
          <div style={{
            background: 'linear-gradient(145deg, #111 0%, #141414 100%)',
            border: '1px solid rgba(250,204,21,0.15)', borderRadius: '24px',
            overflow: 'hidden', marginBottom: '20px',
            boxShadow: '0 4px 40px rgba(0,0,0,0.6)',
          }}>
            {/* Gold banner */}
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #FACC15 0%, #F59E0B 50%, transparent 100%)' }} />

            <div style={{ padding: '32px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
              {/* Avatar + Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {isEditing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                    {form.profilePhoto ? (
                      <img src={form.profilePhoto} alt="Preview" style={{ width: '72px', height: '72px', borderRadius: '18px', objectFit: 'cover', border: '2px dashed #FACC15' }} />
                    ) : (
                      <div style={{ width: '72px', height: '72px', borderRadius: '18px', background: 'linear-gradient(135deg,#FACC15,#F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a', fontSize: '28px', fontWeight: '800', border: '2px dashed #FACC15' }}>
                        {user.name?.charAt(0).toUpperCase() || '?'}
                      </div>
                    )}
                    <input type="text" name="profilePhoto" placeholder="Photo URL" value={form.profilePhoto || ''} onChange={handleChange}
                      style={{ ...inp, fontSize: '11px', padding: '5px 10px', width: '160px' }} />
                  </div>
                ) : (
                  user.profilePhoto ? (
                    <img src={user.profilePhoto} alt={user.name} style={{ width: '72px', height: '72px', borderRadius: '18px', objectFit: 'cover', border: '2px solid rgba(250,204,21,0.3)', boxShadow: '0 0 24px rgba(250,204,21,0.2)' }} />
                  ) : (
                    <div style={{ width: '72px', height: '72px', borderRadius: '18px', background: 'linear-gradient(135deg,#FACC15,#F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a', fontSize: '30px', fontWeight: '800', boxShadow: '0 0 24px rgba(250,204,21,0.2)' }}>
                      {user.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                  )
                )}
                <div>
                  {isEditing ? (
                    <input type="text" name="name" placeholder="Full Name" value={form.name || ''} onChange={handleChange}
                      style={{ ...inp, fontSize: '22px', fontWeight: '700', padding: '6px 12px', marginBottom: '6px', width: '220px' }} />
                  ) : (
                    <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '800', margin: '0 0 4px', letterSpacing: '-0.5px' }}>{user.name}</h1>
                  )}
                  <p style={{ color: '#4b5563', fontSize: '13px', margin: '0 0 10px' }}>@{user.username} · {user.email}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {user.teamName ? (
                      <span style={{ background: 'rgba(250,204,21,0.1)', color: '#FACC15', border: '1px solid rgba(250,204,21,0.25)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
                        👥 {user.teamName}
                      </span>
                    ) : (
                      <span style={{ background: 'rgba(255,255,255,0.04)', color: '#4b5563', border: '1px solid rgba(255,255,255,0.07)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                        No Team
                      </span>
                    )}
                    {user.city && <span style={{ background: 'rgba(255,255,255,0.04)', color: '#4b5563', border: '1px solid rgba(255,255,255,0.07)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px' }}>📍 {user.city}{user.state ? `, ${user.state}` : ''}</span>}
                  </div>
                </div>
              </div>

              {/* Edit / Save */}
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={loading}
                style={{
                  background: isEditing ? 'linear-gradient(135deg,#FACC15,#F59E0B)' : 'rgba(250,204,21,0.08)',
                  color: isEditing ? '#0a0a0a' : '#FACC15',
                  border: isEditing ? 'none' : '1px solid rgba(250,204,21,0.25)',
                  padding: '10px 22px', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '700', fontSize: '13px', transition: 'all 0.2s', opacity: loading ? 0.7 : 1,
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}
              >
                {loading ? 'Saving...' : isEditing ? '✓ Save Profile' : '✎ Edit Profile'}
              </button>
            </div>
          </div>

          {/* ── Details Grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>

            {/* Personal Details */}
            <div style={{ background: 'linear-gradient(145deg,#111,#141414)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '24px' }}>
              <SectionLabel>Personal Details</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: 'College', key: 'collegeName', type: 'text', placeholder: 'Your College' },
                  { label: 'Age', key: 'age', type: 'number', placeholder: 'Your Age' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <p style={{ color: '#374151', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{label}</p>
                    {isEditing ? (
                      <input type={type} name={key} value={form[key] || ''} onChange={handleChange} placeholder={placeholder}
                        style={inp}
                        onFocus={e => e.target.style.borderColor = 'rgba(250,204,21,0.4)'}
                        onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
                    ) : (
                      <p style={{ color: user[key] ? '#d1d5db' : '#2d2d2d', fontSize: '14px', margin: 0 }}>{user[key] || '—'}</p>
                    )}
                  </div>
                ))}
                <div>
                  <p style={{ color: '#374151', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>City / State</p>
                  {isEditing ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="text" name="city" value={form.city || ''} onChange={handleChange} placeholder="City" style={inp}
                        onFocus={e => e.target.style.borderColor = 'rgba(250,204,21,0.4)'}
                        onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
                      <input type="text" name="state" value={form.state || ''} onChange={handleChange} placeholder="State" style={inp}
                        onFocus={e => e.target.style.borderColor = 'rgba(250,204,21,0.4)'}
                        onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
                    </div>
                  ) : (
                    <p style={{ color: (user.city || user.state) ? '#d1d5db' : '#2d2d2d', fontSize: '14px', margin: 0 }}>
                      {[user.city, user.state].filter(Boolean).join(', ') || '—'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div style={{ background: 'linear-gradient(145deg,#111,#141414)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '24px' }}>
              <SectionLabel>Technical Skills</SectionLabel>
              {isEditing ? (
                <>
                  <textarea name="skills" value={form.skills || ''} onChange={handleChange}
                    placeholder="React, Node.js, Python, MongoDB..."
                    style={{ ...inp, minHeight: '100px', resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(250,204,21,0.4)'}
                    onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
                  <p style={{ color: '#374151', fontSize: '11px', marginTop: '6px' }}>Separate skills with commas</p>
                </>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                  {user.skills && user.skills.length > 0 ? user.skills.map((skill, i) => (
                    <span key={i} style={{ background: 'rgba(250,204,21,0.07)', color: '#FACC15', padding: '5px 12px', borderRadius: '7px', fontSize: '12px', fontWeight: '600', border: '1px solid rgba(250,204,21,0.15)' }}>
                      {skill}
                    </span>
                  )) : <span style={{ color: '#2d2d2d', fontSize: '14px' }}>No skills added yet</span>}
                </div>
              )}
            </div>
          </div>

          {/* ── Links & Projects ── */}
          <div style={{ background: 'linear-gradient(145deg,#111,#141414)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '28px' }}>
            <SectionLabel>Links & Profiles</SectionLabel>

            {isEditing ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {[
                  { label: 'GitHub', key: 'github', placeholder: 'https://github.com/you' },
                  { label: 'Twitter / X', key: 'twitter', placeholder: 'https://twitter.com/you' },
                  { label: 'LeetCode', key: 'leetcode', placeholder: 'https://leetcode.com/you' },
                  { label: 'YouTube', key: 'youtube', placeholder: 'https://youtube.com/@you' },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <p style={{ color: '#374151', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{label}</p>
                    <input type="text" name={key} value={form[key] || ''} onChange={handleChange} placeholder={placeholder}
                      style={inp}
                      onFocus={e => e.target.style.borderColor = 'rgba(250,204,21,0.4)'}
                      onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                <LinkBtn url={user.github}   label="GitHub"      icon="💻" color="#e5e7eb" />
                <LinkBtn url={user.twitter}  label="Twitter / X" icon="🐦" color="#1d9bf0" />
                <LinkBtn url={user.leetcode} label="LeetCode"    icon="⚡" color="#ffa116" />
                <LinkBtn url={user.youtube}  label="YouTube"     icon="▶️" color="#ff4444" />
                {!user.github && !user.twitter && !user.leetcode && !user.youtube && (
                  <span style={{ color: '#2d2d2d', fontSize: '14px' }}>No links added yet</span>
                )}
              </div>
            )}

            {/* Projects */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
              <SectionLabel>Projects</SectionLabel>
              {isEditing ? (
                <>
                  <textarea name="projects" value={form.projects || ''} onChange={handleChange}
                    placeholder="https://github.com/you/project1, https://project2.com"
                    style={{ ...inp, minHeight: '80px', resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(250,204,21,0.4)'}
                    onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
                  <p style={{ color: '#374151', fontSize: '11px', marginTop: '6px' }}>Separate project URLs with commas</p>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {user.projects && user.projects.some(p => p?.trim()) ? (
                    user.projects.filter(p => p?.trim()).map((proj, i) => (
                      <a key={i} href={proj.startsWith('http') ? proj : `https://${proj}`} target="_blank" rel="noreferrer"
                        style={{
                          color: '#60a5fa', textDecoration: 'none', fontSize: '13px',
                          display: 'flex', alignItems: 'center', gap: '8px',
                          background: 'rgba(96,165,250,0.04)', border: '1px solid rgba(96,165,250,0.1)',
                          padding: '10px 14px', borderRadius: '10px', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(96,165,250,0.08)'; e.currentTarget.style.borderColor = 'rgba(96,165,250,0.3)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(96,165,250,0.04)'; e.currentTarget.style.borderColor = 'rgba(96,165,250,0.1)'; }}
                      >
                        🔗 {proj}
                      </a>
                    ))
                  ) : (
                    <span style={{ color: '#2d2d2d', fontSize: '14px' }}>No projects added yet</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Cancel edit */}
          {isEditing && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'flex-end' }}>
              <button onClick={() => setIsEditing(false)}
                style={{ background: 'transparent', border: '1px solid #2d2d2d', color: '#6b7280', padding: '10px 22px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
                Cancel
              </button>
              <button onClick={handleSave} disabled={loading}
                style={{ background: 'linear-gradient(135deg,#FACC15,#F59E0B)', color: '#0a0a0a', border: 'none', padding: '10px 26px', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '700', fontSize: '13px', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Saving...' : '✓ Save Changes'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
