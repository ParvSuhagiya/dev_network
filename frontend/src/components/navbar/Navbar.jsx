import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('devnetwork_user');
    if (data) setUser(JSON.parse(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('devnetwork_user');
    navigate('/login');
  };

  const navItems = [
    {
      label: 'Discover',
      path: '/dashboard',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
        </svg>
      )
    },
    {
      label: 'Teams',
      path: '/teams',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
        </svg>
      )
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
        </svg>
      )
    },
  ];

  const sidebarWidth = collapsed ? '70px' : '220px';

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 100,
      width: sidebarWidth, transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
      background: 'linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', system-ui, sans-serif",
      overflow: 'hidden',
    }}>

      {/* Logo */}
      <div style={{
        padding: collapsed ? '22px 16px' : '22px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        flexShrink: 0
      }}>
        <div onClick={() => navigate('/dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', minWidth: 0 }}>
          <div style={{
            flexShrink: 0, width: '34px', height: '34px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #FACC15 0%, #F59E0B 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(250,204,21,0.25)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#0a0a0a"/>
            </svg>
          </div>
          {!collapsed && (
            <span style={{ color: '#fff', fontSize: '16px', fontWeight: '800', letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>
              Dev<span style={{ color: '#FACC15' }}>Network</span>
            </span>
          )}
        </div>
        {!collapsed && (
          <button onClick={() => setCollapsed(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151', padding: '4px', borderRadius: '6px', flexShrink: 0, lineHeight: 1 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
            </svg>
          </button>
        )}
        {collapsed && (
          <button onClick={() => setCollapsed(false)}
            style={{ position: 'absolute', top: '24px', right: '-1px', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', color: '#6b7280', padding: '4px 3px', borderRadius: '0 6px 6px 0', zIndex: 101 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
            </svg>
          </button>
        )}
      </div>

      {/* User mini card */}
      {!collapsed && user && (
        <div style={{
          margin: '12px 12px 0',
          background: 'rgba(250,204,21,0.04)',
          border: '1px solid rgba(250,204,21,0.08)',
          borderRadius: '12px', padding: '10px 12px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          {user.profilePhoto ? (
            <img src={user.profilePhoto} alt={user.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          ) : (
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#FACC15,#F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a', fontSize: '13px', fontWeight: '800', flexShrink: 0 }}>
              {user.name?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <p style={{ color: '#e5e7eb', fontSize: '12px', fontWeight: '700', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</p>
            <p style={{ color: '#4b5563', fontSize: '10px', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.teamName ? `👥 ${user.teamName}` : 'No Team'}</p>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {!collapsed && (
          <p style={{ color: '#374151', fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', padding: '8px 8px 4px' }}>Navigation</p>
        )}
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              title={collapsed ? item.label : ''}
              style={{
                display: 'flex', alignItems: 'center',
                gap: collapsed ? '0' : '10px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '11px' : '10px 12px',
                background: isActive ? 'rgba(250,204,21,0.1)' : 'transparent',
                border: isActive ? '1px solid rgba(250,204,21,0.2)' : '1px solid transparent',
                borderRadius: '10px',
                color: isActive ? '#FACC15' : '#6b7280',
                fontSize: '13px', fontWeight: '600',
                cursor: 'pointer', transition: 'all 0.15s', width: '100%',
                textAlign: 'left', whiteSpace: 'nowrap',
                position: 'relative',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#e5e7eb'; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7280'; } }}
            >
              {isActive && <div style={{ position: 'absolute', left: 0, top: '25%', height: '50%', width: '3px', background: '#FACC15', borderRadius: '0 3px 3px 0' }} />}
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom: Logout */}
      <div style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
        <button
          onClick={handleLogout}
          title={collapsed ? 'Log Out' : ''}
          style={{
            display: 'flex', alignItems: 'center',
            gap: collapsed ? '0' : '10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '11px' : '10px 12px',
            background: 'transparent',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '10px',
            color: '#6b7280', fontSize: '13px', fontWeight: '600',
            cursor: 'pointer', transition: 'all 0.15s', width: '100%',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'; }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
          </svg>
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
