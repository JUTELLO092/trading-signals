import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  lastUpdate?: string | null;
}

export default function Layout({ children, title = 'Dashboard', subtitle, lastUpdate }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | IRIEL Trading</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="IRIEL Trading - Analisis inteligente de mercado" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📈</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            marginLeft: 'var(--sidebar-width)',
            padding: '20px 28px',
            maxWidth: 'calc(100vw - var(--sidebar-width))',
            transition: 'margin-left 300ms ease',
          }}
        >
          {/* Sticky Header with title, subtitle, lastUpdate */}
          {title && (
            <div
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
            </div>
          )}

          {/* Page content with staggered animation */}
          <div className="stagger">
            {children}
          </div>

          {/* Footer */}
          <footer
            style={{
              marginTop: 48,
              padding: '16px 0',
              borderTop: '1px solid var(--border-default)',
              textAlign: 'center',
              fontSize: 11,
              color: 'var(--text-dim)',
              letterSpacing: 0.3,
            }}
          >
            IRIEL Trading v2.0 | Datos: Yahoo Finance | No es asesoramiento financiero
          </footer>
        </main>
      </div>
    </>
  );
}