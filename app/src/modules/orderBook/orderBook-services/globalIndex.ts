import { OrderBook } from "../orderBook-types";

export const computeMidPrice = (orderBook: OrderBook) => {
  const { asks, bids } = orderBook;
  if (asks.length === 0 || bids.length === 0) {
    console.warn("computeMidPrice: inputs are empty");
    return 0;
  }

  let minAsk = Number.POSITIVE_INFINITY;
  asks.forEach((arr) => {
    const value = Number(arr[0]);
    if (isNaN(value)) {
      console.warn('computeMidPrice: NaN value in orderBook skipped: ', arr[0]);
      return;
    }
    minAsk = minAsk > value ? value : minAsk;
  });

  let maxBid = 0;
  bids.forEach((arr) => {
    const value = Number(arr[0]);
    if (isNaN(value)) {
      console.warn('computeMidPrice: NaN value in orderBook skipped', value);
      return;
    }
    maxBid = maxBid < value ? value : maxBid;
  });

  return (minAsk + maxBid) / 2;
};

export const globalIndex = (orderBooks: OrderBook[]) => {
  if (orderBooks.length === 0) {
    return 0;
  }
  let sum = 0;
  orderBooks.forEach((orderBook) => {
    sum += computeMidPrice(orderBook);
  });
  return sum / orderBooks.length;
};
