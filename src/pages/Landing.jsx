import { Link, useNavigate } from 'react-router-dom';
import { Heart, Shield, Zap, Users, MessageSquare, Activity, ArrowRight, CheckCircle, Star, Stethoscope } from 'lucide-react';

const features = [
  { icon: <Activity size={22} />, color: '#3b82f6', bg: '#eff6ff', title: 'Real-time Vitals', desc: 'Monitor patient vitals live with AI-powered anomaly detection and instant health alerts.' },
  { icon: <Shield size={22} />, color: '#10b981', bg: '#ecfdf5', title: 'Role-Based Access', desc: 'Doctors and patients each get a personalized, secure dashboard tailored to their needs.' },
  { icon: <Zap size={22} />, color: '#8b5cf6', bg: '#f5f3ff', title: 'AI Symptom Checker', desc: 'Smart triage system that helps patients understand symptoms before their visit.' },
  { icon: <MessageSquare size={22} />, color: '#f59e0b', bg: '#fffbeb', title: 'Secure Messaging', desc: 'Private doctor-patient chat for seamless coordination without clinic visits.' },
  { icon: <Users size={22} />, color: '#06b6d4', bg: '#ecfeff', title: 'Patient Management', desc: 'Complete patient history, prescriptions, reports and follow-up scheduling in one place.' },
  { icon: <Heart size={22} />, color: '#ef4444', bg: '#fef2f2', title: 'Emergency SOS', desc: 'One-tap emergency button with location sharing and critical alert notifications.' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* ── Navbar ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #e4eaf5', padding: '0 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#3b82f6,#6366f1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(59,130,246,0.25)' }}>
              <Heart size={18} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg,#3b82f6,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MediSync Pro</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a href="#features" style={{ color: '#475569', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>Features</a>
            <a href="#how" style={{ color: '#475569', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>How it works</a>
            <Link to="/login" style={{ color: '#3b82f6', fontSize: 14, textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '8px 20px', borderRadius: 10 }}>Get Started</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ paddingTop: 120, paddingBottom: 80, background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 50%, #fdf4ff 100%)', textAlign: 'center', padding: '120px 5% 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: -60, right: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: '5%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: 99, padding: '6px 14px', marginBottom: 24 }}>
          <span style={{ fontSize: 14 }}>🏆</span>
          <span style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600 }}>PromptWars Ahmedabad 2026 · Google for Developers</span>
        </div>

        <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: 20, maxWidth: 800, margin: '0 auto 20px' }}>
          Healthcare That<br />
          <span style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Actually Works For You</span>
        </h1>

        <p style={{ fontSize: 18, color: '#475569', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
          MediSync Pro bridges the gap between doctors and patients with AI-powered insights, real-time vitals monitoring, and seamless care coordination.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
          <button onClick={() => navigate('/register')} className="btn btn-primary" style={{ padding: '13px 28px', fontSize: 15, borderRadius: 12, boxShadow: '0 6px 20px rgba(59,130,246,0.3)' }}>
            Start for Free <ArrowRight size={18} />
          </button>
          <button onClick={() => navigate('/login')} className="btn btn-ghost" style={{ padding: '13px 28px', fontSize: 15, borderRadius: 12 }}>
            Try Demo Login
          </button>
        </div>

        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['HIPAA Compliant', 'AI-Powered Triage', '256-bit Encrypted', 'Role-Based Access'].map(b => (
            <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle size={14} color="#10b981" />
              <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{b}</span>
            </div>
          ))}
        </div>

        {/* Preview Cards */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 60, flexWrap: 'wrap' }}>
          {/* Doctor Card */}
          <div style={{ background: '#fff', border: '1px solid #e4eaf5', borderRadius: 20, padding: 24, boxShadow: '0 8px 32px rgba(15,23,42,0.08)', width: 260, textAlign: 'left', animation: 'float 3s ease-in-out infinite' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>AS</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Dr. Arjun Sharma</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Cardiologist</div>
              </div>
              <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 3px #ecfdf5' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[['124', 'Patients', '#3b82f6'], ['8', "Today's Appts", '#10b981'], ['2', 'Critical', '#ef4444'], ['97%', 'Satisfaction', '#8b5cf6']].map(([v, l, c]) => (
                <div key={l} style={{ background: '#f8faff', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 20, fontWeight: 800, color: c }}>{v}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Card */}
          <div style={{ background: '#fff', border: '1px solid #e4eaf5', borderRadius: 20, padding: 24, boxShadow: '0 8px 32px rgba(15,23,42,0.08)', width: 240, textAlign: 'left', animation: 'float 3s ease-in-out infinite 0.5s' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Live Vitals — Priya M.</div>
            {[
              { name: 'Heart Rate', value: '72 bpm', color: '#ef4444', dot: 'normal' },
              { name: 'Blood Pressure', value: '122/76', color: '#3b82f6', dot: 'normal' },
              { name: 'SpO2', value: '98%', color: '#10b981', dot: 'normal' },
              { name: 'Glucose', value: '95 mg/dL', color: '#8b5cf6', dot: 'normal' },
            ].map(v => (
              <div key={v.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div className={`vital-status ${v.dot}`} />
                <span style={{ fontSize: 12, color: '#475569', flex: 1 }}>{v.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'Outfit,sans-serif', color: v.color }}>{v.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: '80px 5%', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="badge badge-purple" style={{ marginBottom: 14 }}>Features</div>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#0f172a', marginBottom: 14 }}>Everything care coordination needs</h2>
          <p style={{ color: '#475569', fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Built for real-world Indian healthcare — fast, intuitive, and powerful.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ padding: 28, transition: 'all 0.2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(15,23,42,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: f.bg, color: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" style={{ background: '#f8faff', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div className="badge badge-green" style={{ marginBottom: 14 }}>How It Works</div>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, color: '#0f172a', marginBottom: 48 }}>Up and running in minutes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
            {[
              { n: '01', icon: '🎭', title: 'Choose your role', desc: 'Register as a Doctor or Patient. Takes under 2 minutes with our guided setup.' },
              { n: '02', icon: '📅', title: 'Connect & Schedule', desc: 'Patients book appointments instantly. Doctors get organized smart scheduling.' },
              { n: '03', icon: '📊', title: 'Monitor & Coordinate', desc: 'Track health, manage medications, and communicate securely in real-time.' },
            ].map(s => (
              <div key={s.n} style={{ background: '#fff', border: '1px solid #e4eaf5', borderRadius: 20, padding: 32, boxShadow: '0 2px 8px rgba(15,23,42,0.05)' }}>
                <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 44, fontWeight: 900, background: 'linear-gradient(135deg,#3b82f6,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>{s.n}</div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles ── */}
      <section style={{ padding: '80px 5%', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="badge badge-blue" style={{ marginBottom: 14 }}>Two Roles, One Platform</div>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 36, fontWeight: 800, color: '#0f172a' }}>Built for everyone in healthcare</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            { role: 'Doctor', icon: <Stethoscope size={28} />, color: '#3b82f6', bg: '#eff6ff', border: '#dbeafe', features: ['Full patient management dashboard', 'AI-powered analytics & reports', 'Smart appointment scheduling', 'Secure patient messaging', 'Critical case alerts'], cta: 'Register as Doctor', link: '/register?role=doctor' },
            { role: 'Patient', icon: <Heart size={28} />, color: '#10b981', bg: '#ecfdf5', border: '#d1fae5', features: ['Personal health dashboard', 'Book & manage appointments', 'AI symptom checker with triage', 'Medication tracker & reminders', 'Emergency SOS with location'], cta: 'Register as Patient', link: '/register?role=patient' },
          ].map(r => (
            <div key={r.role} style={{ background: r.bg, border: `2px solid ${r.border}`, borderRadius: 24, padding: 32 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.color, marginBottom: 20, boxShadow: '0 2px 8px rgba(15,23,42,0.06)' }}>{r.icon}</div>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>For {r.role}s</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {r.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={16} color={r.color} />
                    <span style={{ fontSize: 14, color: '#0f172a' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to={r.link} className="btn" style={{ display: 'inline-flex', background: r.color, color: '#fff', padding: '11px 22px', borderRadius: 10, fontWeight: 600, fontSize: 14, boxShadow: `0 4px 14px ${r.color}40` }}>
                {r.cta} <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', padding: '70px 5%', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 14 }}>Ready to transform healthcare?</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 32 }}>Join doctors and patients already using MediSync Pro.</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/register')} style={{ background: '#fff', color: '#3b82f6', padding: '13px 28px', borderRadius: 12, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            Get Started Free <ArrowRight size={18} />
          </button>
          <button onClick={() => navigate('/login')} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '13px 28px', borderRadius: 12, fontWeight: 600, fontSize: 15, border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
            Try Demo Login
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#0f172a', padding: '28px 5%', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
          <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg,#3b82f6,#6366f1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={14} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontFamily: 'Outfit,sans-serif', color: '#fff', fontSize: 15 }}>MediSync Pro</span>
        </div>
        <p style={{ color: '#475569', fontSize: 13 }}>Built with ❤️ for PromptWars Ahmedabad 2026 · Google for Developers × H2S</p>
      </footer>

      <style>{`
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        @media (max-width:900px) { section div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width:600px) { section div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; } section div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
