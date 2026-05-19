import { LineChart, Line, ResponsiveContainer, Area, AreaChart, XAxis, YAxis, Tooltip } from 'recharts';

export default function MiniChart({ data, color = '#00d4ff' }) {
  if (!data || data.length === 0) {
    return <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>Cargando grafico...</div>;
  }

  const chartData = data.map(d => ({ date: d.date?.slice(5) || '', price: d.close }));

  return (
    <div className="card" style={{ marginTop: 20 }}>
      <h3 style={{ fontSize: 14, color: 'var(--text-dim)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
        Evolucion del Precio
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
          <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} width={80} />
          <Tooltip
            contentStyle={{ background: '#12121a', border: '1px solid #1e1e2a', borderRadius: 8, color: '#e2e2e2' }}
            formatter={(v) => [`$${v.toLocaleString()}`, 'Precio']}
          />
          <Area type="monotone" dataKey="price" stroke={color} fill="url(#gradient)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
