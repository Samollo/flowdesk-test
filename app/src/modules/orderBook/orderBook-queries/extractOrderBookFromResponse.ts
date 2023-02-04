import { Callback, searchValueByKey } from "../../utils";
import { OrderBook } from "../orderBook-types";

export const extractOrderBookFromResponse = (
  response: any,
  cb: Callback<OrderBook>
) => {
  const askKeys = ["asks", "ask"];
  const bidKeys = ["bids", "bid"];
  let asks: string[][] = [];
  let bids: string[][] = [];

  for (let i = 0; i < askKeys.length; i++) {
    if (asks && asks.length > 0) break;
    asks = searchValueByKey(response, askKeys[i]);
  }

  for (let i = 0; i < bidKeys.length; i++) {
    if (bids && bids.length > 0) break;
    bids = searchValueByKey(response, bidKeys[i]);
  }

  if (asks === null || bids === null)
    return cb(new Error("Error with response: No order book found"));
  return cb(null, {
    asks: asks,
    bids: bids,
  });
};
