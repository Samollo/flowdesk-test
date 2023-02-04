// tests/calculator.spec.tx
import { assert } from "chai";
import { globalIndex } from "../../../src/modules/orderBook";
import { fixtures } from "./fixtures";

const { basicOrderBook1, basicOrderBook2, basicOrderBook3 } = fixtures;

describe("globalIndex Tests", () => {
  it("#Success - should return 7.5 with only 1 order book", () => {
    const result = globalIndex([basicOrderBook1]);
    assert.equal(result, 7.5);
  });
  it("#Success - should return 7.5 with 3 order book", () => {
    const result = globalIndex([
      basicOrderBook1,
      basicOrderBook2,
      basicOrderBook3,
    ]);
    assert.equal(result, 20);
  });
  it("#Success - should return 0", () => {
    const result = globalIndex([]);
    assert.equal(result, 0);
  });
});
