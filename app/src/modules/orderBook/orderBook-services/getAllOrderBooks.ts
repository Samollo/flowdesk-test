import async from "async";
import { Callback } from "../../utils";
import { GlobalPriceIndexParameters, OrderBook } from "../orderBook-types";
import { exchanges } from "../config.json";
import {
  getOrderBookFromRestAPI,
  getOrderBookFromWebsocketAPI,
} from "../orderBook-queries";

export const getAllOrderBooks = (
  params: GlobalPriceIndexParameters,
  cb: Callback<OrderBook[]>
) => {
  const { limit, symbol } = params;
  const orderBooks: OrderBook[] = [];

  async.forEach(
    exchanges,
    (e, cb) => {
      if (e.type === "REST") {
        const formatedSymbol = e.toLowerCase ? symbol.toLowerCase(): symbol.toUpperCase();
        getOrderBookFromRestAPI(e.url, formatedSymbol, limit, (error, orderBook) => {
          if (error) {
            return cb(error);
          }
          if (orderBook) {
            orderBooks.push(orderBook);
          }
          return cb(null);
        });
      }
      if (e.type == "WS") {
        if (e.request.params) {
          e.request.params.limit = limit;
          e.request.params.symbol = e.toLowerCase ? symbol.toLowerCase(): symbol.toUpperCase();;
        } else {
          return cb(new Error("Error in request format for Websocket call"));
        }
        getOrderBookFromWebsocketAPI(
          e.url,
          JSON.stringify(e.request),
          (error, orderBook) => {
            if (error) {
              return cb(error);
            }
            if (orderBook) {
              orderBooks.push(orderBook);
            }
            return cb(null);
          }
        );
      }
    },
    (error) => {
      if (error) {
        return cb(error);
      }
      return cb(null, orderBooks);
    }
  );
};
