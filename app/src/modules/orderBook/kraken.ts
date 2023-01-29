import request from "request";
import { Callback } from "../../../utils";
import { KrakenOrderBookResponse, krakenUrl } from "./types";

export const getOrderBookFromKraken = (
  cb: Callback<KrakenOrderBookResponse>
) => {
  request.get(krakenUrl, (error, response) => {
    if (error) {
      return cb(new Error("An error occured with Kraken API"));
    }
    const orderBook: KrakenOrderBookResponse = JSON.parse(response.body);
    return cb(null, orderBook);
  });
};
