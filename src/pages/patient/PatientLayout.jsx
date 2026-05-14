import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, LayoutDashboard, Calendar, Pill, Activity, AlertOctagon, LogOut, Bell, User, X, MessageSquare, FileText, Search } from 'lucide-react';
import { useState } from 'react';

const NAV = [
  { to: '/patient', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/patient/doctors', label: 'Find Doctors', icon: Search },
  { to: '/patient/appointments', label: 'Appointments', icon: Calendar, badge: '2', badgeClass: 'purple' },
  { to: '/patient/medications', label: 'Medications', icon: Pill },
  { to: '/patient/symptoms', label: 'Symptom Check', icon: Activity },
  { to: '/patient/chat', label: 'AI Health Chat', icon: MessageSquare },
  { to: '/patient/documents', label: 'My Documents', icon: FileText },
  { to: '/patient/sos', label: 'Emergency SOS', icon: AlertOctagon, isEmergency: true },
];

const PATIENT_NOTIFS = [
  { icon: '💊', text: 'Time to take Metformin 500mg', time: '5 min ago', read: false },
  { icon: '📅', text: 'Appointment with Dr. Arjun tomorrow at 10:30 AM', time: '1 hr ago', read: false },
  { icon: '🩺', text: 'Lab report is ready for review', time: '3 hr ago', read: true },
  { icon: '✅', text: 'Prescription renewed by Dr. Arjun Sharma', time: '5 hr ago', read: true },
];

export default function PatientLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const unread = PATIENT_NOTIFS.filter(n => !n.read).length;

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon" style={{ background: 'linear-gradient(135deg,#10b981,#06b6d4)' }}>
            <Heart size={17} color="#fff" fill="#fff" />
          </div>
          <div className="sidebar-logo-text">
            <h1 style={{ background: 'linear-gradient(135deg,#10b981,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MediSync Pro</h1>
            <span>Patient Portal</span>
          </div>
        </div>

        <div className="sidebar-nav">
          <div className="sidebar-section">My Health</div>
          {NAV.map(({ to, label, icon: Icon, end, isEmergency }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              style={({ isActive }) => isEmergency && !isActive ? { color: '#ef4444' } : {}}>
              <Icon size={16} />
              {label}
              {isEmergency && <span className="nav-badge urgent">!</span>}
            </NavLink>
          ))}
        </div>

        <div className="sidebar-user">
          <div className="user-avatar" style={{ width: 34, height: 34, fontSize: 12, background: 'linear-gradient(135deg,#10b981,#06b6d4)' }}>{user?.avatar || 'P'}</div>
          <div className="user-info">
            <h4>{user?.name || 'Patient'}</h4>
            <p>{user?.bloodGroup ? `Blood: ${user.bloodGroup}` : 'Patient'}</p>
          </div>
          <button onClick={() => { logout(); navigate('/login'); }} title="Logout"
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: 4, borderRadius: 6, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#94a3b8'; }}>
            <LogOut size={15} />
          </button>
        </div>
      </aside>

      <div className="main-content">
        <div className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <User size={16} />
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0f172a' }}>Patient Portal</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>Saturday, April 04, 2026</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <button className="btn btn-ghost btn-icon" style={{ position: 'relative' }} onClick={() => setShowNotif(p => !p)}>
                <Bell size={17} />
                {unread > 0 && <span className="notif-dot" />}
              </button>
              {showNotif && (
                <div style={{ position: 'absolute', right: 0, top: 48, width: 300, background: '#fff', border: '1px solid #e4eaf5', borderRadius: 16, boxShadow: '0 8px 32px rgba(15,23,42,0.12)', zIndex: 300, overflow: 'hidden' }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid #e4eaf5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Notifications</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="badge badge-green">{unread} new</span>
                      <button onClick={() => setShowNotif(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}><X size={15} /></button>
                    </div>
                  </div>
                  {PATIENT_NOTIFS.map((n, i) => (
                    <div key={i} style={{ padding: '11px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 10, cursor: 'pointer', background: n.read ? '#fff' : '#f0fdf4' }}>
                      <span style={{ fontSize: 17 }}>{n.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12.5, color: '#0f172a', lineHeight: 1.4 }}>{n.text}</div>
                        <div style={{ fontSize: 10.5, color: '#94a3b8', marginTop: 3 }}>{n.time}</div>
                      </div>
                      {!n.read && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', marginLeft: 'auto', marginTop: 4, flexShrink: 0 }} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="user-avatar" style={{ width: 32, height: 32, fontSize: 12, background: 'linear-gradient(135deg,#10b981,#06b6d4)' }}>{user?.avatar || 'P'}</div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
