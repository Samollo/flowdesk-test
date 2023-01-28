import request from "request";
import { Callback } from "../../utils";
import { KrakenOrderBookResponse, krakenUrl } from "./types";

export const getOrderBookFromKraken = (cb: Callback<KrakenOrderBookResponse>) => {
  request.get(krakenUrl, (error, response) => {
    if (error) {
      return cb(new Error("An error occured with Kraken API"));
    }
    const orderBook: KrakenOrderBookResponse = JSON.parse(response.body);
    return cb(null, orderBook);
  });
};

export const computeMidPriceKraken = (orderBook: KrakenOrderBookResponse) => {
  let asks: number[] = [];
  let bids: number[] = [];

  orderBook.result["XBTUSDT"].asks.forEach((e) => {
    asks.push(Number(e[0]));
  });
  orderBook.result["XBTUSDT"].bids.forEach((e) => {
    bids.push(Number(e[0]));
  });
  asks.sort();
  bids.sort();
  return (asks[0] + bids[bids.length - 1]) / 2;
};
