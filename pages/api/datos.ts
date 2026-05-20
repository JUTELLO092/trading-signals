import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchHistoricalData, SYMBOLS } from '../../lib/marketData';
import type { DatosApiResponse } from '../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol = 'BTC-USD', range = '1mo', interval = '1d' } = req.query;
  const sym = String(symbol);
  const rng = String(range);
  const int = String(interval);

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

  try {
    const data = await fetchHistoricalData(sym, rng, int);
    if (data.length === 0) {
      const response: DatosApiResponse = {
        symbol: sym,
        name: SYMBOLS[sym] || sym,
        currentPrice: 0,
        change: 0,
        changePercent: 0,
        high: 0,
        low: 0,
        volume: 0,
        prices: [],
        error: 'Sin datos',
      };
      return res.status(200).json(response);
    }

    const closePrices = data.map(d => d.close);
    const currentPrice = closePrices[closePrices.length - 1];
    const prevPrice = closePrices[closePrices.length - 2] || currentPrice;
    const change = currentPrice - prevPrice;
    const changePercent = (change / prevPrice) * 100;

    const response: DatosApiResponse = {
      symbol: sym,
      name: SYMBOLS[sym] || sym,
      currentPrice,
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      high: Math.max(...data.map(d => d.high)),
      low: Math.min(...data.map(d => d.low)),
      volume: data[data.length - 1]?.volume || 0,
      prices: data,
    };

    res.status(200).json(response);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error desconocido';
    res.status(500).json({ error: msg });
  }
}