import * as express from "express";
import { getGlobalPriceIndex } from "../modules/orderBook/getGlobalPriceIndex";

const router = express.Router();

/* GET global price index based on Binance / Kraken / Huobi. */
router.get("/", (_req: express.Request, res: express.Response) => {
  getGlobalPriceIndex((error, globalPriceIndex) => {
    if (error) {
      console.log("An error happened");
      console.log(error);
      res.send(error);
      return;
    }
    console.log("Global price index: ", globalPriceIndex);
    res.send({ globalPriceIndex });
    return;
  });
});

module.exports = router;