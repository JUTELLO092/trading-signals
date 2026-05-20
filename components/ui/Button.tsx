import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

const VARIANT_STYLES: Record<string, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, var(--brand-purple), var(--brand-cyan-dim))',
    color: '#fff',
    border: 'none',
  },
  secondary: {
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-default)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: 'none',
  },
  success: {
    background: 'rgba(34, 197, 94, 0.15)',
    color: 'var(--success)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
  },
  danger: {
    background: 'rgba(239, 68, 68, 0.15)',
    color: 'var(--danger)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
};

const SIZE_STYLES: Record<string, React.CSSProperties> = {
  sm: { padding: '4px 12px', fontSize: 12, borderRadius: 6 },
  md: { padding: '8px 20px', fontSize: 13, borderRadius: 8 },
  lg: { padding: '12px 28px', fontSize: 14, borderRadius: 10 },
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  style,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontWeight: 600,
        fontFamily: 'Inter, sans-serif',
        transition: 'all 250ms ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: fullWidth ? '100%' : undefined,
        ...VARIANT_STYLES[variant],
        ...SIZE_STYLES[size],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && variant === 'secondary') {
          e.currentTarget.style.borderColor = 'var(--border-accent)';
          e.currentTarget.style.background = 'var(--bg-card-hover)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant === 'secondary') {
          e.currentTarget.style.borderColor = 'var(--border-default)';
          e.currentTarget.style.background = 'var(--bg-card)';
        }
      }}
    >
      {children}
    </button>
  );
}