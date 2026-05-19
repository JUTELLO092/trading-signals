import { fetchHistoricalData, SYMBOLS } from '../../lib/marketData';

export default async function handler(req, res) {
  const { symbol = 'BTC-USD', range = '1mo', interval = '1d' } = req.query;

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

  try {
    const data = await fetchHistoricalData(symbol, range, interval);
    if (data.length === 0) {
      return res.status(200).json({ symbol, name: SYMBOLS[symbol] || symbol, prices: [], error: 'Sin datos' });
    }
    const closePrices = data.map(d => d.close);
    const currentPrice = closePrices[closePrices.length - 1];
    const prevPrice = closePrices[closePrices.length - 2] || currentPrice;
    const change = currentPrice - prevPrice;
    const changePercent = (change / prevPrice) * 100;

    res.status(200).json({
      symbol,
      name: SYMBOLS[symbol] || symbol,
      currentPrice,
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      high: Math.max(...data.map(d => d.high)),
      low: Math.min(...data.map(d => d.low)),
      volume: data[data.length - 1]?.volume || 0,
      prices: data
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
