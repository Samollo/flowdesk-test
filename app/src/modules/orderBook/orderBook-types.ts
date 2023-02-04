
export type GlobalPriceIndexParameters = {
  symbol: string;
  limit: number;
};

export interface OrderBook {
  asks: string[][];
  bids: string[][];
}
