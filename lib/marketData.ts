import type { PricePoint } from '../types';

const YAHOO_BASE = "https://query1.finance.yahoo.com/v8/finance/chart";

export async function fetchHistoricalData(
  symbol: string,
  range = "1mo",
  interval = "1d"
): Promise<PricePoint[]> {
  const url = `${YAHOO_BASE}/${symbol}?range=${range}&interval=${interval}&includePrePost=false`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const result = data.chart.result[0];
    const timestamps: number[] = result.timestamp;
    const quotes = result.indicators.quote[0];
    const adjclose: number[] = result.indicators.adjclose?.[0]?.adjclose || quotes.close;

    return timestamps
      .map((t: number, i: number) => ({
        date: new Date(t * 1000).toISOString().split("T")[0],
        time: t,
        open: quotes.open[i],
        high: quotes.high[i],
        low: quotes.low[i],
        close: quotes.close[i],
        volume: quotes.volume[i],
        adjclose: adjclose[i],
      }))
      .filter((d: PricePoint) => d.close !== null && d.close !== undefined);
  } catch (e) {
    console.error("Error fetching data:", e);
    return [];
  }
}

export async function fetchMultipleSymbols(symbols: string[]): Promise<Record<string, PricePoint[]>> {
  const results: Record<string, PricePoint[]> = {};
  for (const sym of symbols) {
    const data = await fetchHistoricalData(sym);
    results[sym] = data;
  }
  return results;
}

export const SYMBOLS: Record<string, string> = {
  "BTC-USD": "Bitcoin",
  "ETH-USD": "Ethereum",
  "SOL-USD": "Solana",
  "^GSPC": "S&P 500",
  "EURUSD=X": "EUR/USD",
  "GC=F": "Oro",
  "TSLA": "Tesla",
  "AAPL": "Apple",
};