// Calculo de SMA (Simple Moving Average)
export function calcSMA(data, period) {
  const result = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push({ value: sum / period, index: i });
  }
  return result;
}

// Calculo de EMA (Exponential Moving Average)
export function calcEMA(data, period) {
  const multiplier = 2 / (period + 1);
  const result = [{ value: data.slice(0, period).reduce((a, b) => a + b, 0) / period, index: period - 1 }];
  for (let i = period; i < data.length; i++) {
    const ema = (data[i] - result[result.length - 1].value) * multiplier + result[result.length - 1].value;
    result.push({ value: ema, index: i });
  }
  return result;
}

// RSI (Relative Strength Index)
export function calcRSI(data, period = 14) {
  if (data.length < period + 1) return [];
  const gains = [], losses = [];
  for (let i = 1; i < data.length; i++) {
    const diff = data[i] - data[i - 1];
    gains.push(diff > 0 ? diff : 0);
    losses.push(diff < 0 ? -diff : 0);
  }
  const result = [];
  let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
  let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;
  result.push({ value: 100 - (100 / (1 + avgGain / (avgLoss || 0.001))), index: period });
  for (let i = period; i < gains.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
    result.push({ value: 100 - (100 / (1 + avgGain / (avgLoss || 0.001))), index: i + 1 });
  }
  return result;
}

// MACD
export function calcMACD(data) {
  const ema12 = calcEMA(data, 12);
  const ema26 = calcEMA(data, 26);
  const macdLine = [];
  const start = Math.max(ema12[0]?.index || 0, ema26[0]?.index || 0);
  for (let i = 0; i < ema12.length; i++) {
    const e26 = ema26.find(e => e.index === ema12[i].index);
    if (e26) macdLine.push({ value: ema12[i].value - e26.value, index: ema12[i].index });
  }
  const signal = calcEMA(macdLine.map(m => m.value), 9);
  return { macd: macdLine, signal };
}

// Bollinger Bands
export function calcBollinger(data, period = 20) {
  const sma = calcSMA(data, period);
  return sma.map(s => {
    const slice = data.slice(s.index - period + 1, s.index + 1);
    const variance = slice.reduce((sum, v) => sum + (v - s.value) ** 2, 0) / period;
    const std = Math.sqrt(variance);
    return { middle: s.value, upper: s.value + 2 * std, lower: s.value - 2 * std, index: s.index };
  });
}

// Generar senal basada en RSI + MACD
export function generateSignal(rsi, macd) {
  if (!rsi || rsi.length === 0) return { signal: "NEUTRAL", confidence: 0, reason: "Sin datos suficientes" };

  const lastRSI = rsi[rsi.length - 1].value;
  const lastMACD = macd && macd.length > 0 ? macd[macd.length - 1].value : 0;
  const prevMACD = macd && macd.length > 1 ? macd[macd.length - 2].value : 0;
  const macdCrossover = prevMACD < 0 && lastMACD >= 0;
  const macdCrossunder = prevMACD > 0 && lastMACD <= 0;

  // Logica de decision
  if (lastRSI < 35 && macdCrossover) {
    return { signal: "COMPRA", confidence: Math.min(Math.round((35 - lastRSI) * 3 + 50), 95), reason: `RSI en ${lastRSI.toFixed(1)} (sobreventa) + MACD alcista` };
  }
  if (lastRSI < 30) {
    return { signal: "COMPRA", confidence: Math.min(Math.round((30 - lastRSI) * 2 + 40), 85), reason: `RSI en ${lastRSI.toFixed(1)} - zona de sobreventa` };
  }
  if (lastRSI > 70 && macdCrossunder) {
    return { signal: "VENTA", confidence: Math.min(Math.round((lastRSI - 70) * 3 + 50), 95), reason: `RSI en ${lastRSI.toFixed(1)} (sobrecompra) + MACD bajista` };
  }
  if (lastRSI > 75) {
    return { signal: "VENTA", confidence: Math.min(Math.round((lastRSI - 75) * 2 + 40), 85), reason: `RSI en ${lastRSI.toFixed(1)} - zona de sobrecompra` };
  }
  if (lastRSI >= 40 && lastRSI <= 60 && Math.abs(lastMACD) < 10) {
    return { signal: "MANTENER", confidence: 55, reason: `RSI neutro (${lastRSI.toFixed(1)}) - mercado lateral` };
  }
  if (lastRSI < 45 && lastMACD > 0) {
    return { signal: "COMPRA_DEBIL", confidence: 50, reason: `RSI ${lastRSI.toFixed(1)} con MACD positivo - tendencia debil alcista` };
  }
  return { signal: "MANTENER", confidence: 40, reason: `Sin senal clara - RSI ${lastRSI.toFixed(1)}` };
}
