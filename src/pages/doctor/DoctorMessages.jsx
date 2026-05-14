import { useState, useRef, useEffect } from 'react';
import { CHAT_HISTORY, DOCTOR_PATIENTS } from '../../data/mockData';
import { Send, Search, AlertTriangle, Stethoscope } from 'lucide-react';

export default function DoctorMessages() {
  const [messages, setMessages] = useState(CHAT_HISTORY);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [activePatient, setActivePatient] = useState(DOCTOR_PATIENTS[0]);
  const messagesEndRef = useRef(null);

  const filteredPatients = DOCTOR_PATIENTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activePatient]);

  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages(p => [...p, { id: Date.now(), from: 'doctor', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <div className="page-wrapper animate-fadeIn" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .dm-chat-grid { display: grid; grid-template-columns: 300px 1fr; gap: 20px; flex: 1; overflow: hidden; }
        @media (max-width: 900px) {
          .dm-chat-grid { grid-template-columns: 200px 1fr; gap: 12px; }
        }
        @media (max-width: 640px) {
          .dm-chat-grid { grid-template-columns: 1fr; }
          .dm-patient-list { display: none; }
          .dm-chat-grid.show-list .dm-patient-list { display: flex; }
          .dm-chat-grid.show-list .dm-chat-area { display: none; }
        }
      `}</style>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>Messages</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Secure patient communication and triage escalations</p>
      </div>
      
      <div className="dm-chat-grid">
        {/* Patient List (Left Sidebar) */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={15} style={{ position: 'absolute', left: 12, color: 'var(--text-muted)' }} />
              <input 
                placeholder="Search patients..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: 10, border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-input)', fontSize: 13 }} 
              />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredPatients.map(p => (
              <div key={p.id} onClick={() => setActivePatient(p)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.15s',
                background: activePatient?.id === p.id ? 'var(--blue-light)' : 'transparent'
              }}>
                <div className="avatar avatar-sm" style={{ background: 'var(--bg-input)', color: 'var(--text)', fontWeight: 700, position: 'relative' }}>
                  {p.avatar}
                  <div style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderRadius: '50%', background: p.status === 'stable' ? 'var(--green)' : p.status === 'critical' ? 'var(--red)' : 'var(--amber)', border: '2px solid #fff' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.condition}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area (Right Side) */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, background: '#fff' }}>
            <div className="avatar avatar-sm" style={{ background: 'var(--bg-input)', color: 'var(--text)', fontWeight: 700 }}>{activePatient?.avatar}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{activePatient?.name}</div>
              <div style={{ fontSize: 12, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} /> Online
              </div>
            </div>
            <span className="badge badge-blue" style={{ marginLeft: 'auto' }}>{activePatient?.condition}</span>
          </div>

          {/* Alert Banner (Escalation Mock) */}
          {activePatient?.id === 1 && (
            <div style={{ background: 'var(--amber-light)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(245,158,11,0.2)' }}>
              <AlertTriangle size={16} color="var(--amber)" />
              <div style={{ fontSize: 12.5, color: '#92400e' }}>
                <span style={{ fontWeight: 700 }}>AI Escalation:</span> MediSync bot detected anomalies in recent BP reports. Please review.
              </div>
            </div>
          )}

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', alignSelf: m.from === 'doctor' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                {m.from !== 'doctor' && (
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', flexShrink: 0, fontSize: 13, fontWeight: 700 }}>
                    {activePatient?.avatar}
                  </div>
                )}
                
                <div style={{ 
                  background: m.from === 'doctor' ? 'linear-gradient(135deg,var(--blue),#6366f1)' : '#f8faff', 
                  padding: '12px 18px', 
                  borderRadius: 18, 
                  borderTopLeftRadius: m.from !== 'doctor' ? 4 : 18, 
                  borderTopRightRadius: m.from === 'doctor' ? 4 : 18, 
                  color: m.from === 'doctor' ? '#fff' : 'var(--text)', 
                  border: m.from === 'doctor' ? 'none' : '1px solid var(--border)', 
                  fontSize: 14, 
                  lineHeight: 1.5, 
                  boxShadow: m.from === 'doctor' ? '0 4px 12px rgba(59,130,246,0.2)' : 'none' 
                }}>
                  {m.text}
                  <div style={{ fontSize: 10, color: m.from === 'doctor' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginTop: 6, textAlign: m.from === 'doctor' ? 'right' : 'left' }}>
                    {m.time}
                  </div>
                </div>

                {m.from === 'doctor' && (
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)', flexShrink: 0 }}>
                    <Stethoscope size={18} />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', background: '#fff', display: 'flex', gap: 12 }}>
            <input 
              placeholder={`Message ${activePatient?.name.split(' ')[0]}...`}
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && sendMsg()} 
              style={{ flex: 1, padding: '14px 18px', borderRadius: 14, border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-input)', fontSize: 14, transition: 'all 0.2s' }}
              onFocus={e => e.target.style.borderColor = 'var(--blue)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button className="btn btn-primary" onClick={sendMsg} style={{ width: 48, height: 48, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 14 }}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
