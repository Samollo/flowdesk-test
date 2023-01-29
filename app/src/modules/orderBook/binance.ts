import WebSocket from "ws";
import { Callback } from "../../../utils";
import {
  BinanceOrderBook,
  BinanceOrderBookResponse,
  binanceWebSocketUrl,
} from "./types";

const request = {
  id: "51e2affb-0aba-4821-ba75-f2625006eb43",
  method: "depth",
  params: {
    symbol: "BTCUSDT",
    limit: 20,
  },
};

export const getOrderBookFromBinance = (cb: Callback<BinanceOrderBook>) => {
  const socket = new WebSocket(binanceWebSocketUrl);

  socket.onopen = (_event) => {
    socket.send(JSON.stringify(request));
  };
  socket.onmessage = (event) => {
    const res: BinanceOrderBookResponse = JSON.parse(event.data.toString());
    socket.close();
    return cb(null, res.result);
  };
};
