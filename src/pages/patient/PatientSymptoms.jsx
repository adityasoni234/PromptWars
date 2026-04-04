import { useState } from 'react';
import { SYMPTOMS_LIST } from '../../data/mockData';
import { Brain, X, ChevronRight, AlertCircle } from 'lucide-react';

const TRIAGE = {
  low: { label: 'Low Risk', color: 'var(--accent-green)', bg: 'var(--accent-green-dim)', border: 'rgba(0,230,118,0.3)', advice: 'Your symptoms suggest a minor condition. Rest, hydrate well, and monitor for 24-48 hours. Visit a doctor if symptoms worsen.', emoji: '✅' },
  medium: { label: 'Moderate Risk', color: 'var(--accent-orange)', bg: 'var(--accent-orange-dim)', border: 'rgba(255,145,0,0.3)', advice: 'Your symptoms need medical attention within 24 hours. Book an appointment with your doctor today.', emoji: '⚠️' },
  high: { label: 'High Risk — Seek Urgent Care', color: 'var(--accent-red)', bg: 'var(--accent-red-dim)', border: 'rgba(255,71,87,0.3)', advice: 'Your symptoms may indicate a serious condition. Seek immediate medical attention or call emergency services.', emoji: '🚨' },
};

const URGENT = ['Chest Pain', 'Shortness of Breath', 'Palpitations', 'Blurred Vision'];
const MEDIUM = ['Fever', 'Dizziness', 'Stomach Pain', 'Back Pain', 'Swelling', 'Joint Pain'];

const AI_INSIGHTS = {
  'Headache': 'Could be tension, dehydration, or eye strain. Try a dark quiet room and stay hydrated.',
  'Fever': 'Temperature above 102°F warrants medical attention. Monitor every 4 hours and stay hydrated.',
  'Chest Pain': '⚠️ Chest pain requires immediate evaluation to rule out cardiac causes.',
  'Shortness of Breath': '⚠️ This symptom needs urgent evaluation. Call emergency if severe.',
  'Fatigue': 'Persistent fatigue may indicate anemia, thyroid issues, or sleep disorder.',
  'Cough': 'A cough lasting more than 3 weeks should be evaluated by a doctor.',
  'Nausea': 'Could be food-related, viral infection or medication side effect. Sip water and rest.',
  'Dizziness': 'May relate to blood pressure, dehydration or inner ear. Sit or lie down immediately.',
  'Sore Throat': 'Rest your voice, gargle warm salt water. See a doctor if very painful or fever develops.',
  'Anxiety': 'Practice deep breathing. Speak with a doctor if this is persistent or impacting daily life.',
};

function getLevel(symptoms) {
  if (symptoms.some(s => URGENT.includes(s))) return 'high';
  if (symptoms.some(s => MEDIUM.includes(s))) return 'medium';
  return 'low';
}

export default function PatientSymptoms() {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [custom, setCustom] = useState('');
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState('today');
  const [severity, setSeverity] = useState('moderate');

  const toggle = (s) => setSelected(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const addCustom = () => {
    if (custom.trim() && !selected.includes(custom.trim())) {
      setSelected(p => [...p, custom.trim()]);
      setCustom('');
    }
  };

  const analyze = () => {
    if (!selected.length) return;
    setLoading(true);
    setTimeout(() => {
      const level = getLevel(selected);
      const insights = selected.map(s => ({ symptom: s, info: AI_INSIGHTS[s] || 'Monitor this symptom and consult your doctor if it persists beyond 48 hours.' }));
      setResult({ level, insights });
      setLoading(false);
    }, 1500);
  };

  const reset = () => { setSelected([]); setResult(null); };

  return (
    <div className="page-wrapper animate-fadeIn">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>AI Symptom Checker</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Select your symptoms for an AI-powered health triage</p>
      </div>

      {!result ? (
        <>
          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Select Your Symptoms</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
              {SYMPTOMS_LIST.map(s => (
                <button key={s} onClick={() => toggle(s)}
                  style={{
                    padding: '8px 14px', borderRadius: 24, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter,sans-serif',
                    background: selected.includes(s) ? 'var(--accent-blue-dim)' : 'var(--bg-secondary)',
                    border: `1px solid ${selected.includes(s) ? 'var(--accent-blue)' : 'var(--border)'}`,
                    color: selected.includes(s) ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', gap: 6
                  }}>
                  {selected.includes(s) && <X size={11} />}
                  {s}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <input className="form-input" style={{ flex: 1 }} placeholder="Add custom symptom..." value={custom} onChange={e => setCustom(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCustom()} />
              <button className="btn btn-ghost" onClick={addCustom}>Add</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Duration</div>
              {['today', 'few days', 'a week', 'over a week'].map(d => (
                <label key={d} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', cursor: 'pointer' }}>
                  <input type="radio" name="dur" value={d} checked={duration === d} onChange={() => setDuration(d)} style={{ accentColor: 'var(--accent-blue)' }} />
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{d}</span>
                </label>
              ))}
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Severity</div>
              {['mild', 'moderate', 'severe', 'very severe'].map(s => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', cursor: 'pointer' }}>
                  <input type="radio" name="sev" value={s} checked={severity === s} onChange={() => setSeverity(s)} style={{ accentColor: 'var(--accent-purple)' }} />
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{s}</span>
                </label>
              ))}
            </div>
          </div>

          {selected.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {selected.map(s => (
                <span key={s} onClick={() => toggle(s)} className="badge badge-blue" style={{ cursor: 'pointer' }}>
                  {s} <X size={10} style={{ marginLeft: 4 }} />
                </span>
              ))}
            </div>
          )}

          <button className="btn btn-primary" onClick={analyze} disabled={!selected.length || loading}
            style={{ width: '100%', justifyContent: 'center', padding: 14, fontSize: 15 }}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                Analyzing with AI...
              </span>
            ) : <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Brain size={18} /> Analyze Symptoms</span>}
          </button>
        </>
      ) : (
        <div className="animate-fadeIn">
          <div style={{ background: TRIAGE[result.level].bg, border: `1px solid ${TRIAGE[result.level].border}`, borderRadius: 'var(--radius-xl)', padding: 28, marginBottom: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>{TRIAGE[result.level].emoji}</div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: TRIAGE[result.level].color, marginBottom: 10 }}>{TRIAGE[result.level].label}</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>{TRIAGE[result.level].advice}</div>
            {result.level === 'high' && (
              <button className="btn btn-danger" style={{ marginTop: 20, justifyContent: 'center', padding: '12px 28px' }}>
                <AlertCircle size={16} /> Call Emergency Now
              </button>
            )}
          </div>

          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Brain size={18} color="var(--accent-purple)" /> AI Insights per Symptom
            </h3>
            {result.insights.map(s => (
              <div key={s.symptom} style={{ padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 5 }}>{s.symptom}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.info}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button className="btn btn-ghost" onClick={reset} style={{ justifyContent: 'center', padding: 13 }}>← Check Again</button>
            <button className="btn btn-primary" style={{ justifyContent: 'center', padding: 13 }}>
              <ChevronRight size={16} /> Book Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
