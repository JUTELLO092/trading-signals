import { calcRSI, calcMACD, calcBollinger, calcSMA, generateSignal } from '../../lib/indicators';
import { fetchHistoricalData } from '../../lib/marketData';

export default async function handler(req, res) {
  const { symbol = 'BTC-USD', range = '1mo' } = req.query;

  try {
    const data = await fetchHistoricalData(symbol, range, '1d');
    if (data.length < 30) {
      return res.status(200).json({ symbol, error: 'Datos insuficientes', signal: { signal: 'NEUTRAL', confidence: 0, reason: 'Pocos datos' } });
    }

    const closes = data.map(d => d.close);
    const rsi = calcRSI(closes, 14);
    const macd = calcMACD(closes);
    const bollinger = calcBollinger(closes, 20);
    const sma20 = calcSMA(closes, 20);
    const sma50 = calcSMA(closes, 50);
    const signal = generateSignal(rsi, macd.macd);

    res.status(200).json({
      symbol,
      lastPrice: closes[closes.length - 1],
      rsi: rsi[rsi.length - 1] || null,
      macd: {
        value: macd.macd[macd.macd.length - 1] || null,
        signal: macd.signal[macd.signal.length - 1] || null,
        histogram: macd.macd.length > 0 && macd.signal.length > 0
          ? macd.macd[macd.macd.length - 1].value - (macd.signal[macd.signal.length - 1]?.value || 0)
          : 0
      },
      bollinger: bollinger[bollinger.length - 1] || null,
      sma20: sma20[sma20.length - 1] || null,
      sma50: sma50.length > 0 ? sma50[sma50.length - 1] : null,
      signal
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
