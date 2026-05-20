import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import PriceHeader from '../components/PriceHeader';
import SignalCard from '../components/SignalCard';
import MiniChart from '../components/MiniChart';
import Badge from '../components/ui/Badge';
import type { PricePoint, SignalData, SenalesApiResponse, DatosApiResponse } from '../types';

const TOP_SYMBOLS = ['BTC-USD', 'ETH-USD', 'SOL-USD', '^GSPC'] as const;
const DEFAULT_SYMBOL = 'BTC-USD';

type SymbolType = (typeof TOP_SYMBOLS)[number];

export default function Home() {
  const [signals, setSignals] = useState<SignalData[]>([]);
  const [priceData, setPriceData] = useState<DatosApiResponse | null>(null);
  const [chartData, setChartData] = useState<PricePoint[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolType>(DEFAULT_SYMBOL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  // Load all signals + price data for selected symbol
  const loadAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [senalesRes, datosRes] = await Promise.all([
        fetch('/api/senales'),
        fetch(`/api/datos?symbol=${selectedSymbol}&range=2mo`),
      ]);

      if (!senalesRes.ok) throw new Error(`Error API senales: ${senalesRes.status}`);
      if (!datosRes.ok) throw new Error(`Error API datos: ${datosRes.status}`);

      const senalesData: SenalesApiResponse = await senalesRes.json();
      const datosData: DatosApiResponse = await datosRes.json();

      setSignals(senalesData.signals || []);
      setLastUpdate(senalesData.updatedAt);
      setPriceData(datosData);
      setChartData(datosData.prices || []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error desconocido';
      setError(msg);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [selectedSymbol]);

  useEffect(() => {
    loadAllData();
    const interval = setInterval(loadAllData, 300000); // 5 min
    return () => clearInterval(interval);
  }, [loadAllData]);

  const handleSymbolChange = async (sym: SymbolType) => {
    setSelectedSymbol(sym);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/datos?symbol=${sym}&range=2mo`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data: DatosApiResponse = await res.json();
      setPriceData(data);
      setChartData(data.prices || []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error desconocido';
      setError(msg);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadingSkeleton = (
    <div>
      <div className="skeleton" style={{ height: 80, marginBottom: 16 }} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {TOP_SYMBOLS.map((s) => (
          <div key={s} className="skeleton" style={{ width: 100, height: 32, borderRadius: 8 }} />
        ))}
      </div>
      <div className="skeleton" style={{ height: 300, marginBottom: 20 }} />
      <div style={{ display: 'flex', gap: 16 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton" style={{ flex: 1, height: 160, borderRadius: 16 }} />
        ))}
      </div>
    </div>
  );

  return (
    <Layout title="Dashboard" subtitle="Panel principal de monitoreo" lastUpdate={lastUpdate}>
      {/* Loading skeleton */}
      {loading && signals.length === 0 && loadingSkeleton}

      {/* Error state */}
      {error && (
        <div
          className="card"
          style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.3)',
            marginBottom: 20,
            textAlign: 'center',
            padding: 16,
          }}
        >
          <div style={{ color: 'var(--danger)', fontSize: 14, fontWeight: 600 }}>
            ⚠ Error: {error}
          </div>
          <div style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 6 }}>
            Actualiza la pagina o intenta mas tarde
          </div>
        </div>
      )}

      {/* Price Header */}
      {priceData && !error && (
        <div style={{ marginBottom: 20 }}>
          <PriceHeader {...priceData} />
        </div>
      )}

      {/* Symbol Selector */}
      <div
        className="card"
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 20,
          padding: '12px 16px',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginRight: 8 }}>
          Activos
        </span>
        {TOP_SYMBOLS.map((sym) => (
          <button
            key={sym}
            onClick={() => handleSymbolChange(sym)}
            style={{
              padding: '6px 16px',
              borderRadius: 8,
              border: `1px solid ${selectedSymbol === sym ? 'var(--brand-purple)' : 'var(--border-default)'}`,
              background: selectedSymbol === sym ? 'rgba(124,58,237,0.12)' : 'transparent',
              color: selectedSymbol === sym ? 'var(--brand-purple)' : 'var(--text-secondary)',
              fontWeight: selectedSymbol === sym ? 600 : 400,
              cursor: 'pointer',
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              transition: 'all 200ms ease',
              letterSpacing: 0.5,
            }}
            onMouseEnter={(e) => {
              if (selectedSymbol !== sym) {
                e.currentTarget.style.borderColor = 'var(--border-accent)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedSymbol !== sym) {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }
            }}
          >
            {sym}
          </button>
        ))}
      </div>

      {/* Chart */}
      {chartData.length > 0 && !error && <MiniChart data={chartData} />}

      {/* Signals Section */}
      <div style={{ marginTop: 32 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <h2
            style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              fontWeight: 600,
            }}
          >
            Senales del Mercado
          </h2>
          {signals.length > 0 && (
            <Badge variant="purple" size="sm">
              {signals.length} activos
            </Badge>
          )}
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {signals.length > 0
            ? signals.map((s) => <SignalCard key={s.symbol} {...s} />)
            : !loading && (
                <div
                  className="card"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: 32,
                    color: 'var(--text-dim)',
                    fontSize: 13,
                  }}
                >
                  No hay senales disponibles en este momento
                </div>
              )}
        </div>
      </div>
    </Layout>
  );
}