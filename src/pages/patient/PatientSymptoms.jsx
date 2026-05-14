import { useState } from 'react';
import { SYMPTOMS_LIST, PATIENT_SYMPTOM_LOGS } from '../../data/mockData';
import { Brain, X, ChevronRight, AlertCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyDqkoQ0-hc9l86v4vUFwWV3i24KcTD4aGw";
const genAI = new GoogleGenerativeAI(apiKey);

const TRIAGE = {
  low: { label: 'Low Risk', color: 'var(--accent-green)', bg: 'var(--accent-green-dim)', border: 'rgba(0,230,118,0.3)', advice: 'Your symptoms suggest a minor condition. Rest, hydrate well, and monitor for 24-48 hours. Visit a doctor if symptoms worsen.', emoji: '✅' },
  medium: { label: 'Moderate Risk', color: 'var(--accent-orange)', bg: 'var(--accent-orange-dim)', border: 'rgba(255,145,0,0.3)', advice: 'Your symptoms need medical attention within 24 hours. Book an appointment with your doctor today.', emoji: '⚠️' },
  high: { label: 'High Risk — Seek Urgent Care', color: 'var(--accent-red)', bg: 'var(--accent-red-dim)', border: 'rgba(255,71,87,0.3)', advice: 'Your symptoms may indicate a serious condition. Seek immediate medical attention or call emergency services.', emoji: '🚨' },
};

export default function PatientSymptoms() {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [custom, setCustom] = useState('');
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState('today');
  const [severity, setSeverity] = useState('moderate');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggle = (s) => setSelected(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const addCustom = () => {
    if (custom.trim() && !selected.includes(custom.trim())) {
      setSelected(p => [...p, custom.trim()]);
      setCustom('');
    }
  };

  const analyze = async () => {
    if (!selected.length) return;
    setLoading(true);
    setError('');
    
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
        }
      });
      
      const prompt = `You are an expert AI medical triage assistant.
      The patient experiences the following symptoms: ${selected.join(', ')}. 
      Duration: ${duration}. Severity: ${severity}.
      
      Analyze these symptoms and provide a logical response strictly in this exact JSON format. Only return raw JSON, no markdown formatting blocks:
      {
        "level": "low" | "medium" | "high",
        "insights": [
          { "symptom": "string", "info": "A short, 1-sentence medical explanation of what might be causing this specific symptom." }
        ],
        "recommended_reports": ["string", "string"] // Name 2-4 actual lab tests/reports the doctor might ask for (e.g., Complete Blood Count (CBC), ECG, X-Ray) based on their symptoms.
      }`;

      const response = await model.generateContent(prompt);
      let rawText = response.response.text().trim();
      if (rawText.startsWith('\`\`\`json')) rawText = rawText.substring(7);
      if (rawText.startsWith('\`\`\`')) rawText = rawText.substring(3);
      if (rawText.endsWith('\`\`\`')) rawText = rawText.substring(0, rawText.length - 3);

      const data = JSON.parse(rawText);
      
      // SYNC WITH DOCTOR!
      PATIENT_SYMPTOM_LOGS.unshift({
        id: Date.now(), patientId: 99, patientName: 'Current User',
        date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        symptoms: selected.join(', '), aiDiagnosis: rawText, severity: data.level
      });
      
      setResult({ 
        level: data.level || "medium", 
        insights: data.insights || [],
        reports: data.recommended_reports || []
      });
    } catch (err) {
      console.error(err);
      setError("AI Analysis failed. Please try again or consult a doctor immediately.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setSelected([]); setResult(null); setError(''); };

  return (
    <div className="page-wrapper animate-fadeIn">
      <style>{`
        .ps-options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
        .ps-results-grid { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 16px; margin-bottom: 20px; align-items: stretch; }
        .ps-action-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 640px) {
          .ps-options-grid { grid-template-columns: 1fr; }
          .ps-results-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>AI Symptom Checker</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Select your symptoms for a Gemini AI-powered health triage</p>
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

          <div className="ps-options-grid">
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

          {error && <div style={{ color: 'var(--accent-red)', fontSize: 13, marginBottom: 16, background: 'var(--accent-red-dim)', padding: '12px 16px', borderRadius: 8 }}>{error}</div>}

          <button className="btn btn-primary" onClick={analyze} disabled={!selected.length || loading}
            style={{ width: '100%', justifyContent: 'center', padding: 14, fontSize: 15, background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', border: 'none' }}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                Analyzing with Gemini...
              </span>
            ) : <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Brain size={18} /> Analyze with Gemini AI</span>}
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

          <div className="ps-results-grid">
            {/* Insights */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Brain size={18} color="var(--accent-purple)" /> Triage Breakdown
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {result.insights.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', marginBottom: 3 }}>{s.symptom}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.info}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Reports */}
            <div className="card" style={{ padding: 24, background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)' }}>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, color: '#0f172a' }}>
                <FileText size={18} color="var(--accent-blue)" /> Recommended Lab Reports
              </h3>
              <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 20 }}>Bring these to your doctor consultation to speed up diagnosis:</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.reports.length > 0 ? (
                  result.reports.map((report, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                      <div style={{ background: '#e0f2fe', width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0369a1', fontWeight: 700, fontSize: 12 }}>
                        {idx + 1}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{report}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>No specific reports recommended at this stage.</div>
                )}
              </div>
            </div>
          </div>

          <div className="ps-action-grid">
            <button className="btn btn-ghost" onClick={reset} style={{ justifyContent: 'center', padding: 13 }}>← Check Again</button>
            <button className="btn btn-primary" onClick={() => navigate('/patient/appointments')} style={{ justifyContent: 'center', padding: 13 }}>
              <ChevronRight size={16} /> Book Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
