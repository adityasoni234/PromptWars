import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, Droplet, Thermometer, Wind, Zap, TrendingDown, Calendar, Pill, AlertOctagon, ChevronRight, CheckCircle, RefreshCw, Info, Lightbulb } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PATIENT_VITALS, PATIENT_APPOINTMENTS, PATIENT_MEDICATIONS, PATIENT_HEALTH_TREND } from '../../data/mockData';
import { useState, useEffect } from 'react';

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid #e4eaf5', borderRadius: 10, padding: '10px 14px', boxShadow: '0 4px 16px rgba(15,23,42,0.08)' }}>
      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>{label}</div>
      {payload.map(p => <div key={p.name} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>{p.name}: {p.value}</div>)}
    </div>
  );
};

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const nextAppt = PATIENT_APPOINTMENTS[0];

  const [meds, setMeds] = useState(PATIENT_MEDICATIONS);
  const [vitals, setVitals] = useState(PATIENT_VITALS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [insight, setInsight] = useState("Your health looks great today! Keep up the good work.");

  const takenCount = meds.filter(m => m.taken).length;

  const toggleMed = (id) => {
    setMeds(prev => prev.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  const syncVitals = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const hrDiff = Math.floor(Math.random() * 5) - 2;
      const glDiff = Math.floor(Math.random() * 6) - 3;
      
      const newHr = vitals.heartRate + hrDiff;
      const newGl = vitals.glucose + glDiff;
      
      setVitals(prev => ({
        ...prev,
        heartRate: newHr,
        glucose: newGl,
        oxygen: Math.min(100, prev.oxygen + Math.floor(Math.random() * 2) - 1),
      }));
      
      // Update insight dynamically
      if (newHr > 80) setInsight("Your heart rate is slightly elevated today. Remember to take deep breaths.");
      else if (newGl < 90) setInsight("Blood glucose slightly low. Make sure to have a light snack.");
      else setInsight("Your vitals are perfectly synced and stable. Great job staying healthy!");

      setIsSyncing(false);
    }, 1500);
  };

  const vitalsData = [
    { label: 'Heart Rate', value: vitals.heartRate, unit: 'bpm', icon: <Heart size={22} color="#ef4444" />, color: '#ef4444', bg: '#fef2f2', status: 'normal' },
    { label: 'Blood Pressure', value: vitals.bloodPressure, unit: 'mmHg', icon: <Activity size={22} color="#3b82f6" />, color: '#3b82f6', bg: '#eff6ff', status: 'normal' },
    { label: 'Temperature', value: vitals.temperature, unit: '°F', icon: <Thermometer size={22} color="#f59e0b" />, color: '#f59e0b', bg: '#fffbeb', status: 'normal' },
    { label: 'SpO2', value: `${vitals.oxygen}%`, unit: '', icon: <Wind size={22} color="#06b6d4" />, color: '#06b6d4', bg: '#ecfeff', status: 'normal' },
    { label: 'Blood Glucose', value: vitals.glucose, unit: 'mg/dL', icon: <Droplet size={22} color="#8b5cf6" />, color: '#8b5cf6', bg: '#f5f3ff', status: 'normal' },
    { label: 'Weight', value: vitals.weight, unit: 'kg', icon: <Zap size={22} color="#10b981" />, color: '#10b981', bg: '#ecfdf5', status: 'normal' },
  ];

  return (
    <div className="page-wrapper animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 26, fontWeight: 800, color: '#0f172a' }}>
            Hello, <span style={{ background: 'linear-gradient(135deg,#10b981,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user?.name?.split(' ')[0] || 'there'}</span> 👋
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>Welcome back to your health companion.</p>
        </div>
        <button onClick={() => navigate('/patient/symptoms')} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 12 }}>
          <Lightbulb size={16} /> Check Symptoms
        </button>
      </div>

      {/* Dynamic Health Insight Banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.06))', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, boxShadow: '0 2px 8px rgba(15,23,42,0.03)' }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(15,23,42,0.05)', flexShrink: 0 }}>
          <Info size={18} color="#8b5cf6" />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Daily AI Insight</div>
          <div style={{ fontSize: 14, color: '#0f172a', fontWeight: 500 }}>{insight}</div>
        </div>
      </div>

      {/* Next Appointment Banner */}
      {nextAppt && (
        <div onClick={() => navigate('/patient/appointments')} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: 'linear-gradient(135deg,#eff6ff,#f0fdf4)', border: '1px solid #dbeafe', borderRadius: 14, marginBottom: 22, cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,130,246,0.1)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(15,23,42,0.06)' }}><Calendar size={20} color="#3b82f6" /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#3b82f6', marginBottom: 3 }}>Next Appointment</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{nextAppt.doctor} · {nextAppt.spec}</div>
            <div style={{ fontSize: 13, color: '#475569', marginTop: 2 }}>{nextAppt.date} at {nextAppt.time} · {nextAppt.mode}</div>
          </div>
          <ChevronRight size={18} color="#3b82f6" />
        </div>
      )}

      {/* Vitals Grid */}
      <div style={{ marginBottom: 22 }}>
        <div className="section-title" style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Today's Vitals</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-green"><CheckCircle size={10} /> Checked Today</span>
            <button onClick={syncVitals} disabled={isSyncing} className="btn badge badge-blue" style={{ cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <RefreshCw size={10} className={isSyncing ? "animate-spin" : ""} /> {isSyncing ? 'Syncing...' : 'Sync Wearable'}
            </button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {vitalsData.map(v => (
            <div key={v.label} style={{ background: '#fff', border: '1px solid #e4eaf5', borderRadius: 14, padding: 18, boxShadow: '0 1px 3px rgba(15,23,42,0.05)', transition: 'all 0.2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,23,42,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(15,23,42,0.05)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ display: 'flex' }}>{v.icon}</div>
                <div className={`vital-status ${v.status}`} />
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>{v.label}</div>
              <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: v.color, transition: 'all 0.3s ease' }}>
                {v.value}<span style={{ fontSize: 12, fontWeight: 400, color: '#94a3b8', marginLeft: 3 }}>{v.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts + Meds */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        {/* Health Trend */}
        <div className="card" style={{ padding: 24 }}>
          <div className="section-title" style={{ marginBottom: 16 }}>
            <h3>Health Trend (7 Days)</h3>
            <span style={{ fontSize: 12, color: '#10b981', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}><TrendingDown size={13} /> Improving</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={PATIENT_HEALTH_TREND} margin={{ left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="pBP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="pGlu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4eaf5" />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip content={<ChartTip />} />
              <Area type="monotone" dataKey="bp" stroke="#3b82f6" fill="url(#pBP)" strokeWidth={2} name="BP (sys)" dot={{fill: '#3b82f6', r: 3}} activeDot={{r: 6}} />
              <Area type="monotone" dataKey="glucose" stroke="#8b5cf6" fill="url(#pGlu)" strokeWidth={2} name="Glucose" dot={{fill: '#8b5cf6', r: 3}} activeDot={{r: 6}} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Today's Meds */}
        <div className="card" style={{ padding: 24 }}>
          <div className="section-title" style={{ marginBottom: 10 }}>
            <h3>Today's Medications</h3>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>{takenCount}/{meds.length} taken</span>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>
              <span>Progress</span><span>{Math.round(takenCount / meds.length * 100)}%</span>
            </div>
            <div className="progress-bar"><div className="progress-fill green" style={{ width: `${takenCount / meds.length * 100}%`, transition: 'width 0.3s ease' }} /></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {meds.map(m => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: '1px solid', borderColor: m.taken ? 'rgba(16,185,129,0.3)' : 'transparent', borderRadius: 12, background: m.taken ? 'rgba(16,185,129,0.05)' : '#f8faff', transition: 'all 0.2s', cursor: 'pointer' }} onClick={() => toggleMed(m.id)}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: m.taken ? '#10b981' : '#fff', boxShadow: '0 2px 4px rgba(15,23,42,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}><Pill size={16} color={m.taken ? "#fff" : "#94a3b8"} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', textDecoration: m.taken ? 'line-through' : 'none', opacity: m.taken ? 0.6 : 1 }}>{m.name} <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 400, textDecoration: 'none' }}>{m.dose}</span></div>
                  <div style={{ fontSize: 11, color: '#94a3b8', opacity: m.taken ? 0.6 : 1 }}>{m.time}</div>
                </div>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: m.taken ? '#10b981' : '#e4eaf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
                  {m.taken && <CheckCircle size={14} color="#fff" />}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
            <div onClick={() => navigate('/patient/medications')} style={{ background: '#ecfdf5', border: '1px solid #d1fae5', borderRadius: 10, padding: '11px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}><Pill size={18} color="#10b981" /></div>
              <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>Medications</div>
            </div>
            <div onClick={() => navigate('/patient/sos')} style={{ background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: 10, padding: '11px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}><AlertOctagon size={18} color="#ef4444" /></div>
              <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 600 }}>Emergency</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
