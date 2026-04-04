import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, AlertTriangle, TrendingUp, Clock, CheckCircle, ChevronRight, Video, MapPin, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DOCTOR_PATIENTS, APPOINTMENTS, DOCTOR_VITALS_CHART, DOCTOR_STATS } from '../../data/mockData';

const statusColor = { stable: 'green', monitoring: 'amber', critical: 'red' };

function AnimatedCount({ end, duration = 1200 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const n = parseInt(end); if (isNaN(n)) return;
    let start = 0; const step = Math.ceil(n / 40);
    const t = setInterval(() => { start = Math.min(start + step, n); setVal(start); if (start >= n) clearInterval(t); }, duration / 40);
    return () => clearInterval(t);
  }, [end]);
  return <span>{val}</span>;
}

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid #e4eaf5', borderRadius: 10, padding: '10px 14px', boxShadow: '0 4px 16px rgba(15,23,42,0.08)' }}>
      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.map(p => <div key={p.name} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>{p.name}: {p.value}</div>)}
    </div>
  );
};

export default function DoctorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const todayAppts = APPOINTMENTS.filter(a => a.date === '2026-04-04');

  return (
    <div className="page-wrapper animate-fadeIn">
      {/* Greeting */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 26, fontWeight: 800, color: '#0f172a' }}>
          Good morning, <span style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user?.name?.split(' ').slice(1).join(' ') || 'Doctor'}</span> 👋
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>Here's what's happening with your patients today, April 04, 2026.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {[
          { icon: <Users size={18} />, label: 'Total Patients', value: DOCTOR_STATS.totalPatients, change: '↑ 8% vs last week', changeType: 'up', color: 'blue' },
          { icon: <Calendar size={18} />, label: "Today's Appointments", value: DOCTOR_STATS.todayAppointments, sub: 'Next in 15 min', color: 'green' },
          { icon: <AlertTriangle size={18} />, label: 'Critical Cases', value: DOCTOR_STATS.criticalCases, change: '↓ 1 vs yesterday', changeType: 'down', color: 'red' },
          { icon: <TrendingUp size={18} />, label: 'Satisfaction Rate', value: `${DOCTOR_STATS.satisfactionRate}%`, sub: 'From 97 reviews', color: 'purple' },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{typeof s.value === 'string' ? s.value : <AnimatedCount end={s.value} />}</div>
            {s.change && <div className={`stat-change ${s.changeType}`}>{s.change}</div>}
            {s.sub && <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Vitals Chart */}
        <div className="card" style={{ padding: 24 }}>
          <div className="section-title" style={{ marginBottom: 20 }}>
            <h3>Patient Vitals Trend</h3>
            <span className="badge badge-blue">Priya Mehta · 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={DOCTOR_VITALS_CHART} margin={{ left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="gSys" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gDia" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4eaf5" />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[60, 150]} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="sys" stroke="#3b82f6" fill="url(#gSys)" strokeWidth={2.5} name="Systolic" dot={false} />
              <Area type="monotone" dataKey="dia" stroke="#10b981" fill="url(#gDia)" strokeWidth={2.5} name="Diastolic" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
            {[{ c: '#3b82f6', l: 'Systolic' }, { c: '#10b981', l: 'Diastolic' }].map(i => (
              <div key={i.l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#94a3b8' }}>
                <div style={{ width: 12, height: 3, borderRadius: 2, background: i.c }} />{i.l}
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="card" style={{ padding: 24 }}>
          <div className="section-title" style={{ marginBottom: 14 }}>
            <h3>Today's Schedule</h3>
            <span onClick={() => navigate('/doctor/appointments')} className="link" style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer' }}>View all</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', maxHeight: 270 }}>
            {todayAppts.map(a => (
              <div key={a.id} onClick={() => navigate('/doctor/appointments')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, background: a.status === 'urgent' ? '#fef2f2' : '#f8faff', border: `1px solid ${a.status === 'urgent' ? '#fee2e2' : '#e4eaf5'}`, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(15,23,42,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <div style={{ textAlign: 'center', minWidth: 46 }}>
                  <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, fontWeight: 800, color: a.status === 'urgent' ? '#ef4444' : '#3b82f6' }}>{a.time}</div>
                  <div style={{ fontSize: 9.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>{a.duration}m</div>
                </div>
                <div style={{ width: 1, height: 32, background: '#e4eaf5' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.patientName}</div>
                  <div style={{ fontSize: 11.5, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    {a.mode === 'Video' ? <Video size={11} /> : <MapPin size={11} />} {a.type}
                  </div>
                </div>
                <span className={`badge badge-${a.status === 'urgent' ? 'red' : a.status === 'confirmed' ? 'green' : 'amber'}`} style={{ fontSize: 10 }}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Patient List */}
        <div className="card" style={{ padding: 24 }}>
          <div className="section-title" style={{ marginBottom: 14 }}>
            <h3>Recent Patients</h3>
            <span onClick={() => navigate('/doctor/patients')} style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer' }}>See all →</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {DOCTOR_PATIENTS.slice(0, 5).map((p, i) => (
              <div key={p.id} onClick={() => navigate('/doctor/patients')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i < 4 ? '1px solid #f1f5f9' : 'none', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'}
                onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}>
                <div className="avatar avatar-sm avatar-blue">{p.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0f172a' }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{p.condition} · {p.age} yrs</div>
                </div>
                <span className={`badge badge-${statusColor[p.status]}`}>{p.status}</span>
                <ChevronRight size={13} color="#94a3b8" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats + Critical */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Quick Overview</h3>
            {[
              { label: 'Avg Consultation Time', value: `${DOCTOR_STATS.avgConsultTime} min`, icon: <Clock size={13} />, color: '#3b82f6' },
              { label: 'Pending Lab Reports', value: DOCTOR_STATS.pendingReports, icon: <Activity size={13} />, color: '#f59e0b' },
              { label: 'Patients Seen Today', value: '3 / 8', icon: <CheckCircle size={13} />, color: '#10b981' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: s.color, display: 'flex' }}>{s.icon}</span>
                <span style={{ flex: 1, fontSize: 13, color: '#475569' }}>{s.label}</span>
                <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ display: 'flex' }}><AlertTriangle size={18} color="#ef4444" /></span>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, fontWeight: 700 }}>Needs Attention</h3>
              <span className="badge badge-red" style={{ marginLeft: 'auto' }}>Urgent</span>
            </div>
            {DOCTOR_PATIENTS.filter(p => p.status === 'critical' || p.risk === 'high').map(p => (
              <div key={p.id} onClick={() => navigate('/doctor/patients')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fef2f2', borderRadius: 10, border: '1px solid #fee2e2', marginBottom: 8, cursor: 'pointer' }}>
                <div className="avatar avatar-sm" style={{ background: '#ef4444' }}>{p.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{p.name}</div>
                  <div style={{ fontSize: 11.5, color: '#ef4444' }}>{p.condition}</div>
                </div>
                <div className="vital-status critical" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
