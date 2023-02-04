import WebSocket from "ws";
import { Callback } from "../../utils";
import { OrderBook } from "../orderBook-types";
import { extractOrderBookFromResponse } from "./extractOrderBookFromResponse";

export const getOrderBookFromWebsocketAPI = (
  url: string,
  request: string,
  cb: Callback<OrderBook>
) => {
  const socket = new WebSocket(url);
  socket.onopen = (_event) => {
    socket.send(request);
  };
  socket.onerror = () => {
    socket.close;
    return cb(new Error(`Error with Websocket API call to ${url}`));
  };
  socket.onmessage = (event) => {
    const response = JSON.parse(event.data.toString());
    extractOrderBookFromResponse(response, cb);
    socket.close();
  };
};
