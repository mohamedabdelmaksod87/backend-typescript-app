import logger from "./logger";

export const morganFormat = ":method :url :status :response-time ms";

export const morganOptions = {
  stream: {
    write: (message: string) => {
      const logObject = {
        method: message.split(" ")[0],
        url: message.split(" ")[1],
        status: message.split(" ")[2],
        responseTime: message.split(" ")[3],
      };
      logger.info(JSON.stringify(logObject));
    },
  },
};
