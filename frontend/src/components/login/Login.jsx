import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [toast, setToast] = useState({ msg: '', type: '' })
  const [loading, setLoading] = useState(false)

  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: '' }), 3500)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return showToast('Please fill all fields.', 'error')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) return showToast(data.message || 'Login failed.', 'error')
      
      // Save user to local storage for Dashboard and Profile pages
      localStorage.setItem('devnetwork_user', JSON.stringify(data.user))

      showToast('Login successful! 🎉', 'success')
      setTimeout(() => navigate('/dashboard'), 1000)
    } catch {
      showToast('Could not reach server. Is the backend running?', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: '#0a0a0a' }}>
      <div style={{
        position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '500px', height: '300px',
        background: 'radial-gradient(ellipse at center, rgba(250,204,21,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      <div style={{
        width: '100%', maxWidth: '440px', margin: '0 auto',
        background: 'linear-gradient(135deg, #111111 0%, #161616 100%)',
        border: '1px solid rgba(250,204,21,0.25)',
        borderRadius: '20px', padding: '44px 40px',
        boxShadow: '0 0 60px rgba(250,204,21,0.08), 0 8px 32px rgba(0,0,0,0.8)',
        position: 'relative', zIndex: 1
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '52px', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #FACC15, #F59E0B)',
            marginBottom: '16px', boxShadow: '0 0 24px rgba(250,204,21,0.4)'
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#0a0a0a"/>
            </svg>
          </div>
          <h1 style={{ color: '#ffffff', fontSize: '26px', fontWeight: '700', letterSpacing: '-0.5px', fontFamily: 'Inter, system-ui, sans-serif' }}>DevNetwork</h1>
          <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '6px', fontFamily: 'Inter, system-ui, sans-serif' }}>Sign in to your account</p>
        </div>

        {toast.msg && (
          <div style={{
            padding: '12px 16px', borderRadius: '10px', marginBottom: '20px',
            background: toast.type === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
            border: `1px solid ${toast.type === 'success' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
            color: toast.type === 'success' ? '#34d399' : '#f87171',
            fontSize: '14px', fontFamily: 'Inter, system-ui, sans-serif', textAlign: 'center'
          }}>{toast.msg}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '13px', fontWeight: '500', marginBottom: '8px', fontFamily: 'Inter, system-ui, sans-serif' }}>Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
              style={{ width: '100%', padding: '12px 16px', background: '#1a1a1a', border: '1px solid #2d2d2d', borderRadius: '10px', color: '#ffffff', fontSize: '15px', fontFamily: 'Inter, system-ui, sans-serif', outline: 'none' }}
              onFocus={e => { e.target.style.borderColor = '#FACC15'; e.target.style.boxShadow = '0 0 0 3px rgba(250,204,21,0.12)' }}
              onBlur={e => { e.target.style.borderColor = '#2d2d2d'; e.target.style.boxShadow = 'none' }}
            />
          </div>
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '13px', fontWeight: '500', marginBottom: '8px', fontFamily: 'Inter, system-ui, sans-serif' }}>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••"
              style={{ width: '100%', padding: '12px 16px', background: '#1a1a1a', border: '1px solid #2d2d2d', borderRadius: '10px', color: '#ffffff', fontSize: '15px', fontFamily: 'Inter, system-ui, sans-serif', outline: 'none' }}
              onFocus={e => { e.target.style.borderColor = '#FACC15'; e.target.style.boxShadow = '0 0 0 3px rgba(250,204,21,0.12)' }}
              onBlur={e => { e.target.style.borderColor = '#2d2d2d'; e.target.style.boxShadow = 'none' }}
            />
          </div>
          <button type="submit" disabled={loading}
            style={{
              width: '100%', padding: '13px',
              background: 'linear-gradient(135deg, #FACC15, #F59E0B)',
              color: '#0a0a0a', fontSize: '15px', fontWeight: '700',
              fontFamily: 'Inter, system-ui, sans-serif',
              border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 20px rgba(250,204,21,0.3)', letterSpacing: '0.3px'
            }}
            onMouseEnter={e => { if (!loading) e.target.style.opacity = '0.9' }}
            onMouseLeave={e => { e.target.style.opacity = '1' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ color: '#6b7280', fontSize: '14px', fontFamily: 'Inter, system-ui, sans-serif' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#FACC15', fontWeight: '600', textDecoration: 'none' }}>Create one →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
