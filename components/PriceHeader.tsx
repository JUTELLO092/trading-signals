import type { PriceHeaderProps } from '../types';

export default function PriceHeader({
  symbol,
  name,
  currentPrice,
  change,
  changePercent,
  high,
  low,
  volume,
}: PriceHeaderProps) {
  const isUp = change >= 0;

  return (
    <div
      className="card animate-fade-in"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      {/* Left */}
      <div>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 4, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          {name}
        </div>
        <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: 'var(--brand-cyan)', letterSpacing: 0.5 }}>
          {symbol}
        </div>
      </div>

      {/* Center - Price */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1, fontFamily: "'JetBrains Mono', monospace" }}>
          ${typeof currentPrice === 'number' ? currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '---'}
        </div>
        <div
          style={{
            fontSize: 14,
            color: isUp ? 'var(--success)' : 'var(--danger)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          <span>{isUp ? '▲' : '▼'}</span>
          <span>${Math.abs(change).toFixed(2)}</span>
          <span>({isUp ? '+' : ''}{changePercent?.toFixed(2)}%)</span>
        </div>
      </div>

      {/* Right - Stats */}
      <div style={{ display: 'flex', gap: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-dim)' }}>
        <div style={{ textAlign: 'right' }}>
          <div>Max 24h</div>
          <div style={{ color: 'var(--success)', fontWeight: 600, marginTop: 2 }}>
            ${high.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>Min 24h</div>
          <div style={{ color: 'var(--danger)', fontWeight: 600, marginTop: 2 }}>
            ${low.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>Volumen</div>
          <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginTop: 2 }}>
            {volume > 1_000_000 ? `${(volume / 1_000_000).toFixed(1)}M` : volume > 1_000 ? `${(volume / 1_000).toFixed(1)}K` : volume}
          </div>
        </div>
      </div>
    </div>
  );
}