import Badge from './ui/Badge';
import type { SignalCardProps, SignalType } from '../types';

const SIGNAL_META: Record<SignalType, { label: string; bg: string; border: string }> = {
  COMPRA: { label: 'COMPRA', bg: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.3)' },
  VENTA: { label: 'VENTA', bg: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)' },
  MANTENER: { label: 'MANTENER', bg: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)' },
  COMPRA_DEBIL: { label: 'COMPRA DEBIL', bg: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.15)' },
  NEUTRAL: { label: 'NEUTRAL', bg: 'rgba(107, 114, 128, 0.06)', border: '1px solid rgba(107, 114, 128, 0.2)' },
};

export default function SignalCard({ symbol, name, price, change, rsi, signal, confidence, reason }: SignalCardProps) {
  const meta = SIGNAL_META[signal] || SIGNAL_META.NEUTRAL;
  const badgeVariant = signal === 'COMPRA' ? 'success' : signal === 'VENTA' ? 'danger' : signal === 'MANTENER' ? 'warning' : 'default';
  const isUp = parseFloat(change) >= 0;

  return (
    <div
      className="card card-interactive animate-fade-in"
      style={{
        borderLeft: `3px solid ${meta.border.replace('1px solid ', '')}`,
        background: meta.bg,
        minWidth: 260,
        flex: 1,
        maxWidth: 360,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 2, fontWeight: 500 }}>{name}</div>
          <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--brand-cyan)' }}>
            {symbol}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
            ${typeof price === 'number' ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '---'}
          </div>
          <div style={{ fontSize: 11, color: isUp ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
            {isUp ? '▲' : '▼'} {change}%
          </div>
        </div>
      </div>

      {/* Signal */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          padding: '8px 12px',
          borderRadius: 8,
          background: 'rgba(0,0,0,0.2)',
          border: meta.border,
        }}
      >
        <Badge variant={badgeVariant} size="md">
          {meta.label}
        </Badge>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: "'JetBrains Mono', monospace" }}>
          Confianza:{' '}
          <span
            style={{
              color: confidence >= 70 ? 'var(--success)' : confidence >= 50 ? 'var(--warning)' : 'var(--text-dim)',
              fontWeight: 700,
            }}
          >
            {confidence}%
          </span>
        </div>
      </div>

      {/* Details */}
      <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-dim)', fontFamily: "'JetBrains Mono', monospace" }}>
        {rsi !== null && (
          <div>
            RSI:{' '}
            <span
              style={{
                color: rsi > 70 ? 'var(--danger)' : rsi < 30 ? 'var(--success)' : 'var(--text-secondary)',
                fontWeight: 600,
              }}
            >
              {rsi}
            </span>
          </div>
        )}
      </div>

      {/* Reason */}
      <div style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.5, marginTop: 8, fontStyle: 'italic' }}>
        {reason}
      </div>
    </div>
  );
}