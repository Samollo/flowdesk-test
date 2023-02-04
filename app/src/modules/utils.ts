export type Callback<T> = (error: Error | null, results?: T) => void;


export const searchValueByKey = (obj : any, key : string) : any => {
    if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
      return null;
    }
    else if (obj.hasOwnProperty(key)) {
      return obj[key];
    }
    else if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const result = searchValueByKey(obj[i], key);
        if (result) {
          return result;
        }
      }
    }
    else {
      for (const k in obj) {
        const result = searchValueByKey(obj[k], key);
        if (result) {
          return result;
        }
      }
    }
  
    return null;
  };
  

  export const replaceRequestWithParams = (request: string, symbol: string, limit: number) => {
    let newRequest = '';
    newRequest = request.replace('%SYMBOL%', symbol);
    newRequest = newRequest.replace('%LIMIT%', limit.toString());
    return newRequest;
  };