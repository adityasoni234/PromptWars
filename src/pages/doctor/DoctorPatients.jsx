import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Search, Plus, ChevronRight, X, Phone, Droplet, User, Brain } from 'lucide-react';
import { DOCTOR_PATIENTS, PATIENT_SYMPTOM_LOGS } from '../../data/mockData';

const statusColor = { stable: 'green', monitoring: 'amber', critical: 'red' };
const riskColor = { low: 'green', medium: 'amber', high: 'red' };

export default function DoctorPatients() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [patientsList, setPatientsList] = useState(DOCTOR_PATIENTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: '', age: '', gender: 'Male', blood: '', phone: '', condition: '', risk: 'low', status: 'stable', weight: '', height: '', allergies: '' });


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "patients"));
        if (!querySnapshot.empty) {
          setPatientsList(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      } catch (e) {
        console.warn("Using mock patient data (Firebase empty/error)", e);
      }
    };
    fetchPatients();
  }, []);

  const handleAddPatient = async () => {
    if (!newDoc.name || !newDoc.age || !newDoc.condition) {
      return window.alert("Name, age, and condition are mandatory fields.");
    }

    const patientObj = {
      ...newDoc, 
      avatar: newDoc.name.substring(0, 2).toUpperCase(),
      allergies: newDoc.allergies ? newDoc.allergies.split(',').map(s=>s.trim()) : [],
      lastVisit: 'New Admission', 
      nextAppt: 'Pending Routing'
    };
    
    // Optistic UI Render
    setPatientsList([ { id: Date.now().toString(), ...patientObj }, ...patientsList ]);
    setShowAddModal(false);
    setNewDoc({ name: '', age: '', gender: 'Male', blood: '', phone: '', condition: '', risk: 'low', status: 'stable', weight: '', height: '', allergies: '' });
    window.alert(`Patient profile for ${patientObj.name} has been securely created!`);

    // Firebase Background Sync
    try {
       await addDoc(collection(db, "patients"), patientObj);
    } catch(e) {
       console.warn("Could not sync to Firebase:", e);
    }
  };

  const filtered = patientsList.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.condition.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="page-wrapper animate-fadeIn">
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>Patients</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>{patientsList.length} total patients under your care</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}><Plus size={16} /> Add Patient</button>
      </div>

      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: 280 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, color: 'var(--text-muted)' }} />
          <input 
            placeholder="Search patients..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: 10, border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-input)', fontSize: 13 }} 
          />
        </div>
        
        <div style={{ width: 1, height: 24, background: 'var(--border)' }} />

        <div style={{ display: 'flex', gap: 8 }}>
          {['all', 'stable', 'monitoring', 'critical'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ 
              padding: '8px 16px', fontSize: 13, fontWeight: 600, textTransform: 'capitalize', cursor: 'pointer', transition: 'all 0.2s',
              background: filter === f ? 'var(--blue)' : 'var(--bg-input)', 
              color: filter === f ? '#fff' : 'var(--text-secondary)', 
              border: `1px solid ${filter === f ? 'var(--blue)' : 'var(--border)'}`, 
              borderRadius: 20 
            }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>
        {/* Table */}
        <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-input)' }}>
                  {['Patient', 'Age/Gender', 'Condition', 'Risk', 'Status', 'Last Visit', ''].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} onClick={() => setSelected(selected?.id === p.id ? null : p)}
                    style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.15s', background: selected?.id === p.id ? 'var(--blue-light)' : 'transparent' }}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="avatar avatar-sm" style={{ background: 'var(--purple)', color: '#fff', fontWeight: 700 }}>{p.avatar}</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{p.age} · {p.gender}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text)' }}>{p.condition}</td>
                    <td style={{ padding: '14px 16px' }}><span className={`badge badge-${riskColor[p.risk]}`}>{p.risk}</span></td>
                    <td style={{ padding: '14px 16px' }}><span className={`badge badge-${statusColor[p.status]}`}>{p.status}</span></td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-muted)' }}>{p.lastVisit}</td>
                    <td style={{ padding: '14px 16px' }}><ChevronRight size={15} color="var(--text-muted)" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="empty-state"><User size={32} /><p>No patients found</p></div>}
          </div>
        </div>

        {/* Patient Detail Panel */}
        {selected && (
          <div className="card animate-slideIn" style={{ padding: 24, alignSelf: 'start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700 }}>Patient Details</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={16} /></button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div className="avatar avatar-xl" style={{ background: 'var(--purple)', color: '#fff', fontWeight: 700, margin: '0 auto 12px' }}>{selected.avatar}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{selected.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{selected.condition}</div>
              <div style={{ marginTop: 10 }}><span className={`badge badge-${statusColor[selected.status]}`}>{selected.status}</span></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { icon: <User size={13} />, label: 'Age / Gender', val: `${selected.age} / ${selected.gender}` },
                { icon: <Droplet size={13} />, label: 'Blood Group', val: selected.blood },
                { icon: <Phone size={13} />, label: 'Phone', val: selected.phone },
                { label: 'Weight / Height', val: `${selected.weight} / ${selected.height}` },
                { label: 'Next Appointment', val: selected.nextAppt },
                { label: 'Risk Level', val: <span className={`badge badge-${riskColor[selected.risk]}`}>{selected.risk}</span> },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>{r.icon}{r.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{r.val}</span>
                </div>
              ))}
            </div>
            {selected.allergies?.length > 0 && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Allergies</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {selected.allergies.map(a => <span key={a} className="badge badge-red">{a}</span>)}
                </div>
              </div>
            )}
            
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 6 }}><Brain size={12} color="var(--purple)" /> Synced AI Symptoms Triage</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {PATIENT_SYMPTOM_LOGS.filter(log => log.patientName === selected.name || log.patientId === selected.id || selected.name === 'Current User').length === 0 && (
                   <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>No recent AI triage reports found.</div>
                )}
                {PATIENT_SYMPTOM_LOGS.filter(log => log.patientName === selected.name || log.patientId === selected.id || selected.name === 'Current User').slice(0,3).map(log => (
                  <div key={log.id} style={{ background: 'var(--purple-light)', border: '1px solid rgba(139,92,246,0.2)', padding: 12, borderRadius: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--purple)' }}>{log.date} — {log.time}</span>
                      <span className={`badge badge-${log.severity?.toLowerCase() === 'high' ? 'red' : log.severity?.toLowerCase() === 'medium' ? 'amber' : 'green'}`} style={{ fontSize: 10 }}>{log.severity} Risk</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 6, fontWeight: 600 }}>{log.symptoms}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                       "{log.aiDiagnosis}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 24 }}>
              <button className="btn btn-primary" onClick={() => window.alert(`Appointment booking initiated for ${selected.name}`)} style={{ justifyContent: 'center', fontSize: 13 }}>Book Appt</button>
              <button className="btn btn-ghost" onClick={() => window.alert(`Opened messaging thread with ${selected.name}`)} style={{ justifyContent: 'center', fontSize: 13 }}>Send Message</button>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="card animate-slideIn" onClick={e => e.stopPropagation()} style={{ maxWidth: 500, width: '100%', padding: 24 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 18, fontWeight: 800 }}>Add New Patient</h3>
                <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
             </div>
             
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" placeholder="E.g. John Doe" value={newDoc.name} onChange={e => setNewDoc({...newDoc, name: e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Age *</label><input className="form-input" type="number" placeholder="E.g. 45" value={newDoc.age} onChange={e => setNewDoc({...newDoc, age: e.target.value})} /></div>
                
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select className="form-input" value={newDoc.gender} onChange={e => setNewDoc({...newDoc, gender: e.target.value})}><option>Male</option><option>Female</option><option>Other</option></select>
                </div>
                <div className="form-group"><label className="form-label">Blood Group</label><input className="form-input" placeholder="E.g. O+" value={newDoc.blood} onChange={e => setNewDoc({...newDoc, blood: e.target.value})} /></div>
                
                <div className="form-group" style={{ gridColumn: '1 / -1' }}><label className="form-label">Primary Condition *</label><input className="form-input" placeholder="E.g. Hypertension, Diabetes Type 2" value={newDoc.condition} onChange={e => setNewDoc({...newDoc, condition: e.target.value})} /></div>
                
                <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" placeholder="+91 999..." value={newDoc.phone} onChange={e => setNewDoc({...newDoc, phone: e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Contact Risk Level</label>
                  <select className="form-input" value={newDoc.risk} onChange={e => setNewDoc({...newDoc, risk: e.target.value})}><option value="low">Low Risk</option><option value="medium">Medium Risk</option><option value="high">High Risk</option></select>
                </div>

                <div className="form-group"><label className="form-label">Weight</label><input className="form-input" placeholder="E.g. 70 kg" value={newDoc.weight} onChange={e => setNewDoc({...newDoc, weight: e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Height</label><input className="form-input" placeholder="E.g. 175 cm" value={newDoc.height} onChange={e => setNewDoc({...newDoc, height: e.target.value})} /></div>
                
                <div className="form-group" style={{ gridColumn: '1 / -1' }}><label className="form-label">Known Allergies (comma separated)</label><input className="form-input" placeholder="E.g. Penicillin, Peanuts" value={newDoc.allergies} onChange={e => setNewDoc({...newDoc, allergies: e.target.value})} /></div>
             </div>

             <div style={{ marginTop: 24, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button className="btn btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAddPatient}>Securely Add Patient</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
