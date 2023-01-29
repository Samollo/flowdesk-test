export const computeMidPrice = (asks: string[][], bids: string[][]) => {
    let minAsk = Number.POSITIVE_INFINITY;
    asks.forEach((arr) => {
      minAsk = minAsk > Number(arr[0]) ? Number(arr[0]) : minAsk;
    });
  
    let maxBid = 0;
    bids.forEach((arr) => {
      maxBid = maxBid < Number(arr[0]) ? Number(arr[0]) : maxBid;
    });
  
    return (minAsk + maxBid) / 2;
  };