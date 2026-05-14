import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Stethoscope, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PatientChatbot() {
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [doctorJoined, setDoctorJoined] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I am your MediSync AI Assistant. How are you feeling today?' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const textLower = userMsg.text.toLowerCase();
    const isUrgent = ['pain', 'fever', 'emergency', 'blood', 'severe', 'dizzy', 'hurt', 'bad', 'chest', 'breath'].some(w => textLower.includes(w));

    setTimeout(() => {
      if (!doctorJoined && isUrgent) {
        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, sender: 'ai', text: 'This sounds concerning. I am transferring this chat directly to Dr. Arjun Sharma for immediate review.' }
        ]);
        
        setTimeout(() => {
          setDoctorJoined(true);
          setMessages(prev => [
            ...prev,
            { id: Date.now() + 2, sender: 'doctor', text: `Hello ${user?.name?.split(' ')[0] || ''}, I'm reviewing your message now. How long have you been experiencing this?` }
          ]);
        }, 1500);
      } else {
        const responseText = doctorJoined 
          ? "I see. Please rest and monitor your condition. I'll ask the clinic to schedule an appointment for you right away."
          : "Thank you for sharing. Make sure to stay hydrated and get plenty of rest. Is there anything else you'd like to ask?";
          
        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, sender: doctorJoined ? 'doctor' : 'ai', text: responseText }
        ]);
      }
    }, 1000);
  };

  return (
    <div className="page-wrapper animate-fadeIn" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>AI Health Chat</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
          {doctorJoined ? 'Live consultation with Dr. Arjun Sharma' : 'Chat with your AI Assistant for basic triage'}
        </p>
      </div>

      <div style={{ flex: 1, background: '#fff', border: '1px solid var(--border)', borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 4px 20px rgba(15,23,42,0.04)' }}>
        {doctorJoined && (
          <div style={{ background: 'var(--amber-light)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(245,158,11,0.2)' }}>
            <AlertTriangle size={16} color="var(--amber)" />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--amber)' }}>Escalated to Doctor</span>
          </div>
        )}

        <div style={{ flex: 1, padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {messages.map((m) => (
            <div key={m.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
              {m.sender !== 'user' && (
                <div style={{ width: 36, height: 36, borderRadius: 12, background: m.sender === 'doctor' ? 'var(--blue-light)' : 'var(--purple-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.sender === 'doctor' ? 'var(--blue)' : 'var(--purple)', flexShrink: 0 }}>
                  {m.sender === 'doctor' ? <Stethoscope size={18} /> : <Bot size={18} />}
                </div>
              )}
              
              <div style={{ background: m.sender === 'user' ? 'linear-gradient(135deg,var(--blue),#6366f1)' : '#f8faff', padding: '12px 16px', borderRadius: 16, borderTopLeftRadius: m.sender !== 'user' ? 4 : 16, borderTopRightRadius: m.sender === 'user' ? 4 : 16, color: m.sender === 'user' ? '#fff' : 'var(--text)', border: m.sender === 'user' ? 'none' : '1px solid var(--border)', fontSize: 14, lineHeight: 1.5, boxShadow: m.sender === 'user' ? '0 4px 12px rgba(59,130,246,0.2)' : 'none' }}>
                {m.sender !== 'user' && (
                  <div style={{ fontSize: 11, fontWeight: 700, color: m.sender === 'doctor' ? 'var(--blue)' : 'var(--purple)', marginBottom: 4 }}>
                    {m.sender === 'doctor' ? 'Dr. Arjun Sharma' : 'MediSync AI'}
                  </div>
                )}
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div style={{ width: 36, height: 36, borderRadius: 12, background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', flexShrink: 0 }}>
                  <UserIcon size={18} />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: 16, borderTop: '1px solid var(--border)', background: '#fff', display: 'flex', gap: 12 }}>
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..." 
            style={{ flex: 1, padding: '12px 16px', borderRadius: 12, border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-input)', fontSize: 14 }}
          />
          <button onClick={handleSend} className="btn btn-primary" style={{ width: 44, height: 44, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
