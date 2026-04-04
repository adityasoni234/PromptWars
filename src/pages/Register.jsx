import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Eye, EyeOff, ArrowLeft, Stethoscope, User, CheckCircle, ArrowRight } from 'lucide-react';

const specs = ['Cardiologist', 'General Physician', 'Dermatologist', 'Neurologist', 'Orthopedist', 'Pediatrician', 'Psychiatrist', 'Diabetologist', 'ENT Specialist', 'Ophthalmologist'];
const bloods = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', phone: '', specialization: '', hospital: '', experience: '', age: '', bloodGroup: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    if (!form.name || !form.email || !form.password) { setError('Fill all required fields.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const data = { name: form.name, email: form.email, password: form.password, role, phone: form.phone };
      if (role === 'doctor') { data.specialization = form.specialization || 'General Physician'; data.hospital = form.hospital || 'City Hospital'; data.experience = form.experience || '1 year'; data.rating = 4.5; }
      else { data.age = form.age || '—'; data.bloodGroup = form.bloodGroup || '—'; }
      const user = await register(data);
      navigate(user.role === 'doctor' ? '/doctor' : '/patient', { replace: true });
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const accentColor = role === 'doctor' ? '#3b82f6' : '#10b981';
  const accentBg = role === 'doctor' ? '#eff6ff' : '#ecfdf5';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter,sans-serif' }}>
      {/* Left */}
      <div style={{ flex: '0 0 380px', background: 'linear-gradient(160deg, #0f172a 0%, #1e3a5f 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 48 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#3b82f6,#6366f1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={18} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: 18, fontWeight: 800, color: '#fff' }}>MediSync Pro</span>
          </div>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 34, fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 14 }}>Join the future of care.</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.7, marginBottom: 40 }}>Create your account in less than 2 minutes and start transforming your healthcare experience.</p>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {['Choose your role', 'Fill in your details', 'Access your dashboard'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: i < step ? '#10b981' : i === step - 1 ? '#3b82f6' : 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s' }}>
                  {i < step - 1 ? <CheckCircle size={16} color="#fff" /> : <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{i + 1}</span>}
                </div>
                <span style={{ fontSize: 14, color: i <= step - 1 ? '#fff' : 'rgba(255,255,255,0.45)', fontWeight: i === step - 1 ? 600 : 400 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 40px', background: '#fff', overflowY: 'auto', position: 'relative' }}>
        <Link to="/" style={{ position: 'absolute', top: 24, left: 28, display: 'flex', alignItems: 'center', gap: 6, color: '#94a3b8', fontSize: 13, textDecoration: 'none' }}>
          <ArrowLeft size={15} /> Home
        </Link>

        <div style={{ width: '100%', maxWidth: 460 }}>
          {step === 1 ? (
            <>
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 26, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>Create Account</h3>
                <p style={{ color: '#94a3b8', fontSize: 14 }}>Select your role to get started</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
                {[
                  { r: 'doctor', icon: <Stethoscope size={28} />, title: "I'm a Doctor", desc: 'Manage patients, appointments, prescriptions & analytics', color: '#3b82f6', bg: '#eff6ff', border: '#dbeafe' },
                  { r: 'patient', icon: <User size={28} />, title: "I'm a Patient", desc: 'Book appointments, track medications & monitor your health', color: '#10b981', bg: '#ecfdf5', border: '#d1fae5' },
                ].map(item => (
                  <button key={item.r} onClick={() => { setRole(item.r); setStep(2); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px', background: '#fff', border: '2px solid #e4eaf5', borderRadius: 16, cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.background = item.bg; e.currentTarget.style.transform = 'translateX(3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e4eaf5'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'none'; }}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.4 }}>{item.desc}</div>
                    </div>
                    <ArrowRight size={18} color="#94a3b8" />
                  </button>
                ))}
              </div>
              <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>Already have an account? <Link to="/login" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link></p>
            </>
          ) : (
            <>
              <div style={{ marginBottom: 24 }}>
                <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, marginBottom: 14, padding: 0, fontFamily: 'Inter,sans-serif' }}>
                  <ArrowLeft size={15} /> Back
                </button>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: accentBg, border: `1px solid ${role === 'doctor' ? '#dbeafe' : '#d1fae5'}`, borderRadius: 99, padding: '5px 14px', marginBottom: 12 }}>
                  {role === 'doctor' ? <Stethoscope size={14} color={accentColor} /> : <User size={14} color={accentColor} />}
                  <span style={{ fontSize: 12, color: accentColor, fontWeight: 600 }}>{role === 'doctor' ? 'Doctor Account' : 'Patient Account'}</span>
                </div>
                <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Your Details</h3>
                <p style={{ color: '#94a3b8', fontSize: 13 }}>Fill in the information below to create your account</p>
              </div>

              {error && <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: 10, padding: '10px 14px', color: '#b91c1c', fontSize: 13, marginBottom: 16 }}>{error}</div>}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" placeholder={role === 'doctor' ? 'Dr. Your Name' : 'Your Full Name'} value={form.name} onChange={e => set('name', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Email Address *</label><input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label">Password *</label>
                    <div style={{ position: 'relative' }}>
                      <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="Min 6 chars" value={form.password} onChange={e => set('password', e.target.value)} style={{ paddingRight: 38 }} />
                      <button type="button" onClick={() => setShowPass(p => !p)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>{showPass ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                    </div>
                  </div>
                  <div className="form-group"><label className="form-label">Confirm Password *</label><input className="form-input" type="password" placeholder="Repeat" value={form.confirm} onChange={e => set('confirm', e.target.value)} /></div>
                </div>
                <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" placeholder="+91 99999 99999" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>

                {role === 'doctor' ? (
                  <>
                    <div className="form-group"><label className="form-label">Specialization</label><select className="form-input form-select" value={form.specialization} onChange={e => set('specialization', e.target.value)}><option value="">Select specialization</option>{specs.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div className="form-group"><label className="form-label">Hospital / Clinic</label><input className="form-input" placeholder="Hospital name" value={form.hospital} onChange={e => set('hospital', e.target.value)} /></div>
                      <div className="form-group"><label className="form-label">Experience</label><input className="form-input" placeholder="e.g. 5 years" value={form.experience} onChange={e => set('experience', e.target.value)} /></div>
                    </div>
                  </>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div className="form-group"><label className="form-label">Age</label><input className="form-input" type="number" placeholder="Your age" value={form.age} onChange={e => set('age', e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Blood Group</label><select className="form-input form-select" value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)}><option value="">Select</option>{bloods.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
                  </div>
                )}

                <button className="btn" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: 13, fontSize: 14.5, marginTop: 6, borderRadius: 12, background: accentColor, color: '#fff', boxShadow: `0 4px 14px ${accentColor}40` }}>
                  {loading ? 'Creating account...' : `Create ${role === 'doctor' ? 'Doctor' : 'Patient'} Account`}
                </button>
              </form>
              <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13, marginTop: 18 }}>Already have an account? <Link to="/login" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
