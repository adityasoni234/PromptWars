import { useState } from 'react';
import { Search, Plus, Filter, ChevronRight, X, Phone, Droplet, User } from 'lucide-react';
import { DOCTOR_PATIENTS } from '../../data/mockData';

const statusColor = { stable: 'green', monitoring: 'orange', critical: 'red' };
const riskColor = { low: 'green', medium: 'orange', high: 'red' };

export default function DoctorPatients() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = DOCTOR_PATIENTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.condition.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="page-wrapper animate-fadeIn">
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Patients</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>{DOCTOR_PATIENTS.length} total patients under your care</p>
        </div>
        <button className="btn btn-primary"><Plus size={16} /> Add Patient</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div className="search-bar">
          <Search size={15} />
          <input placeholder="Search patients..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['all', 'stable', 'monitoring', 'critical'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className="btn" style={{ padding: '8px 16px', fontSize: 12, textTransform: 'capitalize', background: filter === f ? 'var(--accent-blue)' : 'transparent', color: filter === f ? '#fff' : 'var(--text-secondary)', border: `1px solid ${filter === f ? 'var(--accent-blue)' : 'var(--border)'}`, borderRadius: 8 }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>
        {/* Table */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Patient', 'Age/Gender', 'Condition', 'Risk', 'Status', 'Last Visit', ''].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} onClick={() => setSelected(selected?.id === p.id ? null : p)}
                    style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.15s', background: selected?.id === p.id ? 'var(--accent-blue-dim)' : 'transparent' }}
                    onMouseEnter={e => { if (selected?.id !== p.id) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                    onMouseLeave={e => { if (selected?.id !== p.id) e.currentTarget.style.background = 'transparent'; }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="avatar avatar-sm" style={{ background: 'var(--grad-purple)', color: '#fff', fontWeight: 700 }}>{p.avatar}</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{p.age} · {p.gender}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-primary)' }}>{p.condition}</td>
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
              <div className="avatar avatar-xl" style={{ background: 'var(--grad-purple)', color: '#fff', fontWeight: 700, margin: '0 auto 12px' }}>{selected.avatar}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>{selected.name}</div>
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
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{r.val}</span>
                </div>
              ))}
            </div>
            {selected.allergies.length > 0 && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Allergies</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {selected.allergies.map(a => <span key={a} className="badge badge-red">{a}</span>)}
                </div>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 20 }}>
              <button className="btn btn-primary" style={{ justifyContent: 'center', fontSize: 13 }}>Book Appt</button>
              <button className="btn btn-ghost" style={{ justifyContent: 'center', fontSize: 13 }}>Send Message</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
