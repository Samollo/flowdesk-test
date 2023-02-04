import async from "async";
import { Callback } from "../../utils";
import { globalIndex } from "./globalIndex";
import {
  GlobalPriceIndexParameters,
  OrderBook,
} from "../orderBook-types";
import { getAllOrderBooks } from "./getAllOrderBooks";

export const getGlobalPriceIndex = (
  params: GlobalPriceIndexParameters,
  cb: Callback<number>
) => {
  interface AsyncResults {
    orderBooks: OrderBook[];
    globalIndex: number;
  }

  async.auto<AsyncResults>({
    orderBooks: (cb) => getAllOrderBooks(params, cb),
    globalIndex: [
      "orderBooks",
      ({ orderBooks }, cb) => {
        return cb(null, globalIndex(orderBooks));
      },
    ],
  },
  (error, results) => {
    if (error) {
      return cb(error);
    }
    if (!results) {
      return cb(new Error(`No global price index was computed`));
    }
    return cb(null, results.globalIndex);
  });
};
