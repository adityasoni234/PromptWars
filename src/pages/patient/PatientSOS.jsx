import { useState } from 'react';
import { Phone, MapPin, AlertOctagon, CheckCircle, MessageSquare, Mail, Plus, UserPlus } from 'lucide-react';

const INITIAL_CONTACTS = [
  { name: 'Dr. Arjun Sharma', role: 'Primary Doctor', phone: '+919876500001', email: 'dr.arjun@hospital.com', color: 'var(--blue)' },
  { name: 'Apollo Hospital', role: 'Nearest Hospital', phone: '+917966701800', email: 'emergency@apollo.com', color: 'var(--green)' },
  { name: 'National Emergency', role: 'Ambulance / Police', phone: '112', email: 'contact@emergency.gov.in', color: 'var(--red)' },
];

export default function PatientSOS() {
  const [triggered, setTriggered] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  
  // Custom Family Contacts
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' });

  const triggerSOS = () => {
    setCancelled(false);
    let c = 5;
    setCountdown(c);
    const timer = setInterval(() => {
      c -= 1;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(timer);
        setCountdown(null);
        setTriggered(true);
      }
    }, 1000);
    window._sosTimer = timer;
  };

  const cancelSOS = () => {
    clearInterval(window._sosTimer);
    setCancelled(true);
    setCountdown(null);
  };

  const reset = () => { setTriggered(false); setCancelled(false); };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact, role: 'Family Member', color: 'var(--purple)' }]);
      setIsAdding(false);
      setNewContact({ name: '', phone: '', email: '' });
    }
  };

  return (
    <div className="page-wrapper animate-fadeIn">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>Emergency SOS</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>One-tap emergency alert system</p>
      </div>

      {/* SOS Center */}
      <div style={{ textAlign: 'center', padding: '40px 20px', marginBottom: 24 }}>
        {!triggered && !cancelled && countdown === null && (
          <>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 32 }}>Press the SOS button to alert your doctor and emergency contacts</div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <div className="pulse-ring" style={{ '--accent-red': 'var(--red)' }}>
                <button className="sos-btn" onClick={triggerSOS} style={{ background: 'var(--grad-amber)', boxShadow: '0 8px 32px rgba(239,68,68,0.35)' }}>
                  <AlertOctagon size={28} />
                  SOS
                </button>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Will send alert in 5 seconds. You can cancel anytime.</div>
          </>
        )}

        {countdown !== null && (
          <div className="animate-fadeIn">
            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 80, fontWeight: 900, color: 'var(--red)', lineHeight: 1, marginBottom: 16 }}>{countdown}</div>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 28 }}>Sending emergency alert in {countdown} second{countdown !== 1 ? 's' : ''}...</div>
            <button className="btn btn-ghost" onClick={cancelSOS} style={{ padding: '12px 32px', fontSize: 15, borderColor: 'var(--amber)', color: 'var(--amber)' }}>Cancel</button>
          </div>
        )}

        {triggered && (
          <div className="animate-fadeIn">
            <div style={{ fontSize: 64, marginBottom: 16 }}>🚨</div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--red)', marginBottom: 10 }}>Emergency Alert Sent!</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.7 }}>
              Your location and vitals have been shared with Dr. Arjun Sharma and emergency contacts. Help is on the way.
            </div>
            <div style={{ background: 'var(--green-light)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 14, padding: 16, maxWidth: 340, margin: '0 auto 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <CheckCircle size={20} color="var(--green)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>Location Shared</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Satellite, Ahmedabad — GPS Active</div>
              </div>
            </div>
            <button className="btn btn-ghost" onClick={reset} style={{ padding: '10px 28px' }}>Reset</button>
          </div>
        )}

        {cancelled && (
          <div className="animate-fadeIn">
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 20, fontWeight: 700, color: 'var(--green)', marginBottom: 10 }}>SOS Cancelled</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>No alert was sent. Stay safe!</div>
            <button className="btn btn-ghost" onClick={reset} style={{ padding: '10px 28px' }}>Try Again</button>
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Phone size={16} color="var(--blue)" /> Emergency Contacts
          </h3>
          <button onClick={() => setIsAdding(!isAdding)} className="btn btn-soft-blue" style={{ padding: '6px 12px', fontSize: 12 }}>
            <Plus size={14} /> Add Family
          </button>
        </div>

        {contacts.map(c => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, flexShrink: 0 }}>
              <Phone size={16} />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{c.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.role}</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <a href={`tel:${c.phone}`} className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: 12, color: c.color, borderColor: 'var(--border)', textDecoration: 'none' }}><Phone size={14} /> Call</a>
              <a href={`sms:${c.phone}`} className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: 12, color: c.color, borderColor: 'var(--border)', textDecoration: 'none' }}><MessageSquare size={14} /> SMS</a>
              <a href={`mailto:${c.email}`} className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: 12, color: c.color, borderColor: 'var(--border)', textDecoration: 'none' }}><Mail size={14} /> Mail</a>
            </div>
          </div>
        ))}

        {isAdding && (
          <div style={{ marginTop: 16, padding: '16px', background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, display: 'flex', gap: 6, alignItems: 'center' }}>
              <UserPlus size={14} color="var(--purple)" /> Add Family Member
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <input type="text" placeholder="Name" className="form-input" value={newContact.name} onChange={e => setNewContact({...newContact, name: e.target.value})} style={{ flex: 1, minWidth: '150px' }} />
              <input type="text" placeholder="Phone (e.g. +91...)" className="form-input" value={newContact.phone} onChange={e => setNewContact({...newContact, phone: e.target.value})} style={{ flex: 1, minWidth: '150px' }} />
              <input type="email" placeholder="Email" className="form-input" value={newContact.email} onChange={e => setNewContact({...newContact, email: e.target.value})} style={{ flex: 1, minWidth: '150px' }} />
              <button 
                className="btn btn-primary" 
                onClick={handleAddContact} 
                style={{ background: 'var(--purple)' }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="card" style={{ padding: 20, background: 'var(--blue-light)', borderColor: 'var(--border)' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <MapPin size={18} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Registered Address</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Satellite, Ahmedabad, Gujarat — 380015</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>In an emergency, your GPS location will be shared automatically with your emergency contacts.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
