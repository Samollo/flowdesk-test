// tests/calculator.spec.tx
import { assert } from "chai";
import { computeMidPrice } from "../../../src/modules/orderBook";
import { fixtures } from "./fixtures";

const { basicOrderBook, emptyOrderBook, orderBookWithNaN, emptyAsksOrderBook } =
  fixtures;

describe("ComputeMidPrice Tests", () => {
  it("#Success - should return 7.5", () => {
    const result = computeMidPrice(basicOrderBook);
    assert.equal(result, 7.5);
  });
  it("#Success - should return 0 with empty order book", () => {
    const result = computeMidPrice(emptyOrderBook);
    assert.equal(result, 0);
  });
  it("#Success - should skip nan values", () => {
    const result = computeMidPrice(orderBookWithNaN);
    assert.equal(result, 12.5);
  });
  it("#Success - should return 0 with empty asks", () => {
    const result = computeMidPrice(emptyAsksOrderBook);
    assert.equal(result, 0);
  });
});
