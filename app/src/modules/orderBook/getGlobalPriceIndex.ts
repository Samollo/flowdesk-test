import async from "async";
import { Callback } from "../../../utils";
import { getOrderBookFromBinance } from "./binance";
import { computeMidPrice } from "./computeMidPrice";
import { getOrderBookFromHuobi } from "./huobi";
import { getOrderBookFromKraken } from "./kraken";
import {
  BinanceOrderBook,
  HuobiOrderBookResponse,
  KrakenOrderBookResponse,
} from "./types";

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
      let globalPriceIndex = 0;
      if (results) {
        const { binance, kraken, huobi } = results;
        const binanceMidPrice = computeMidPrice(binance.asks, binance.bids);
        const krakenMidPrice = computeMidPrice(
          kraken.result["XBTUSDT"].asks,
          kraken.result["XBTUSDT"].bids
        );
        const huobiMidPrice = computeMidPrice(huobi.tick.asks, huobi.tick.bids);
        console.log({ binance: binanceMidPrice });
        console.log({ kraken: krakenMidPrice });
        console.log({ huobi: huobiMidPrice });
        globalPriceIndex =
          (binanceMidPrice + krakenMidPrice + huobiMidPrice) / 3;
      }
      return cb(null, globalPriceIndex);
    }
  );
};
