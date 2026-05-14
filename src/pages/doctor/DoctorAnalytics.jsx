import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, Legend } from 'recharts';
import { Box, FileText, TrendingUp, Users, Activity } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', patients: 10, revenue: 8500 }, { day: 'Tue', patients: 14, revenue: 11200 },
  { day: 'Wed', patients: 8, revenue: 6400 }, { day: 'Thu', patients: 16, revenue: 13600 },
  { day: 'Fri', patients: 12, revenue: 9800 }, { day: 'Sat', patients: 6, revenue: 4900 }, { day: 'Sun', patients: 2, revenue: 1800 },
];
const conditionData = [
  { name: 'Hypertension', value: 32, color: 'var(--blue)' }, { name: 'Diabetes', value: 24, color: 'var(--green)' },
  { name: 'Arthritis', value: 18, color: 'var(--purple)' }, { name: 'Asthma', value: 14, color: 'var(--amber)' },
  { name: 'Others', value: 12, color: 'var(--red)' },
];
const monthlyTrend = [
  { month: 'Jan', patients: 98 }, { month: 'Feb', patients: 105 }, { month: 'Mar', patients: 112 },
  { month: 'Apr', patients: 124 }, { month: 'May', patients: 118 }, { month: 'Jun', patients: 130 },
];
const INVENTORY = [
  { item: 'Surgical Masks', stock: 1200, status: 'good' },
  { item: 'Nitrile Gloves', stock: 400, status: 'warning' },
  { item: 'Syringes (5ml)', stock: 50, status: 'critical' },
  { item: 'IV Fluids (RL)', stock: 240, status: 'good' }
];

const diseaseTrends = [
  { name: 'Viral Fever', value: 145, trend: '+12%', status: 'warning' },
  { name: 'Dengue', value: 42, trend: '+5%', status: 'critical' },
  { name: 'Typhoid', value: 28, trend: '-2%', status: 'stable' },
  { name: 'Common Cold', value: 210, trend: '+18%', status: 'warning' },
  { name: 'Asthma', value: 85, trend: '-5%', status: 'stable' }
];
const diseaseTimeline = [
  { week: 'W1', fever: 40, dengue: 5, cold: 60, typhoid: 10 },
  { week: 'W2', fever: 65, dengue: 12, cold: 85, typhoid: 12 },
  { week: 'W3', fever: 110, dengue: 25, cold: 140, typhoid: 15 },
  { week: 'W4', fever: 145, dengue: 42, cold: 210, typhoid: 28 },
];

export default function DoctorAnalytics() {
  const [tab, setTab] = useState('patient');

  return (
    <div className="page-wrapper animate-fadeIn">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>Analytics & Management</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Comprehensive overview of patients, outbreaks, and hospital operations</p>
      </div>

      <div className="tabs" style={{ marginBottom: 24, display: 'inline-flex', flexWrap: 'wrap', gap: 6 }}>
        <button className={`tab-btn ${tab === 'patient' ? 'active' : ''}`} onClick={() => setTab('patient')}>
          <Users size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} /> Patient Insights
        </button>
        <button className={`tab-btn ${tab === 'disease' ? 'active' : ''}`} onClick={() => setTab('disease')}>
          <Activity size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} /> Epidemiology Track
        </button>
        <button className={`tab-btn ${tab === 'hospital' ? 'active' : ''}`} onClick={() => setTab('hospital')}>
          <Box size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} /> Hospital Management
        </button>
      </div>

      {tab === 'patient' && (
        <div className="animate-fadeIn">
          {/* KPI Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
            {[
              { label: 'This Week', value: '68', sub: 'patients seen', color: 'var(--blue)' },
              { label: 'Est Revenue', value: '₹55.4k', sub: 'Calculated this week', color: 'var(--green)' },
              { label: 'Avg Rating', value: '4.9', sub: '★ from 97 reviews', color: 'var(--amber)' },
              { label: 'Avg Consult', value: '32m', sub: 'per appointment', color: 'var(--purple)' },
            ].map(k => (
              <div key={k.label} className="card" style={{ padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{k.label}</div>
                <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 34, fontWeight: 900, color: k.color }}>{k.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{k.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginBottom: 20 }}>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Weekly Patients & Generated Revenue</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyData} margin={{ left: -20, bottom: 0, right: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                  <YAxis yAxisId="left" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: 'var(--green)', fontSize: 11 }} tickFormatter={(val)=>`₹${val/1000}k`} />
                  <Tooltip formatter={(value, name) => name === 'Revenue' ? `₹${value}` : value} />
                  <Bar yAxisId="left" dataKey="patients" fill="var(--blue)" radius={[6, 6, 0, 0]} name="Patients" />
                  <Bar yAxisId="right" dataKey="revenue" fill="var(--green)" radius={[6, 6, 0, 0]} name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Conditions Distribution</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={conditionData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                    {conditionData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v}%`, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
                {conditionData.map(c => (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Monthly Patient Growth</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyTrend} margin={{ left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gPat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--purple)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--purple)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} domain={[80, 140]} />
                <Tooltip />
                <Area type="monotone" dataKey="patients" stroke="var(--purple)" fill="url(#gPat)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === 'disease' && (
        <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card" style={{ padding: 24, gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700 }}>Epidemiology Timeline: Viral Outbreaks</h3>
              <div className="badge badge-red" style={{ padding: '4px 10px' }}>Active Surveillance</div>
            </div>
            
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={diseaseTimeline} margin={{ left: -20, bottom: 0, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Line type="monotone" dataKey="fever" name="Viral Fever" stroke="var(--amber)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="cold" name="Common Cold" stroke="var(--blue)" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="dengue" name="Dengue" stroke="var(--red)" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="typhoid" name="Typhoid" stroke="var(--purple)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Live Symptom Surveillance</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', paddingBottom: 10, color: 'var(--text-muted)', fontSize: 12 }}>Vector / Symptom</th>
                  <th style={{ textAlign: 'left', paddingBottom: 10, color: 'var(--text-muted)', fontSize: 12 }}>Active Cases</th>
                  <th style={{ textAlign: 'right', paddingBottom: 10, color: 'var(--text-muted)', fontSize: 12 }}>W/W Trend</th>
                </tr>
              </thead>
              <tbody>
                {diseaseTrends.map(d => (
                  <tr key={d.name} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 0', fontSize: 13, fontWeight: 600 }}>{d.name}</td>
                    <td style={{ padding: '12px 0', fontSize: 13 }}>
                       {d.value} <span className={`badge badge-${d.status === 'warning' ? 'amber' : d.status === 'critical' ? 'red' : 'green'}`} style={{ marginLeft: 6 }}>{d.status}</span>
                    </td>
                    <td style={{ padding: '12px 0', fontSize: 12, textAlign: 'right', fontWeight: 700, color: d.trend.startsWith('+') ? 'var(--red)' : 'var(--green)' }}>{d.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="card" style={{ padding: 24 }}>
             <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Outbreak Warning Generator</h3>
             <div style={{ background: 'var(--red-light)', border: '1px solid rgba(239,68,68,0.2)', padding: 16, borderRadius: 12, marginBottom: 16 }}>
                <div style={{ color: 'var(--red)', fontWeight: 800, fontSize: 14, marginBottom: 6 }}>CRITICAL ALERT DEPLOYMENT</div>
                <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>
                   Based on the <b>+18% W/W spike</b> in <i>Common Cold & Viral Fever</i> vectors, the AI system recommends blasting a preemptive notification to all vulnerable patients logged in the metropolitan sector.
                </div>
             </div>
             <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'var(--red)', borderColor: 'var(--red)', marginTop: 'auto' }} onClick={()=>window.alert('Mass notification advisory broadcasted successfully to 2,143 susceptible patients!')}>Deploy Mass Advisory</button>
          </div>
        </div>
      )}

      {tab === 'hospital' && (
        <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Inventory Module */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Live Inventory (Wards)</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', paddingBottom: 10, color: 'var(--text-muted)', fontSize: 12 }}>Item Name</th>
                  <th style={{ textAlign: 'left', paddingBottom: 10, color: 'var(--text-muted)', fontSize: 12 }}>Stock count</th>
                  <th style={{ textAlign: 'left', paddingBottom: 10, color: 'var(--text-muted)', fontSize: 12 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {INVENTORY.map(inv => (
                  <tr key={inv.item} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 0', fontSize: 13, fontWeight: 600 }}>{inv.item}</td>
                    <td style={{ padding: '12px 0', fontSize: 13 }}>{inv.stock}</td>
                    <td style={{ padding: '12px 0' }}>
                      <span className={`badge badge-${inv.status === 'good' ? 'green' : inv.status === 'warning' ? 'amber' : 'red'}`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 20, justifyContent: 'center' }}>Place Stock Request</button>
          </div>

          {/* Department Records / Financials Mock */}
          <div className="card" style={{ padding: 24 }}>
             <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Revenue (Records)</h3>
             <div style={{ background: 'var(--bg-input)', padding: 20, borderRadius: 16, textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Monthly Total</div>
                <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 40, fontWeight: 900, color: 'var(--green)' }}>₹4,50,000</div>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>OPD Consultations</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>₹2,10,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Lab & Diagnostics</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>₹1,40,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Pharmacy (In-house)</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>₹1,00,000</span>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
