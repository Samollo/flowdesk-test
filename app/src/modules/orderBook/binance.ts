import WebSocket from "ws";
import { Callback } from "../../../utils";
import { BinanceOrderBook, BinanceOrderBookResponse, binanceWebSocketUrl } from "./types";

const body = {
  id: "51e2affb-0aba-4821-ba75-f2625006eb43",
  method: "depth",
  params: {
    symbol: "BTCUSDT",
    limit: 1,
  },
};

export const getOrderBookFromBinance = (
  cb: Callback<BinanceOrderBook>
) => {
  const socket = new WebSocket(binanceWebSocketUrl);

  socket.onopen = (_event) => {
    socket.send(JSON.stringify(body));
  };
  socket.onmessage = (event) => {
    const res : BinanceOrderBookResponse = JSON.parse(event.data.toString());
    socket.close();
    return cb(null, res.result);
  };
};

export const computeMidPriceBinance = (orderBook: BinanceOrderBook) => {
  let asks: number[] = [];
  let bids: number[] = [];

  orderBook.asks.forEach((arr) => {
    asks.push(Number(arr[0]));
  });
  asks.sort();

  orderBook.bids.forEach((arr) => {
    bids.push(Number(arr[0]));
  });
  bids.sort();

  return (asks[0] + bids[bids.length - 1]) / 2;
};
