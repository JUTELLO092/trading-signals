import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'purple' | 'cyan';
  size?: 'sm' | 'md';
  className?: string;
  style?: React.CSSProperties;
}

const VARIANT: Record<string, { color: string; bg: string; border: string }> = {
  default: { color: 'var(--text-dim)', bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.2)' },
  success: { color: 'var(--success)', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' },
  danger:  { color: 'var(--danger)', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)' },
  warning: { color: 'var(--warning)', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  purple:  { color: 'var(--brand-purple)', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.25)' },
  cyan:    { color: 'var(--brand-cyan)', bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.25)' },
};

const SIZES: Record<string, React.CSSProperties> = {
  sm: { padding: '2px 8px', fontSize: 10, borderRadius: 4 },
  md: { padding: '3px 10px', fontSize: 11, borderRadius: 6 },
};

export default function Badge({ children, variant = 'default', size = 'md', className = '', style }: BadgeProps) {
  const v = VARIANT[variant];
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 600,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        background: v.bg,
        color: v.color,
        border: `1px solid ${v.border}`,
        ...SIZES[size],
        ...style,
      }}
    >
      {children}
    </span>
  );
}