import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Eye, EyeOff, ArrowLeft, Stethoscope, User, CheckCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'doctor' ? '/doctor' : '/patient', { replace: true });
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const user = await loginWithGoogle();
      navigate(user.role === 'doctor' ? '/doctor' : '/patient', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (role) => {
    setLoading(true); setError('');
    try {
      const creds = role === 'doctor' ? { email: 'doctor@demo.com', password: 'demo123' } : { email: 'patient@demo.com', password: 'demo123' };
      const user = await login(creds.email, creds.password);
      navigate(user.role === 'doctor' ? '/doctor' : '/patient', { replace: true });
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter,sans-serif' }}>
      {/* Left Panel */}
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 400, position: 'relative', zIndex: 1 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 48 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#3b82f6,#6366f1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
              <Heart size={18} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg,#3b82f6,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MediSync Pro</span>
          </Link>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 42, fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: 16 }}>
            Welcome<br /><span style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>back.</span>
          </h2>
          <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>Sign in to access your personalized healthcare dashboard.</p>
          {[
            { i: '🔒', t: 'Secure & Private', d: '256-bit end-to-end encryption' },
            { i: '⚡', t: 'Real-time Sync', d: 'Live data across all devices' },
            { i: '🤖', t: 'AI-Powered', d: 'Smart insights at your fingertips' },
          ].map(f => (
            <div key={f.t} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 20, lineHeight: 1 }}>{f.i}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13.5, color: '#0f172a' }}>{f.t}</div>
                <div style={{ fontSize: 12.5, color: '#94a3b8', marginTop: 2 }}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', background: '#fff', position: 'relative' }}>
        <Link to="/" style={{ position: 'absolute', top: 24, left: 28, display: 'flex', alignItems: 'center', gap: 6, color: '#94a3b8', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>
          <ArrowLeft size={15} /> Back
        </Link>

        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 26, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>Sign In</h3>
            <p style={{ color: '#94a3b8', fontSize: 14 }}>Enter your credentials to continue</p>
          </div>

          {/* Quick Demo */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Quick Demo Access</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { role: 'doctor', icon: <Stethoscope size={16} color="#3b82f6" />, name: 'Doctor Demo', sub: 'Dr. Arjun Sharma', color: '#3b82f6', bg: '#eff6ff', border: '#dbeafe' },
                { role: 'patient', icon: <User size={16} color="#10b981" />, name: 'Patient Demo', sub: 'Priya Mehta', color: '#10b981', bg: '#ecfdf5', border: '#d1fae5' },
              ].map(d => (
                <button key={d.role} onClick={() => quickLogin(d.role)} disabled={loading}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: d.bg, border: `1px solid ${d.border}`, borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', opacity: loading ? 0.6 : 1 }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(15,23,42,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                  {d.icon}
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{d.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleGoogleLogin} disabled={loading} style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid #e4eaf5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', transition: 'all 0.2s', fontWeight: 600, fontSize: 14, color: '#0f172a', marginBottom: 22, boxShadow: '0 1px 2px rgba(15,23,42,0.05)' }} onMouseEnter={e => e.currentTarget.style.background = '#f8faff'} onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <div style={{ flex: 1, height: 1, background: '#e4eaf5' }} />
            <span style={{ fontSize: 12, color: '#94a3b8' }}>or sign in with email</span>
            <div style={{ flex: 1, height: 1, background: '#e4eaf5' }} />
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: 10, padding: '10px 14px', color: '#b91c1c', fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} style={{ paddingRight: 42 }} />
                <button type="button" onClick={() => setShowPass(p => !p)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: 13, fontSize: 14.5, marginTop: 4, borderRadius: 12 }}>
              {loading ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />Signing in...</span> : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13, marginTop: 20 }}>
            Don't have an account? <Link to="/register" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
