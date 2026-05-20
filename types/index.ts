// IRIEL Trading - Tipos centralizados

export interface PricePoint {
  date: string;
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjclose: number;
}

export interface SignalData {
  symbol: string;
  name: string;
  price: number;
  change: string;
  rsi: number | null;
  signal: SignalType;
  confidence: number;
  reason: string;
}

export type SignalType = 'COMPRA' | 'VENTA' | 'MANTENER' | 'COMPRA_DEBIL' | 'NEUTRAL';

export interface IndicatorValue {
  value: number;
  index: number;
}

export interface MACDResult {
  macd: IndicatorValue[];
  signal: IndicatorValue[];
}

export interface BollingerBand {
  middle: number;
  upper: number;
  lower: number;
  index: number;
}

export interface PriceHeaderProps {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  prices: PricePoint[];
}

export interface SignalCardProps {
  symbol: string;
  name: string;
  price: number;
  change: string;
  rsi: number | null;
  signal: SignalType;
  confidence: number;
  reason: string;
}

export interface MiniChartProps {
  data: PricePoint[];
  color?: string;
}

export interface SignalResponse {
  signal: SignalType;
  confidence: number;
  reason: string;
}

export interface AnalysisResponse {
  symbol: string;
  lastPrice: number;
  rsi: IndicatorValue | null;
  macd: {
    value: number | null;
    signal: number | null;
    histogram: number;
  };
  bollinger: BollingerBand | null;
  sma20: IndicatorValue | null;
  sma50: IndicatorValue | null;
  signal: SignalResponse;
  error?: string;
}

export interface SenalesApiResponse {
  signals: SignalData[];
  updatedAt: string;
}

export interface DatosApiResponse {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  prices: PricePoint[];
  error?: string;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
  badge?: number;
}