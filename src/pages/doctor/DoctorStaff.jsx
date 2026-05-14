import { useState } from 'react';
import { Calendar, Clock, Phone, MapPin, Search } from 'lucide-react';

const STAFF = [
  { id: 1, name: 'Nurse Anjali', role: 'Head Nurse', shift: 'Morning (07:00 - 15:00)', phone: '+919988700010', status: 'On Duty' },
  { id: 2, name: 'Ravi Kumar', role: 'Lab Technician', shift: 'Morning (08:00 - 16:00)', phone: '+919876543210', status: 'On Duty' },
  { id: 3, name: 'Dr. Neha Patel', role: 'Junior Resident', shift: 'Night (20:00 - 08:00)', phone: '+919123456789', status: 'Off Duty' },
  { id: 4, name: 'Sunil Verma', role: 'Ward Boy', shift: 'Afternoon (14:00 - 22:00)', phone: '+918877665544', status: 'On Leave' }
];

export default function DoctorStaff() {
  const [search, setSearch] = useState('');

  const filteredStaff = STAFF.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-wrapper animate-fadeIn">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>Staff Management</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Track team availability, shifts, and leaves</p>
        </div>
        <button className="btn btn-primary" onClick={() => window.alert('Opening shift planning tool...')}>Plan Shifts</button>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700 }}>Hospital Staff Directory</h3>
          <div className="search-wrap" style={{ width: 250 }}>
            <Search size={14} />
            <input placeholder="Search name or role..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
          <thead>
            <tr style={{ background: 'var(--bg-app)' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: 'var(--text-muted)' }}>Staff Member</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: 'var(--text-muted)' }}>Current Shift</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: 'var(--text-muted)' }}>Contact</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: 'var(--text-muted)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.role}</div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={13} color="var(--blue)" /> {s.shift}</div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={13} color="var(--green)" /> {s.phone}</div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span className={`badge badge-${s.status === 'On Duty' ? 'green' : s.status === 'Off Duty' ? 'gray' : 'red'}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
