import { useState } from 'react';
import { PATIENT_MEDICATIONS } from '../../data/mockData';
import { CheckCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react';

export default function PatientMedications() {
  const [meds, setMeds] = useState(PATIENT_MEDICATIONS);

  const toggleTaken = (id) => setMeds(prev => prev.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  const taken = meds.filter(m => m.taken).length;

  return (
    <div className="page-wrapper animate-fadeIn">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Medications</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Track your daily medication schedule</p>
      </div>

      {/* Progress Banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.08) 0%, rgba(29,233,182,0.05) 100%)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 40, fontWeight: 900, color: 'var(--accent-green)' }}>{taken}/{meds.length}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>taken today</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
            <span>Daily Progress</span><span>{Math.round((taken / meds.length) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(taken / meds.length) * 100}%`, background: 'var(--grad-green)' }} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>
            {taken === meds.length ? '🎉 All medications taken for today!' : `${meds.length - taken} medication${meds.length - taken > 1 ? 's' : ''} remaining`}
          </div>
        </div>
      </div>

      {/* Medication Cards */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Today's Schedule</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {meds.map(m => (
            <div key={m.id} style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px',
              borderRadius: 'var(--radius-md)', transition: 'var(--transition)',
              background: m.taken ? 'var(--accent-green-dim)' : 'var(--bg-secondary)',
              border: `1px solid ${m.taken ? 'rgba(0,230,118,0.2)' : 'var(--border)'}`,
            }}>
              <div style={{ fontSize: 28, lineHeight: 1 }}>{m.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{m.name}</span>
                  <span className="badge badge-blue">{m.dose}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 }}>{m.purpose}</span>
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> {m.time}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>📅 Refill due: {m.refillDue}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>🔁 {m.frequency}</span>
                </div>
              </div>
              <button onClick={() => toggleTaken(m.id)} className={`med-check ${m.taken ? 'taken' : ''}`}
                style={{ width: 36, height: 36, borderRadius: '50%', border: `2px solid ${m.taken ? 'var(--accent-green)' : 'var(--border-light)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: m.taken ? 'var(--accent-green)' : 'transparent', transition: 'var(--transition)' }}>
                {m.taken ? <CheckCircle size={18} color="#000" /> : <CheckCircle size={18} color="var(--text-muted)" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Refill Alerts */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <AlertCircle size={16} color="var(--accent-orange)" />
          <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700 }}>Refill Reminders</h3>
        </div>
        {meds.filter(m => {
          const days = Math.floor((new Date(m.refillDue) - new Date()) / (1000 * 60 * 60 * 24));
          return days <= 14;
        }).map(m => {
          const days = Math.floor((new Date(m.refillDue) - new Date()) / (1000 * 60 * 60 * 24));
          return (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 20 }}>{m.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{m.name} {m.dose}</div>
                <div style={{ fontSize: 11, color: days <= 7 ? 'var(--accent-red)' : 'var(--accent-orange)' }}>
                  Refill due in {days} day{days !== 1 ? 's' : ''} ({m.refillDue})
                </div>
              </div>
              <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <RefreshCw size={12} /> Refill
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
