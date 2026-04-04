import { useState } from 'react';
import { CHAT_HISTORY, DOCTOR_PATIENTS } from '../../data/mockData';
import { Send, Search } from 'lucide-react';

export default function DoctorMessages() {
  const [messages, setMessages] = useState(CHAT_HISTORY);
  const [input, setInput] = useState('');
  const [activePatient, setActivePatient] = useState(DOCTOR_PATIENTS[0]);

  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages(p => [...p, { id: Date.now(), from: 'doctor', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <div className="page-wrapper animate-fadeIn">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Messages</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Secure patient communication</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, height: '70vh' }}>
        {/* Patient List */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div className="search-bar" style={{ width: '100%' }}>
              <Search size={14} />
              <input placeholder="Search patients..." style={{ width: '100%' }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {DOCTOR_PATIENTS.map(p => (
              <div key={p.id} onClick={() => setActivePatient(p)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.15s',
                background: activePatient?.id === p.id ? 'var(--accent-blue-dim)' : 'transparent'
              }}>
                <div className="avatar avatar-sm" style={{ background: 'var(--grad-purple)', color: '#fff', fontWeight: 700, position: 'relative' }}>
                  {p.avatar}
                  <div style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderRadius: '50%', background: p.status === 'stable' ? 'var(--accent-green)' : 'var(--accent-orange)', border: '1px solid var(--bg-primary)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.condition}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="avatar avatar-sm" style={{ background: 'var(--grad-purple)', color: '#fff', fontWeight: 700 }}>{activePatient?.avatar}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{activePatient?.name}</div>
              <div style={{ fontSize: 11, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)' }} /> Online
              </div>
            </div>
            <span className="badge badge-blue" style={{ marginLeft: 'auto' }}>{activePatient?.condition}</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {messages.map(m => (
              <div key={m.id} className={`chat-msg ${m.from === 'doctor' ? 'sent' : 'received'}`}>
                {m.from !== 'doctor' && (
                  <div className="avatar avatar-sm" style={{ background: 'var(--grad-purple)', color: '#fff', fontWeight: 700, alignSelf: 'flex-end' }}>{activePatient?.avatar}</div>
                )}
                <div>
                  <div className="chat-msg-bubble">{m.text}</div>
                  <div className="chat-msg-time">{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input-row">
            <input className="chat-input" placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} />
            <button className="btn btn-primary btn-icon" onClick={sendMsg}><Send size={15} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
