import { useState } from 'react';
import { Search, Star, MapPin, Clock, Video, HeartPulse, Stethoscope, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { APPOINTMENTS, PATIENT_APPOINTMENTS } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

const SPECIALTIES = [
  { name: 'All', icon: Search },
  { name: 'Cardiologist', icon: HeartPulse },
  { name: 'General Physician', icon: Stethoscope },
  { name: 'Orthopedics', icon: MapPin },
  { name: 'Dermatologist', icon: Clock }
];

const DOCTORS = [
  { id: 1, name: 'Dr. Arjun Sharma', spec: 'Cardiologist', exp: '15 yrs', rating: 4.9, reviews: 124, location: 'City Hospital', fee: '₹1200', availability: 'Next available today, 4:00 PM', avatar: 'AS', col: 'var(--blue)' },
  { id: 2, name: 'Dr. Sameer Khan', spec: 'Cardiologist', exp: '20 yrs', rating: 5.0, reviews: 342, location: 'Heart Center', fee: '₹1500', availability: 'Tomorrow, 10:00 AM', avatar: 'SK', col: 'var(--blue)' },
  { id: 3, name: 'Dr. Neha Desai', spec: 'General Physician', exp: '8 yrs', rating: 4.7, reviews: 89, location: 'Family Practice', fee: '₹600', availability: 'Next available in 15 mins', avatar: 'ND', col: 'var(--purple)' },
  { id: 4, name: 'Dr. Rajiv Kohli', spec: 'Orthopedics', exp: '12 yrs', rating: 4.8, reviews: 156, location: 'Joint Care Clinic', fee: '₹1000', availability: 'Tomorrow, 2:30 PM', avatar: 'RK', col: 'var(--green)' },
  { id: 5, name: 'Dr. Preethi R.', spec: 'Dermatologist', exp: '9 yrs', rating: 4.6, reviews: 78, location: 'Skin Health Center', fee: '₹800', availability: 'Friday, 11:00 AM', avatar: 'PR', col: 'var(--amber)' },
];

export default function PatientDoctors() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  
  const [bookingDoc, setBookingDoc] = useState(null);
  const [formData, setFormData] = useState({ date: '2026-04-05', time: '10:00', priority: 'Routine', issue: '' });

  const filteredDoctors = DOCTORS.filter(d => 
    (selectedSpec === 'All' || d.spec === selectedSpec) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.spec.toLowerCase().includes(search.toLowerCase()))
  );

  const confirmBooking = () => {
    if (!formData.issue.trim()) {
      window.alert("Please provide a brief description of your issue before booking.");
      return;
    }

    const newId = Date.now();
    
    // Add to Doctor's schedule (Doctor Portal Sync)
    APPOINTMENTS.push({
      id: newId, patientId: 99, patientName: 'Current User (You)', avatar: 'CU', 
      type: 'Consultation', date: formData.date, time: formData.time, duration: 30, 
      status: formData.priority === 'Urgent' ? 'urgent' : 'pending', 
      notes: `${formData.priority.toUpperCase()}: ${formData.issue}`, mode: 'Video'
    });

    // Add to Patient's schedule (Patient Portal Sync)
    PATIENT_APPOINTMENTS.unshift({
      id: newId, doctor: bookingDoc.name, spec: bookingDoc.spec, 
      date: formData.date, time: formData.time, mode: 'Video', status: 'pending', avatar: bookingDoc.avatar
    });

    window.alert(`✅ Success!\n\nYour appointment with ${bookingDoc.name} is confirmed.\nYour medical records, recent vitals, and documents have been instantly securely synced to the doctor's dashboard!`);
    
    setBookingDoc(null);
    setFormData({ date: '2026-04-05', time: '10:00', priority: 'Routine', issue: '' });
    navigate('/patient/appointments');
  };

  return (
    <div className="page-wrapper animate-fadeIn">
      <style>{`
        .pd-doc-card { padding: 20px; display: flex; gap: 20px; align-items: center; flex-wrap: wrap; }
        .pd-doc-fee { text-align: center; border-left: 1px solid var(--border); padding-left: 20px; min-width: 120px; }
        @media (max-width: 640px) {
          .pd-doc-card { flex-direction: column; align-items: flex-start; gap: 14px; }
          .pd-doc-fee { border-left: none; border-top: 1px solid var(--border); padding-left: 0; padding-top: 14px; width: 100%; display: flex; align-items: center; justify-content: space-between; }
          .pd-doc-fee button { min-width: 120px; }
        }
      `}</style>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>Find & Book Doctors</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Find the perfect specialist and sync your records instantly.</p>
      </div>

      {/* Search & Specialties */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div className="search-bar" style={{ width: '100%', marginBottom: 16 }}>
          <Search size={16} />
          <input placeholder="Search doctors, conditions, or specialties..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
          {SPECIALTIES.map(s => {
            const isSelected = selectedSpec === s.name;
            const Icon = s.icon;
            return (
              <button key={s.name} onClick={() => setSelectedSpec(s.name)} style={{
                background: isSelected ? 'var(--blue)' : 'var(--bg-input)',
                color: isSelected ? '#fff' : 'var(--text-secondary)',
                border: `1px solid ${isSelected ? 'var(--blue)' : 'var(--border)'}`,
                padding: '10px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <Icon size={14} /> {s.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Doctors List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filteredDoctors.length === 0 && (
          <div className="empty-state">No doctors found for this criteria.</div>
        )}
        
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="card" style={{ padding: 20, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="avatar avatar-xl" style={{ background: doc.col, color: '#fff', fontSize: 24 }}>{doc.avatar}</div>
            
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{doc.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--amber-dim)', color: 'var(--amber-dark)', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>
                  <Star size={11} fill="currentColor" /> {doc.rating} ({doc.reviews})
                </div>
              </div>
              
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
                {doc.spec} • {doc.exp} experience
              </div>
              
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} /> {doc.location}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {doc.availability}</span>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border)', paddingLeft: 20, minWidth: 120 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Consultation Fee</div>
              <div style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 800, color: 'var(--blue)', margin: '4px 0 10px' }}>{doc.fee}</div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setBookingDoc(doc)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {bookingDoc && (
        <div className="modal-overlay" onClick={() => setBookingDoc(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 450 }}>
            <div className="modal-header">
              <div className="modal-title">Book Appointment</div>
            </div>
            <div style={{ padding: '0 20px 20px', maxHeight: '75vh', overflowY: 'auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div className="avatar avatar-xl" style={{ margin: '0 auto 12px', background: bookingDoc.col, color: '#fff' }}>{bookingDoc.avatar}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{bookingDoc.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{bookingDoc.spec}</div>
              </div>
              
              <div style={{ background: 'var(--blue-light)', border: '1px solid rgba(59,130,246,0.2)', padding: 14, borderRadius: 12, marginBottom: 16, display: 'flex', gap: 12 }}>
                 <CheckCircle size={20} color="var(--blue)" style={{ flexShrink: 0 }} />
                 <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                   Patient records, vitals, and scanned documents will securely sync to Dr. {bookingDoc.name.split(' ')[1]}'s portal.
                 </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                 <div className="form-group">
                   <label className="form-label">Date</label>
                   <input type="date" className="form-input" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                 </div>
                 <div className="form-group">
                   <label className="form-label">Time</label>
                   <input type="time" className="form-input" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                 </div>
              </div>

              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="form-label">Consultation Priority</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['Routine', 'Priority', 'Urgent'].map(p => (
                    <button 
                      key={p} 
                      onClick={() => setFormData({...formData, priority: p})}
                      style={{ 
                        flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                        background: formData.priority === p ? (p === 'Urgent' ? 'var(--red)' : p === 'Priority' ? 'var(--amber)' : 'var(--blue)') : 'var(--bg-input)',
                        color: formData.priority === p ? '#fff' : 'var(--text-secondary)',
                        border: `1px solid ${formData.priority === p ? 'transparent' : 'var(--border)'}`
                      }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 20 }}>
                <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  Brief issue description <span style={{ color: 'var(--red)' }}>*required</span>
                </label>
                <textarea 
                  className="form-input" 
                  placeholder="E.g. Experiencing mild chest tightess since yesterday morning..." 
                  rows={3} 
                  value={formData.issue} 
                  onChange={e => setFormData({...formData, issue: e.target.value})}
                  style={{ resize: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button className="btn btn-ghost" onClick={() => setBookingDoc(null)} style={{ justifyContent: 'center' }}>Cancel</button>
                <button className="btn btn-primary" onClick={confirmBooking} style={{ justifyContent: 'center' }}>Confirm Booking</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
