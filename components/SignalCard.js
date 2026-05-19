const SIGNAL_COLORS = {
  COMPRA: 'var(--success)',
  VENTA: 'var(--danger)',
  MANTENER: 'var(--warning)',
  COMPRA_DEBIL: '#22c55e80',
  NEUTRAL: 'var(--text-dim)'
};

const SIGNAL_BG = {
  COMPRA: 'rgba(34, 197, 94, 0.1)',
  VENTA: 'rgba(239, 68, 68, 0.1)',
  MANTENER: 'rgba(245, 158, 11, 0.1)',
  COMPRA_DEBIL: 'rgba(34, 197, 94, 0.05)',
  NEUTRAL: 'rgba(107, 114, 128, 0.1)'
};

export default function SignalCard({ symbol, name, price, change, rsi, signal, confidence, reason }) {
  const color = SIGNAL_COLORS[signal] || 'var(--text-dim)';
  const bg = SIGNAL_BG[signal] || 'rgba(255,255,255,0.02)';

  return (
    <div className="card glow-accent" style={{
      borderLeft: `3px solid ${color}`,
      background: bg,
      minWidth: 240,
      flex: 1
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 2 }}>{name}</div>
          <div style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'monospace' }}>{symbol}</div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>
          ${typeof price === 'number' ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '---'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color }}>{signal}</div>
        <div style={{ fontSize: 14, color: 'var(--text-dim)' }}>
          Confianza: <span style={{ color, fontWeight: 600 }}>{confidence}%</span>
        </div>
      </div>

      {rsi && <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 4 }}>RSI: {rsi}</div>}
      <div style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.4 }}>{reason}</div>
    </div>
  );
}
