import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PriceHeader from '../components/PriceHeader';
import SignalCard from '../components/SignalCard';
import MiniChart from '../components/MiniChart';

const TOP_SYMBOLS = ['BTC-USD', 'ETH-USD', 'SOL-USD', '^GSPC'];
const DEFAULT_SYMBOL = 'BTC-USD';

export default function Home() {
  const [signals, setSignals] = useState([]);
  const [priceData, setPriceData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(DEFAULT_SYMBOL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch signals for all symbols
        const senalesRes = await fetch('/api/senales');
        if (!senalesRes.ok) throw new Error('Error al obtener senales');
        const senalesData = await senalesRes.json();
        setSignals(senalesData.signals || []);
        setLastUpdate(senalesData.updatedAt);

        // Fetch detailed data for default symbol
        const datosRes = await fetch(`/api/datos?symbol=${selectedSymbol}&range=2mo`);
        if (!datosRes.ok) throw new Error('Error al obtener datos');
        const datosData = await datosRes.json();
        setPriceData(datosData);
        setChartData(datosData.prices || []);
      } catch (e) {
        setError(e.message);
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
    // Refresh every 5 minutes
    const interval = setInterval(loadData, 300000);
    return () => clearInterval(interval);
  }, [selectedSymbol]);

  const handleSymbolChange = async (sym) => {
    setSelectedSymbol(sym);
    setLoading(true);
    try {
      const res = await fetch(`/api/datos?symbol=${sym}&range=2mo`);
      const data = await res.json();
      setPriceData(data);
      setChartData(data.prices || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -1, margin: 0 }}>
              Trading Signals
            </h1>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4 }}>
              Analisis inteligente de mercado
            </div>
          </div>
          {lastUpdate && (
            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              Actualizado: {new Date(lastUpdate).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="card" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: 20, textAlign: 'center', padding: 12 }}>
          <div style={{ color: 'var(--danger)', fontSize: 14 }}>Error: {error}</div>
          <div style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 4 }}>Actualiza la pagina o intenta mas tarde</div>
        </div>
      )}

      {/* Loading State */}
      {loading && signals.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 14, color: 'var(--text-dim)' }}>Cargando datos del mercado...</div>
        </div>
      )}

      {/* Price Header */}
      {priceData && <PriceHeader {...priceData} />}

      {/* Symbol Selector */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {TOP_SYMBOLS.map(sym => (
          <button key={sym} onClick={() => handleSymbolChange(sym)} style={{
            padding: '6px 16px',
            borderRadius: 8,
            border: `1px solid ${selectedSymbol === sym ? 'var(--accent)' : 'var(--border)'}`,
            background: selectedSymbol === sym ? 'rgba(0,212,255,0.1)' : 'transparent',
            color: selectedSymbol === sym ? 'var(--accent)' : 'var(--text-dim)',
            fontWeight: selectedSymbol === sym ? 600 : 400,
            cursor: 'pointer',
            fontSize: 12,
            fontFamily: 'monospace'
          }}>
            {sym}
          </button>
        ))}
      </div>

      {/* Chart */}
      {chartData.length > 0 && <MiniChart data={chartData} />}

      {/* Signal Cards */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
          Senales del Mercado
        </h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {signals.length > 0 ? signals.map(s => (
            <SignalCard key={s.symbol} {...s} />
          )) : !loading && (
            <div style={{ color: 'var(--text-dim)', fontSize: 13 }}>No hay senales disponibles</div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 40, padding: '16px 0', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: 11, color: 'var(--text-dim)' }}>
        Trading Signals v1.0 | Los datos son proporcionados por Yahoo Finance | No es asesoramiento financiero
      </div>
    </Layout>
  );
}
