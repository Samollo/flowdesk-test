import async from "async";
import { Callback } from "../../../utils";
import { getOrderBookFromBinance, computeMidPriceBinance } from "./binance";
import { getOrderBookFromHuobi, computeMidPriceHuobi } from "./huobi";
import { getOrderBookFromKraken, computeMidPriceKraken } from "./kraken";
import { BinanceOrderBook, HuobiOrderBookResponse, KrakenOrderBookResponse } from "./types";

export const getGlobalPriceIndex = (cb: Callback<number>) => {
  interface AsyncResults {
    binance: BinanceOrderBook;
    kraken: KrakenOrderBookResponse;
    huobi: HuobiOrderBookResponse;
  }
  async.auto<AsyncResults>(
    {
      binance: (cb) => getOrderBookFromBinance(cb),
      kraken: (cb) => getOrderBookFromKraken(cb),
      huobi: (cb) => getOrderBookFromHuobi(cb),
    },
    (error, results) => {
      if (error) {
        return cb(error);
      }
      let midPrice = 0;
      if (results) {
        const binance = computeMidPriceBinance(results.binance);
        const kraken = computeMidPriceKraken(results.kraken);
        const huobi = computeMidPriceHuobi(results.huobi);
        console.log({ binance });
        console.log({ kraken });
        console.log({ huobi });
        midPrice = (binance + kraken + huobi) / 3;
      }
      return cb(null, midPrice);
    }
  );
};
