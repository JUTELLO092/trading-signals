import { calcRSI, calcMACD, generateSignal } from '../../lib/indicators';
import { fetchHistoricalData, SYMBOLS } from '../../lib/marketData';

const TOP_SYMBOLS = ['BTC-USD', 'ETH-USD', 'SOL-USD', '^GSPC'];

export default async function handler(req, res) {
  try {
    const results = [];
    for (const symbol of TOP_SYMBOLS) {
      const data = await fetchHistoricalData(symbol, '1mo', '1d');
      if (data.length < 20) continue;

      const closes = data.map(d => d.close);
      const rsi = calcRSI(closes, 14);
      const macd = calcMACD(closes);
      const signal = generateSignal(rsi, macd.macd);

      results.push({
        symbol,
        name: SYMBOLS[symbol] || symbol,
        price: closes[closes.length - 1],
        change: ((closes[closes.length - 1] - closes[closes.length - 2]) / closes[closes.length - 2] * 100).toFixed(2),
        rsi: rsi.length > 0 ? parseFloat(rsi[rsi.length - 1].value.toFixed(1)) : null,
        signal: signal.signal,
        confidence: signal.confidence,
        reason: signal.reason
      });
    }

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.status(200).json({ signals: results, updatedAt: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
