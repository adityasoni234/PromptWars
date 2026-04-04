import { useState } from 'react';
import { Calendar, Clock, Video, MapPin, Plus, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { APPOINTMENTS } from '../../data/mockData';

const statusIcon = { confirmed: <CheckCircle size={13} />, urgent: <AlertCircle size={13} />, pending: <Clock size={13} /> };
const statusCol = { confirmed: 'green', urgent: 'red', pending: 'orange' };
const DATES = ['2026-04-04', '2026-04-05', '2026-04-06', '2026-04-07', '2026-04-08'];
const DAY_LABELS = ['Today', 'Tomorrow', 'Thu', 'Fri', 'Sat'];

export default function DoctorAppointments() {
  const [selectedDate, setSelectedDate] = useState('2026-04-04');
  const [showModal, setShowModal] = useState(false);

  const appts = APPOINTMENTS.filter(a => a.date === selectedDate);

  return (
    <div className="page-wrapper animate-fadeIn">
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Appointments</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>{APPOINTMENTS.length} total scheduled</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={16} /> Schedule</button>
      </div>

      {/* Date Selector */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
        {DATES.map((d, i) => {
          const count = APPOINTMENTS.filter(a => a.date === d).length;
          const isSelected = selectedDate === d;
          return (
            <button key={d} onClick={() => setSelectedDate(d)} style={{
              padding: '14px 20px', borderRadius: 'var(--radius-md)', border: `1px solid ${isSelected ? 'var(--accent-blue)' : 'var(--border)'}`,
              background: isSelected ? 'var(--accent-blue-dim)' : 'var(--bg-card)', cursor: 'pointer', transition: 'var(--transition)',
              minWidth: 100, textAlign: 'center', flexShrink: 0
            }}>
              <div style={{ fontSize: 12, color: isSelected ? 'var(--accent-blue)' : 'var(--text-muted)', marginBottom: 4, fontWeight: 600 }}>{DAY_LABELS[i]}</div>
              <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: isSelected ? 'var(--accent-blue)' : 'var(--text-primary)' }}>{d.split('-')[2]}</div>
              {count > 0 && <div style={{ fontSize: 11, color: isSelected ? 'var(--accent-blue)' : 'var(--text-muted)', marginTop: 4 }}>{count} appts</div>}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Appointment List */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>
            {DAY_LABELS[DATES.indexOf(selectedDate)]}'s Schedule
            <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)', marginLeft: 8 }}>({appts.length} appointments)</span>
          </h3>
          {appts.length === 0 ? (
            <div className="empty-state"><Calendar size={32} /><p>No appointments for this day</p></div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {appts.map(a => (
                <div key={a.id} style={{
                  display: 'flex', gap: 16, padding: '18px 20px',
                  borderRadius: 'var(--radius-md)', border: `1px solid ${a.status === 'urgent' ? 'rgba(255,71,87,0.3)' : 'var(--border)'}`,
                  background: a.status === 'urgent' ? 'var(--accent-red-dim)' : 'var(--bg-secondary)',
                  transition: 'var(--transition)', cursor: 'pointer'
                }}>
                  <div style={{ textAlign: 'center', minWidth: 56 }}>
                    <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 20, fontWeight: 800, color: a.status === 'urgent' ? 'var(--accent-red)' : 'var(--accent-blue)' }}>{a.time}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{a.duration} min</div>
                  </div>
                  <div style={{ width: 1, background: 'var(--border)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <div className="avatar avatar-sm" style={{ background: 'var(--grad-purple)', color: '#fff', fontWeight: 700 }}>{a.avatar}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{a.patientName}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.type}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        {a.mode === 'Video' ? <Video size={12} /> : <MapPin size={12} />} {a.mode}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>📝 {a.notes}</span>
                    </div>
                  </div>
                  <span className={`badge badge-${statusCol[a.status]}`} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {statusIcon[a.status]} {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Weekly Summary</h3>
            {[
              { label: 'Total this week', value: APPOINTMENTS.length, color: 'var(--accent-blue)' },
              { label: 'Confirmed', value: APPOINTMENTS.filter(a => a.status === 'confirmed').length, color: 'var(--accent-green)' },
              { label: 'Urgent', value: APPOINTMENTS.filter(a => a.status === 'urgent').length, color: 'var(--accent-red)' },
              { label: 'Pending', value: APPOINTMENTS.filter(a => a.status === 'pending').length, color: 'var(--accent-orange)' },
              { label: 'Video Calls', value: APPOINTMENTS.filter(a => a.mode === 'Video').length, color: 'var(--accent-purple)' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.label}</span>
                <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 17, fontWeight: 700, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 20, background: 'var(--accent-blue-dim)', borderColor: 'rgba(0,168,255,0.2)' }}>
            <div style={{ fontSize: 13, color: 'var(--accent-blue)', fontWeight: 600, marginBottom: 8 }}>💡 AI Suggestion</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              You have 3 video appointments back-to-back from 9AM. Consider a 10-min break between each for better patient attention.
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Schedule Appointment</div>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><XCircle size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group"><label className="form-label">Patient Name</label><input className="form-input" placeholder="Search patient..." /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date" defaultValue="2026-04-05" /></div>
                <div className="form-group"><label className="form-label">Time</label><input className="form-input" type="time" defaultValue="09:00" /></div>
              </div>
              <div className="form-group"><label className="form-label">Type</label>
                <select className="form-input form-select"><option>Consultation</option><option>Follow-up</option><option>Routine Check</option><option>Lab Review</option></select>
              </div>
              <div className="form-group"><label className="form-label">Mode</label>
                <select className="form-input form-select"><option>In-person</option><option>Video</option></select>
              </div>
              <div className="form-group"><label className="form-label">Notes</label><input className="form-input" placeholder="Optional notes..." /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                <button className="btn btn-ghost" onClick={() => setShowModal(false)} style={{ justifyContent: 'center' }}>Cancel</button>
                <button className="btn btn-primary" onClick={() => setShowModal(false)} style={{ justifyContent: 'center' }}>Schedule</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
