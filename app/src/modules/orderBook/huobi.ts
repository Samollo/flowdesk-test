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
