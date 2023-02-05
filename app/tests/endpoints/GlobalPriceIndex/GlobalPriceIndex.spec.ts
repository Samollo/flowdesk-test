import { assert } from "chai";
import nock from "nock";
import request from "supertest";

const app = require("../../../app");

export const binanceWebSocketUrl = "wss://ws-api.binance.com:443/ws-api/v3";
export const krakenUrl = "https://api.kraken.com/0/public/";
export const huobiUrl = "https://api.huobi.pro";

const krakenResponse = {
  error: [],
  result: {
    XBTUSDT: {
      asks: [
        ["23416.50000", "0.003", 1675464093],
        ["23416.70000", "0.423", 1675464080],
        ["23420.70000", "0.020", 1675464094],
        ["23421.40000", "0.110", 1675464095],
        ["23421.50000", "0.589", 1675464095],
        ["23421.70000", "3.203", 1675464095],
        ["23423.00000", "0.150", 1675464094],
        ["23423.20000", "1.000", 1675464093],
        ["23426.10000", "0.529", 1675464094],
        ["23426.90000", "0.002", 1675464094],
        ["23427.00000", "3.202", 1675464079],
        ["23427.20000", "2.560", 1675464095],
        ["23427.60000", "0.045", 1675464091],
        ["23428.70000", "0.002", 1675464094],
        ["23430.60000", "3.201", 1675464094],
        ["23431.50000", "0.393", 1675464091],
        ["23432.00000", "0.001", 1675463931],
        ["23436.00000", "0.447", 1675464091],
        ["23436.10000", "0.558", 1675464080],
        ["23436.60000", "1.000", 1675463986],
      ],
      bids: [
        ["23413.70000", "0.020", 1675464095],
        ["23413.60000", "0.110", 1675464095],
        ["23413.00000", "0.020", 1675464095],
        ["23411.90000", "0.423", 1675464095],
        ["23408.80000", "0.079", 1675464095],
        ["23408.70000", "0.529", 1675464095],
        ["23408.60000", "0.079", 1675464095],
        ["23408.50000", "0.150", 1675464094],
        ["23407.90000", "0.393", 1675464093],
        ["23407.20000", "0.182", 1675464095],
        ["23407.10000", "3.204", 1675464094],
        ["23406.50000", "0.300", 1675464095],
        ["23406.10000", "1.000", 1675464093],
        ["23404.90000", "0.043", 1675464076],
        ["23404.70000", "0.162", 1675464093],
        ["23404.10000", "0.027", 1675464092],
        ["23403.80000", "1.237", 1675464094],
        ["23401.50000", "0.003", 1675464094],
        ["23400.80000", "3.205", 1675464055],
        ["23397.00000", "0.369", 1675464094],
      ],
    },
  },
};

const krakenErrorResponse = { error: ["EGeneral:Invalid arguments"] };

const huobiResponse = {
  ch: "market.btcusdt.depth.step0",
  status: "ok",
  ts: 1675464096282,
  tick: {
    ts: 1675464095400,
    version: 161826374111,
    bids: [
      [23412.04, 1.52049],
      [23410.4, 0.02],
      [23410.1, 0.08],
      [23409.21, 0.002001],
      [23406.35, 0.15],
      [23405.47, 0.1],
      [23403.26, 0.04],
      [23402.39, 0.001861],
      [23400.57, 0.05],
      [23400.56, 0.2],
      [23399.38, 0.2],
      [23399.34, 0.2],
      [23398.57, 0.1],
      [23398.26, 0.012439],
      [23398.25, 0.448511],
      [23397.42, 0.1],
      [23397.4, 1.61],
      [23396.24, 0.089264],
      [23395.5, 1.776738],
      [23394.64, 0.12],
    ],
    asks: [
      [23412.05, 0.008553],
      [23412.06, 9.1e-4],
      [23418.11, 0.1226],
      [23418.41, 0.065316],
      [23418.42, 0.04],
      [23418.95, 0.167],
      [23419.79, 0.614878],
      [23419.8, 1.776738],
      [23420.0, 0.1],
      [23420.01, 0.031547],
      [23420.93, 0.023817],
      [23420.97, 0.6],
      [23421.0, 0.008768],
      [23421.27, 0.2],
      [23421.28, 0.2],
      [23421.29, 0.05],
      [23421.82, 0.448526],
      [23421.88, 0.02],
      [23422.17, 0.053054],
      [23422.35, 0.1],
    ],
  },
};

describe("flowdesk-test/GlobalPriceIndex", () => {
  it("#Success - Return global price index for 3 exchanges", () => {
    const symbol = "BTCUSDT";
    const limit = "20";
    nock(krakenUrl)
      .get(`/Depth?pair=${symbol}&count=${limit}`)
      .reply(200, krakenResponse);
    nock(huobiUrl)
      .get(
        `/market/depth?symbol=${symbol.toLowerCase()}&depth=${limit}&type=step0`
      )
      .reply(200, huobiResponse);
    request(app)
      .get(`/GlobalPriceIndex?symbol=${symbol}&limit=${limit}`)
      .expect(200)
      .end((error, res) => {
        if (error) {
          console.log("Test returned an error");
          console.log(error);
        }
        assert.approximately(res.body.globalPriceIndex, 23000, 1000);
      });
  });
  it("#Failure - Internal error due to bad kraken response", () => {
    const symbol = "BTCUSDT";
    const limit = "20";
    nock(krakenUrl)
      .get(`/Depth?pair=${symbol}&count=${limit}`)
      .reply(400, krakenErrorResponse);
    nock(huobiUrl)
      .get(
        `/market/depth?symbol=${symbol.toLowerCase()}&depth=${limit}&type=step0`
      )
      .reply(200, huobiResponse);
    request(app)
      .get(`/GlobalPriceIndex?symbol=${symbol}&limit=${limit}`)
      .expect(500)
      .end((error, res) => {
        if (error) {
          console.log("Test returned an error");
          console.log(error);
          return;
        }
        if (res.error instanceof Error) assert.equal(res.error.status, 500);
      });
  });
});
