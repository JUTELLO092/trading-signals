import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  lastUpdate?: string | null;
  actions?: React.ReactNode;
}

export default function Header({ title, subtitle, lastUpdate, actions }: HeaderProps) {
  return (
    <header
      className="glass"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '8px 24px',
        marginBottom: 24,
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
        minHeight: 56,
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {/* Left: Title */}
      <div>
        <h1
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: -0.5,
            margin: 0,
            background: 'linear-gradient(135deg, var(--text-primary), var(--brand-cyan))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>
            {subtitle}
          </div>
        )}
      </div>

      {/* Right: Actions + Last Update */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {lastUpdate && (
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-dim)',
              fontFamily: "'JetBrains Mono', monospace",
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--success)',
                animation: 'pulseGlow 2s ease-in-out infinite',
              }}
            />
            {new Date(lastUpdate).toLocaleTimeString()}
          </div>
        )}
        {actions}
      </div>
    </header>
  );
}