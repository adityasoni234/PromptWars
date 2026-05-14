import { useState } from 'react';
import { Calendar, Video, MapPin, Plus, CheckCircle, Clock, XCircle } from 'lucide-react';
import { PATIENT_APPOINTMENTS } from '../../data/mockData';

const statusColor = { confirmed: 'green', pending: 'orange', cancelled: 'red' };

export default function PatientAppointments() {
  const [showModal, setShowModal] = useState(false);
  const [appts, setAppts] = useState(PATIENT_APPOINTMENTS);

  return (
    <div className="page-wrapper animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>My Appointments</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Upcoming & past consultations</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={16} /> Book Appointment</button>
      </div>

      {/* Upcoming */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Upcoming</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {appts.map(a => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border)', transition: 'var(--transition)' }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: 'var(--grad-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#fff', flexShrink: 0 }}>{a.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{a.doctor}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{a.spec}</div>
                <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> {a.date}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {a.time}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {a.mode === 'Video' ? <Video size={12} /> : <MapPin size={12} />} {a.mode}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                <span className={`badge badge-${statusColor[a.status]}`}>{a.status}</span>
                {a.mode === 'Video' && a.status === 'confirmed' && (
                  <a href="https://meet.google.com/new" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}><Video size={12} /> Join Call</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="card" style={{ padding: 20, background: 'linear-gradient(135deg, rgba(0,168,255,0.07) 0%, rgba(0,229,255,0.04) 100%)', borderColor: 'rgba(0,168,255,0.15)' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ fontSize: 24 }}>💡</div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Before your appointment</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Prepare a list of your current symptoms, medications, and questions for Dr. Arjun. Check your internet connection 15 minutes before a video call.
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Book Appointment</div>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><XCircle size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group"><label className="form-label">Doctor / Specialization</label>
                <select className="form-input form-select">
                  <option>Dr. Arjun Sharma — Cardiologist</option>
                  <option>Dr. Preethi R. — Dermatologist</option>
                  <option>Dr. Suresh P. — General Physician</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group"><label className="form-label">Preferred Date</label><input className="form-input" type="date" defaultValue="2026-04-10" /></div>
                <div className="form-group"><label className="form-label">Preferred Time</label><input className="form-input" type="time" defaultValue="10:00" /></div>
              </div>
              <div className="form-group"><label className="form-label">Consultation Mode</label>
                <select className="form-input form-select"><option>In-person</option><option>Video</option></select>
              </div>
              <div className="form-group"><label className="form-label">Reason / Symptoms</label>
                <input className="form-input" placeholder="Brief description of your concern..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 4 }}>
                <button className="btn btn-ghost" onClick={() => setShowModal(false)} style={{ justifyContent: 'center' }}>Cancel</button>
                <button className="btn btn-success" onClick={() => setShowModal(false)} style={{ justifyContent: 'center' }}>Confirm Booking</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
