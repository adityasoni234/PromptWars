import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

const weeklyData = [
  { day: 'Mon', patients: 10, revenue: 8500 }, { day: 'Tue', patients: 14, revenue: 11200 },
  { day: 'Wed', patients: 8, revenue: 6400 }, { day: 'Thu', patients: 16, revenue: 13600 },
  { day: 'Fri', patients: 12, revenue: 9800 }, { day: 'Sat', patients: 6, revenue: 4900 }, { day: 'Sun', patients: 2, revenue: 1800 },
];
const conditionData = [
  { name: 'Hypertension', value: 32, color: '#00a8ff' }, { name: 'Diabetes', value: 24, color: '#00e676' },
  { name: 'Arthritis', value: 18, color: '#7c4dff' }, { name: 'Asthma', value: 14, color: '#ff9100' },
  { name: 'Others', value: 12, color: '#ff4757' },
];
const monthlyTrend = [
  { month: 'Jan', patients: 98 }, { month: 'Feb', patients: 105 }, { month: 'Mar', patients: 112 },
  { month: 'Apr', patients: 124 }, { month: 'May', patients: 118 }, { month: 'Jun', patients: 130 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 10, padding: '10px 14px' }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      {payload.map(p => <div key={p.name} style={{ color: p.color || 'var(--accent-blue)', fontSize: 13, fontWeight: 600 }}>{p.name}: {p.value}</div>)}
    </div>
  );
};

export default function DoctorAnalytics() {
  return (
    <div className="page-wrapper animate-fadeIn">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Analytics</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Insights into your practice performance</p>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'This Week', value: '68', sub: 'patients seen', color: 'var(--accent-blue)' },
          { label: 'Avg Rating', value: '4.9', sub: '★ from 97 reviews', color: 'var(--accent-orange)' },
          { label: 'Recovery Rate', value: '94%', sub: 'of treated patients', color: 'var(--accent-green)' },
          { label: 'Avg Consult', value: '32m', sub: 'per appointment', color: 'var(--accent-purple)' },
        ].map(k => (
          <div key={k.label} className="card" style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 34, fontWeight: 900, color: k.color }}>{k.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Weekly Bar */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Weekly Patient Volume</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} margin={{ left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="patients" fill="var(--accent-blue)" radius={[6, 6, 0, 0]} name="Patients" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {conditionData.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1 }}>{c.name}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Monthly Patient Growth</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={monthlyTrend} margin={{ left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gPat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c4dff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7c4dff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} domain={[80, 140]} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="patients" stroke="#7c4dff" fill="url(#gPat)" strokeWidth={2.5} name="Patients" dot={{ fill: '#7c4dff', r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
