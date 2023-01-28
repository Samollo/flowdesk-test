import request from "request";
import { Callback } from "../../../utils";
import { HuobiOrderBookResponse, huobiUrl } from "./types";

export const getOrderBookFromHuobi = (cb: Callback<HuobiOrderBookResponse>) => {
  request.get(huobiUrl, (error, response) => {
    if (error) {
      return cb(new Error("An error occured with Huobi API"));
    }
    const orderBook: HuobiOrderBookResponse = JSON.parse(response.body);
    return cb(null, orderBook);
  });
};

export const computeMidPriceHuobi = (orderBook: HuobiOrderBookResponse) => {
  const huobiAsks = orderBook.tick.asks;
  const huobiBids = orderBook.tick.bids;

  let asks: number[] = [];
  let bids: number[] = [];

  huobiAsks.forEach((e) => {
    asks.push(Number(e[0]));
  });

  huobiBids.forEach((e) => {
    bids.push(Number(e[0]));
  });

  asks.sort();
  bids.sort();
  return (asks[0] + bids[bids.length - 1]) / 2;
};
