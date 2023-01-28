export const binanceWebSocketUrl = "wss://ws-api.binance.com:443/ws-api/v3";

export const krakenUrl = `https://api.kraken.com/0/public/Depth?pair=BTCUSDT&count=20`;
export const huobiUrl = `https://api.huobi.pro/market/depth?symbol=btcusdt&depth=20&type=step0`;

export type BinanceOrderBookResponse = {
  id: string;
  status: number;
  result: BinanceOrderBook;
  rateLimits: {
    rateLimitType: string;
    interval: string;
    intervalNum: number;
    limit: number;
    count: number;
  }[];
};

export type BinanceOrderBook = {
  lastUpdateId: number;
  bids: string[][]; // [Price, Quantity]
  asks: string[][];
};

export type KrakenPair = {
  asks: string[][];
  bids: string[][];
};

export type KrakenOrderBookResponse = {
  result: {
    [key: string]: KrakenPair;
  };
  error: string[];
};

export type HuobiOrderBookResponse = {
  ch: string;
  status: string;
  ts: number;
  tick: { ts: number; version: number; bids: string[][]; asks: string[][] };
};
