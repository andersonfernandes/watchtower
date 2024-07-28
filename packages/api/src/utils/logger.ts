import { AppRequest, AppResponse } from "@/types/router";
import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino({
  name: "watchtower-api",
  level: "debug",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      ignore: "req,res,responseTime",
    },
  },
});

export const httpLogger = pinoHttp({
  logger: logger,
  serializers: {
    err: () => {},
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
  customLogLevel: (_, res: AppResponse, err: Error) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    }

    return "info";
  },
  customSuccessMessage: (
    req: AppRequest,
    res: AppResponse,
    responseTime: number
  ) => `${req.method} ${req.originalUrl} ${res.statusCode} > ${responseTime}ms`,
  customErrorMessage: (req: AppRequest, res: AppResponse, err: Error) =>
    `${req.method} ${req.originalUrl} ${res.statusCode}`,
});
