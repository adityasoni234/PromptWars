import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, LayoutDashboard, Users, Calendar, BarChart2, MessageSquare, LogOut, Bell, Stethoscope, Settings, X, UserCog, Menu } from 'lucide-react';
import { useState } from 'react';
import { NOTIFICATIONS } from '../../data/mockData';

const NAV = [
  { to: '/doctor', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/doctor/patients', label: 'Patients', icon: Users, badge: '124' },
  { to: '/doctor/appointments', label: 'Appointments', icon: Calendar, badge: '8', badgeClass: 'green' },
  { to: '/doctor/analytics', label: 'Analytics', icon: BarChart2 },
  { to: '/doctor/messages', label: 'Messages', icon: MessageSquare, badge: '3' },
  { to: '/doctor/staff', label: 'Staff Management', icon: UserCog },
];

export default function DoctorLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-layout">
      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={closeSidebar} />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon"><Heart size={17} color="#fff" fill="#fff" /></div>
          <div className="sidebar-logo-text">
            <h1>MediSync Pro</h1>
            <span>Doctor Portal</span>
          </div>
          <button onClick={closeSidebar} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: 4, borderRadius: 6 }}>
            <X size={16} />
          </button>
        </div>

        <div className="sidebar-nav">
          <div className="sidebar-section">Main Menu</div>
          {NAV.map(({ to, label, icon: Icon, badge, badgeClass, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} onClick={closeSidebar}>
              <Icon size={16} />
              {label}
              {badge && <span className={`nav-badge ${badgeClass || ''}`}>{badge}</span>}
            </NavLink>
          ))}
          <div className="sidebar-section" style={{ marginTop: 8 }}>Account</div>
          <div className="nav-item" onClick={() => {}}><Settings size={16} /> Settings</div>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar avatar-blue" style={{ width: 34, height: 34, fontSize: 12 }}>{user?.avatar || 'DR'}</div>
          <div className="user-info">
            <h4>{user?.name || 'Doctor'}</h4>
            <p>{user?.specialization || 'Physician'}</p>
          </div>
          <button onClick={() => { logout(); navigate('/login'); }} title="Logout" style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: 4, borderRadius: 6, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#94a3b8'; }}>
            <LogOut size={15} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
              <Menu size={18} />
            </button>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', flexShrink: 0 }}>
              <Stethoscope size={16} />
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0f172a' }}>Doctor Portal</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>Saturday, April 04, 2026</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button className="btn btn-ghost btn-icon" style={{ position: 'relative' }} onClick={() => setShowNotif(p => !p)}>
                <Bell size={17} />
                {unread > 0 && <span className="notif-dot" />}
              </button>
              {showNotif && (
                <div style={{ position: 'fixed', right: 10, top: 60, width: 'min(320px, calc(100vw - 20px))', background: '#fff', border: '1px solid #e4eaf5', borderRadius: 16, boxShadow: '0 8px 32px rgba(15,23,42,0.12)', zIndex: 300, overflow: 'hidden' }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid #e4eaf5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Notifications</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="badge badge-red">{unread} new</span>
                      <button onClick={() => setShowNotif(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}><X size={15} /></button>
                    </div>
                  </div>
                  {NOTIFICATIONS.map(n => (
                    <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 10, cursor: 'pointer', background: n.read ? '#fff' : '#fafbff', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f8faff'}
                      onMouseLeave={e => e.currentTarget.style.background = n.read ? '#fff' : '#fafbff'}>
                      <span style={{ fontSize: 18 }}>{n.type === 'urgent' ? '🚨' : n.type === 'appointment' ? '📅' : n.type === 'lab' ? '🧪' : '💬'}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: '#0f172a', lineHeight: 1.4 }}>{n.text}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>{n.time}</div>
                      </div>
                      {!n.read && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b82f6', marginLeft: 'auto', marginTop: 4, flexShrink: 0 }} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="user-avatar avatar-blue" style={{ width: 32, height: 32, fontSize: 12 }}>{user?.avatar || 'DR'}</div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
