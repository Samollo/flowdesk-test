// var ws = require("ws");

// const baseUri = "wss://ws-api.binance.com:443/ws-api/v3";
// const body = {
//   id: "51e2affb-0aba-4821-ba75-f2625006eb43",
//   method: "depth",
//   params: {
//     symbol: "BNBBTC",
//     limit: 5,
//   },
// };

// const serverSocketUrl = "ws://localhost:3000";

// const getOrderBookFromBinance = () => {
//   const server = new ws.WebSocket(serverSocketUrl);
//   const socket = new ws.WebSocket(baseUri);
//   socket.send(JSON.stringify(body), (error) => {
//     if (error) {
//       console.log(error);
//     }
//   });
//   socket.on("message", (data, _isBinary) => {
//     const result = JSON.parse(data.toString());
//     server.send(result);
//   });
// };

// getOrderBookFromBinance();
