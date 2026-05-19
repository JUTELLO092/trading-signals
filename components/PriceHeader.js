export default function PriceHeader({ symbol, name, price, change, changePercent }) {
  const isUp = change >= 0;
  return (
    <div className="card" style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
      <div>
        <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 4 }}>{name}</div>
        <div style={{ fontSize: 14, color: 'var(--accent)', fontFamily: 'monospace' }}>{symbol}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 28, fontWeight: 700 }}>
          ${typeof price === 'number' ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '---'}
        </div>
        <div style={{ fontSize: 14, color: isUp ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
          {isUp ? '▲' : '▼'} {Math.abs(change).toFixed(2)} ({isUp ? '+' : ''}{changePercent?.toFixed(2)}%)
        </div>
      </div>
    </div>
  );
}
