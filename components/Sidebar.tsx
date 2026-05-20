import React, { useState } from 'react';

interface NavItem {
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: '📊', href: '/' },
  { label: 'Senales', icon: '🔔', href: '/senales' },
  { label: 'Analisis', icon: '🔍', href: '/analisis' },
  { label: 'Portafolio', icon: '💼', href: '/portafolio' },
  { label: 'Alertas', icon: '⚡', href: '/alertas' },
  { label: 'Historial', icon: '📜', href: '/historial' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
    background: 'var(--bg-secondary)',
    borderRight: '1px solid var(--border-default)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
    transition: 'width 300ms ease',
    overflow: 'hidden',
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: collapsed ? '16px 12px' : '16px 20px',
    borderBottom: '1px solid var(--border-default)',
    minHeight: 'var(--header-height)',
  };

  const logoIconStyle: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: 10,
    background: 'linear-gradient(135deg, var(--brand-purple), var(--brand-cyan))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 800,
    color: '#fff',
    flexShrink: 0,
  };

  const navStyle: React.CSSProperties = {
    flex: 1,
    padding: collapsed ? '12px 8px' : '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    overflowY: 'auto',
  };

  const itemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: collapsed ? '10px 0' : '10px 14px',
    borderRadius: 10,
    cursor: 'pointer',
    background: isActive ? 'rgba(124, 58, 237, 0.12)' : 'transparent',
    color: isActive ? 'var(--brand-purple)' : 'var(--text-secondary)',
    transition: 'all 200ms ease',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: isActive ? 600 : 400,
    justifyContent: collapsed ? 'center' : 'flex-start',
    border: isActive ? '1px solid rgba(124, 58, 237, 0.25)' : '1px solid transparent',
    position: 'relative' as const,
  });

  const iconStyle: React.CSSProperties = {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
    flexShrink: 0,
  };

  const badgeStyle: React.CSSProperties = {
    marginLeft: 'auto',
    background: 'var(--brand-purple)',
    color: '#fff',
    fontSize: 10,
    fontWeight: 700,
    padding: '1px 6px',
    borderRadius: 10,
    minWidth: 18,
    textAlign: 'center',
  };

  const toggleStyle: React.CSSProperties = {
    padding: collapsed ? '12px 0' : '12px 20px',
    borderTop: '1px solid var(--border-default)',
    cursor: 'pointer',
    color: 'var(--text-dim)',
    fontSize: 12,
    textAlign: collapsed ? 'center' : 'left',
    transition: 'color 200ms ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'flex-start',
    gap: 8,
  };

  return (
    <aside style={sidebarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
        <div style={logoIconStyle}>I</div>
        {!collapsed && (
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.5 }}>
            IRIEL <span style={{ color: 'var(--brand-cyan)', fontWeight: 300 }}>Trading</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav style={navStyle}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/';
          return (
            <div
              key={item.href}
              style={itemStyle(isActive)}
              title={collapsed ? item.label : undefined}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={iconStyle}>{item.icon}</span>
              {!collapsed && (
                <>
                  <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
                  {item.badge && <span style={badgeStyle}>{item.badge}</span>}
                </>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div
        style={toggleStyle}
        onClick={() => setCollapsed(!collapsed)}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; }}
      >
        <span>{collapsed ? '▶' : '◀'}</span>
        {!collapsed && <span style={{ fontSize: 11 }}>Colapsar</span>}
      </div>
    </aside>
  );
}