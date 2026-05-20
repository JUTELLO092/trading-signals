import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import type { MiniChartProps } from '../types';

export default function MiniChart({ data, color = '#00d4ff' }: MiniChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="card" style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-dim)', fontSize: 13 }}>Cargando grafico...</div>
      </div>
    );
  }

  const chartData = data.map((d) => ({
    date: d.date?.slice(5) || '',
    price: d.close,
  }));

  const prices = chartData.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const padding = (maxPrice - minPrice) * 0.05 || maxPrice * 0.02;

  return (
    <div className="card animate-fade-in" style={{ marginTop: 20 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h3
          style={{
            fontSize: 12,
            color: 'var(--text-dim)',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            fontWeight: 600,
          }}
        >
          Evolucion del Precio
        </h3>
        <div style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: "'JetBrains Mono', monospace" }}>
          {data.length} datos &middot; {data[0]?.date || '---'} &rarr; {data[data.length - 1]?.date || '---'}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
            dy={8}
          />
          <YAxis
            domain={[minPrice - padding, maxPrice + padding]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
            width={80}
            tickFormatter={(v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 0 })}`}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(18, 18, 31, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 8,
              color: '#e8e8f0',
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            }}
            formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'Precio']}
            labelFormatter={(label: string) => `Fecha: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill="url(#chartGradient)"
            dot={false}
            activeDot={{ r: 4, fill: color, stroke: 'var(--bg-card)', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}