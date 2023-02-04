import * as express from "express";
import {
  getGlobalPriceIndex,
  GlobalPriceIndexParameters,
} from "../modules/orderBook";

const router = express.Router();

/* Handler - GET global price index based on Binance / Kraken / Huobi. */
const handler = (req: express.Request, res: express.Response, next: any) => {
  const params: GlobalPriceIndexParameters = {
    symbol: req.query.symbol as string,
    limit: Number(req.query.limit),
  };
  getGlobalPriceIndex(params, (error, globalPriceIndex) => {
    if (error) {
      console.log("An error happened");
      next(error);
      return;
    }
    console.log("Global price index: ", globalPriceIndex);
    res.send({ globalPriceIndex });
    return;
  });
};

router.get("/", handler);

module.exports = router;
