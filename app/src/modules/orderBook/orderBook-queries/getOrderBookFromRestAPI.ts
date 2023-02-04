import request from "request";
import fs from "fs";
import { Callback, replaceRequestWithParams } from "../../utils";
import { OrderBook } from "../orderBook-types";
import { extractOrderBookFromResponse } from "./extractOrderBookFromResponse";

export const getOrderBookFromRestAPI = (
  url: string,
  symbol: string,
  limit: number,
  cb: Callback<OrderBook>
) => {
  const requestUrl = replaceRequestWithParams(url, symbol, limit);
  request.get(requestUrl, (error, response) => {
    if (error) {
      return cb(new Error(`Error occured with REST API call to ${url}`));
    }
    const parsedResponse = JSON.parse(response.body);
    extractOrderBookFromResponse(parsedResponse, cb);
  });
};
